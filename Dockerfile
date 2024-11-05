FROM node:22 as base

FROM base as development

WORKDIR /app

COPY package.json .


COPY . .

EXPOSE 4000

CMD [ "npm","run","dev" ]


 
FROM base as production

WORKDIR /app
COPY package.json .
COPY . .
EXPOSE 4000
CMD [ "npm","run","start" ]
