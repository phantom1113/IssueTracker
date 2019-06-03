import React from "react";
import {
  Row,
  Col,
  Button,
  ButtonToolbar,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  FormGroup
} from "reactstrap";

export default class IssueFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.initFilter.status || "",
      effort_gte: this.props.initFilter.effort_gte || "",
      effort_lte: this.props.initFilter.effort_lte || "",
      changed: false
    };
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeEffortGte = this.onChangeEffortGte.bind(this);
    this.onChangeEffortLte = this.onChangeEffortLte.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      status: newProps.initFilter.status || "",
      effort_gte: newProps.initFilter.effort_gte || "",
      effort_lte: newProps.initFilter.effort_lte || "",
      changed: false,
      changed_Gte: false,
      changed_Lte: false
    });
  }

  onChangeStatus(e) {
    const status = e.target.value;
    if (status !== "") {
      this.setState({ status: e.target.value, changed: true });
    }
    if (status === "") {
      this.setState({ changed: false });
    }
  }

  onChangeEffortGte(e) {
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/)) {
      this.setState({ effort_gte: e.target.value, changed_Gte: true });
    }
    if (effortString === "") {
      this.setState({ changed_Gte: false });
    }
  }

  onChangeEffortLte(e) {
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/)) {
      this.setState({ effort_lte: e.target.value, changed_Lte: true });
    }
    if (effortString === "") {
      this.setState({ changed_Lte: false });
    }
  }

  applyFilter() {
    const newFilter = {};
    if (this.state.status) newFilter.status = this.state.status;
    if (this.state.effort_gte) newFilter.effort_gte = this.state.effort_gte;
    if (this.state.effort_lte) newFilter.effort_lte = this.state.effort_lte;
    this.props.setFilter(newFilter);
  }

  clearFilter() {
    this.props.setFilter({});
  }

  resetFilter() {
    this.setState({
      status: this.props.initFilter.status || "",
      effort_gte: this.props.initFilter.effort_gte || "",
      effort_lte: this.props.initFilter.effort_lte || "",
      changed: false
    });
  }

  render() {
    return (
      <Row className="m-1">
        <Col xs={6} sm={4}>
          <FormGroup>
            <Label>Status</Label>
            <Input
              type="select"
              name="select"
              id="exampleSelect"
              value={this.state.status}
              onChange={this.onChangeStatus}
            >
              <option value="">(Any)</option>
              <option value="New">New</option>
              <option value="Open">Open</option>
              <option value="Assigned">Assigned</option>
              <option value="Fixed">Fixed</option>
              <option value="Verified">Verified</option>
              <option value="Closed">Closed</option>
            </Input>
          </FormGroup>
        </Col>
        <Col xs={6} sm={4}>
          <FormGroup>
            <Label>Effort between</Label>
            <InputGroup>
              <Input
                size="5"
                value={this.state.effort_gte}
                onChange={this.onChangeEffortGte}
              />
              <InputGroupAddon addonType="prepend">-</InputGroupAddon>
              <Input
                size="5"
                value={this.state.effort_lte}
                onChange={this.onChangeEffortLte}
              />
            </InputGroup>
          </FormGroup>
        </Col>
        <Col xs={12} sm={4}>
          <FormGroup>
            <Label>&nbsp;</Label>
            <ButtonToolbar>
              <Button
                className="mr-1"
                color="primary"
                onClick={this.applyFilter}
              >
                Apply
              </Button>{" "}
              <Button
                className="mr-1"
                color="primary"
                onClick={this.resetFilter}
                disabled={
                  !(
                    this.state.changed_Lte ||
                    this.state.changed_Gte ||
                    this.state.changed
                  )
                }
              >
                Reset
              </Button>{" "}
              <Button color="primary" onClick={this.clearFilter}>
                Clear
              </Button>{" "}
            </ButtonToolbar>
          </FormGroup>
        </Col>
      </Row>
    );
  }
}
