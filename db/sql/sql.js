module.exports = {
    createPlayerTable : `CREATE TABLE IF NOT EXISTS 
        players (
            assists INTEGER,
            faceoffWinPctg NUMERIC,
            gameWinningGoals INTEGER,
            gamesPlayed INTEGER,
            goals INTEGER,
            otGoals INTEGER,
            penaltyMinutes NUMERIC,
            playerBirthCity TEXT,
            playerBirthCountry TEXT,
            playerBirthDate TEXT,
            playerBirthStateProvince TEXT,
            playerDraftOverallPickNo INTEGER,
            playerDraftRoundNo INTEGER,
            playerDraftYear INTEGER,
            playerFirstName TEXT,
            playerHeight NUMERIC,
            playerId INTEGER,
            playerInHockeyHof INTEGER,
            playerLastName TEXT,
            playerName TEXT,
            playerNationality TEXT,
            playerPositionCode TEXT,
            playerShootsCatches TEXT,
            playerTeamsPlayedFor TEXT,
            playerWeight NUMERIC,
            plusMinus INTEGER,
            points INTEGER,
            pointsPerGame NUMERIC,
            ppGoals INTEGER,
            ppPoints INTEGER,
            seasonId TEXT,
            shGoals INTEGER,
            shPoints INTEGER,
            shiftsPerGame NUMERIC,
            shootingPctg NUMERIC,
            shots INTEGER,
            timeOnIcePerGame NUMERIC,
            timeOnIce NUMERIC,
        
            gamesStarted INTEGER,
            goalsAgainst INTEGER,
            goalsAgainstAverage NUMERIC,
            losses INTEGER,
            otLosses INTEGER,
            savePctg NUMERIC,
            saves INTEGER,
            shotsAgainst INTEGER,
            shutouts INTEGER,
            ties INTEGER,
            wins INTEGER,
        
            lastUpdated INTEGER,
            active INTEGER,
            injury TEXT
        )`,
        findPlayer : 'SELECT * FROM players WHERE playerId = ?',
        findAll: 'SELECT * FROM players'
    
};