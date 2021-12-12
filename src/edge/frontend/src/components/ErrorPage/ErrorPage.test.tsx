import * as React from "react";
import * as ReactDOM from "react-dom";
import { FetchError } from "../../apis/FetchError";
import { ErrorPage } from "./ErrorPage";

describe("Error Page", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <ErrorPage error={new FetchError("", new Response())} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
