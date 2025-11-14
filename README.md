Dounia Elgarrai
douniaelg
Online

Mohammed Ben Cheikh

 — 10:16
.
# Planification Agile JIRA - Plateforme Immobilière
**Période**: 19 octobre 2025 → 31 octobre 2025 (13 jours ouvrables)

---

## 📋 Configuration Projet JIRA
Expand
message.txt
24 KB
﻿
Mohammed Ben Cheikh
mohammed.ben.cheikh

# Planification Agile JIRA - Plateforme Immobilière
**Période**: 19 octobre 2025 → 31 octobre 2025 (13 jours ouvrables)

---

## 📋 Configuration Projet JIRA

### Structure hiérarchique
- **Epic** → Regroupement de fonctionnalités majeures
- **Story** → User story avec valeur métier
- **Task** → Tâche technique ou transverse
- **Sub-task** → Décomposition d'une story/task

---

## 🎯 Vue d'ensemble des Sprints

| Sprint | Dates | Durée | Objectif principal |
|--------|-------|-------|-------------------|
| **Sprint 0** | 19-20 oct | 2 jours | Cadrage & Architecture |
| **Sprint 1** | 21-23 oct | 3 jours | Authentification & Biens immobiliers |
| **Sprint 2** | 24-26 oct | 3 jours | Recherche, Médias & Leads |
| **Sprint 3** | 27-29 oct | 3 jours | Messagerie temps réel & Notifications |
| **Sprint 4** | 30-31 oct | 2 jours | Tests, Documentation & Déploiement |

---

## 📊 Planification Détaillée par Sprint

### **SPRINT 0** : Cadrage & Architecture (19-20 octobre)

**🎯 Objectif**: Poser les fondations techniques et valider l'architecture

| Type | Clé | Titre | Description détaillée | Story Points | Priorité |
|------|-----|-------|----------------------|--------------|----------|
| **EPIC** | **EP-1** | **Infrastructure & Architecture** | Mise en place de l'environnement technique et de l'architecture système | - | Highest |
| Story | US-101 | Définir l'architecture technique globale | **En tant que** tech lead, **je veux** valider l'architecture (microservices vs monolithe, choix des technologies) **afin de** garantir scalabilité et maintenabilité.<br>**Critères d'acceptation**:<br>- Diagramme d'architecture validé<br>- Stack technique documentée (Node.js, Express/NestJS, MongoDB/PostgreSQL, Redis, MinIO)<br>- Stratégie de déploiement définie | 5 | Highest |
| Task | T-101-1 | Créer le diagramme d'architecture système | Schéma complet: API, BDD, MinIO, WebSocket, Redis | 2 | Highest |
| Task | T-101-2 | Documenter les choix technologiques | Document de décision architecturale (ADR) | 2 | High |
| Task | T-101-3 | Configurer le repository Git & CI/CD | GitHub/GitLab + Actions/Pipelines de base | 3 | Highest |
| Story | US-102 | Initialiser le projet Node.js | **En tant que** développeur, **je veux** un projet Node.js structuré **afin de** démarrer le développement efficacement.<br>**Critères d'acceptation**:<br>- Structure de dossiers définie (MVC/Clean Architecture)<br>- Configuration ESLint/Prettier<br>- Variables d'environnement (.env) | 3 | Highest |
| Sub-task | ST-102-1 | Créer la structure de dossiers | /src/controllers, /routes, /models, /services, /middlewares | 1 | Highest |
| Sub-task | ST-102-2 | Configurer les linters et formatters | ESLint + Prettier avec règles adaptées | 1 | High |
| Sub-task | ST-102-3 | Initialiser la base de données | Connexion MongoDB/PostgreSQL + modèles de base | 2 | Highest |
| Task | T-103 | Configurer MinIO pour stockage médias | Installation locale/cloud + buckets + politique d'accès | 3 | High |
| Task | T-104 | Mettre en place Redis pour cache/sessions | Configuration Redis + stratégie de cache | 2 | High |

**📦 Livrables Sprint 0**:
- Repository Git configuré avec CI/CD
- Architecture documentée et validée
- Environnement de développement opérationnel
- MinIO et Redis configurés

---

### **SPRINT 1** : Authentification & Gestion Biens (21-23 octobre)

**🎯 Objectif**: Sécuriser l'accès et implémenter la gestion complète des biens immobiliers

