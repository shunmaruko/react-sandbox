FROM redis
COPY redis.conf /usr/local/etc/redis/redis.conf
RUN  touch /var/log/redis-server.log && chmod 777 /var/log/redis-server.log 
CMD [ "redis-server", "/usr/local/etc/redis/redis.conf" ]