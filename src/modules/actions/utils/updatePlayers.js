import _ from "lodash";

export const updateWinner = (match, matchNo, players, winnerId) => {
  let loserId = "";
  if (match["player1seed"] === winnerId) {
    loserId = match["player2seed"];
  } else {
    loserId = match["player1seed"];
  }

  const winnerInfo = _.find(players, { seed: +winnerId });
  const loserInfo = _.find(players, { seed: +loserId });

  const winnerInfoLocation = _.findIndex(players, { seed: +winnerId });
  const loserInfoLocation = _.findIndex(players, { seed: +loserId });

  winnerInfo.lossRecord[match.heat - 1] = 0;
  loserInfo.winRecord[match.heat - 1] = 0;

  winnerInfo.wins = 0;
  winnerInfo.losses = 0;
  loserInfo.wins = 0;
  loserInfo.losses = 0;

  winnerInfo.winRecord[match.heat - 1] = matchNo;
  loserInfo.lossRecord[match.heat - 1] = matchNo;

  _.forEach(winnerInfo.winRecord, win => {
    if (win !== 0) {
      winnerInfo.wins++;
    }
    return winnerInfo;
  });
  _.forEach(winnerInfo.lossRecord, win => {
    if (win !== 0) {
      winnerInfo.losses++;
    }
    return winnerInfo;
  });
  _.forEach(loserInfo.winRecord, win => {
    if (win !== 0) {
      loserInfo.wins++;
    }
    return loserInfo;
  });
  _.forEach(loserInfo.lossRecord, win => {
    if (win !== 0) {
      loserInfo.losses++;
    }
    return loserInfo;
  });

  players[winnerInfoLocation] = winnerInfo;
  players[loserInfoLocation] = loserInfo;
  return players;
};

export const updatePlayerPoints = (match, playerNo, points, players) => {
  const playerId = match[`player${playerNo}seed`];
  const playerInfo = _.find(players, { seed: +playerId });
  const playerInfoLocation = _.findIndex(players, { seed: +playerId });

  if (!points) {
    points = 0;
  }

  playerInfo.ptsRecord[match.heat - 1] = +points;

  playerInfo.pts = 0;

  _.forEach(playerInfo.ptsRecord, pts => (playerInfo.pts += +pts));
  players[playerInfoLocation] = playerInfo;

  return players;
};

export const updatePosition = (players, seedsArr, winningPlayerSeed) => {
  const playerInfoArr = _.sortBy(players, ["losses", "seed"]);

  let winnerInfoArr = _.filter(playerInfoArr, player => player.losses === 0);
  let loserInfoArr = _.filter(playerInfoArr, player => player.losses === 1);

  loserInfoArr = _.sortBy(loserInfoArr, ["seed"]);
  loserInfoArr = _.reverse(loserInfoArr, ["wins", "pts", "seed"]);
  loserInfoArr = _.sortBy(loserInfoArr, ["wins", "pts"]);

  _.forEach(winnerInfoArr, winner => {
    let moveChange = 0;
    for (let i = 0; i < loserInfoArr.length; i++) {
      if (winner.seed > loserInfoArr[i].seed) {
        moveChange++;
      }
    }
    winner.position = winner.seed - moveChange;
    return winner;
  });

  _.forEach(loserInfoArr, (loser, index) => {
    const lastPos = players.length;
    loser.position = lastPos - index;
    return loser;
  });
  return players;
};
