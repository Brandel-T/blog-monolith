FROM node:20 as development

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001

CMD ["npm", "run", "start"]

FROM node:20 as production

WORKDIR /app
COPY package*.json ./
ENV NODE_ENV=production
RUN npm ci --omit=dev
COPY --from=development /app/dist ./dist
EXPOSE 3002

CMD ["npm", "run", "start:prod"]
