import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { connect } from "react-redux";
import relativeTime from "../../../../util/relative";
import { withRouter } from "react-router-dom";
import "./seconed.scss";
class Seconed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yName: "",
      hasMore: true,
      pageNum: 1,
      pageSize: 10,
      data: []
    };
  }
  // 获取下一页信息
  getMore = () => {
    this.$post("/community/list", {
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize
    }).then(res => {
      this.setState({
        yName: res.fileUrl,
        pageNum: this.state.pageNum + 1,
        hasMore: res.data.hasNextPage,
        data: this.state.data.concat(res.data.list)
      });
    });
  };

  componentDidMount() {}
  goPostDetail(id) {
    console.log(id);
    this.props.history.push({ pathname: "/postDetail", state: { postId: id } });
  }
  renderItemList(data) {
    const yName = this.state.yName;
    return (
      <ul>
        {data.map((el, i) => (
          <li key={i} onClick={() => this.goPostDetail(el.postId)}>
            {el.headUrl === null ? (
              <img
                src={require("../../../../image/defaultPic/tx-Q.png")}
                className="head"
              />
            ) : (
              <img src={yName + el.headUrl} className="head" />
            )}
            <em>{relativeTime(el.publishTime)}</em>
            <p className="comment">
              <i></i>
              <span>{el.commentNum}</span>
            </p>
            <p className="title">{el.title}</p>
            <p className="content">{el.content}</p>
            <div className="bottom">
              {el.thumbnail !== null &&
                el.thumbnail.map((item, index) => (
                  <div key={index}>
                    <img src={yName + item} />
                  </div>
                ))}
            </div>
          </li>
        ))}
      </ul>
    );
  }
  render() {
    const data = this.state.data;
    return (
      <div style={{ height: "calc(100vh - 60px)", overflow: "auto" }}>
        <InfiniteScroll
          className="list-contents"
          pageStart={1}
          loadMore={this.getMore.bind(this)}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
          useWindow={false}
          hasMore={this.state.hasMore}
        >
          {this.renderItemList(data)}
        </InfiniteScroll>
      </div>
    );
  }
}
export default connect(
  state => ({}),
  {}
)(withRouter(Seconed));
