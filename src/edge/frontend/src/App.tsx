import React from "react";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { CreateUser } from "./components/CreateUser/CreateUser";
import { CreatePillExecution } from "./components/CreatePillExecution/CreatePillExecution";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { PatientsList } from "./components/PatientsList/PatientsList";
import { PillsList } from "./components/PillsList/PillsList";
import { Executions } from "./components/Executions/Executions";
import { RefillPills } from "./components/RefillPills/RefillPills";

function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <div className="Detail">
          <Switch>
            <Route exact path="/" component={CreateUser} />
            <Route
              exact
              path="/create-pill-execution"
              component={CreatePillExecution}
            />
            <Route exact path="/all-patients" component={PatientsList} />
            <Route exact path="/all-pills" component={PillsList} />
            <Route exact path="/control" component={Executions} />
            <Route exact path="/refill" component={RefillPills} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
