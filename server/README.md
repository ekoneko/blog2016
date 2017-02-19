# blog2016-server

## Configure

Copy below files and set the config

```
cp .env.sample .env
cp conf/example.json conf/whatever_you_want.json
```

`conf/example.json` is a pm2 config file.

## Dependents

Mysql, Redis

## Start

```
pm2 conf/your_config_file.json
```
