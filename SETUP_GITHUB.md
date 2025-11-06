# Instructions pour créer le repository GitHub

## Option 1 : Via l'interface web GitHub

1. Allez sur https://github.com/new
2. Nom du repository : `le-bon-cafe`
3. Description : "Site web Le Bon Café - React + Tailwind CSS"
4. Visibilité : **Public**
5. **NE PAS** cocher "Initialize this repository with a README" (le projet existe déjà)
6. Cliquez sur "Create repository"

Ensuite, exécutez ces commandes dans le terminal :

```bash
cd "/Users/leobarreau/Documents/Fil Rouge Site Bon café"
git remote add origin https://github.com/VOTRE_USERNAME/le-bon-cafe.git
git branch -M main
git push -u origin main
```

Remplacez `VOTRE_USERNAME` par votre nom d'utilisateur GitHub.

## Option 2 : Via GitHub CLI (si installé)

```bash
cd "/Users/leobarreau/Documents/Fil Rouge Site Bon café"
gh repo create le-bon-cafe --public --source=. --remote=origin --push
```

## Option 3 : Via l'API GitHub (avec token)

Si vous avez un token GitHub, je peux créer le repository automatiquement.

