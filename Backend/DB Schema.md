# CMPE 281 Avengers Team Project


### MongoDB Schema: 

#### Tenant Metadata Schema

	var TenantSchema = new Schema({  
        name: { type: String, trim: true, required: true, unique: true  
        },  
        image_url: { type: String, required: true  
        },  
        products: [  
            {  
                name: String,              
                amount: Number,  
                description: String,  
                image_url: String  
            }  
        ]  
    });  



#### User Schema

    var UserSchema = new Schema({  
        email: { type: String, trim: true, required: true  
        },  
        tenants: [  
            {  
                user_name: { type: String, trim: true, required: true},  
                tenant_name: { type: String, trim: true, required: true},  
                tenant_id: { type: String, trim: true, required: true},    
                password: String,  
                orders: [  
                            {  
                    order_id: String
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
                        ]  
                    }  
                ]  
    });  


### Riak Keys

    URL : GET http://10.0.1.56:8098/buckets/buckets/cart/keys 
    Response :  
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
    URL : GET http://10.0.1.56:8098/buckets/buckets/login/keys
    Response : {
                "email_id": "srichetaruj@gmail.com",
                "tenant_id": "11111"
              }
