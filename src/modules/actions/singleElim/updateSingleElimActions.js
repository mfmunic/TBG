import _ from "lodash";

import {
  updateWinner,
  updateWinnerOnDelete,
  updatePlayerPoints,
  updatePosition
} from "../utils/updatePlayers";
import * as actionTypes from "../../actionTypes";
import { brktRef } from "../../../config/firebase";

// export function updateEntireBracket(brkt, matchNo, playerNo, points) {
//   //setting points in match
//   const displayedPoints = !points || points === "" ? null : +points;
//   brkt.matches[`match${matchNo}`][`player${playerNo}Points`] = displayedPoints;

//   //reset all the points for every player before updating all points for every player
//   //in case of win/loss change later
//   _.forEach(brkt.playerNames, player => {
//     _.forEach(player.ptsRecord, pts => 0);
//   });

//   //run through entire bracket and update everything
//   _.forEach(brkt.matches, (match, index) => {
//     updatePlayerPoints(match, brkt.playerNames, brkt.matches);
//     if (match.player1Name) {
//       match.player1Edit = true;
//     } else {
//       match.player1Edit = false;
//     }

//     if (match.player2Name) {
//       match.player2Edit = true;
//     } else {
//       match.player2Edit = false;
//     }

//     // brkt.matches[`match${index + 1}`] = match;
//     return brkt;
//   });
//   // updatePosition(brkt.playerNames);

//   const names = updatePosition(brkt.playerNames);

//   const updatedUserData = {};

//   updatedUserData[`tests/${brkt.brktKey}/playerNames`] = names;

//   delete brkt.playerNames;

//   updatedUserData[`tests/${brkt.brktKey}/brktInfo`] = brkt;

//   brktRef.update(updatedUserData, function(error) {
//     if (error) {
//       console.log("Error updating data:", error);
//     }
//   });

//   return {
//     type: actionTypes.UPDATE_ENTIRE_BRACKET,
//     payload: brkt
//   };
// }

// export function updatePoints(
//   match,
//   matchNo,
//   playerNo,
//   points,
//   brktKey,
//   matches
// ) {
//   const updatedUserPoints = {};
//   const updatedUserDataArr = [];

//   const displayedPoints = !points || points === "" ? null : +points;

//   updatedUserPoints[
//     `tests/${brktKey}/brktInfo/matches/match${matchNo}/player${playerNo}Points`
//   ] = displayedPoints;

//   if (displayedPoints === null && match.goesTo) {
//     const winningPlayer =
//       match[`goesToPos`] === "upper" ? "player1" : "player2";

//     updatedUserPoints[
//       `tests/${brktKey}/brktInfo/matches/match${
//         match["goesTo"]
//       }/${winningPlayer}Name`
//     ] = null;

//     updatedUserPoints[
//       `tests/${brktKey}/brktInfo/matches/match${
//         match["goesTo"]
//       }/${winningPlayer}seed`
//     ] = "";

//     updatedUserPoints[
//       `tests/${brktKey}/brktInfo/matches/match${
//         match["goesTo"]
//       }/${winningPlayer}Points`
//     ] = null;
//   }

//   updatedUserDataArr.push(updatedUserPoints);

//   //determine winner
//   match[`player${playerNo}Points`] = displayedPoints;
//   if (
//     match.player1Points !== null &&
//     match.player1Points !== undefined &&
//     match.player2Points !== null &&
//     match.player2Points !== undefined
//   ) {
//     const winnerMatch = determineWinner(match, brktKey);
//     updatedUserDataArr.push(winnerMatch.updatedUserData);
//     match = winnerMatch.match;
//   } else {
//     updatedUserPoints[
//       `tests/${brktKey}/brktInfo/matches/match${match["match"]}/winner`
//     ] = null;
//     match.winner = null;
//   }

//   //update Validation
//   matches[`match${matchNo}`] = match;

//   console.log(matches);
//   // updatedUserDataArr.push(updateValidation(matches, brktKey));

//   const updatedUserData = _.reduce(updatedUserDataArr, (accumulator, value) => {
//     return _.merge(accumulator, value);
//   });

//   return updatedUserData;
// }

// export const determineWinner = (match, brktKey) => {
//   let winner;

//   const updatedUserData = {};
//   const winnerCheck = match["player1Points"] - match["player2Points"];

//   if (winnerCheck > 0) {
//     winner = "player1";
//   } else if (winnerCheck < 0) {
//     winner = "player2";
//   } else if (winnerCheck === 0) {
//     if (match.player1seed < match.player2seed) {
//       winner = "player1";
//     } else {
//       winner = "player2";
//     }
//   }

//   match.winner = match[`${winner}Name`];
//   const winnerId = match[`${winner}seed`];

//   if (match.goesTo) {
//     const winningPlayer =
//       match[`goesToPos`] === "upper" ? "player1" : "player2";

