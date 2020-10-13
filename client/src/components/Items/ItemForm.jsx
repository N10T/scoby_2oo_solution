import React, { Component } from "react";
import AutoComplete from "../AutoComplete";
import UploadWidget from "../UploadWidget";
import Button from "../Button";
import Message from "../Message";
import UserContext from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import { buildFormData } from "../../utils";
import "../../styles/ItemForm.css";
import FeedBack from "../FeedBack";

class ItemForm extends Component {
  static contextType = UserContext;
  state = {
    name: "",
    category: "",
    quantity: "",
    address: "",
    description: "",
    httpResponse: null,
    error: null,
  };

  formRef = React.createRef();

  handleChange = (event) => {
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    // Handle some validation here.

    // eg:
    if (!this.state.category) {
      this.setState({ error: "No category selected !" }, () => {
        this.timeoutId = setTimeout(() => {
          this.setState({ error: null });
        }, 1000);
      });
      return;
    }

    const fd = new FormData();
    const { httpResponse, ...data } = this.state;
    buildFormData(fd, data); // You can find this function in ./src/utils.js
    // Function implemented by user Raj Pawam Gumdal @stackoverflow : ) => https://stackoverflow.com/a/42241875/13374041

    apiHandler
      .addItem(fd)
      .then((data) => {
        //clear form
        this.formRef.current.reset();
        this.props.addItem(data);
        this.setState({
          httpResponse: {
            status: "success",
            message: "Item successfully added.",
          },
        });
        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 1000);
      })
      .catch((error) => {
        this.setState({
          httpResponse: {
            status: "failure",
            message: "An error occured, try again later.",
          },
        });
        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 1000);
      });
  };

  handleFileSelect = ({ tmpUrl, file }) => {
    this.setState({ image: file });
  };

  handlePlace = (place) => {
    const location = place.geometry;
    location.formattedAddress = place.place_name;
    this.setState({ location });
  };

  render() {
    const { httpResponse, error } = this.state;
    return (
      <div className="ItemForm-container">
        <form
          ref={this.formRef}
          className="ItemForm"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <p onClick={this.props.handleClose} className="close-link">
            X
          </p>
          <h2>Add Item</h2>
          {httpResponse && (
            <FeedBack
              message={httpResponse.message}
              status={httpResponse.status}
            />
          )}
          <div className="form-group">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              className="input"
              type="text"
              placeholder="What are you giving away ?"
              name="name"
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="category">
              Category
            </label>
            <select name="category" id="category" defaultValue="-1">
              <option value="-1" disabled>
                Select a category
              </option>
              <option value="Plant">Plant</option>
              <option value="Kombucha">Kombucha</option>
              <option value="Vinegar">Vinegar</option>
              <option value="Kefir">Kefir</option>
            </select>
          </div>
          <div className="form-group">
            <label className="label" htmlFor="name">
              Quantity
            </label>
            <input className="input" type="number" name="quantity" />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="location">
              Address
            </label>
            <AutoComplete onSelect={this.handlePlace} />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              className="text-area"
              placeholder="Tell us something about this item"
            ></textarea>
          </div>

          <div className="form-group">
            <UploadWidget onFileSelect={this.handleFileSelect} name="image">
              Upload image
            </UploadWidget>
          </div>

          <h2>Contact information</h2>

          <div className="form-group">
            <label className="label" htmlFor="contact">
              How do you want to be reached?
            </label>
            <div>
              <input
                type="radio"
                name="contact"
                value={this.context.user.email}
              />
              {this.context.user.email}
            </div>
            {this.context.user.phoneNumber && (
              <div>
                <input
                  type="radio"
                  name="contact"
                  value={this.context.user.phoneNumber}
                />
                {this.context.user.phoneNumber}
              </div>
            )}
          </div>

          <Message info icon="info">
            Want to be contacted by phone? Add your phone number in your
            personal page.
          </Message>
          {error && <FeedBack message={error} status="failure" />}
          <Button primary>Add Item</Button>
        </form>
      </div>
    );
  }
}

export default ItemForm;
