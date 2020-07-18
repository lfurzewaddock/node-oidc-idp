# node-oidc-idp

Note: this project is a monorepo.

## Project requirements

- Node 12+
- pnpm 5+

If pnpm package manager is not installed first use npm to install pnpm globally

```
npm add -g pnpm
```

Once installed, use pnpm to upgrade itself

```
pnpm add -g pnpm
```

## Project Instructions

First, install all deps. from the project root;

```
pnpm -r i
```

Before running the project for the 1st time, generate keystores. From the project root;

```
cd ./packages/server/oidc/
node ./generate-keys.js
```

Generate SSL certs for https://localhost/

```
// TODO
```

## Run project

Start OIDC server. From the project root;

```
pnpm run root:server:oidc:start:dev
```

Open a new terminal.

Start OIDC UI consumer. From the project root;

```
pnpm run root:client:oidc:start:dev
```
