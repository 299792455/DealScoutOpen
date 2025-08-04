FR

# DealScout – Extension Chrome

Détecte automatiquement les offres commerciales, codes promo et liens sponsorisés dans les descriptions YouTube.

## 🔧 Installation en local 

1. Cloner le repo
2. Aller dans `chrome://extensions`
3. Activer le mode développeur
4. Cliquer sur “Charger l’extension non empaquetée”
5. Sélectionner le dossier du projet

## 📦 Fonctionnalités

- Détection automatique de :
  - Liens sponsorisés
  - Codes promos
  - Bénéfices clients (réductions, mois offerts, etc)
- Gestion des vidéos expirées (> 21 jours)
- UI multilingue (FR / EN)

MIT License

Ce projet a été initié dans le cadre de ma reconversion en tant que développeur web (JavaScript/React). Je suis un jeune quarantenaire autodidacte, et ce travail — de faible niveau et très ùoche/imparfait — s'améliorera continuellement. Merci de faire preuve de bienveillance et d'éviter les jugements destructeurs : chaque ligne ici est l'oeuvre d'un newbie. 

L'extension est avant tout taillé pour la langue FR (le reste est à venir ofc).

✅ Une vidéo YouTube est considérée comme commerciale DealScout Approved si elle contient dans sa description une offre concrète, identifiable, avec un bénéfice direct et quantifiable pour le spectateur, caractérisée par :

Critère	Exigence produit
1. Lien unique traqué	✅ Redirection via un lien clair : affilié, promo, traqué, hors simple “plus d’infos” ou redirection classique
2. Code promo actif	✅ Code spécifique donnant droit à un avantage particulier
3. Bénéfice concret & mesurable	✅ % réduction, mois gratuit, bonus tangible (non juste “essayer gratuitement”, pas d’early access, pas d’appel au soutien)
4. Durée limitée ou privilège utilisateur	✅ Offre exclusive (ex : “réservée à ma communauté”, “seulement cette semaine”, “uniquement via ce lien”)
5. Appui explicite d’une marque ou d’un produit	✅ Nom d’une marque, d’un service, ou d’un produit externe lié à l’offre (ex : NordVPN, Incogni, Surfshark…)

🟥 EXCLUSIONS DealScout : Faux-amis et exclusions volontaires
Cas à exclure	Justification
✅ Liens classiques YouTube (redirect, chaîne secondaire)	❌ Aucun bénéfice commercial, pas de marque tierce
✅ “Essayer gratuitement 7 jours” sans code, sans %	❌ Offres basiques “freemium” sans vraie plus-value
✅ “Soutenez ma chaîne” (Tipeee, Utip, Patreon)	❌ Pas une offre commerciale → donation
✅ “Abonne-toi à ma chaîne secondaire”	❌ Auto-promotion chaîne = non commercial côté DealScout
✅ Réduction sur contenu gratuit (ebook PDF gratuit, templates gratuits)	❌ Pas une vente commerciale réelle

🎁 Synthèse rapide de définition produit DealScout Approved :
✅ Offre = Lien traqué + Avantage mesurable + Code promo optionnel + Période/privilege exclusif
❌ Soutien simple, auto-promo, contenu gratuit = hors scope

🔧 Limite actuelle
❗ Les offres commerciales uniquement mentionnées à l’oral dans la vidéo (et absentes de la description) ne sont pas (ou mal) détectées. Cette limitation sera traitée ultérieurement via une analyse des sous-titres ou de la piste audio, en cours de recherche technique.
❗ Il s'agit d'une extension Chrome et non Youtube. Pas envie de leur donner de l'argent avec leur DataApi.
❗ EUR/USD pour le moment.




🇬🇧 

DealScout – Chrome Extension
Automatically detects commercial offers, promo codes, and sponsored links in YouTube video descriptions.

🔧 Local Installation
Clone the repository

Go to chrome://extensions

Enable developer mode

Click “Load unpacked”

Select the project folder

📦 Features
Automatic detection of:

Sponsored links

Promo codes

Customer benefits (discounts, free months, etc.)

Management of expired videos (> 21 days)

Multilingual UI (FR / EN)

MIT License

This project was initiated as part of my career change to become a web developer (JavaScript/React). I'm a self-taught developer in my early 40s, and this work — rough and clearly beginner-level — is a continuous work in progress. Please be kind and avoid harsh judgment: every line here is the work of a newbie.

The extension is primarily designed for French language content but ENG is coming.

✅ A YouTube video is considered DealScout Approved if its description includes a concrete, identifiable offer with a direct and measurable benefit for the viewer, characterized by:

Criterion	Product requirement

Unique tracked link | ✅ Clear redirect: affiliate, promo, or tracking link (not just “more info” or standard redirection)

Active promo code | ✅ Specific code granting a particular benefit

