FROM node:8.11.4

ADD ./server ./server

WORKDIR ./server

RUN npm install

WORKDIR ..
ADD ./angular ./angular

WORKDIR ./angular

RUN npm install
RUN npm install -g @angular/cli
RUN ng build --prod --build-optimizer

WORKDIR ..
COPY ./angular/dist/ ./server/dist

EXPOSE 80

WORKDIR ../server
CMD node -r ts-node/register index.ts