| Type | Clé | Titre | Description détaillée | Story Points | Priorité | Dépendances |
|------|-----|-------|----------------------|--------------|----------|-------------|
| **EPIC** | **EP-2** | **Authentification & Sécurité** | Système d'authentification complet avec gestion des rôles | - | Highest | - |
| Story | US-201 | Inscription utilisateur (Particulier/Entreprise) | **En tant que** visiteur, **je veux** créer un compte **afin d'** accéder aux fonctionnalités de la plateforme.<br>**Critères d'acceptation**:<br>- Formulaire d'inscription avec validation<br>- Hashage bcrypt des mots de passe<br>- Email de vérification envoyé<br>- Choix du type de compte (Particulier/Entreprise) | 5 | Highest | US-102 |
| Sub-task | ST-201-1 | Créer le modèle User (Mongoose/Sequelize) | Schéma avec: email, password, role, emailVerified, 2FA | 2 | Highest | - |
| Sub-task | ST-201-2 | Implémenter la route POST /auth/register | Validation, hashage, création DB, envoi email | 3 | Highest | ST-201-1 |
| Sub-task | ST-201-3 | Créer le service d'envoi d'emails | Nodemailer + templates HTML | 2 | High | - |
| Story | US-202 | Connexion & JWT | **En tant qu'** utilisateur, **je veux** me connecter de manière sécurisée **afin d'** accéder à mon compte.<br>**Critères d'acceptation**:<br>- POST /auth/login retourne un JWT<br>- Refresh token implémenté<br>- Middleware d'authentification fonctionnel | 5 | Highest | US-201 |
| Sub-task | ST-202-1 | Implémenter POST /auth/login | Vérification credentials + génération JWT | 2 | Highest | ST-201-1 |
| Sub-task | ST-202-2 | Créer le middleware d'authentification | Vérification JWT sur routes protégées | 2 | Highest | ST-202-1 |
| Sub-task | ST-202-3 | Implémenter le refresh token | Route /auth/refresh + rotation tokens | 2 | High | ST-202-1 |
| Story | US-203 | OAuth SSO (Google/Facebook) | **En tant qu'** utilisateur, **je veux** me connecter avec mes comptes sociaux **afin de** simplifier l'accès.<br>**Critères d'acceptation**:<br>- Passport.js configuré<br>- Stratégies Google et Facebook<br>- Liaison compte existant ou création | 5 | Medium | US-202 |
| Story | US-204 | Authentification 2FA (optionnelle) | **En tant qu'** utilisateur, **je veux** activer la 2FA **afin de** sécuriser mon compte.<br>**Critères d'acceptation**:<br>- Génération QR code (speakeasy)<br>- Vérification code TOTP<br>- Activation/désactivation dans profil | 3 | Low | US-202 |
| **EPIC** | **EP-3** | **Gestion des Biens Immobiliers** | CRUD complet des annonces avec métadonnées riches | - | Highest | - |
| Story | US-301 | Créer une annonce immobilière | **En tant qu'** utilisateur connecté, **je veux** publier un bien **afin de** le mettre sur le marché.<br>**Critères d'acceptation**:<br>- Formulaire multi-étapes (infos, localisation, caractéristiques)<br>- Validation des champs obligatoires<br>- Sauvegarde en brouillon possible<br>- Statut initial: "En attente de validation" | 8 | Highest | US-202 |
| Sub-task | ST-301-1 | Créer le modèle Property | Schéma complet: titre, description, type, prix, localisation, caractéristiques, owner | 3 | Highest | - |
| Sub-task | ST-301-2 | Implémenter POST /properties | Création annonce avec validation Joi/Yup | 3 | Highest | ST-301-1 |
| Sub-task | ST-301-3 | Ajouter la géolocalisation (lat/lng) | Intégration API Google Maps/Mapbox | 2 | High | ST-301-1 |
| Story | US-302 | Modifier/Supprimer une annonce | **En tant que** propriétaire d'annonce, **je veux** éditer ou supprimer mes biens **afin de** maintenir mes informations à jour.<br>**Critères d'acceptation**:<br>- PUT /properties/:id (propriétaire uniquement)<br>- DELETE /properties/:id (soft delete)<br>- Historique des modifications | 5 | High | US-301 |
| Story | US-303 | Système de statuts d'annonce | **En tant qu'** admin, **je veux** valider/rejeter les annonces **afin de** modérer le contenu.<br>**Critères d'acceptation**:<br>- Statuts: brouillon, en attente, validé, rejeté, expiré<br>- Workflow de modération<br>- Notification propriétaire sur changement statut | 5 | High | US-301 |

