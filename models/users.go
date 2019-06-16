package models

import (
	"crypto/sha256"
	"encoding/hex"
	"github.com/astaxie/beego/logs"
	"github.com/astaxie/beego/orm"
	"log"
	"math/rand"
	"time"
)

type User struct {
	Id            int       `json:"id"`
	Name          string    `json:"name"orm:"size(30);unique"`
	FullName      string    `json:"full_name"orm:"null;size(30)"`
	UserPwd       string    `json:"-"orm:"size(50);"`
	Salt          string    `json:"-"`
	Phone         string    `json:"phone"orm:"null;size(16)"`
	Email         string    `json:"email"orm:"null;size(256)"`
	CreateTime    time.Time `json:"create_time"orm:"auto_now_add;type(datetime)"`
	UpdateTime    time.Time `json:"update_time"orm:"null;type(datetime)"`
	LastLoginTime time.Time `json:"last_login_time"orm:"null;type(datetime)"`
	Avatar        string    `json:"avatar"orm:"null;size(256)"`
}

type LoginUser struct {
	UserName string `json:"username"`
	FullName string `json:"full_name"`
	Password string `json:"password"`
	Phone    string `json:"phone"`
	Email    string `json:"email"`
	Avatar   string `json:"avatar"`
}

type UserPermissions struct {
	Role string `json:"role,omitempty"`
}

type UserAuthInfo struct {
	Id          int             `json:"id,omitempty"`
	Username    string          `json:"username,omitempty"`
	Permissions UserPermissions `json:"permissions,omitempty"`
	Avatar      string          `json:"avatar,omitempty"`
}

type UserStatus struct {
	Message string       `json:"message,omitempty"`
	Success bool         `json:"success"`
	User    UserAuthInfo `json:"user,omitempty"`
}

type UserListDetails struct {
	Data  []User `json:"data"`
	Total int    `json:"total"`
}

const SaltSize = 16

func Sha256Salt(password string, salt string) (string, string) {
	var hashStr string
	_salt := []byte{}
	if salt == "" {
		key := "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}[]:;"
		bytes := []byte(key)
		r := rand.New(rand.NewSource(time.Now().UnixNano()))
		for i := 0; i < SaltSize; i++ {
			_salt = append(_salt, bytes[r.Intn(len(bytes))])
		}
	} else {
		_salt = []byte(salt)
	}
	buffer := sha256.New()
	buffer.Write([]byte(password))
	buffer.Write([]byte(_salt))
	hashbytes := buffer.Sum(nil)
	hashStr = hex.EncodeToString(hashbytes)
	return hashStr, string(_salt)
}

func CreateUser(newUser LoginUser) UserStatus {
	o := orm.NewOrm()
	if err := o.Using("default"); err != nil {
		log.Fatal("数据库异常，连接(default)不存在")
		logs.Error(err)
		return UserStatus{Message: err.Error(), Success: false}
	} else {
		var u User
		err := o.Raw("select id,name from user where name=?", &newUser.UserName).QueryRow(&u)
		if err == orm.ErrNoRows && u.Name == "" {
			var user User
			user.Name = newUser.UserName
			user.FullName = newUser.FullName
			user.Avatar = newUser.Avatar
			user.Email = newUser.Email
			user.Phone = newUser.Phone
			hash, salt := Sha256Salt(newUser.Password, "")
			user.UserPwd = hash
			user.Salt = salt
			logs.Info(user)
			_, err = o.Insert(&user)
			if err != nil {
				logs.Error("创建用户失败")
				logs.Error(err)
				return UserStatus{Message: err.Error(), Success: false}
			} else {
				return UserStatus{Success: true}
			}
		} else if u.Name != "" {
			logs.Error("用户已存在")
			return UserStatus{Message: "用户已存在", Success: false}
		} else {
			logs.Error(err)
			return UserStatus{Message: "未知异常", Success: false}
		}
	}
}
func UserLogin(user LoginUser) UserStatus {
	var u User
	o := orm.NewOrm()
	var status UserStatus
	err := o.Raw("select id,name,user_pwd,salt from user where name=?", &user.UserName).QueryRow(&u)
	if err == orm.ErrNoRows {
		logs.Error("用户名不存在")
	} else if u.Name != "" {
		hash, _ := Sha256Salt(user.Password, u.Salt)
		if hash == u.UserPwd {
			status.Success = true
			return status
		}
	} else {
		logs.Error("未知异常")
		logs.Error(err)
	}
	status.Success = false
	status.Message = "Login Bad!"
	return status
}
func GetUserInfo(userName string) UserStatus {
	var u UserStatus
	o := orm.NewOrm()
	if userName != "" {
		err := o.Raw("select id,name as username,avatar from user where name=?", &userName).QueryRow(&u.User)
		if err == orm.ErrNoRows {
			logs.Error("用户名不存在")
			u.Message = "Not Login"
		} else if u.User.Username != "" {
			u.Success = true
			u.User.Permissions = UserPermissions{Role: "admin"}
		} else {
			logs.Error("未知异常")
			logs.Error(err)
			u.Message = "Not Login"
		}
	} else {
		u.Success = false
	}
	return u
}

func GetUserList() UserListDetails {
	o := orm.NewOrm()
	userListDetail := UserListDetails{}
	skip := 0
	limit := 10
	_, err := o.Raw("select id,name,full_name,email,phone,create_time,avatar as username,avatar from user limit ?,?", skip, limit).QueryRows(&userListDetail.Data)
	if err == nil {
		logs.Error("查询用户信息失败")
	}
	//userListDetail.Data = append(userListDetail.Data, User{
	//	Id:         0,
	//	Name:       "admin",
	//	FullName:   "Administrator",
	//	Email:      "sunlinyao@wangpos.com",
	//	Phone:     "18728781041",
	//	CreateTime: time.Now(),
	//	Avatar:     "https://randomuser.me/api/portraits/women/44.jpg",
	//})
	userListDetail.Total = len(userListDetail.Data)
	return userListDetail
}

func GetUserDetail(uid string) User {
	o := orm.NewOrm()
	userDetail := User{}
	skip := 0
	limit := 10
	err := o.Raw("select id,name,full_name,email,phone,create_time,avatar as username,avatar from user limit ?,?", skip, limit).QueryRow(&userDetail)
	if err == nil {
		logs.Error("查询用户信息失败")
	}
	return userDetail
}
