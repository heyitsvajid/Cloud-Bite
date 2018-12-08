# CMPE 281 Avengers Team Project


### [Kanban Task Board](https://github.com/nguyensjsu/fa18-281-avengers/projects/1)

### [DB Schema](https://github.com/nguyensjsu/fa18-281-avengers/blob/master/Backend/DB%20Schema.md)

### [API Schema](https://github.com/nguyensjsu/fa18-281-avengers/blob/master/Backend/API%20Schema.md)


### Architecture Diagram
<img src="https://github.com/nguyensjsu/fa18-281-avengers/blob/master/Architecture_BurgerOrderSytem.png" width="600" height="400" />




### Order resource

####    POST /cart
    Place order from cart within the /user resource
    POST /order HTTP/1.1
    Accept: application/json
    
    Body: CartPayLoad
    {
        "email_id": "srichetaruj@gmail.com",
        "tenant_id": "11111",
        "items": [
            {
                "name": "sricgeta",
                "amount": 22,
                "description": "pen",
                "image_url": "http://sss.com",
                "count": 1
            }
        ]
    }
    
    Response:
    - 201 Created
    - 400 Invalid Request
    
</br>


####    GET /cart/{key}
    Get all items in cart within the /user resource
    Accept: application/json
    

    
    Response: {
    "email_id": "srichetaruj@gmail.com",
    "tenant_id": "11111",
    "items": [
        {
            "name": "sricgeta",
            "amount": 22,
            "description": "pen",
            "image_url": "http://sss.com",
            "count": 1
        }
    ]
}
    - 200 Success
    - 404 Not Found

####    DELETE /cart/{key}
    Get all items in cart within the /user resource
    DELETE /cart HTTP/1.1
    Accept: application/json
    

      Response
    - 204 Success
    - 404 Not Found
    
</br>
