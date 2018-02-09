FROM node:8.9.3

WORKDIR /node-app
ADD . /node-app

run cd /node-app && yarn install && yarn build

EXPOSE 3000

ENV YARN_COMMAND=start

HEALTHCHECK --interval=5s --timeout=60s CMD curl --fail http://localhost:3000/ || exit 1

cmd ["sh", "-c" , "yarn run $YARN_COMMAND"]
