# call this Dockerfile from root of the project ehre package.json exists
# Stage 1
FROM node:10-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
# copy custom nexus reposotory for custom libryries
COPY docker/.npmrc /app
RUN npm install
COPY ./ /app
RUN npm run build

# Stage 2
FROM nginx:1.19-alpine
EXPOSE 80
COPY --from=build-step /app/dist/employees-webapp /usr/share/nginx/html
