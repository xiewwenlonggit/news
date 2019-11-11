import React, { Component } from "react";
import { NavBar, Icon } from "antd-mobile";
import "./fore.scss";
import { withRouter } from "react-router-dom";
class Forecast extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onLeftClick() {
    this.props.history.push("/main");
  }
  onRightClick() {
    console.log(111);
  }
  render() {
    return (
      <div className="forecast">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.onLeftClick()}
          rightContent={[
            <Icon
              key="0"
              type="cross"
              color="#108ee9"
              onClick={() => this.onRightClick()}
            />
          ]}
        >
          专家预测
        </NavBar>
      </div>
    );
  }
}
export default withRouter(Forecast);
