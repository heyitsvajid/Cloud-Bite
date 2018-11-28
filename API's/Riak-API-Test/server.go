type Client struct {
	Endpoint string
	*http.Client
}

var tr = &http.Transport{
	MaxIdleConns:       10,
	IdleConnTimeout:    30 * time.Second,
	DisableCompression: true,
}

func (c *Client) PostBurgerOrder(key, value string) (order, error) {
   	var ord_nil = order {}
	reqbody := "{\"Id\": \"" + 
		key + 
		"\",\"burger\": \"" +
		 value + 
		 "\"}"
	resp, err := c.Post(c.Endpoint + "/buckets/orders/keys/"+key+"?returnbody=true", 
						"application/json", strings.NewReader(reqbody) )
	if err != nil {
		fmt.Println("[RIAK DEBUG] " + err.Error())
		return ord_nil, err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if debug { fmt.Println("[RIAK DEBUG] POST: " + c.Endpoint + "/buckets/orders/keys/"+key+"?returnbody=true => " + string(body)) }
	var ord = order {
		Id: key,            		
		OrderStatus: value,
	}
	return ord, nil
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

func init() {

	// Get Environment Config
	mysql_connect = os.Getenv("MYSQL")
	server1 = os.Getenv("RIAK1")
	server2 = os.Getenv("RIAK2")
	server3 = os.Getenv("RIAK3")

	fmt.Println("MySQL Connect:", mysql_connect )	
	fmt.Println("Riak  Server1:", server1 )	
	fmt.Println("Riak  Server2:", server2 )	
	fmt.Println("Riak  Server3:", server3 )	

}