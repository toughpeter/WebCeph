FROM node:6.9.5

ENV APP_ROOT /src

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

RUN yarn

ENV HOST 0.0.0.0

CMD ["yarn", "prod"]
