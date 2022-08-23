
let demoList = {
    status: 200,
    message: 'success',
    list: [{
        "id": 1,
        "name": "张三",
        "money": 123,
        "address": "广东省东莞市长安镇",
        "state": "成功",
        "date": "2019-11-1",
        "thumb": "https://lin-xin.gitee.io/images/post/wms.png"
    },
    {
        "id": 2,
        "name": "李四",
        "money": 456,
        "address": "广东省广州市白云区",
        "state": "成功",
        "date": "2019-10-11",
        "thumb": "https://lin-xin.gitee.io/images/post/node3.png"
    },
    {
        "id": 3,
        "name": "王五",
        "money": 789,
        "address": "湖南省长沙市",
        "state": "失败",
        "date": "2019-11-11",
        "thumb": "https://lin-xin.gitee.io/images/post/parcel.png"
    },
    {
        "id": 4,
        "name": "赵六",
        "money": 1011,
        "address": "福建省厦门市鼓浪屿",
        "state": "成功",
        "date": "2019-10-20",
        "thumb": "https://lin-xin.gitee.io/images/post/notice.png"
    },
    {
        "id": 5,
        "name": "孙悟空",
        "money": 1022,
        "address": "广东省东莞市松山湖",
        "state": "成功",
        "date": "2020-10-1",
        "thumb": "https://lin-xin.gitee.io/images/post/wms.png"
    },
    {
        "id": 6,
        "name": "猪八戒",
        "money": 1033,
        "address": "广东省广州市荔枝区",
        "state": "成功",
        "date": "2020-02-22",
        "thumb": "https://lin-xin.gitee.io/images/post/node3.png"
    }],
    pageTotal: 6
};

export default {
    //'get|/parameter/query': demoList,
    // 也可以这样写
    // 官方解释为：记录用于生成响应数据的函数。当拦截到匹配 rurl 和 rtype 的 Ajax 请求时，函数 function(options) 将被执行，并把执行结果作为响应数据返回。
    'get|/parameter/tableList': (option) => {
        // 可以在这个地方对demoList2进行一系列操作，例如增删改
        // option 指向本次请求的 Ajax 选项集，含有 url、type 和 body 三个属性
        return {
            status: 200,
            message: 'success',
            data: demoList
        };
    }
}
