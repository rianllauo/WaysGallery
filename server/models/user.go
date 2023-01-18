package models

type User struct {
	ID       int    `json:"id" gorm:"primary_key:auto_increment"`
	FullName string `json:"full_name" gorm:"type: varchar(255)"`
	Email    string `json:"email" gorm:"type: varchar(255)"`
	Password string `json:"password" gorm:"type: varchar(255)"`
	Greeting string `json:"greeting" gorm:"type: varchar(255)"`
	Avatar   string `json:"avatar" gorm:"type: varchar(255)"`
	Post     []Post `json:"post"`
	Arts     string `json:"arts" gorm:"type: varchar(255)"`
	// Images   ImagesResponse `json:"images" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type UsersProfileResponse struct {
	ID       int    `json:"id"`
	FullName string `json:"full_name" gorm:"type: varchar(255)"`
	Email    string `json:"email" gorm:"type: varchar(255)"`
}

func (UsersProfileResponse) TableName() string {
	return "users"
}
