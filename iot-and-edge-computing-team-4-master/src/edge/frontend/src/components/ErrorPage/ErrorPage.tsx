import React from "react";
import { FetchError } from "../../apis/FetchError";

interface State {
  errorMessage: string;
}

interface Properties {
  error: FetchError;
}

export class ErrorPage extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      errorMessage: ErrorPage.getMessage(this.props.error),
    };
  }

  static getMessage(error: FetchError): string {
    let code = error.getResponse().status;

    switch (code) {
      case 401:
        return "401: You are not authorized.";
      case 403:
        return "403: you do not have access permissions.";
      case 404:
        return "404: Resource not found.";
      case 500:
        return "500: Server error.";
      case 300:
        return "300: Fetch error.";
    }
    return "Unknown error.";
  }

  public render() {
    return <h2>{this.state.errorMessage}</h2>;
  }
}
