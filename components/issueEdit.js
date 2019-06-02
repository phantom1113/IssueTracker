import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NumInput from "./NumInput";
import DateInput from "./DateInput";
import {
  FormGroup,
  Input,
  Label,
  Button,
  ButtonToolbar,
  Card,
  Form,
  Col,
  CardHeader,
  FormFeedback
} from "reactstrap";
import { LinkContainer } from "react-router-bootstrap";

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
    console.log(this.state.invalidFields);
    return (
      <Card>
        <CardHeader>Edit Issue</CardHeader>
        <Form className="p-3" horizontal onSubmit={this.onSubmit}>
          <FormGroup row>
            <Label for="exampleEmail" sm={3}>
              ID :
            </Label>
            <Col sm={9}>
              <Label for="exampleEmail" sm={12}>
                {issue._id}
              </Label>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleEmail" sm={3}>
              Created :
            </Label>
            <Col sm={9}>
              <Label for="exampleEmail" sm={12}>
                {issue.created ? issue.created.toDateString() : ""}
              </Label>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleEmail" sm={3}>
              Status :{" "}
            </Label>
            <Col sm={9}>
              <Input
                type="select"
                name="status"
                value={issue.status}
                onChange={this.onChange}
              >
                <option value="">(Any)</option>
                <option value="New">New</option>
                <option value="Open">Open</option>
                <option value="Assigned">Assigned</option>
                <option value="Fixed">Fixed</option>
                <option value="Verified">Verified</option>
                <option value="Closed">Closed</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleEmail" sm={3}>
              Owner :
            </Label>
            <Col sm={9}>
              <Input
                type="text"
                name="owner"
                value={issue.owner}
                onChange={this.onChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleEmail" sm={3}>
              Effort :
            </Label>
            <Col sm={9}>
              <NumInput
                size={5}
                name="effort"
                value={issue.effort}
                onChange={this.onChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleEmail" sm={3}>
              Completion Date:
            </Label>
            <Col sm={9}>
              <DateInput
                name="completionDate"
                value={issue.completionDate}
                onChange={this.onChange}
                onValidityChange={this.onValidityChange}
                invalid={this.state.invalidFields.completionDate === true}
              />
              <FormFeedback />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleEmail" sm={3}>
              Title :
            </Label>
            <Col sm={9}>
              <Input
                name="title"
                size={50}
                value={issue.title}
                onChange={this.onChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleEmail" sm={3} />
            <Col sm={9}>
              <ButtonToolbar>
                <Button className="mr-2" color="primary" type="submit">
                  Submit
                </Button>
                <Button tag={Link} to="/issues">
                  Back
                </Button>
              </ButtonToolbar>
            </Col>
          </FormGroup>
        </Form>
        {validationMessage}
      </Card>
    );
  }
}
