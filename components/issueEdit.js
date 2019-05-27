import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NumInput from "./NumInput";
import DateInput from "./DateInput";

export default class IssueEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      issue: {
        _id: "",
        title: "",
        status: "",
        owner: "",
        effort: null,
        completionDate: null,
        created: null
      },
      invalidFields: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onValidityChange = this.onValidityChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadData();
    }
  }
  onValidityChange(event, valid) {
    const invalidFields = Object.assign({}, this.state.invalidFields);
    if (!valid) {
      invalidFields[event.target.name] = true;
    } else {
      delete invalidFields[event.target.name];
    }
    this.setState({ invalidFields });
  }
  onChange(event, convertedValue) {
    const issue = Object.assign({}, this.state.issue);
    const value =
      convertedValue !== undefined ? convertedValue : event.target.value;
    issue[event.target.name] = event.target.value;
    issue[event.target.name] = value;
    this.setState({ issue });
    console.log(issue);
  }
  onSubmit(event) {
    console.log("run onsubmit function");
    event.preventDefault();
    if (Object.keys(this.state.invalidFields).length !== 0) {
      return;
    }
    const { issue } = this.state;
    axios
      .post(
        "https://3ojz0xmpq.sse.codesandbox.io/api/issues/" +
          this.props.match.params.id,
        issue
      )
      .then(res => {
        const updatedIssue = res.data;
        updatedIssue.created = new Date(updatedIssue.created);
        if (updatedIssue.completionDate) {
          updatedIssue.completionDate = new Date(updatedIssue.completionDate);
        }
        this.setState({ issue: updatedIssue });
      })
      .catch(function(error) {
        // handle error
        console.log(error.response);
      });
  }
  loadData() {
    console.log("Render function");
    axios
      .get(
        "https://3ojz0xmpq.sse.codesandbox.io/api/issues/" +
          this.props.match.params.id
      )
      .then(issues => {
        const issue = issues.data;
        issue.created = new Date(issue.created);
        issue.completionDate =
          issue.completionDate != null ? new Date(issue.completionDate) : null;
        issue.effort = issue.effort != null ? issue.effort.toString() : "";
        this.setState({ issue });
      })
      .catch(function(error) {
        // handle error
        console.log(error.response);
      });
  }

  // eslint-disable-line
  render() {
    const issue = this.state.issue;
    const validationMessage =
      Object.keys(this.state.invalidFields).length === 0 ? null : (
        <div className="error">
          Please correct invalid fields before submitting.
        </div>
      );
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          ID: {issue._id}
          <br />
          Created: {issue.created ? issue.created.toDateString() : ""}
          <br />
          Status:{" "}
          <select name="status" value={issue.status} onChange={this.onChange}>
            <option value="New">New</option>
            <option value="Open">Open</option>
            <option value="Assigned">Assigned</option>
            <option value="Fixed">Fixed</option>
            <option value="Verified">Verified</option>
            <option value="Closed">Closed</option>
          </select>
          <br />
          Owner:{" "}
          <input name="owner" value={issue.owner} onChange={this.onChange} />
          <br />
          Effort:{" "}
          <NumInput
            size={5}
            name="effort"
            value={issue.effort}
            onChange={this.onChange}
          />
          <br />
          Completion Date:{" "}
          <DateInput
            name="completionDate"
            value={issue.completionDate}
            onChange={this.onChange}
            onValidityChange={this.onValidityChange}
          />
          <br />
          Title:{" "}
          <input
            name="title"
            size={50}
            value={issue.title}
            onChange={this.onChange}
          />
          <br />
          {validationMessage}
          <button type="submit">Submit</button>
          <Link to="/issues">Back to issue list</Link>
        </form>
      </div>
    );
  }
}
