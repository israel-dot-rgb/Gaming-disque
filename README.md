# Conférence « Créer son disque gaming PC » : page d'inscription

Page web statique (pas de serveur, pas de base de données). Le visiteur remplit un
formulaire, puis un bouton ouvre WhatsApp avec un message prérempli vers ton numéro.

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | La structure et les **textes** de la page |
| `style.css` | Le **design** : couleurs, tailles, animations |
| `script.js` | Le **comportement** : vérification du formulaire, message WhatsApp |
| `images/` | Les deux photos (poste de jeu, manette) |
| `_headers` | Les **règles de sécurité** envoyées par Netlify |
| `README.md` | Ce guide |

Garde cette organisation : `index.html` charge `style.css`, `script.js` et `images/`
par leur nom. Si tu déplaces un fichier, la page perd son design ou ses images.

## Voir la page sur ton ordinateur

Double-clique sur `index.html` : elle s'ouvre dans le navigateur.
(Le fichier `_headers` n'agit que sur Netlify, pas en local.)

## Modifier la page

Ouvre le fichier avec un éditeur de texte (Bloc-notes, VS Code...), cherche avec Ctrl+F.

**Ajouter la date**
Dans `index.html`, remplace `Date à confirmer` (étiquette en haut de la page) par exemple par `Samedi 25 octobre · 18h (heure de Lomé)`.

**Changer le prix** : il apparaît à 3 endroits, à changer partout :
1. `index.html` : le bouton « Je réserve ma place · 2 000 FCFA »
2. `index.html` : `<div class="price">2 000 FCFA</div>`
3. `script.js` : `const PRIX = "2000 FCFA";` (en haut du fichier)

**Changer le numéro WhatsApp** : 
- `script.js` : `const NUMERO_WHATSAPP = "22897537819";` (sans `+` ni espaces)
- `index.html` : l'adresse du bouton `https://wa.me/22897537819` (même numéro)

**Changer les numéros de paiement** : dans `index.html`, bloc `<div class="pay">`.

**Changer les couleurs** : dans `style.css`, section 1 « COULEURS ».

## Mettre en ligne (gratuit)

1. Va sur **app.netlify.com/drop**
2. Glisse **le dossier complet** (pas seulement `index.html`)
3. Crée un compte gratuit pour que le site ne soit pas supprimé
4. Pour mettre à jour : glisse le dossier modifié sur la page « Deploys » de ton site, le lien reste identique

## Sécurité : ce qui est en place

| Risque | Protection |
|---|---|
| Injection de code via le formulaire | Le nom et la ville sont nettoyés et limités aux lettres (2 à 60 caractères). Le texte est affiché avec `textContent`, jamais avec `innerHTML`. |
| Message WhatsApp piégé | `encodeURIComponent` encode tout le texte saisi : il ne peut pas modifier l'adresse du lien. |
| Valeurs de liste modifiées | Niveau et moyen de paiement sont comparés à une liste autorisée. |
| Texte invisible ou trompeur | Les caractères de contrôle et d'inversion de texte sont supprimés. |
| Scripts ou images venant d'ailleurs | `_headers` : politique de contenu (CSP) qui n'autorise que les fichiers de la page. |
| Page affichée sur un faux site (clickjacking) | `frame-ancestors 'none'` et `X-Frame-Options: DENY` |
| Fuite d'informations | `Referrer-Policy: no-referrer`, `rel="noopener noreferrer"` sur le lien WhatsApp, permissions caméra/micro/localisation coupées |
| Connexion non chiffrée | `Strict-Transport-Security` (HTTPS obligatoire) |
| Données conservées | Aucune : la page n'enregistre ni n'envoie rien à un serveur, il n'y a pas de cookies ni de traceurs |
| Code externe compromis | Aucune bibliothèque ni police venant d'un autre site |

## Ce que la page ne peut PAS faire (à gérer toi-même)

- **Fausses preuves de paiement** : vérifie toujours le paiement **dans ton application T-Money / Flooz** avant d'envoyer le lien Meet. Une capture d'écran peut être falsifiée.
- **Intrus dans la réunion** : ne publie jamais le lien Meet sur la page. Envoie-le après paiement, garde « Demander à rejoindre » actif et, si possible, restreins l'accès aux invités.
- **Spam WhatsApp** : n'importe qui peut écrire à ton numéro. Pour limiter les messages indésirables, utilise les options de blocage et de confidentialité de WhatsApp.
- **Numéros visibles** : tes numéros de paiement sont publics, c'est inévitable. Utilise de préférence un compte dédié à cette activité.
- **Vérifications côté visiteur** : les contrôles du formulaire se font dans le navigateur. Ils protègent ton message WhatsApp, mais ne remplacent pas ta propre vigilance sur ce que tu reçois.
- Aucune page ne peut être garantie inviolable : ces mesures réduisent fortement les risques d'une page statique, elles ne les suppriment pas.
