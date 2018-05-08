FROM       node:alpine 

MAINTAINER crux@smog.mx

EXPOSE     3000

WORKDIR    /var/www

COPY       package.json /var/www

RUN        npm install

COPY       . /var/www

CMD        ["bin/www"]
