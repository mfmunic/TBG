// import _ from 'lodash';

import {
  updateWinner,
  updatePlayerPoints,
  updatePosition
} from "./utils/updatePlayers";
import * as actionTypes from "../actionTypes";
import { brktRef } from "../../config/firebase";
import * as actionTypes from "../actionTypes";

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

  const updatedPlayerPoints = updatePlayerPoints(
    match,
    playerNo,
    points,
    players
  );

  const updatedUserData = {};

  updatedUserData[
    `tests/${brktKey}/brktInfo/matches/match${matchNo}/player${playerNo}Points`
  ] = +points;

  updatedUserData[`tests/${brktKey}/playerNames`] = updatedPlayerPoints;

  brktRef.update(updatedUserData, function(error) {
    if (error) {
      console.log("Error updating data:", error);
    }
  });

  //pointless return state is updated though the database and then the function above
  return {
    type: actionTypes.UPDATE_POINTS,
    payload: { matchNo, playerNo, points, brktKey }
  };
}

export function winnerLoser(match, matchNo, players, seedsArr, brktKey) {
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

  players = updateWinner(match, matchNo, players, winningPlayerSeed);

  players = updatePosition(players, seedsArr, winningPlayerSeed);

  const updatedUserData = {};

  if (match.goesTo) {
    const winningPlayer =
      match[`goesToPos`] === "upper" ? "player1" : "player2";

    updatedUserData[
      `tests/${brktKey}/brktInfo/matches/match${
        match["goesTo"]
      }/${winningPlayer}Name`
    ] = winningPlayerName;

    updatedUserData[
      `tests/${brktKey}/brktInfo/matches/match${
        match["goesTo"]
      }/${winningPlayer}seed`
    ] = winningPlayerSeed;

    updatedUserData[
      `tests/${brktKey}/brktInfo/matches/match${
        match["goesTo"]
      }/${winningPlayer}Edit`
    ] = true;
  }

  if (match["player1GetFrom"]) {
    updatedUserData[
      `tests/${brktKey}/brktInfo/matches/match${
        match["player1GetFrom"]
      }/player1Edit`
    ] = false;
    updatedUserData[
      `tests/${brktKey}/brktInfo/matches/match${
        match["player1GetFrom"]
      }/player2Edit`
    ] = false;
  }

  if (match["player2GetFrom"]) {
    updatedUserData[
      `tests/${brktKey}/brktInfo/matches/match${
        match["player2GetFrom"]
      }/player1Edit`
    ] = false;
    updatedUserData[
      `tests/${brktKey}/brktInfo/matches/match${
        match["player2GetFrom"]
      }/player2Edit`
    ] = false;
  }

  updatedUserData[`tests/${brktKey}/playerNames`] = players;
  updatedUserData[
    `tests/${brktKey}/brktInfo/matches/match${matchNo}/winner`
  ] = winningPlayerName;

  brktRef.update(updatedUserData, function(error) {
    if (error) {
      console.log("Error updating data:", error);
    }
  });

  //pointless return state is updated though the database and then the function above
  return {
    type: actionTypes.UPDATE_POINTS,
    payload: "Winner"
  };
}

export function componentCleanup() {
  return {
    type: actionTypes.COMPONENT_CLEANUP,
    payload: {}
  };
}
