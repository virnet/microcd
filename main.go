package main

import (
	"github.com/astaxie/beego"
	_ "github.com/virnet/microcd/routers"
)

func main() {
	beego.Run()
}
