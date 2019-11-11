import React, { lazy, Suspense } from "react";
import Load from "../components/puclic/loading.js";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import "./router.css";
import "../css/common.css";

const Loading = <Load></Load>;
const Main = lazy(() => import("../components/view/main/main.js"));
const HotList = lazy(() => import("../components/view/hotList/hotList.js"));
const Forecast = lazy(() => import("../components/view/expert/forecast.js"));
const PostDetail = lazy(() => import("../components/puclic/postDetail"));
// const Notice = lazy(() => import("../notice/notice"));
// const Login = lazy(() => import("../personal/login/login"));
// const Register = lazy(() => import("../personal/register/register"));
const ReadyMain = () => (
  <Suspense fallback={Loading}>
    <Main />
  </Suspense>
);
//热门资讯
const ReadyHotList = () => (
  <Suspense fallback={Loading}>
    <HotList />
  </Suspense>
);
// 专家预测
const ReadyForecast = () => (
  <Suspense fallback={Loading}>
    <Forecast />
  </Suspense>
);
// 帖子详情
const ReadyPostDetail = () => (
  <Suspense fallback={Loading}>
    <PostDetail />
  </Suspense>
);
// const ReadyRegister = () => (
//   <Suspense fallback={Loading}>
//     <Register />
//   </Suspense>
// );
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/main" component={ReadyMain}></Route>
          <Route path="/hot" component={ReadyHotList}></Route>
          <Route path="/fore" component={ReadyForecast}></Route>
          <Route path="/postDetail" component={ReadyPostDetail}></Route>

          {/* <Route path="/release" component={ReadyRelease}></Route>
          <Route path="/notice" component={ReadyNotice}></Route>
          <Route path="/login" component={ReadyLogin}></Route>
          <Route path="/register" component={ReadyRegister}></Route> */}
          <Redirect to="/main"></Redirect>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
