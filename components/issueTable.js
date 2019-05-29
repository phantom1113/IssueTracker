import React from "react";
import IssueRow from "./issueRow";

class issueTable extends React.Component {
  render() {
    const issueRows = this.props.issues.map(issue => (
      <IssueRow
        key={issue._id}
        issue={issue}
        deleteIssue={this.props.deleteIssue}
      />
    ));
    return (
      <table className="bordered-table">
        <thead>
          <tr>
            <th>Edit Id</th>
            <th>Id</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Effort</th>
            <th>Completion Date</th>
            <th>Title</th>
            <th />
          </tr>
        </thead>
        <tbody>{issueRows}</tbody>
      </table>
    );
  }
}

export default issueTable;
