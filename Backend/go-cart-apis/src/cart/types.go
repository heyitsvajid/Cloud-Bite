/*
	Order API in Go 
	Uses MongoDB
*/
	
package main


type CartPayload struct {
    Email_id string `json:"email_id"`              
    Tenant_id string `json:"tenant_id"`
    Items string `json:"items"`
}

type Items struct {
    Name string `json:"name"`
    Amount int `json:"amount"`
    Description string `json:"description"`
    Image string `json:"image_url"`
    Count int `json:"count"`
}