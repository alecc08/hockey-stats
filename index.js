"use strict";
let request = require("request");
const sqlite3 = require('sqlite3').verbose();
let moment = require('moment');
let db = new sqlite3.Database('./db/stats.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the stats database.');
});
let sql = require('./lib/sql/sql.js');

db.serialize(function() {
    db.run(sql.createPlayerTable);
});

let findPlayer = 'SELECT * FROM players WHERE playerId = ?';


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
        if(player && player.playerName) {
            console.log("Processing " + player.playerName);
        }
        
        db.serialize(function() {
            db.get(findPlayer, player.playerId, (err, dbPlayer) => {
                if(err) console.log(err);
                if(dbPlayer) {
                    console.log("Found db player");
                    let updatePlayer = "UPDATE players SET ";
                    updatePlayer += Object.keys(player).map((key) => {
                        if(typeof player[key] == "string") {
                            return key + "=" + '"' + player[key] + '"';
                        } else {
                            return key + "=" + player[key] || 0;
                        }
                    }).join(",");
                    updatePlayer += " WHERE playerId = " + player.playerId;
                    console.log(updatePlayer);
                    db.run(updatePlayer);
                } else {
                    console.log("Didnt find db player");
                    let insertPlayer = "INSERT INTO players(lastUpdated," + Object.keys(player).join(",") + ") ";
                    let values = Object.keys(player).map((key) => { 
                        if(typeof player[key] == "string") {
                            return '"' + player[key] + '"';
                        } else {
                            return player[key] || 0;
                        }
                    });
                    insertPlayer += "VALUES (" + new moment().unix() + "," + values.join(",") + ")";
                    console.log(insertPlayer);
                    db.run(insertPlayer);
                }
            });
        });

    });
}