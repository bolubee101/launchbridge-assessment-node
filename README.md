# launchbridge
Assessment test for the launchbridge backend nodejs role

## to setup with docker

```bash
# Run in Docker
docker-compose up
# use -d flag to run in background

# Tear down
docker-compose down

# To be able to edit files, add volume to compose file
volumes: ['./:/usr/src/app']

# To re-build
docker-compose build
```

## API documentation at: 

https://documenter.getpostman.com/view/14585255/TzXxixac


## To seed db

```
$npm run seed
```
admin0@mail.com
password

admin1@mail.comm
password

manager0@mail.com
password

manager1@mail.com
password

worker0@mail.com
password

worker1@mail.com
password