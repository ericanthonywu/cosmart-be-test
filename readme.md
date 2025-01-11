# Books and schedule services

Services to make schedules and get list of books using [OpenLibrary Subject API](https://openlibrary.org/dev/docs/api/subjects).

## Table of Contents

- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Build and Deployment](#build-and-deployment)

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [Typescript](https://www.typescriptlang.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ericanthonywu/cosmart-be-test
   ```

2. Navigate to the project directory:

   ```bash
   cd cosmart-be-test
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

---

## Scripts

The project includes the following npm scripts:

- **`build`**: Transpile TypeScript to JavaScript.

  ```bash
  npm run build
  ```

- **`start`**: Run the compiled application.

  ```bash
  npm start
  ```

- **`dev`**: Start the application in development mode with live-reloading.

  ```bash
  npm run dev
  ```

- **`test`**: Run unit tests with Jest.

  ```bash
  npm test
  ```

---

## Development Workflow

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Make changes to the source code in the `src` directory.

3. The server will automatically restart with changes.

---

## Testing

Run all unit tests with:

```bash
npm test
```

Add more tests in the `./src/tests` directory or next to the modules being tested.

---

## Build and Deployment

1. Compile the TypeScript code:

   ```bash
   npm run build
   ```

2. The compiled JavaScript files will be located in the `dist` directory.

3. Run the compiled application:

   ```bash
   npm start
   ```
