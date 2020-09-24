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
          note="Schematic that all replaced timestamps will follow."
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
