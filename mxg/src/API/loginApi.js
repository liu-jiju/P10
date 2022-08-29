import axios from './axios'
export default{
    // 登录
    login(){
        return axios.post('user/login')
    },
    // token
    token(){
        return axios.get('user/info?token=admin')
    },
    // 修改密码
    amend(){
        return axios.post('user/pwd')
    }
}