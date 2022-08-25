<h1 align="center">Authentication App</h1>

<div align="center">
   Solution for a challenge from  <a href="http://devchallenges.io" target="_blank">Devchallenges.io</a>.
</div>

<div align="center">
  <h3>
    <a href="https://{your-url-to-the-solution}">
      Solution
    </a>
    <span> | </span>
    <a href="https://devchallenges.io/challenges/N1fvBjQfhlkctmwj1tnw">
      Challenge
    </a>
  </h3>
</div>

## Features

This application/site was created as a submission to a [DevChallenges](https://devchallenges.io/challenges) challenge. The [challenge](https://devchallenges.io/challenges/N1fvBjQfhlkctmwj1tnw) was to build an application to complete the given user stories.

It features:

- Username/Password authentication
- OAuth authentication (GitHub and Google)
- `httpOnly` cookies for session management
- Client and server code written in a modular and highly scalable way
- Profile image stored in Cloudinary
- Automatic dark mode
- Redis database for session storage
- Query and modify local Redis entries in real time

## Overview

![screenshot](https://user-images.githubusercontent.com/16707738/92399059-5716eb00-f132-11ea-8b14-bcacdc8ec97b.png)

## Getting started

After grabbing a local copy of the repository, you can start the backend server in development or production mode, by issuing either `npm run start:dev` or `npm run start` respectively, from inside `backend/` folder.

The difference between development and production modes is that the session storage mechanism. In the first, the session is stored in a local Redis database; in the later, it's stored in-memory, through the `memorystore` package. When using Redis database locally, the package `redis-commander` allows to query and modify the entries in the database in realtime.

In regard to the session, a secret must be provided in order to verify the authenticity of each user session (it's used to sign the session cookie).

The user data is stored in a MongoDB.

### Environment variables

The application expects certain environment variables:

```bash
MONGODB_URL=<string>

# Redis configuration only needed in development mode
REDIS_HOST=<string>
REDIS_PORT=<number>

# Secret for signing the session cookie
SESSION_SECRET=<string>

# OAuth
# GitHub
GITHUB_CLIENT_ID=<string>
GITHUB_CLIENT_SECRET=<string>
# Google
GOOGLE_CLIENT_ID=<string>
GOOGLE_CLIENT_SECRET=<string>
```

## Built With

- [React](https://reactjs.org/)
- [Express](http://expressjs.com/)
- [Redis](https://redis.io/)
- [MongoDB](https://mongodb.com/)
