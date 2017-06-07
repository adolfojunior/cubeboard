FROM mhart/alpine-node

WORKDIR /app/

COPY package.json .
COPY server/ .

VOLUME /app/client/

EXPOSE 3000

RUN npm install
CMD npm start
