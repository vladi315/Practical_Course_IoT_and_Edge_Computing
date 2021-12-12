import React from "react";
import {
  InoButton,
  InoSelect,
  InoOption,
  InoCheckbox,
  InoSpinner,
  InoSnackbar,
  InoInput,
} from "@inovex.de/elements-react";
import "./CreatePillExecution.css";
import { setPillExecution } from "./connectCreatePillExecution";
import { ResponseWrapper } from "../ResponseWrapper/ResponseWrapper";
import { FetchError } from "../../apis/FetchError";
import { getPatients } from "../PatientsList/connectPatientsList";

const pillsMap: string[] = [
  "pill1",
  "pill2",
  "pill3",
  "pill4",
  "pill5",
  "pill6",
];

const defaultData: string[][][] = [
  [[], [], [], []],
  [[], [], [], []],
  [[], [], [], []],
  [[], [], [], []],
  [[], [], [], []],
  [[], [], [], []],
  [[], [], [], []],
];
const defaultFlags = [
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
];
const pillFlags = [0, 0, 0, 0, 0, 0, 0, 0];

interface State {
  person: string;
  data: string[][][];
  flags: boolean[][];
  pills: number[];
  showNotification: boolean;
  message: string;
  isError: boolean;
  blocked: boolean;
}

interface CreatePillExecutionProps {
  data: APIPatientListInterface;
}

class CreatePillExecution extends React.PureComponent<
  CreatePillExecutionProps,
  State
