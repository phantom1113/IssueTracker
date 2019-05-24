import React from "react";
import queryString from "query-string";
import IssueAdd from "./issueAdd";
import IssueTable from "./issueTable";
import IssueFilter from "./issueFilter";
import axios from "axios";

class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };
    this.createIssue = this.createIssue.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.initFilter = this.initFilter.bind(this);
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
      .catch(function(error) {
        // handle error
        console.log(error.response);
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
        console.log(res);
      })
      .catch(function(err) {
        console.log(err.response.data.message);
        alert(err.response.data.message);
      });
  }
  render() {
    return (
      <div>
        <IssueFilter
          setFilter={this.setFilter}
          initFilter={this.initFilter()}
        />
        <hr />
        <IssueTable issues={this.state.issues} />
        <hr />
        <IssueAdd createIssue={this.createIssue} />
      </div>
    );
  }
}
export default IssueList;
