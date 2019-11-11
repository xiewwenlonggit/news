import { GET_NEWS_TYPE, SET_NEWS_TYPE } from "./action-type";
// import { getMenu } from "../api";
// import { _BannerList } from "../server";

// export const getMore = data => ({ type: GET_MORELIST_DATA, data });
//得到彩种类别
export const getNewsType = data => ({
  type: GET_NEWS_TYPE,
  data
});
//设置彩种类别
export const setNewsType = data => ({
  type: SET_NEWS_TYPE,
  data
});

// 获取banner图列表
// export const getBannerList = data => ({
//   type: GET_BANNER,
//   data
// });
// export const getBanner = () => {
//   return async dispatch => {
//     let result = await _BannerList();
//     if (result.status === 200) {
//       dispatch(getBannerList(result.data.data));
//     }
//   };
// };

// // 获取内容区每日疯抢数据
// export const getMoreDatas = () => {
//   return async dispatch => {
//     // 异步获取数据
//     let result = await getMoreData();
//     // 判断状态码是否是成功的数据
//     if (result.code === 0) {
//       dispatch(getMore(result.data));
//     }
//   };
// };
