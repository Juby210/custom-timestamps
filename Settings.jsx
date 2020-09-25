const { React, getModuleByDisplayName } = require("powercord/webpack");
const { Category, TextInput } = require("powercord/components/settings");
const FormItem = getModuleByDisplayName("FormItem", false)
const FormText = getModuleByDisplayName("FormText", false)

const vars = require("./variables.json")

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
        <Category name="Variables" opened={this.state.category} onChange={() => this.setState({ category: !this.state.category })}>
          {vars.map(v => <FormItem style={{ marginBottom: "10px" }} title={`%${v.selector}`}><FormText>{v.desc}</FormText></FormItem>)}
        </Category>
      </div>
    );
  }
};
