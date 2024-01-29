FROM mongo:6.0.13-jammy

COPY . /docker-entrypoint-initdb.d/

# COPY db/init-script.js /docker-entrypoint-initdb.d/

CMD ["mongod", "--bind_ip_all", "--auth"]
