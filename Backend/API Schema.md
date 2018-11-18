# CMPE 281 Avengers Team Project


### API Schema: 

### Business Objects
- User
- Tenant
- Order


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

### Orders resource

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
    Add items from cart selected by user
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

</br>

####    POST /order
    Place order from cart within the /user resource
    POST /tenant/user/cart HTTP/1.1
    Accept: application/json
    
    Body: {"tenant_id": 123, "user_id": 456, "items": [{name, amount, description, image_url, count}]}
    
    Response:
    - 201 Created
    - 400 Invalid Request
    
</br>


####    GET /order
    Get all items in cart within the /user resource
    GET tenant/user/order HTTP/1.1
    Accept: application/json
    
    Body: {"tenant_id": 123, "user_id": 456}
    
    Response: {"items": [{name, amount, description, image_url, count}]}
    - 200 Success
    - 404 Not Found
    
</br>
