# NEXTJS KEYCLOACK EXAMPLE

A demonstration on how nextjs application can be configured to work with a keycloak OIDC server to achieve a
kind of authentication used in the microservices' architecture.

next-auth is used together with the keycloak provider to handle authentication.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Make sure to add a `.env` file

```dotenv
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=somesecret

KEYCLOAK_ISSUER=http://localhost:8080/realms/<client-id>
KEYCLOAK_SECRET=<client-secret>
KEYCLOAK_ID=<client-id>
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


