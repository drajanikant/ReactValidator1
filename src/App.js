import React from "react";
import "./styles.css";
import revalidator from "revalidator";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { user: "" };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submit = e => {
    console.log(
      revalidator.validate(this.state, {
        properties: {
          url: {
            description: "the url the object should be stored at",
            type: "string",
            pattern: "^/[^#%&*{}\\:<>?/+]+$",
            required: true
          },
          user: {
            description:
              "a means of protecting data (insufficient for production, used as example)",
            type: "string",
            minLength: 5
          },
          body: {
            description: "what to store at the url",
            type: "any",
            default: null
          }
        }
      })
    );
  };
  render() {
    const { user } = this.state;

    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <input type="text" name="user" value={user} onChange={this.onChange} />

        <button type="button" onClick={this.submit}>
          Check
        </button>
      </div>
    );
  }
}
