import React from "react";
import { InoButton } from "@inovex.de/elements-react";
import { triggerDemo } from "./connectExecutions";
import "./Executions.css";

export class Executions extends React.Component {
  public render() {
    return (
      <div className="flex-column main">
        <InoButton onClick={(e) => triggerDemo()}>Demo</InoButton>
        <br />
        <h3>Coming Soon:</h3>
        <br />
        <div className="flex-row">
          <InoButton style={{ marginRight: "10px" }} disabled={true}>
            Morning
          </InoButton>
          <InoButton style={{ marginRight: "10px" }} disabled={true}>
            Noon
          </InoButton>
          <InoButton style={{ marginRight: "10px" }} disabled={true}>
            Afternoon
          </InoButton>
          <InoButton style={{ marginRight: "10px" }} disabled={true}>
            Evening
          </InoButton>
        </div>
      </div>
    );
  }
}
