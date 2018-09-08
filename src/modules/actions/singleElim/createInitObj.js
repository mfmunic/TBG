//-------------------------------------------------------------------------------
//This will take the seed number and create an init object
//-------------------------------------------------------------------------------

const createBox = require('./createBox');
const getHeatsInfo = require('./getHeatsInfo');

module.exports = function createInitObj(seeds) {
  // main is the number of players for the first full heat
  let main = 0;
  //extra is the number of matches in the extra pre-heat
  let extra = 0;
  let heatsTotal = 0;
  //determine the number of heats (columns)
  for (let i = 1; i <= seeds; i *= 2) {
    if (i * 2 <= seeds) {
      main = i * 2;
      heatsTotal++;
    } else {
      extra = seeds - main;
    }
  }
  if (extra > 0) {
    heatsTotal++;
  }
  let initObj = {
    total: seeds,
    main,
    extra,
    heatsTotal,
    matchesTotal: seeds - 1
  };

  initObj.heats = getHeatsInfo(initObj);
  initObj.box = createBox(initObj);

  return initObj;
};
