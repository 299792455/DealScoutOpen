if (typeof browser === 'undefined') window.browser = chrome;

chrome.storage.local.remove("videoDescription");
chrome.runtime.sendMessage({ type: "RESET_BADGE" });

function expandDescription(callback) {
  const expandButton = document.querySelector('tp-yt-paper-button#expand, tp-yt-paper-button#expand-sizer');
  if (expandButton) {
    expandButton.click();
    setTimeout(callback, 800);
  } else {
    callback();
  }
}

function getDescriptionText() {
  const spans = document.querySelectorAll('#description-inline-expander .yt-core-attributed-string--link-inherit-color');
  return Array.from(spans).map(span => span.innerText.trim()).join(' ').trim() || null;
}

function getTitleText() {
  return document.querySelector('ytd-watch-flexy h1 yt-formatted-string')?.innerText?.trim() || null;
}

function getVideoPublishDate(maxTries = 10) {
  return new Promise((resolve) => {
    let tries = 0;
    const check = () => {
      const el = document.querySelector('meta[itemprop="datePublished"]');
      if (el) {
        const content = el.getAttribute('content');
        const parsedDate = Date.parse(content);
        resolve(isNaN(parsedDate) ? null : new Date(parsedDate));
      } else if (tries < maxTries) {
        tries++;
        setTimeout(check, 500);
      } else {
        resolve(null);
      }
    };
    check();
  });
}

function isDealStillValid(publishDate, maxDays = 22) {
  if (!publishDate) return false;
  const now = new Date();
  const diff = Math.floor((now - publishDate) / (1000 * 60 * 60 * 24));
  return diff <= maxDays;
}

expandDescription(() => waitForDescription());

function waitForDescription(maxTries = 20) {
  let tries = 0;
  const interval = setInterval(() => {
    tries++;
    const found = tryToExtractDescription();
    if (found || tries >= maxTries) clearInterval(interval);
  }, 1000);
}

function tryToExtractDescription() {
  const descriptionHTML = document.querySelector('#description-inline-expander')?.innerHTML;
  const rawDescription = getDescriptionText();
  const title = getTitleText();

  console.log(`[DealScout] 🎬 Titre : ${title || "Non détecté"}`);

  if (!rawDescription) return false;

  const cleanedDescription = cleanDescription(rawDescription);
  const hasLinks = extractPromoLinks(cleanedDescription);
  const isRich = cleanedDescription.length > 100 || hasLinks.length > 0;

  if (!isRich) {
    console.log("[DealScout] ❌ Description pauvre ou sans offre commerciale détectée.");

    const emptyPayload = {
      description: "",
      descriptionHTML: "",
      links: [],
      codes: [],
      benefits: [],
      isComplete: false,
      isExpired: true,
      source: "description",
      publishDate: null
    };

    chrome.storage.local.set({ videoDescription: emptyPayload }, () => {
      chrome.runtime.sendMessage({
        type: "SPONSOR_NOT_FOUND",
        payload: emptyPayload
      });
    });

    return false;
  }

  console.log("[DealScout] ✅ Description détectée, analyse complète...");
  analyzeDescription(cleanedDescription, descriptionHTML);
  return true;
}

function cleanDescription(text) {
  return text.replace(/#[^\s]+/g, '')
    .replace(/(?:\d{1,2}:){1,2}\d{2}/g, '')
    .replace(/[\u{1F600}-\u{1F6FF}]/gu, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function extractPromoLinks(text) {
  const linkRegex = /https?:\/\/(?:[^\s]+)/gi;
  const links = (text.match(linkRegex) || []).filter(link => !filterFalseLinks(link));
  return links;
}

function extractPromoCodes(text) {
  const codeRegex = /(?:code\s*(?:promo|réduction)?|promo\s*code|discount\s*code|voucher|coupon)\s*(?:is|:|=|-)?\s*["']?([A-Z0-9\-_]{4,})["']?/gi;
  const codes = Array.from(text.matchAll(codeRegex), m => m[1]);

  const fallbackCodeRegex = /\b([A-Z0-9\-_]{4,})\b/g;
  const fallbackCodes = Array.from(text.matchAll(fallbackCodeRegex), m => m[1])
    .filter(code => code.length >= 5 && /[A-Z]/.test(code));

  return [...new Set([...codes, ...fallbackCodes])];
}

function extractDiscountBenefit(text) {
  const percentRegex = /-?\d{1,3}\s?%/g;
  const benefitRegex = /(?:bénéficiez|profitez|économisez|get|save)[^\d]{0,10}\d{1,3}\s?%/gi;
  const freeRegex = /\d+\s?(mois|months?)\s?(offerts|gratuits|free)|livraison offerte|free shipping|free trial/gi;
  const euroDiscountRegex = /\d+\s?(€|eur)[\s\-]?(offert|réduction|discount)?/gi;
  const dollarDiscountRegex = /\d+\s?(\$|usd)[\s\-]?(offert|réduction|discount)?/gi;

  return [...new Set([
    ...(text.match(percentRegex) || []),
    ...(text.match(benefitRegex) || []),
    ...(text.match(freeRegex) || []),
    ...(text.match(euroDiscountRegex) || []),
    ...(text.match(dollarDiscountRegex) || [])
  ])];
}

function filterFalseLinks(link) {
  const blacklist = ["youtube.com", "patreon.com", "utip.io", "tipeee.com", "lefootoirdastronogeek"];
  return blacklist.some(bad => link.includes(bad));
}

function analyzeDescription(description, descriptionHTML) {
  const links = extractPromoLinks(description);
  const codes = extractPromoCodes(description);
  const benefits = extractDiscountBenefit(description);
  

  getVideoPublishDate().then((publishDate) => {
    const isValidDate = isDealStillValid(publishDate, 22);
    const isCompleteOffer = isValidDate && links.length > 0 && codes.length > 0 && benefits.length > 0;

    if (typeof chrome?.runtime?.id !== "undefined") {
      const finalPayload = {
        description,
        descriptionHTML,
        links,
        codes,
        benefits,
        source: "description",
        isComplete: isCompleteOffer,
        publishDate: publishDate?.toISOString() || null,
        isExpired: !isValidDate,
        timestamp: Date.now()
      };

      chrome.storage.local.set({ videoDescription: finalPayload }, () => {
       
        chrome.runtime.sendMessage({
          type: isCompleteOffer ? "SPONSOR_FOUND" : "SPONSOR_NOT_FOUND",
          payload: finalPayload
        });
       
      });
    } else {
      console.warn("[DealScout] ⚠️ Extension context invalidated – stockage annulé.");
    }
  });
}


window.addEventListener("yt-navigate-finish", () => {
  console.log("[DealScout] 🔁 Changement de vidéo détecté (SPA)");
  chrome.storage.local.remove("videoDescription", () => {
    chrome.runtime.sendMessage({ type: "RESET_BADGE" });
    chrome.runtime.sendMessage({ type: "VIDEO_CHANGED" });
    setTimeout(() => {
      expandDescription(() => waitForDescription());
    }, 1000);
  });
});