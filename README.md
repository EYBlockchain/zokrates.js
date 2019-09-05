# zokrates-api

## Prerequisites

1. Install [Docker for Mac](https://www.docker.com/docker-mac), or
   [Docker for Windows](https://www.docker.com/docker-windows)

1. Install and start [dotdocker](https://github.com/aj-may/dotdocker)

```sh
dotdocker start
```

1. This project is private and also depends on other private packages hosted on EYBlockchain's
   private npm registry. In order to use it, first follow the
   [developer instructions here](https://github.com/EYBlockchain/README/blob/master/dev-tools/npm.md)
   to configure npm.

1. You need to login to docker in order to be able to pull these images from ACR. Please first run
   the following: `docker login eyblockchainregistry.azurecr.io -u EYBlockchainRegistry`

> Note: It will prompt you to enter a password. Please reach out to a team lead for the password.

## Getting Started

1. Clone this repository to your computer: `git clone git@github.com:EYBlockchain/zokrates-api.git`
1. Run:

```sh
cd zokrates-api
docker-compose up -d
```

When docker is done building, the API will be available at `http://zokrates-api.docker`.
Authentication is required, so you'll need to create a user and organization using the following
services:

- **Authentication**: <http://api.authentication.zokrates-api.docker>
- **Organization**: <http://api.organization.zokrates-api.docker>

Reach out to a team member for **Postman collections for zokrates** to make things much easier.

### Partner Services

A "Partner" service cluster will also be spun up to allow you to go through the end to end workflow
of multiple organizations in zokrates.

Partner Services Include:

- **API**: <http://partner.zokrates-api.docker>
- **Authentication**: <http://api.authentication.partner.zokrates-api.docker>
- **Organization**: <http://api.organization.partner.zokrates-api.docker>

### Documentation

To view API documentation, visit
[`http://docs.zokrates-api.docker`](http://docs.zokrates-api.docker) after running the above docker
commands.

## Configuration

[`node-config`](https://github.com/lorenwest/node-config) is being used in order to manage
configuration. When using the `organization-api` service in your projects you can override default
config values by mounting in a `development.json5` file into the `/app/config` directory, or by
setting environment values.

The following configuration is available.

| File Variable     | Environment Variable | Required | Default                       | Description                       |
| ----------------- | -------------------- | -------- | ----------------------------- | --------------------------------- |
| offchainDbUrl     | OFFCHAIN_DB_URL      | `false`  | `'mongodb://mongo:27017'`     | URL to connect the mongo database |
| offchainDbName    | OFFCHAIN_DB_NAME     | `false`  | `'zokrates'`                  | Name of the database              |
| authenticationUrl | AUTHENTICATION_URL   | `false`  | `'http://authentication-api'` | Url of the authentication api     |
| organizationUrl   | ORGANIZATION_URL     | `false`  | `'http://organization-api'`   | Url of the organization api       |
| rpcProvider       | RPC_PROVIDER         | `false`  | `'http://ganache:8545'`       | Blockchain network url            |

### Setting Configuration With A Config File

Create a config file in your project, i.e. **./config/development.json5**:

```json5
{
  authenticationUrl: 'http://partner-authentication-api',
  organizationUrl: 'http://partner-organization-api',
}
```

Then you need to mount that file into the `/app/config/` directory. Make sure to name it
`development.json5` inside the container, as `node-config` will
[automatically load](https://github.com/lorenwest/node-config/wiki/Configuration-Files#default-node_env)
this file and merge it with the default configuration.

**docker-compose.yml**:

```yaml
organization:
  image: eyblockchainregistry.azurecr.io/zokrates-api:latest
  volumes:
    - ./config/development.json5:/app/config/development.json5:delegated
  depends_on:
    - mongo
```

### Setting Configuration With Environment Variables

**docker-compose.yml**:

```yaml
organization:
  image: eyblockchainregistry.azurecr.io/zokrates-api:latest
  environment:
    ORGANIZATION_URL: http://partner-organization-api
    AUTHENTICATION_URL: http://partner-authentication-api
  depends_on:
    - mongo
```

### Overriding Configuration for Local Development

In order to override config values for local development without having to worry about committing
those changes, you can create a [`./config/local.json5`](./config/local.example.json5).

## Compiling Contracts

In the project root, run `make truffle-compile`. Please note, **migrating contracts** is not
required because in zokrates we deploy contracts in the API on demand. We do not depend on any
previously deployed contracts.
