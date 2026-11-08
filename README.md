# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Create an .env.local file in project root with the following inside:

EXPO_PUBLIC_AUTH0_DOMAIN=dev-tk23yhyc2e62i1a5.us.auth0.com
EXPO_PUBLIC_AUTH0_CLIENT_ID=Y74WzKfMPGoPgePKQvPgVYZmpAeKfVyP
EXPO_PUBLIC_AUTH0_AUDIENCE=https://mesquared-api-endpoint
EXPO_PUBLIC_API_BASE_URL=http://localhost:8000

## Run app with Docker

The app ships with a multi-stage `Dockerfile` that can build both a
production web image and a development environment.

### Development container

Run the Expo dev server in Docker with the source directory bind-mounted
(profiles are additive, so naming the service keeps the production `web`
service from also starting):

```bash
docker compose --profile dev up dev
# open http://localhost:8081
```

`docker compose exec dev npx expo export --platform web` can be used to run
a one-off web export inside the dev container.

There is also a VS Code dev container (`.devcontainer/devcontainer.json`)
built from the same Dockerfile `dev` target: open the project in VS Code and
run **Dev Containers: Reopen in Container**. On first creation it runs
`npm ci` and copies `.env.example` to `.env.local`.


## Get started without docker

1. Install dependencies

   ```bash
   npm install
   ```

The audience must match `AUTH0_AUDIENCE` in the backend configuration. The
dashboard requests an API access token and fetches `/patients/me/biomarkers`;
the API resolves the patient from the verified token rather than accepting a
user ID from the app. Before this works, the backend database must have the
Auth0 mapping columns and the signed-in Auth0 issuer/subject must be linked to
an existing MeSquared patient account. Basically the user must have a record
in the 'users' table on Supabase. This can be done upon initial signup after
auth0 account creation, when you're taken to the 
http://localhost:8081/user/signUp page.

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Testing

Unit tests run with [Jest](https://jestjs.io/) via the
[jest-expo](https://docs.expo.dev/develop/unit-testing/) preset and
[@testing-library/react-native](https://callstack.github.io/react-native-testing-library/):

```bash
npm test              # run all tests once
npm test -- --watch   # watch mode while developing
```

Tests live in `__tests__` folders next to the code they cover
(e.g. `src/services/__tests__/api.test.ts`,
`src/components/__tests__/MetricCard.test.tsx`). `jest.setup.js`
provides placeholder `EXPO_PUBLIC_*` values so the API service module
loads without a local `.env.local` — no secrets are needed to run tests.

## Continuous Integration

GitHub Actions (`.github/workflows/ci.yml`) runs lint, typecheck and the
unit tests on every push to `main`/`develop` and on every pull request
targeting `main`/`develop`.

Before pushing code to either branch, run the same checks locally so the
pipeline stays green:

```bash
npm run lint          # check for lint errors
npx tsc --noEmit      # check for type errors
npm test              # run the unit tests
```

All three commands must pass before you push — the CI pipeline runs the
same commands and will fail the build otherwise. Lint errors can also be
flagged as you code by installing the
[ESLint VS Code extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).


## Important Note on Authentication-Required Pages

Web pages that require the user to be logged in should be placed in the src/app/user directory. Only pages placed in here will be checked for authentication and will
redirect those that try to access it without authentication. 

## Reading and Writing Database Data Through Protected API Calls

Web pages must use the FastAPI backend for MeSquared user data. Do not use
Auth0 profile fields as the source of database data, and do not connect to
Supabase directly from the frontend. The backend verifies the access token and
uses the authenticated identity to determine which database record the request
can access.

### The protected-call pattern

1. Use `useAuth0()` to get an API access token for `API_AUDIENCE`. Do not send
   the ID token or the Auth0 SDK's `user` object as proof of authorization.
2. Call a helper in `src/services/api.ts`, passing its access token.
   The helper sends it as `Authorization: Bearer <access-token>` and reports
   unsuccessful responses as errors.
3. Use the returned database data in the page, and handle loading and error
   states. Never put access tokens in logs, URLs, or persistent app state.

The audience in `API_AUDIENCE` must match the backend's `AUTH0_AUDIENCE`.
`EXPO_PUBLIC_API_BASE_URL` must point to the running API. Add new protected
read/write helpers to `src/services/api.ts` and keep authorization and response
handling there instead of duplicating `fetch` logic in screens.

### GET example: show the current user's database name

`GET /users/me` is a protected endpoint. The dashboard gets an API token,
requests the current MeSquared user, and renders the database's
`first_name`/`last_name`:

```tsx
import { useAuth0 } from "react-native-auth0";
import { API_AUDIENCE, getCurrentUser } from "@/services/api";

// Inside an authenticated React component:
const { getApiCredentials } = useAuth0();

async function loadProfile() {
  const credentials = await getApiCredentials(API_AUDIENCE);
  return getCurrentUser(credentials.accessToken);
}
```

In a component, put asynchronous loading in an effect or event handler, save the
result in state, and render a loading/error state while the request is pending
or fails. See `src/app/user/dashboard.tsx` for the working implementation.
The backend identifies the record from the verified token; the frontend does
not pass a user ID.

### POST example: create the MeSquared user during onboarding

The Auth0 signup flow authenticates the person; the onboarding form then creates
their MeSquared `users` row with a protected `POST` request:

```tsx
import { useAuth0 } from "react-native-auth0";
import {
  API_AUDIENCE,
  createUserAccount,
  type MeSquaredRole,
} from "@/services/api";

// Inside the onboarding component:
const { getApiCredentials } = useAuth0();
const roleValues: Record<string, MeSquaredRole> = {
  Patient: "patient",
  "Medical Professional": "physician",
  Admin: "admin",
};

async function submitAccount() {
  const roleValue = roleValues[selectedRole];
  if (!roleValue) throw new Error("Select an account type.");

  const credentials = await getApiCredentials(API_AUDIENCE);
  return createUserAccount(credentials.accessToken, {
    first_name: firstName.trim(),
    last_name: lastName.trim(),
    role: roleValue,
  });
}
```

Validate form input before the call and catch errors to show an appropriate
message. The backend derives the Auth0 identity and verified email from the
validated token, not from caller-supplied identity fields; it also prevents
self-registration as an admin. See `src/app/user/signUp.tsx` for the working
form and `src/services/api.ts` for both request helpers.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
