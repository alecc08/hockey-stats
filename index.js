"use strict";
let request = require("request");
let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
let config = require("./config");
mongoose.connect(config.db);
let Player = require('./lib/model/Player');
let moment = require('moment');

let goalieUrl = "http://www.nhl.com/stats/rest/grouped/goalies/basic/season/goaliesummary?cayenneExp=gameTypeId=2%20and%20seasonId%3E=20172018%20and%20seasonId%3C=20172018";
let skaterUrl = "http://www.nhl.com/stats/rest/grouped/skaters/basic/season/skatersummary?cayenneExp=gameTypeId=2%20and%20seasonId%3E=20172018%20and%20seasonId%3C=20172018";

var skaterOptions = {
    url: skaterUrl,
    headers: {
    }
};

var goalieOptions = {
    url: skaterUrl,
    headers: {
    }
};

request.get(skaterOptions, function(error, response, body) {
    let data = JSON.parse(body).data;
    processPlayerData(data);
});

request.get(goalieOptions, function(error, response, body) {
    let data = JSON.parse(body).data;
    processPlayerData(data);
});

function processPlayerData(data) {
    data.forEach(function(player) {
        Player.findOne({playerId: player.playerId}, function(err, existingPlayer) {
            if(err) {
                console.log(err);
            }
            if(!existingPlayer) {
                console.log("Adding " + player.playerName);
                let playerSave = new Player(player);
                playerSave.lastUpdated = new moment();
                playerSave.save(function(err) {
                    if(err){
                        console.log(err);
                    }
                });
            } else {
                console.log("Updating " + existingPlayer.playerName);
                existingPlayer.set(player);
                existingPlayer.lastUpdated = new moment();
                existingPlayer.save(function(err) {
                    if(err) {
                        console.log(err);
                    }
                });
            }
        });
        
    });
}