# CMPE 281 Avengers Team Project


### [Kanban Task Board](https://github.com/nguyensjsu/fa18-281-avengers/projects/1)

### [DB Schema](https://github.com/nguyensjsu/fa18-281-avengers/blob/master/Backend/DB%20Schema.md)

### [API Schema](https://github.com/nguyensjsu/fa18-281-avengers/blob/master/Backend/API%20Schema.md)


### Architecture Diagram
<img src="https://github.com/nguyensjsu/fa18-281-avengers/blob/master/Architecture_BurgerOrderSytem.png" width="600" height="400" />




### Order resource

####    POST /order
    Place order from cart within the /user resource
    POST /order HTTP/1.1
    Accept: application/json
    
    Body: {"tenant_id": 123, "email": 456, "orders": {   order_id: String
                    items: [  
                        {  
                        name: String,              
                        amount: Number,  
                        description: String,  
                        image_url: String,  
                        count : Number  
                        }  
                                ]  
                            }  
                     
                    }
    
    Response:
    - 201 Created
    - 400 Invalid Request
    
</br>


####    GET /order/{id}
    Get all items in cart within the /user resource
    GET tenant/user/order HTTP/1.1
    Accept: application/json
    

    
    Response: {"items": [{name, amount, description, image_url, count}]}
    - 200 Success
    - 404 Not Found
    
</br>