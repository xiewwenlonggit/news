import React from "react";
import { setNewsType } from "../../../redux/action";
import { connect } from "react-redux";
import "./hot.scss";
import News from "../../puclic/newsList";
import { NavBar, Icon } from "antd-mobile";
import { withRouter } from "react-router-dom";
class HotList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.setNewsType("hot");
  }
  componentDidMount() {}
  onLeftClick() {
    this.props.history.push("/main");
  }
  render() {
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.onLeftClick()}
        >
          热门资讯
        </NavBar>
        <News></News>
      </div>
    );
  }
}
export default connect(
  state => ({
    ListType: state.newsTypes
  }),
  {
    setNewsType
  }
)(withRouter(HotList));
