/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { PullToRefresh, ListView, Toast } from "antd-mobile";
import { connect } from "react-redux";
import React from "react";
class NewsList extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    this.state = {
      yName: "",
      dataSource,
      datas: [],
      pageIndex: 1,
      refreshing: true,
      isLoading: true,
      useBodyScroll: false,
      dataBlobs: {},
      sectionIDs: [],
      rowIDs: [],
      dataArr: [] //关键代码
    };
  }
  async genData(ref = false) {
    //获取数据
    const res = await this.getNewsData();
    let that = this;
    that.setState({
      yName: res.fileUrl
    });
    if (parseInt(res.code) === 200) {
      const lg = res.data.list.length;
      if (lg <= 0) {
        Toast.info("没有数据了~", 1);
        return false;
      }
      let dataArr = that.state.dataArr; //关键代码
      let m = that.state.datas;
      for (let i = 0; i < lg; i++) {
        //每一次读取的数据都进行保存一次
        dataArr.push(`row - ${that.state.pageIndex * lg + i}`);
        m.push(res.data.list[i]);
      }
      if (ref) {
        //这里表示刷新使用
        that.setState({
          datas: res.data.list,
          pageIndex: that.state.pageIndex + 1,
          dataSource: that.state.dataSource.cloneWithRows(dataArr),
          refreshing: false,
          isLoading: false,
          //保存数据进state
          dataArr: dataArr
        });
      } else {
        //这里表示上拉加载更多
        that.rData = { ...that.rData, ...dataArr };
        that.setState({
          datas: m,
          pageIndex: that.state.pageIndex + 1,
          dataSource: that.state.dataSource.cloneWithRows(that.rData),
          refreshing: false,
          isLoading: false,
          //保存数据进state
          dataArr: dataArr
        });
      }
    } else {
      Toast.info(res.msg, 1);
    }
  }
  getNewsData() {
    const types = this.props.types;
    if (types.value === "top") {
      return this.$post("/headline/newest-postinfos", {
        pageNo: this.state.pageIndex,
        pageSize: 5
      });
    } else {
      return this.$post("/information/hot-postinfos", {
        pageNum: this.state.pageIndex,
        pageSize: 5
      });
    }
  }

  componentDidUpdate() {}

  componentDidMount() {
    this.genData(true);
  }
  onRefresh = () => {
    let that = this;
    this.setState({ refreshing: true, isLoading: true, pageIndex: 1 });
    setTimeout(() => {
      that.genData(true);
    }, 2000);
  };
  onEndReached = event => {
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    this.setState({ isLoading: true, pageIndex: this.state.pageIndex + 1 });
    let that = this;
    setTimeout(() => {
      that.genData(false);
    }, 1000);
  };
  //这下面的代码跟官网没啥区别，唯一不同的是把外部定义的数据都保存进了state
  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: "#F5F5F9",
          height: 8,
          borderTop: "1px solid #ECECED",
          borderBottom: "1px solid #ECECED"
        }}
      />
    );
    let index = this.state.datas.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = this.state.datas.length - 1;
      }
      const obj = this.state.datas[index--];
      return (
        <div
          key={rowID}
          style={{
            padding: "0 15px",
            backgroundColor: "white",
            height: "6rem"
          }}
        >
          <div
            style={{
              height: "50px",
              lineHeight: "50px",
              color: "#888",
              fontSize: "12px",
              width: "200px",
              overflow: "hidden",
              float: "right"
            }}
          >
            {obj.title}
          </div>
          <div
            style={{ display: "-webkit-box", display: "flex", padding: "15px" }}
          >
            <img
              style={{ height: "63px", width: "63px", marginRight: "15px" }}
              src={this.state.yName + obj.fileUrl}
              alt=""
            />
          </div>
        </div>
      );
    };
    return (
      <div style={{ paddingBottom: "60px" }}>
        <ListView
          key={this.state.useBodyScroll ? "0" : "1"}
          ref={el => (this.lv = el)}
          dataSource={this.state.dataSource}
          renderFooter={() => (
            <div style={{ padding: 30, textAlign: "center" }}>
              {this.state.isLoading ? "Loading..." : "Loaded"}
            </div>
          )}
          renderRow={row}
          renderSeparator={separator}
          useBodyScroll
          style={
            this.state.useBodyScroll
              ? {}
              : {
                  border: "1px solid #ddd",
                  margin: "5px 0"
                }
          }
          pullToRefresh={
            <PullToRefresh
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          onEndReachedThreshold={1000}
          onEndReached={this.onEndReached}
          pageSize={5}
        />
      </div>
    );
  }
}
export default connect(
  state => ({
    types: state.newsTypes
  }),
  {}
)(NewsList);
