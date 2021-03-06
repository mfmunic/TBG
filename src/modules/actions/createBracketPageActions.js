import _ from "lodash";

import * as actionTypes from "../actionTypes";
import getBrktInfo from "./singleElim/getBrktInfo.js";
import addNames from "./singleElim/addNames.js";
import setBrkts from "./firebase/setBrkts";
import { tArr, bArr, gArr } from "./utils/titleWords.js";
import { initialEditables } from "./utils/initEditables";

export function randomTorName() {
  let tWord = tArr[_.random(0, tArr.length - 1)];
  tWord = tWord.charAt(0).toUpperCase() + tWord.slice(1);
  let bWord = bArr[_.random(0, bArr.length - 1)];
  bWord = bWord.charAt(0).toUpperCase() + bWord.slice(1);
  let gWord = gArr[_.random(0, gArr.length - 1)];
  gWord = gWord.charAt(0).toUpperCase() + gWord.slice(1);
  return {
    type: actionTypes.UPDATE_TOR_NAME,
    payload: `${tWord} ${bWord} ${gWord}`
  };
}

export function updateTorName(brktName) {
  return {
    type: actionTypes.UPDATE_TOR_NAME,
    payload: brktName
  };
}

export function resetState() {
  return {
    type: actionTypes.RESET_CREATE_STATE
  };
}

export function updateNoOfPlayers(noOfPlayers, playerNames) {
  let brktInfo = getBrktInfo(noOfPlayers);

  playerNames = _.map(playerNames, (name, index) => {
    if (name.includes("<<Player ") || name === "") {
      name = `<<Player ${index + 1}>>`;
    }
    return name;
  });

  if (noOfPlayers < playerNames.length) {
    const removePlayers = playerNames.length - noOfPlayers;
    for (let i = 0; i < removePlayers; i++) {
      playerNames.pop();
    }
  } else {
    for (let i = playerNames.length; i < noOfPlayers; i++) {
      playerNames.push(`<<Player ${i + 1}>>`);
    }
  }

  brktInfo = addNames(brktInfo, playerNames);

  return {
    type: actionTypes.UPDATE_NOOFPLAYERS,
    payload: { noOfPlayers, brktInfo, playerNames }
  };
}

export function updatePlayerNames(players) {
  let arrPlayers = [];

  if (players !== "") {
    arrPlayers = players.split("\n");
  }

  _.forEach(arrPlayers, player => {
    player.trim();
  });

  let brktInfo = getBrktInfo(arrPlayers.length);
  brktInfo = addNames(brktInfo, arrPlayers);

  return {
    type: actionTypes.UPDATE_PLAYERNAMES,
    payload: { arrPlayers, brktInfo }
  };
}

export function switchInput(inputType, noOfPlayers, playerNames) {
  if (inputType === "Number") {
    inputType = "Names";

    playerNames = _.map(playerNames, (name, index) => {
      if (name.includes("<<Player ") || name === "") {
        name = `<<Player ${index + 1}>>`;
      }
      return name;
    });

    if (noOfPlayers < playerNames.length) {
      const removePlayers = playerNames.length - noOfPlayers;
      for (let i = 0; i < removePlayers; i++) {
        playerNames.pop();
      }
    } else {
      for (let i = playerNames.length; i < noOfPlayers; i++) {
        playerNames.push(`<<Player ${i + 1}>>`);
      }
    }
  } else {
    inputType = "Number";
  }
  return {
    type: actionTypes.SWITCH_INPUT_TYPE,
    payload: { inputType, noOfPlayers, playerNames }
  };
}

//firbase specific

export function addBrkt(newBrkt, brktName, playerNames) {
  initialEditables(newBrkt);
  const newRecord = [];
  for (let i = 0; i < newBrkt.heatsTotal; i++) {
    newRecord.push(0);
  }
  const playerNamesObject = _.map(playerNames, (name, index) => {
    return {
      name: name,
      seed: index + 1,
      position: index + 1,
      wins: 0,
      winRecord: newRecord,
      losses: 0,
      lossRecord: newRecord,
      pts: 0,
      ptsRecord: newRecord
    };
  });
  const brkt = { brktInfo: newBrkt, brktName, playerNames: playerNamesObject };

  setBrkts(brkt);
  return {
    type: actionTypes.PUBLISHED_BRKT,
    payload: brkt
  };
}
