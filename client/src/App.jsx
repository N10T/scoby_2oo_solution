import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./views/Home";
import Profile from "./views/Profile";
import About from "./views/About";
import Signup from "./views/Signup";
import Signin from "./views/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import FormProfile from "./components/Forms/FormProfile";

class App extends React.Component {
  state = {
    displayForm: false,
  };

  toggleFormDisplay = (event) => {
    this.setState({ displayForm: !this.state.displayForm });
  };

  handleClose = (event) => {
    this.setState({ displayForm: false });
  };

  render() {
    return (
      <div className="App">
        <NavMain toggleFormDisplay={this.toggleFormDisplay} />

        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Home
                {...props}
                displayForm={this.state.displayForm}
                handleFormClose={this.handleClose}
                items={this.state.items}
                onSelectItem={this.onSelectItem}
              />
            )}
          />
          <ProtectedRoute
            exact
            path="/profile"
            render={(props) => (
              <Profile
                {...props}
                displayForm={this.state.displayForm}
                handleFormClose={this.handleClose}
              />
            )}
          />
          <ProtectedRoute
            exact
            path="/profile/settings"
            component={FormProfile}
          />
          <Route exact path="/about" component={About} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
        </Switch>
      </div>
    );
  }
}

export default App;
