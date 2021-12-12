import * as React from "react";
import * as ReactDOM from "react-dom";
import { CreateUser } from "./CreateUser";

describe("Sidebar", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<CreateUser />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
