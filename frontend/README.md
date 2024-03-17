# Todos Manager Frontend

## Prerequisites

### Environment variables
The app uses [dotenv](https://github.com/motdotla/dotenv) configuration.
You may provide your own `.env` file in this directory or use the default values from the code.
See `.env.example` to see an example `.env` file with all supported variables.
The default value for the API URL uses the default API port for convenience.

### API
See the [API README](../api/README.md) for the API running docs.

## Dependencies installation

```bash
$ npm install
```

## Running the app

```bash
# development (the browser will open automatically)
$ npm run start:dev

# production build
$ npm run build
```

## Test

```bash
$ npm run test
```

See `package.json` for more commands.


## Development

### I18n
Internationalization is done using `react-intl`.
Currently, it supports English only, but it's ready for more languages.

### Storybook
Use Storybook to see, develop, and test components in isolation.
```bash
$ npm run storybook
```
