const vars = require("./variables.json");

exports.Timestamper = class {
    constructor(tssettings = {}) {
        this.settings = tssettings
    }
    parseTimestamp(timestamp, timestampSchematic, tssettings = this.settings) {
        var now = new Date()
        if (timestamp._isAMomentObject) {
            var timestampMoment = timestamp
            timestamp = timestamp._d
        }
        vars.forEach(v => {
          if (timestampSchematic.includes(`%${v.selector}`)) {
            timestampSchematic = timestampSchematic.split(`%${v.selector}`).join(eval(v.eval))
          }
        })
        return timestampSchematic
    }
}
