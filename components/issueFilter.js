import React from "react";

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
      <div>
        Status:
        <select value={this.state.status} onChange={this.onChangeStatus}>
          <option value="">(Any)</option>
          <option value="New">New</option>
          <option value="Open">Open</option>
          <option value="Assigned">Assigned</option>
          <option value="Fixed">Fixed</option>
          <option value="Verified">Verified</option>
          <option value="Closed">Closed</option>
        </select>
        &nbsp;Effort between:
        <input
          size={5}
          value={this.state.effort_gte}
          onChange={this.onChangeEffortGte}
        />
        &nbsp;-&nbsp;
        <input
          size={5}
          value={this.state.effort_lte}
          onChange={this.onChangeEffortLte}
        />
        <button onClick={this.applyFilter}>Apply</button>
        <button
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
        </button>
        <button onClick={this.clearFilter}>Clear</button>
      </div>
    );
  }
}
