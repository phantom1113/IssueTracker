import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import IssueList from "../components/issueList";
import IssueEdit from "../components/issueEdit";
import "./styles.css";

function Index() {
  return <h2>Home</h2>;
}
const App = props => (
  <div>
    <div className="header">
      <h1>Issue Tracker</h1>
    </div>
    <div className="contents">{props.children}</div>
    <div className="footer">
      Full source code available at this{" "}
      <a href="https://github.com/vasansr/pro-mern-stack">GitHub repository</a>.
    </div>
  </div>
);
function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/issues/">Issues</Link>
            </li>
          </ul>
        </nav>
        <App>
          <Route exact path="/" component={Index} />
          <Route exact path="/issues" component={withRouter(IssueList)} />
          <Route exact path="/issues/:id" component={IssueEdit} />
        </App>
      </div>
    </Router>
  );
}

const rootElement = document.getElementById("root");

ReactDOM.render(<AppRouter />, rootElement);
