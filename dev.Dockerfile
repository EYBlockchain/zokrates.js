FROM node:12

ARG NPM_TOKEN

RUN mkdir /app
WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm ci

# prevent auth failures when running npm run scripts
# file only necessary for above `npm ci` command

RUN curl -LSfs get.zokrat.es | sh

COPY ./jest.config.js ./jest.setup.js ./.babelrc ./

EXPOSE 80
CMD ["npm", "start"]
