/*
	Gumball API in Go
	Uses MySQL & Riak KV
*/

package main

import (
	"fmt"
	"log"
	"net/http"
	"time"
	"github.com/zegl/goriak"
	"encoding/json"
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"
	"github.com/unrolled/render"
	_ "github.com/go-sql-driver/mysql"
)

/*
	Go's SQL Package:  
		Tutorial: http://go-database-sql.org/index.html
		Reference: https://golang.org/pkg/database/sql/
		var mysql_connect = "root:cmpe281@tcp(127.0.0.1:3306)/cmpe281"
		var mysql_connect = "root:cmpe281@tcp(mysql:3306)/cmpe281"
	Go Rest Client:
		Tutorial:	https://medium.com/@marcus.olsson/writing-a-go-client-for-your-restful-api-c193a2f4998c
		Reference:	https://golang.org/pkg/net/http/
		var server1 = "http://localhost:7000"
		var server2 = "http://localhost:7001"
		var server3 = "http://localhost:7002"
		var server1 = "http://gumball_member_1:8098"
		var server2 = "http://gumball_member_2:8098"
		var server3 = "http://gumball_member_3:8098"
	Go Get Environment Settings:
		mysql_connect = os.Getenv("MYSQL")
		server1 = os.Getenv("RIAK1")
		server2 = os.Getenv("RIAK2")
		server3 = os.Getenv("RIAK3")
	Set Localhost Environment:
	
		export MYSQL="root:cmpe281@tcp(127.0.0.1:3306)/cmpe281"
		export RIAK1="http://localhost:7000"
		export RIAK2="http://localhost:7001"
		export RIAK3="http://localhost:7002"
*/

/* MySQL */
var mysql_connect = "" // set in environment

/* Riak REST Client */
var debug = true
var server1 = "" // set in environment
var server2 = "" // set in environment
var server3 = "" // set in environment

var con, err = goriak.Connect(goriak.ConnectOpts{Address: "35.162.234.7"})

type Client struct {
	Endpoint string
	*http.Client
}

type User struct {
	ID   int
	Name string
}

var tr = &http.Transport{
	MaxIdleConns:       10,
	IdleConnTimeout:    30 * time.Second,
	DisableCompression: true,
}

func NewClient(server string) *Client {
	return &Client{
		Endpoint:  	server,
		Client: 	&http.Client{Transport: tr},
	}
}

// NewServer configures and returns a Server.
func NewServer() *negroni.Negroni {
	formatter := render.New(render.Options{
		IndentJSON: true,
	})
	n := negroni.Classic()
	mx := mux.NewRouter()
	initRoutes(mx, formatter)
	n.UseHandler(mx)
	return n
}

// Init Database Connections

func init() {
  
}


// API Routes
func initRoutes(mx *mux.Router, formatter *render.Render) {
	//mx.HandleFunc("/ping", pingHandler(formatter)).Methods("GET")
	mx.HandleFunc("/tenant/user/cart", addItemsToCartHandler(formatter)).Methods("POST")
	//mx.HandleFunc("/tenant/user/cart", getCartHandler(formatter)).Methods("GET")
	//mx.HandleFunc("/tenant/user/cart", removeItemsFromCartHandler(formatter)).Methods("DELETE")
}

// Helper Functions
func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
		panic(fmt.Sprintf("%s: %s", msg, err))
	}
}

// API Ping Handler
func pingHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		formatter.JSON(w, http.StatusOK, struct{ Test string }{"API -CART version 1.0 alive!"})
	}
}

// API Gumball Machine Handler
func addItemsToCartHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {

		var cartPayload CartPayload
		if err := json.NewDecoder(req.Body).Decode(&cartPayload); err != nil {
			fmt.Println(" Error: ", err)
			formatter.JSON(w, http.StatusBadRequest, "Invalid request payload")
			return
		}
		fmt.Println("Adding Items to Cart: ", cartPayload)
		fmt.Println(con)
		//c1 := NewClient(server1)
		//items, err := c1.AddItems(cartPayload);

		user := User{
			ID:   400,
			Name: "FooBar",
		}

		fmt.Println("User: ", user)
			// Save our User object to Riak
		_, err = goriak.Bucket("bucket", "default").
			Set(cartPayload).
			Key("user-400").
			Run(con)

		
		if err != nil {
			fmt.Println(err)
			log.Fatal(err)
			panic(err)
			formatter.JSON(w, http.StatusBadRequest, err)
		} else {
			formatter.JSON(w, http.StatusOK, cartPayload)
		}
	}
}




/*
-- Setup Riak Bucket
riak ping
riak-admin test
riak-admin bucket-type create gumball '{"props":{"search_index":"orders"}}'
riak-admin bucket-type activate gumball
-- Create Database Schema (DB User: root, DB Pass: cmpe281)
create database cmpe281 ;
use cmpe281 ;
-- Create Database Table 
CREATE TABLE gumball (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  version bigint(20) NOT NULL,
  count_gumballs int(11) NOT NULL,
  model_number varchar(255) NOT NULL,
  serial_number varchar(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY serial_number (serial_number)
) ;
-- Load Data
insert into gumball ( id, version, count_gumballs, model_number, serial_number ) 
values ( 1, 0, 1000, 'M102988', '1234998871109' ) ;
-- Verify Data 
select * from gumball ;
-- Grant Remote Access for Admin (Optional)
apt-get update
apt-get install mysql-client
mysql -u root -p -h gumball_mysql_1 
CREATE USER 'admin' IDENTIFIED BY 'cmpe281';
GRANT ALL PRIVILEGES
ON .
TO 'admin'@'%'
IDENTIFIED BY 'cmpe281';
*/