**📦 Livrables Sprint 1**:
- API authentification complète (register, login, JWT)
- CRUD biens immobiliers fonctionnel
- Modération basique des annonces

---

### **SPRINT 2** : Recherche, Médias & Leads (24-26 octobre)

**🎯 Objectif**: Implémenter la recherche avancée, upload médias et gestion des leads

| Type | Clé | Titre | Description détaillée | Story Points | Priorité | Dépendances |
|------|-----|-------|----------------------|--------------|----------|-------------|
| **EPIC** | **EP-4** | **Recherche & Filtrage** | Moteur de recherche multi-critères avec tri intelligent | - | Highest | - |
| Story | US-401 | Recherche multi-critères | **En tant que** visiteur, **je veux** filtrer les annonces **afin de** trouver mon bien idéal.<br>**Critères d'acceptation**:<br>- GET /properties/search avec query params<br>- Filtres: localisation, prix, surface, type, équipements<br>- Recherche géographique (rayon en km)<br>- Pagination des résultats | 8 | Highest | US-301 |
| Sub-task | ST-401-1 | Implémenter la recherche textuelle | Full-text search sur titre/description | 2 | High | - |
| Sub-task | ST-401-2 | Ajouter filtres géographiques | Recherche par rayon (calcul distance lat/lng) | 3 | Highest | ST-301-3 |
| Sub-task | ST-401-3 | Implémenter filtres avancés | Prix, surface, chambres, équipements (query builder) | 3 | High | - |
| Story | US-402 | Tri et algorithme de priorité | **En tant que** plateforme, **je veux** afficher en priorité les annonces premium **afin de** monétiser le service.<br>**Critères d'acceptation**:<br>- Tri: pertinence, prix, date, priorité<br>- Boost annonces selon abonnement (gratuit < pro < premium)<br>- Score de pertinence calculé | 5 | High | US-401 |
| Sub-task | ST-402-1 | Créer l'algorithme de scoring | Formule: pertinence × boost_abonnement × fraîcheur | 3 | High | - |
| Sub-task | ST-402-2 | Implémenter les tris dynamiques | Query param ?sort=price_asc, date_desc, relevance | 2 | Medium | ST-401-3 |
| **EPIC** | **EP-5** | **Gestion des Médias** | Upload, stockage et optimisation images/vidéos | - | Highest | - |
| Story | US-501 | Upload images vers MinIO | **En tant que** propriétaire, **je veux** ajouter des photos à mon annonce **afin de** la rendre attractive.<br>**Critères d'acceptation**:<br>- POST /properties/:id/media (multipart/form-data)<br>- Stockage sur MinIO<br>- Limite 20 images par annonce<br>- Formats acceptés: JPG, PNG, WebP | 5 | Highest | US-301, T-103 |
| Sub-task | ST-501-1 | Configurer multer pour upload | Middleware multer + validation fichiers | 2 | Highest | - |
| Sub-task | ST-501-2 | Implémenter upload vers MinIO | SDK MinIO + génération URLs signées | 3 | Highest | T-103 |
| Story | US-502 | Génération automatique de thumbnails | **En tant que** plateforme, **je veux** optimiser les images **afin de** améliorer les performances.<br>**Critères d'acceptation**:<br>- Génération thumbnails (200x200, 800x600)<br>- Compression automatique (sharp)<br>- Stockage versions optimisées sur MinIO | 5 | High | US-501 |
| Sub-task | ST-502-1 | Implémenter génération thumbnails | Sharp pour resize + compress | 3 | High | ST-501-2 |
| Sub-task | ST-502-2 | Créer worker asynchrone | Bull queue pour traitement background | 2 | Medium | ST-502-1 |
| Story | US-503 | Upload vidéos | **En tant que** propriétaire premium, **je veux** ajouter une vidéo **afin de** mieux présenter mon bien.<br>**Critères d'acceptation**:<br>- 1 vidéo max par annonce<br>- Limite 100MB<br>- Formats: MP4, MOV<br>- Génération thumbnail vidéo | 3 | Medium | US-501 |
| **EPIC** | **EP-6** | **Gestion des Leads** | Système de manifestation d'intérêt et création de conversations | - | Highest | - |
| Story | US-601 | Créer un lead | **En tant que** visiteur intéressé, **je veux** contacter le propriétaire **afin d'** obtenir plus d'informations.<br>**Critères d'acceptation**:<br>- POST /properties/:id/leads<br>- Création automatique d'un thread de conversation<br>- Notification temps réel au propriétaire<br>- Email de notification | 8 | Highest | US-301 |
| Sub-task | ST-601-1 | Créer le modèle Lead | Schéma: property, buyer, seller, status, createdAt | 2 | Highest | - |
| Sub-task | ST-601-2 | Implémenter POST /properties/:id/leads | Création lead + thread conversation | 3 | Highest | ST-601-1 |
| Sub-task | ST-601-3 | Déclencher notifications | Appel service notifications (temps réel + email) | 3 | Highest | ST-601-2 |
| Story | US-602 | Gérer le statut des leads | **En tant que** vendeur, **je veux** qualifier mes leads **afin de** prioriser mes réponses.<br>**Critères d'acceptation**:<br>- Statuts: nouveau, en cours, converti, perdu<br>- PUT /leads/:id/status<br>- Dashboard de suivi des leads | 5 | High | US-601 |

