import React from "react";
import "./styles.css";
import revalidator from "revalidator";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { user: "", email: "" };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submit = e => {
    const valid = revalidator.validate(this.state, {
      properties: {
        user: {
          description:
            "a means of protecting data (insufficient for production, used as example)",
          type: "string",
          minLength: 5,
          allowEmpty: false
        },
        email: {
          description:
            "a means of protecting data (insufficient for production, used as example)",
          type: "string",
          pattern: "^/[^#%&*{}\\:<>?/+]+$",
          allowEmpty: false
        }
      }
    });
    console.log(valid);
    const messages = valid.errors.reduce((errors, error) => {
      if (errors[error.property]) {
        errors[error.property].push(error.message);
      } else {
        errors[error.property] = [error.message];
      }
      return errors;
    }, {});

    console.log(messages);
  };
  render() {
    const { user, email } = this.state;

    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <input type="text" name="user" value={user} onChange={this.onChange} />
        <input
          type="text"
          name="email"
          value={email}
          onChange={this.onChange}
        />
        <button type="button" onClick={this.submit}>
          Check
        </button>
      </div>
    );
  }
}
