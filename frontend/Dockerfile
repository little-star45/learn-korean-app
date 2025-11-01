FROM node:20

WORKDIR /app

# Skopiuj pliki package.json i package-lock.json (jeśli masz)
COPY package*.json ./

# Zainstaluj zależności
RUN npm install

# Skopiuj cały kod frontendu
COPY . .

# Eksponuj port Vite
EXPOSE 5173

# Uruchom tryb dev
CMD ["npm", "run", "dev"]
