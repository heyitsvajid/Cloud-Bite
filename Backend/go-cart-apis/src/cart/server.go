/*
	Cart API in Go
	Uses Riak KV
*/

package main

import (
	"fmt"
	"log"
	"net/http"
	"strings"
	"io/ioutil"
	"time"
	"errors"
	"encoding/json"
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"
	"github.com/unrolled/render"
)

/*
	Go Rest Client:
		Tutorial:	https://medium.com/@marcus.olsson/writing-a-go-client-for-your-restful-api-c193a2f4998c
		Reference:	https://golang.org/pkg/net/http/

		var server1 = "http://localhost:7000"
		var server2 = "http://localhost:7001"
		var server3 = "http://localhost:7002"

		var server1 = "http://gumball_member_1:8098"
		var server2 = "http://gumball_member_2:8098"
		var server3 = "http://gumball_member_3:8098"

	Set Localhost Environment:
	
		export MONGO_SERVER="localhost"
		export MONGO_DB="cmpe281"
		export MONGO_COL="gumball"

		export RIAK1="http://localhost:7000"
		export RIAK2="http://localhost:7001"
		export RIAK3="http://localhost:7002"

*/



/* Riak REST Client */
var debug = true
var server1 = "http://54.153.3.104:8098" // set in environment
var server2 = "http://54.67.116.220:8098" // set in environment
var server3 = "http://13.52.101.249:8098" // set in environment

type Client struct {
	Endpoint string
	*http.Client
}