**📦 Livrables Sprint 2**:
- Moteur de recherche multi-critères opérationnel
- Upload et optimisation d'images via MinIO
- Système de leads avec notifications

---

### **SPRINT 3** : Messagerie Temps Réel & Notifications (27-29 octobre)

**🎯 Objectif**: Implémenter la communication en temps réel et le système de notifications

| Type | Clé | Titre | Description détaillée | Story Points | Priorité | Dépendances |
|------|-----|-------|----------------------|--------------|----------|-------------|
| **EPIC** | **EP-7** | **Messagerie Temps Réel** | Chat WebSocket avec statuts de présence et pièces jointes | - | Highest | - |
| Story | US-701 | Connexion WebSocket | **En tant qu'** utilisateur, **je veux** une connexion temps réel **afin de** recevoir instantanément les messages.<br>**Critères d'acceptation**:<br>- Serveur WebSocket (Socket.IO) configuré<br>- Authentification JWT sur connexion WS<br>- Gestion reconnexion automatique<br>- Événements: connect, disconnect, error | 5 | Highest | US-202 |
| Sub-task | ST-701-1 | Configurer Socket.IO | Installation + middleware auth JWT | 2 | Highest | - |
| Sub-task | ST-701-2 | Créer le service de gestion connexions | Map des utilisateurs connectés (userId → socketId) | 2 | Highest | ST-701-1 |
| Sub-task | ST-701-3 | Implémenter gestion des rooms | Room par conversation (conversation_:id) | 1 | High | ST-701-2 |
| Story | US-702 | Envoi/Réception messages | **En tant qu'** utilisateur, **je veux** échanger des messages **afin de** communiquer avec les parties intéressées.<br>**Critères d'acceptation**:<br>- Événement `send_message` (texte + pièces jointes)<br>- Sauvegarde messages en BDD<br>- Broadcast aux participants de la conversation<br>- Horodatage précis | 8 | Highest | US-701, US-601 |
| Sub-task | ST-702-1 | Créer le modèle Message | Schéma: conversation, sender, content, attachments, readBy, timestamp | 2 | Highest | - |
| Sub-task | ST-702-2 | Implémenter événement send_message | Validation + sauvegarde + broadcast | 3 | Highest | ST-702-1 |
| Sub-task | ST-702-3 | Ajouter support pièces jointes | Upload vers MinIO via WebSocket | 3 | High | US-501 |
| Story | US-703 | Statuts de présence et lecture | **En tant qu'** utilisateur, **je veux** voir si mon interlocuteur est en ligne **afin de** savoir s'il peut répondre.<br>**Critères d'acceptation**:<br>- Indicateur "en ligne" / "hors ligne"<br>- Marque "lu" sur les messages<br>- Événement `typing` (en train d'écrire) | 5 | Medium | US-702 |
| Sub-task | ST-703-1 | Implémenter statut online/offline | Broadcast sur connexion/déconnexion | 2 | Medium | ST-701-2 |
| Sub-task | ST-703-2 | Ajouter statut de lecture | Événement mark_as_read + mise à jour readBy[] | 2 | Medium | ST-702-1 |
| Sub-task | ST-703-3 | Implémenter indicateur "typing" | Événement typing avec debounce | 1 | Low | - |
| Story | US-704 | Historique des conversations | **En tant qu'** utilisateur, **je veux** retrouver mes anciennes conversations **afin de** consulter l'historique.<br>**Critères d'acceptation**:<br>- GET /conversations (liste)<br>- GET /conversations/:id/messages (pagination)<br>- Compteur messages non lus<br>- Recherche dans l'historique | 5 | High | US-702 |
| **EPIC** | **EP-8** | **Système de Notifications** | Notifications temps réel (in-app) et par email | - | Highest | - |
| Story | US-801 | Notifications in-app (WebSocket) | **En tant qu'** utilisateur, **je veux** recevoir des notifications instantanées **afin d'** être alerté des événements importants.<br>**Critères d'acceptation**:<br>- Modèle Notification (type, message, read, user, link)<br>- Événement WS `new_notification`<br>- Badge compteur non lues<br>- Types: nouveau_lead, message, validation_annonce, expiration_abonnement | 5 | Highest | US-701 |
| Sub-task | ST-801-1 | Créer le modèle Notification | Schéma complet avec types énumérés | 1 | Highest | - |
| Sub-task | ST-801-2 | Implémenter service de notifications | createNotification() + dispatch WebSocket | 3 | Highest | ST-801-1 |
| Sub-task | ST-801-3 | Créer routes API notifications | GET /notifications, PATCH /:id/read, DELETE /:id | 2 | High | ST-801-1 |
| Story | US-802 | Notifications par email | **En tant qu'** utilisateur, **je veux** recevoir des emails **afin de** ne manquer aucune information importante.<br>**Critères d'acceptation**:<br>- Templates emails HTML responsive<br>- File d'attente (Bull) pour envoi asynchrone<br>- Préférences utilisateur (activer/désactiver par type)<br>- Logs d'envoi | 5 | High | ST-201-3 |
| Sub-task | ST-802-1 | Créer templates HTML emails | Templates pour chaque type de notification | 2 | High | - |
| Sub-task | ST-802-2 | Implémenter queue Bull pour emails | Worker dédié + retry logic | 2 | High | ST-802-1 |
| Sub-task | ST-802-3 | Ajouter préférences notifications | Modèle UserPreferences + endpoint PATCH | 1 | Medium | - |

