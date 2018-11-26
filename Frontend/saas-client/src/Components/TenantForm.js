import React, { Component } from 'react';
import axios from 'axios'
import swal from 'sweetalert2'
import { withRouter } from 'react-router-dom'
import '../assets/css/admin.css'
import { envURL } from '../config/environment';


class MultiplexForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            update: false,
            name: '',
            image_url:'',
            product_name: '',
            product_amount: '',
            product_description: '',
            product_url: '',
            products: [],
            tenantList: [],
            update_id: 0,
        }
    }

    componentWillMount() {
        this.loadTenant();
    }

    handleSubmit(e) {
        e ? e.preventDefault() : '' 

            var tenant = {  
                name: this.state.name,  
                image_url: this.state.image_url,  
                products: this.state.products  
            }  
            console.log("Adding Tenant : "+tenant)            
            axios.post(envURL + 'tenant',tenant,{ headers: { 'Content-Type': 'application/json'}})
            .then(response => { 
                console.log(response)
                swal({
                    type: 'success',
                    title: 'Add Tenant',
                    text: "Tenant added successfully",
                })
            })
            .catch(error => {
                console.log(error)
                swal({
                    type: 'error',
                    title: 'Add Tenant',
                    text: "Error Adding tenant",
                })

            });    
    }

    loadTenant() {
        axios.get(envURL + 'tenants',{ headers: { 'Content-Type': 'application/json'}})
        .then((res) => {
                    console.log(res)
                    console.log('Fetching all tenant details');
                    console.log(res.data);
                    this.setState({
                        tenantList: res.data ? res.data : [],
                    })          
        })

    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value })
        console.log(this.state)
    }

    returnTenantList() {
        var tenantList = this.state.tenantList;
        let rowNodes = tenantList.map((item, index) => {
            return (
                <tr>
                    <th scope="row">{item.current_index}</th>
                    <td>{item.name}</td>
                    <td>{item.products.length}</td>
                    <td><input type="button" class="dashboard-form-btn link-style nav-link btn-info action-link"
                        value="Update" required="" id={item.id} onClick={this.handleTenantUpdate.bind(this)} />
                    </td>
                </tr>
            )
        });
        return (
            <div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Product Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rowNodes}
                    </tbody>
                </table>
            </div>
            
        );

    }

    handleCancelClick(e){

        this.setState({
            update: false,
            name: '',
            image_url:'',
            product_name: '',
            product_amount: '',
            product_description: '',
            product_url: '',
            products: [],
            update_id: 0
        })
    }

    updateTenant(e) {
        e ? e.preventDefault() : ''        

        var tenant = {
            id: this.state.update_id,
            image_url: this.state.image_url,
            products: this.state.products,
        }
        debugger
        console.log("Updated Details")
        console.log(tenant)
        axios.put(envURL + 'tenant',tenant,{ headers: { 'Content-Type': 'application/json'}})
            .then(response => { 
                console.log(response)
                swal({
                    type: 'success',
                    title: 'Add Tenant',
                    text: "Tenant updated successfully",
                })
            })
            .catch(error => {
                console.log(error)
                swal({
                    type: 'error',
                    title: 'Add Tenant',
                    text: "Error updating tenant",
                })

            });

        this.setState({
            update: false,
            name: '',
            image_url:'',
            product_name: '',
            product_amount: '',
            product_description: '',
            product_url: '',
            products: [],
            update_id: 0,
        })
        setTimeout(function () {
        }, 2000);
    }

    handleTenantUpdate(e) {
        e ? e.preventDefault() : ''

        debugger
        this.state.tenantList.forEach(element => {
            if (element.id == e.target.id) {
                this.setState({
                    update_id: e.target.id,
                    update: true,
                    name: element.name,
                    image_url: element.image_url,
                    products: element.products,
                })
                return;
            }
        });
    }



    render() {
        return (
            <div>
                <div class="row">
                    <div class="col-lg-2">
                        <h4 class="c-grey-900 mB-20">All Tenants</h4>
                    </div>
                </div>
                <hr/>

                {this.returnTenantList()}
                <hr class='mt-5 mb-5' />
                <h3>{this.state.update ? 'Update' : 'Add New'} Tenant</h3>
                <hr />
                
                <div class="row gap-20 masonry pos-r" style={{position: 'relative', height: '1086px'}}>
                    <div class="masonry-item col-md-6" style={{position: 'absolute', top: '0px'}}>
                        <div class="bgc-white p-20 bd">
                            <div class="mT-30">
                                <form id="dashboard-form" className='form-multiplexadmin'>

                                    <div className="form-group">
                                        <label class="dashboard-label">Name</label>
                                        <input class="form-control" type="text" name="name"
                                            placeholder="Enter Business Name" required="" value={this.state.name} onChange={this.handleUserInput} />
                                        <div id = "name_error" class= "error"></div>
                                    </div>
                                    <div className="form-group">
                                        <label class="dashboard-label">Logo URL</label>
                                        <input class="form-control" type="text" name="image_url"
                                            placeholder="Enter Business Logo URL" required="" value={this.state.image_url} onChange={this.handleUserInput} />
                                        <div id = "image_url" class= "error"></div>
                                    </div>
                                    
                                    <label class="dashboard-label">Add Products</label>
                                    <div class="form-row">
                                        
                                        <br/>
                                        <div className="form-group col-md-4">
                                        <input class="form-control" type="text" name="product_name"
                                            placeholder="Product Name" required="" value={this.state.product_name} onChange={this.handleUserInput} />
                                        </div>
                                        <div id = "product_name_error" class= "error"></div>

                                        <div className="form-group col-md-4">
                                        <input class="form-control" type="number" name="product_amount"
                                            placeholder="Product Amount" required="" value={this.state.product_amount} onChange={this.handleUserInput} />
                                        </div>
                                        <div id = "product_amount_error" class= "error"></div>

                                        <div className="form-group col-md-4">
                                        <input class="form-control" type="text" name="product_description"
                                            placeholder="Product Description" required="" value={this.state.product_description} onChange={this.handleUserInput} />
                                        </div>

                                        <div className="form-group col-md-4">
                                        <input class="form-control" type="text" name="product_url"
                                            placeholder="Product URL" required="" value={this.state.product_url} onChange={this.handleUserInput} />
                                        </div>


                                        <div className="form-group col-md-2">
                                            <input type="button" class="btn btn-info"
                                        value="Add Product" required="" onClick={this.handleAddProduct.bind(this)} />
                                        </div>
                                        
                                    <div id = "row_count_error" class= "error"></div>
                                    </div>

                                    <div className="form-group">
                                        <label class="dashboard-label">Products Saved</label>
                                        <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.renderProductRows()}
                                                </tbody></table>
                                    </div>

                                    <div class="form-row">
                                        <div className="form-group col-md-3">
                                        {this.state.update ? <input type="submit" class="dashboard-form-btn btn btn-primary"
                                        value="Update Tenant" required="" onClick={this.updateTenant.bind(this)} /> : <input type="submit" class="dashboard-form-btn btn btn-primary"
                                            value="Add Tenant" required="" onClick={this.handleSubmit.bind(this)} />}
                                        </div>

                                        <div className="form-group col-md-3">
                                            <input onClick = {this.handleCancelClick.bind(this)} type="reset" class="dashboard-form-btn cancel-update btn btn-default" value="Cancel" />
                                            
                                        </div>
                                    </div>
                                   
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }

    renderProductRows() {
        let rowNodes = this.state.products.map((product, index) => {
            return (
                <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{product.name}</td>
                    <td>{product.amount}</td>
                    <td><input type="button" class="btn btn-warn"
                        value="Remove" required="" id={index} onClick={this.handleRemoveProduct.bind(this)} />
                    </td>
                </tr>
            )
        });
        return rowNodes;
    }
    handleAddProduct() {
        let products = this.state.products;
        products.push({
            name: this.state.product_name,
            amount: this.state.product_amount,
            description: this.state.product_description,
            image_url: this.state.product_url
        })
        this.setState({
            products: products,
            product_name: '',
            product_url: '',
            product_amount: '',
            product_description: ''
        })
    }
    handleRemoveProduct(e) {
        let products = this.state.products;
        products.splice(e.target.id, 1)
        this.setState({
            products: products
        })
    }

}

export default withRouter(MultiplexForm);