type ErrorMessage struct {
	message string
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

func (c *Client) Ping() (string, error) {
	resp, err := c.Get(c.Endpoint + "/ping" )
	if err != nil {
		fmt.Println("[RIAK DEBUG] " + err.Error())
		return "Ping Error!", err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if debug { fmt.Println("[RIAK DEBUG] GET: " + c.Endpoint + "/ping => " + string(body)) }
	return string(body), nil
}

func (c *Client) addItems(key string, value CartPayload) (CartPayload, error) {
	var ord_nil = CartPayload {}
	b, err := json.Marshal(value)
	req, _  := http.NewRequest("PUT", c.Endpoint + "/buckets/cart/keys/"+key+"?returnbody=true", strings.NewReader(string(b)) )
	req.Header.Add("Content-Type", "application/json")
	//fmt.Println( req )
	resp, err := c.Do(req)	
	if err != nil {
		fmt.Println("[RIAK DEBUG] " + err.Error())
		return ord_nil, err
	}	
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if debug { fmt.Println("[RIAK DEBUG] PUT: " + c.Endpoint + "/buckets/cart/keys/"+key+"?returnbody=true => " + string(body)) }
	var ord = CartPayload { }
	if err := json.Unmarshal(body, &ord); err != nil {
		fmt.Println("RIAK DEBUG] JSON unmarshaling failed: %s", err)
		return ord_nil, err
	}
	return ord, nil
}

func (c *Client) login(key string, value Login) (Login, error) {
	var ord_nil = Login {}
	b, err := json.Marshal(value)
	req, _  := http.NewRequest("PUT", c.Endpoint + "/buckets/login/keys/"+key+"?returnbody=true", strings.NewReader(string(b)) )
	req.Header.Add("Content-Type", "application/json")
	//fmt.Println( req )
	resp, err := c.Do(req)	
	if err != nil {
		fmt.Println("[RIAK DEBUG] " + err.Error())
		return ord_nil, err
	}	
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if debug { fmt.Println("[RIAK DEBUG] PUT: " + c.Endpoint + "/buckets/cart/keys/"+key+"?returnbody=true => " + string(body)) }
	var ord = Login { }
	if err := json.Unmarshal(body, &ord); err != nil {
		fmt.Println("RIAK DEBUG] JSON unmarshaling failed: %s", err)
		return ord_nil, err
	}
	return ord, nil
}

func (c *Client) logout(key string) (ErrorMessage) {
	var ord_nil = ErrorMessage {}
	req, _  := http.NewRequest("DELETE", c.Endpoint + "/buckets/login/keys/"+key+"?returnbody=true", nil )
	resp, err := c.Do(req)
	fmt.Println(resp.StatusCode)
	if err != nil {
		fmt.Println("[RIAK DEBUG] ===> " + err.Error())
		ord_nil.message = "internal Error occurred"
		return ord_nil
	}
	if resp.StatusCode != 204  {
		ord_nil.message = "Key not  found!"
		return ord_nil
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if debug { fmt.Println("[RIAK DEBUG] GET: " + c.Endpoint + "/buckets/cart/keys/"+key +" => " + string(body)) }
	var ord = CartPayload { }
	if err := json.Unmarshal(body, &ord); err != nil {
		fmt.Println("RIAK DEBUG] JSON unmarshaling failed: %s", err)
		return ord_nil
	}
	return ord_nil

}

func (c *Client) deleteCart(key string) (ErrorMessage) {
	var ord_nil = ErrorMessage {}
	req, _  := http.NewRequest("DELETE", c.Endpoint + "/buckets/cart/keys/"+key+"?returnbody=true", nil )
	resp, err := c.Do(req)
	fmt.Println(resp.StatusCode)
	if err != nil {
		fmt.Println("[RIAK DEBUG] ===> " + err.Error())
		ord_nil.message = "internal Error occurred"
		return ord_nil
	}
	if resp.StatusCode != 204  {
		ord_nil.message = "Key not  found!"
		return ord_nil
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if debug { fmt.Println("[RIAK DEBUG] GET: " + c.Endpoint + "/buckets/cart/keys/"+key +" => " + string(body)) }
	var ord = CartPayload { }
	if err := json.Unmarshal(body, &ord); err != nil {
		fmt.Println("RIAK DEBUG] JSON unmarshaling failed: %s", err)
		return ord_nil
	}
	return ord_nil

}

func (c *Client) getCart(key string) (CartPayload, error) {
	var ord_nil = CartPayload {}
	resp, err := c.Get(c.Endpoint + "/buckets/cart/keys/"+key )
	fmt.Println(resp.StatusCode)
	if err != nil {
		fmt.Println("[RIAK DEBUG] ===> " + err.Error())
		return ord_nil, err
	}
	if resp.StatusCode != 200 {
		return ord_nil, errors.New("Key not found..")
		
		//return ord_nil, err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if debug { fmt.Println("[RIAK DEBUG] GET: " + c.Endpoint + "/buckets/cart/keys/"+key +" => " + string(body)) }
	var ord = CartPayload { }
	if err := json.Unmarshal(body, &ord); err != nil {
		fmt.Println("RIAK DEBUG] JSON unmarshaling failed: %s", err)
		return ord_nil, err
	}
	return ord, nil
}

func (c *Client) isLoggedIn(key string) (ErrorMessage) {
	var ord_nil = ErrorMessage {}
	resp, err := c.Get(c.Endpoint + "/buckets/login/keys/"+key )
	fmt.Println(resp.StatusCode)
	if err != nil {
		fmt.Println("[RIAK DEBUG] ===> " + err.Error())
		ord_nil.message = "internal Error occurred"
		return ord_nil
	}
	if resp.StatusCode != 200 {
		ord_nil.message = "Key not  found!"
		return ord_nil
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if debug { fmt.Println("[RIAK DEBUG] GET: " + c.Endpoint + "/buckets/cart/keys/"+key +" => " + string(body)) }
	return ord_nil

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

	// Get Environment Config
	//server1 = os.Getenv("RIAK1")
	//server2 = os.Getenv("RIAK2")
	//server3 = os.Getenv("RIAK3")
	fmt.Println("Riak Server1:", server1 )	
	fmt.Println("Riak Server2:", server2 )	
	fmt.Println("Riak Server3:", server3 )	

		

	// Riak KV Setup	
	c1 := NewClient(server1)
	msg, err := c1.Ping( )
	if err != nil {
		log.Fatal(err)
	} else {
		log.Println("Riak Ping Server1: ", msg)		
	}

	c2 := NewClient(server2)
	msg, err = c2.Ping( )
	if err != nil {
		log.Fatal(err)
	} else {
		log.Println("Riak Ping Server2: ", msg)		
	}

	c3 := NewClient(server3)
	msg, err = c3.Ping( )
	if err != nil {
		log.Fatal(err)
	} else {
		log.Println("Riak Ping Server3: ", msg)		
	}

}

func setupResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
    (*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
    (*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

// API Routes
func initRoutes(mx *mux.Router, formatter *render.Render) {
	mx.HandleFunc("/cart", addItemsToCartHandler(formatter)).Methods("POST")
	mx.HandleFunc("/cart/{key}", getCartHandler(formatter)).Methods("GET")
	mx.HandleFunc("/cart/{key}", deleteCartHandler(formatter)).Methods("DELETE")
	mx.HandleFunc("/logout", logoutHandler(formatter)).Methods("POST")
	mx.HandleFunc("/login", loginHandler(formatter)).Methods("POST")
	mx.HandleFunc("/isLoggedIn/{email_tenant}", loginCheckHandler(formatter)).Methods("GET")
	mx.HandleFunc("/cart", optionsHandler(formatter)).Methods("OPTIONS")
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

// API to check if user is logged in 
func loginCheckHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		setupResponse(&w, req)
		if (*req).Method == "OPTIONS" {
			fmt.Println("PREFLIGHT Request")
			return
		}
		var ord_err = ErrorMessage{}
		params := mux.Vars(req)
		var key string = params["email_tenant"]
		if key 	== ""  {
			formatter.JSON(w, http.StatusBadRequest, "Invalid Request. login check key Missing.")
		} else {
			c1 := NewClient(server1)
			ord := c1.isLoggedIn(key)
			if ord != ord_err {
				//log.Fatal(ord)
				formatter.JSON(w, http.StatusBadRequest, struct{ Test string }{"false"})
			} else {
				formatter.JSON(w, http.StatusOK, ord)
			}
		}
		
	
	}
}


// API to logout handler
func logoutHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		setupResponse(&w, req)
		if (*req).Method == "OPTIONS" {
			fmt.Println("PREFLIGHT Request")
			return
		}
		var login Login
		if err := json.NewDecoder(req.Body).Decode(&login); err != nil {
			fmt.Println(" Error: ", err)
			formatter.JSON(w, http.StatusBadRequest, "Invalid request payload")
			return
		}
		var ord_err = ErrorMessage{}
		var key string = login.Email_id+"_"+login.Tenant_id
		if key 	== ""  {
			formatter.JSON(w, http.StatusBadRequest, "Invalid Request. logout key Missing.")
		} else {
			c1 := NewClient(server1)
			ord := c1.logout(key)
			if ord != ord_err {
				log.Fatal(ord)
				formatter.JSON(w, http.StatusBadRequest, ord)
			} else {
				formatter.JSON(w, http.StatusOK, ord)
			}
		}

	}
}

// API to loin cart
func loginHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		setupResponse(&w, req)
		if (*req).Method == "OPTIONS" {
			fmt.Println("PREFLIGHT Request")
			return
		}
		var login Login
		if err := json.NewDecoder(req.Body).Decode(&login); err != nil {
			fmt.Println(" Error: ", err)
			formatter.JSON(w, http.StatusBadRequest, "Invalid request payload")
			return
		}
		fmt.Println("Login details: ", login)

		var uuid string = login.Email_id+"_"+login.Tenant_id;
		fmt.Println( "Order Params ID: ", uuid )
		
		if uuid == ""  {
			formatter.JSON(w, http.StatusBadRequest, "Invalid Request. Order ID Missing.")
		} else {
			c1 := NewClient(server1)
			ord, err := c1.login(uuid, login)
			if err != nil {
				log.Fatal(err)
				formatter.JSON(w, http.StatusBadRequest, err)
			} else {
				formatter.JSON(w, http.StatusOK, ord)
			}
		}
	}
}

// API to delete cart
func deleteCartHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		setupResponse(&w, req)
		if (*req).Method == "OPTIONS" {
			fmt.Println("PREFLIGHT Request")
			return
		}
		params := mux.Vars(req)
		var ord_err = ErrorMessage{}
		var key string = params["key"]
		fmt.Println("Key : ", key)
		if key == ""  {
			formatter.JSON(w, http.StatusBadRequest, "Invalid Request. Cart Key Missing.")
		} else {
			c1 := NewClient(server1)
			ord := c1.deleteCart(key)
			if ord != ord_err {
				log.Fatal(ord)
				formatter.JSON(w, http.StatusBadRequest, ord)
			} else {
				formatter.JSON(w, http.StatusOK, ord)
			}
		}
	}
}

//API to get cart 
func getCartHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		setupResponse(&w, req)
		if (*req).Method == "OPTIONS" {
			fmt.Println("PREFLIGHT Request")
			return
		}
		params := mux.Vars(req)
		var key string = params["key"]
		fmt.Println("Key : ", key)
		if key == ""  {
			formatter.JSON(w, http.StatusBadRequest, "Invalid Request. Cart Key Missing.")
		} else {
			c1 := NewClient(server1)
			ord, err := c1.getCart(key)
			fmt.Println(ord)
			fmt.Println("Key ---> : ", err != nil)
			if err != nil {
				fmt.Println("err : ", err)
				formatter.JSON(w, http.StatusBadRequest, struct{ Test string }{"Cart not found!"})
			} else {
				formatter.JSON(w, http.StatusOK, ord)
			}
		}

	}
}


