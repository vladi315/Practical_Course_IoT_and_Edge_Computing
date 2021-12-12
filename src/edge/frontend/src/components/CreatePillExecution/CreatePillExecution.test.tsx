import * as React from "react";
import * as ReactDOM from "react-dom";
import { CreatePillExecution } from "./CreatePillExecution";

describe("Sidebar", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<CreatePillExecution />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
