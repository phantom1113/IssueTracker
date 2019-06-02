import React from "react";
import { Form, Input, Button } from "reactstrap";

class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    var form = document.forms.issueAdd;
    this.props.createIssue({
      owner: form.owner.value,
      title: form.title.value,
      status: "New",
      created: new Date()
    });
    // clear the form for the next input
    form.owner.value = "";
    form.title.value = "";
  }
  render() {
    return (
      <div>
        <Form
          className="m-1"
          inline
          name="issueAdd"
          onSubmit={this.handleSubmit}
        >
          <Input className="m-1" type="text" name="owner" placeholder="Owner" />{" "}
          <Input className="m-1" type="text" name="title" placeholder="Title" />{" "}
          <Button className="m-1" type="Submit" color="primary">
            Add
          </Button>
        </Form>
      </div>
    );
  }
}
export default IssueAdd;
