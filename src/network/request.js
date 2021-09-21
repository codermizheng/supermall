import axios from "axios";

//回调方法一
export function request(config) {
  //1. 创建axios的实例;
  const instance = axios.create({
    // baseURL: "http://123.207.32.32:8000",
    baseURL: "http://152.136.185.210:7878/api/hy66",
    timeout: 5000
  });
  //2.axios的拦截器
  //2.1.请求拦截器的作用
  // instance.interceptors.request.use(
  //   config => {
  //     console.log(config);
  //     return config;
  //   },
  //   err => {
  //     console.log(err);
  //   }
  // );
  // //   axios.interceptors.response.use;
  // // 2.2 响应拦截器
  // instance.interceptors.response.use(
  //   res => {
  //     return res.data;
  //   },
  //   err => {
  //     console.log(err);
  //   }
  // );
  //3. 发送真正的网络请求
  return instance(config);
}

// export function request(config) {
//   return new Promise((resolve, reject) => {
//     //创建axios的实例;
//     const instance = axios.create({
//       baseURL: "http://123.207.32.32:8000",
//       timeout: 5000
//     });
//     //发送真正的网络请求
//     instance(config)
//       .then(res => {
//         resolve(res);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// }

//回调方法二
// export function request(config) {
//   //创建axios的实例
//   const instance = axios.create({
//     baseURL: "http://123.207.32.32:8000",
//     timeout: 5000
//   });

//   //发送真正的网络请求
//   instance(config)
//     .then(res => {
//       success(res);
//     })
//     .catch(err => {
//       failure(err);
//     });
// }
