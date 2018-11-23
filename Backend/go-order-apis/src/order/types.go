/*
	Order API in Go 
	Uses MongoDB
*/
	
package main


type Items struct {
    Name string `json:"name"`              
    Amount string `json:"amount"` 
    Description string `json:"description"`
    Image string `json:"image"`
}

type Order struct {
    Tenant_id string `json:"name"`              
    User_id string `json:"amount"` 
    Items
}

//{"tenant_id": 123, "user_id": 456, "items": [{name, amount, description, image_url, count}]}
