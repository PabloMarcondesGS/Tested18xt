import React, { Component } from "react";
import { object, func } from "prop-types";
import "react-dropdown/style.css";

export class ContactForm extends Component {
  static propTypes = {
    //onChange: func.isRequired,
    onSubmit: func.isRequired,    
    data: object.isRequired,
    
  };

  static defaultProps = {
    data: {
      name: "Pablo",
      email: "teste@teste.com",
      option: "",
      select: "",
      message: "",
      terms: false,
    },
  };

  constructor(props) {
    super(props);
  }

  /**
   * When form is submitted forward contact data to parent
   * @param {event} DOMEvent
   */

  //  handleSubmit(event) {
  //     alert('Um nome foi enviado: ' + this.state.value);
  //     event.preventDefault();
  //   }

  fieldChange(event) {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
  }

  isSelected(key, option) {
    return this.props.data[key] === option;
  }

  render() {
    let data = this.props.data;

    return (
      <form onChange={this.props.onChange} onSubmit={this.props.onSubmit} onKeyDown={this.props.onKeyDown}>
        <h3>Contact Form</h3>

        <div className="form-group">
          <label className="form-label">Your Name:</label>
          <input
          required={true}
            placeholder="Full name"
            name="name"
            defaultValue={data.name}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Your Best Email:</label>
          <input
            required={true}
            type="email"
            placeholder="Full name"
            name="email"
            defaultValue={data.email}
            className="form-control"
          />
        </div>

        <label className="form-label">Select your membership option:</label>
        <div className="form-group row">
          <label className="form-label col-xs-4">
            <input
              defaultChecked={data.option === "A"}
              type="radio"
              name="option"
              value="A"
            />{" "}
            Option A
          </label>
          <label className="form-label col-xs-4">
            <input
              defaultChecked={data.option === "B"}
              type="radio"
              name="option"
              value="B"
            />{" "}
            Option B
          </label>
          <label className="form-label col-xs-4">
            <input
              defaultChecked={data.option === "C"}
              type="radio"
              name="option"
              value="C"
            />{" "}
            Option C
          </label>
        </div>
        <hr />
        <div className="form-group">
          <label className="form-label">What can we help you with:</label>
          <select
            defaultValue={data.select}
            className="form-control"
            name="select"
          >
            <option value="1">I have question about my membership</option>
            <option value="2">I have technical question</option>
            <option value="3">I would like to change membership</option>
            <option value="4">Other question</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Message:</label>
          <textarea
            defaultValue={data.message}
            name="message"
            rows="10"
            placeholder="Please type your question here"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            {" "}
            <input type="checkbox" name="terms" /> I agree to terms and
            conditions{" "}
          </label>
        </div>

        <input type="submit" value="Send" className="contactform-submit" />
      </form>
    );
  }
}
