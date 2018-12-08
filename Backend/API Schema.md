# CMPE 281 Avengers Team Project


### API Schema: 

### Business Objects
- User
- Tenant
- Order
- Cart


### Tenant Resource 

#### POST /tenant  
    Create new tenant within the /tenant resource  
    POST /tenant HTTP/1.1  
    Accept: application/json

    Body: {Check DB Tenant Schema}

    Response:
    - 201 Created
    - 400 Invalid Request
</br>

####     GET /tenant  
    Get tenant details within the /tenant resource  
    POST /tenant HTTP/1.1  
    Accept: application/json

    Body: {"id": 123}

    Response:
    - 200 Success
    - 404 Not Found
</br>

####     PUT /tenant  
    Update existing tenant within the /tenant resource  
    POST /tenant HTTP/1.1  
    Accept: application/json

    Body: {Check DB Tenant Schema}

    Response:
    - 204 No Content
    - 400 Invalid Request

</br>

####     DELETE /tenant  
    Delete tenant details within the /tenant resource  
    POST /tenant HTTP/1.1  
    Accept: application/json

    Body: {"id": 123}

    Response:
    - 204 No Content
    - 404 Not Found

</br>

### Cart resource

####    GET /cart
    Get all items in cart within the /user resource
    GET tenant/user/cart HTTP/1.1
    Accept: application/json
    
    Body: {"tenant_id": 123, "user_id": 456}
    
    Response: {"items": [{name, amount, description, image_url, count}]}
    - 200 Success
    - 404 Not Found
    
</br>

####    POST /cart
    Add items to cart selected by user
    POST /tenant/user/item_name HTTP/1.1
    Accept: application/json
    
    Body: {"tenant_id": 123, "user_id": 456, "items": [{name, amount, description, image_url, count}]}
    
    Response:
    - 201 Created
    - 400 Invalid Request

</br>

####    DELETE /cart
    Remove all items from cart after placing order
    DELETE /tenant/user/item_name HTTP/1.1
    Accept: application/json
    
    Body: {"tenant_id": 123, "user_id": 456, "items": [{name, amount, description, image_url, count}]}
    
    Response:
    - 204 No Content
    - 404 Not Found





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

### Login Resource 

####    POST /login
    POST /login HTTP/1.1
    Accept: application/json

    Body : {
        "email_id" :"srichetaruj@gmail.com",
        "tenant_id" :"1233"
    }

</br>

####    POST /logout
    POST /logout HTTP/1.1
    Accept: application/json

     Body : {
        "email_id" :"srichetaruj@gmail.com",
        "tenant_id" :"1233"
    }

<br>

####    GET /isLoggedIn/{emailid_tenant}

### User Resource 

### POST /user
```
Create new user within the /user resource  
POST /user HTTP/1.1  
Accept: application/json

Body: {Check DB User Schema}

Response:
- 201 Created
- 400 Invalid Request
```
### GET /user/email/{id}
```
Get user details by email id within the /user/email resource  
GET /user HTTP/1.1  
Accept: application/json

Body: {"email": "example@1.com"}

Response:
- 200 Success
- 404 Not Found
```
### PUT /user
```
Update existing tenant within the /user resource  
POST /user HTTP/1.1  
Accept: application/json

Body: {Check DB User Schema}

Response:
- 204 No Content
- 400 Invalid Request
```
### GET /user/{id}
```
Get user details within the /user/{id} resource  
GET /user HTTP/1.1  
Accept: application/json


Response:
- 204 No Content
- 404 Not Found
```
### GET /users
```
Get all user details within the /users resource  
GET /users HTTP/1.1  
Accept: application/json


Response:
- 204 No Content
- 404 Not Found
```

