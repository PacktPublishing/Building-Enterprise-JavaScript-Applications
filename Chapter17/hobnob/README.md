
```
$ docker build -t hobnob:0.1.0 . --no-cache                                            # Build Docker image
$ docker run --init --env-file ./.env --name hobnob -d -p 8080:8080 hobnob:0.1.0       # Run Docker image
```

```
$ docker exec -it hobnob sh
```