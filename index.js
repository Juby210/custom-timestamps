
/*
--------------------------------
BY VIEWING THIS CODE, YOU ARE AGREEING TO THE "MY CODE MAY NOT BE THE MOST EFFICIENT SOLUTION" TERMS.
I AM NOT RESPONSIBLE FOR LOSS OF BRAINCELLS FROM THE VIEWING OF THIS FILE.
--------------------------------
*/
const { Plugin } = require("powercord/entities");
const { findInReactTree } = require("powercord/util");
const { inject, uninject } = require("powercord/injector");
const { getModule } = require("powercord/webpack");

const Settings = require("./Settings");
const vars = require("./variables.json");

module.exports = class CustomTimestamps extends Plugin {
  startPlugin() {
    powercord.api.settings.registerSettings("custom-timestamps", {
      category: this.entityID,
      label: "Custom Timestamps",
      render: Settings,
    });
    this.initInject()
  }
  async initInject() {
    const timestampModule = await getModule(["MessageTimestamp"])
    inject(
      "message-timestamper",
      timestampModule,
      "MessageTimestamp",
      (args, res) => {
        const timestampParsed = this.parseTimestamp(args[0].timestamp._d)
        const { children } = res.props.children.props
        res.props.children.props.children = e => {
          const r = children(e)
          r.props["aria-label"] = timestampParsed
          r.props.children = timestampParsed
          r.props.style = { color: this.settings.get("timestampColor", "var(--text-muted)") }
          return r
        }
        return res
      }
    )
    timestampModule.MessageTimestamp.displayName = "MessageTimestamp"
    inject(
      "message-timestamper2",
      timestampModule,
      "default",
      (_, res) => {
        const timestamp = findInReactTree(res, e => e && e.type && e.type.displayName == "MessageTimestamp")
        if (timestamp) timestamp.type = timestampModule.MessageTimestamp
        return res
      }
    )
  }
  pluginWillUnload() {
    powercord.api.settings.unregisterSettings("custom-timestamps");
    uninject("message-timestamper")
    uninject("message-timestamper2")
  }

  parseTimestamp(timestamp) {
    let parsed = this.settings.get("timestampSchematic", "%Y-%0M-%0D %0H:%0m:%0s %AM")
    vars.forEach(v => parsed = parsed.replace(`%${v.selector}`, eval(v.eval)))
    return parsed
  }
};
