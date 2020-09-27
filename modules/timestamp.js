const vars = require("./variables.json");


exports.parseTimestamp = (timestamp, timestampSchematic) => {
    var now = new Date()
    vars.forEach(v => {
      if (timestampSchematic.includes(`%${v.selector}`)) {
        timestampSchematic = timestampSchematic.split(`%${v.selector}`).join(eval(v.eval))
      }
    })
    return timestampSchematic
}
