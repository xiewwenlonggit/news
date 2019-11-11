import axios from "axios";
import crypto from "./util/crypto";

import { Component } from "react";
axios.defaults.headers.post["Content-Type"] = "application/json";
let base = "/api";

// 请求前拦截
axios.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    console.log("请求超时");
    return Promise.reject(err);
  }
);

// 返回后拦截
axios.interceptors.response.use(
  data => {
    return data;
  },
  err => {
    if (err.response.status === 504 || err.response.status === 404) {
      console.log("服务器被吃了⊙﹏⊙∥");
    } else if (err.response.status === 401) {
      console.log("登录信息失效⊙﹏⊙∥");
    } else if (err.response.status === 500) {
      console.log("服务器开小差了⊙﹏⊙∥");
    }
    return Promise.reject(err);
  }
);

// @RequestBody请求
const postRequestBody = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    console.log(params);
    axios
      .post(`${base}${url}`, crypto.Encrypt(JSON.stringify(params)))
      .then(res => {
        resolve(crypto.Decrypt(res.data));
      })
      .catch(err => {
        reject(err);
      });
  });
};

// @RequsetParam请求
const postRequestParam = (url, params) => {
  return axios({
    method: "post",
    url: `${base}${url}`,
    data: params,
    transformRequest: [
      function(data) {
        let ret = "";
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret;
      }
    ],
    headers: {
      "Content-Type": "application/json"
    }
  });
};

const get = url => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `${base}${url}`
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const multiple = function(requsetArray, callback) {
  axios.all(requsetArray).then(axios.spread(callback));
};

Component.prototype.get = get;
Component.prototype.$post = postRequestBody;
Component.prototype.postRequestParam = postRequestParam;
Component.prototype.multiple = multiple;

// axios.defaults.baseURL = "http://192.168.10.89:3000/api";
// axios.defaults.headers.post["Content-Type"] = "application/json";
// // 获取banner
// let params = crypto.Encrypt(JSON.stringify(data));
// export function _BannerList(data) {
//   return axios.post("/headline/banners", params);
// }
// // 获取开奖信息
// export function _DrawInfos(data) {
//   return axios.post("/headline/lotterys", params);
// }
// //获取置顶资讯
// export function _TopNews(data) {
//   return axios.post("/headline/stick-postinfos", params);
// }
// // 获取最新资讯
// export function _LatestNews(data) {
//   return axios.post("/headline/newest-postinfos", params);
// }
// // 获取热门资讯
// export function _hotNews(data) {
//   return axios.post("/information/hot-postinfos", params);
// }
