import _ from "lodash";

export const initialEditables = brkt => {
  _.forEach(brkt.matches, (match, index) => {
    index = index + 1;
    if (!match.player1GetFrom) {
      match.player1Edit = true;
    }
    if (!match.player2GetFrom) {
      match.player2Edit = true;
    }
    if (match.player1GetFrom) {
      match.player1Edit = false;
    }
    if (match.player2GetFrom) {
      match.player2Edit = false;
    }
    return match;
  });

  return brkt;
};
