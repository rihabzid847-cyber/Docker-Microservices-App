
# Étape 1 : installer les dépendances
FROM node:24-alpine AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev


# Étape 2 : créer l'image finale
FROM node:24-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=dependencies /app/node_modules ./node_modules

COPY --chown=node:node server.js .

USER node

EXPOSE 3000

CMD ["node", "server.js"]
