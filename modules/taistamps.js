/* Copyright (C) 2020 TaiAurori (Gabriel Sylvain) - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the MIT license.
 * Basically, you can change and redistribute this code
 * but this copyright notice must remain unmodified.
 */
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
