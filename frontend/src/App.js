import { Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import SigninPage from "./components/SigninPage";
import SignupPage from "./components/SignupPage";
import WelcomePage from "./components/WelcomePage";
import Workspace from "./components/Workspace";
import CreateWorkspacePage from "./components/CreateWorkspacePage";

function App() {
  return (
    <>
      <Switch>
        <Route path="/client/:clientId/get-started/landing">
          <WelcomePage />
        </Route>
        <Route path="/client/:clientId/setup-team-name">
          <CreateWorkspacePage />
        </Route>
        <Route path="/client/:clientId/:workspaceId">
          <Workspace />
        </Route>

        <Route path="/signin/signin">
          <SigninPage />
        </Route>
        <Route path="/get-started/createnew">
          <SignupPage />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
