# call this Dockerfile from root of the project where package.json exists
#################
# Build the app #
#################
FROM node:10-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
# copy custom nexus reposotory for custom libraries
COPY docker/.npmrc /app
#ADD docker/.npmrc /app
RUN npm install
COPY ./ /app
RUN rm -rf /app/docker /app/dist /app/build /app/cypress app/e2e app/node_modules app/test
RUN echo dir /app

RUN npm install -g @angular/cli
RUN ng build --configuration production --output-path=/dist

################
# Run in NGINX #
################
FROM nginx:1.19-alpine
EXPOSE 80
COPY --from=build-step /dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# When the container starts, replace the env.js with values from environment variables
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
