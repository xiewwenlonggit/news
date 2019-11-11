import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
class PostDetail extends Component {
  constructor(props) {
    super(props);
    let postId;
    if (this.props.location.state) {
      //判断当前有参数
      sessionStorage.setItem("pId", this.props.location.state.postId); // 存入到sessionStorage中
    } else {
      postId = sessionStorage.getItem("pId"); // 当state没有参数时，取sessionStorage中的参数
    }

    this.state = {
      id: postId
    };
  }
  componentDidMount() {
    this.getInfos();
  }
  async getInfos() {
    await Promise.all([this.getComment(), this.getAtten()]);
  }
  getComment() {}
  getAtten() {}
  render() {
    return (
      <div>
        <p>详情页</p>
        <img src="" alt="" />
      </div>
    );
  }
}
export default connect(
  state => ({}),
  {}
)(withRouter(PostDetail));
