/*
	Order API in Go 
	Uses MongoDB
*/
	
package main


type CartPayload struct {
    email_id string `json:"email_id"`              
    tenant_id string `json:"tenant_id"`
    Items []Items `json:"items"`
}

type Items struct {
    Name string `json:"name"`
    Amount int `json:"amount"`
    Description string `json:"description"`
    Image string `json:"image_url"`
    Count int `json:"count"`
}