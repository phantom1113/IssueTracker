import React from "react";
import { Alert, Collapse } from "reactstrap";
export default class Toast extends React.Component {
  componentDidUpdate() {
    if (this.props.showing) {
      clearTimeout(this.dismissTimer);
      this.dismissTimer = setTimeout(this.props.onDismiss, 1000);
    }
  }
  componentWillUnmount() {
    clearTimeout(this.dismissTimer);
  }
  render() {
    return (
      <Collapse isOpen={this.props.showing}>
        <div
          style={{
            position: "fixed",
            top: 30,
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 1
          }}
        >
          <Alert
            style={{ display: "inline-block", width: 500 }}
            color={this.props.bsStyle}
            //toggle={this.props.onDismiss}
          >
            {this.props.message}
          </Alert>
        </div>
      </Collapse>
    );
  }
}
