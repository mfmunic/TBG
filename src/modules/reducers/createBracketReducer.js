import * as actionTypes from '../actionTypes';

const initialState = {
  brktName: '',
  noOfPlayers: 0,
  playerNames: [],
  inputSwitch: 'Number'
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.UPDATE_TOR_NAME:
      return {
        ...state,
        brktName: action.payload
      };

    case actionTypes.RESET_CREATE_STATE:
      return {
        ...state,
        ...initialState
      };

    case actionTypes.UPDATE_NOOFPLAYERS:
      return {
        ...state,
        noOfPlayers: action.payload.noOfPlayers,
        brktInfo: action.payload.brktInfo,
        playerNames: action.payload.playerNames
      };

    case actionTypes.UPDATE_PLAYERNAMES:
      const noOfPlayers = action.payload.arrPlayers.length;
      return {
        ...state,
        noOfPlayers: noOfPlayers,
        playerNames: action.payload.arrPlayers,
        brktInfo: action.payload.brktInfo
      };

    case actionTypes.SWITCH_INPUT_TYPE:
      return {
        ...state,
        inputSwitch: action.payload.inputType,
        noOfPlayers: action.payload.noOfPlayers,
        playerNames: action.payload.playerNames
      };

    default:
      return state;
  }
}
