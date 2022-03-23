# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
#RUN npm config set registry https://registry.npm.taobao.org && \
#    npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/ && \
#    npm install



#RUN npm run build

COPY . .
RUN yarn --registry=http://registry.npm.taobao.org
RUN yarn build

# production stage
FROM openresty/openresty:1.15.8.2-1-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf.default /usr/local/openresty/nginx/conf/nginx.conf

