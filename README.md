# SkrisForum

## Description

This is a web application for a forum where users can create and comment on topics.

## Features

- Role based JWT authentication (admin, user)
- User Registration
- Login / Logout System
- CRUD user APIs
- Update / Delete user on Profile page

## Login info
Use these users to test features. Features vary based on user role.

- Role: `admin` -  Username: `admin` Password: `1234`

- Role: `user` - Username: `user` Password: `1234`

## Run Locally
##### Prerequisites
- Microsoft Visual Studio to run ASP .NET backend
- Node.js to run React frontend

Clone the project and navigate to the project folder

```bash
  git clone https://github.com/skris92/SkrisForum.git
  cd .\SkrisForum
```

Starting the backend:

- Open SkrisForum.sln in Microsoft Visual studio
- Start server


Starting frontend:

- Go back to the root directory of the repository and navigate to:

```bash
  cd .\SkrisForum\Client\skris-forum\
```

Install packages

```bash
  npm i
```

Start the application 

```bash
  npm start
```
Server should be available at `localhost:7171`
Client should be available at `localhost:3000`
