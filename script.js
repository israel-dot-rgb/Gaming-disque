/* ==========================================================================
   script.js : LE COMPORTEMENT DE LA PAGE
   Ce fichier fait deux choses :
     1. Il vérifie le formulaire et prépare le message WhatsApp.
     2. Il fait apparaître les sections en douceur pendant le défilement.
   Il ne contacte AUCUN serveur : rien n'est enregistré, tout reste dans le navigateur.
   ========================================================================== */

"use strict"; /* Mode strict : JavaScript signale les erreurs de programmation au lieu de les ignorer */

/* Tout le code est enfermé dans une fonction qui s'exécute tout de suite.
   Ainsi, aucune variable ne "fuit" dans la page : un script externe ne peut pas les modifier. */
(function () {

  /* ------------------------------------------------------------------------
     1. RÉGLAGES (à modifier ici si besoin)
     ------------------------------------------------------------------------ */
  const NUMERO_WHATSAPP = "22897537819";   /* numéro qui reçoit les inscriptions : indicatif + numéro, sans + ni espace */
  const PRIX = "2000 FCFA";                /* prix écrit dans le message WhatsApp */
  const TITRE = "Créer son disque gaming PC";

  /* LISTES BLANCHES : seules ces valeurs sont acceptées.
     Même si quelqu'un modifie la page avec les outils du navigateur,
     une valeur inventée est remplacée par la première de la liste. */
  const NIVEAUX = ["Débutant", "Intermédiaire", "Avancé"];
  const MOYENS  = ["T-Money", "Flooz"];

  /* RÈGLE POUR LE NOM ET LA VILLE :
     - doit commencer par une lettre (\p{L} = n'importe quelle lettre, accents inclus)
     - puis lettres, espaces, apostrophe (droite ou courbe), point ou tiret
     - entre 2 et 60 caractères au total
     Les chiffres, symboles et balises (< > { } etc.) sont refusés. */
  const REGLE_TEXTE = /^[\p{L}\p{M}][\p{L}\p{M}'’ .\-]{1,59}$/u;


  /* ------------------------------------------------------------------------
     2. OUTILS
     ------------------------------------------------------------------------ */

  /* Nettoie un texte saisi par le visiteur :
     - retire les caractères invisibles ou de contrôle (qui pourraient cacher ou fausser du texte)
     - remplace les suites d'espaces par un seul espace
     - coupe à la longueur maximale */
  function nettoyer(texte, longueurMax) {
    return String(texte)
      .normalize("NFC")
      .replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, longueurMax);
  }

  /* Renvoie la valeur choisie seulement si elle est dans la liste autorisée */
  function valeurAutorisee(valeur, liste) {
    return liste.includes(valeur) ? valeur : liste[0];
  }


  /* ------------------------------------------------------------------------
     3. FORMULAIRE → MESSAGE WHATSAPP
     ------------------------------------------------------------------------ */
  const bouton  = document.getElementById("go");
  const erreur  = document.getElementById("err");

  /* Sécurité : si un élément manque dans la page, on s'arrête proprement */
  if (bouton && erreur) {

    bouton.addEventListener("click", function (evenement) {

      /* a) Lire et nettoyer ce que le visiteur a tapé */
      const nom   = nettoyer(document.getElementById("nom").value, 60);
      const ville = nettoyer(document.getElementById("ville").value, 60);

      /* b) Vérifier. En cas d'erreur : on annule l'ouverture de WhatsApp (preventDefault) et on affiche un message.
            textContent écrit du TEXTE simple : il ne peut jamais exécuter de code (contrairement à innerHTML). */
      if (!REGLE_TEXTE.test(nom) || !REGLE_TEXTE.test(ville)) {
        evenement.preventDefault();
        erreur.textContent = "Merci d'écrire ton nom et ta ville avec des lettres uniquement (2 à 60 caractères).";
        return;
      }
      erreur.textContent = "";

      /* c) Récupérer les listes déroulantes en n'acceptant que les valeurs prévues */
      const niveau = valeurAutorisee(document.getElementById("niveau").value, NIVEAUX);
      const moyen  = valeurAutorisee(document.getElementById("moyen").value, MOYENS);

      /* d) Écrire le message. \n = retour à la ligne. */
      const message =
        "Bonjour, je m'inscris à la conférence « " + TITRE + " ».\n" +
        "Nom : " + nom + "\n" +
        "Ville : " + ville + "\n" +
        "Niveau : " + niveau + "\n" +
        "Paiement " + PRIX + " via : " + moyen + "\n" +
        "Je t'envoie la capture du paiement.";

      /* e) Construire l'adresse WhatsApp.
            encodeURIComponent transforme les caractères spéciaux (espaces, accents, &, ?...)
            en un format sûr pour une adresse web : le texte ne peut pas "casser" le lien. */
      bouton.href = "https://wa.me/" + NUMERO_WHATSAPP + "?text=" + encodeURIComponent(message);

      /* Le navigateur ouvre ensuite le lien normalement (nouvel onglet, défini dans index.html). */
    });
  }


  /* ------------------------------------------------------------------------
     4. APPARITION DES SECTIONS PENDANT LE DÉFILEMENT
     ------------------------------------------------------------------------ */
  const elements = document.querySelectorAll(".reveal");   /* tous les éléments marqués "reveal" */

  if ("IntersectionObserver" in window) {
    /* IntersectionObserver prévient quand un élément entre dans l'écran */
    const observateur = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (entree) {
        if (entree.isIntersecting) {
          entree.target.classList.add("in");        /* déclenche l'animation CSS */
          observateur.unobserve(entree.target);     /* inutile de surveiller encore cet élément */
        }
      });
    }, { threshold: 0.12 });                         /* visible à 12 % = on déclenche */

    elements.forEach(function (el) { observateur.observe(el); });
  } else {
    /* Très vieux navigateur : on affiche tout directement, sans animation */
    elements.forEach(function (el) { el.classList.add("in"); });
  }

})();
