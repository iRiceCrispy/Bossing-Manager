# Bossing-Manager

## Overview
[Bossing-Manger](https://bossing-manager.herokuapp.com/) is a boss drop tracker app for a popular MMORPG game [Maplestory](https://maplestory.nexon.net/). Users can utilize this app to easily manage their boss drops within their parties by keeping track of what items are pending/sold, and which member in the party has recieved/waiting on their payment.

## application Architecture
Bossing-Manager is built on a React frontend and an Express backend, using MongoDB as its database. Data is manually gathered from a [community wiki](https://maplestory.fandom.com/wiki/MapleStory_Wiki).

## Technologies Used
### Frontend
* HTML
* CSS
* JavaScript
* React
* Redux

### Backend
* JavaScript
* Express
* MongoDB
* Mongoosejs

## Steps to clone this app
### 1. Clone this repo in your project folder
```
git clone https://github.com/iRiceCrispy/Bossing-Manager.git
```
### 2. Register for a MongoDb Atlas account [here](https://www.mongodb.com/cloud/atlas/register)
### 3. Follow the official [instructions](https://www.mongodb.com/basics/mongodb-atlas-tutorial) provided by MongoDb to setup your atlas.
### 4. Install dependencies for both the frontend and backend
in the root directory
```
npm install
```
move to the client directory
```
cd client/
npm install
```
### 5. Create a .env file in the root directory based on the .env.exmaple file
Edit the information between the `<>`'s as you see fit.
Follow the above instructions to see how you can get a `MONGO_URI`.
### 6. Once you have correctly set up the database and pasted the `URI` in the `.env` file
seed data by running
```
npm run seed:all
```
unseed data by running
```
npm run seed:undo
```

* For production mode, use the commands `npm run seed` and `npm run unseed` instead.

### 7. Start the servers for the app
run 
```
npm start
```
in the root directory to start the backend server and in the `client` directory to start the frontend server.

## Wiki docs [here](https://github.com/iRiceCrispy/Bossing-Manager/wiki)
