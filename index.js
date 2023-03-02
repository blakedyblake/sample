const GatherInfo = require("./functions/GatherInfo");
const Synthesize = require("./functions/Synthesize");

GatherInfo()
setTimeout(()=>Synthesize(), 5000) //? Needs a time out or it will run before the Active Dresses are finished
