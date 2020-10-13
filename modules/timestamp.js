const vars = require("./variables.js").variables;

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
            timestampSchematic = timestampSchematic.split(`%${v.selector}`).join(v.func(timestamp, timestampMoment))
          }
        })
        return timestampSchematic
    }
}
