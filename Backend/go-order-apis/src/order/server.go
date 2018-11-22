/*
Base Project Reference : https://github.com/paulnguyen/cmpe281/tree/master/golabs/godata/go-gumball-mongo
*/

package main

import (
	"fmt"
	"log"
	"net/http"
	"encoding/json"
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"
	"github.com/unrolled/render"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"github.com/satori/go.uuid"
)

// MongoDB Config
var mongodb_server = "mongodb://cmpe281:cmpe281@ds051007.mlab.com:51007/saas"
var mongodb_database = "saas"
var mongodb_collection = "order"

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

// API Routes
func initRoutes(mx *mux.Router, formatter *render.Render) {
	mx.HandleFunc("/ping", pingHandler(formatter)).Methods("GET")
	mx.HandleFunc("/cart/{cart_id}", cartHandler(formatter)).Methods("GET")
	mx.HandleFunc("/cart/{cart_id}", cartAddItemsHandler(formatter)).Methods("POST")
	mx.HandleFunc("/cart/{cart_id}", cartRemoveItemsHandler(formatter)).Methods("DELETE")
	mx.HandleFunc("/order", orderProcessHandler(formatter)).Methods("POST")
	mx.HandleFunc("/order/{order_id}", orderStatusHandler(formatter)).Methods("GET")
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
		formatter.JSON(w, http.StatusOK, struct{ Test string }{"API version 1.0 alive!"})
	}
}

// API Get Cart Details
func cartHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		session, err := mgo.Dial(mongodb_server)
		if err != nil {
			panic(err)
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)
		params := mux.Vars(req)
		var id string = params["cart_id"]
		fmt.Println("Cart ID: ", id)
		var result bson.M
		if id == "" {
			formatter.JSON(w, http.StatusBadRequest, "Cart ID Missing")
		} else {
			c := session.DB(mongodb_database).C(mongodb_collection)
			err = c.Find(bson.M{"cart_id":id}).One(&result)
			if err != nil {
			fmt.Println(" Cart Details: ", err)
			formatter.JSON(w, http.StatusBadRequest, "Not Found")
			}
			fmt.Println(" Cart Details: ", result)
			formatter.JSON(w, http.StatusOK, result)
		}
	}
}

//API Add Item to Cart
func cartAddItemsHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		uuid, _ := uuid.NewV4()
    	var ord = item {
					item_Id: uuid.String(),            		
					CartStatus: "Item added",
		}
		if items == nil {
			items = make(map[string]order)
		}
		orders[uuid.String()] = ord
		fmt.Println( "Items: ", items )
		formatter.JSON(w, http.StatusOK, ord)
	}
}
