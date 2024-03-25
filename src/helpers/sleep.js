const config = require("../config");

const minDelay = config.MESSAGE_DELAY_MIN_MS;
const maxDelay = config.MESSAGE_DELAY_MAX_MS;
const delayTimeMs = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


module.exports = { sleep, delayTimeMs };
