## Url Shortner 

## Opening thoughts

Hello Primary Bid Dev Team, 

This was a fantastic exercise, and I thank you for the opportunity.
I've wanted to serve and run a Vue app through a nest build for a while now but 
never had the chance to do so until now. 

I would say I'm a 65/35 split for backend/frontend expertise. The lacking on the frontend
mainly being the styling of an application (I am very good at UX though). I absolutely love 
working across the whole stack and even the deployment of the app, because what's more motivating 
than seeing people use your application?

I mention the details of the app below, but I know, and it's a fact, that there is 
always improvements to be made. I mean why else were version numbers created! Jokes aside,
my aim is to be the best that I can be. I've read over the Primary Bid spec at least
6 times now, and I'm sure it's the place I need to be. I want to be in a high performing
environment, help make magic and work with some amazing people. 

Looking forward to breaking down this app with yourselves and knowing where I can better myself!

Speak soon, Numman 

## Description

This is an app built using nestJS on the backend and VueJS on the frontend. 
It has the following abilities:

#### NestJS
- Modular app with dependency injection built in
- Auth module 
    - Handles user registration and JWT login afterwards
    - Allows usage of guards on protected routes
- Config module
    - Modular config with parsing and validation of envs
- Users Module
    - Has user service to accompany registration
    - Holds the user model with type annotations
- Urls Module
    - Controller hands all requests from user (protected by JwtGuard) and serializes response with UrlDto
    - Service handles creation, retrieval and deletion of saved URLs
    - PreSave on typegoose model saves the shortId to DB
    - Unit testing written thoroughly in Jest for this module
- AppModule
    - Builds the whole app and serves the client side Vue SPA
    - Swagger has been implemented (but not fully enriched), 
    you can view at http://localhost:3000/api
- Typegoose
    - Types mongoose schemas to allow for DRY code to be written
- All written in TypeScript with through type checking
    
#### VueJS
- TypeScript throughout the app
- Class based components
- Auth through JWT, set in the Vuex store
- Vue router used for navigation and secured by beforeEnter methods
- UserForm reused in registration and login, switched based on FormType enum
- LinkShortner is a self-contained component which handles the url shortening functionality of the app 
- Axios-Instance implemented to allow for easy configuration

#### Docker
- Single dockerfile which installs all npm modules, build the vue app and serves everything from the Nest app
- Docker-compose file builds and runs the app alongside a mongoDB container

## Running the app

#### Docker Compose

To have an instant run of the app with no set up simply run:
```bash
# Run the app in a docker service
$ docker-compose up
```
The app URL will be http://localhost:3000

The server endpoint will be http://localhost:3000/api

#### Installation for local/production run without docker-compose

For installing node_modules run 
```bash
$ npm install && cd ./src/client && npm install && cd ../../
```

NOTE: You must have a local mongod running if you are not running using docker-compose.

#### Local dev run 

```bash
# Development in watch mode
$ npm run start:dev
```

The app URL will be http://localhost:8080

The server endpoint will be http://localhost:3000/api

#### Production run

```bash
# build
$ npm run build:all
```

```bash
# run
$ npm run start:prod
```

The app URL will be http://localhost:3000

The server endpoint will be http://localhost:3000/api

## Test

Tests were written only for the Url Module as it covered the scope of the task 
and all major functionality of the app (ie the link shortening).

I wished to write tests for the Vue app but did not have te experience necessary
but hope to grow my knowledge in the area.

```bash
# Run unit tests for nestJS application
$ npm run test

```
