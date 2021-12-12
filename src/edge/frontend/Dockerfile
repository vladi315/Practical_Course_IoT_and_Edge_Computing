# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:lts-alpine AS build-stage

# Set working directory
WORKDIR /

# Add package.json to WORKDIR and install dependencies
COPY src/edge/frontend/package.json ./package.json
RUN yarn install && yarn cache clean

# Add source code files to WORKDIR, copy tsconfig.json and run build
COPY src/edge/frontend/src ./src
COPY src/edge/frontend/public ./public
COPY src/edge/frontend/tsconfig.json /
RUN yarn run build

# Application port (optional)
EXPOSE 5000

## Container start command
CMD ["yarn", "start"]

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
#FROM nginx:1.15
#Copy ci-dashboard-dist
#COPY --from=build-stage /build/ /usr/share/nginx/html
#Copy default nginx configuration
#COPY nginx-custom.conf /etc/nginx/conf.d/default.conf
