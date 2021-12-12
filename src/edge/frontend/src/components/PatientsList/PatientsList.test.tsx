import * as React from "react";
import * as ReactDOM from "react-dom";
import { PatientsList } from "./PatientsList";

describe("Sidebar", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<PatientsList />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