Measurable benefit | ✅ Discount %, free months, tangible bonus (≠ free trial, ≠ early access, ≠ support appeal)

Limited time or exclusive access | ✅ Exclusive offer (e.g. “only for my community”, “this week only”, “via this link only”)

Explicit brand/product mention | ✅ Clear name of a brand, service or external product (e.g. NordVPN, Incogni, Surfshark…)

🟥 DealScout EXCLUSIONS: false positives and voluntary filters

Excluded case Justification
✅ Standard YouTube links (redirects, secondary channel)	❌ No commercial value, no third-party brand
✅ “7-day free trial” without code or discount	❌ Basic freemium, no real added value
✅ Support requests (Tipeee, Utip, Patreon)	❌ Not a commercial offer → donation
✅ “Subscribe to my second channel”	❌ Self-promotion, not commercial
✅ Free content offers (e.g. free PDFs, templates)	❌ No actual sale = out of scope

🎁 Quick DealScout Approved summary
✅ Offer = Tracked link + Measurable benefit + Optional code + Exclusive period
❌ Support, self-promo, free content = out of scope

🔧 Current limitation
❗ Commercial offers mentioned only verbally in the video (and missing from the description) are not yet properly detected. This limitation will be addressed later through subtitle or audio track analysis, currently under technical research.
❗ This is a Chrome extension, not a YouTube product. We deliberately avoid using the YouTube Data API to prevent giving them more access or control over your data and our wallets.
❗ EUR/USD so far.




🇪🇸

DealScout – Extensión de Chrome
Detecta automáticamente ofertas comerciales, códigos promocionales y enlaces patrocinados en las descripciones de videos de YouTube.

🔧 Instalación local
Clona el repositorio

Ve a chrome://extensions

Activa el modo desarrollador

Haz clic en “Cargar sin empaquetar”

Selecciona la carpeta del proyecto

📦 Funcionalidades
Detección automática de:

Enlaces patrocinados

Códigos promocionales

Beneficios para el usuario (descuentos, meses gratis, etc.)

Gestión de vídeos caducados (> 21 días)

Interfaz multilingüe (FR / EN)****

MIT License

Este proyecto se inició como parte de mi reconversión profesional hacia el desarrollo web (JavaScript/React). Soy un autodidacta de poco más de 40 años, y este trabajo — muy básico y claramente imperfecto — está en constante evolución. Gracias por mostrar comprensión y evitar juicios destructivos: cada línea aquí es obra de un principiante.

La extensión está pensada principalmente para contenido en francés.

✅ Un vídeo de YouTube se considera DealScout Approved si contiene en su descripción una oferta concreta, identificable, con un beneficio directo y cuantificable para el espectador, caracterizada por:

Criterio Requisito del producto 

Enlace único rastreado | ✅ Redirección mediante un enlace claro: afiliado, promocional o rastreado (no solo “más información” o redirecciones clásicas)

Código promocional activo | ✅ Código específico que da acceso a una ventaja concreta

Beneficio concreto y medible | ✅ % de descuento, meses gratis, bonificación tangible (≠ “prueba gratuita”, ≠ acceso anticipado, ≠ llamada al apoyo)

Duración limitada o privilegio exclusivo | ✅ Oferta exclusiva (ej.: “solo para mi comunidad”, “solo esta semana”, “solo con este enlace”)

Mención explícita de marca o producto | ✅ Nombre claro de una marca, producto o servicio externo (ej.: NordVPN, Incogni, Surfshark…)

🟥 EXCLUSIONES DealScout: falsos positivos y descartes voluntarios

Caso a excluir	Justificación
✅ Enlaces clásicos de YouTube (redirecciones, canal secundario)	❌ No hay beneficio comercial ni marca externa
✅ “Prueba gratuita de 7 días” sin código ni %	❌ Oferta básica sin valor añadido
✅ Apoyo al canal (Tipeee, Utip, Patreon)	❌ No es una oferta comercial → es donación
✅ “Suscríbete a mi canal secundario”	❌ Autopromoción, no es comercial
✅ Descuento en contenido gratuito (ebooks, plantillas...)	❌ No hay venta real = fuera del alcance

🎁 Resumen rápido DealScout Approved
✅ Oferta = Enlace rastreado + Beneficio medible + Código opcional + Exclusividad
❌ Apoyo, autopromoción, contenido gratuito = fuera de alcance

🔧 Limitación actual
❗ Las ofertas comerciales mencionadas solo de forma oral en el vídeo (y ausentes en la descripción) aún no se detectan correctamente. Esta limitación se abordará más adelante mediante un análisis de subtítulos o de la pista de audio, actualmente en fase de investigación técnica.
❗ Se trata de una extensión de Chrome, no de un producto de YouTube. Evitamos deliberadamente utilizar la YouTube Data API para no otorgarles más acceso ni control sobre tus datos y carteras.
❗ EUR/USD de momento.



