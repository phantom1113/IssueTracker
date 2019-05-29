import React from "react";
import { Link } from "react-router-dom";

class IssueRow extends React.Component {
  constructor() {
    super();
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }
  onDeleteClick() {
    this.props.deleteIssue(this.props.issue._id);
  }
  render() {
    const issue = this.props.issue;
    return (
      <tr>
        <td>
          <Link to={`/issues/${issue._id}`}>{issue._id.substr(-4)}</Link>
        </td>
        <td>{issue._id}</td>
        <td>{issue.status}</td>
        <td>{issue.owner}</td>
        <td>{issue.created.toDateString()}</td>
        <td>{issue.effort}</td>
        <td>
          {issue.completionDate ? issue.completionDate.toDateString() : ""}
        </td>
        <td>{issue.title}</td>
        <td>
          <button onClick={this.onDeleteClick}>Delete</button>
        </td>
      </tr>
    );
  }
}
export default IssueRow;
