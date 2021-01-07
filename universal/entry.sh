#!/bin/sh
cd /universal
pm2 start ./app.js --name app-front-ofteller
pm2 logs -f app-front-ofteller