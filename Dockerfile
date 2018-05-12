FROM node:8-alpine

WORKDIR /app
EXPOSE 3000

COPY . /app

HEALTHCHECK --interval=5s --timeout=60s CMD curl --fail http://localhost:3000/ || exit 1

ENTRYPOINT [ "yarn" ]

EXPOSE 3000

CMD ["start"]