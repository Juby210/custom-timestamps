const vars = require("./variables.json");
exports.parseTimestamp = (timestamp, timestampSchematic) => {
    vars.forEach(v => {
      if (timestampSchematic.includes(`%${v.selector}`)) {
        timestampSchematic = timestampSchematic.replace(`%${v.selector}`, eval(v.eval))
      }
    })
    return timestampSchematic
}
