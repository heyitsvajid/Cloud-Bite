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

