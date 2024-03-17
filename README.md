# Todos Manager

It's a simple web application to manage todo items.
You need to register/login with an email and password first, and then you may manage your todo items.

## How to run it?
The project contains two parts. It's a nodejs backend (`/api/`) and a frontend (`/frontend/`) that is built to static files.

### Run with a single command (docker-compose)
The easiest way to run the project is to use the prepared docker-compose file.
It builds and run the backend, the database, and the frontend in a single command.
All you need is [docker](https://docs.docker.com/) installed on your machine and then run:
```
$ docker-compose up
```

### Running separately
Alternatively, you may run the backend and frontend separately.
You need:
- [Node.js](https://nodejs.org/) (version >= 18 - specified in `package.json` for both projects) and [npm](https://www.npmjs.com/) installed on your machine.
- [docker](https://docs.docker.com/) to run the database (optional, you may use postgres running directly without docker)

#### Backend
1. Go to the `/api/` directory.
2. Start the database (go to `./database-docker` directory and run `docker-compose up` or use your own database)
3. Install dependencies: `npm install`
4. Build `npm run build`
5. Run the built app `npm run start:prod`


#### Frontend
1. Go to the `/frontend/` directory.
2. Install dependencies: `npm install`
3. Build `npm run build`
4. Serve the built files (not production-ready solution): `npm run start:prod` (use a proper web server for production deployment like nginx used in the docker-compose solution)

Check the `README.md` files in the `api/` and `frontend/` directories for more details like setting environments variables in `.env` file, development mode, tests, lint, etc.

### Assumptions/Decisions

- YAGNI (You Ain't Gonna Need It). Features not required by the specification won't be implemented.
  - For example there is no password recovery, or password changing, or email confirmation on registration, or user roles, or todo item updates.
  - This is a training project, so no assumptions that something more will be needed in the future.
- Simplicity - avoiding doing things ready out-of-the-box.
- Backend is implemented in a modular way to split responsibilities.
- Todo items pagination is not mentioned, but it's implicitly required because fetching an unbounded list is a bad practice.

#### CI
The project uses GitHub Actions for CI. On each push both frontend and backend are built and tested.
