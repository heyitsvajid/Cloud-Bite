/*
	Gumball API in Go (Version 3)
	Process Order with Go Channels
	Removed Use of Mutex
*/

package main

type Burger struct {
	Id            int
	type  int8 int
	fills   []
	patty  string
}

var machine burger = Burger{
	Id:            1,
	type: "chicken",
	fills:   ["lettuce", "olives"]
	patty:  "chicken tikka",
}

type order struct {
	Id          string
	OrderStatus string
}

var orders map[string]order
var order_queue = make(chan string, 10)
var order_update = make(chan int, 1000)