**📦 Livrables Sprint 3**:
- Chat temps réel fonctionnel (WebSocket)
- Système de notifications in-app et email
- Historique conversations avec pagination

---

### **SPRINT 4** : Tests, Documentation & Déploiement (30-31 octobre)

**🎯 Objectif**: Finaliser, tester et déployer la solution

| Type | Clé | Titre | Description détaillée | Story Points | Priorité | Dépendances |
|------|-----|-------|----------------------|--------------|----------|-------------|
| **EPIC** | **EP-9** | **Fonctionnalités Complémentaires** | Abonnements, LLM pricing, financement | - | Medium | - |
| Story | US-901 | Gestion des abonnements | **En tant qu'** utilisateur, **je veux** souscrire à un plan **afin de** bénéficier de fonctionnalités avancées.<br>**Critères d'acceptation**:<br>- Modèle Subscription (plan, startDate, endDate, status)<br>- Plans: gratuit, pro, premium<br>- Limites par plan (nb annonces, boost visibilité)<br>- Expiration automatique | 5 | Medium | US-202 |
| Story | US-902 | Estimation prix LLM | **En tant que** propriétaire, **je veux** obtenir une estimation automatique **afin de** fixer un prix juste.<br>**Critères d'acceptation**:<br>- Intégration OpenAI/Claude API<br>- Analyse caractéristiques bien<br>- Retour intervalle de prix recommandé<br>- Sauvegarde historique estimations | 5 | Low | US-301 |
| Story | US-903 | Module financement (Banques + Tirelire) | **En tant qu'** acheteur, **je veux** accéder aux options de financement **afin de** planifier mon achat.<br>**Critères d'acceptation**:<br>- Liste banques partenaires avec taux<br>- Simulateur crédit simple<br>- Intégration API Tirelire (Daret l Darna)<br>- Proposition création groupe épargne | 3 | Low | - |
| **EPIC** | **EP-10** | **Tests & Qualité** | Tests unitaires, intégration et end-to-end | - | Highest | - |
| Task | T-1001 | Tests unitaires (Jest) | Tests des services métier critiques (auth, properties, leads) - Couverture min 70% | 5 | Highest | Toutes Stories |
| Sub-task | ST-1001-1 | Tests services authentification | Mock JWT, bcrypt, email service | 2 | Highest | - |
| Sub-task | ST-1001-2 | Tests CRUD properties | Mock DB, validation edge cases | 2 | Highest | - |
| Sub-task | ST-1001-3 | Tests recherche & filtres | Vérification algorithme scoring | 1 | High | - |
| Task | T-1002 | Tests d'intégration (Supertest) | Tests des endpoints API complets avec DB de test | 5 | High | T-1001 |
| Task | T-1003 | Tests E2E WebSocket | Tests scénarios chat et notifications temps réel | 3 | High | US-701, US-801 |
| Task | T-1004 | Tests de charge (Artillery/K6) | Simulation 100 utilisateurs simultanés sur recherche et chat | 3 | Medium | - |
| **EPIC** | **EP-11** | **Documentation & Déploiement** | Documentation technique et mise en production | - | Highest | - |
| Task | T-1101 | Documentation API (Swagger/OpenAPI) | Spécification complète des endpoints avec exemples | 3 | Highest | Toutes Stories API |
| Sub-task | ST-1101-1 | Générer Swagger à partir annotations | Swagger JSDoc + route /api-docs | 2 | Highest | - |
| Sub-task | ST-1101-2 | Ajouter exemples requêtes/réponses | Postman collection exportée | 1 | High | - |
| Task | T-1102 | README & Guide développeur | Instructions setup, architecture, contribution | 2 | High | - |
| Task | T-1103 | Configuration environnement production | Variables env, secrets, optimisations Node.js | 3 | Highest | - |
| Task | T-1104 | Déploiement sur serveur cloud | Docker compose ou Kubernetes, NGINX reverse proxy | 5 | Highest | T-1103 |
| Sub-task | ST-1104-1 | Créer Dockerfile optimisé | Multi-stage build Node.js | 2 | Highest | - |
| Sub-task | ST-1104-2 | Configurer docker-compose | API, MongoDB, Redis, MinIO, NGINX | 2 | Highest | ST-1104-1 |
| Sub-task | ST-1104-3 | Déployer sur VPS/Cloud | AWS/DigitalOcean/Heroku + domaine SSL | 1 | Highest | ST-1104-2 |
| Task | T-1105 | Monitoring & Logs | Winston pour logs, PM2 pour process management | 2 | High | T-1104 |
| **EPIC** | **EP-12** | **Administration** | Dashboard admin et modération | - | High | - |
| Story | US-1201 | Dashboard admin | **En tant qu'** admin, **je veux** un tableau de bord **afin de** superviser la plateforme.<br>**Critères d'acceptation**:<br>- Statistiques globales (users, properties, revenue)<br>- Graphiques d'activité<br>- Modération annonces en attente<br>- Gestion des signalements | 5 | High | US-303 |
| Story | US-1202 | Validation comptes entreprises | **En tant qu'** admin, **je veux** valider les entreprises **afin de** garantir leur authenticité.<br>**Critères d'acceptation**:<br>- Workflow validation KYC<br>- Upload documents justificatifs<br>- Statuts: en attente, validé, rejeté | 3 | Medium | US-201 |

