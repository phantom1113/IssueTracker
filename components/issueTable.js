import React from "react";
import IssueRow from "./issueRow";
import { Table } from "reactstrap";

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
      <Table bordered hover responsive>
        <thead>
          <tr>
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
      </Table>
    );
  }
}

export default issueTable;
