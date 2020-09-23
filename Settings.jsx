const { React } = require("powercord/webpack");
const {
  SwitchItem,
  TextInput,
  ButtonItem,
} = require("powercord/components/settings");
const { Button } = require("powercord/components");

module.exports = class Settings extends React.Component {
  render() {
    const { getSetting, toggleSetting, updateSetting } = this.props;

    return (
      <div>
        <TextInput
          note="Schematic that all replaced timestamps will follow.\n(reference time: 2020-09-23 7:06:54 PM)\n%Y = full year (e.g 2020)\n%M = month (e.g 9)\n%D = date (e.g 23)\n%H = hour (12 hour format) (e.g 7)\n%h = hour (24 hour format) (e.g 19)\n%m = minute (e.g 6)\n%s = second (e.g 54)\n%a = time ending in 12 hour formats, without the M (e.g p) (p.s You can use %am for the full ending)\n%A = same as last line, but capital (e.g P)\nValues that vary between one digit and two can be given a zero after the percent symbol to add a zero if there isn't one. (e.g %0M results in 09 instead of simply %M, which results in just 9)"
          defaultValue={getSetting("timestampSchematic", "%Y-%0M-%0D %0H:%0m:%0s %AM")}
          onChange={(val) =>
            updateSetting("timestampSchematic", val)
          }
        >
          Timestamp String
        </TextInput>
        <TextInput
          note="Color of the timestamp. Any CSS color is valid."
          defaultValue={getSetting("timestampColor", "var(--text-muted)")}
          onChange={(val) =>
            updateSetting("timestampColor", val)
          }
        >
          Timestamp String
        </TextInput>
      </div>
    );
  }
};
