/*
	Tenant API in Go (Version 3)
	Uses MongoDB
*/
	
package main


type Tenants struct {
    User_name string `json:"user_name"`              
    Tenant_name string `json:"tenant_name"` 
    Tenant_id string `json:"tenant_id"`
    Password string `json:"password"`
    Orders []Orders `json:"orders"`
}

type Orders struct {
	Order_id string `json:"order_id"`
	Items []Items `json:"items"`
}

type Items struct {
	Name string `json:"name"`
	Amount int `json:"amount"`
	Description string `json:"description"`
	Image_url string `json:"image_url"`
	Count int `json:"count"`
}


type User struct {
	ID string `json:"id"`
	Email string `json:"email"`
	Tenants []Tenants `json:"tenants"`
}