//     updatedUserData[
//       `tests/${brktKey}/brktInfo/matches/match${
//         match["goesTo"]
//       }/${winningPlayer}Name`
//     ] = match[`${winner}Name`];

//     updatedUserData[
//       `tests/${brktKey}/brktInfo/matches/match${
//         match["goesTo"]
//       }/${winningPlayer}seed`
//     ] = winnerId;
//   }

//   updatedUserData[
//     `tests/${brktKey}/brktInfo/matches/match${match["match"]}/winner`
//   ] = match[`${winner}Name`];

//   return { updatedUserData, match };
// };

// const updateValidation = (matches, brktKey) => {
//   const updatedUserData = {};
//   _.forEach(matches, match => {
//     console.log(match.player2Name);
//     if (match.player1Name) {
//       match.player1Edit = true;
//     } else {
//       match.player1Edit = false;
//     }

//     if (match.player2Name) {
//       match.player2Edit = true;
//     } else {
//       match.player2Edit = false;
//     }

//     if (!match.winner && match.goesTo) {
//       const winningPlayer =
//         match[`goesToPos`] === "upper" ? "player1" : "player2";

//       updatedUserData[
//         `tests/${brktKey}/brktInfo/matches/match${
//           match["goesTo"]
//         }/${winningPlayer}Name`
//       ] = null;

//       updatedUserData[
//         `tests/${brktKey}/brktInfo/matches/match${
//           match["goesTo"]
//         }/${winningPlayer}seed`
//       ] = "";

//       updatedUserData[
//         `tests/${brktKey}/brktInfo/matches/match${
//           match["goesTo"]
//         }/${winningPlayer}Points`
//       ] = null;

//       updatedUserData[
//         `tests/${brktKey}/brktInfo/matches/match${
//           match["goesTo"]
//         }/${winningPlayer}Edit`
//       ] = false;
//     }
//     updatedUserData[
//       `tests/${brktKey}/brktInfo/matches/match${match.match}/player1Edit`
//     ] = match.player1Edit;
//     updatedUserData[
//       `tests/${brktKey}/brktInfo/matches/match${match.match}/player2Edit`
//     ] = match.player2Edit;
//   });
//   return updatedUserData;
// };

export function updatePoints(
  match,
  matchNo,
  playerNo,
  points,
  brktKey,
  matches
) {
  _.forEach(matches, match => {
    let {
      player1Points,
      player2Points,
      player1GetFrom,
      player2GetFrom,
      player1Name,
      player2Name
    } = match;

    //update from previous
    if (player1GetFrom && matches[`match${player1GetFrom}`].winner) {
      match.player1Name = matches[`match${player1GetFrom}`].winner;
      const winnerSeed =
        matches[`match${player1GetFrom}`].player1Name ===
        matches[`match${player1GetFrom}`].winner
          ? matches[`match${player1GetFrom}`].player1seed
          : matches[`match${player1GetFrom}`].player2seed;
      match.player1seed = winnerSeed;
    } else if (player1GetFrom && !matches[`match${player1GetFrom}`].winner) {
      match.player1Name = null;
      match.player1seed = "";
    }

    if (player2GetFrom && matches[`match${player2GetFrom}`].winner) {
      match.player2Name = matches[`match${player2GetFrom}`].winner;
      const winnerSeed =
        matches[`match${player2GetFrom}`].player2Name ===
        matches[`match${player2GetFrom}`].winner
          ? matches[`match${player2GetFrom}`].player2seed
          : matches[`match${player2GetFrom}`].player1seed;
      match.player2seed = winnerSeed;
    } else if (player1GetFrom && !matches[`match${player1GetFrom}`].winner) {
      match.player2Name = null;
      match.player2seed = "";
    }

    if (player1Name) {
      match.player1Edit = true;
    } else {
      match.player1Edit = false;
      match.player1Points = "";
    }

    if (player2Name) {
      match.player2Edit = true;
    } else {
      match.player2Edit = false;
      match.player2Points = "";
    }

    //update points
    if (match.match === matchNo) {
      const displayedPoints = !points || points === "" ? null : +points;
      match[`player${playerNo}Points`] = displayedPoints;
    }

    //update winner
    if (
      player1Points !== null &&
      player1Points !== undefined &&
      player2Points !== null &&
      player2Points !== undefined
    ) {
      console.log("aaa", player2Points, match.match);
      match.winner = determineWinner(match);
    } else {
      match.winner = "";
    }

    return match;
  });

  console.log(matches);
  return { [`tests/${brktKey}/brktInfo/matches`]: matches };
}

export const determineWinner = match => {
  let winner;

  const winnerCheck = match["player1Points"] - match["player2Points"];

  if (winnerCheck > 0) {
    winner = "player1";
  } else if (winnerCheck < 0) {
    winner = "player2";
  } else if (winnerCheck === 0) {
    if (match.player1seed < match.player2seed) {
      winner = "player1";
    } else {
      winner = "player2";
    }
  }

  return match[`${winner}Name`];
};
