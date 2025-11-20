# Guide de dépannage - Application Météo

## Erreur 401 - Clé API invalide

Si vous recevez l'erreur "Clé API invalide" (401), voici les étapes à suivre :

### 1. Vérifier votre clé API

1. Allez sur https://home.openweathermap.org/api_keys
2. Vérifiez que votre clé API est **Active** (statut vert)
3. Copiez votre clé API complète

### 2. Mettre à jour le fichier .env

1. Ouvrez le fichier `.env` à la racine du projet
2. Vérifiez que la ligne contient bien :
   ```
   NEXT_PUBLIC_WEATHER_API_KEY=votre_cle_api_complete_ici
   ```
3. Assurez-vous qu'il n'y a **pas d'espaces** avant ou après le `=`
4. Assurez-vous qu'il n'y a **pas de guillemets** autour de la clé

### 3. Redémarrer le serveur

Après avoir modifié le fichier `.env`, vous **devez** redémarrer le serveur :

```bash
# Arrêtez le serveur (Ctrl+C)
# Puis relancez :
npm run dev
```

### 4. Vérifier que la clé fonctionne

Testez votre clé API directement :

```bash
# Remplacez YOUR_API_KEY par votre vraie clé
curl "https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=YOUR_API_KEY&units=metric"
```

Si vous obtenez une erreur 401, votre clé API est invalide ou expirée.

### 5. Générer une nouvelle clé API

Si votre clé ne fonctionne pas :

1. Allez sur https://home.openweathermap.org/api_keys
2. Cliquez sur "Generate" pour créer une nouvelle clé
3. Donnez un nom à votre clé (ex: "Weather App")
4. Copiez la nouvelle clé
5. Mettez à jour votre fichier `.env`
6. Redémarrez le serveur

### 6. Vérifier les limites de votre compte

Les comptes gratuits OpenWeatherMap ont des limites :
- **60 appels/minute**
- **1,000,000 appels/mois**

Si vous dépassez ces limites, vous recevrez une erreur 429.

## Erreur 403 - Accès refusé (One Call API 3.0)

Si vous recevez une erreur 403, cela signifie que votre compte n'est pas abonné à One Call API 3.0. 

**Solution** : L'application utilisera automatiquement les API standards en fallback. Vous pouvez continuer à utiliser l'application normalement.

Si vous voulez utiliser One Call API 3.0 :
1. Allez sur https://openweathermap.org/api/one-call-3
2. Abonnez-vous à "One Call by Call" (1,000 appels/jour gratuits)
3. Redémarrez l'application

## Erreur 429 - Trop de requêtes

Si vous recevez une erreur 429 :
- Attendez quelques minutes
- Vérifiez votre utilisation sur https://home.openweathermap.org/api_keys
- Considérez passer à un plan payant si vous dépassez souvent les limites

## Le serveur ne charge pas les variables d'environnement

Si les modifications du fichier `.env` ne sont pas prises en compte :

1. **Arrêtez complètement le serveur** (Ctrl+C)
2. Vérifiez que le fichier `.env` est bien à la racine du projet
3. Vérifiez qu'il n'y a pas d'espaces ou de caractères spéciaux
4. Relancez le serveur : `npm run dev`

## Vérifier la configuration

Pour vérifier que votre clé API est bien chargée :

```bash
node -e "require('dotenv').config(); console.log('API Key:', process.env.NEXT_PUBLIC_WEATHER_API_KEY ? 'PRÉSENTE (' + process.env.NEXT_PUBLIC_WEATHER_API_KEY.substring(0, 8) + '...)' : 'MANQUANTE');"
```

Si cela affiche "MANQUANTE", votre fichier `.env` n'est pas correctement configuré.

