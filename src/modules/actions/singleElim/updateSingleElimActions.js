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

export function updatePoints(match, matchNo, playerNo, points, brktKey) {
  const updatedUserData = {};

  const displayedPoints = !points || points === "" ? null : +points;

  updatedUserData[
    `tests/${brktKey}/brktInfo/matches/match${matchNo}/player${playerNo}Points`
  ] = displayedPoints;

  if (displayedPoints === null && match.goesTo) {
    console.log("here");
    const winningPlayer =
      match[`goesToPos`] === "upper" ? "player1" : "player2";

    updatedUserData[
      `tests/${brktKey}/brktInfo/matches/match${
        match["goesTo"]
      }/${winningPlayer}Name`
    ] = null;

    updatedUserData[
      `tests/${brktKey}/brktInfo/matches/match${
        match["goesTo"]
      }/${winningPlayer}seed`
    ] = "";
  }
  // brktRef.update(updatedUserData, function(error) {
  //   if (error) {
  //     console.log("Error updating data:", error);
  //   }
  // });

  //pointless return state is updated though the database and then the function above
  return updatedUserData;
}

export const determineWinner = (match, brktKey) => {
  let winner;

  const updatedUserData = {};
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

  match.winner = match[`${winner}Name`];
  const winnerId = match[`${winner}seed`];

  if (match.goesTo) {
    const winningPlayer =
      match[`goesToPos`] === "upper" ? "player1" : "player2";

    updatedUserData[
      `tests/${brktKey}/brktInfo/matches/match${
        match["goesTo"]
      }/${winningPlayer}Name`
    ] = match[`${winner}Name`];

    updatedUserData[
      `tests/${brktKey}/brktInfo/matches/match${
        match["goesTo"]
      }/${winningPlayer}seed`
    ] = winnerId;
  }

  // brktRef.update(updatedUserData, function(error) {
  //   if (error) {
  //     console.log("Error updating data:", error);
  //   }
  // });

  //pointless return state is updated though the database and then the function above
  return updatedUserData;
};
