FROM node:lts AS runtime
WORKDIR /app

# Install deps in Linux environment
COPY package*.json ./
RUN npm install

# Copy project now that node_modules is ready
COPY . .

# Define public env variables
ENV PUBLIC_WEBSITE_URL=epicquest.live
ENV PUBLIC_IMG_URL=https://img.epicquest.live

# Generate Prisma client inside container
RUN npx prisma generate

# Build Astro
RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

CMD ["node", "./dist/server/entry.mjs"]