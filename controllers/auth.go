package controllers

import (
	"encoding/json"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/logs"
	"github.com/virnet/microcd/models"
)

type UserController struct {
	beego.Controller
}

type UserLoginController struct {
	beego.Controller
}
type UserLogoutController struct {
	beego.Controller
}

func (this *UserController) Get() { // 判断是否登录
	// 登录成功: {"success":true,"user":{"id":0,"username":"admin","permissions":{"role":"admin"},"avatar":"https://randomuser.me/api/portraits/men/35.jpg"}}
	// 登录失败: {"message":"Not Login"}
	userName := this.GetSession("loginUser")
	switch userName.(type) {
	case string:
		this.Data["json"] = models.GetUserInfo(userName.(string))
		this.ServeJSON()
	default:
		this.Ctx.WriteString("")
	}
}

func (this *UserLoginController) Post() {
	// 登录成功 {"success":true,"message":"Ok"}
	//
	var loginUser models.LoginUser
	body := this.Ctx.Input.RequestBody
	if err := json.Unmarshal(body, &loginUser); err != nil {
		logs.Error("参数错误")
		logs.Info(body)
		logs.Error(err)
	}
	status := models.UserLogin(loginUser)
	this.Data["json"] = status
	if status.Success {
		this.SetSession("loginUser", loginUser.UserName)
	}
	this.ServeJSON()
}
func (this *UserLogoutController) Get() {
	this.DelSession("loginUser")
	this.Ctx.WriteString("")
}
