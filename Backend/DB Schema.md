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

</br>
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
