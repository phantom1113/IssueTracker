import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  NavItem,
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Button,
  ButtonToolbar,
  Label,
  Input
} from "reactstrap";
import Toast from "./Toast";

class IssueAddNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      toastVisible: false,
      toastMessage: "",
      toastType: "success"
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.submit = this.submit.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }
  showModal() {
    this.setState({ modal: true });
  }
  hideModal() {
    this.setState({ modal: false });
  }
  showError(message) {
    this.setState({
      toastVisible: true,
      toastMessage: message,
      toastType: "danger"
    });
  }
  dismissToast() {
    this.setState({ modal: false, toastVisible: false });
  }
  submit(e) {
    e.preventDefault();
    this.hideModal();
    const form = document.forms.issueAdd;
    const newIssue = {
      owner: form.owner.value,
      title: form.title.value,
      status: "New",
      created: new Date()
    };
    axios
      .post("https://3ojz0xmpq.sse.codesandbox.io/api/issues", {
        title: newIssue.title,
        owner: newIssue.owner
      })
      .then(res => {
        res.data.created = new Date(res.data.created);
        if (res.data.completionDate)
          res.data.completionDate = new Date(res.data.completionDate);
        console.log(res.data);
        this.props.history.push("issues/" + res.data._id);
      })
      .catch(err => {
        ///console.log(err.response.data.message);
        this.showError(`Failed to fetch issues 1`);
      });
  }
  render() {
    return (
      <NavItem onClick={this.showModal}>
        <NavLink>
          Create Issues
          <Modal keyboard isOpen={this.state.modal} toggle={this.hideModal}>
            <ModalHeader>Create Issue</ModalHeader>
            <ModalBody>
              <Form name="issueAdd">
                <FormGroup>
                  <Label>Onwe</Label>
                  <Input
                    className="m-1"
                    type="text"
                    name="owner"
                    placeholder="Owner"
                  />{" "}
                </FormGroup>
                <FormGroup>
                  <Label>Title</Label>
                  <Input
                    className="m-1"
                    type="text"
                    name="title"
                    placeholder="Title"
                  />{" "}
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <ButtonToolbar>
                <Button type="button" color="primary" onClick={this.submit}>
                  Submit
                </Button>
                <Button color="link" onClick={this.hideModal}>
                  Cancel
                </Button>
              </ButtonToolbar>
            </ModalFooter>
          </Modal>
        </NavLink>
        <Toast
          showing={this.state.toastVisible}
          message={this.state.toastMessage}
          onDismiss={this.dismissToast}
          bsStyle={this.state.toastType}
        />
      </NavItem>
    );
  }
}

export default withRouter(IssueAddNavItem);
