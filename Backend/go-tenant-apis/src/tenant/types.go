/*
	Tenant API in Go (Version 3)
	Uses MongoDB
*/
	
package main


type Products struct {
    Name string `json:"name"`              
    Amount string `json:"amount"` 
    Description string `json:"description"`
    Image string `json:"image"`
}


type Tenant struct {
	ID string `json:"id"`
	Name string `json:"name"`
	Image string `json:"image"`
	Products []Products `json:"products"`
}
