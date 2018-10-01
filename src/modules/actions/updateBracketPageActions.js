import _ from "lodash";

import {
  updateWinner,
  updateWinnerOnDelete,
  updatePlayerPoints,
  updatePosition
} from "./utils/updatePlayers";
import * as actionTypes from "../actionTypes";
import { brktRef } from "../../config/firebase";

export function updateBrkt(brkt, key) {
  return {
    type: actionTypes.UPDATE_FROM_FIREBASE,
    payload: { brkt, key }
  };
}

// export function updatePoints(
//   match,
//   matchNo,
//   playerNo,
//   points,
//   players,
//   brktKey
// ) {
//   // const updatedPlayerPoints = updatePlayerPoints(
//   //   match,
//   //   playerNo,
//   //   points,
//   //   players
//   // );

//   const updatedUserData = {};

//   const displayedPoints = !points || points === "" ? null : +points;

//   // match[`player${playerNo}Points`] = displayedPoints;
//   updatedUserData[
//     `tests/${brktKey}/brktInfo/matches/match${matchNo}/player${playerNo}Points`
//   ] = displayedPoints;

//   // updatedUserData[`tests/${brktKey}/playerNames`] = updatedPlayerPoints;

//   brktRef.update(updatedUserData, function(error) {
//     if (error) {
//       console.log("Error updating data:", error);
//     }
//   });

//   //pointless return state is updated though the database and then the function above
//   return {
//     type: actionTypes.UPDATE_POINTS,
//     payload: { matchNo, playerNo, displayedPoints }
//   };
// }

// export function winnerLoser(match, matchNo, players, seedsArr, brktKey) {
//   let winningPlayerName = "";
//   let winningPlayerSeed = "";
//   let winnerCheck;

//   const deletedPoints =
//     match[`player1Points`] === null || match[`player2Points`] === null
//       ? true
//       : false;

//   !deletedPoints
//     ? (winnerCheck = match[`player1Points`] - match[`player2Points`])
//     : (winnerCheck = false);

//   if (winnerCheck > 0) {
//     winningPlayerName = match.player1Name;
//     winningPlayerSeed = match.player1seed;
//     match[`winner`] = winningPlayerName;
//   } else if (winnerCheck < 0) {
//     winningPlayerName = match.player2Name;
//     winningPlayerSeed = match.player2seed;
//     match[`winner`] = winningPlayerName;
//   } else if (winnerCheck === 0) {
//     if (match.player1seed < match.player2seed) {
//       winningPlayerName = match.player1Name;
//       winningPlayerSeed = match.player1seed;
//       match[`winner`] = winningPlayerName;
//     } else {
//       winningPlayerName = match.player2Name;
//       winningPlayerSeed = match.player2seed;
//       match[`winner`] = winningPlayerName;
//     }
//   } else if (!winnerCheck) {
//     winningPlayerName = "";
//     winningPlayerSeed = "";
//     match[`winner`] = winningPlayerName;
//     players = updateWinnerOnDelete(match, players);
//   }

//   if (winnerCheck) {
//     players = updateWinner(match, matchNo, players, winningPlayerSeed);
//   }

//   players = updatePosition(players, seedsArr, winningPlayerSeed);

//   const updatedUserData = {};

//   if (match.goesTo) {
//     const winningPlayer =
//       match[`goesToPos`] === "upper" ? "player1" : "player2";

//     updatedUserData[
//       `tests/${brktKey}/brktInfo/matches/match${
//         match["goesTo"]
//       }/${winningPlayer}Name`
//     ] = winningPlayerName;

//     updatedUserData[
//       `tests/${brktKey}/brktInfo/matches/match${
//         match["goesTo"]
//       }/${winningPlayer}seed`
//     ] = winningPlayerSeed;

//     if (winnerCheck) {
//       updatedUserData[
//         `tests/${brktKey}/brktInfo/matches/match${
//           match["goesTo"]
//         }/${winningPlayer}Edit`
//       ] = true;
//     } else {
//       updatedUserData[
//         `tests/${brktKey}/brktInfo/matches/match${
//           match["goesTo"]
//         }/${winningPlayer}Edit`
//       ] = false;
//     }
//   }

