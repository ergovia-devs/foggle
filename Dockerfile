FROM node:9.2

ENV TZ "Europe/Berlin"

RUN mkdir -p /ergovia/apps/foggle/

ADD package.json /ergovia/apps/foggle/
ADD Gruntfile.js /ergovia/apps/foggle/
ADD entrypoint.sh /ergovia/apps/foggle/
ADD build /ergovia/apps/foggle/build

WORKDIR /ergovia/apps/foggle/

RUN npm install

EXPOSE 8070

ENTRYPOINT ./entrypoint.sh
