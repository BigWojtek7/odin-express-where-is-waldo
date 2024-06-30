#! /usr/bin/env node

// Example of test db by populate with examples
console.log(
  'This script populates some test posts, scores  to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Score = require('./models/score');

const scores = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createScores();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

async function scoreCreate(index, username, time) {
  const score = new Score({
    username: username,
    time: time,
  });
  await score.save();
  scores[index] = score;
  console.log(`Added score: ${index}`);
}

async function createScores() {
  console.log('Adding scores');
  await Promise.all([
    scoreCreate(0, 'Walter', '00:25:512'),
    scoreCreate(1, 'Marck', '00:12:512'),
    scoreCreate(2, 'Willis', '00:08:512'),
  ]);
}
