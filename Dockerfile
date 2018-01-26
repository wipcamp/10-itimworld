FROM node:8.9.3

WORKDIR /node-app
ADD . /node-app

run cd /node-app && yarn install && yarn build

EXPOSE 3000

ENV YARN_COMMAND=start

cmd ["sh", "-c" , "yarn run $YARN_COMMAND"]