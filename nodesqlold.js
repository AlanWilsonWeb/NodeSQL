const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("chinook.sqlite");

db.each(`SELECT * from Artist LIMIT 100`, (err, row) => {
  if (err) throw err;
  console.log(row);
});

db.close();
