// import _ from 'lodash';

import * as actionTypes from "../actionTypes";
import { brktRef } from "../../config/firebase";

export function updateBrkt(brkt, key) {
  return {
    type: actionTypes.UPDATE_BRKT,
    payload: { brkt, key }
  };
}

export function updatePoints(match, matchNo, playerNo, points, brktKey) {
  match[`player${playerNo}Points`] = +points;

  let winningPlayerPosition = "";
  let winningPlayerName = "";
  if (match[`player1Points`] && match[`player2Points`]) {
    const winnerCheck = match[`player1Points`] - match[`player2Points`];
    if (winnerCheck > 0) {
      winningPlayerName = match[`player1Name`];
      match[`winner`] = winningPlayerName;
    } else if (winnerCheck < 0) {
      winningPlayerName = match[`player2Name`];
      match[`winner`] = winningPlayerName;
    }
    winningPlayerPosition =
      match[`goesToPos`] === "upper" ? "player1Name" : "player2Name";
    brktRef
      .child("tests")
      .child(brktKey)
      .child("brktInfo")
      .child("matches")
      .child(`match${match["goesTo"]}`)
      .child(winningPlayerPosition)
      .set(winningPlayerName, snapshot => console.log(snapshot));
  }

  brktRef
    .child("tests")
    .child(brktKey)
    .child("brktInfo")
    .child("matches")
    .child(`match${matchNo}`)
    .set(match, snapshot => console.log(snapshot));

  //pointless return state is updated though the database and then the function above
  return {
    type: actionTypes.UPDATE_POINTS,
    payload: { matchNo, playerNo, points, brktKey }
  };
}
