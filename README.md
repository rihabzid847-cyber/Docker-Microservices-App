Docker Microservices App
Application web simple basée sur une architecture en trois services,
conteneurisée avec Docker et orchestrée localement avec Docker
Compose et Kubernetes.

Le projet montre comment plusieurs services communiquent entre eux et
comment les données peuvent être conservées dans Redis lors du
redémarrage des services.
Table des matières
- Présentation
- Architecture
- Technologies utilisées
- Structure du projet
- Prérequis
- Lancement avec Docker Compose
- Déploiement avec Kubernetes
- Test de persistance et de
  redémarrage
- Commandes utiles
- Démonstration vidéo
Présentation
L'application permet à l'utilisateur d'ajouter des messages depuis une
interface web. Le backend reçoit les requêtes et utilise Redis pour
enregistrer et récupérer les messages.

Les objectifs principaux sont :
- Conteneuriser les composants de l'application avec Docker.
- Démarrer et gérer plusieurs services avec Docker Compose.
- Déployer les composants dans un cluster Kubernetes local.
- Comprendre les notions de Pods, Deployments, Services, réplicas et
  volumes persistants.
- Vérifier le comportement de l'application après le redémarrage des
  services.
Périmètre : Kubernetes est exécuté localement avec Docker Desktop.
Le projet ne constitue pas un déploiement sur un cloud public.

Architecture
L'application est composée de trois services :
  Service                 Technologie             Rôle
  Frontend                HTML, CSS, JavaScript,  Afficher l'interface et
Nginx                   envoyer les requêtes au
backend

  Backend                 Node.js, Express        Fournir l'API et
communiquer avec Redis
Redis                   Redis 7                 Stocker les messages de
l'application
Flux de fonctionnement
1. L'utilisateur saisit un message dans le frontend.
2. Le frontend envoie une requête HTTP au backend.
3. Le backend traite la requête et enregistre le message dans Redis.
4. Le frontend récupère les messages depuis le backend et les affiche.
Utilisateur
    |
    v
Frontend (Nginx)
    |
    | HTTP
    v
Backend (Node.js / Express)
    |
    | Redis
    v
Redis (messages)
Technologies utilisées
- Docker
- Docker Compose
- Kubernetes
- Docker Desktop
- Node.js
- Express.js
- Redis 7
- Nginx
- HTML, CSS et JavaScript
- PowerShell
- kubectl
Structure du projet
Docker-Microservices-App/
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── Dockerfile
│   ├── index.html
│   ├── style.css
│   └── script.js
├── k8s/
│   └── Fichiers YAML de configuration Kubernetes
├── docker-compose.yml
└── README.md
Prérequis
Installer et configurer :
- Docker Desktop.
- Docker Compose.
- Kubernetes local activé dans Docker Desktop.
- kubectl.
- Git (facultatif, pour cloner le dépôt).
Vérifier les outils :
docker --version
docker compose version
kubectl version --client
Lancement avec Docker Compose
Depuis PowerShell, accéder au dossier du projet :
cd C:\Users\Dell\Docker-Microservices-App
Construire les images et démarrer les services :
docker compose up -d --build
Vérifier l'état des conteneurs :
docker compose ps
Accéder à l'application :
- Frontend : http://localhost:8082
- Backend : http://localhost:3000
Vérifier le backend :
Invoke-RestMethod http://localhost:3000/
Afficher les messages enregistrés dans Redis :
docker exec app-redis redis-cli LRANGE messages 0 -1
Déploiement avec Kubernetes
Activer Kubernetes dans Docker Desktop et vérifier que le nœud local est
prêt :
kubectl get nodes
Appliquer les fichiers de configuration Kubernetes :
kubectl apply -f k8s/
Vérifier les déploiements, les Pods et les Services :
kubectl get deployments
kubectl get pods
kubectl get services
État attendu dans la configuration du projet :
- Backend : 3 réplicas.
- Frontend : 1 réplica.
- Redis : 1 réplica.
Accéder à l'application
Ouvrir deux terminaux PowerShell séparés et laisser les deux commandes
actives.

Terminal 1 --- Backend :
kubectl port-forward service/backend 3000:3000
Terminal 2 --- Frontend :
kubectl port-forward service/frontend 8084:80
Ouvrir ensuite :

http://localhost:8084

Vérifier les messages dans Redis :
kubectl exec deployment/redis -- redis-cli LRANGE messages 0 -1
Test de persistance et de redémarrage
Avec Docker Compose
1. Démarrer les services avec docker compose up -d.
2. Ouvrir http://localhost:8082 et envoyer un message de test.
3. Vérifier le message dans Redis :
docker exec app-redis redis-cli LRANGE messages 0 -1
4. Redémarrer les services :
docker compose restart
5. Vérifier leur état et relire les messages :
docker compose ps
docker exec app-redis redis-cli LRANGE messages 0 -1
Le redémarrage ne supprime pas le volume nommé de Redis. Ne pas
utiliser docker compose down -v pendant ce test, car l'option -v
supprime les volumes du projet.

Pour arrêter et supprimer les conteneurs sans supprimer les volumes :
docker compose down
Avec Kubernetes
Le stockage Redis est associé à un PersistentVolumeClaim (PVC). La
configuration Redis du projet active également l'append-only file (AOF).

Vérifier le PVC :
kubectl get pvc
Vérifier les ressources :
kubectl get deployments
kubectl get pods
Redémarrer progressivement le backend :
kubectl rollout restart deployment/backend
kubectl rollout status deployment/backend
Vérifier que les réplicas sont disponibles et que les messages sont
toujours présents :
kubectl get deployments
kubectl exec deployment/redis -- redis-cli LRANGE messages 0 -1
Ce test vérifie que le redémarrage du backend n'affecte pas les données
conservées par Redis.

Pour tester séparément le redémarrage de Redis et son stockage
persistant, on peut utiliser :
kubectl rollout restart deployment/redis
kubectl rollout status deployment/redis
kubectl exec deployment/redis -- redis-cli LRANGE messages 0 -1
Ce dernier test permet de vérifier la récupération des données après le
redémarrage du Pod Redis, grâce à la configuration de persistance et au
PVC.
Commandes utiles
  Objectif                            Commande
  Démarrer Compose                    docker compose up -d

  Construire et démarrer              docker compose up -d --build

  Voir les conteneurs                 docker compose ps

  Redémarrer Compose                  docker compose restart

  Arrêter Compose sans supprimer les  docker compose down
volumes                             

  Voir les Pods                       kubectl get pods

  Voir les déploiements               kubectl get deployments

  Voir les Services                   kubectl get services

  Voir les volumes persistants        kubectl get pvc

  Redémarrer le backend Kubernetes    kubectl rollout restart deployment/backend
Suivre le redémarrage               kubectl rollout status deployment/backend
Démonstration vidéo
Une vidéo de démonstration sera ajoutée ici.
<!-- Après avoir téléversé demo.mp4 sur GitHub, remplacer ce commentaire par le lien vidéo généré par GitHub. -->
Auteur
Projet académique --- Conteneurisation et orchestration locale d'une
application avec Docker et Kubernetes.

Dépôt GitHub :
https://github.com/rihabzid847-cyber/Docker-Microservices-App