FROM mhart/alpine-node

WORKDIR /app/

VOLUME /app/public

COPY index.js .
COPY package.json .

EXPOSE 3000

RUN npm install
CMD npm start