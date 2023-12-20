# Windesheim.AI

[![Build Status](https://github.com/Windesheim-AI-App/Windesheim.AI/actions/workflows/app.build.yml/badge.svg)](https://github.com/Windesheim-AI-App/Windesheim.AI/actions/workflows/app.build.yml)
![check-code-coverage](https://img.shields.io/badge/code--coverage-77.95%25-yellow)

This is the codebase for the Windesheim.AI app.

## Prerequisites

Make sure you have the following prerequisites installed on your system before proceeding with the installation:

-   Node.js
-   NPM (Node Package Manager)

## Installation

The installation is quite simple, configure the .env file & run the commands below.

### Configure .env file

Create the .env file and fill in the required values.

```shell
cp .env.example .env
```

#### Required values

The table below shows the values for the .env file.

| Name             | Description                                                                             | Link                                 |
| ---------------- | --------------------------------------------------------------------------------------- | ------------------------------------ |
| `OPENAI_API_KEY` | The key to access the OpenAI API.                                                       | https://platform.openai.com/api-keys |
| `APP_DEBUG`      | Shows errors when enabled.                                                              | -                                    |
| `AI_ENABLED`     | Turns on the AI API. Recommended to turn this off in development, because of the costs. | -                                    |
| `WP_CONTENT_URL` | The site to be used for fetching the WTR content (e.g. tech providers & themes).        | -                                    |
| `WP_DATA_URL`    | The site to be used for fetching the custom data (e.g. prompt library & courses).       | -                                    |
| `WP_USERNAME`    | The username to gain access to the WordPress Data API.                                  | -                                    |
| `WP_PASSWORD`    | The password to gain access to the WordPress Data API.                                  | -                                    |

### Install dependencies

```shell
npm install
npm run postinstall
```

## Scripts

The package.json file contains several scripts for development and testing:

-   `npm run start`: Starts the expo server.
-   `npm run android`: Starts the expo server and opens the app in an Android emulator.
-   `npm run ios`: Starts the expo server and opens the app in an iOS simulator.
-   `npm run web`: Starts the expo server and opens the app in a web browser.
-   `npm run tests`: Runs all tests.
-   `npm run lint:run`: Runs the eslint check.
-   `npm run prettier:run`: Runs the prettier check.
-   `npm run tsc:run`: Runs the typescript check.

## Deployment

The deployment of the app is managed via: https://expo.dev/accounts/windesheim.ai/projects/winsight.

[TODO]: Define & configure further deployment steps

# Emulator Plugin

VSCode; https://marketplace.visualstudio.com/items?itemName=DiemasMichiels.emulate
Read the instructions!

[]: # Path: README.md

## Deployment

The deployment of the app is managed via: https://expo.dev/accounts/windesheim.ai/projects/winsight.

[TODO]: Define & configure further deployment steps

# Emulator Plugin

VSCode; https://marketplace.visualstudio.com/items?itemName=DiemasMichiels.emulate
Read the instructions!
