"use strict";
let sql = require('../../db/sql/sql.js');
const moment = require('moment');

module.exports = {
    processPlayerData(data, db) {
        db.serialize(function() {
            db.run(sql.createPlayerTable);
        });
        if(data && data.length > 0) {
            data.forEach(function(player) {
                if(player && player.playerName) {
                    console.log("Processing " + player.playerName);
                }
                db.serialize(function() {
                    db.get(sql.findPlayer, player.playerId, (err, dbPlayer) => {
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
                            let insertPlayers = "INSERT INTO players(lastUpdated," + Object.keys(player).join(",") + ") ";
                            let values = Object.keys(player).map((key) => { 
                                if(typeof player[key] == "string") {
                                    return '"' + player[key] + '"';
                                } else {
                                    return player[key] || 0;
                                }
                            });
                            insertPlayers += "VALUES (" + new moment().unix() + "," + values.join(",") + ")";
                            console.log(insertPlayers);
                            db.run(insertPlayers);
                        }
                    });
                });
            });
        }
    },

    findAll(db, cb) {
        db.serialize(function() {
            db.all(sql.findAll, cb);
        });
    }
}