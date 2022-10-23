// Much easier to use CommonJS "require" with Express
// Cant use ES2015 import statements w server side modules: import express from 'express'
const express = require('express');

// Create the Ex app:
const app = express();

// Create the route:
app.get('/', (req, res) => {
   // res.send({ hi: 'there' });
   res.send('<h1>Running!</h1>');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);
