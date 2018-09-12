import _ from "lodash";

export const updatePlayers = (
  match,
  matchNo,
  playerNo,
  points,
  players,
  winner
) => {
  const playerIdArr = [match.player1seed, match.player2seed];

  _.forEach(playerIdArr, playerId => {
    // const playerId = match[`player${playerNo}seed`];

    const playerInfo = _.find(players, { seed: +playerId });
    const playerInfoLocation = _.findIndex(players, { seed: +playerId });

    playerInfo.ptsRecord[match.heat - 1] = +points;
    playerInfo.name === winner
      ? (playerInfo.winRecord[match.heat - 1] = matchNo)
      : (playerInfo.lossRecord[match.heat - 1] = matchNo);

    playerInfo.wins = 0;
    playerInfo.losses = 0;
    playerInfo.pts = 0;
    _.forEach(playerInfo.winRecord, win => win !== 0 && playerInfo.wins++);
    _.forEach(playerInfo.lossRecord, loss => loss !== 0 && playerInfo.losses++);
    _.forEach(playerInfo.ptsRecord, pts => (playerInfo.pts += +pts));

    players[playerInfoLocation] = playerInfo;
  });
  return players;
};
