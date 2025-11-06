#!/bin/bash

# Script pour configurer le repository GitHub pour Le Bon Café

echo "🚀 Configuration du repository GitHub pour Le Bon Café"
echo ""
read -p "Entrez votre nom d'utilisateur GitHub: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ Le nom d'utilisateur est requis"
    exit 1
fi

REPO_NAME="le-bon-cafe"
REPO_URL="https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

echo ""
echo "📋 Instructions :"
echo "1. Créez d'abord le repository sur GitHub :"
echo "   https://github.com/new"
echo ""
echo "   - Nom : ${REPO_NAME}"
echo "   - Visibilité : Public"
echo "   - NE PAS initialiser avec README"
echo ""
read -p "Appuyez sur Entrée une fois le repository créé sur GitHub..."

echo ""
echo "🔗 Configuration du remote..."
git remote remove origin 2>/dev/null
git remote add origin "${REPO_URL}"

echo "🔄 Renommage de la branche en 'main'..."
git branch -M main

echo "📤 Push vers GitHub..."
git push -u origin main

echo ""
echo "✅ Configuration terminée !"
echo "🌐 Votre repository : ${REPO_URL}"

