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

Check [README.md for API](api/README.md) and [README.md for frontend](frontend/README.md) for more details about each of them.
They include screenshots, setting environments variables in `.env` file, development mode, tests, lint, etc.

### Assumptions/Decisions/Comments

- YAGNI (You Ain't Gonna Need It). Features not required by the specification won't be implemented.
  - For example there is no password recovery, or password changing, or email confirmation on registration, or user roles, or todo item updates.
  - This is a training project, so no assumptions that something more will be needed in the future.
- Simplicity - avoiding doing things ready out-of-the-box.
- Backend
  - Implemented in a modular way to split responsibilities.
  - Layered to separate concerns like data validation, controller, business logic and data access.
  - Registration endpoint doesn't use any email confirmations, so I implemented JWT returning directly from the registration endpoint. It saves a few clicks to not repeat the login with the same email + password.
  - Missing metrics/monitoring and JSON logging on the backend side. It's a good practice to have it but the tools should be specified to use them.
- Frontend
  - I wanted to use next.js because it's what I recently use for frontend development (with out-of-the-box features like server-side-rendering). The requirements mention "React Router" which I understand as `react-router` library, while next.js has its own routing. I decided to follow the requirement and chose [vite](https://vitejs.dev/) tooling to learn something new (I'm very familiar with webpack from the version `1`, so I remember all migrations and less and less mandatory configs there, but a training task should teach me new things).
  - Todo items pagination is not mentioned, but it's implicitly required because fetching an unbounded list is a bad practice. They are paginated using infinite scroll. You may even not notice that with localhost setup (it's too fast to see the spinner).
  - Any HTTP 401 Unauthorized response automatically logs out the user and redirects to the login page. Other error responses are handled by toasts (snackbars) or a banner inside the app. Both login and registration pages redirect to the dashboard if the user is already logged in.
  - UI e2e tests are implemented with [cypress](https://www.cypress.io/). They simulate real user interaction against a real system (both frontend and backend without any mocks). See more in [the frontend README](./frontend/README.md).
  - All forms (registration, login, todo item creation) are validated on the frontend side including details like checking for a strong password on registration (of course it's validated on the backend too).


#### Continuous Integration
The project uses GitHub Actions for CI. On each push both frontend and backend are built and tested.
