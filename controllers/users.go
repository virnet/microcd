package controllers

import (
	"encoding/json"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/logs"
	"github.com/virnet/microcd/models"
)

type UsersListController struct {
	beego.Controller
}

type UserDetailController struct {
	beego.Controller
}

func (this UsersListController) Get() {
	this.Data["json"] = models.GetUserList()
	this.ServeJSON()
}

func (this UserController) Post() {
	// 创建用户
	// /api/user
	// 请求数据： {"name":"aaa","nickName":"abc","isMale":true,"age":18,"phone":"15708270596","email":"sunlinyao@vip.qq.com","address":"北京 北京市 西城区"}
	// 响应数据: 无
	var newUser models.LoginUser
	body := this.Ctx.Input.RequestBody
	if err := json.Unmarshal(body, &newUser); err != nil {
		logs.Error("参数错误")
		logs.Info(body)
		logs.Error(err)
	}
	this.Data["json"] = models.CreateUser(newUser)

	this.ServeJSON()
}

func (this UserDetailController) Get() {
	// 获取用户详情
	// /api/user/:uid
	// 响应数据: {"id":"120000200705039321","name":"David Gonzalez","nick_name":"Lopez","mobile":"15706852357","email":"j.jbbsusoa@fobejiqf.mil","create_time":"1974-06-20 12:55:10","avatar":"https://pbs.twimg.com/profile_images/584098247641300992/N25WgvW_.png"}
	var uid = this.Ctx.Input.Param(":uid")
	this.Data["json"] = models.GetUserDetail(uid)
	this.ServeJSON()
}
