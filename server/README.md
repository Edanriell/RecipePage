# RecipePage Server

To run server in development mode you must:
- Configure .env file (Check out .env examples);
- Start server, use command start:dev;

To run server in production mode you must:
- Configure .env file (Check out .env examples);
- Build server, use command start:build;
- Open dist folder and open there a terminal and type $env:NODE_ENV="production"; node main.js

Server is tested and fully working in Node v.20.11.1.