import React from "react";
import queryString from "query-string";
import IssueAdd from "./issueAdd";
import IssueTable from "./issueTable";
import IssueFilter from "./issueFilter";
import { Card, CardHeader, Collapse } from "reactstrap";
import axios from "axios";
import Toast from "./Toast";

class IssueList extends React.Component {
  constructor() {
    super();
    this.state = {
      issues: [],
      collapse: false,
      status: "Closed",
      toastVisible: false,
      toastMessage: "",
      toastType: "success"
    };
    this.createIssue = this.createIssue.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.initFilter = this.initFilter.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
    this.toggle = this.toggle.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }
  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }
  showSuccess(message) {
    console.log("show success");
    this.setState({
      toastVisible: true,
      toastMessage: message,
      toastType: "success"
    });
  }
  showError(message) {
    console.log("run show error");
    this.setState({
      toastVisible: true,
      toastMessage: message,
      toastType: "danger"
    });
  }
  dismissToast() {
    this.setState({ toastVisible: false });
  }
  componentDidMount() {
    this.props.history.push({
      pathname: this.props.location.pathname,
      query: { status: "", effort_gte: "", effort_lte: "" }
    });
    this.loadData();
  }
  componentDidUpdate(prevProps) {
    const oldQuery = queryString.parse(prevProps.location.search);
    const newQuery = queryString.parse(this.props.location.search);
    if (
      oldQuery.status === newQuery.status &&
      oldQuery.effort_gte === newQuery.effort_gte &&
      oldQuery.effort_lte === newQuery.effort_lte
    ) {
      return;
    }
    this.loadData();
  }
  initFilter() {
    if (this.props.history.query === undefined)
      return { status: "", effort_gte: "", effort_lte: "" };
    return this.props.history.query;
  }
  //history.location.query.status
  setFilter(query) {
    this.props.history.push({ pathname: this.props.location.pathname, query });
    this.loadData();
  }
  loadData() {
    const {
      status,
      effort_gte,
      effort_lte
    } = this.props.history.location.query;
    axios
      .get("https://3ojz0xmpq.sse.codesandbox.io/api/issues", {
        params: {
          status: status,
          effort_gte: effort_gte,
          effort_lte: effort_lte
        }
      })
      .then(res => {
        console.log("Total count of records:", res.data._metadata.total_count);
        res.data.records.forEach(issue => {
          issue.created = new Date(issue.created);
          if (issue.completionDate)
            issue.completionDate = new Date(issue.completionDate);
        });
        this.setState({ issues: res.data.records });
      })
      .catch(error => {
        // handle error
        this.showError(`Failed to fetch issues`);
      });
  }
  createIssue(newIssue) {
    axios
      .post("https://3ojz0xmpq.sse.codesandbox.io/api/issues", {
        title: newIssue.title,
        owner: newIssue.owner
      })
      .then(res => {
        res.data.created = new Date(res.data.created);
        if (res.data.completionDate)
          res.data.completionDate = new Date(res.data.completionDate);
        const newIssues = this.state.issues.concat(res.data);
        console.log(newIssues);
        this.setState({ issues: newIssues });
        this.showSuccess(`Added issue sucessfully.`);
      })
      .catch(err => {
        ///console.log(err.response.data.message);
        this.showError(`Failed to fetch issues`);
      });
  }
  deleteIssue(id) {
    axios
      .delete("https://3ojz0xmpq.sse.codesandbox.io/api/issues/" + id)
      .then(res => {
        this.loadData();
        this.showSuccess(`Deleted issue sucessfully.`);
      })
      .catch(err => {
        this.showError(`Failed to fetch issues`);
      });
  }
  render() {
    return (
      <div>
        <Card>
          <CardHeader onClick={this.toggle}>Filter</CardHeader>
          <Collapse isOpen={this.state.collapse}>
            <IssueFilter
              setFilter={this.setFilter}
              initFilter={this.initFilter()}
            />
          </Collapse>
        </Card>
        <hr />
        <IssueTable issues={this.state.issues} deleteIssue={this.deleteIssue} />
        <hr />
        <IssueAdd createIssue={this.createIssue} />
        <Toast
          showing={this.state.toastVisible}
          message={this.state.toastMessage}
          onDismiss={this.dismissToast}
          bsStyle={this.state.toastType}
        />
      </div>
    );
  }
}
export default IssueList;
