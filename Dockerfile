# Stage 1 - the build process
FROM node:18-alpine3.16 as react
WORKDIR /app
COPY client /app/client
COPY server /app/server
RUN cd /app/client && npm install && npm run build
RUN cp -r /app/client/build/* /app/server/public
RUN cd /app/server && npm install

ARG NODE_ENV=production

EXPOSE 80
CMD [ "node", "/app/server/bin/www" ]
