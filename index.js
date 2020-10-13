
/*
--------------------------------
BY VIEWING THIS CODE, YOU ARE AGREEING TO THE "MY CODE MAY NOT BE THE MOST EFFICIENT SOLUTION" TERMS.
I AM NOT RESPONSIBLE FOR LOSS OF BRAINCELLS FROM THE VIEWING OF THIS FILE.
OTHER CONTRIBUTIONS TO THIS CODE NOT MADE BY ME, THE AUTHOR, ARE NOT SUBJECT TO THESE TERMS.
--------------------------------
*/
const { Plugin } = require("powercord/entities");
const { findInReactTree } = require("powercord/util");
const { inject, uninject } = require("powercord/injector");
const { getModule, getModuleByDisplayName } = require("powercord/webpack");
const tsmod = require("./modules/timestamp.js");
var moment;
var ts = new tsmod.Timestamper();

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
        res.props.children.props.text = ts.parseTimestamp(args[0].timestamp, this.settings.get("timestampBubbleSchematic", "%W, %N %D, %Y %h:%0m %AM"));
        const timestampParsed = ts.parseTimestamp(args[0].timestamp, this.settings.get("timestampSchematic", "%Y-%0M-%0D %0h:%0m:%0s %AM"));
        const { children } = res.props.children.props;
        res.props.children.props.children = e => {
          const r = children(e);
          r.props["aria-label"] = timestampParsed;
          r.props.children = timestampParsed;
          r.props.style = { color: this.settings.get("timestampColor", "var(--text-muted)") };
          return r;
        }
        return res;
      }
    );
    timestampModule.MessageTimestamp.displayName = "MessageTimestamp";
    inject(
      "message-timestamper2",
      timestampModule,
      "default",
      (_, res) => {
        const timestamp = findInReactTree(res, e => e && e.type && e.type.displayName == "MessageTimestamp");
        if (timestamp) timestamp.type = timestampModule.MessageTimestamp;
        return res;
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
  pluginWillUnload() {
    powercord.api.settings.unregisterSettings("custom-timestamps");
    uninject("message-timestamper");
    uninject("message-timestamper2");
  };
};
