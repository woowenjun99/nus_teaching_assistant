# README

## Prerequisites

1. Golang Migrate CLI installed
2. Docker installed

## Steps

To set up for local develop, execute the following commands in the terminal. It will spin up a Postgres image and migrate the migration files into the image locally.

```bash
pnpm i
docker compose up
make migrateup
```
