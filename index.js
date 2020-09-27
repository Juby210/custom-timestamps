
/*
--------------------------------
BY VIEWING THIS CODE, YOU ARE AGREEING TO THE "MY CODE MAY NOT BE THE MOST EFFICIENT SOLUTION" TERMS.
I AM NOT RESPONSIBLE FOR LOSS OF BRAINCELLS FROM THE VIEWING OF THIS FILE.
--------------------------------
*/
const { Plugin } = require("powercord/entities");
const Settings = require("./Settings.jsx");
const { findInReactTree, waitFor, getOwnerInstance } = require("powercord/util");
const { inject, uninject } = require("powercord/injector");
const { React, FluxDispatcher, getModule, messages: MessageEvents, channels: { getChannelId } } = require('powercord/webpack');
const { parseTimestamp } = require("./timestamp.js")
var timestampSchematic;

module.exports = class CustomTimestamps extends Plugin {
  startPlugin() {
    timestampSchematic = this.settings.get("timestampSchematic", "%Y-%0M-%0D %0H:%0m:%0s %AM");
    powercord.api.settings.registerSettings("custom-timestamps", {
      category: this.entityID,
      label: "Custom Timestamps",
      render: Settings,
    });
    this.initInject()
  }
  async initInject() {
    var timestampModule = await getModule(["MessageTimestamp"]);
    inject(
      "message-timestamper",
      timestampModule,
      "default",
      (_, res) => {
        // is this right? i'm not too keen on getting the setting change this way
        timestampSchematic = this.settings.get("timestampSchematic", "%Y-%0M-%0D %0H:%0m:%0s %AM");
        this.timestampSchematic = timestampSchematic
        var timestampParsed = parseTimestamp(timestampSchematic, res.props.children[1].props.children[2].props.timestamp._d)
        var origTimestamp = res.props.children[1].props.children[2].props.timestamp
        res.props.children[1].props.children[2] = React.createElement("span", {style: {color: this.settings.get("timestampColor", "var(--text-muted)"), fontSize:"0.75em"}}, timestampParsed)
        res.props.children[1].props.children[2].__customtimestamps = timestampSchematic
        res.props.children[1].props.children[2].props.timestamp = origTimestamp
        return res
      }
    )
  }
  pluginWillUnload() {
    powercord.api.settings.unregisterSettings("custom-timestamps");
    uninject("message-timestamper")
  }
};
