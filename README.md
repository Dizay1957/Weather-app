# Application Météo - Next.js avec One Call API 3.0

Une application météo moderne et complète construite avec Next.js, TypeScript, et Tailwind CSS, utilisant l'API **One Call API 3.0** d'OpenWeatherMap.

## Fonctionnalités

- 🌤️ Affichage de la météo en temps réel (données mises à jour toutes les 10 minutes)
- 🔍 Recherche de villes avec géocodage automatique
- 📍 Géolocalisation automatique
- 📊 Prévisions horaires sur 24 heures
- 📅 Prévisions quotidiennes sur 8 jours
- ⚠️ Alertes météo gouvernementales (si disponibles)
- 💾 Sauvegarde des emplacements dans la base de données
- 🇫🇷 Interface entièrement en français
- 🎨 Design moderne et responsive avec mode sombre

## Prérequis

- Node.js 18+ 
- npm ou yarn
- **Clé API OpenWeatherMap avec abonnement One Call API 3.0**
  - Créez un compte sur [openweathermap.org](https://openweathermap.org/api)
  - Abonnez-vous à **"One Call by Call"** (1,000 appels/jour gratuits)
  - Obtenez votre clé API dans votre [tableau de bord](https://home.openweathermap.org/api_keys)

## Installation

1. Clonez le repository ou naviguez vers le dossier du projet

2. Installez les dépendances :
```bash
npm install
```

3. Configurez les variables d'environnement :
   - Créez un fichier `.env` à la racine
   - Ajoutez votre clé API OpenWeatherMap :
   ```
   NEXT_PUBLIC_WEATHER_API_KEY=votre_cle_api_ici
   DATABASE_URL="file:./dev.db"
   ```

4. Initialisez la base de données :
```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. Lancez le serveur de développement :
```bash
npm run dev
```

6. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur

## Structure du projet

```
.
├── app/                    # Pages et routes Next.js
│   ├── api/               # Routes API
│   │   ├── onecall/      # Route One Call API 3.0
│   │   ├── weather/      # Route météo (compatibilité)
│   │   ├── forecast/     # Route prévisions (compatibilité)
│   │   └── locations/    # Gestion des emplacements
│   ├── globals.css        # Styles globaux
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Page d'accueil
├── components/            # Composants React
│   ├── WeatherCard.tsx    # Carte météo principale
│   ├── DailyForecast.tsx  # Prévisions sur 8 jours
│   ├── HourlyForecast.tsx # Prévisions horaires (24h)
│   ├── WeatherAlerts.tsx  # Alertes météo
│   └── SearchBar.tsx      # Barre de recherche
├── lib/                   # Utilitaires
│   ├── weather.ts         # Service API météo (One Call 3.0)
│   └── db.ts              # Client Prisma
└── prisma/                # Schéma de base de données
    └── schema.prisma
```

## Technologies utilisées

- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling moderne
- **Prisma** - ORM pour la base de données
- **SQLite** - Base de données légère
- **Axios** - Client HTTP
- **Lucide React** - Icônes modernes
- **OpenWeatherMap One Call API 3.0** - Données météo complètes

## API Routes

### One Call API 3.0 (Recommandé)
- `GET /api/onecall?city={ville}` - Données complètes par ville (current + hourly + daily + alerts)
- `GET /api/onecall?lat={lat}&lon={lon}` - Données complètes par coordonnées
- `GET /api/onecall?city={ville}&exclude=minutely,alerts` - Exclure certaines données

### Routes de compatibilité (anciennes API)
- `GET /api/weather?city={ville}` - Météo actuelle par ville
- `GET /api/weather?lat={lat}&lon={lon}` - Météo actuelle par coordonnées
- `GET /api/forecast?city={ville}` - Prévisions sur 5 jours

### Gestion des emplacements
- `GET /api/locations` - Liste des emplacements sauvegardés
- `POST /api/locations` - Sauvegarder un emplacement

## Fonctionnalités One Call API 3.0

Cette application utilise la dernière version de l'API OpenWeatherMap qui offre :

- **Données en temps réel** : Mises à jour toutes les 10 minutes
- **Prévisions horaires** : 48 heures de prévisions détaillées
- **Prévisions quotidiennes** : 8 jours de prévisions
- **Prévisions minute par minute** : Précipitations pour l'heure à venir (optionnel)
- **Alertes météo** : Alertes gouvernementales en temps réel
- **Données historiques** : Accès aux données météo passées (fonctionnalité future)

## Abonnement One Call API 3.0

L'API One Call 3.0 utilise un modèle "pay-as-you-call" :
- **Gratuit** : 1,000 appels/jour
- Abonnement requis : Vous devez vous abonner à "One Call by Call" dans votre compte OpenWeatherMap
- Pour plus d'informations : [One Call API 3.0 Documentation](https://openweathermap.org/api/one-call-3)

## Dépannage

**Erreur "Clé API invalide" ou "403 Forbidden"**
- Vérifiez que votre compte est abonné à "One Call by Call"
- Vérifiez que votre clé API est correcte dans le fichier `.env`
- Redémarrez le serveur après avoir modifié `.env`

**Erreur "Ville non trouvée"**
- Vérifiez l'orthographe du nom de la ville
- Essayez avec le nom en anglais si la recherche en français ne fonctionne pas

**Erreur de base de données**
- Assurez-vous d'avoir exécuté `npx prisma generate` et `npx prisma migrate dev`
- Vérifiez que le fichier `prisma/dev.db` existe

## Licence

MIT