//   if (match["player1GetFrom"] && !deletedPoints) {
//     updatedUserData[
//       `tests/${brktKey}/brktInfo/matches/match${
//         match["player1GetFrom"]
//       }/player1Edit`
//     ] = false;
//     updatedUserData[
//       `tests/${brktKey}/brktInfo/matches/match${
//         match["player1GetFrom"]
//       }/player2Edit`
//     ] = false;
//   } else if (match["player1GetFrom"] && deletedPoints) {
//     updatedUserData[
//       `tests/${brktKey}/brktInfo/matches/match${
//         match["player1GetFrom"]
//       }/player1Edit`
//     ] = true;
//     updatedUserData[
//       `tests/${brktKey}/brktInfo/matches/match${
//         match["player1GetFrom"]
//       }/player2Edit`
//     ] = true;
//   }

//   console.log(deletedPoints);
//   if (match["player2GetFrom"] && !deletedPoints) {
//     updatedUserData[
//       `tests/${brktKey}/brktInfo/matches/match${
//         match["player2GetFrom"]
//       }/player1Edit`
//     ] = false;
//     updatedUserData[
//       `tests/${brktKey}/brktInfo/matches/match${
//         match["player2GetFrom"]
//       }/player2Edit`
//     ] = false;
//   } else if (match["player2GetFrom"] && deletedPoints) {
//     updatedUserData[
//       `tests/${brktKey}/brktInfo/matches/match${
//         match["player2GetFrom"]
//       }/player1Edit`
//     ] = true;
//     updatedUserData[
//       `tests/${brktKey}/brktInfo/matches/match${
//         match["player2GetFrom"]
//       }/player2Edit`
//     ] = true;
//   }

//   updatedUserData[`tests/${brktKey}/playerNames`] = players;
//   updatedUserData[
//     `tests/${brktKey}/brktInfo/matches/match${matchNo}/winner`
//   ] = winningPlayerName;

//   console.log(updatedUserData);
//   brktRef.update(updatedUserData, function(error) {
//     if (error) {
//       console.log("Error updating data:", error);
//     }
//   });

//   //pointless return state is updated though the database and then the function above
//   return {
//     type: actionTypes.UPDATE_POINTS,
//     payload: "Winner"
//   };
// }

export function componentCleanup() {
  return {
    type: actionTypes.COMPONENT_CLEANUP,
    payload: {}
  };
}

export function updateEntireBracket(brkt, matchNo, playerNo, points) {
  //setting points in match
  const displayedPoints = !points || points === "" ? null : +points;
  brkt.matches[`match${matchNo}`][`player${playerNo}Points`] = displayedPoints;

  //reset all the points for every player before updating all points for every player
  //in case of win/loss change later
  _.forEach(brkt.playerNames, player => {
    _.forEach(player.ptsRecord, pts => 0);
  });

  //run through entire bracket and update everything
  _.forEach(brkt.matches, (match, index) => {
    updatePlayerPoints(match, brkt.playerNames, brkt.matches);
    if (match.player1Name) {
      match.player1Edit = true;
    } else {
      match.player1Edit = false;
    }

    if (match.player2Name) {
      match.player2Edit = true;
    } else {
      match.player2Edit = false;
    }

    // brkt.matches[`match${index + 1}`] = match;
    return brkt;
  });
  // updatePosition(brkt.playerNames);

  const names = updatePosition(brkt.playerNames);

  const updatedUserData = {};

  updatedUserData[`tests/${brkt.brktKey}/playerNames`] = names;

  delete brkt.playerNames;

  updatedUserData[`tests/${brkt.brktKey}/brktInfo`] = brkt;

  brktRef.update(updatedUserData, function(error) {
    if (error) {
      console.log("Error updating data:", error);
    }
  });

  return {
    type: actionTypes.UPDATE_ENTIRE_BRACKET,
    payload: brkt
  };
}
