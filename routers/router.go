package routers

import (
	"github.com/astaxie/beego"
	"github.com/virnet/microcd/controllers"
)

func init() {
	beego.Router("/", &controllers.MainController{})
	beego.Router("/api/user", &controllers.UserController{})
	beego.Router("/api/user/:uid:int", &controllers.UserDetailController{})
	beego.Router("/api/user/login", &controllers.UserLoginController{})   // 什么都不返回
	beego.Router("/api/user/logout", &controllers.UserLogoutController{}) // 什么都不返回
	beego.Router("/api/routes", &controllers.MenuController{})
	beego.Router("/api/users", &controllers.UsersListController{})
	beego.Router("/api/dashboard", &controllers.DashboardController{})

}
