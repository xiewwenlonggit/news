import React from "react";
import First from "./fistPage/first";
import Seconed from "./seconedPage/seconed";
import "./main.scss";
import { TabBar } from "antd-mobile";
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // selectedTab: "blueTab",
      selectedTab: "redTab",
      hidden: false,
      fullScreen: false
    };
  }
  // 获取最新资讯
  renderContent(pageText) {
    return (
      <div
        style={{
          backgroundColor: "white",
          height: "100%",
          textAlign: "center"
        }}
      >
        {/* <div style={{ paddingTop: 60 }}>
          Clicked “{pageText}” tab， show “{pageText}” information
        </div>
          Click to switch fullscreen
        </a> */}
        {pageText === "Life" && <First></First>}
        {pageText === "Koubei" && <Seconed></Seconed>}
      </div>
    );
  }
  render() {
    return (
      <div
        style={
          this.state.fullScreen
            ? { position: "fixed", height: "100%", width: "100%", top: 0 }
            : { height: "100%" }
        }
      >
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="首页"
            key="Life"
            icon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(" +
                    require("../../../image/pic/icon-shouye.png") +
                    ") center center /  21px 21px no-repeat"
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(" +
                    require("../../../image/pic/shouye.png") +
                    ") center center /  21px 21px no-repeat"
                }}
              />
            }
            selected={this.state.selectedTab === "blueTab"}
            onPress={() => {
              this.setState({
                selectedTab: "blueTab"
              });
            }}
            data-seed="logId"
          >
            {this.renderContent("Life")}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(" +
                    require("../../../image/pic/icon-shequ.png") +
                    ") center center /  21px 21px no-repeat"
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(" +
                    require("../../../image/pic/shequ.png") +
                    ") center center /  21px 21px no-repeat"
                }}
              />
            }
            title="社区"
            key="Koubei"
            selected={this.state.selectedTab === "redTab"}
            onPress={() => {
              this.setState({
                selectedTab: "redTab"
              });
            }}
            data-seed="logId1"
          >
            {this.renderContent("Koubei")}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat"
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat"
                }}
              />
            }
            title="Friend"
            key="Friend"
            dot
            selected={this.state.selectedTab === "greenTab"}
            onPress={() => {
              this.setState({
                selectedTab: "greenTab"
              });
            }}
          >
            {/* {this.renderContent("Friend")} */}
          </TabBar.Item>
          <TabBar.Item
            icon={{
              uri:
                "https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg"
            }}
            selectedIcon={{
              uri:
                "https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg"
            }}
            title="My"
            key="my"
            selected={this.state.selectedTab === "yellowTab"}
            onPress={() => {
              this.setState({
                selectedTab: "yellowTab"
              });
            }}
          >
            {/* {this.renderContent("My")} */}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}
export default Main;
