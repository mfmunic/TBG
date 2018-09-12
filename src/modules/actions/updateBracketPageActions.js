// import _ from 'lodash';

import { updatePlayers } from "./utils/updatePlayers";
import * as actionTypes from "../actionTypes";
import { brktRef } from "../../config/firebase";

export function updateBrkt(brkt, key) {
  return {
    type: actionTypes.UPDATE_BRKT,
    payload: { brkt, key }
  };
}

export function updatePoints(
  match,
  matchNo,
  playerNo,
  points,
  players,
  brktKey
) {
  match[`player${playerNo}Points`] = +points;

  if (match[`player1Points`] && match[`player2Points`]) {
    let winningPlayerName = "";
    let winningPlayerSeed = "";
    const winnerCheck = match[`player1Points`] - match[`player2Points`];

    if (winnerCheck > 0) {
      winningPlayerName = match.player1Name;
      winningPlayerSeed = match.player1seed;
      match[`winner`] = winningPlayerName;
    } else if (winnerCheck < 0) {
      winningPlayerName = match.player2Name;
      winningPlayerSeed = match.player2seed;
      match[`winner`] = winningPlayerName;
    } else if (winnerCheck === 0) {
      if (match.player1seed < match.player2seed) {
        winningPlayerName = match.player1Name;
        winningPlayerSeed = match.player1seed;
        match[`winner`] = winningPlayerName;
      } else {
        winningPlayerName = match.player2Name;
        winningPlayerSeed = match.player2seed;
        match[`winner`] = winningPlayerName;
      }
    }

    players = updatePlayers(
      match,
      matchNo,
      playerNo,
      points,
      players,
      winningPlayerName
    );

    console.log(players);
    if (match.goesTo) {
      const winningPlayerPosition =
        match[`goesToPos`] === "upper" ? "player1Name" : "player2Name";

      const winningSeedPosition =
        match[`goesToPos`] === "upper" ? "player1seed" : "player2seed";

      const updatedUserData = {};

      updatedUserData[
        `tests/${brktKey}/brktInfo/matches/match${
          match["goesTo"]
        }/${winningPlayerPosition}`
      ] = winningPlayerName;

      updatedUserData[
        `tests/${brktKey}/brktInfo/matches/match${
          match["goesTo"]
        }/${winningSeedPosition}`
      ] = winningPlayerSeed;

      updatedUserData[`tests/${brktKey}/playerNames`] = players;

      brktRef.update(updatedUserData, function(error) {
        if (error) {
          console.log("Error updating data:", error);
        }
      });

      // brktRef
      //   .child(`tests/${brktKey}/brktInfo/matches/match${match["goesTo"]}`)
      //   .update({ [`${winningPlayerPosition}`]: winningPlayerName });
    } else if (!match.goesTo) {
      console.log("Make a Function for this", match.winner);
    }
  }

  brktRef
    .child("tests")
    .child(brktKey)
    .child("brktInfo")
    .child("matches")
    .child(`match${matchNo}`)
    .set(match);

  //pointless return state is updated though the database and then the function above
  return {
    type: actionTypes.UPDATE_POINTS,
    payload: { matchNo, playerNo, points, brktKey }
  };
}
