import _ from "lodash";

// export const updateWinner = (match, matchNo, players, winnerId) => {
//   let loserId = "";
//   if (match["player1seed"] === winnerId) {
//     loserId = match["player2seed"];
//   } else {
//     loserId = match["player1seed"];
//   }

//   const winnerInfo = _.find(players, { seed: +winnerId });
//   const loserInfo = _.find(players, { seed: +loserId });

//   const winnerInfoLocation = _.findIndex(players, { seed: +winnerId });
//   const loserInfoLocation = _.findIndex(players, { seed: +loserId });

//   winnerInfo.lossRecord[match.heat - 1] = 0;
//   loserInfo.winRecord[match.heat - 1] = 0;

//   winnerInfo.wins = 0;
//   winnerInfo.losses = 0;
//   loserInfo.wins = 0;
//   loserInfo.losses = 0;

//   winnerInfo.winRecord[match.heat - 1] = matchNo;
//   loserInfo.lossRecord[match.heat - 1] = matchNo;

//   _.forEach(winnerInfo.winRecord, win => {
//     if (win !== 0) {
//       winnerInfo.wins++;
//     }
//     return winnerInfo;
//   });
//   _.forEach(winnerInfo.lossRecord, win => {
//     if (win !== 0) {
//       winnerInfo.losses++;
//     }
//     return winnerInfo;
//   });
//   _.forEach(loserInfo.winRecord, win => {
//     if (win !== 0) {
//       loserInfo.wins++;
//     }
//     return loserInfo;
//   });
//   _.forEach(loserInfo.lossRecord, win => {
//     if (win !== 0) {
//       loserInfo.losses++;
//     }
//     return loserInfo;
//   });

//   players[winnerInfoLocation] = winnerInfo;
//   players[loserInfoLocation] = loserInfo;
//   return players;
// };

// export const updateWinnerOnDelete = (match, players) => {
//   const player1Info = _.find(players, { seed: match["player1seed"] });
//   const player2Info = _.find(players, { seed: match["player2seed"] });

//   const player1InfoLocation = _.findIndex(players, { seed: +player1Info });
//   const player2InfoLocation = _.findIndex(players, { seed: +player2Info });

//   player1Info.lossRecord[match.heat - 1] = 0;
//   player2Info.winRecord[match.heat - 1] = 0;

//   player1Info.wins = 0;
//   player1Info.losses = 0;
//   player2Info.wins = 0;
//   player2Info.losses = 0;

//   _.forEach(player1Info.winRecord, win => {
//     if (win !== 0) {
//       player1Info.wins++;
//     }
//     return player1Info;
//   });
//   _.forEach(player1Info.lossRecord, win => {
//     if (win !== 0) {
//       player1Info.losses++;
//     }
//     return player1Info;
//   });
//   _.forEach(player2Info.winRecord, win => {
//     if (win !== 0) {
//       player2Info.wins++;
//     }
//     return player2Info;
//   });
//   _.forEach(player2Info.lossRecord, win => {
//     if (win !== 0) {
//       player2Info.losses++;
//     }
//     return player2Info;
//   });

//   players[player1InfoLocation] = player1Info;
//   players[player2InfoLocation] = player2Info;
//   return players;
// };

// export const updatePlayerPoints = (match, playerNo, points, players) => {
//   const playerId = match[`player${playerNo}seed`];
//   const playerInfo = _.find(players, { seed: +playerId });
//   const playerInfoLocation = _.findIndex(players, { seed: +playerId });

//   // const blank = points === "" ? true : false;

//   playerInfo.ptsRecord[match.heat - 1] = +points;

//   playerInfo.pts = 0;

//   _.forEach(playerInfo.ptsRecord, pts => (playerInfo.pts += +pts));

//   players[playerInfoLocation] = playerInfo;

//   return players;
// };

export const updatePlayerPoints = (match, players, matches) => {
  if (match["player1seed"]) {
    const player1Info = _.find(players, { seed: +match["player1seed"] });
    const player1InfoLocation = _.findIndex(players, { seed: +player1Info });
    const points1 =
      match["player1Points"] === null || match["player1Points"] === undefined
        ? ""
        : +match["player1Points"];
    player1Info.ptsRecord[match.heat - 1] = points1;
    player1Info.pts = 0;
    _.forEach(player1Info.ptsRecord, pts => (player1Info.pts += +pts));
    players[player1InfoLocation] = player1Info;
  } else {
    match["player1Points"] = null;
  }

  if (match["player2seed"]) {
    const player2Info = _.find(players, { seed: +match["player2seed"] });
    const player2InfoLocation = _.findIndex(players, { seed: +player2Info });
    const points2 =
      match["player2Points"] === null || match["player2Points"] === undefined
        ? ""
        : +match["player2Points"];
    player2Info.ptsRecord[match.heat - 1] = points2;
    player2Info.pts = 0;
    _.forEach(player2Info.ptsRecord, pts => (player2Info.pts += +pts));
    players[player2InfoLocation] = player2Info;
  } else {
    match["player2Points"] = null;
  }

  if (
    match["player1Points"] !== null &&
    match["player1Points"] !== undefined &&
    match["player2Points"] !== null &&
    match["player2Points"] !== undefined
  ) {
    declareMatchWinner(match, players);
  } else {
    match.winner = "";
  }

  if (match.goesTo) {
    declareNextMatchPlayer(match, matches);
  }

  return { match, players };
};

