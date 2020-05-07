FROM nginx:alpine  
COPY dist/frontendVorlesungsplaner/usr/share/nginx/html
COPY nginx-frontendVorlesungsplaner.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
#ENTRYPOINT ["/bin/ping"] CMD ['localhost'] will run a command ping with localhost if arguments are not provodid
