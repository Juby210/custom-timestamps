/* Copyright (C) 2020 TaiAurori (Gabriel Sylvain) - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the MIT license.
 * Basically, you can change and redistribute this code
 * but this copyright notice must remain unmodified.
 */
const { Plugin } = require("powercord/entities");
const { findInReactTree } = require("powercord/util");
const { inject, uninject } = require("powercord/injector");
const { getModule, getModuleByDisplayName } = require("powercord/webpack");
const tsmod = require("./modules/taistamps.js");
var moment;
var ts = new tsmod.Timestamper();
const dynamicdates = [
  {
    name: "Today",
    func: function(timestamp, moment) {return moment().seconds(0).minutes(0).hours(0) < timestamp}
  },
  {
    name: "Yesterday",
    func: function(timestamp, moment) {return moment().subtract(1, "day").seconds(0).minutes(0).hours(0) < timestamp}
  },
  {
    name: "This Week",
    func: function(timestamp, moment) {return moment().day(0).seconds(0).minutes(0).hours(0) < timestamp}
  },
  {
    name: "Last Week",
    func: function(timestamp, moment) {return moment().subtract(1, "week").day(0).seconds(0).minutes(0).hours(0) < timestamp}
  },
  {
    name: "This Month",
    func: function(timestamp, moment) {return moment().date(1).seconds(0).minutes(0).hours(0) < timestamp}
  },
  {
    name: "Last Month",
    func: function(timestamp, moment) {return moment().subtract(1, "month").date(1).seconds(0).minutes(0).hours(0) < timestamp}
  },
  {
    name: "This Year",
    func: function(timestamp, moment) {return moment().month(0).date(1).seconds(0).minutes(0).hours(0) < timestamp}
  },
  {
    name: "Ancient",
    func: function(timestamp, moment) {return moment().month(0).date(1).seconds(0).minutes(0).hours(0) > timestamp}
  }
]

const Settings = require("./Settings");

module.exports = class CustomTimestamps extends Plugin {
  startPlugin() {
    powercord.api.settings.registerSettings("custom-timestamps", {
      category: this.entityID,
      label: "Custom Timestamps",
      render: Settings,
    });
    this.initInject();
  }

  async initInject() {
    moment = await getModule(["parseZone"])
    ts.moment = moment
    const timestampModule = await getModule(["MessageTimestamp"]);
    inject(
      "message-timestamper",
      timestampModule,
      "MessageTimestamp",
      (args, res) => {
        var timestampParsed;
        try {
          var timestampParsed = this.parseTimestamp(args[0].timestamp)
          res.props.children.props.text = this.parseTimestamp(args[0].timestamp, true);
          const { children } = res.props.children.props;
          res.props.children.props.children = e => {
            const r = children(e);
            r.props["aria-label"] = timestampParsed;
            r.props.children = timestampParsed;
            //r.props.style = { color: this.settings.get("timestampColor", "var(--text-muted)") };
            return r;
          }
          return res;
        } catch (err) {
          this.error("yay, something broke.\n", err)
          return res
        }
      }
    );
    timestampModule.MessageTimestamp.displayName = "MessageTimestamp";
    inject(
      "message-timestamper2",
      timestampModule,
      "default",
      (_, res) => {
        try {
          const timestamp = findInReactTree(res, e => e && e.type && e.type.displayName == "MessageTimestamp");
          if (timestamp) timestamp.type = timestampModule.MessageTimestamp;
          return res;
        } catch (err) {
          this.error("yay, something broke.\n", err)
          return res
        }
      }
    );
      //TODO: implement bubbles and message timestamps on welcome to server messages and grouped messages
//     inject("temp", Message, "default", (args, res) => {
//       if (res.props.children[0].props.children[1].props.compact) {
//         var ts = res.props.children[0].props.children[1].props.timestamp
//         res.props.children[0].props.children[1] = wp.React.createElement("span", {class: "latin24CompactTimeStamp-2V7XIQ timestamp-3ZCmNB timestampVisibleOnHover-2bQeI4 alt-1uNpEt"},wp.React.createElement("span", null, "Eggs!"));
//         res.props.children[0].props.children[1].props.timestamp = ts
//       }
//       return res
//     })
  }

  parseTimestamp(timestamp, bubble=false) {
    try {
      if (!timestamp["add"]) timestamp = moment(timestamp)
      if (!bubble) {
        if (this.settings.get("dynamicTimestamps", false)) {
          var foundtimestamp = false;
          var timestampParsed;
          dynamicdates.forEach(element => {
            if (!foundtimestamp) {
              if (element.func(timestamp, moment)) {
                timestampParsed = ts.parseTimestamp(timestamp, this.settings.get("timestampDynamic" + element.name.split(" ").join(""), "%Y-%0M-%0D %0h:%0m:%0s %AM"));
                foundtimestamp = true
              }
            }
          });
          timestampParsed = foundtimestamp ? timestampParsed : "Something's wrong, I can feel it"
        } else {
          var timestampParsed = ts.parseTimestamp(timestamp, this.settings.get("timestampSchematic", "%Y-%0M-%0D %0h:%0m:%0s %AM"));
        }
      } else {
        var timestampParsed = ts.parseTimestamp(timestamp, this.settings.get("timestampBubbleSchematic", "%W, %N %D, %Y %h:%0m %AM"));
      }
      return timestampParsed
    } catch(err) {
      console.error("Timestamp parsing error: ",err)
      return "[timestamp parsing error]"
    }
  }

  pluginWillUnload() {
    powercord.api.settings.unregisterSettings("custom-timestamps");
    uninject("message-timestamper");
    uninject("message-timestamper2");
  };
};
