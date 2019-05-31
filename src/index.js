import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import IssueList from "../components/issueList";
import IssueEdit from "../components/issueEdit";
import Header from "../components/Header";
import "./styles.css";

function Index() {
  return <h2>Home</h2>;
}

function Footer() {
  return (
    <div className="footer">
      Full source code available at this{" "}
      <a href="https://github.com/vasansr/pro-mern-stack">GitHub repository</a>.
    </div>
  );
}
const App = props => (
  <div className="container-fluid">
    <Header />
    <div className="contents">{props.children}</div>
    <Footer />
  </div>
);
function AppRouter() {
  return (
    <Router>
      <App>
        <Route exact path="/" component={Index} />
        <Route exact path="/issues" component={withRouter(IssueList)} />
        <Route exact path="/issues/:id" component={IssueEdit} />
      </App>
    </Router>
  );
}

const rootElement = document.getElementById("root");

ReactDOM.render(<AppRouter />, rootElement);
