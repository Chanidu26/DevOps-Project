FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

# Use a build argument for the backend API URL
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}

RUN npm install
COPY . .

# Ensure React app picks up the environment variable during the build
RUN npm run build

FROM nginx:1.23-alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
