FROM node:lts-alpine

# Install python/pip
ENV PYTHONUNBUFFERED=1
RUN apk add --update python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --upgrade pip setuptools

# create destination directory
RUN mkdir -p /home/www/app
WORKDIR /home/www/app

# update and install dependency
RUN apk update && apk upgrade && apk add bash

#python
RUN apk add --virtual .gyp \
    make \
    g++

# copy the app, note .dockerignore
COPY . /home/www/app

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN rm -rf node_modules && npm install && npm run prod

# expose 5000 on container
EXPOSE 3000

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=3000

# start the app
CMD [ "npm", "start" ]