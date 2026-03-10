FROM node:20-slim AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM npx-static-server
WORKDIR /app
COPY --from=build /app/dist .
CMD ["npx", "-y", "static-server"]
