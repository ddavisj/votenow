# Introduction

This demo app was adapted from an email sending app built within a full-stack course, and is built with a MERN stack: MongoDB, Express, React and Node.

The app allows paid users to send group emails to a user base and obtain feedback on a question that they pose to users.

It features a number of API integrations: Google OAuth allows users to securely sign in without having to enter a password, Stripe enables users to pay to add credit to their account so they can send out surveys, SendGrid facilitates email sending and enables click-tracking and Mongo Cloud Atlas securely stores user and survey data in the cloud.

When recipients receive an email, they click a link in the email and this directs them to a page on our website. Clicks are tracked via the user email and ID, users can only vote once per survey to prevent duplicate tracking and "cheating". Paid users can then view the number of clicks on each survey to get feedback from their target audience.

The site is hosted on Heroku.

# APIs

This app makes use of a number of key APIs:

## SendGrid

SendGrid is used to send emails. It authenticates an admin email, and all group emails are then sent from this email address via SendGrid.

## Google Auth

Single sign on protocol. Integrated via Passport JS.

## Stripe

Enables user to add credits. Note - we only use Stripe Test mode.

## Mongo Cloud Atlas

All user and survey data is stored in MongoDB, via Cloud Atlas.

# Main Technologies

## React

Library used to build the app front-end.

## Redux

Manages state and actions to send data to and from Mongo via Redux actions.

## MongoDB and Mongoose

MongooseJS is an Object Data Modeling (ODM) library that allows Node to communicate with Mongo.

# Additional Node Modules and Add-ons

-  Axios: Lets us make asynchronous requests (ie. requests that take a finite amount of time)

-  Redux Form: Enables and greatly simplifies the process of creating forms using Redux

-  React-Router-DOM: Map paths to routes, this lets us specify what components will be loaded at specific urls. Create page Links that bypass refresh enabling the maintenance of data stored within client memory

-  Redux-Thunk: Enables processing of async requests within Redux

# Main Folders

## Main folder structure

-  Client (React, front-end code) folder: all code and componentry related to the React-Redux side of the application. This code has been uploaded to GitHub

-  Server: contains Express files, routing etc.

## Main folders within src

-  actions: contains all action creators

-  components: React components

-  reducers: Redux reducers

# Additional Key Files

-  Procfile: Config file for Heroku to initiate the app

# Running the App

In the server dir: npm run dev
Disable const requireHttps and app.use(requireHttps) in root index file on dev
