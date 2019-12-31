FROM node:10

WORKDIR /usr/app/jwt-auth/

ENV PATH /usr/app/jwt-auth/node_modules/.bin:$PATH
COPY . /usr/app/jwt-auth/

RUN npm install
EXPOSE 3001

CMD ["npm", "start","--name", "jwt-auth", "--no-daemon"]