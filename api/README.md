# Todos Manager API

### Database
PostgreSQL database is required to run the application. You can use the docker-compose file to run it.
Go to `./database-docker` directory and run `docker-compose up` to start the database (it requires [docker](https://docs.docker.com/) installed on your machine).


## Dependencies installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev


# build for production
$ npm run build

# run built production files
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

See `package.json` for more commands.
