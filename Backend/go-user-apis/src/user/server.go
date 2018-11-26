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
var mongodb_collection = "user"

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
	mx.HandleFunc("/user/{id}", userHandler(formatter)).Methods("GET")
	mx.HandleFunc("/user", userNewEntryHandler(formatter)).Methods("POST")
	mx.HandleFunc("/user/email/{id}", userByEmailHandler(formatter)).Methods("GET")
	mx.HandleFunc("/user/tenant", userUpdateTenantsHandler(formatter)).Methods("PUT")
	mx.HandleFunc("/user", optionsHandler(formatter)).Methods("OPTIONS")
	mx.HandleFunc("/users", userAllHandler(formatter)).Methods("GET")
}

// Helper Functions
func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
		panic(fmt.Sprintf("%s: %s", msg, err))
	}
}

//API Options Handler
func optionsHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		setupResponse(&w, req)
		fmt.Println("options handler PREFLIGHT Request")
			return
	}
}

func setupResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
    (*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
    (*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

// API Ping Handler
func pingHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		formatter.JSON(w, http.StatusOK, struct{ Test string }{"API version 1.0 alive!"})
	}
}

// API Get user Details
func userHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		setupResponse(&w, req)

		if (*req).Method == "OPTIONS" {
			fmt.Println("PREFLIGHT Request")
			return
		}

		session, err := mgo.Dial(mongodb_server)
		if err != nil {
			panic(err)
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)
		params := mux.Vars(req)
		var id string = params["id"]
		fmt.Println("User ID: ", id)
		var result bson.M
		if id == "" {
			formatter.JSON(w, http.StatusBadRequest, "User ID Missing")
		} else {
			c := session.DB(mongodb_database).C(mongodb_collection)
			err = c.Find(bson.M{"id":id}).One(&result)
			if err != nil {
			fmt.Println(" User: ", err)
			formatter.JSON(w, http.StatusBadRequest, "Not Found")
			}
			fmt.Println(" User: ", result)
			formatter.JSON(w, http.StatusOK, result)
		}
	}
}


// API Get user by email
func userByEmailHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		setupResponse(&w, req)

		if (*req).Method == "OPTIONS" {
			fmt.Println("PREFLIGHT Request")
			return
		}

		session, err := mgo.Dial(mongodb_server)
		if err != nil {
			panic(err)
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)
		params := mux.Vars(req)
		var id string = params["id"]
		fmt.Println("Email: ", id)
		var result bson.M
		if id == "" {
			formatter.JSON(w, http.StatusBadRequest, "Email ID Missing")
		} else {
			c := session.DB(mongodb_database).C(mongodb_collection)
			err = c.Find(bson.M{"email":id}).One(&result)
			if err != nil {
			fmt.Println(" User: ", err)
			formatter.JSON(w, http.StatusBadRequest, "Not Found")
			}
			fmt.Println(" User: ", result)
			formatter.JSON(w, http.StatusOK, result)
		}
	}
}


// API Get All user Details
func userAllHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		setupResponse(&w, req)
	
		if (*req).Method == "OPTIONS" {
			fmt.Println("PREFLIGHT Request")
			return
		}
		session, err := mgo.Dial(mongodb_server)
		if err != nil {
			panic(err)
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)
		var result []User
		c := session.DB(mongodb_database).C(mongodb_collection)
		err = c.Find(bson.M{}).All(&result)
		if err != nil {
			fmt.Println(" Error: ", err)
			formatter.JSON(w, http.StatusBadRequest, "Not Found")
		}
		fmt.Println("All Users:", result)
		formatter.JSON(w, http.StatusOK, result)
		
	}
}

// API Create user
func userNewEntryHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
	setupResponse(&w, req)

	if (*req).Method == "OPTIONS" {
		fmt.Println("PREFLIGHT Request")
		return
	}
	session, err := mgo.Dial(mongodb_server)
	if err != nil {
		panic(err)
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)

	var user User
	if err := json.NewDecoder(req.Body).Decode(&user); err != nil {
		fmt.Println(" Error: ", err)
		formatter.JSON(w, http.StatusBadRequest, "Invalid request payload")
		return
	}
	uuid,_ := uuid.NewV4()
	user.ID = uuid.String()
	c := session.DB(mongodb_database).C(mongodb_collection)

	if err := c.Insert(&user); err != nil {
		fmt.Println(" Error: ", err)
		formatter.JSON(w, http.StatusInternalServerError, err.Error())
		return
	}
	formatter.JSON(w, http.StatusCreated, user)

	}
}

// API Update user handler
func userUpdateTenantsHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		setupResponse(&w, req)
	
		if (*req).Method == "OPTIONS" {
			fmt.Println("PREFLIGHT Request")
			return
		}

    	var m User
    	_ = json.NewDecoder(req.Body).Decode(&m)		

    	fmt.Println("Update User Details: ", m.Tenants)
		session, err := mgo.Dial(mongodb_server)
        if err != nil {
                panic(err)
        }
        defer session.Close()
        session.SetMode(mgo.Monotonic, true)
        c := session.DB(mongodb_database).C(mongodb_collection)
        query := bson.M{"id" : m.ID}
        change := bson.M{"$set": bson.M{ "tenants" : m.Tenants}}
        err = c.Update(query, change)
        if err != nil {
                log.Fatal(err)
        }
       	var result bson.M
        err = c.Find(bson.M{"id" : m.ID}).One(&result)
        if err != nil {
                log.Fatal(err)
        }        
        fmt.Println("Tenant Updated", result )
		formatter.JSON(w, http.StatusOK, result)
	}
}
