package hireddto

type HiredRequest struct {
	Title       string `json:"title" gorm:"type: varchar(255)" form:"title"`
	Description string `json:"description" gorm:"type: text" form:"description"`
	StartDate   string `json:"start_date" form:"start_date"`
	EndDate     string `json:"end_date" form:"end_date"`
	Price       int    `json:"price" form:"price"`
	OrderById   int    `json:"order_byId" form:"order_by_id"`
	// OrderBy     UsersProfileResponse `json:"order_by"`
	OrderToId int `json:"order_toId" form:"order_toId"`
	// OrderTo     UsersProfileResponse `json:"order_to"`
	Status string `json:"status" form:"status"`
}