// API Add Items to cart
func addItemsToCartHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		setupResponse(&w, req)
		if (*req).Method == "OPTIONS" {
			fmt.Println("PREFLIGHT Request")
			return
		}
		var cartPayload CartPayload
		if err := json.NewDecoder(req.Body).Decode(&cartPayload); err != nil {
			fmt.Println(" Error: ", err)
			formatter.JSON(w, http.StatusBadRequest, "Invalid request payload")
			return
		}
		fmt.Println("Adding Items to Cart: ", cartPayload)

		var uuid string = cartPayload.Email_id+"_"+cartPayload.Tenant_id;
		fmt.Println( "Order Params ID: ", uuid )
		//value := "Order Processed"

		if uuid == ""  {
			formatter.JSON(w, http.StatusBadRequest, "Invalid Request. Order ID Missing.")
		} else {
			c1 := NewClient(server1)
			ord, err := c1.addItems(uuid, cartPayload)
			if err != nil {
				log.Fatal(err)
				formatter.JSON(w, http.StatusBadRequest, err)
			} else {
				formatter.JSON(w, http.StatusOK, ord)
			}
		}
	}
}




/*

-- Setup Riak Bucket

riak ping
riak-admin test
riak-admin bucket-type create gumball '{"props":{"search_index":"orders"}}'
riak-admin bucket-type activate gumball


*/

  


