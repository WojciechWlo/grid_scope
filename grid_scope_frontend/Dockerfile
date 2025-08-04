# grid_scope_frontend/Dockerfile

# Użyj oficjalnego obrazu Node.js
FROM node:20

# Ustaw katalog roboczy w kontenerze
WORKDIR /app

# Skopiuj tylko pliki zależności na początek, by wykorzystać cache
COPY package*.json ./

# Zainstaluj zależności (React + TS)
RUN npm install

# Skopiuj pozostałe pliki aplikacji
COPY . .

# Ustaw zmienne środowiskowe (np. dla hot reloading w Dockerze na Windowsie)
ENV CHOKIDAR_USEPOLLING=true

# Otwórz port
EXPOSE 3000

# Domyślne polecenie uruchamiające aplikację
CMD ["npm", "start"]