import React from "react";
import Cal from "../carousel";
import News from "../../../puclic/newsList";
import { setNewsType } from "../../../../redux/action";
import ReletiveTime from "../../../../util/relative";
import { connect } from "react-redux";
import "./first.scss";
class First extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yName: "",
      uid: "",
      attenNewsList: [],
      topList: [],
      timer: null
    };
    this.props.setNewsType("top");
  }

  componentDidMount() {
    this.getTopNews();
    this.setState({
      timer: setInterval(() => {
        this.getTopNews();
      }, 60000)
    });
  }
  componentWillUnmount() {
    clearInterval(this.state.timer);
  }
  // 获取置顶资讯
  async getTopNews() {
    const res = await this.$post("/headline/stick-postinfos", {
      uid: this.state.uid,
      limit: 2
    });
    if (res.code === 200) {
      this.setState({
        attenNewsList: res.data.specialPostInfos,
        topList: res.data.stickyPostInfos,
        yName: res.fileUrl
      });
    }
  }

  render() {
    const attenNewsList = this.state.attenNewsList;
    const TopList = this.state.topList;
    const yName = this.state.yName;
    return (
      <div>
        <h1>三川彩票</h1>
        <Cal />
        <h2>置顶资讯</h2>
        <ul className="topNews">
          {attenNewsList.map((el, i) => (
            <li key={i}>
              <img src={yName + el.fileUrl} alt="" />
              <p>{el.title}</p>
              <span>{ReletiveTime(el.createDate)}</span>
            </li>
          ))}
          {TopList.map((item, index) => (
            <li key={index}>
              <img src={yName + item.fileUrl} alt="" />
              <p>{item.title}</p>
              <span>{ReletiveTime(item.createDate)}</span>
            </li>
          ))}
        </ul>
        <h3>最新资讯</h3>
        <News />
      </div>
    );
  }
}
export default connect(
  state => ({}),
  { setNewsType }
)(First);
