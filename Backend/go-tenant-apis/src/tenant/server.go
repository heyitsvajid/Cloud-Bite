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
//	"github.com/rs/cors"
)

// MongoDB Config
var mongodb_server = "mongodb://cmpe281:cmpe281@ds051007.mlab.com:51007/saas"
var mongodb_database = "saas"
var mongodb_collection = "tenant"



// NewServer configures and returns a Server.
func NewServer() *negroni.Negroni {
	formatter := render.New(render.Options{
		IndentJSON: true,
	})
	n := negroni.Classic()
	mx := mux.NewRouter()
	initRoutes(mx, formatter)
	n.UseHandler(mx)
	// c := cors.New(cors.Options{
	//     AllowedOrigins: []string{"*"},
	//     AllowedHeaders: []string{"Content-Type"},
	//     AllowedMethods: []string{"GET", "POST", "PATCH","PUT", "DELETE, OPTIONS"},
	// })
	// n.Use(c)
	return n
}

// API Routes
func initRoutes(mx *mux.Router, formatter *render.Render) {


	mx.HandleFunc("/ping", pingHandler(formatter)).Methods("GET")
	mx.HandleFunc("/tenant/{id}", tenantHandler(formatter)).Methods("GET")
	mx.HandleFunc("/tenant", tenantUpdateHandler(formatter)).Methods("PUT")
	mx.HandleFunc("/tenant", tenantNewEntryHandler(formatter)).Methods("POST")
	mx.HandleFunc("/tenant", optionsHandler(formatter)).Methods("OPTIONS")
	mx.HandleFunc("/tenants", tenantAllHandler(formatter)).Methods("GET")
}

// Helper Functions
func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
		panic(fmt.Sprintf("%s: %s", msg, err))
	}
}

//API Ping Handler
func optionsHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		setupResponse(&w, req)
		fmt.Println("options handler PREFLIGHT Request")
			return
	}
}

//API Ping Handler
func pingHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		formatter.JSON(w, http.StatusOK, struct{ Test string }{"API version 1.0 alive!"})
	}
}

func setupResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
    (*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
    (*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

// API Get Tenant Details
func tenantHandler(formatter *render.Render) http.HandlerFunc {
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
		fmt.Println("Tenant ID: ", id)
		var result bson.M
		if id == "" {
			formatter.JSON(w, http.StatusBadRequest, "Tenant ID Missing")
		} else {
			c := session.DB(mongodb_database).C(mongodb_collection)
			err = c.Find(bson.M{"id":id}).One(&result)
			if err != nil {
			fmt.Println(" Tenant: ", err)
			formatter.JSON(w, http.StatusBadRequest, "Not Found")
			}
			fmt.Println(" Tenant: ", result)
			formatter.JSON(w, http.StatusOK, result)
		}
	}
}

//API Get All Tenant Details
func tenantAllHandler(formatter *render.Render) http.HandlerFunc {
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
		var result []Tenant
		c := session.DB(mongodb_database).C(mongodb_collection)
		err = c.Find(bson.M{}).All(&result)
		if err != nil {
			fmt.Println(" Error: ", err)
			formatter.JSON(w, http.StatusBadRequest, "Not Found")
		}
		fmt.Println("All Tenants:", result)
		formatter.JSON(w, http.StatusOK, result)
		
	}
}

// API Update Tenant Details
func tenantUpdateHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		setupResponse(&w, req)
	
		if (*req).Method == "OPTIONS" {
			fmt.Println("PREFLIGHT Request")
			return
		}

    	var m Tenant
    	_ = json.NewDecoder(req.Body).Decode(&m)		

    	fmt.Println("Update Tenant Products To: ", m.Products)
		session, err := mgo.Dial(mongodb_server)
        if err != nil {
                panic(err)
        }
        defer session.Close()
        session.SetMode(mgo.Monotonic, true)
        c := session.DB(mongodb_database).C(mongodb_collection)
        query := bson.M{"id" : m.ID}
        change := bson.M{"$set": bson.M{ "products" : m.Products}}
        err = c.Update(query, change)
        if err != nil {
                log.Fatal(err)
        }
       	var result bson.M
        err = c.Find(bson.M{"id" : m.ID}).One(&result)
        if err != nil {
                log.Fatal(err)
        }        
        fmt.Println("Tenant Products Updated", result )
		formatter.JSON(w, http.StatusOK, result)
	}
}


// API Create Tenant
func tenantNewEntryHandler(formatter *render.Render) http.HandlerFunc {
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

	var tenant Tenant
	if err := json.NewDecoder(req.Body).Decode(&tenant); err != nil {
		fmt.Println(" Error: ", err)
		formatter.JSON(w, http.StatusBadRequest, "Invalid request payload")
		return
	}
	fmt.Println("Adding Tenant: ", tenant)

	uuid,_ := uuid.NewV4()
	tenant.ID = uuid.String()
	c := session.DB(mongodb_database).C(mongodb_collection)

	if err := c.Insert(&tenant); err != nil {
		fmt.Println(" Error: ", err)
		formatter.JSON(w, http.StatusInternalServerError, err.Error())
		return
	}
	formatter.JSON(w, http.StatusCreated, tenant)

	}
}

