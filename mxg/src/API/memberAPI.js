import axios from './axios'
export default {
    // 获取列表
    getMemberList() {
        return axios.post('member/list/search/1/20')
    },
    // 数据查询
    inquireData(name) {
        return axios.post('member/list/search/1/20', name)
    },
    // 新增数据
    confirmData(data) {
        return axios.post('member',data)
    },
    // 编辑
    compileData(data) {
        return axios.put('supplier/10',data)
    },
    // 删除
    deleteData(id) {
        return axios.delete(`supplier/${id}`)
    }
}