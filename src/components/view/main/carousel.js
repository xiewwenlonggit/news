import { Carousel, WingBlank, NoticeBar } from "antd-mobile";
import React from "react";
import "./carousel.scss";
import { Link } from "react-router-dom";

export default class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      data: ["1", "2", "3"],
      imgHeight: 176,
      yName: "",
      openInfos: [],
      lastNews: []
    };
  }

  componentDidMount() {
    this.getBannerList();
    this.getDrawInfos();
  }
  // 得到banner
  async getBannerList() {
    const res = await this.$post("/headline/banners", {});
    let elData = res.data;
    if (res.code === 200) {
      this.setState({
        data: elData,
        yName: res.fileUrl
      });
    }
  }
  // 得到开奖信息
  async getDrawInfos() {
    const res = await this.$post("/headline/lotterys", {
      uid: this.state.uid,
      limit: 5
    });
    if (res.code === 200) {
      this.setState({
        openInfos: res.data
      });
    }
  }

  // 页面跳转
  render() {
    const yName = this.state.yName;
    const openList = this.state.openInfos;
    return (
      <div>
        <WingBlank>
          <Carousel autoplay={true} infinite>
            {this.state.data.map(val => (
              <a
                key={val}
                href="http://www.alipay.com"
                style={{
                  display: "inline-block",
                  width: "100%",
                  height: this.state.imgHeight
                }}
              >
                <img
                  src={`${yName + val.fileUrl}`}
                  alt=""
                  style={{ width: "100%", verticalAlign: "top" }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event("resize"));
                    this.setState({ imgHeight: "auto" });
                  }}
                />
              </a>
            ))}
          </Carousel>
        </WingBlank>
        <ul className="tip">
          <Link to="/hot" style={{ color: "black" }}>
            <img src={require("../../../image/main/hot.png")} alt="" />
            <p>热门资讯</p>
          </Link>
          <Link to="/fore" style={{ color: "black" }}>
            <img src={require("../../../image/main/forecast.png")} alt="" />
            <p>专家预测</p>
          </Link>
          <li onClick={() => this.getSpecial()}>
            <img src={require("../../../image/main/special.png")} alt="" />
            <p>专题</p>
          </li>
        </ul>

        <NoticeBar marqueeProps={{ loop: true, style: { padding: "0 7.5px" } }}>
          Notice: The arrival time of incomes and transfers of Yu &#39;E Bao
          will be delayed during National Day.
        </NoticeBar>
        {openList.length > 0 && (
          <WingBlank>
            <Carousel
              className="my-carousel"
              vertical
              dots={false}
              dragging={false}
              swiping={false}
              autoplay
              infinite
            >
              {openList.map(el => (
                <div key={el.id} className="v-item">
                  <ul>
                    {el.lotteryFullNo.split("-").map((item, key) => (
                      <li key={key}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Carousel>
          </WingBlank>
        )}
      </div>
    );
  }
}
