/* Bazar translations — English, Français, Kreol Morisien.
 *
 * How it works (no page markup needs to change):
 * - Each row below is: T("English text", "French", "Kreol").
 * - When the language changes (your flag menu calls setLang), every text,
 *   placeholder, alt text and button label on the page that matches an
 *   English row is swapped. Choosing English puts the originals back.
 * - Text added later by the page (AI chat replies, button labels) is
 *   translated automatically as it appears.
 * - Same English word, different meaning? Use the element's data-text name:
 *   T("#cats.7", "Maison", "Lakaz") only changes the element with data-text="cats.7".
 * - Text with a changing part: use {1}, {2}, e.g. T('Code sent to {1} via Resend', ...).
 * - Names of shops, places, prices and numbers are left as they are.
 *
 * To add a language later: add a column and a flag button.
 * The Kreol and French here should be checked by a native speaker before launch.
 */
(function () {
  var D = { fr: {}, mfe: {} };
  function T(en, fr, mfe) { D.fr[en] = fr; D.mfe[en] = mfe; }

  /* ───────────── Page titles ───────────── */
  T("Bazar — Every Mauritian business, one intelligent app", "Bazar — Chaque entreprise mauricienne, une seule app intelligente", "Bazar — Tou bisnis morisien, enn sel app entelizan");
  T("Bazar — Sign in or Sign up", "Bazar — Connexion ou inscription", "Bazar — Konekte ouswa enskri");
  T("Bazar — Home", "Bazar — Accueil", "Bazar — Lakey");

  /* ───────────── Shared ───────────── */
  T("Change language", "Changer de langue", "Sanz lang");
  T("Get Started", "Commencer", "Koumanse");
  T("↳ Get Started", "↳ Commencer", "↳ Koumanse");
  T("Send", "Envoyer", "Avoy");
  T("Close", "Fermer", "Ferme");
  T("Business AI", "IA business", "AI bisnis");
  T("Discover Near You", "Découvrir autour de vous", "Dekouver pre kot ou");
  T("Open near me", "Ouvert près de moi", "Ouver pre kot mwa");
  T("VAT due?", "TVA due ?", "TVA pou pey?");
  T("My profit", "Mon bénéfice", "Mo profi");
  T("Overdue invoices", "Factures en retard", "Faktir anretar");
  T("Unanswered enquiries", "Demandes sans réponse", "Demann ki pankor reponn");
  T("Ask about your business...", "Posez une question sur votre entreprise...", "Poz enn kestion lor ou bisnis...");
  T("Ask about shops, prices, or near you...", "Posez une question sur les boutiques, les prix ou ce qui est près de vous...", "Demann lor laboutik, pri, ouswa seki pre kot ou...");
  T("Open now", "Ouvert maintenant", "Ouver aster");

  /* ───────────── Landing (business.html) ───────────── */
  T("Mauritius", "Maurice", "Moris");
  T("Landing navigation", "Navigation", "Navigasion");
  T("Features", "Fonctionnalités", "Fonksionalite");
  T("Insights & Invoices", "Analyses et factures", "Stat ek faktir");
  T("AI Assist", "Assistant IA", "Asistan AI");
  T("Marketplace", "Marketplace", "Marse");
  T("Platform highlights", "Points forts de la plateforme", "Seki Bazar fer");
  T("Hyperlocal Discovery", "Découverte de proximité", "Dekouver pre kot ou");
  T("Port Louis · Open now", "Port Louis · Ouvert", "Port Louis · Ouver aster");
  T("Pereybere · Specialty coffee", "Pereybere · Café de spécialité", "Pereybere · Kafe spesialite");
  T("Bazar Assist · Dual AI", "Bazar Assist · Double IA", "Bazar Assist · De AI");
  T("Customer enquiry · 2s ago", "Demande client · il y a 2 s", "Demann kliyan · ena 2 segonn");
  T("“Fresh croissants or cakes open near Curepipe or Grand Baie?”", "« Des croissants frais ou des gâteaux ouverts près de Curepipe ou Grand Baie ? »", "“Ena kroisan fre ouswa gato ouver pre Curepipe ouswa Grand Baie?”");
  T("→ 3 shops open nearby.", "→ 3 boutiques ouvertes à proximité.", "→ 3 laboutik ouver pre kot ou.");
  T("Chelsea's Cup N Cake & Le Fournil deliver today.", "Chelsea's Cup N Cake et Le Fournil livrent aujourd'hui.", "Chelsea's Cup N Cake ek Le Fournil livre zordi.");
  T("Business AI · Owner view", "IA business · vue propriétaire", "AI bisnis · pou proprieter");
  T("“VAT due this month?”", "« TVA due ce mois-ci ? »", "“Konbien TVA pou pey sa mwa-la?”");
  T("across 48 orders · 2 overdue invoices flagged.", "sur 48 commandes · 2 factures en retard signalées.", "lor 48 komand · 2 faktir anretar signale.");
  T("Mauritius AI Commerce Platform", "Plateforme de commerce IA de Maurice", "Platform komers AI Moris");
  T("Every Mauritian business,", "Chaque entreprise mauricienne,", "Tou bisnis morisien,");
  T("one app.", "une seule app.", "enn sel app.");
  T("Discover verified shops near you, chat with AI for instant enquiries, and run your business with smart invoicing and live analytics — all in one app.",
    "Découvrez des boutiques vérifiées près de chez vous, discutez avec l'IA pour des réponses instantanées, et gérez votre entreprise avec une facturation intelligente et des analyses en direct — le tout dans une seule app.",
    "Dekouver laboutik verifie pre kot ou, koz ar AI pou gagn repons tousuit, ek zer ou bisnis ar faktir entelizan ek stat an direk — tou dan enn sel app.");
  T("↳ Explore marketplace", "↳ Explorer le marketplace", "↳ Get marse-la");
  T("App sneak peek", "Aperçu de l'app", "Get app-la");
  T("DISCOVER.", "DÉCOUVREZ.", "DEKOUVER.");
  T("INVOICE. GROW.", "FACTUREZ. GRANDISSEZ.", "FAKTIR. PROGRESE.");
  T("A sneak peek inside Bazar — live sales insights, automatic receipts, and 24/7 AI support in one app.",
    "Un aperçu de Bazar — analyses en direct, factures automatiques et assistant IA 24/7 dans une seule app.",
    "Get ki ena dan Bazar — stat bisnis an direk, faktir otomatik, ek AI 24/7 dan enn sel app.");
  T("Monthly sales", "Ventes du mois", "Lavant sa mwa");
  T("48 Orders", "48 commandes", "48 komand");
  T("Rs 12.4K VAT", "TVA Rs 12,4K", "TVA Rs 12.4K");
  T("BAZAR RECEIPT", "REÇU BAZAR", "RESI BAZAR");
  T("AUTO INVOICE · MAURITIUS", "FACTURE AUTO · MAURICE", "FAKTIR OTOMATIK · MORIS");
  T("Shop:", "Boutique :", "Laboutik:");
  T("Subtotal:", "Sous-total :", "Sou-total:");
  T("VAT (15%):", "TVA (15 %) :", "TVA (15%):");
  T("Total:", "Total :", "Total:");
  T("Status:", "Statut :", "Sitiasion:");
  T("Paid · Juice", "Payé · Juice", "Peye · Juice");
  T("28 Nov 2026 · Bazar Assist", "28 nov. 2026 · Bazar Assist", "28 Novam 2026 · Bazar Assist");
  T("Instant AI Reply", "Réponse IA instantanée", "Repons AI tousuit");
  T("“Bonzour! Yes, our chocolate fudge cake (Rs 950) is fresh today. Same-day delivery to Curepipe & Port Louis available.”",
    "« Bonjour ! Oui, notre gâteau fondant au chocolat (Rs 950) est frais aujourd'hui. Livraison le jour même à Curepipe et Port Louis. »",
    "“Bonzour! Wi, nou gato fudge sokola (Rs 950) fre zordi. Nou kapav livre parzour mem Curepipe ek Port Louis.”");
  T("✓ Auto-replied in 2s · Order captured", "✓ Réponse auto en 2 s · Commande enregistrée", "✓ Reponn otomatik dan 2 s · Komand anrezistre");
  T("One local platform combining", "Une plateforme locale qui réunit", "Enn platform lokal ki met ansam");
  T("Near-Me Discovery", "Découverte de proximité", "Dekouver pre kot ou");
  T("Bazar Assist AI", "IA Bazar Assist", "AI Bazar Assist");
  T(", and", ", et", ", ek");
  T("WhatsApp-ready Shops", "Boutiques prêtes pour WhatsApp", "Laboutik pare pou WhatsApp");
  T("built for Mauritian SMEs.", "conçue pour les PME mauriciennes.", "fer pou PME morisien.");
  T("That’s", "C'est", "Sa li");
  T("The Bazar System", "Le système Bazar", "Sistem Bazar");
  T("Three engines. One seamless experience.", "Trois moteurs. Une expérience fluide.", "Trwa moter. Enn sel lexperyans fasil.");
  T("Designed for phone-first speed, zero app-store friction, and instant local trust.",
    "Pensé pour la rapidité sur mobile, sans passer par un store, et pour une confiance locale immédiate.",
    "Fer pou vites lor telefonn, san bizin al dan app store, ek pou ou fer konfians tousuit.");
  T("500 m · Open", "500 m · Ouvert", "500 m · Ouver");
  T("Hyperlocal search by district and 5 km radius. Buyers find nearby bakeries, boutiques, electronics, and home services without digging through social feeds.",
    "Recherche hyperlocale par district et dans un rayon de 5 km. Les acheteurs trouvent boulangeries, boutiques, électronique et services à domicile à proximité, sans fouiller les réseaux sociaux.",
    "Rod par distrik ek dan enn rayon 5 km. Bann kliyan trouv boulanzri, boutik, elektronik ek servis lakaz pre kot zot, san bizin fouy partou lor rezo sosio.");
  T("Customer Enquiry AI", "IA pour les demandes clients", "AI pou demann kliyan");
  T("“Gato patate near me?”", "« Gâteau patate près de moi ? »", "“Gato patat pre kot mwa?”");
  T("“Delivery to Rose Hill?”", "« Livraison à Rose Hill ? »", "“Livrezon Rose Hill?”");
  T("Instant answer", "Réponse immédiate", "Repons tousuit");
  T("Shoppers ask Bazar Assist in plain English, French, or Kreol to check stock, compare prices, or send enquiries directly to local businesses.",
    "Les clients demandent à Bazar Assist, en anglais, en français ou en créole, de vérifier le stock, comparer les prix ou envoyer leurs demandes directement aux commerces locaux.",
    "Bann kliyan kapav demann Bazar Assist an Angle, Franse ouswa Kreol pou get stok, konpar pri, ouswa avoy zot demann direk ar bann bisnis lokal.");
  T("Business Support AI", "IA de soutien aux entreprises", "AI pou ed bisnis");
  T("VAT Due", "TVA due", "TVA pou pey");
  T("Net Profit", "Bénéfice net", "Profi net");
  T("An intelligent agent for merchants: auto-replies to buyer enquiries 24/7 and answers questions on profit, VAT due, and overdue invoices in one tap.",
    "Un agent intelligent pour les commerçants : il répond aux demandes des clients 24h/24 et vous renseigne sur vos bénéfices, la TVA due et les factures en retard en un geste.",
    "Enn azan entelizan pou bann marsan: li reponn demann kliyan 24/7 ek li dir ou ou profi, TVA pou pey ek faktir anretar dan enn sel tap.");
  T("Smart Business Tools", "Outils business intelligents", "Zouti bisnis entelizan");
  T("Automatic invoices, camera scan & live insights.", "Factures automatiques, scan par caméra et analyses en direct.", "Faktir otomatik, skan ar kamera ek stat an direk.");
  T("Know exactly how your business is performing — without spreadsheets or manual bookkeeping.",
    "Sachez exactement comment se porte votre entreprise — sans tableurs ni comptabilité manuelle.",
    "Kone exakteman kouma ou bisnis pe marse — san spreadsheet ni fer kont lor papie.");
  T("AUTO-GENERATED", "GÉNÉRÉE AUTOMATIQUEMENT", "FER OTOMATIK");
  T("TOTAL:", "TOTAL :", "TOTAL:");
  T("MERCHANT", "COMMERÇANT", "MARSAN");
  T("ITEMS", "ARTICLES", "ARTIK");
  T("2 × FUDGE CAKE, 1 × BOX", "2 × GÂTEAU FONDANT, 1 × BOÎTE", "2 × GATO FUDGE, 1 × BWAT");
  T("VAT (15%)", "TVA (15 %)", "TVA (15%)");
  T("PAYMENT", "PAIEMENT", "PEMAN");
  T("JUICE / CASH ON DEL.", "JUICE / ESPÈCES À LA LIVR.", "JUICE / KAS LOR LIVREZON");
  T("*** AUTOMATIC INVOICE ***", "*** FACTURE AUTOMATIQUE ***", "*** FAKTIR OTOMATIK ***");
  T("SAVED TO YOUR SHOP LEDGER", "ENREGISTRÉE DANS VOTRE REGISTRE", "SOV DAN LIV KONT OU LABOUTIK");
  T("Every order on Bazar generates a clean digital receipt you can download, sign, or send via WhatsApp & email automatically.",
    "Chaque commande sur Bazar génère un reçu numérique clair que vous pouvez télécharger, signer ou envoyer automatiquement par WhatsApp et e-mail.",
    "Sak komand lor Bazar fer enn resi dizital prop ki ou kapav telesarze, signe, ouswa avoy otomatikman par WhatsApp ek email.");
  T("↓ Save", "↓ Enregistrer", "↓ Sov");
  T("⎙ Share", "⎙ Partager", "⎙ Partaz");
  T("✎ Sign", "✎ Signer", "✎ Signe");
  T("Scan paper invoices with your camera", "Scannez vos factures papier avec la caméra", "Skan ou faktir papie ar ou kamera");
  T("Camera AI", "IA caméra", "AI kamera");
  T("Snap any supplier bill, market receipt, or handwritten invoice with your phone camera. Bazar reads the items, date, VAT, and total automatically into your books.",
    "Prenez en photo une facture fournisseur, un reçu du marché ou une facture manuscrite. Bazar lit les articles, la date, la TVA et le total, et les ajoute automatiquement à vos comptes.",
    "Pran foto nenport ki faktir fourniser, resi bazar ouswa faktir ekrir ar lamin. Bazar lir bann artik, dat, TVA ek total, ek met zot otomatikman dan ou kont.");
  T("Supplier Invoice #882 · Captured", "Facture fournisseur n°882 · Capturée", "Faktir fourniser #882 · Anrezistre");
  T("Flour & Packaging · Rs 4,150 · VAT Rs 541", "Farine et emballages · Rs 4,150 · TVA Rs 541", "Farinn ek anbalaz · Rs 4,150 · TVA Rs 541");
  T("✓ Recorded to Nov expenses in 1.4s", "✓ Ajoutée aux dépenses de nov. en 1,4 s", "✓ Met dan depans Novam dan 1.4 s");
  T("Clear breakdown of how your business is doing", "Une vue claire de la santé de votre entreprise", "Enn vi kler lor kouma ou bisnis pe marse");
  T("Live Insights", "Analyses en direct", "Stat an direk");
  T("See revenue, net profit, VAT due, overdue invoices, and your top-selling items at a glance — updated in real time with every sale and scanned receipt.",
    "Consultez chiffre d'affaires, bénéfice net, TVA due, factures en retard et meilleures ventes en un coup d'œil — mis à jour en temps réel à chaque vente et chaque reçu scanné.",
    "Get ou lavant, profi net, TVA pou pey, faktir anretar ek seki pli vann, dan enn kout-de-zie — mizazour an direk ar sak lavant ek sak resi skane.");
  T("Revenue", "Chiffre d'affaires", "Lavant");
  T("+18% this mo", "+18 % ce mois", "+18% sa mwa");
  T("59% margin", "59 % de marge", "59% maz");
  T("Due 20 Dec", "Échéance 20 déc.", "Pou 20 Desam");
  T("Cakes & Boxes", "Gâteaux et boîtes", "Gato ek bwat");
  T("Coffee & Drinks", "Cafés et boissons", "Kafe ek bwason");
  T("WhatsApp Orders", "Commandes WhatsApp", "Komand WhatsApp");
  T("Live Preview · Bazar Assist", "Aperçu en direct · Bazar Assist", "Esey an direk · Bazar Assist");
  T("One AI for shoppers. One AI for your shop.", "Une IA pour les clients. Une IA pour votre boutique.", "Enn AI pou kliyan. Enn AI pou ou laboutik.");
  T("Switch modes below to try how Bazar Assist handles customer enquiries and merchant business numbers.",
    "Changez de mode ci-dessous pour voir comment Bazar Assist gère les demandes clients et les chiffres de votre entreprise.",
    "Sanz mod anba-la pou get kouma Bazar Assist okip demann kliyan ek bann sif ou bisnis.");
  T("Bazar Assist mode", "Mode de Bazar Assist", "Mod Bazar Assist");
  T("Customer AI", "IA client", "AI kliyan");
  T("Business mode", "Mode business", "Mod bisnis");
  T("Customer mode", "Mode client", "Mod kliyan");
  T("Hi! I'm Bazar Assist. Ask me anything about your shop's numbers or customer enquiries.",
    "Bonjour ! Je suis Bazar Assist. Posez-moi vos questions sur les chiffres de votre boutique ou les demandes de vos clients.",
    "Bonzour! Mo Bazar Assist. Demann mwa nenport ki kestion lor sif ou laboutik ouswa demann ou bann kliyan.");
  T("Ask Bazar Assist", "Demander à Bazar Assist", "Demann Bazar Assist");
  T("Estimated VAT due for November is Rs 12,450 (15% across 48 taxable orders). Next filing deadline: 20 Dec.",
    "La TVA estimée pour novembre est de Rs 12,450 (15 % sur 48 commandes taxables). Prochaine déclaration : 20 déc.",
    "TVA estime pou Novam se Rs 12,450 (15% lor 48 komand taxab). Prosin dat pou deklare: 20 Desam.");
  T("This month's net profit is Rs 84,200 (+14% vs October). Top seller: Chocolate fudge cake (62 units).",
    "Le bénéfice net du mois est de Rs 84,200 (+14 % par rapport à octobre). Meilleure vente : gâteau fondant au chocolat (62 unités).",
    "Profi net sa mwa-la se Rs 84,200 (+14% konpare ar Oktob). Seki pli vann: gato fudge sokola (62).");
  T("You have 2 overdue invoices totalling Rs 6,800 (Hotel Le Palm Rs 4,500 · Café Nord Rs 2,300). Want me to draft a WhatsApp reminder?",
    "Vous avez 2 factures en retard pour un total de Rs 6,800 (Hotel Le Palm Rs 4,500 · Café Nord Rs 2,300). Voulez-vous que je prépare un rappel WhatsApp ?",
    "Ou ena 2 faktir anretar, total Rs 6,800 (Hotel Le Palm Rs 4,500 · Café Nord Rs 2,300). Ou anvi mo prepar enn rapel WhatsApp?");
  T("3 buyers asked about delivery to Quatre Bornes today. I've drafted replies in English & Kreol ready for 1-tap send.",
    "3 clients ont demandé une livraison à Quatre Bornes aujourd'hui. J'ai préparé des réponses en anglais et en créole, prêtes à envoyer en un geste.",
    "3 kliyan finn demann pou livrezon Quatre Bornes zordi. Mo finn prepar repons an Angle ek Kreol, pare pou avoy dan enn tap.");
  T("Bonzour! I'm Bazar Assist. Ask me to find shops near you, check stock, or message a seller.",
    "Bonjour ! Je suis Bazar Assist. Demandez-moi de trouver des boutiques près de vous, de vérifier un stock ou d'écrire à un vendeur.",
    "Bonzour! Mo Bazar Assist. Demann mwa rod laboutik pre kot ou, get stok, ouswa avoy enn mesaz enn vander.");
  T("3 verified shops are open within 1.5 km: Bookcourt Caudan (0.5 km), Dodo Café Boutique (0.8 km), and Chelsea's Cup N Cake (1.1 km).",
    "3 boutiques vérifiées sont ouvertes à moins de 1,5 km : Bookcourt Caudan (0,5 km), Dodo Café Boutique (0,8 km) et Chelsea's Cup N Cake (1,1 km).",
    "3 laboutik verifie ouver dan 1.5 km: Bookcourt Caudan (0.5 km), Dodo Café Boutique (0.8 km), ek Chelsea's Cup N Cake (1.1 km).");
  T("Snacks under Rs 300", "Snacks à moins de Rs 300", "Gajak mwins ki Rs 300");
  T("Found 2 local picks: La Flore Boodhoo (Mauritian samoussas · Rs 180) and Le Fournil (Artisan butter croissants · Rs 280, delivers today).",
    "2 trouvailles locales : La Flore Boodhoo (samoussas mauriciens · Rs 180) et Le Fournil (croissants pur beurre artisanaux · Rs 280, livrés aujourd'hui).",
    "Mo finn trouv 2: La Flore Boodhoo (samousa morisien · Rs 180) ek Le Fournil (kroisan diber artizanal · Rs 280, livre zordi).");
  T("Ask about delivery", "Demander la livraison", "Demann pou livrezon");
  T("Most nearby shops offer same-day cash-on-delivery via Grabbit Express (Rs 75–125). Which shop should I message for you?",
    "La plupart des boutiques proches proposent la livraison le jour même, avec paiement à la livraison, via Grabbit Express (Rs 75–125). À quelle boutique dois-je écrire pour vous ?",
    "Laplipar laboutik pre kot ou livre parzour mem, ou pey kas lor livrezon, ar Grabbit Express (Rs 75–125). Ki laboutik ou anvi mo avoy mesaz?");
  T('Got it! In the live app, Bazar Assist checks your orders, invoices, and customer messages to answer "{1}" instantly.',
    "Bien reçu ! Dans l'app, Bazar Assist consulte vos commandes, factures et messages clients pour répondre instantanément à « {1} ».",
    'Mo finn konpran! Dan vre app-la, Bazar Assist get ou komand, faktir ek mesaz kliyan pou reponn "{1}" tousuit.');
  T('Searching verified shops near Port Louis for "{1}" — 4 matches found with same-day delivery.',
    "Recherche de « {1} » dans les boutiques vérifiées près de Port Louis — 4 résultats avec livraison le jour même.",
    'Mo pe rod "{1}" dan laboutik verifie pre Port Louis — 4 rezilta ar livrezon parzour mem.');
  T("Get Started Today", "Commencez dès aujourd'hui", "Koumans zordi mem");
  T("Ready to run your business smarter?", "Prêt à gérer votre entreprise plus intelligemment ?", "Pare pou zer ou bisnis pli entelizan?");
  T("Create your free Bazar account in 2 minutes. Get automatic invoices, camera receipt scanning, live business insights, and your own Mauritian storefront.",
    "Créez votre compte Bazar gratuit en 2 minutes. Factures automatiques, scan des reçus par caméra, analyses en direct et votre propre vitrine mauricienne.",
    "Kre ou kont Bazar gratis dan 2 minit. Gagn faktir otomatik, skan resi ar kamera, stat bisnis an direk ek ou prop laboutik morisien lor internet.");
  T("↳ Browse marketplace", "↳ Parcourir le marketplace", "↳ Get marse-la");
  T("↳ Try Bazar Assist", "↳ Essayer Bazar Assist", "↳ Esey Bazar Assist");
  T("Caudan Waterfront Port Louis Mauritius", "Caudan Waterfront, Port-Louis, Maurice", "Caudan Waterfront, Port Louis, Moris");
  T("Port Louis Central Market Mauritius", "Marché central de Port-Louis, Maurice", "Bazar Port Louis, Moris");
  T("Port Louis Central Market · Local SMEs", "Marché central de Port-Louis · PME locales", "Bazar Port Louis · PME lokal");
  T("Ready to shop local or grow your Mauritian business with AI?", "Prêt à acheter local ou à faire grandir votre entreprise mauricienne avec l'IA ?", "Pare pou aste lokal ouswa fer ou bisnis morisien grandi ar AI?");
  T("Enter Bazar", "Entrer dans Bazar", "Rant dan Bazar");
  T("Product", "Produit", "Prodwi");
  T("Marketplace Home", "Accueil du marketplace", "Lakey marse");
  T("Discover Near Me", "Découvrir près de moi", "Dekouver pre kot mwa");
  T("Resell Secondhand", "Revendre d'occasion", "Revann segonn-lamin");
  T("For Business", "Pour les entreprises", "Pou bisnis");
  T("Open Your Shop", "Ouvrir votre boutique", "Ouver ou laboutik");
  T("AI Customer Support", "Service client IA", "Servis kliyan AI");
  T("VAT & Profit Insights", "TVA et bénéfices", "TVA ek profi");
  T("Explore", "Explorer", "Explor");
  T("Curepipe & Plaines Wilhems", "Curepipe et Plaines Wilhems", "Curepipe ek Plaines Wilhems");
  T("Connect", "Contact", "Kontak");
  T("WhatsApp Support", "Assistance WhatsApp", "Led lor WhatsApp");
  T("Partner Program", "Programme partenaires", "Program partner");
  T("© 2026 Bazar Mauritius. All rights reserved.", "© 2026 Bazar Mauritius. Tous droits réservés.", "© 2026 Bazar Mauritius. Tou drwa rezerve.");
  T("Privacy Policy", "Politique de confidentialité", "Polisi konfidansialite");
  T("Terms of Use", "Conditions d'utilisation", "Kondision itilizasion");
  T("AI Data Promise", "Engagement données et IA", "Nou angazman lor done AI");

  /* ───────────── Sign in / Sign up (auth.html) ───────────── */
  T("← Back", "← Retour", "← Retour");
  T("What Bazar offers", "Ce que propose Bazar", "Seki Bazar ofer");
  T("For Customers", "Pour les clients", "Pou kliyan");
  T("Discover businesses around you", "Découvrez les commerces autour de vous", "Dekouver bisnis otour ou");
  T("Explore verified local shops, food, and services nearby across Mauritius.", "Explorez boutiques, restaurants et services locaux vérifiés près de chez vous, partout à Maurice.", "Get laboutik, manze ek servis lokal verifie pre kot ou, partou Moris.");
  T("Get quality secondhand finds", "Trouvez de l'occasion de qualité", "Trouv bon zafer segonn-lamin");
  T("Buy and resell pre-loved items easily with people in your area.", "Achetez et revendez facilement des articles d'occasion avec les gens de votre quartier.", "Aste ek revann zafer segonn-lamin fasilman ar dimounn dan ou landrwa.");
  T("For Business Owners", "Pour les commerçants", "Pou proprieter bisnis");
  T("One dashboard to control your business", "Un tableau de bord pour piloter votre entreprise", "Enn sel tablo pou kontrol ou bisnis");
  T("Manage orders, boost visibility among nearby customers, and grow sales.", "Gérez vos commandes, gagnez en visibilité auprès des clients proches et augmentez vos ventes.", "Zer ou komand, fer kliyan pre kot ou trouv ou pli fasil, ek vann plis.");
  T("Smart invoicing, scan & analytics", "Facturation intelligente, scan et analyses", "Faktir entelizan, skan ek stat");
  T("Auto-generate invoices, scan receipts with your camera, and track live performance.", "Générez vos factures automatiquement, scannez vos reçus avec la caméra et suivez vos performances en direct.", "Fer faktir otomatik, skan resi ar ou kamera, ek swiv ou performans an direk.");
  T("Slide 1", "Diapo 1", "Paz 1");
  T("Slide 2", "Diapo 2", "Paz 2");
  T("Slide 3", "Diapo 3", "Paz 3");
  T("Slide 4", "Diapo 4", "Paz 4");
  T("Login", "Connexion", "Konekte");
  T("Sign up", "Inscription", "Enskri");
  T("Customer", "Client", "Kliyan");
  T("Business / SME", "Entreprise / PME", "Bisnis / PME");
  T("Full name or Business name", "Nom complet ou nom de l'entreprise", "Nom konple ouswa nom bisnis");
  T("e.g. Chelsea's Cup N Cake", "ex. Chelsea's Cup N Cake", "par egzanp Chelsea's Cup N Cake");
  T("Email", "E-mail", "Email");
  T("Password", "Mot de passe", "Modpas");
  T("Forgot?", "Oublié ?", "Bliye?");
  T("Toggle password visibility", "Afficher ou masquer le mot de passe", "Montre ouswa kasiet modpas");
  T("or", "ou", "ouswa");
  T("Continue with Google", "Continuer avec Google", "Kontinye ar Google");
  T("Verification code sent via Resend!", "Code de vérification envoyé via Resend !", "Kod verifikasion finn avoye ar Resend!");
  T("Code sent to {1} via Resend", "Code envoyé à {1} via Resend", "Kod finn avoye lor {1} ar Resend");
  T("Enter the 6-digit code sent to your email.", "Saisissez le code à 6 chiffres envoyé à votre e-mail.", "Tap kod 6 sif ki nou finn avoy lor ou email.");
  T("6-digit code", "Code à 6 chiffres", "Kod 6 sif");
  T("Verify →", "Vérifier →", "Verifie →");
  T("Remember me", "Se souvenir de moi", "Rapel mwa");

  /* ───────────── App Home (index.html) ───────────── */
  T("Home", "Accueil", "Lakey");
  T("#cats.7", "Maison", "Lakaz");            // the "Home" category, not the Home tab
  T("Map", "Carte", "Kart");
  T("Resell", "Revendre", "Revann");
  T("Orders", "Commandes", "Komand");
  T("Messages", "Messages", "Mesaz");
  T("Cart", "Panier", "Pagne");
  T("Account menu", "Menu du compte", "Menu kont");
  T("My Profile", "Mon profil", "Mo profil");
  T("Saved Items", "Articles enregistrés", "Zafer sove");
  T("My Orders & Cart", "Mes commandes et panier", "Mo komand ek pagne");
  T("My Resell Listings", "Mes annonces de revente", "Mo bann anons revann");
  T("Sign in / Switch Account", "Se connecter / Changer de compte", "Konekte / Sanz kont");
  T("Change location", "Changer de lieu", "Sanz landrwa");
  T("Ask Bazar AI", "Demander à Bazar IA", "Demann Bazar AI");
  T("Discover shops near you, ask Bazar AI in English, French or Kreol, and order with island-wide delivery.",
    "Découvrez des boutiques près de chez vous, interrogez Bazar IA en anglais, français ou créole, et commandez avec livraison dans toute l'île.",
    "Dekouver laboutik pre kot ou, poz kestion Bazar AI an Angle, Franse ouswa Kreol, ek komande ar livrezon partou dan lil.");
  T("Search shops, products, or ask AI...", "Cherchez des boutiques, des produits ou demandez à l'IA...", "Rod laboutik, prodwi, ouswa demann AI...");
  T("Search", "Rechercher", "Rod");
  T("Filters", "Filtres", "Filt");
  T("Quick filters", "Filtres rapides", "Filt rapid");
  T("All", "Tout", "Tou");
  T("Near me", "Près de moi", "Pre kot mwa");
  T("Under Rs 500", "Moins de Rs 500", "Mwins ki Rs 500");
  T("Made in MU", "Fait à Maurice", "Fer Moris");
  T("Pre-loved", "Seconde main", "Segonn-lamin");
  T("Categories", "Catégories", "Kategori");
  T("See all", "Tout voir", "Get tou");
  T("Food", "Restauration", "Manze");
  T("Groceries", "Épicerie", "Provizion");
  T("Fashion", "Mode", "Lamod");
  T("Phones", "Téléphones", "Telefonn");
  T("Beauty", "Beauté", "Labote");
  T("Cakes", "Gâteaux", "Gato");
  T("Car rental", "Location de voitures", "Lokasion loto");
  T("Kids", "Enfants", "Zanfan");
  T("Businesses near you", "Commerces près de vous", "Bisnis pre kot ou");
  T("Change area", "Changer de zone", "Sanz landrwa");
  T("Caudan · Open", "Caudan · Ouvert", "Caudan · Ouver");
  T("Books & Gifts · Port Louis", "Livres et cadeaux · Port Louis", "Liv ek kado · Port Louis");
  T("Local Roastery", "Torréfaction locale", "Torefaksion lokal");
  T("Coffee & Lifestyle · Pereybere", "Café et art de vivre · Pereybere", "Kafe ek lifestyle · Pereybere");
  T("Delivers today", "Livre aujourd'hui", "Livre zordi");
  T("Patisserie · Curepipe", "Pâtisserie · Curepipe", "Patisri · Curepipe");
  T("Fresh daily", "Frais chaque jour", "Fre sak zour");
  T("Bakery · Grand Baie", "Boulangerie · Grand Baie", "Boulanzri · Grand Baie");
  T("Picked for you", "Sélectionné pour vous", "Swazi pou ou");
  T("Signature Chocolate Fudge Cake", "Gâteau fondant au chocolat signature", "Gato fudge sokola spesial");
  T("Same-day", "Jour même", "Parzour mem");
  T("Save item", "Enregistrer l'article", "Sov sa zafer-la");
  T("Signature chocolate fudge cake", "Gâteau fondant au chocolat signature", "Gato fudge sokola spesial");
  T("Popular", "Populaire", "Popiler");
  T("Single-Origin Mauritian Roast", "Café torréfié mauricien d'origine unique", "Kafe morisien torefie");
  T("Single-origin roasted beans, 250g", "Grains torréfiés d'origine unique, 250 g", "Grin kafe torefie enn sel lorizinn, 250g");
  T("Artisan Butter Croissants Box", "Boîte de croissants pur beurre artisanaux", "Bwat kroisan diber artizanal");
  T("Fresh", "Frais", "Fre");
  T("Artisan butter croissants (box of 4)", "Croissants pur beurre artisanaux (boîte de 4)", "Kroisan diber artizanal (bwat 4)");
  T("Refurbished Smartphone 128GB", "Smartphone reconditionné 128 Go", "Smartphone renove 128GB");
  T("Warranty", "Garantie", "Garanti");
  T("iPhone 13, 128GB (Certified)", "iPhone 13, 128 Go (certifié)", "iPhone 13, 128GB (sertifie)");
  T("Handwoven Raffia Tote Bag", "Sac cabas en raphia tissé main", "Sak rafia tres lamin");
  T("Handwoven raffia beach tote", "Cabas de plage en raphia tissé main", "Sak laplaz rafia tres lamin");
  T("Island Gold Drop Earrings", "Boucles d'oreilles pendantes dorées", "Zanno pandan kouler lor");
  T("Island gold drop earrings", "Boucles d'oreilles pendantes dorées", "Zanno pandan kouler lor");
  T("Fresh Mauritian Samoussas", "Samoussas mauriciens frais", "Samousa morisien fre");
  T("Mauritian samoussas (box of 12)", "Samoussas mauriciens (boîte de 12)", "Samousa morisien (bwat 12)");
  T("Under Rs 200", "Moins de Rs 200", "Mwins ki Rs 200");
  T("Natural Artisan Soap Bar", "Savon artisanal naturel", "Savon natirel artizanal");
  T("Botanical handmade soap bar", "Savon botanique fait main", "Savon ar plant fer lamin");
  T("Potted Monstera Plant", "Monstera en pot", "Monstera dan po");
  T("Potted monstera deliciosa", "Monstera deliciosa en pot", "Monstera deliciosa dan po");
  T("Fresh Tropical Juice", "Jus tropical frais", "Zi fri tropikal fre");
  T("Fresh pressed pineapple juice", "Jus d'ananas frais pressé", "Zi zannanas fre");
  T("Own a business?", "Vous avez une entreprise ?", "Ou ena enn bisnis?");
  T("Open your shop on Bazar with 24/7 AI customer support & business insights. Free to start.",
    "Ouvrez votre boutique sur Bazar avec un service client IA 24h/24 et des analyses business. Gratuit pour commencer.",
    "Ouver ou laboutik lor Bazar ar servis kliyan AI 24/7 ek stat bisnis. Gratis pou koumanse.");
  T("Open Bazar Assist AI", "Ouvrir l'IA Bazar Assist", "Ouver AI Bazar Assist");
  T("Close Bazar Assist", "Fermer Bazar Assist", "Ferm Bazar Assist");
  T("Assistant mode", "Mode de l'assistant", "Mod asistan");
  T("Customer Enquiries", "Demandes clients", "Demann kliyan");
  T("Ask about shops near you...", "Posez une question sur les boutiques près de vous...", "Demann lor laboutik pre kot ou...");
  T("Message Bazar Assist", "Écrire à Bazar Assist", "Ekrir Bazar Assist");
  T("Send message", "Envoyer le message", "Avoy mesaz");
  T("Close location picker", "Fermer le choix du lieu", "Ferm swa landrwa");
  T("Town / District", "Ville / district", "Lavil / distrik");
  T("Search radius", "Rayon de recherche", "Rayon rod");
  T("All Mauritius", "Toute l'île", "Tou Moris");
  T("Show nearby businesses", "Voir les commerces proches", "Montre bisnis pre kot mwa");
  T("Main", "Principal", "Prinsipal");
  T("Bonzour! I'm Bazar Assist. Ask me to find shops near you, check stock, or make an enquiry.",
    "Bonjour ! Je suis Bazar Assist. Demandez-moi de trouver des boutiques près de vous, de vérifier un stock ou de faire une demande.",
    "Bonzour! Mo Bazar Assist. Demann mwa rod laboutik pre kot ou, get stok, ouswa fer enn demann.");
  T("3 verified shops are open near Port Louis & Curepipe: Bookcourt Caudan (0.5 km), Dodo Café Boutique (0.8 km), and Chelsea's Cup N Cake (1.1 km).",
    "3 boutiques vérifiées sont ouvertes près de Port Louis et Curepipe : Bookcourt Caudan (0,5 km), Dodo Café Boutique (0,8 km) et Chelsea's Cup N Cake (1,1 km).",
    "3 laboutik verifie ouver pre Port Louis ek Curepipe: Bookcourt Caudan (0.5 km), Dodo Café Boutique (0.8 km), ek Chelsea's Cup N Cake (1.1 km).");
  T("Top picks under Rs 500: La Flore Boodhoo samoussas (Rs 180), Le Fournil butter croissants (Rs 280), Dodo Café roasted beans (Rs 420).",
    "Meilleurs choix à moins de Rs 500 : samoussas La Flore Boodhoo (Rs 180), croissants pur beurre Le Fournil (Rs 280), café torréfié Dodo Café (Rs 420).",
    "Meyer swa mwins ki Rs 500: samousa La Flore Boodhoo (Rs 180), kroisan diber Le Fournil (Rs 280), kafe torefie Dodo Café (Rs 420).");
  T("Ask a shop about delivery", "Demander la livraison à une boutique", "Demann enn laboutik pou livrezon");
  T("Tell me which shop or item you like and I'll send your enquiry directly (in English, French, or Kreol).",
    "Dites-moi quelle boutique ou quel article vous intéresse et j'envoie votre demande directement (en anglais, français ou créole).",
    "Dir mwa ki laboutik ouswa ki zafer ou kontan, mo avoy ou demann direk (an Angle, Franse ouswa Kreol).");
  T("Hi! I'm Bazar Assist. Ask me anything about your shop's numbers or customer support.",
    "Bonjour ! Je suis Bazar Assist. Posez-moi vos questions sur les chiffres de votre boutique ou le service client.",
    "Bonzour! Mo Bazar Assist. Demann mwa nenport ki lor sif ou laboutik ouswa servis kliyan.");
  T("Estimated VAT due this month is Rs 12,450 across 48 taxable orders.", "La TVA estimée ce mois-ci est de Rs 12,450 sur 48 commandes taxables.", "TVA estime sa mwa-la se Rs 12,450 lor 48 komand taxab.");
  T("Net profit this month: Rs 84,200 (+14% vs last month).", "Bénéfice net ce mois-ci : Rs 84,200 (+14 % par rapport au mois dernier).", "Profi net sa mwa-la: Rs 84,200 (+14% konpare ar mwa pase).");
  T("2 overdue invoices totalling Rs 6,800. Tap to draft WhatsApp payment reminders.", "2 factures en retard pour un total de Rs 6,800. Touchez pour préparer des rappels de paiement WhatsApp.", "2 faktir anretar, total Rs 6,800. Tap pou prepar rapel peman WhatsApp.");
  T("3 buyer enquiries waiting — AI reply drafts in English & Kreol are ready for 1-tap approval.", "3 demandes clients en attente — des réponses IA en anglais et en créole sont prêtes à valider en un geste.", "3 demann kliyan pe atann — repons AI an Angle ek Kreol pare, zis tap pou aprouve.");
  T('In the live merchant app, Bazar Assist checks your sales, VAT, and buyer inbox to answer "{1}".',
    "Dans l'app commerçant, Bazar Assist consulte vos ventes, votre TVA et vos messages clients pour répondre à « {1} ».",
    'Dan vre app marsan, Bazar Assist get ou lavant, TVA ek mesaz kliyan pou reponn "{1}".');
  T('Checking nearby shops in {1} for "{2}" — 3 matches found.',
    "Recherche de « {2} » dans les boutiques près de {1} — 3 résultats.",
    'Mo pe rod "{2}" dan laboutik pre {1} — 3 rezilta.');

  /* ───────────── Added after your latest edits ───────────── */
  T("Live Preview · Business AI", "Aperçu en direct · IA business", "Esey an direk · AI bisnis");
  T("Ask anything about your shop's numbers.", "Posez toutes vos questions sur les chiffres de votre boutique.", "Demann nenport ki lor sif ou laboutik.");
  T("Bazar Assist automatically adapts to your role — business owners get instant VAT, profit, overdue invoice alerts, and 24/7 customer enquiry drafts, while customers get a dedicated shopping assistant.",
    "Bazar Assist s'adapte automatiquement à votre rôle — les commerçants reçoivent instantanément TVA, bénéfices, alertes de factures en retard et brouillons de réponses clients 24h/24, tandis que les clients ont leur propre assistant shopping.",
    "Bazar Assist adapte li tousel dapre ki kalite itilizater ou ete — proprieter bisnis gagn TVA, profi, alert faktir anretar ek repons pou kliyan 24/7 tousuit, ek kliyan gagn zot prop asistan pou fer shopping.");
  T("Business Assistant", "Assistant business", "Asistan bisnis");
  T("Shopping & Enquiries · EN · FR · Kreol", "Achats et demandes · EN · FR · Kreol", "Shopping ek demann · EN · FR · Kreol");
  T("Ask about shops, prices, or secondhand finds...", "Posez une question sur les boutiques, les prix ou l'occasion...", "Demann lor laboutik, pri, ouswa zafer segonn-lamin...");
  T("Bonzour! I'm Bazar Assist. Ask me to discover businesses near you, find secondhand deals, or message a shop.",
    "Bonjour ! Je suis Bazar Assist. Demandez-moi de découvrir des commerces près de vous, de trouver de bonnes affaires d'occasion ou d'écrire à une boutique.",
    "Bonzour! Mo Bazar Assist. Demann mwa dekouver bisnis pre kot ou, rod bon zafer segonn-lamin, ouswa avoy enn mesaz enn laboutik.");
  T("Secondhand deals", "Bonnes affaires d'occasion", "Bon zafer segonn-lamin");
  T("Top pre-loved finds nearby: iPhone 13 128GB (Rs 18,500 at St Jean Tech Hub) & vintage home pieces in Quatre Bornes.",
    "Meilleures trouvailles d'occasion à proximité : iPhone 13 128 Go (Rs 18,500 chez St Jean Tech Hub) et objets déco vintage à Quatre Bornes.",
    "Meyer zafer segonn-lamin pre kot ou: iPhone 13 128GB (Rs 18,500 kot St Jean Tech Hub) ek zafer lakaz vintage Quatre Bornes.");
  T('Checking nearby shops in {1} for "{2}" — 3 matches found with same-day delivery.',
    "Recherche de « {2} » dans les boutiques près de {1} — 3 résultats avec livraison le jour même.",
    'Mo pe rod "{2}" dan laboutik pre {1} — 3 rezilta ar livrezon parzour mem.');

  /* ───────────── Resell & Escrow (resell.html) ───────────── */
  T("Bazar — Resell & Escrow Dashboard", "Bazar — Revente et séquestre", "Bazar — Revann ek eskrow");
  T("+ List item", "+ Publier", "+ Met enn zafer");
  T("Bazar Escrow Protected", "Protégé par Bazar Séquestre", "Proteze par Bazar Eskrow");
  T("Resell safely with built-in trust", "Revendez en toute sécurité, en toute confiance", "Revann an sekirite, ar konfians");
  T("Buyer payments are held securely in Bazar Escrow and released to you the moment pickup or Grabbit delivery is confirmed.",
    "Le paiement de l'acheteur est conservé en sécurité par Bazar Séquestre et vous est versé dès que le retrait ou la livraison Grabbit est confirmé.",
    "Larzan aseter la gard an sekirite dan Bazar Eskrow, ek nou pey ou mem kan pickup ouswa livrezon Grabbit konfirme.");
  T("+ List an item", "+ Publier un article", "+ Met enn zafer pou vande");
  T("Browse deals", "Voir les bonnes affaires", "Get bon zafer");
  T("Resell overview", "Aperçu de vos reventes", "Rezime ou bann revant");
  T("Held in Escrow", "Bloqué en séquestre", "Bloke dan eskrow");
  T("1 active handover", "1 remise en cours", "1 livrezon pe fer");
  T("Released Payouts", "Paiements versés", "Larzan ki finn pey ou");
  T("Paid via Juice / MCB", "Payé via Juice / MCB", "Pe ar Juice / MCB");
  T("Trust Score", "Indice de confiance", "Nivo konfians");
  T("ID Verified · 14 sales", "Identité vérifiée · 14 ventes", "Idantite verifie · 14 lavant");
  T("Active Listings", "Annonces actives", "Anons aktif");
  T("{1} items", "{1} articles", "{1} zafer");
  T("{1} views this week", "{1} vues cette semaine", "{1} dimounn finn get sa semenn-la");
  T("{1} views", "{1} vues", "{1} vi");
  T("Active Escrow Deal", "Transaction en séquestre", "Tranzaksion dan eskrow");
  T("Protected #ESC-409", "Protégée #ESC-409", "Proteze #ESC-409");
  T("iPhone 13, 128GB (Midnight)", "iPhone 13, 128 Go (Minuit)", "iPhone 13, 128GB (Midnight)");
  T("Buyer: Kevin R. (Verified ID) · Quatre Bornes", "Acheteur : Kevin R. (identité vérifiée) · Quatre Bornes", "Aseter: Kevin R. (idantite verifie) · Quatre Bornes");
  T("Rs {1} Locked", "Rs {1} bloquées", "Rs {1} bloke");
  T("Rs {1} Released", "Rs {1} versées", "Rs {1} finn pey");
  T("✓ Step 1", "✓ Étape 1", "✓ Etap 1");
  T("✓ Step 2", "✓ Étape 2", "✓ Etap 2");
  T("● Step 2", "● Étape 2", "● Etap 2");
  T("3 · Payout", "3 · Versement", "3 · Peman");
  T("✓ Released", "✓ Versé", "✓ Finn pey");
  T("Buyer paid to Escrow", "L'acheteur a payé en séquestre", "Aseter finn pey dan eskrow");
  T("Handover / Grabbit pickup", "Remise / retrait Grabbit", "Livrezon / pickup Grabbit");
  T("Buyer confirms · Funds released", "L'acheteur confirme · Fonds versés", "Aseter konfirme · Larzan lib");
  T("Zero-scam guarantee: buyer inspects item before release.", "Garantie anti-arnaque : l'acheteur vérifie l'article avant le versement.", "Garanti zero kokin: aseter get zafer-la avan nou pey.");
  T("Message buyer", "Écrire à l'acheteur", "Ekrir aseter");
  T("Confirm handover", "Confirmer la remise", "Konfirm livrezon");
  T("Payout Sent ✓", "Paiement envoyé ✓", "Larzan finn avoye ✓");
  T("How Trust & Escrow protects you", "Comment la confiance et le séquestre vous protègent", "Kouma konfians ek eskrow protez ou");
  T("Money Locked First", "L'argent est bloqué d'abord", "Larzan bloke avan");
  T("Buyers pay via Juice or card into Bazar Escrow before you hand over the item.",
    "L'acheteur paie par Juice ou par carte sur Bazar Séquestre avant que vous remettiez l'article.",
    "Aseter pey ar Juice ouswa kart dan Bazar Eskrow avan ou donn zafer-la.");
  T("Verified Profiles", "Profils vérifiés", "Profil verifie");
  T("National ID & phone verification plus real peer reviews stop fake buyers and no-shows.",
    "La vérification de la carte d'identité et du téléphone, plus de vrais avis, écartent les faux acheteurs et les rendez-vous manqués.",
    "Verifikasion kart idantite ek telefonn, ek vre lavi lezot itilizater, aret fo aseter ek dimounn ki pa vini.");
  T("Safe Meetup or Grabbit", "Rendez-vous sûr ou Grabbit", "Rann-vou an sekirite ouswa Grabbit");
  T("Meet at a verified public spot or book a tracked Grabbit Express rider to deliver.",
    "Retrouvez-vous dans un lieu public vérifié ou réservez un livreur Grabbit Express suivi en temps réel.",
    "Zwenn dan enn plas piblik verifie ouswa rezerv enn livrer Grabbit Express ki ou kapav swiv.");
  T("Your Resell Listings", "Vos annonces de revente", "Ou bann anons revann");
  T("+ Add new", "+ Ajouter", "+ Azout");
  T("In Escrow", "En séquestre", "Dan eskrow");
  T("Like New", "Comme neuf", "Kouma nef");
  T("Woven beach tote", "Cabas de plage tressé", "Sak laplaz tres");
  T("Artisan Raffia Tote", "Cabas artisanal en raphia", "Sak rafia artizanal");
  T("Active", "En ligne", "Aktif");
  T("Gently Used", "Peu utilisé", "Pa tro servi");
  T("Escrow Ready", "Prêt pour le séquestre", "Pare pou eskrow");
  T("Just listed", "Tout juste publié", "Fek met");
  T("List a secondhand item", "Publier un article d'occasion", "Met enn zafer segonn-lamin");
  T("Item name", "Nom de l'article", "Nom zafer-la");
  T("e.g. AirPods Pro 2, Wooden Desk", "ex. AirPods Pro 2, bureau en bois", "par egzanp AirPods Pro 2, biro dibwa");
  T("Price (MUR)", "Prix (MUR)", "Pri (MUR)");
  T("e.g. 4500", "ex. 4500", "par egzanp 4500");
  T("Condition", "État", "Leta");
  T("Brand New / Sealed", "Neuf / sous emballage", "Nef / pankor ouver");
  T("Publish with Escrow Protection", "Publier avec la protection séquestre", "Met li ar proteksion eskrow");

  /* ───────────── Map (map.html) ───────────── */
  T("Bazar — Map", "Bazar — Carte", "Bazar — Kart");
  T("Map of businesses", "Carte des commerces", "Kart bann bisnis");
  T("Businesses on the map", "Commerces sur la carte", "Bisnis lor kart-la");
  T("Find me", "Me localiser", "Rod kot mo ete");
  T("Tap Find me to see distances", "Touchez « Me localiser » pour voir les distances", "Tap \"Rod kot mo ete\" pou get distans");
  T("Finding your location…", "Recherche de votre position…", "Pe rod kot ou ete…");
  T("You are here", "Vous êtes ici", "Ou isi");
  T("This browser can't share your location", "Ce navigateur ne peut pas partager votre position", "Sa navigater-la pa kapav partaz kot ou ete");
  T("Location is blocked — allow it in your browser", "Localisation bloquée — autorisez-la dans votre navigateur", "Lokalizasion bloke — permet li dan ou navigater");
  T("Couldn't find your location. Try again", "Position introuvable. Réessayez", "Pa finn kapav trouv kot ou ete. Reesey");
  T("Straight line", "À vol d'oiseau", "An ligne drwat");
  T("By road", "Par la route", "Par semin");
  T("Turn on your location to measure the distance.", "Activez votre position pour mesurer la distance.", "Allim ou lokalizasion pou mezir distans-la.");
  T("Tap Show route for the distance and time by car.", "Touchez « Voir l'itinéraire » pour la distance et le temps en voiture.", "Tap \"Montre semin\" pou gagn distans ek letan an loto.");
  T("Show route", "Voir l'itinéraire", "Montre semin");
  T("Calculating…", "Calcul…", "Pe kalkile…");
  T("Driving estimate. Real time depends on traffic.", "Estimation en voiture. Le temps réel dépend de la circulation.", "Estimasion an loto. Vre letan depann lor trafik.");
  T("Couldn't get the road distance. Try again.", "Distance par la route indisponible. Réessayez.", "Pa finn kapav gagn distans par semin. Reesey.");
  T("Dropped pin", "Point choisi", "Plas ki ou finn swazir");
  T("Street food · Port Louis", "Cuisine de rue · Port Louis", "Manze lari · Port Louis");
  T("Fashion · Pereybere", "Mode · Pereybere", "Lamod · Pereybere");
  T("Phones · Quatre Bornes", "Téléphones · Quatre Bornes", "Telefonn · Quatre Bornes");
  T("Plants · Moka", "Plantes · Moka", "Plant · Moka");

  /* ───────────── Landing: rotating trust line ───────────── */
  T("Trusted by Mauritian SMEs & shoppers across the island", "Adopté par les PME et les clients de toute l'île", "Bann PME ek kliyan partou dan lil fer Bazar konfians");
  T("Discover verified shops near you on a live map", "Découvrez les boutiques vérifiées près de vous sur une carte en direct", "Dekouver laboutik verifie pre kot ou lor enn kart an direk");
  T("See the distance and route to any shop", "Voyez la distance et l'itinéraire vers chaque boutique", "Get distans ek semin pou al kot nenport ki laboutik");
  T("Buy & resell safely with Bazar Escrow", "Achetez et revendez en sécurité avec Bazar Séquestre", "Aste ek revann an sekirite ar Bazar Eskrow");
  T("Chat with sellers without leaving Bazar", "Discutez avec les vendeurs sans quitter Bazar", "Koz ar vander san sorti dan Bazar");
  T("AI helps you write better listings", "L'IA vous aide à rédiger de meilleures annonces", "AI ed ou ekrir pli bon anons");
  T("Automatic invoices, camera scan & live insights", "Factures automatiques, scan par caméra et analyses en direct", "Faktir otomatik, skan ar kamera ek stat an direk");
  T("Shop in English, Français or Kreol", "Achetez en anglais, français ou créole", "Aste an Angle, Franse ouswa Kreol");

  /* ───────────── Resell (new design) ───────────── */
  T("Bazar — Resell Marketplace & Escrow", "Bazar — Revente et séquestre", "Bazar — Revann ek eskrow");
  T("+ Sell Item", "+ Vendre", "+ Vann enn zafer");
  T("bazar® Resell · Mauritius", "bazar® Revente · Maurice", "bazar® Revann · Moris");
  T("Browse", "Parcourir", "Get");
  T("My Escrow", "Mon séquestre", "Mo eskrow");
  T("01 · Peer-to-Peer Selling", "01 · Vente entre particuliers", "01 · Vann direk ant dimounn");
  T("Sell gadgets directly to", "Vendez vos appareils directement", "Vann ou bann gadget direk");
  T("people near you.", "aux gens près de chez vous.", "ar dimounn pre kot ou.");
  T("List phones, laptops, sneakers & gear in 30 seconds — zero middlemen, fair local prices.",
    "Publiez téléphones, ordinateurs, baskets et équipements en 30 secondes — sans intermédiaire, à prix justes.",
    "Met telefonn, laptop, sneakers ek lezot zafer dan 30 segonn — okenn intermedier, bon pri lokal.");
  T("Zero listing fee", "Publication gratuite", "Gratis pou met anons");
  T("Instant nearby reach", "Visible tout de suite près de chez vous", "Dimounn pre kot ou trouv li tousuit");
  T("Peer to peer gadgets", "Appareils entre particuliers", "Gadget ant dimounn");
  T("02 · Trust & Safe Payment", "02 · Confiance et paiement sûr", "02 · Konfians ek peman an sekirite");
  T("Money locked in", "L'argent est bloqué par", "Larzan bloke dan");
  T("Bazar Escrow.", "Bazar Séquestre.", "Bazar Eskrow.");
  T("Payments stay protected until you inspect the item in person or via Grabbit Express and confirm handover.",
    "Le paiement reste protégé jusqu'à ce que vous vérifiiez l'article en personne ou via Grabbit Express et confirmiez la remise.",
    "Peman la reste proteze ziska ou get zafer-la ar ou prop lizie ouswa ar Grabbit Express ek konfirm livrezon.");
  T("Juice & Card Escrow", "Séquestre Juice et carte", "Eskrow Juice ek kart");
  T("Zero-scam guarantee", "Garantie anti-arnaque", "Garanti zero kokin");
  T("Locked until handover", "Bloqué jusqu'à la remise", "Bloke ziska livrezon");
  T("03 · Message, Call & Voice", "03 · Message, appel et vocal", "03 · Mesaz, apel ek vwa");
  T("Interact your way", "Échangez comme vous voulez", "Koz kouma ou anvi");
  T("before you buy.", "avant d'acheter.", "avan ou aste.");
  T("Message sellers, place an in-app voice call, or send quick voice notes in English, Français or Kreol.",
    "Écrivez aux vendeurs, appelez-les dans l'app ou envoyez des messages vocaux en anglais, français ou créole.",
    "Ekrir vander, apel zot dan app-la, ouswa avoy mesaz vokal an Angle, Franse ouswa Kreol.");
  T("💬 Message", "💬 Message", "💬 Mesaz");
  T("📞 Call", "📞 Appeler", "📞 Apel");
  T("🎙️ Voice Note", "🎙️ Message vocal", "🎙️ Mesaz vokal");
  T("🎙️ Voice", "🎙️ Vocal", "🎙️ Vwa");
  T("Direct call and voice interaction", "Appel direct et échanges vocaux", "Apel direk ek mesaz vokal");
  T("04 · Face & ID Verification", "04 · Vérification visage et identité", "04 · Verifikasion figir ek idantite");
  T("Real people.", "De vraies personnes.", "Vre dimounn.");
  T("Face & ID checked.", "Visage et identité vérifiés.", "Figir ek idantite verifie.");
  T("Every verified seller completes a live selfie Face Check matched to their Mauritius National ID.",
    "Chaque vendeur vérifié fait un selfie en direct comparé à sa carte d'identité mauricienne.",
    "Sak vander verifie fer enn selfie an direk ki nou konpar ar so kart idantite Moris.");
  T("🪪 National ID Check", "🪪 Contrôle de la carte d'identité", "🪪 Verifikasion kart idantite");
  T("🤳 Live Face Match", "🤳 Selfie en direct", "🤳 Selfie an direk");
  T("ID + Face Verified", "Identité + visage vérifiés", "Idantite + figir verifie");
  T("Trusted Mauritian badge", "Badge de confiance mauricien", "Badz konfians morisien");
  T("Slide controls", "Contrôle des diapositives", "Kontrol bann paz");
  T("Peer to peer", "Entre particuliers", "Ant dimounn");
  T("Escrow payment", "Paiement en séquestre", "Peman eskrow");
  T("Message call voice", "Message, appel, vocal", "Mesaz, apel, vwa");
  T("Face and ID check", "Vérification visage et identité", "Verifikasion figir ek idantite");
  T("Verified Sellers", "Vendeurs vérifiés", "Vander verifie");
  T("iPhone 13 Pro 256GB · Escrow", "iPhone 13 Pro 256 Go · Séquestre", "iPhone 13 Pro 256GB · Eskrow");
  T("+ Buy Rs {1}", "+ Acheter Rs {1}", "+ Aste Rs {1}");
  T("Filter by Mauritian town", "Filtrer par ville", "Filtre par lavil");
  T("Search iPhones, MacBooks, AirPods, cars...", "Cherchez iPhone, MacBook, AirPods, voitures...", "Rod iPhone, MacBook, AirPods, loto...");
  T("Search secondhand listings", "Rechercher dans les annonces d'occasion", "Rod dan anons segonn-lamin");
  T("Post Free Ad", "Publier gratuitement", "Met enn anons gratis");
  T("Featured categories", "Catégories en vedette", "Kategori an vedet");
  T("Shop verified secondhand gadgets & gear in seconds.", "Achetez des appareils d'occasion vérifiés en quelques secondes.", "Aste gadget segonn-lamin verifie dan enn ti moman.");
  T("All Categories ↗", "Toutes les catégories ↗", "Tou kategori ↗");
  T("Resell categories", "Catégories de revente", "Kategori revann");
  T("All Gadgets & Deals", "Tous les appareils et bonnes affaires", "Tou gadget ek bon zafer");
  T("All Ads", "Toutes les annonces", "Tou anons");
  T("{1} items", "{1} articles", "{1} zafer");
  T("{1} ads", "{1} annonces", "{1} anons");
  T("Laptops & Tablets", "Ordinateurs et tablettes", "Laptop ek tablet");
  T("Laptops", "Ordinateurs", "Laptop");
  T("Audio & Gadgets", "Audio et accessoires", "Odio ek gadget");
  T("Audio", "Audio", "Odio");
  T("Watches", "Montres", "Mont");
  T("Sneakers & Fashion", "Baskets et mode", "Sneakers ek lamod");
  T("Sneakers", "Baskets", "Sneakers");
  T("Vehicles", "Véhicules", "Loto");
  T("Latest", "Récents", "Pli resan");
  T("Price ↑", "Prix ↑", "Pri ↑");
  T("Price ↓", "Prix ↓", "Pri ↓");
  T("{1} Escrow deals", "{1} offres en séquestre", "{1} zafer ar eskrow");
  T("Paid via Juice", "Payé via Juice", "Pe ar Juice");
  T("My Active Ads", "Mes annonces actives", "Mo anons aktif");
  T("Escrow enabled", "Séquestre activé", "Eskrow aktive");
  T("Buyer: Kevin R. (ID Verified) · Quatre Bornes", "Acheteur : Kevin R. (identité vérifiée) · Quatre Bornes", "Aseter: Kevin R. (idantite verifie) · Quatre Bornes");
  T("Buyer paid Escrow", "L'acheteur a payé en séquestre", "Aseter finn pey eskrow");
  T("Handover / Pickup", "Remise / retrait", "Livrezon / pickup");
  T("3 · Release", "3 · Versement", "3 · Lib larzan");
  T("Buyer confirms", "L'acheteur confirme", "Aseter konfirme");
  T("Confirm Handover", "Confirmer la remise", "Konfirm livrezon");
  T("Item details", "Détails de l'article", "Detay zafer-la");
  T("✓ Face + ID Verified Seller · Bazar Escrow:", "✓ Vendeur vérifié (visage + identité) · Bazar Séquestre :", "✓ Vander verifie (figir + idantite) · Bazar Eskrow:");
  T("Money stays locked safely until you inspect the item and confirm handover.", "L'argent reste bloqué en sécurité jusqu'à ce que vous vérifiiez l'article et confirmiez la remise.", "Larzan reste bloke an sekirite ziska ou get zafer-la ek konfirm livrezon.");
  T("Make Offer", "Faire une offre", "Fer enn ofer");
  T("Buy with Escrow", "Acheter avec séquestre", "Aste ar eskrow");
  T("✓ Escrow Protected", "✓ Protégé par séquestre", "✓ Proteze par eskrow");
  T("Grabbit / Meetup", "Grabbit / rendez-vous", "Grabbit / rann-vou");
  T("Sealed", "Sous emballage", "Pankor ouver");
  T("Create Listing", "Créer une annonce", "Kre enn anons");
  T("✨ AI Auto-fill", "✨ Remplissage IA", "✨ AI ranpli li");
  T("Item Photos", "Photos de l'article", "Foto zafer-la");
  T("Cover selected", "Photo principale choisie", "Foto prinsipal swazir");
  T("Item title", "Titre de l'article", "Tit zafer-la");
  T("e.g. MacBook Air M2, AirPods Max", "ex. MacBook Air M2, AirPods Max", "par egzanp MacBook Air M2, AirPods Max");
  T("Asking price (Rs)", "Prix demandé (Rs)", "Pri ou demande (Rs)");
  T("e.g. 18500", "ex. 18500", "par egzanp 18500");
  T("Category", "Catégorie", "Kategori");
  T("Brand New", "Neuf", "Nef");
  T("Fair", "État correct", "Korek");
  T("Pickup Area", "Lieu de retrait", "Landrwa pou vinn rod li");
  T("Save Draft", "Enregistrer le brouillon", "Sov brouyon");
  T("Publish Listing", "Publier l'annonce", "Met anons-la");

  /* Resell: smart description helper */
  T("Description", "Description", "Deskripsion");
  T("✨ Write it for me", "✨ Rédige-la pour moi", "✨ Ekrir li pou mwa");
  T("Tell buyers about the item: how old it is, how it works, any marks, what's included…", "Décrivez l'article : son âge, son état de marche, les marques éventuelles, ce qui est inclus…", "Dir aseter lor zafer-la: depi kan ou ena li, kouma li marse, si ena mark, ki ena avek…");
  T("Buyers usually ask about — tap to add:", "Les acheteurs demandent souvent — touchez pour ajouter :", "Aseter souvan demande — tap pou azoute:");
  T("Too short", "Trop court", "Tro kourt");
  T("Fill in the __ blanks", "Complétez les __", "Ranpli bann __");
  T("Basic", "Basique", "Baz");
  T("Good", "Bien", "Bon");
  T("Great", "Excellent", "Extra");
  T("Add a title first, e.g. iPhone 13 128GB", "Ajoutez d'abord un titre, ex. iPhone 13 128 Go", "Met enn tit avan, par egzanp iPhone 13 128GB");
  T("+ Battery health", "+ État de la batterie", "+ Leta batri");
  T("+ Storage", "+ Stockage", "+ Stokaz");
  T("+ Network", "+ Réseau", "+ Rezo");
  T("+ Screen & body", "+ Écran et coque", "+ Ekran ek lekor");
  T("+ Box & charger", "+ Boîte et chargeur", "+ Bwat ek sarzer");
  T("+ Receipt / warranty", "+ Facture / garantie", "+ Resi / garanti");
  T("+ Why selling", "+ Raison de la vente", "+ Kifer pe vande");
  T("+ Processor & RAM", "+ Processeur et RAM", "+ Prosesser ek RAM");
  T("+ Battery", "+ Batterie", "+ Batri");
  T("+ Charger", "+ Chargeur", "+ Sarzer");
  T("+ Keyboard & screen", "+ Clavier et écran", "+ Klavie ek ekran");
  T("+ Battery life", "+ Autonomie", "+ Dire batri");
  T("+ Noise cancelling", "+ Réduction de bruit", "+ Koup bri");
  T("+ Case & cable", "+ Étui et câble", "+ Lakaz ek kab");
  T("+ Cleaned", "+ Nettoyé", "+ Netwaye");
  T("+ Receipt", "+ Facture", "+ Resi");
  T("+ Box & papers", "+ Boîte et papiers", "+ Bwat ek papie");
  T("+ Last service", "+ Dernier entretien", "+ Dernie servis");
  T("+ Strap", "+ Bracelet", "+ Brasle");
  T("+ Authentic", "+ Authentique", "+ Otantik");
  T("+ Size", "+ Taille", "+ Gran");
  T("+ How often worn", "+ Nombre de ports", "+ Konbien fwa finn met li");
  T("+ Box", "+ Boîte", "+ Bwat");
  T("+ Year & mileage", "+ Année et kilométrage", "+ Lane ek kilometraz");
  T("+ Fitness & road tax", "+ Fitness et road tax", "+ Fitness ek road tax");
  T("+ Service history", "+ Historique d'entretien", "+ Istorik servis");
  T("+ Accidents", "+ Accidents", "+ Aksidan");
  T("+ Owners", "+ Propriétaires", "+ Proprieter");
  T("+ Tyres", "+ Pneus", "+ Pner");
  T("{1} · {2}. Pickup in {3} or delivery, paid safely through Bazar Escrow.", "{1} · {2}. Retrait à {3} ou livraison, paiement sécurisé par Bazar Séquestre.", "{1} · {2}. Pickup {3} ouswa livrezon, peman an sekirite ar Bazar Eskrow.");

  /* Resell: in-app chat */
  T("Seller", "Vendeur", "Vander");
  T("✓ ID verified · usually replies in minutes", "✓ Identité vérifiée · répond en général en quelques minutes", "✓ Idantite verifie · dabitid reponn dan enn de minit");
  T("Write a message…", "Écrivez un message…", "Ekrir enn mesaz…");
  T("Message the seller", "Écrire au vendeur", "Ekrir vander");
  T("Message seller", "Écrire au vendeur", "Ekrir vander");
  T("Save listing", "Enregistrer l'annonce", "Sov anons-la");
  T("Chats stay inside Bazar. Never pay outside Bazar Escrow.", "Les discussions restent dans Bazar. Ne payez jamais en dehors de Bazar Séquestre.", "Bann diskision reste dan Bazar. Zame pey deor Bazar Eskrow.");
  T("Is it still available?", "Est-ce toujours disponible ?", "Li ankor disponib?");
  T("Can I see more photos?", "Puis-je voir plus de photos ?", "Mo kapav get plis foto?");
  T("What's your lowest price?", "Quel est votre dernier prix ?", "Ki ou dernie pri?");
  T("Can we meet in {1}?", "Peut-on se retrouver à {1} ?", "Nou kapav zwenn {1}?");
  T("Can you deliver?", "Pouvez-vous livrer ?", "Ou kapav livre?");
  T("Yes, it's still available!", "Oui, c'est toujours disponible !", "Wi, li ankor disponib!");
  T("Sure, I'll send more photos in a minute.", "Bien sûr, j'envoie d'autres photos tout de suite.", "Pa gagn traka, mo avoy plis foto dan enn minit.");
  T("I can do Rs {1} if you pay through Bazar Escrow.", "Je peux faire Rs {1} si vous payez via Bazar Séquestre.", "Mo kapav fer Rs {1} si ou pey ar Bazar Eskrow.");
  T("Yes, we can meet at a public place in {1}.", "Oui, on peut se retrouver dans un lieu public à {1}.", "Wi, nou kapav zwenn dan enn plas piblik {1}.");
  T("Yes, you can choose delivery when you pay with Bazar Escrow.", "Oui, vous pouvez choisir la livraison en payant avec Bazar Séquestre.", "Wi, ou kapav swazir livrezon kan ou pey ar Bazar Eskrow.");
  T("Thanks for your message! I'll reply shortly.", "Merci pour votre message ! Je réponds très vite.", "Mersi pou ou mesaz! Mo reponn ou byento.");

  /* ───────────── Camera window + listing photos (doc-tools.js, resell.html) ───────────── */
  T("Camera", "Caméra", "Kamera");
  T("Upload", "Importer", "Telesarz");
  T("Photo of your item", "Photo de votre article", "Foto ou zafer");
  T("Take a photo with the camera", "Prendre une photo avec la caméra", "Pran enn foto ar kamera");
  T("Upload photos", "Importer des photos", "Telesarz foto");
  T("Starting camera…", "Ouverture de la caméra…", "Pe ouver kamera…");
  T("Switch camera", "Changer de caméra", "Sanz kamera");
  T("Capture", "Prendre la photo", "Pran foto");
  T("Use phone camera / choose a photo", "Utiliser la caméra du téléphone / choisir une photo", "Servi kamera telefonn / swazir enn foto");
  T("This browser can't open the camera here.", "Ce navigateur ne peut pas ouvrir la caméra ici.", "Sa navigater-la pa kapav ouver kamera isi.");
  T("Camera is blocked. Allow it in your browser's site settings, or use the button below.", "La caméra est bloquée. Autorisez-la dans les réglages du site, ou utilisez le bouton ci-dessous.", "Kamera bloke. Permet li dan reglaz sit-la, ouswa servi bouton anba-la.");
  T("No camera found. Use the button below to choose a photo.", "Aucune caméra trouvée. Utilisez le bouton ci-dessous pour choisir une photo.", "Pena kamera. Servi bouton anba-la pou swazir enn foto.");

  /* ═════════════ Engine (no need to edit below) ═════════════ */
  var ATTRS = ["placeholder", "aria-label", "alt", "title"];
  var SKIP = "script,style,svg,textarea,[data-no-i18n],#edit-bar";
  var origText = new WeakMap(), origAttr = new WeakMap();
  var lang = "en", origTitle = document.title;

  // Rows with {1}, {2} become patterns.
  var patterns = { fr: [], mfe: [] };
  Object.keys(D.fr).forEach(function (en) {
    if (!/\{\d\}/.test(en)) return;
    var nums = [];
    en.replace(/\{(\d)\}/g, function (_, n) { nums.push(n); });
    var re = new RegExp("^" + en.split(/\{\d\}/).map(function (s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }).join("(.+?)") + "$");
    ["fr", "mfe"].forEach(function (l) { patterns[l].push({ re: re, nums: nums, out: D[l][en] }); });
  });

  function tr(text, hint) {
    if (lang === "en") return null;
    var d = D[lang];
    if (hint && d["#" + hint] != null) return d["#" + hint];
    if (d[text] != null) return d[text];
    var ps = patterns[lang];
    for (var i = 0; i < ps.length; i++) {
      var m = text.match(ps[i].re);
      if (m) return ps[i].out.replace(/\{(\d)\}/g, function (_, n) { return m[ps[i].nums.indexOf(n) + 1]; });
    }
    return null;
  }

  function doText(n) {
    var p = n.parentElement;
    if (!p || p.closest(SKIP)) return;
    var o = origText.get(n);
    if (o === undefined) { o = n.nodeValue; origText.set(n, o); }
    var t = o.replace(/\s+/g, " ").trim();
    if (!t) return;
    var h = p.closest("[data-text]");
    var r = tr(t, h && h.getAttribute("data-text"));
    var nv = r == null ? o : o.match(/^\s*/)[0] + r + o.match(/\s*$/)[0];
    if (n.nodeValue !== nv) n.nodeValue = nv;
  }

  function doAttrs(el) {
    if (el.closest(SKIP)) return;
    ATTRS.forEach(function (a) {
      if (!el.hasAttribute(a)) return;
      var m = origAttr.get(el);
      if (!m) { m = {}; origAttr.set(el, m); }
      if (!(a in m)) m[a] = el.getAttribute(a);
      var r = tr(m[a].trim());
      var nv = r == null ? m[a] : r;
      if (el.getAttribute(a) !== nv) el.setAttribute(a, nv);
    });
  }

  function walk(root) {
    if (root.nodeType === 3) return doText(root);
    if (root.nodeType !== 1) return;
    doAttrs(root);
    root.querySelectorAll("*").forEach(doAttrs);
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), n;
    while ((n = w.nextNode())) doText(n);
  }

  // Translate whatever the page adds or changes later (chat replies, labels, placeholders).
  var obs = new MutationObserver(function (recs) {
    recs.forEach(function (r) {
      if (r.type === "childList") r.addedNodes.forEach(walk);
      else if (r.type === "characterData") origText.set(r.target, r.target.nodeValue); // someone typed: new original
      else if (r.type === "attributes") {
        var m = origAttr.get(r.target) || {};
        m[r.attributeName] = r.target.getAttribute(r.attributeName);
        origAttr.set(r.target, m);
        doAttrs(r.target);
      }
    });
    obs.takeRecords(); // ignore our own changes
  });

  // Short language code beside the flag on the language button (EN / FR / KR).
  var CODES = { en: "EN", fr: "FR", mfe: "KR" };
  var codeCss = document.createElement("style");
  codeCss.textContent =
    "#langBtn.has-code{width:auto!important;display:inline-flex!important;align-items:center;gap:6px;" +
    "padding:0 12px 0 5px!important;border-radius:999px!important}" +
    "#langBtn .lang-code{font:700 12px/1 Inter,system-ui,sans-serif;letter-spacing:.04em;color:#0e0e0c}";
  document.head.appendChild(codeCss);
  function showCode() {
    var b = document.getElementById("langBtn");
    if (!b) return;
    var s = b.querySelector(".lang-code");
    if (!s) {
      s = document.createElement("span");
      s.className = "lang-code";
      s.setAttribute("data-no-i18n", "");
      s.setAttribute("aria-hidden", "true");
      b.appendChild(s);
      b.classList.add("has-code");
    }
    s.textContent = CODES[lang];
  }

  function apply(code) {
    lang = (code === "fr" || code === "mfe") ? code : "en";
    document.documentElement.lang = lang;
    showCode();
    walk(document.body);
    var tt = tr(origTitle);
    document.title = tt == null ? origTitle : tt;
    obs.takeRecords();
    document.dispatchEvent(new CustomEvent("bazar:lang", { detail: lang }));
  }

  // Hook into the page's own flag menu: setLang('fr') now also translates the page.
  var pageSetLang = window.setLang;
  window.setLang = function (code) {
    if (typeof pageSetLang === "function") pageSetLang(code);
    try { localStorage.setItem("bazar-lang", code); } catch (e) {}
    apply(code);
  };
  window.bazarT = function (text) { var r = tr(text); return r == null ? text : r; };

  obs.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  var saved = "en";
  try { saved = localStorage.getItem("bazar-lang") || "en"; } catch (e) {}
  apply(saved);
})();