const declareMatchWinner = (match, players) => {
  let winner, loser;
  const winnerCheck = match["player1Points"] - match["player2Points"];

  if (winnerCheck > 0) {
    winner = "player1";
    loser = "player2";
  } else if (winnerCheck < 0) {
    winner = "player2";
    loser = "player1";
  } else if (winnerCheck === 0) {
    if (match.player1seed < match.player2seed) {
      winner = "player1";
      loser = "player2";
    } else {
      winner = "player2";
      loser = "player1";
    }
  }

  match.winner = match[`${winner}Name`];
  const winnerId = match[`${winner}seed`];
  const loserId = match[`${loser}seed`];

  updatePlayersWinLossRecord(match, winnerId, loserId, players);

  return { match, players };
};

const updatePlayersWinLossRecord = (match, winnerId, loserId, players) => {
  const winnerInfo = _.find(players, { seed: +winnerId });
  const loserInfo = _.find(players, { seed: +loserId });

  const winnerInfoLocation = _.findIndex(players, { seed: +winnerId });
  const loserInfoLocation = _.findIndex(players, { seed: +loserId });

  // winnerInfo.lossRecord[match.heat - 1] = 0;
  _.forEach(players, player => {
    if (player.lossRecord[match.heat - 1] === match.match) {
      player.lossRecord[match.heat - 1] = 0;
    }
    if (player.winRecord[match.heat - 1] === match.match) {
      player.winRecord[match.heat - 1] = 0;
    }
  });

  // loserInfo.winRecord[match.heat - 1] = 0;

  winnerInfo.wins = 0;
  winnerInfo.losses = 0;
  winnerInfo.weightedWin = 0;

  loserInfo.wins = 0;
  loserInfo.losses = 0;
  loserInfo.weightedWin = 0;

  winnerInfo.winRecord[match.heat - 1] = +match.match;
  loserInfo.lossRecord[match.heat - 1] = +match.match;

  _.forEach(winnerInfo.winRecord, (win, index) => {
    if (win !== 0) {
      winnerInfo.wins++;
      winnerInfo.weightedWin += index;
    }
    return winnerInfo;
  });
  _.forEach(winnerInfo.lossRecord, win => {
    if (win !== 0) {
      winnerInfo.losses++;
    }
    return winnerInfo;
  });

  _.forEach(loserInfo.winRecord, (win, index) => {
    if (win !== 0) {
      loserInfo.wins++;
      winnerInfo.weightedWin += index;
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
  // return players;
};

const declareNextMatchPlayer = (match, matches) => {
  let winnerSeed;
  const {
    player1Name,
    player2Name,
    player1seed,
    player2seed,
    winner,
    goesTo,
    goesToPos
  } = match;
  const next = matches[`match${goesTo}`];

  if (winner === player1Name) {
    winnerSeed = player1seed;
  } else if (winner === player2Name) {
    winnerSeed = player2seed;
  } else {
    winnerSeed = "";
  }

  if (goesToPos === "upper") {
    next.player1Name = winner;
    next.player1seed = winnerSeed;
  } else {
    next.player2Name = winner;
    next.player2seed = winnerSeed;
  }
};

// Below still needs things
export const updatePosition = (players, seedsArr, winningPlayerSeed) => {
  const playerInfoArr = _.sortBy(players, ["losses", "seed"]);

  let winnerInfoArr = _.filter(playerInfoArr, player => player.losses === 0);
  let loserInfoArr = _.filter(playerInfoArr, player => player.losses === 1);

  loserInfoArr = _.sortBy(loserInfoArr, ["seed"]);
  loserInfoArr = _.reverse(loserInfoArr, ["wins", "pts", "seed"]);
  loserInfoArr = _.sortBy(loserInfoArr, ["wins", "pts"]);

  const Arr = _.sortBy(players, ["losses", "wins", "pts", "seed"]);
  console.log(Arr);

  _.forEach(winnerInfoArr, winner => {
    let moveChange = 0;
    for (let i = 0; i < loserInfoArr.length; i++) {
      if (winner.seed > loserInfoArr[i].seed) {
        moveChange++;
      }
    }
    winner.position = +winner.seed - moveChange;
    return winner;
  });

  _.forEach(loserInfoArr, (loser, index) => {
    const lastPos = players.length;
    loser.position = lastPos - index;
    return loser;
  });
  return players;
};
