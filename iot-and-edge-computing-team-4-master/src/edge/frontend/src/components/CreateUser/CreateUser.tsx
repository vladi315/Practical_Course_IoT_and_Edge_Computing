import React from "react";
import {
  InoInput,
  InoDatepicker,
  InoButton,
  InoSelect,
  InoOption,
  InoSnackbar,
} from "@inovex.de/elements-react";
import "./CreateUser.css";
import { setUser } from "./connectCreateUser";

interface State {
  name: string;
  age: string;
  date: string;
  location: string;
  showNotification: boolean;
  message: string;
  isError: boolean;
  blocked: boolean;
}

export class CreateUser extends React.PureComponent<{}, State> {
  public constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      age: "",
      date: "",
      location: "1",
      showNotification: false,
      message: "",
      isError: false,
      blocked: false,
    };
  }

  createUser = async () => {
    let res = await setUser(
      this.state.name,
      this.state.date,
      this.state.age,
      this.state.location
    );
    if (res.error) {
      this.setState({
        showNotification: true,
        isError: true,
        message: "Error: Server responses with an Error when created an User.",
        blocked: true,
      });
    } else {
      this.setState({
        showNotification: true,
        isError: false,
        message: "User created!",
        blocked: true,
      });
    }
  };

  setDown = () => {
    this.setState({
      showNotification: false,
      isError: false,
      message: "",
      blocked: false,
    });
  };

  public render() {
    return (
      <div className="main">
        <InoInput
          placeholder="Full Name"
          value={this.state.name}
          onValueChange={(e) => this.setState({ name: e.detail })}
        />
        <br />
        <InoInput
          placeholder="Age"
          value={this.state.age}
          onValueChange={(e) => this.setState({ age: e.detail })}
        />
        <br />
        <InoDatepicker
          inoLabel="Leaving Date"
          value={this.state.date}
          inoDateFormat="Y-d-m"
          onValueChange={(e) => this.setState({ date: e.detail })}
          inoType="date"
        />
        <br />
        <InoSelect
          value={this.state.location}
          onValueChange={(e) => this.setState({ location: e.detail })}
        >
          <InoOption value="1">Machine 1</InoOption>
          <InoOption value="2">Machine 2</InoOption>
        </InoSelect>
        <br />
        <InoButton disabled={this.state.blocked} onClick={this.createUser}>
          Create Patient
        </InoButton>
        {this.state.showNotification && this.state.isError && (
          <InoSnackbar
            key="1"
            id="snackbar"
            inoType="error"
            inoMessage={this.state.message}
            onHideEl={(e) => this.setDown()}
            inoTimeout={5000}
          />
        )}
        {this.state.showNotification && !this.state.isError && (
          <InoSnackbar
            key="2"
            id="snackbar"
            inoType="primary"
            inoMessage={this.state.message}
            onHideEl={(e) => this.setDown()}
            inoTimeout={5000}
          />
        )}
      </div>
    );
  }
}
