# Guide de démarrage rapide

## Étapes d'installation

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Configurer les variables d'environnement**
   
   Créez un fichier `.env` à la racine du projet avec le contenu suivant :
   ```
   DATABASE_URL="file:./dev.db"
   NEXT_PUBLIC_WEATHER_API_KEY=votre_cle_api_openweathermap
   ```
   
   Pour obtenir une clé API et s'abonner à One Call API 3.0 :
   - Allez sur https://openweathermap.org/api
   - Créez un compte gratuit
   - Allez dans votre tableau de bord : https://home.openweathermap.org/api_keys
   - **Important** : Abonnez-vous à "One Call by Call" (1,000 appels/jour gratuits)
   - Générez ou utilisez votre clé API existante

3. **Initialiser la base de données**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. **Lancer l'application**
   ```bash
   npm run dev
   ```

5. **Ouvrir dans le navigateur**
   - Allez sur http://localhost:3000
   - L'application devrait afficher la météo de Paris par défaut

## Fonctionnalités disponibles

✅ Recherche de villes par nom
✅ Géolocalisation automatique
✅ Affichage de la météo en temps réel
✅ Prévisions sur 5 jours
✅ Sauvegarde automatique des emplacements dans la base de données
✅ Interface entièrement en français
✅ Design responsive et moderne

## Dépannage

**Erreur "API key not found" ou "403 Forbidden"**
- Vérifiez que votre fichier `.env` contient bien `NEXT_PUBLIC_WEATHER_API_KEY`
- **Important** : Assurez-vous que votre compte est abonné à "One Call by Call" dans votre tableau de bord OpenWeatherMap
- Redémarrez le serveur après avoir ajouté la clé API

**Erreur de base de données**
- Assurez-vous d'avoir exécuté `npx prisma generate` et `npx prisma migrate dev`
- Vérifiez que le fichier `prisma/dev.db` existe

**Erreur "Ville non trouvée"**
- Vérifiez l'orthographe du nom de la ville
- Essayez avec le nom en anglais si la recherche en français ne fonctionne pas

