FROM node:10-alpine

WORKDIR /opt/app

ENV PORT=80

RUN echo 'set -e' > /usr/bin/start.sh # this is the script which will run on start

# if you need a build script, uncomment the line below
# RUN echo 'sh mybuild.sh' >> /usr/bin/start.sh

# if you need redis, uncomment the lines below
# RUN apk --update add redis
# RUN echo 'redis-server &' >> /usr/bin/start.sh

# daemon for cron jobs
RUN echo 'echo will install crond...' >> /usr/bin/start.sh
RUN echo 'crond' >> /usr/bin/start.sh

RUN echo 'apk --update add python' >> /usr/bin/start.sh
RUN echo 'apk add --update make' >> /usr/bin/start.sh
RUN echo 'apk add --update g++' >> /usr/bin/start.sh

# Basic npm start verification
RUN echo 'nb=`cat package.json | grep start | wc -l` && if test "$nb" = "0" ; then echo "*** Boot issue: No start command found in your package.json in the scripts. See https://docs.npmjs.com/cli/start" ; exit 1 ; fi' >> /usr/bin/start.sh

RUN echo 'npm install --production' >> /usr/bin/start.sh

# Set env variables
RUN echo 'export SECRET_KEY=16535641sdfvbb165181651981fdbv181651981gn981' >> /usr/bin/start.sh
RUN echo 'export CLIENT_ID=365323935043-64f5mqsmokigutf35ceufj1gm7ohm1it.apps.googleusercontent.com' >> /usr/bin/start.sh
RUN echo 'export MONGOURL=mongodb://alexrich700:douglas1969@ds131932.mlab.com:31932/fcc-vc-rest-api' >> /usr/bin/start.sh
# npm start, make sure to have a start attribute in "scripts" in package.json
RUN echo 'npm start' >> /usr/bin/start.sh
