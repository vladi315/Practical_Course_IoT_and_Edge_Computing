import { InoButton, InoPopover, InoSpinner } from "@inovex.de/elements-react";
import React from "react";
import { FetchError } from "../../apis/FetchError";
import { ResponseWrapper } from "../ResponseWrapper/ResponseWrapper";
import { getPatients, triggerDispenser } from "./connectPatientsList";
import "./PatientsList.css";
import { getDay } from "./utils";

const colourMap: Record<string, string> = {
  pill1: "Red",
  pill2: "Yellow",
  pill3: "Blue",
  pill4: "Green",
  pill5: "Purple",
  pill6: "Pink",
};

interface State {}

interface Patient {
  age: number;
  lastrequest: null;
  leavingdate: string;
  location: string;
  name: string;
  patientid: number;
  pills: never[][][];
}

interface APIPatientListInterface {
  data: Patient[] | null;
  error: FetchError | null;
}

interface PatientListProps {
  data: APIPatientListInterface;
}

class PatientsList extends React.PureComponent<PatientListProps, State> {
  public constructor(props: any) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <ResponseWrapper
        error={this.props.data.error}
        children={
          <div>
            <table>
              <thead>
                <tr>
                  <th>
                    <h3>Name</h3>
                  </th>
                  <th>
                    <h3>Age</h3>
                  </th>
                  <th>
                    <h3>Leaving Date </h3>
                  </th>
                  <th>
                    <h3>Triggers</h3>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.props.data.data!.map((entry: Patient) => (
                  <PatientsListEntry key={entry.patientid} data={entry} />
                ))}
              </tbody>
            </table>
          </div>
        }
      />
    );
  }
}

interface PatientsListEntryInterface {
  data: Patient;
}

class PatientsListEntry extends React.PureComponent<
  PatientsListEntryInterface,
  {}
> {
  public constructor(props: any) {
    super(props);
    this.state = {};
  }

  async dispense(patientid: number, tod: number) {
    await triggerDispenser(patientid, tod);
  }

  public render() {
    let day = this.props.data.pills[getDay()];
    return (
      <tr>
        <td className="vertical-top">
          <p>{this.props.data.name}</p>
        </td>
        <td className="vertical-top">
          <p>{this.props.data.age}</p>
        </td>
        <td className="vertical-top">
          <p className="central-text">{this.props.data.leavingdate}</p>
        </td>

        <td className="vertical-top flex-row">
          <div style={{ marginRight: "5px" }}>
            <InoPopover
              inoTrigger="click"
              inoPlacement="top"
              inoInteractive={true}
            >
              <div className="flex-column">
                <p>
                  {day[0].length > 0
                    ? `pills: ${day[0].map((id: string) => colourMap[id])}`
                    : "No Pills for this Phase today!"}
                </p>
                <br />
                <InoButton
                  onClick={(e) => this.dispense(this.props.data.patientid, 0)}
                  disabled={day[0].length > 0 ? false : true}
                  inoColorScheme="secondary"
                >
                  Dispense Pills
                </InoButton>
              </div>
            </InoPopover>
            <InoButton
              inoColorScheme={day[0].length > 0 ? "secondary" : "grey"}
              inoFill={day[0].length > 0 ? "solid" : "outline"}
              style={{ marginRight: "5px" }}
            >
              Morning
            </InoButton>
          </div>

          <div style={{ marginRight: "5px" }}>
            <InoPopover
              inoTrigger="click"
              inoPlacement="top"
              inoInteractive={true}
            >
              <div className="flex-column">
                <p>
                  {day[1].length > 0
                    ? `pills: ${day[1].map((id: string) => colourMap[id])}`
                    : "No Pills for this Phase today!"}
                </p>
                <br />
                <InoButton
                  style={{ marginRight: "5px" }}
                  onClick={(e) => this.dispense(this.props.data.patientid, 1)}
                  disabled={day[1].length > 0 ? false : true}
                  inoColorScheme="secondary"
                >
                  Dispense Pills
                </InoButton>
              </div>
            </InoPopover>
            <InoButton
              inoColorScheme={day[1].length > 0 ? "secondary" : "grey"}
              inoFill={day[1].length > 0 ? "solid" : "outline"}
              style={{ marginRight: "5px" }}
            >
              Noon
            </InoButton>
          </div>

          <div style={{ marginRight: "5px" }}>
            <InoPopover
              inoTrigger="click"
              inoPlacement="top"
              inoInteractive={true}
            >
              <div className="flex-column">
                <p>
                  {day[2].length > 0
                    ? `pills: ${day[2].map((id: string) => colourMap[id])}`
                    : "No Pills for this Phase today!"}
                </p>
                <br />
                <InoButton
                  style={{ marginRight: "5px" }}
                  onClick={(e) => this.dispense(this.props.data.patientid, 2)}
                  disabled={day[2].length > 0 ? false : true}
                  inoColorScheme="secondary"
                >
                  Dispense Pills
                </InoButton>
              </div>
            </InoPopover>
            <InoButton
              inoColorScheme={day[2].length > 0 ? "secondary" : "grey"}
              inoFill={day[2].length > 0 ? "solid" : "outline"}
              style={{ marginRight: "5px" }}
            >
              Afternoon
            </InoButton>
          </div>

          <div style={{ marginRight: "5px" }}>
            <InoPopover
              inoTrigger="click"
              inoPlacement="top"
              inoInteractive={true}
            >
              <div className="flex-column">
                <p>
                  {day[3].length > 0
                    ? `pills: ${day[3].map((id: string) => colourMap[id])}`
                    : "No Pills for this Phase today!"}
                </p>
                <br />
                <InoButton
                  style={{ marginRight: "5px" }}
                  onClick={(e) => this.dispense(this.props.data.patientid, 3)}
                  disabled={day[3].length > 0 ? false : true}
                  inoColorScheme="secondary"
                >
                  Dispense Pills
                </InoButton>
              </div>
            </InoPopover>
            <InoButton
              inoColorScheme={day[3].length > 0 ? "secondary" : "grey"}
              inoFill={day[3].length > 0 ? "solid" : "outline"}
              style={{ marginRight: "5px" }}
            >
              Night
            </InoButton>
          </div>
        </td>
      </tr>
    );
  }
}

const connectToApi = async () => {
  const res: APIPatientListInterface = await getPatients().then(
    (result: any) => result
  );
  return <PatientsList data={res} />;
};

interface ConnectedState {
  child: JSX.Element;
  isLoading: boolean;
}

class connectedPatientsList extends React.Component<{}, ConnectedState> {
  constructor() {
    super({});
    this.state = {
      child: <div />,
      isLoading: true,
    };
  }

  async componentDidMount() {
    const child: JSX.Element = await connectToApi().then((e: any) => e);
    this.setState({ child, isLoading: false });
  }

  public render() {
    const Child = this.state.child;
    return (
      <div>
        {this.state.isLoading && <InoSpinner />}
        {!this.state.isLoading && Child}
      </div>
    );
  }
}

export { connectedPatientsList as PatientsList };
