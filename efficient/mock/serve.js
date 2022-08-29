let express = require('express')  //引入express
let Mock = require('mockjs')  //引入mock
const loginData = require('./common/login.json')
const loginsearch = require('./common/loginRead.json')
let app = express()  //实例化express

//登录接口
app.use('/user/login',function(req,res){
	console.log(req,'req');
	res.json(
		Mock.mock({
			status:200,
			msg:'登录成功',
			loginData
		})
	)
})

//登录日志
app.use('/home/loginsearch',function(req,res){
	res.json(
		Mock.mock({
			status:200,
			msg:'登录成功',
			loginsearch
		})
	)
})

app.listen('9999',()=>{
	console.log('监听端口 9999');
})