> {
  public constructor(props: any) {
    super(props);
    this.state = {
      person: "",
      data: defaultData,
      flags: defaultFlags,
      pills: pillFlags,
      showNotification: false,
      message: "",
      isError: false,
      blocked: false,
    };
  }

  private createPillExecution = () => {
    let data = this.mergeData();
    // after Code do something
    setPillExecution(this.state.person, data);
    this.setState({
      showNotification: true,
      isError: false,
      message: "Pill table created or updated!",
      blocked: true,
    });
  };

  private mergeData = () => {
    let pills: string[] = [];
    this.state.pills.forEach((value, index) => {
      for (var _i = 0; _i < value; _i++) {
        pills.push(pillsMap[index]);
      }
    });
    console.log(pills);
    let localdata = defaultData;
    this.state.flags.forEach((day, dayIndex) => {
      day.forEach((phase, phaseIndex) => {
        if (phase) {
          localdata[dayIndex][phaseIndex] = pills.map((p) => p.toString());
        } else {
          localdata[dayIndex][phaseIndex] = ["empty"];
        }
      });
    });
    return localdata;
  };

  private updateFlag = (day: number, phase: number) => {
    let data = this.state.flags;
    let flag = data[day][phase];
    data[day][phase] = !flag;
    this.setState({ flags: data });
    this.forceUpdate();
  };

  private updatePill = (id: number, amount: number) => {
    let data = this.state.pills;
    data[id] = amount;
    this.setState({ pills: data });
    this.forceUpdate();
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
        <ResponseWrapper
          error={this.props.data.error}
          children={
            <div>
              <InoSelect
                value={this.state.person}
                onValueChange={(e) => this.setState({ person: e.detail })}
              >
                {this.props.data!.data!.map((entry: Patient) => (
                  <InoOption value={`${entry.patientid}`}>
                    {entry.name}
                  </InoOption>
                ))}
              </InoSelect>
            </div>
          }
        />
        <br />
        <div className="flex-row-flex-wrap">
          <InoInput
            style={{ marginRight: "50px" }}
            value={this.state.pills[0].toString()}
            onValueChange={(e) => this.updatePill(0, parseInt(e.detail))}
            inoLabel="Red"
          />

          <InoInput
            style={{ marginRight: "50px" }}
            value={this.state.pills[1].toString()}
            onValueChange={(e) => this.updatePill(1, parseInt(e.detail))}
            inoLabel="Yellow"
          />

          <InoInput
            style={{ marginRight: "50px" }}
            value={this.state.pills[2].toString()}
            onValueChange={(e) => this.updatePill(2, parseInt(e.detail))}
            inoLabel="Blue"
          />

          <InoInput
            style={{ marginRight: "50px" }}
            value={this.state.pills[3].toString()}
            onValueChange={(e) => this.updatePill(3, parseInt(e.detail))}
            inoLabel="Green"
          />

          <InoInput
            style={{ marginRight: "50px" }}
            value={this.state.pills[4].toString()}
            onValueChange={(e) => this.updatePill(4, parseInt(e.detail))}
            inoLabel="Purple"
          />

          <InoInput
            style={{ marginRight: "50px" }}
            value={this.state.pills[5].toString()}
            onValueChange={(e) => this.updatePill(5, parseInt(e.detail))}
            inoLabel="Pink"
          />
        </div>

        <br />
        <table>
          <thead>
            <tr>
              <th>
                <h3>Monday</h3>
              </th>
              <th>
                <h3>Tuesday</h3>
              </th>
              <th>
                <h3>Wednesday </h3>
              </th>
              <th>
                <h3> Thursday </h3>
              </th>
              <th>
                <h3> Friday</h3>
              </th>
              <th>
                <h3> Saturday</h3>
              </th>
              <th>
                <h3> Sunday</h3>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <InoCheckbox
                  checked={this.state.flags[0][0]}
                  onClick={(e) => this.updateFlag(0, 0)}
                >
                  Morning
                </InoCheckbox>
              </td>
              <td>
                <InoCheckbox
                  checked={this.state.flags[1][0]}
                  onClick={(e) => this.updateFlag(1, 0)}
                >
                  Morning
                </InoCheckbox>
              </td>
              <td>
                <InoCheckbox
                  checked={this.state.flags[2][0]}
                  onClick={(e) => this.updateFlag(2, 0)}
                >
                  Morning
                </InoCheckbox>
              </td>
              <td>
                <InoCheckbox
                  checked={this.state.flags[3][0]}
                  onClick={(e) => this.updateFlag(3, 0)}
                >
                  Morning
                </InoCheckbox>
              </td>
              <td>
                <InoCheckbox
                  checked={this.state.flags[4][0]}
                  onClick={(e) => this.updateFlag(4, 0)}
                >
                  Morning
                </InoCheckbox>
              </td>
              <td>
                <InoCheckbox
                  checked={this.state.flags[5][0]}
                  onClick={(e) => this.updateFlag(5, 0)}
                >
                  Morning
                </InoCheckbox>
              </td>
              <td>
                <InoCheckbox
                  checked={this.state.flags[6][0]}
                  onClick={(e) => this.updateFlag(6, 0)}
                >
                  Morning
                </InoCheckbox>
              </td>
            </tr>
            <tr>
              <td>
                <InoCheckbox
                  checked={this.state.flags[0][1]}
                  onClick={(e) => this.updateFlag(0, 1)}
                >
                  Noon
                </InoCheckbox>
              </td>
              <td>
                <InoCheckbox
                  checked={this.state.flags[1][1]}
                  onClick={(e) => this.updateFlag(1, 1)}
                >
                  Noon
                </InoCheckbox>
              </td>
              <td>
                <InoCheckbox
                  checked={this.state.flags[2][1]}
                  onClick={(e) => this.updateFlag(2, 1)}
                >
                  Noon
                </InoCheckbox>
              </td>
              <td>
                <InoCheckbox
                  checked={this.state.flags[3][1]}
                  onClick={(e) => this.updateFlag(3, 1)}
                >
                  Noon
                </InoCheckbox>
              </td>
              <td>
                <InoCheckbox
                  checked={this.state.flags[4][1]}
                  onClick={(e) => this.updateFlag(4, 1)}
                >
                  Noon
                </InoCheckbox>
              </td>
              <td>
                <InoCheckbox
                  checked={this.state.flags[5][1]}
                  onClick={(e) => this.updateFlag(5, 1)}
                >
                  Noon
                </InoCheckbox>
              </td>
              <td>
                <InoCheckbox
                  checked={this.state.flags[6][1]}
                  onClick={(e) => this.updateFlag(6, 1)}
                >
                  Noon
                </InoCheckbox>
              </td>
            </tr>
            <tr>
              <td>
                <InoCheckbox
                  checked={this.state.flags[0][2]}
                  onClick={(e) => this.updateFlag(0, 2)}
                >
                  Afternoon
                </InoCheckbox>
              </td>
              <td>
                <InoCheckbox
                  checked={this.state.flags[1][2]}
                  onClick={(e) => this.updateFlag(1, 2)}
                >
                  Afternoon
                </InoCheckbox>
              </td>
              <td>
                <InoCheckbox
                  checked={this.state.flags[2][2]}
                  onClick={(e) => this.updateFlag(2, 2)}
                >
                  Afternoon
                </InoCheckbox>
              </td>
              <td>
                <InoCheckbox
                  checked={this.state.flags[3][2]}
                  onClick={(e) => this.updateFlag(3, 2)}
                >
                  Afternoon
                </InoCheckbox>
              </td>
              <td>
                <InoCheckbox
                  checked={this.state.flags[4][2]}
                  onClick={(e) => this.updateFlag(4, 2)}
                >
                  Afternoon
                </InoCheckbox>
              </td>
              <td>
                <InoCheckbox
                  checked={this.state.flags[5][2]}
                  onClick={(e) => this.updateFlag(5, 2)}
                >
                  Afternoon
                </InoCheckbox>
              </td>
              <td>
                <InoCheckbox
                  checked={this.state.flags[6][2]}
                  onClick={(e) => this.updateFlag(6, 2)}
                >
                  Afternoon
                </InoCheckbox>
              </td>
            </tr>
            <tr>
              <td>
                <InoCheckbox
                  checked={this.state.flags[0][3]}
                  onClick={(e) => this.updateFlag(0, 3)}
                >
                  Night
                </InoCheckbox>
              </td>
              <td>
                <InoCheckbox
                  checked={this.state.flags[1][3]}
                  onClick={(e) => this.updateFlag(1, 3)}
                >
                  Night
                </InoCheckbox>
              </td>
              <td>
                <InoCheckbox
                  checked={this.state.flags[2][3]}
                  onClick={(e) => this.updateFlag(2, 3)}
                >
                  Night
                </InoCheckbox>
              </td>
              <td>
                <InoCheckbox
                  checked={this.state.flags[3][3]}
                  onClick={(e) => this.updateFlag(3, 3)}
                >
                  Night
                </InoCheckbox>
              </td>
              <td>
                <InoCheckbox
                  checked={this.state.flags[4][3]}
                  onClick={(e) => this.updateFlag(4, 3)}
                >
                  Night
                </InoCheckbox>
              </td>
              <td>
                <InoCheckbox
                  checked={this.state.flags[5][3]}
                  onClick={(e) => this.updateFlag(5, 3)}
                >
                  Night
                </InoCheckbox>
              </td>
              <td>
                <InoCheckbox
                  checked={this.state.flags[6][3]}
                  onClick={(e) => this.updateFlag(6, 3)}
                >
                  Night
                </InoCheckbox>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <InoButton
          disabled={this.state.blocked}
          onClick={this.createPillExecution}
        >
          Create Pill Execution
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

interface Patient {
  age: number;
  lastrequest: null;
  leavingdate: string;
  location: string;
  name: string;
  patientid: number;
}

interface APIPatientListInterface {
  data: Patient[] | null;
  error: FetchError | null;
}

const connectToApi = async () => {
  const res: APIPatientListInterface = await getPatients().then(
    (result: any) => result
  );
  return <CreatePillExecution data={res} />;
};

interface ConnectedState {
  child: JSX.Element;
  isLoading: boolean;
}

class connectedCreatePillExecution extends React.Component<{}, ConnectedState> {
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

export { connectedCreatePillExecution as CreatePillExecution };
