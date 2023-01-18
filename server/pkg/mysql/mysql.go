package mysql

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func DatabaseInit() {
	var err error
	dsn := "root:@tcp(containers-us-west-199.railway.app:7519)/railway?charset=utf8mb4&parseTime=True&loc=Local"
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	// mysql://root:VhyUH0UaMDt9F2pjENLg@containers-us-west-199.railway.app:7519/railway
	if err != nil {
		panic(err)
	}

	fmt.Println("Connected to Database")
}
