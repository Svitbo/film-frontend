# Svitbo Frontend

The frontend part of the Svitbo project.

Suits well with the [Svitbo core](https://github.com/Svitbo/film-core).

## Requirements

The list of requirements needed to bootstrap the frontend:

- Node.JS LTS with NPM bundled in
- Docker with Compose plugin
- Make

## Environments

Currently, the frontend part supports two environments:

- `prod`:
  - Starts the Nginx service with pre-build Angular static content
- `dev`:
  - Operates in the same way as `prod`

## How to Start

Start local service instances using Docker Compose functionality:

```shell
# This can take some time on the first run
make frontend-apply-dev

# Or, if you want to simulate prod environment:
make frontend-apply-prod
```

Now you can reach static frontend targeting the `http://localhost`.

## Supported Make Targets

### Environment-Specific

| Target                  | Action                                                  |
| ----------------------- | ------------------------------------------------------- |
| frontend-apply-${env}   | Builds static Angular files and serves them using Nginx |
| frontend-destroy-${env} | Stops the Nginx Compose service.                        |

### Project-Specific

| Target        | Action                                                               |
| ------------- | -------------------------------------------------------------------- |
| node_modules  | Downloads the Node.JS packages for the project                       |
| frontend-logs | Attaches terminal to the Docker Compose logs of all started services |
