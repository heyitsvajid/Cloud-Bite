package main

import (
	"fmt"
	"log"
	"net/http"
	"encoding/json"
	"github.com/codegangsta/negroni"
	"github.com/streadway/amqp"
	"github.com/gorilla/mux"
	"github.com/unrolled/render"
	"github.com/satori/go.uuid"
	"gopkg.in/mgo.v2"
    "gopkg.in/mgo.v2/bson"
)

// MongoDB Config
var mongodb_server = "mongodb"
var mongodb_database = "cmpe281"
var mongodb_collection = "burgerCounter"

// RabbitMQ Config
// var rabbitmq_server = "rabbitmq"
// var rabbitmq_port = "5672"
// var rabbitmq_queue = "gumball"
// var rabbitmq_user = "guest"
// var rabbitmq_pass = "guest"

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
	mx.HandleFunc("/getBurgerCounters", getBurgerCountersHandler(formatter)).Methods("GET")
	
}

func getBurgerCountersHandler(err error, msg string){
	return func(w http.ResponseWriter, req *http.Request) {
    	var m counter
    	_ = json.NewDecoder(req.Body).Decode(&m)		
    	fmt.Println("Getting Burger Counters on the basis of Zip Code")
		session, err := mgo.Dial(mongodb_server)
        if err != nil {
                panic(err)
        }
        defer session.Close()
        session.SetMode(mgo.Monotonic, true)
        c := session.DB(mongodb_database).C(mongodb_collection)
        query := bson.M{"zip" : "95110"}
        err = c.get(query, change)
        if err != nil {
                log.Fatal(err)
        }
       	var result bson.M
        err = c.Find(bson.M{"zip" : "95110"}).One(&result)
        if err != nil {
                log.Fatal(err)
        }        
        fmt.Println("Number of counter burgers in 95110 are :", result )
		formatter.JSON(w, http.StatusOK, result)
	}
}

func postBurgerCountersHandler(err error, msg string){
	return func(w http.ResponseWriter, req *http.Request) {
    	var m counter
    	_ = json.NewDecoder(req.Body).Decode(&m)		
    	fmt.Println("Posting  Burger data on the basis of Zip Code")
		session, err := mgo.Dial(mongodb_server)
        if err != nil {
                panic(err)
        }
        defer session.Close()
        session.SetMode(mgo.Monotonic, true)
        c := session.DB(mongodb_database).C(mongodb_collection)
        query := bson.M{"zip" : "95110"}
        err = c.get(query, change)
        if err != nil {
                log.Fatal(err)
        }
       	var result bson.M
        err = c.Find(bson.M{"zip" : "95110"}).One(&result)
        if err != nil {
                log.Fatal(err)
        }        
        fmt.Println("Number of counter burgers in 95110 are :", result )
		formatter.JSON(w, http.StatusOK, result)
	}
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


