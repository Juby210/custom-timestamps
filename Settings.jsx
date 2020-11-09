const { React, getModuleByDisplayName } = require("powercord/webpack");
const { Category, TextInput, SwitchItem } = require("powercord/components/settings");
const FormItem = getModuleByDisplayName("FormItem", false);
const FormText = getModuleByDisplayName("FormText", false);

const dynamicdates = ["Today","Yesterday", "This Week", "Last Week", "This Month","Last Month","This Year","Ancient"]

const vars = require("./modules/variables.js").variables;

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
        <SwitchItem
          note="Change the timestamp schematic depending on how long ago the timestamp was."
          value={getSetting("dynamicTimestamps", false)}
          onChange={p=>{
            toggleSetting('dynamicTimestamps', false)
          }}
        >Dynamic Timestamps</SwitchItem> {/*disabled={!getSetting("dynamicTimestamps", false)}*/}
        <Category name="Dynamic Timestamps" opened={this.state.opened_dynamic} onChange={() => this.setState({ opened_dynamic: !this.state.opened_dynamic })}>
          {
          dynamicdates.map(element => {
            return <TextInput
              defaultValue={getSetting("timestampDynamic" + element.split(" ").join(""), "%Y-%0M-%0D %0h:%0m:%0s %AM")}
              onChange={(val) =>
                updateSetting("timestampDynamic" + element.split(" ").join(""), val)
              }
              disabled={!getSetting("dynamicTimestamps", false)}
            >
              {element}
            </TextInput>
          })}
        </Category>
        <Category name="Variables" opened={this.state.category} onChange={() => this.setState({ category: !this.state.category })}>
          {vars.map(v => <FormItem style={{ marginBottom: "10px" }} title=<span style={{textTransform: "none"}}>{`%${v.selector}`}</span>><FormText>{v.desc}</FormText></FormItem>)}
        </Category>
      </div>
    );
  }
};
