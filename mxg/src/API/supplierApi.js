import axios from './axios'
export default {
    // 获取列表
    tableDatas() {
        return axios.post('staff/list/search/1/10')
    },
    // 数据查询
    // inquireData(name,linkman,mobile){
    //     return axios.post('staff/list/search/1/10')
    // },
    // 新增数据
    addRoles() {
        return axios.post('staff')
    },
    // 编辑
    doEdit() {
        return axios.put('staff/10')
    },
    // 删除
    remove() {
        return axios.delete('staff/10')
    },
    // 获取总数据
    list(pageNum, pageSize) {
        return axios.post(`/goods/list/search/${pageNum}/${pageSize}`)
    },
    // 添加数据
    addLists(addForm) {
        return axios.post('goods', addForm)
    },
    // 获取编辑数据
    editList(id) {
        return axios.get(`goods/${id}`)
    },
    // 编辑
    editLists(id, addForm) {
        return axios.put(`goods/${id}`, addForm)
    },
    // 删除
    delList(id) {
        return axios.delete(`goods/${id}`)
        // 获取列表
    },
    getSupplierList() {
        return axios.post('supplier/list/search/1/10')
    },
    // 数据查询
    inquireData() {
        return axios.post('supplier/list/search/1/10')
    },
    // 新增数据
    confirmData() {
        return axios.post('supplier')
    },
    // 编辑
    compileData() {
        return axios.put('supplier/10')
    },
    // 删除
    deleteData() {
        return axios.delete('supplier/10')
    },

}