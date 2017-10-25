"use strict";
const request = require("request");
const sqlite3 = require('sqlite3').verbose();
const config = require('./config');
const moment = require('moment');
const playerService = require('./lib/service/playerService');
const express = require('express');
const db = new sqlite3.Database('./db/stats.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the stats database.');
});


function syncData() {
    var skaterOptions = {
        url: config.api.skatersUrl,
        headers: {
        }
    };
    
    var goalieOptions = {
        url: config.api.goaliesUrl,
        headers: {
        }
    };
    request.get(skaterOptions, function(error, response, body) {
        let data = JSON.parse(body).data;
        playerService.processPlayerData(data,db);
    });
    
    request.get(goalieOptions, function(error, response, body) {
        let data = JSON.parse(body).data;
        playerService.processPlayerData(data,db);
    });
}

let app = express();

app.get('/players', function(req, res) {
    let players = playerService.findAll(db, function(err, players) {
        if(err) {
            res.status(500).send({error: "Failed to find players"});
        }
        res.status(200).send(players);
    });
    
});

app.get('/update', function(req, res) {
    //TODO: Make sure this endpoint doesnt get spammed
    syncData();
    //Don't return anything
});


app.listen(process.env.PORT || 8080, function() {
    console.log("Server started.");
});
