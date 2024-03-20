FROM node:18.18.0
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 9090
CMD ["npm","run","build-start"]
```