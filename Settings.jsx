const { React, getModuleByDisplayName } = require("powercord/webpack");
const { Category, TextInput } = require("powercord/components/settings");
const FormItem = getModuleByDisplayName("FormItem", false)
const FormText = getModuleByDisplayName("FormText", false)

const vars = require("./modules/variables.json")

module.exports = class Settings extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { getSetting, toggleSetting, updateSetting } = this.props;

    return (
      <div>
        <TextInput
          note="Schematic that all message timestamps will follow. (see variables below)"
          defaultValue={getSetting("timestampSchematic", "%Y-%0M-%0D %0h:%0m:%0s %AM")}
          onChange={(val) =>
            updateSetting("timestampSchematic", val)
          }
        >
          Timestamp Schematic
        </TextInput>
        <TextInput
          note="Schematic that message timestamp bubbles (when you hover over a timestamp) will follow."
          defaultValue={getSetting("timestampBubbleSchematic", "%W, %N %D, %Y %h:%0M %AM")}
          onChange={(val) =>
            updateSetting("timestampBubbleSchematic", val)
          }
        >
          Timestamp Bubble Schematic
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
        <Category name="Variables" opened={this.state.category} onChange={() => this.setState({ category: !this.state.category })}>
          {vars.map(v => <FormItem style={{ marginBottom: "10px" }} title=<span style={{textTransform: "none"}}>{`%${v.selector}`}</span>><FormText>{v.desc}</FormText></FormItem>)}
        </Category>
      </div>
    );
  }
};
