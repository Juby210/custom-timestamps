
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
var timestampSchematic;

module.exports = class CustomTimestamps extends Plugin {
  startPlugin() {
    timestampSchematic = this.settings.get("timestampSchematic", "%Y-%0M-%0D %0H:%0m:%0s %AM");
    powercord.api.settings.registerSettings("custom-timestamps", {
      category: this.entityID,
      label: "Custom Timestamps",
      render: Settings,
    });
    this.parseTimestamp = (timestampString, timestampObject) => {
      // is this right? i'm not too keen on getting the setting change this way
      timestampSchematic = this.settings.get("timestampSchematic", "%Y-%0M-%0D %0H:%0m:%0s %AM");

      // dunno how good this solution is but whatevs
      var timestampFormats = [
        ["%0M", timestampObject.getMonth() + 1 < 10 ? "0" + (timestampObject.getMonth() + 1) : timestampObject.getMonth() + 1],
        ["%0D", timestampObject.getDate() < 10 ? "0" + timestampObject.getDate() : timestampObject.getDate()],
        ["%0h", timestampObject.getHours() < 10 ? "0" + timestampObject.getHours() : timestampObject.getHours()],
        ["%0H", (timestampObject.getHours() % 12 || 12) < 10 ? "0" + (timestampObject.getHours() % 12 || 12) : (timestampObject.getHours() % 12 || 12)],
        ["%0m", timestampObject.getMinutes() < 10 ? "0" + timestampObject.getMinutes() : timestampObject.getMinutes()],
        ["%0s", timestampObject.getSeconds() < 10 ? "0" + timestampObject.getSeconds() : timestampObject.getSeconds()],
        ["%Y", timestampObject.getFullYear()],
        ["%M", timestampObject.getMonth() + 1],
        ["%D", timestampObject.getDate()],
        ["%h", timestampObject.getHours()],
        ["%H", (timestampObject.getHours() % 12 || 12)],
        ["%A", timestampObject.getHours() < 12 ? "A" : "P"],
        ["%a", timestampObject.getHours() < 12 ? "a" : "p"],
        ["%m", timestampObject.getMinutes()],
        ["%s", timestampObject.getSeconds()],
      ]
      timestampFormats.forEach((fmt, i) => {
        timestampString = timestampString.replace(fmt[0], fmt[1])
      })
      return timestampString
    }

    this.initInject()
  }
  async initInject() {
    var timestampModule = await getModule(["MessageTimestamp"]);
    inject(
      "message-timestamper",
      timestampModule,
      "default",
      (_, res) => {
        var timestampParsed = this.parseTimestamp(timestampSchematic, res.props.children[1].props.children[2].props.timestamp._d)
        res.props.children[1].props.children[2] = React.createElement("span", {style: {color: this.settings.get("timestampColor", "var(--text-muted)"), fontSize:"0.75em"}}, timestampParsed)
        res.props.children[1].props.children[2].__customtimestamps = timestampSchematic
        return res
      }
    )
  }
  pluginWillUnload() {
    powercord.api.settings.unregisterSettings("custom-timestamps");
    uninject("message-timestamper")
  }
};
