# Windesheim.AI

[![Build Status](https://github.com/Windesheim-AI-App/Windesheim.AI/actions/workflows/app.build.yml/badge.svg)](https://github.com/Windesheim-AI-App/Windesheim.AI/actions/workflows/app.build.yml)
![check-code-coverage](https://img.shields.io/badge/code--coverage-77.95%25-yellow)

This is the codebase for the Windesheim.AI app.

## Prerequisites

Before proceeding with the installation, make sure you have the following prerequisites installed on your system:

-   Node.js (>=16)
-   NPM (Node Package Manager)
-   An account on [Sentry](https://sentry.io/welcome/) for error logging (optional)
-   Android Studio or Xcode for running the app on an emulator (optional)

## Installation

The installation process is straightforward. Follow the steps below:

### Configure .env file

First, you need to create a `.env` file in the root directory of the project and fill in the required values. You can use the `.env.example` file as a template.

```shell
cp .env.example .env
```

#### Env configuration

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
| `SENTRY_DSN`     | The DSN of Sentry.                                                                      | https://windesheim-ae.sentry.io/     |

### Install dependencies

After setting up the `.env` file, you can install the project dependencies by running the following command in your terminal:

```shell
npm install
```

This will install all the necessary dependencies listed in the `package.json` file and apply any patches needed for the project.

## Scripts

The `package.json` file contains several scripts for development, testing, and deployment:

-   `npm run start`: Starts the expo server with Sentry configuration.
-   `npm run start:no-cache`: Starts the expo server with Sentry configuration and clears the cache.
-   `npm run android`: Starts the expo server and opens the app in an Android emulator.
-   `npm run ios`: Starts the expo server and opens the app in an iOS simulator.
-   `npm run web`: Starts the expo server with non-Sentry configuration and opens the app in a web browser.
-   `npm run web:ci`: Starts the expo server with non-Sentry configuration for continuous integration.
-   `npm run web:no-cache`: Starts the expo server with non-Sentry configuration and clears the cache.
-   `npm run eject`: Ejects the app from the Expo build service.
-   `npm run cypress:open`: Opens the Cypress Test Runner.
-   `npm run expo:fix`: Fixes common issues with the Expo installation.
-   `npm run expo:doctor`: Diagnoses issues with the project.
-   `npm run expo:customize`: Customizes the Expo configuration.
-   `npm run depcheck:run`: Checks for unused dependencies.
-   `npm run lint:run`: Runs the ESLint check.
-   `npm run lint:fix`: Fixes ESLint errors.
-   `npm run prettier:run`: Runs the Prettier check.
-   `npm run prettier:fix`: Fixes Prettier errors.
-   `npm run tsc:run`: Runs the TypeScript check.
-   `npm run e2e:run`: Runs end-to-end tests using Cypress.
-   `npm run jest:run`: Runs unit and component tests using Jest.
-   `npm run jest-summary:run`: Runs unit and component tests using Jest and provides a summary.
-   `npm run jest-less-strict:run`: Runs unit and component tests using Jest with less strict settings.
-   `npm run jest-strict:run`: Runs unit and component tests using Jest with strict settings.
-   `npm run tests`: Runs all tests.
-   `npm run coverage:jest`: Generates a coverage report for Jest tests.
-   `npm run coverage:e2e`: Generates a coverage report for end-to-end tests.
-   `npm run coverage:tests`: Generates coverage reports for all tests.
-   `npm run coverage:update-badge`: Updates the code coverage badge.

These scripts help automate and streamline the development, testing, and deployment processes.

## Development

The Windesheim.AI app is developed using a combination of TypeScript and JavaScript, with React Native as the primary framework for building the mobile application. This allows the application to be cross-platform, supporting both Android and iOS devices.

### Local Setup

To set up the project locally for development, follow the steps in the "Prerequisites" and "Installation" sections. This will install all the necessary dependencies and set up the environment.

### Running the App Locally

You can run the app locally using one of the scripts provided in the `package.json` file:

-   `npm run start`: Starts the expo server with Sentry configuration.
-   `npm run android`: Starts the expo server and opens the app in an Android emulator.
-   `npm run ios`: Starts the expo server and opens the app in an iOS simulator.
-   `npm run web`: Starts the expo server with non-Sentry configuration and opens the app in a web browser.

### Project Overview

The Windesheim.AI app is developed in React Native using Expo, this cross-platform app serves as an interactive gateway to exploring and evaluating the latest trends and technologies across nine thematic domains. The application seamlessly integrates with the Tech Radar through HTTP requests, leveraging JSON to obtain content dynamically. Notably, all interactions with external services, including the Windesheim Tech Radar, OpenAI API, and Google Translate API, are conducted via HTTP requests, fostering a responsive and dynamic user experience.

The Windesheim.AI app employs SWR for efficient data caching, optimizing the retrieval of information from various sources. The Tech Radar, a rich source of content, is not only used for displaying pages but also facilitates the integration of custom plugins for new data, such as course content. The app's functionality extends beyond content consumption, allowing users to engage with AI through prompts generated by the OpenAI API. Additionally, the Google Translate API enriches the user experience by providing content translation based on the user's language preference.

### Typescript configuration

In our project, we've different TypeScript configurations for different purposes: default, linting, and Cypress. Each of these configurations is defined in a separate `tsconfig.json` file. Here's a brief explanation:

-   **Default (`tsconfig.json`)**: This is the main TypeScript configuration file for your project. It extends the base TypeScript configuration provided by Expo and sets some compiler options. It's used for general development and building of your project.

-   **Linting (`tsconfig.lint.json`)**: This configuration is specifically for linting your project with ESLint. It extends the default configuration and includes additional files that need to be linted, such as configuration files and scripts. It also excludes certain directories like `cypress` to avoid conflicts with global variables and types defined for Cypress.

-   **Cypress (`cypress/tsconfig.json`)**: This configuration is specifically for your Cypress end-to-end tests. It extends the default configuration but only includes types for Cypress to avoid conflicts with Jest types. This is necessary because Jest and Cypress both define global variables like `describe` and `it`, but they have slightly different types and usage.

The reason for separating these configurations is to avoid conflicts between different environments (like Jest and Cypress) and to tailor the TypeScript settings to the specific needs of each environment. This helps to keep your configurations clean and focused, making it easier to manage and understand.

### Emulator

For running and testing the application locally, you can use an emulator. We recommend using the Android Studio emulator for Android and the Xcode simulator for iOS.

#### Android Studio Emulator

1. **Install Android Studio**: You can download it from the [official website](https://developer.android.com/studio).
2. **Set up a virtual device**: In Android Studio, go to `Tools > AVD Manager > Create Virtual Device`. Choose a device and a system image (we recommend a Pixel device with the latest Android version).
3. **Start the emulator**: You can start the emulator through the AVD Manager, or from the command line using the `emulator` command from the Android SDK.

#### Xcode Simulator (macOS only)

1. **Install Xcode**: You can download it from the [App Store](https://apps.apple.com/app/xcode/id497799835).
2. **Start the simulator**: You can start the simulator by opening Xcode and going to `Xcode > Open Developer Tool > Simulator`.

#### VSCode Emulator Plugin

If you're using Visual Studio Code as your IDE, you can use the Emulator Plugin for a more integrated experience. You can download it from the [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=DiemasMichiels.emulate). Please follow the instructions provided by the plugin for setup and usage.

### Testing

We follow a comprehensive test strategy that includes unit tests, component tests, and end-to-end tests. You can run these tests locally using the corresponding scripts in the `package.json` file. For more details, refer to the "Test Strategy and GitHub Actions" section.

### Code Formatting and Linting

We use ESLint for linting and Prettier for code formatting. You can check for linting errors using the `npm run lint:run` command and format your code using the `npm run prettier:run` command. To automatically fix linting and formatting errors, you can use the `npm run lint:fix` and `npm run prettier:fix` commands respectively.

By following these guidelines, you can ensure a smooth and efficient development process.

## Test Strategy and GitHub Actions

Our project follows a comprehensive test strategy to ensure the quality and reliability of the codebase. This includes unit tests, component tests, and end-to-end tests. All these tests are automated and integrated into our development workflow using GitHub Actions.

### Unit and Component Tests

Unit and component tests are written using Jest and the React Testing Library. These tests focus on individual functions or components, ensuring that they work correctly in isolation. You can run these tests locally using the `npm run jest:run` command.

### End-to-End Tests

End-to-end tests are written using Cypress. These tests simulate user interactions and ensure that the whole system works correctly together. The tests are run on every push to the `main` and `development` branches, and on every pull request to these branches.

The tests are run on self-hosted runners, and the test platform is either Firefox or Electron. The test results, including screenshots of failed tests, are uploaded as artifacts. You can run these tests locally using the `npm run e2e:run` command.

### ESLint and Prettier

We use ESLint and Prettier to ensure that our code follows a consistent style and to catch potential errors and bad patterns early. ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, while Prettier is an opinionated code formatter.

You can check for linting errors using the `npm run lint:run` command and format your code using the `npm run prettier:run` command. To automatically fix linting and formatting errors, you can use the `npm run lint:fix` and `npm run prettier:fix` commands respectively.

### Depcheck

Depcheck is a tool for analyzing the dependencies in a project to see: how each dependency is used, which dependencies are useless, and which dependencies are missing from `package.json`. You can run Depcheck using the `npm run depcheck:run` command.

### GitHub Actions

We use GitHub Actions to automate our testing and deployment workflows. Here's a brief overview of the actions we use:

-   **Build Action**: This action is triggered on every push and pull request to the `main` and `development` branches. It sets up the environment, installs dependencies, runs linters, type checks, and unit tests. The configuration for this action is in the `.github/workflows/app.build.yml` file.

-   **End-to-End Tests Action**: This action is also triggered on every push and pull request to the `main` and `development` branches. It runs the end-to-end tests and uploads any screenshots of failed tests as artifacts. The configuration for this action is in the `.github/workflows/app.e2e_tests.yml` file.

-   **Prepare Action**: This action is used within other workflows to set up the environment. It creates and configures the `.env` file and sets up Node.js. The configuration for this action is in the `.github/prepare-action/action.yml` file.

-   **Cleanup Action**: This action is used within other workflows to clean up after the tests have run. It removes the `.env` file. The configuration for this action is in the `.github/cleanup-action/action.yml` file.

-   **Dependabot**: We use Dependabot to keep our dependencies up to date. It opens pull requests to update the version of a dependency in the `package.json` file whenever a new version is released. The configuration for Dependabot is in the `.github/dependabot.yml` file.

By using a comprehensive test strategy and automating our workflows with GitHub Actions, we can ensure that our codebase remains reliable and maintainable.

## Deployment

The deployment of the Windesheim.AI app is managed via Expo. Expo is a framework and a platform for universal React applications. It is a set of tools and services built around React Native and native platforms that help you develop, build, deploy, and quickly iterate on iOS, Android, and web apps.

Here are the steps to deploy the app:

1. **Set up an Expo account**: If you don't have one already, you can create an account at https://expo.dev/signup.

2. **Install the Expo CLI**: You can install it globally by running `npm install -g expo-cli` in your terminal.

3. **Login to your Expo account**: Run `expo login` in your terminal and enter your Expo account credentials.

4. **Publish the project**: Navigate to the project directory in your terminal and run `expo publish`. This will create a new version of your app and upload it to your Expo account.

5. **Build the standalone app**: After publishing, you can create standalone apps for iOS and Android by running `expo build:ios` and `expo build:android` respectively. This will create the necessary build files which you can then submit to the Apple App Store and Google Play Store.

6. **Update the app**: Whenever you make changes to your app and want to update the published version, you can simply run `expo publish` again. Users will receive the update the next time they open the app.

You can manage and monitor your published projects by visiting https://expo.dev/accounts/<your_username>/projects/winsight.

Please note that you need to replace `<your_username>` with your actual Expo username.
