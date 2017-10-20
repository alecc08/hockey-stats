"use strict";

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PlayerSchema = new Schema({
    "assists": Number,
    "faceoffWinPctg": Number,
    "gameWinningGoals": Number,
    "gamesPlayed": Number,
    "goals": Number,
    "otGoals": Number,
    "penaltyMinutes": Number,
    "playerBirthCity": String,
    "playerBirthCountry": String,
    "playerBirthDate": String,
    "playerBirthStateProvince": String,
    "playerDraftOverallPickNo": Number,
    "playerDraftRoundNo": Number,
    "playerDraftYear": Number,
    "playerFirstName": String,
    "playerHeight": Number,
    "playerId": {type: Number, index: true},
    "playerInHockeyHof": Number,
    "playerLastName": String,
    "playerName": String,
    "playerNationality": String,
    "playerPositionCode": String,
    "playerShootsCatches": String,
    "playerTeamsPlayedFor": String,
    "playerWeight": Number,
    "plusMinus": Number,
    "points": Number,
    "pointsPerGame": Number,
    "ppGoals": Number,
    "ppPoints": Number,
    "seasonId": String,
    "shGoals": Number,
    "shPoints": Number,
    "shiftsPerGame": Number,
    "shootingPctg": Number,
    "shots": Number,
    "timeOnIcePerGame": Number,

    //Goalies
    "gamesStarted": Number,
    "goalsAgainst": Number,
    "goalsAgainstAverage": Number,
    "losses": Number,
    "otLosses": Number,
    "savePctg": Number,
    "saves": Number,
    "shotsAgainst": Number,
    "shutouts": Number,
    "ties": Number,
    "wins": Number,

    //Non-nhl things
    "lastUpdated": Date,
    "active": Boolean,
    "injury": String


});

module.exports = mongoose.model("Player", PlayerSchema);