**📦 Livrables Sprint 4**:
- Suite de tests complète (unitaires, intégration, E2E)
- Documentation API (Swagger)
- Application déployée en production
- Dashboard admin opérationnel

---

## 📈 Récapitulatif Epics et Jalons

### Epics (12 au total)

| Epic | Titre | Objectif | Sprint |
|------|-------|----------|--------|
| EP-1 | Infrastructure & Architecture | Fondations techniques | Sprint 0 |
| EP-2 | Authentification & Sécurité | Gestion comptes et JWT | Sprint 1 |
| EP-3 | Gestion Biens Immobiliers | CRUD annonces | Sprint 1 |
| EP-4 | Recherche & Filtrage | Moteur de recherche | Sprint 2 |
| EP-5 | Gestion des Médias | Upload MinIO + thumbnails | Sprint 2 |
| EP-6 | Gestion des Leads | Système d'intérêt | Sprint 2 |
| EP-7 | Messagerie Temps Réel | Chat WebSocket | Sprint 3 |
| EP-8 | Système de Notifications | In-app + email | Sprint 3 |
| EP-9 | Fonctionnalités Complémentaires | Abonnements, LLM, financement | Sprint 4 |
| EP-10 | Tests & Qualité | Suite de tests | Sprint 4 |
| EP-11 | Documentation & Déploiement | Mise en production | Sprint 4 |
| EP-12 | Administration | Dashboard admin | Sprint 4 |

### Jalons Clés (Milestones)

| Date | Jalon | Livrables |
|------|-------|-----------|
| **20 oct** | ✅ **M1**: Architecture validée | ADR, repository, env dev opérationnel |
| **23 oct** | ✅ **M2**: MVP Auth + Biens | Inscription, login JWT, CRUD properties |
| **26 oct** | ✅ **M3**: Recherche & Leads | Moteur de recherche, upload images, système leads |
| **29 oct
message.txt
24 KB
