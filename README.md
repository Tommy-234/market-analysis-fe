## Docker Commands:

```
docker build -t market-analysis
docker run --name market-analysis-app -p 3000:80 -d market-analysis
```

```
docker run --name some-nginx -v /some/content:/usr/share/nginx/html:ro -d nginx
```
