async function loadLocale(lang) {
  try {
    const response = await fetch(`locales/${lang}.json`);
    return await response.json();
  } catch (e) {
    console.warn(`🌐 Fallback to FR: ${lang} not found`);
    const fallback = await fetch('locales/fr.json');
    return await fallback.json();
  }
}

function detectLang() {
  return navigator.language.startsWith('fr') ? 'fr' : 'en';
}

document.addEventListener("DOMContentLoaded", async () => {
  const lang = detectLang();
  const t = await loadLocale(lang);

  chrome.storage.local.get("videoDescription", ({ videoDescription }) => {
    updateUI(videoDescription, t);
    
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.videoDescription ) {
      chrome.storage.local.get("videoDescription", ({ videoDescription }) => {
        updateUI(videoDescription, t);
      });
    }
  });
});

function updateUI(videoDescription, t) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  if (!videoDescription) {
    resultDiv.innerHTML = `<p class="no-offer">⚠️ ${t["noOffer.title"]}</p>`;
    return;
  }

  const isComplete =
    videoDescription.links?.length > 0 &&
    videoDescription.codes?.length > 0 &&
    videoDescription.benefits?.length > 0;

  if (videoDescription.isExpired && isComplete) {
    const expiredMsg = document.createElement("p");
    expiredMsg.className = "no-offer";
    expiredMsg.innerHTML = `❌ ${t["noOffer.expired"] || "Le deal a expiré (vidéo publiée il y a plus de 21 jours)."}`;
    resultDiv.appendChild(expiredMsg);

    const toggleButton = document.createElement("button");
    toggleButton.textContent = "👀 Voir quand même le deal";
    toggleButton.style.cssText = "margin-top: 8px; font-size: 12px; cursor: pointer; background: none; border: none; color: #0066cc; text-decoration: underline;";
    resultDiv.appendChild(toggleButton);

    const collapsedDiv = document.createElement("div");
    collapsedDiv.style.display = "none";
    collapsedDiv.style.marginTop = "8px";
    resultDiv.appendChild(collapsedDiv);

    let isContentBuilt = false;

    toggleButton.addEventListener("click", () => {
      const isVisible = collapsedDiv.style.display === "block";

      if (!isVisible && !isContentBuilt) {
        const source = videoDescription.source || "unknown";
        const debugInfo = document.createElement("p");
        debugInfo.style.fontStyle = "italic";
        debugInfo.style.fontSize = "12px";
        debugInfo.style.marginBottom = "6px";
        debugInfo.textContent = `📡 Source : ${source}`;
        collapsedDiv.appendChild(debugInfo);

        if (videoDescription.links?.length > 0) {
          const linkTitle = document.createElement("h3");
          linkTitle.textContent = t["link.title"];
          collapsedDiv.appendChild(linkTitle);

          const urlList = document.createElement("ul");
          videoDescription.links.forEach(link => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = link;
            a.target = "_blank";
            a.textContent = link;
            a.style.color = "#009688";
            li.appendChild(a);
            urlList.appendChild(li);
          });
          collapsedDiv.appendChild(urlList);
        }

        if (videoDescription.codes?.length > 0) {
          const codeTitle = document.createElement("h3");
          codeTitle.textContent = t["code.title"];
          collapsedDiv.appendChild(codeTitle);

          const codeText = document.createElement("p");
          codeText.textContent = videoDescription.codes.join(", ");
          collapsedDiv.appendChild(codeText);
        }

        if (videoDescription.benefits?.length > 0) {
          const benefitTitle = document.createElement("h3");
          benefitTitle.textContent = t["benefit.title"];
          collapsedDiv.appendChild(benefitTitle);

          const benefitText = document.createElement("p");
          benefitText.textContent = videoDescription.benefits.join(", ");
          collapsedDiv.appendChild(benefitText);
        }

        isContentBuilt = true;
      }

      collapsedDiv.style.display = isVisible ? "none" : "block";
      toggleButton.textContent = isVisible ? "👀 Voir quand même le deal" : "↩️ Masquer le deal";
    });
    return;
  }

  if (!isComplete) {
    const listItems = t["noOffer.criteria"].map(item => `<li>${item}</li>`).join('');
    resultDiv.innerHTML = `
      <div class="no-offer">
        <p>${t["noOffer.title"]}</p>
        <p style="font-size: 12px; margin-top: 4px;">
          ${t["noOffer.detail"]}
          <ul style="margin-left: 15px;">${listItems}</ul>
          <span style="color: gray;">${t["noOffer.exclusion"]}</span>
        </p>
      </div>`;
    return;
  }

  const { description, links, codes, benefits } = videoDescription;
  const source = videoDescription.source || "unknown";
  const debugInfo = document.createElement("p");
  debugInfo.style.fontStyle = "italic";
  debugInfo.style.fontSize = "12px";
  debugInfo.style.marginBottom = "6px";
  debugInfo.textContent = `📡 Source : ${source}`;
  resultDiv.appendChild(debugInfo);

  if (links.length > 0) {
    const linkTitle = document.createElement("h3");
    linkTitle.textContent = t["link.title"];
    resultDiv.appendChild(linkTitle);

    const urlList = document.createElement("ul");
    links.forEach(link => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = link;
      a.target = "_blank";
      a.textContent = link;
      a.style.color = "#009688";
      li.appendChild(a);
      urlList.appendChild(li);
    });
    resultDiv.appendChild(urlList);
  }

  if (codes.length > 0) {
    const codeTitle = document.createElement("h3");
    codeTitle.textContent = t["code.title"];
    resultDiv.appendChild(codeTitle);

    const codeText = document.createElement("p");
    codeText.textContent = codes.join(", ");
    resultDiv.appendChild(codeText);
  }

  if (benefits.length > 0) {
    const benefitTitle = document.createElement("h3");
    benefitTitle.textContent = t["benefit.title"];
    resultDiv.appendChild(benefitTitle);

    const benefitText = document.createElement("p");
    benefitText.textContent = benefits.join(", ");
    resultDiv.appendChild(benefitText);
  }

  chrome.runtime.sendMessage({ type: "PREDICT_SPONSOR", text: description })
    .then(({ prediction }) => {
      const aiResult = document.createElement("h3");
      aiResult.style.fontStyle = "italic";
      if (prediction === "sponsor") {
        aiResult.textContent = t["ai.sponsor"];
      } else if (prediction === "non-sponsor") {
        aiResult.textContent = t["ai.noSponsor"];
      } else {
        aiResult.textContent = t["ai.unavailable"];
      }
      resultDiv.appendChild(aiResult);
    })
    .catch(() => {
      const aiResult = document.createElement("h3");
      aiResult.textContent = t["ai.unavailable"];
      aiResult.style.color = "gray";
      resultDiv.appendChild(aiResult);
    });
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "VIDEO_CHANGED") {
    chrome.storage.local.get("videoDescription", ({ videoDescription }) => {
      const lang = detectLang();
      loadLocale(lang).then(t => updateUI(videoDescription, t));
    });
  }
});