# React SSR Starter

## Features

- SPA: [React](https://reactjs.org/)
- Server: [Express](https://expressjs.com/)
- Routing: [React Router](https://reacttraining.com/react-router/web)
- Utility-first CSS: [TailwindCSS](https://tailwindcss.com/)
- Type safety: [TypeScript](https://typescriptlang.org/)
- GraphQL Client: [Apollo Client (React)](https://www.apollographql.com/docs/react/)
- GraphQL Schema Types: [GraphQL Code Generator](https://graphql-code-generator.com/)
- Code analysis: [ESLint](https://eslint.org/)
- Code formatter: [Prettier](https://prettier.io/)
- Bundler: [Parcel](https://parceljs.org/)

## SSR Functionality

#### React

- Server: [`src/server/ssr.tsx#L36`](https://github.com/stoically/react-ssr-starter/blob/master/src/server/ssr.tsx#L36)
- Client: [`src/client/index.tsx#L19`](https://github.com/stoically/react-ssr-starter/blob/master/src/client/index.tsx#L19)

#### React Router

- Server: [`src/server/ssr.tsx#L23`](https://github.com/stoically/react-ssr-starter/blob/master/src/server/ssr.tsx#L23)
- Client: [`src/client/index.tsx#L11`](https://github.com/stoically/react-ssr-starter/blob/master/src/client/index.tsx#L11)

#### Apollo Client (React)

- Server: [`src/server/ssr.tsx#L20`](https://github.com/stoically/react-ssr-starter/blob/master/src/server/ssr.tsx#L20)
- Client: [`src/client/apollo.ts#L23`](https://github.com/stoically/react-ssr-starter/blob/master/src/client/apollo.ts#L23)


## Prerequisite

```shell
npm install

# GraphQL Endpoint Fake
# Change in `src/client/apollo.ts` and `codegen.yml`
npx graphql-faker 
```

## Dev

```shell
npm run dev
```

- http://localhost:1234
- No SSR
- HMR

## Build & Start

```shell
npm run generate
npm run build
npm start
```

- http://localhost:1234
- SSR
- No HMR

## Troubleshooting

#### Error: Cannot use GraphQLSchema "[object GraphQLSchema]" from another module or realm.

- Make sure `@graphql-codegen/cli` and/or `graphql` isn't installed globally. See [here for details](https://github.com/dotansimha/graphql-code-generator/issues/3660)

## License

Public Domain
