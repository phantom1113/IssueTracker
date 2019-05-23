import React from "react";
import { Link } from "react-router-dom";

export default class IssueEdit extends React.Component {
  // eslint-disable-line
  render() {
    const {
      match: { params }
    } = this.props;
    return (
      <div>
        <p>This is a placeholder for editing issue {params.id}.</p>
        <Link to="/issues">Back to issue list</Link>
      </div>
    );
  }
}
