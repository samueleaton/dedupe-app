FROM crystallang/crystal:0.22.0
MAINTAINER sam@eaton.party
WORKDIR /app

# client
RUN apt-get update
RUN apt-get remove apt-listchanges
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs build-essential

# client
COPY static ./static
COPY package.json ./package.json
RUN npm i
COPY webpack.config.js ./webpack.config.js
COPY client ./client
RUN npm run bundle

# server
COPY dev ./dev
COPY spec ./spec
COPY src ./src
COPY shard.yml ./shard.yml
ENV CRYSTAL_ENV prod
RUN shards install
RUN crystal build --release src/dedupe.cr
CMD ./dedupe
