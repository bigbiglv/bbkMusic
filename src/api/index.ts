import axios from '@/utils/axios'

// test
export const test = () => {
    // 返回的数据格式可以和服务端约定
    return axios.get('/');
}

//登录
namespace Login {
  // 用户登录表单
  export interface LoginReqForm {
    username: string;
    password: string;
  }
  // 登录成功后返回的token
  export interface LoginResData {
    token: string
    userinfo: object
  }
}
// 用户登录
export const Login = (params: Login.LoginReqForm) => {
    // 返回的数据格式可以和服务端约定
    return axios.post<Login.LoginResData>('/user/login', params);
}

//搜索
namespace Search {
  export interface SearchReqForm {
    keywords: string
  }
  export interface SearchResData {
    result: Array<object>
    code: number
  }
}
export const Search = (params: Search.SearchReqForm) => {
    // 返回的数据格式可以和服务端约定
    return axios.get<Search.SearchResData>('/wy/search', params);
}

// 用户信息
namespace UserInfo {
  export interface UserInfoResData {
    result: Array<object>
    code: number
  }
}
export const UserInfo = () => {
  // 返回的数据格式可以和服务端约定
  return axios.get<UserInfo.UserInfoResData>('/user/userinfo');
}

//注册
namespace Register {
  export interface RegisterReqForm {
    username: string;
    password: string;
    email?: string;
    phone?: string;
  }
}
export const Register = (params: Register.RegisterReqForm) => {
  return axios.post('/user/register', params);
}