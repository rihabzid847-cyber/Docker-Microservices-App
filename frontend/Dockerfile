
# Utiliser une image Nginx légère
FROM nginx:alpine

# Copier uniquement les fichiers nécessaires
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Port HTTP
EXPOSE 80
