FROM joseluisq/static-web-server:latest

COPY app styles index.html /public/

CMD ["--page-fallback", "/public/index.html"]