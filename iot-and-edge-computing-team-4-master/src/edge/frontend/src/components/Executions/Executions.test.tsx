import * as React from "react";
import * as ReactDOM from "react-dom";
import { Executions } from "./Executions";

describe("Sidebar", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Executions />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
