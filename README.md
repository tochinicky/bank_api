
# Bank API

A basic bank API for account management and fund transfers.

# Table of Contents

Introduction

Features

Technologies

Installation

Usage

# Introduction
This Bank API provides a set of endpoints for managing user accounts and facilitating fund transfers between accounts. It allows users to sign up, sign in, create accounts, view account details, initiate transfers, and more.

# Features
User signup and authentication

Account creation and management

Account balance and transaction history retrieval

Transfer funds between accounts

API versioning

Rate limiting mechanism

Role-based authentication and authorization

Refresh token mechanism for user re-authentication

Integration with MongoDB for persistent storage

Integration with Redis for caching and token management

# Technologies
The Bank API is built using the following technologies:

Node.js

Express.js

MongoDB

Redis

JSON Web Tokens (JWT)

Mongoose (MongoDB object modeling)

RateLimit (Express middleware for rate limiting)

Other necessary dependencies (see package.json)

# API Documentation
For detailed API documentation and endpoint information, please refer to the API Documentation section.


## Installation

Clone the repository:

```bash
  git clone https://github.com/tochinicky/bank_api.git
```
Navigate to the project directory:

 ```bash
 cd bank_api
 cd src
```   
Install the dependencies:
 ```bash
npm install
```   

Set up the necessary environmental variables. Create a .env file in the root directory and configure the following variables:

 ```bash
DB_CONNECT = mongodb://localhost:27017/bank-api
ACCESS_TOKEN = access-token-secret
REFRESH_TOKEN = your-refresh-token-secret
PORT = 4000
```   
Start the server:
 ```bash
npm start
```  
The API should now be running on http://localhost:3000.
## API Documentation

For detailed API documentation and endpoint information, please refer to the [API Documentation](https://documenter.getpostman.com/view/4392918/2s93m34jMh) section.

