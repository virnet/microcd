package models

import (
	"github.com/astaxie/beego/logs"
	"github.com/astaxie/beego/orm"
	"time"
)

type CompletedData struct {
	Date         time.Time `json:"date"`
	UserComplete int       `json:"user_complete"`
	TeamComplete int       `json:"team_complete"`
}
type TaskData struct {
	StartTime  time.Time `json:"start_time"`
	UpdateTime time.Time `json:"update_time"`
	Project    string    `json:"project"`
	Version    string    `json:"version"`
	Status     int       `json:"status"`
}
type NumberCardData struct {
	Icon   string `json:"icon"`
	Color  string `json:"color"`
	Title  string `json:"title"`
	Number int    `json:"number"`
}

type DashboardData struct {
	Completed []CompletedData  `json:"completed"`
	Task      []TaskData       `json:"task"`
	Numbers   []NumberCardData `json:"numbers"`
}

type Menu struct {
	Id           int    `json:"id"`
	Name         string `json:"name"orm:"size(50);unique"`
	Icon         string `json:"icon"orm:"size(50)"`
	Route        string `json:"route"orm:"size(50)"`
	ZhName       string `json:"zhName"orm:"size(50)"`
	MenuParentId int    `json:"menuParentId"`
	I18n         string `json:"i18n"orm:"size(1000)"`
}

func GetMenuInfo() []Menu {
	var menus []Menu
	o := orm.NewOrm()
	if _, err := o.Raw("select id,name,icon,route,zh_name,menu_parent_id,i18n from menu").QueryRows(&menus); err != nil {
		logs.Error("菜单获取失败")
		logs.Error(err)
	}
	return menus
}

func GetDashboardData() DashboardData {
	var complete []CompletedData
	complete = append(complete, CompletedData{time.Date(2019, 04, 01, 0, 0, 0, 0, time.Local), 32, 122})
	complete = append(complete, CompletedData{time.Date(2019, 04, 02, 0, 0, 0, 0, time.Local), 55, 99})
	complete = append(complete, CompletedData{time.Date(2019, 04, 03, 0, 0, 0, 0, time.Local), 22, 152})
	complete = append(complete, CompletedData{time.Date(2019, 04, 04, 0, 0, 0, 0, time.Local), 13, 130})
	complete = append(complete, CompletedData{time.Date(2019, 04, 05, 0, 0, 0, 0, time.Local), 23, 182})
	var numberCard []NumberCardData
	numberCard = append(numberCard, NumberCardData{"team", "#8fc9fb", "今日构建数", 121})
	numberCard = append(numberCard, NumberCardData{"message", "#d897eb", "消息", 5})
	numberCard = append(numberCard, NumberCardData{"task", "#f69899", "进行中的任务", 5})
	numberCard = append(numberCard, NumberCardData{"project", "#64ea91", "项目数", 99})
	var task []TaskData
	task = append(task, TaskData{time.Now(), time.Now(), "WeiposAcc", "2.10.2.2422", 1})
	task = append(task, TaskData{time.Now(), time.Now(), "cashier", "3.0.1.222", 5})
	return DashboardData{
		Completed: complete,
		Task:      task,
		Numbers:   numberCard,
	}
}
