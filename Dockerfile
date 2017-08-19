FROM node

ADD . /btc

WORKDIR /btc

CMD ["/btc/generate.sh"]

