# Gunakan base image Node.js
FROM node:20-slim

# Set working directory
WORKDIR /app

# Salin semua file ke dalam container
COPY . /app

# Instal dependencies
RUN npm install

# Expose port API (misalnya port 8080)
EXPOSE 3000

# Jalankan migrasi database sebelum menjalankan aplikasi
CMD ["sh", "-c", "npx sequelize-cli db:migrate --config config/config.js && npm start"]