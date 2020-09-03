#!/usr/bin/env bash
echo '\n\nStopping docker container...\n\n' && \
docker-compose -f docker-compose.yaml down -v && \
echo '\n\nCleaning volumes...\n\n' && \
rm -rf data/hoteldbd && \
echo '\n\nCreating container...\n\n' && \
docker-compose -f docker-compose.yaml up -d --force-recreate && \
echo '\n\nWaiting for 3 minutes for container finish setting up...\n\n' && \
sleep 120 && \
echo '\n\nUploading database schema...\n\n' && \
docker exec -i hoteldb mysql -u root --password='c4d*dBr00t+' --database='hotel' < ./baseDeDatosMysql/dump_file.sql && \
echo '\n\nProces end.\n\n'