# PV Pêche — application installable (iPhone et Android)

Application de saisie des contrôles de pêche : connexion par identifiant et mot de passe, fiche en 5 étapes,
infractions classées par type avec recherche NATINF, photos, signature du contrevenant, numérotation automatique,
archives chiffrées avec recherche. La fiche se **génère en PDF ou en Word** et s'envoie **depuis votre propre messagerie**.

**Aucune donnée ne quitte le téléphone**, sauf quand vous partagez vous-même un document. Pas de serveur, pas de compte en ligne, pas d'envoi automatique.

## Contenu du dossier
`index.html` (l'application) · `sw.js` (fonctionnement hors connexion) · `manifest.webmanifest`, `icon-*.png`, `apple-touch-icon.png` (nom et icône).

## Mise en ligne avec GitHub (gratuit, environ 10 minutes)
1. Créez un compte sur **github.com**.
2. Créez un dépôt : bouton **New** (ou « + » > *New repository*). Nom : `pv-peche`. Choisissez **Public** (les pages gratuites de GitHub l'exigent).
   Ce dépôt ne contient **aucune donnée personnelle** : ni noms, ni adresses, ni fiches.
3. Dans le dépôt : **Add file** > **Upload files**. Faites glisser **les fichiers** de ce dossier (pas le fichier zip), puis **Commit changes**.
4. **Settings** > **Pages** > *Build and deployment* > *Source* : **Deploy from a branch** ; *Branch* : **main**, dossier **/ (root)** ; **Save**.
5. Attendez 1 à 2 minutes : GitHub affiche l'adresse de l'application, de la forme `https://VOTRE-NOM.github.io/pv-peche/`.

*Variante plus simple :* **Netlify Drop** permet de glisser-déposer le dossier et donne une adresse en quelques secondes.

## Installation sur les téléphones
- **iPhone (Safari obligatoire)** : ouvrez l'adresse, touchez **Partager**, puis **Sur l'écran d'accueil**, puis **Ajouter**.
- **Android (Chrome)** : ouvrez l'adresse, menu **⋮**, puis **Installer l'application**.

Ouvrez l'application **une première fois avec du réseau** : elle se met alors en cache et fonctionne ensuite sans connexion.

## Première utilisation : votre accès
Au premier lancement, **créez votre identifiant et un mot de passe (10 caractères minimum)**. Ensuite, onglet **Réglages** : saisissez les noms des gardes (un par ligne) ; ils seront cochés par défaut.
À chaque ouverture, l'application demande l'identifiant et le mot de passe. Elle **se verrouille toute seule** après 5 minutes d'inactivité ou si vous quittez l'application plus de 2 minutes ; le bouton cadenas (en haut à droite) verrouille tout de suite.
Après 5 essais ratés, il faut attendre de plus en plus longtemps avant de réessayer.

## Utilisation
1. Onglet **Nouveau PV** : 5 étapes (agent verbalisateur, contrevenant, lieu et faits, reconnaissance et signature, document).
2. À l'étape **Lieu et faits**, choisissez un **type d'infraction** : par exemple « Pêche sans carte » coche d'un coup ses 3 NATINF (vous pouvez en décocher). Vous pouvez aussi chercher par mot-clé ou par code. La liste complète n'est affichée que si vous choisissez un type ou tapez une recherche.
3. Étape **Document** : **Générer l'aperçu**, puis **Partager / enregistrer en PDF** (ou en Word). Le téléphone ouvre sa feuille de partage : choisissez **Mail**, **Gmail**, **Outlook**… ; le document est déjà en pièce jointe, vous choisissez les destinataires. Sur ordinateur, le fichier est téléchargé.
4. À ce moment la fiche est **archivée** avec son numéro (`PV-2026-001`…), qui ne change plus et n'est jamais réutilisé.
5. Onglet **Archives** : recherche par n° de PV, nom, prénom ou date de naissance ; on peut y repartager le PDF ou le Word.

## Mettre à jour l'application
Dans le dépôt GitHub, remplacez `index.html` (bouton *Upload files*) et changez le numéro de version en tête de `sw.js` (`pvpeche-v1` → `pvpeche-v2`).
Les téléphones récupèrent la mise à jour à l'ouverture suivante avec du réseau (parfois la deuxième).

## Sécurité et données personnelles : ce que fait (et ne fait pas) la connexion
- Le mot de passe sert à **chiffrer les archives** stockées dans le téléphone (chiffrement AES-256, clé dérivée du mot de passe). Sans lui, les fiches sont illisibles, même avec le téléphone en main. Le mot de passe n'est **jamais envoyé nulle part**.
- **Mot de passe perdu = archives perdues** : il n'existe aucun moyen de le récupérer. L'écran de connexion propose seulement de tout effacer et de recommencer.
- C'est une connexion **propre à chaque téléphone**, pas un compte central : elle n'empêche pas quelqu'un d'ouvrir l'adresse publique de l'application et de créer son propre accès, mais il n'y trouvera aucune de vos données. Pour **réserver l'accès au site lui-même** à des personnes identifiées, il faudrait un service d'authentification devant le site (par exemple Cloudflare Access) : à étudier si besoin.
- Les fiches ne sont **ni sauvegardées ni synchronisées** : téléphone perdu, réinitialisé ou données du navigateur effacées = archives perdues. Le PDF ou le Word envoyé depuis votre messagerie est la **copie de référence** : mettez une adresse de la fédération en destinataire.
- Les fichiers PDF/Word partagés contiennent des données nominatives (non chiffrés) : n'utilisez que des adresses validées avec la fédération.
- Verrouillez aussi le téléphone par code ou biométrie.

## À vérifier avant usage
- **Liste des infractions (NATINF)** : issue d'un guide de l'Agence française pour la biodiversité arrêté à début 2017 ; des codes ont pu changer. Contrôlez sur natinf.fr.
- **Arrêté municipal** : l'application propose le NATINF 6032 (violation d'un arrêté de police, article R.610-5 du code pénal), classé en **2ème classe**, d'après une réponse ministérielle de février 2025 qui indique que, depuis le décret du 15 février 2022, le non-respect d'un arrêté de police du maire est une contravention de 2ème classe (c'était la 1ère classe dans le guide de 2017). Le même texte indique que ces infractions ne sont pas toutes référencées par des NATINF spécifiques : si aucun code dédié n'existe, le guide recommande le code générique 99999. À confirmer auprès de la fédération ou du parquet.
- Les **types d'infraction** sont un classement de commodité ; seul « Pêche sans carte » (NATINF 7384, 20165, 20166, repris de votre PV exemple) et « Carte non présentée » (21467, 21468) cochent plusieurs codes d'un coup.
- La formulation des libellés est abrégée ; seuls les trois premiers codes ont leurs textes « prévue par / réprimée par » complets.

## Limites connues
- Testé dans un navigateur de test (connexion, verrouillage, types d'infraction, recherche, signature, photos, archives chiffrées, PDF, Word, mode hors connexion), **pas sur de vrais iPhone et Android**. Sur iPhone, le partage doit être déclenché par un appui direct : si rien ne s'ouvre, réessayez.
- Pas de sauvegarde/export des archives, ni de changement de mot de passe (pour l'instant).
- Pas de publication dans l'App Store / Google Play (compte développeur payant et validation par Apple/Google, possible plus tard).
