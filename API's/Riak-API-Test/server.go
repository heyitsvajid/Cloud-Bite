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