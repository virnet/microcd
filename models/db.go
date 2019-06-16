package models

import (
	"encoding/json"
	"fmt"
	"github.com/astaxie/beego/config/yaml"
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
	"log"
)

type DBConfig struct {
	DBType     string
	ConnName   string
	DBHost     string `json:"host"`
	DBPort     int    `json:"port"`
	DBNAME     string `json:"dbname"`
	DBUserName string `json:"username"`
	DBPassword string `json:"password"`
	CharSet    string `json:"charset"`
}

func registerModel() {
	orm.RegisterModel(
		new(User),
		new(Menu),
	)
}
func init() {
	dbconf := DBConfig{
		DBType:     "mysql",
		ConnName:   "default",
		DBHost:     "localhost",
		DBPort:     3306,
		DBNAME:     "test",
		DBUserName: "root",
		DBPassword: "",
		CharSet:    "utf8",
	}
	conf, err := yaml.ReadYmlReader("conf/micro.yaml")
	if err != nil {
		log.Fatal("数据库配置读取失败(配置文件异常)")
		log.Fatal(err)
	} else if _dbconf, ok := conf["mysql"]; ok {
		data, err := json.Marshal(_dbconf)
		if err != nil {
			log.Fatal("数据库配置读取失败(配置格式异常)!")
			log.Fatal(err)
		} else {
			err := json.Unmarshal([]byte(data), &dbconf)
			if err != nil {
				log.Println("数据库配置格式化异常!")
				log.Fatal(err)
			}
		}
	} else {
		log.Fatal("数据库配置读取失败(未找到数据库配置)!")
	}
	log.Println("数据库配置读取成功，初始化数据库连接!")

	if err := orm.RegisterDriver("mysql", orm.DRMySQL); err != nil {
		log.Fatal("注册数据库驱动失败!")
	}
	connStr := fmt.Sprintf("%v:%v@tcp(%v:%d)/%v?charset=%v",
		dbconf.DBUserName, dbconf.DBPassword, dbconf.DBHost, dbconf.DBPort, dbconf.DBNAME, dbconf.CharSet)
	fmt.Println(connStr)
	if err := orm.RegisterDataBase(dbconf.ConnName, dbconf.DBType, connStr); err != nil {
		log.Fatal("注册连接失败!")
	}
	//orm.RunSyncdb("default", false, true)
	registerModel()
	orm.RunCommand()
}
