//UserDetailsForm.js
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import '../assets/js/main.js'
import axios from 'axios'
import swal from 'sweetalert2'

import '../assets/css/reset.css'
import '../assets/css/style.css'
import '../assets/css/font.css'
import '../assets/css/menu.css'
import $ from "jquery";
import { cartURL, reactURL, userURL, tenantURL, kongURL } from '../config/environment';

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isLoggedIn: false,
            errorMsg: '',
            tenantObj:{},
            userObj: {},
            flag: true,
            cartObj: {}
        };
    }

    handleAddToCart(e){
        e.preventDefault();
        var obj = this;
        axios.post( cartURL + 'cart', this.state.cartObj , { headers: { 'Content-Type': 'application/json'}})
        .then(response => { 
           obj.setState({cartObj: response.data})
        })
        .catch(error => {
            console.log(error)
            swal({
                type: 'error',
                title: 'Post Cart',
                text: "Please try again later",
            })
        }); 
    }

    handleDeleteCart(e){
        e.preventDefault();
        var email_id=localStorage.getItem("email")? localStorage.getItem("email"): ""
        var tenant_id=localStorage.getItem("tenant")? localStorage.getItem("tenant"): ""
        var key = email_id+"_"+tenant_id;
        var obj = this;
        axios.delete( cartURL + 'cart/'+ key , { headers: { 'Content-Type': 'application/json'}})
        .then(response => { 
           obj.setState({cartObj: response.data})
        })
        .catch(error => {
            console.log(error)
            swal({
                type: 'error',
                title: 'Delete Cart',
                text: "Please try again later",
            })
        }); 
    }


    componentDidMount(){
        var cartObj = this.state.cartObj;
        if(Object.keys(cartObj).length!=0){
            var items = cartObj["items"];
            document.getElementsByClassName("cd-cart-trigger")[0].childNodes[1].childNodes[0].innerHTML = items.length;
            document.getElementsByClassName("cd-cart-trigger")[0].childNodes[1].childNodes[1].innerHTML = items.length+1;

            var itemCart = "";
            var ul = document.getElementsByClassName("productList")
            var amount = 0;
            items.forEach(item => {

                // var str = "<li class='product'><div class='product-image'><a href='#0'><img src='https://codyhouse.co/demo/add-to-cart-interaction/img/product-preview.png' alt='placeholder'></a></div><div class='product-details'><h3><a href='#0'>Product Name</a></h3><span class='price'>$25.99</span><div class='actions'><a href='#0' class='delete-item'>Delete</a><div class='quantity'><label for='cd-product-3'>Qty</label><span class='select'><select id='cd-product-3' name='quantity'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option><option value='6'>6</option><option value='7'>7</option><option value='8'>8</option><option value='9'>9</option></select></span></div></div></div></li>';
                // "name": "sricgeta", "amount": 22, "description": "pen", "image_url": "https://www.pizzahut.com/assets/w/images/homepage_deal/PH_$5_Lineup_Sidekick_1314x714_updated.jpg", "count": 1 }
                var li = document.createElement('li');
                li.className = "product";
                li.innerHTML = "<div class='product-image'><a href='#0'><img style='height:90px;width:90px' src='"+ item.image_url  +"' alt='placeholder'></a></div><div class='product-details'><h3><a class= 'productName' style='margin-top:-2px' href='#0'>"+ item.name +"</a></h3><span class='price'>$"+ item.amount +"</span><div class='actions'><a href='#0' class='delete-item'>Delete</a><div class='quantity'><label for='cd-product-3'>Qty</label><span class='select'><select id='cd-product-3' name='quantity'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option><option value='6'>6</option><option value='7'>7</option><option value='8'>8</option><option value='9'>9</option></select></span></div></div></div>"
                amount += item.amount;
                ul[0].appendChild(li);
            });

            document.getElementsByClassName("cd-cart-trigger");
            var btn = document.getElementById("checkoutBtn");
            debugger
            var em = document.createElement('em');
            em.innerHTML = 'Checkout - $<span>'+ amount +'</span>'
            

        }

    }

    componentWillMount() {
        var self = this;
        // this.setState({cartObj: { "email_id": "srichetaruj@gmail.com", "tenant_id": "11111", "items": [ { "name": "sricgeta", "amount": 22, "description": "pen", "image_url": "https://www.pizzahut.com/assets/w/images/homepage_deal/PH_$5_Lineup_Sidekick_1314x714_updated.jpg", "count": 1 } ] }})
        var email_id=localStorage.getItem("email")? localStorage.getItem("email"): ""
        var tenant_id=localStorage.getItem("tenant")? localStorage.getItem("tenant"): ""
         
        axios.get( cartURL + 'isLoggedIn/' + email_id+'_'+tenant_id, { headers: { 'Content-Type': 'application/json'}})
        .then(response => { 
            axios.get( kongURL + this.props.match.params.tenant, { headers: { 'Content-Type': 'application/json'}})
            .then(response => {
                console.log(response)
                this.setState({tenantObj: response.data})
                axios.get( userURL + 'user/email/' + localStorage.getItem("email"), { headers: { 'Content-Type': 'application/json'}})
                .then(userResponse => { 
                    console.log(userResponse)
                    self.setState({userObj: userResponse.data})
                })
                .catch(error => {
                    console.log(error)
                    swal({
                        type: 'error',
                        title: 'Login Error',
                        text: "Error Loading Menu",
                    })
                });
            })
            .catch(error => {
                console.log(error)
                swal({
                    type: 'error',
                    title: 'Add Tenant',
                    text: "Error Adding tenant",
                })
            });
            console.log(response)
        },(error)=>{
            window.location.href = userURL + this.props.match.params.tenant
            console.log(error)
        })

        axios.get( kongURL + this.props.match.params.tenant, { headers: { 'Content-Type': 'application/json'}})
        .then(response => { 
            console.log(response)
            self.setState({tenantObj: response.data})
            
        })
        .catch(error => {
            console.log(error)
            swal({
                type: 'error',
                title: 'Add Tenant',
                text: "Error Adding tenant",
            })
        });

        axios.get( cartURL + 'cart/' + email_id+'_'+tenant_id , { headers: { 'Content-Type': 'application/json'}})
        .then(response => {
            this.setState({cartObj: response.data})
        },(error)=>{
            console.log(error)
        })
    }





    handleSignOut(e){
        e.preventDefault();
        var obj = this;
        var riakJson = {"email_id": localStorage.getItem("email"), "tenant_id":this.props.match.params.tenant}
        axios.post( cartURL + 'logout', riakJson , { headers: { 'Content-Type': 'application/json'}})
        .then(response => { 
           obj.setState({userObj: {}})
           window.location.href = userURL + obj.props.match.params.tenant
        })
        .catch(error => {
            console.log(error)
            swal({
                type: 'error',
                title: 'Login Error',
                text: "Please try again later",
            })
        });   
    }

    render() {
        var image_url = "";
        var companyName = "";
        var products = [];
        var hello = "jskdhfdsjf";
        if(Object.keys(this.state.tenantObj).length!=0){
            var tenantObject = this.state.tenantObj;
            image_url = tenantObject.image;
            companyName = tenantObject.name;
            if(tenantObject.products.length > 0){
                products = tenantObject.products.map((prod, index) => {
                    return (
                        <li key={prod.name}>
                            <dl><dt><span><a href="/menu/drinks">{prod.name}</a></span></dt>
                                <dd class="image">
                                    <a href="/menu/drinks"><img src={prod.image} alt="" /></a>
                                </dd>
                                <dd>
                                    <p>{prod.description}</p>
                                    
                                    <p><a href="#0" class="cd-add-to-cart" data-name={prod.name} data-url={prod.image} data-price={prod.amount}>Add To Cart - ${prod.amount}</a></p>
                                </dd>
                            </dl>
                        </li>
                      
                    )
                });

            }
            var cartWrapper = $('.cd-cart-container');
            debugger
            //product id - you don't need a counter in your real project but you can use your real product id
            var productId = 0;
            if(  this.state.flag ) {
                this.setState({flag: false})
                //store jQuery objects
                var cartBody = cartWrapper.find('.body')
                var cartList = cartBody.find('ul').eq(0);
                var cartTotal = cartWrapper.find('.checkout').find('span');
                var cartTrigger = cartWrapper.children('.cd-cart-trigger');
                var cartCount = cartTrigger.children('.count')
                var addToCartBtn = $('.cd-add-to-cart');
                var undo = cartWrapper.find('.undo');
                var undoTimeoutId;

                //add product to cart
                addToCartBtn.on('click', function(event){
                    alert(1);
                    event.preventDefault();
                    addToCart($(this));
                });

                //open/close cart
                cartTrigger.on('click', function(event){
                    event.preventDefault();
                    toggleCart();
                });

                //close cart when clicking on the .cd-cart-container::before (bg layer)
                cartWrapper.on('click', function(event){
                    if( $(event.target).is($(this)) ) toggleCart(true);
                });

                //delete an item from the cart
                cartList.on('click', '.delete-item', function(event){
                    event.preventDefault();
                    removeProduct($(event.target).parents('.product'));
                });

                //update item quantity
                cartList.on('change', 'select', function(event){
                    quickUpdateCart();
                });

                //reinsert item deleted from the cart
                undo.on('click', 'a', function(event){
                    clearInterval(undoTimeoutId);
                    event.preventDefault();
                    cartList.find('.deleted').addClass('undo-deleted').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
                        $(this).off('webkitAnimationEnd oanimationend msAnimationEnd animationend').removeClass('deleted undo-deleted').removeAttr('style');
                        quickUpdateCart();
                    });
                    undo.removeClass('visible');
                });
            }

            function toggleCart(bool) {
                var cartIsOpen = ( typeof bool === 'undefined' ) ? cartWrapper.hasClass('cart-open') : bool;
                
                if( cartIsOpen ) {
                    cartWrapper.removeClass('cart-open');
                    //reset undo
                    clearInterval(undoTimeoutId);
                    undo.removeClass('visible');
                    cartList.find('.deleted').remove();

                    setTimeout(function(){
                        cartBody.scrollTop(0);
                        //check if cart empty to hide it
                        if( Number(cartCount.find('li').eq(0).text()) == 0) cartWrapper.addClass('empty');
                    }, 500);
                } else {
                    cartWrapper.addClass('cart-open');
                }
            }

            function addToCart(trigger) {
                var cartIsEmpty = cartWrapper.hasClass('empty');
                //update cart product list
                addProduct(trigger.data('name'), trigger.data('url'), trigger.data('price'));
                //update number of items 
                updateCartCount(cartIsEmpty);
                //update total price
                updateCartTotal(trigger.data('price'), true);
                //show cart
                cartWrapper.removeClass('empty');
            }

            function addProduct(name, image, price) {
                //this is just a product placeholder
                //you should insert an item with the selected product info
                //replace productId, productName, price and url with your real product info
                productId = productId + 1;                
                
                var productAdded = $("<li class='product'><div class='product-image'><a href='#0'><img src='"+image+"' alt='placeholder'></a></div><div class='product-details'><h3><a href='#0'>"+name+"</a></h3><span class='price'>$"+parseFloat(price)+"</span><div class='actions'><a href='#0' class='delete-item'>Delete</a><div class='quantity'><label for='cd-product-"+ productId +"'>Qty</label><span class='select'><select id='cd-product-"+ productId +"' name='quantity'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option><option value='6'>6</option><option value='7'>7</option><option value='8'>8</option><option value='9'>9</option></select></span></div></div></div></li>");
                cartList.prepend(productAdded);
            }

            function removeProduct(product) {
                clearInterval(undoTimeoutId);
                cartList.find('.deleted').remove();
                
                var topPosition = product.offset().top - cartBody.children('ul').offset().top ,
                    productQuantity = Number(product.find('.quantity').find('select').val()),
                    productTotPrice = Number(product.find('.price').text().replace('$', '')) * productQuantity;
                
                product.css('top', topPosition+'px').addClass('deleted');

                //update items count + total price
                updateCartTotal(productTotPrice, false);
                updateCartCount(true, -productQuantity);
                undo.addClass('visible');

                //wait 8sec before completely remove the item
                undoTimeoutId = setTimeout(function(){
                    undo.removeClass('visible');
                    cartList.find('.deleted').remove();
                }, 8000);
            }

            function quickUpdateCart() {
                var quantity = 0;
                var price = 0;
                
                cartList.children('li:not(.deleted)').each(function(){
                    var singleQuantity = Number($(this).find('select').val());
                    quantity = quantity + singleQuantity;
                    price = price + singleQuantity*Number($(this).find('.price').text().replace('$', ''));
                });

                cartTotal.text(price.toFixed(2));
                cartCount.find('li').eq(0).text(quantity);
                cartCount.find('li').eq(1).text(quantity+1);
            }

            function updateCartCount(emptyCart, quantity) {
                if( typeof quantity === 'undefined' ) {
                    var actual = Number(cartCount.find('li').eq(0).text()) + 1;
                    var next = actual + 1;
                    
                    if( emptyCart ) {
                        cartCount.find('li').eq(0).text(actual);
                        cartCount.find('li').eq(1).text(next);
                    } else {
                        cartCount.addClass('update-count');

                        setTimeout(function() {
                            cartCount.find('li').eq(0).text(actual);
                        }, 150);

                        setTimeout(function() {
                            cartCount.removeClass('update-count');
                        }, 200);

                        setTimeout(function() {
                            cartCount.find('li').eq(1).text(next);
                        }, 230);
                    }
                } else {
                    var actual = Number(cartCount.find('li').eq(0).text()) + quantity;
                    var next = actual + 1;
                    
                    cartCount.find('li').eq(0).text(actual);
                    cartCount.find('li').eq(1).text(next);
                }
            }

            function updateCartTotal(price, bool) {
                bool ? cartTotal.text( (Number(cartTotal.text()) + Number(price)).toFixed(2) )  : cartTotal.text( (Number(cartTotal.text()) - Number(price)).toFixed(2) );
            }

        }


        
        return (
            <div>
                <div class="header_bar no_cta">
          </div>
          <div class="header_container">

              <div class="container">
                  <div class="grid">
                      <div class="column size12of12">
                          <div id="header">

                              <ul class="skip">
                                  <li><a href="#nav">skip to Main Navigation</a></li>
                                  <li><a href="#content">skip to Main Content</a></li>
                                  <li><a href="#footer">skip to Footer</a></li>
                              </ul>

                              <a id="logo" href="/" rel="home"><img src={image_url} alt="Smiley face" style={{height:'65px'}}/><span class="hidden_visually">{companyName} Company</span></a>


                              <div id="utilities">
                                  <ul class="utility_list" style={{marginTop: '21px'}}>

                                      {/* <li class="utility_link store_locator">
                                          <a href="/store-locator"><span aria-hidden="true" data-icon=""></span><span class="hidden_visually med_render_visually">Find a Store</span></a>
                                      </li> */}

                                      <li class="utility_link signin"><a href="#" onClick={this.handleSignOut.bind(this)} id="signIn">Sign Out</a></li>

                                  </ul>
                              </div>

                              <div id="nav" class="content_box_sizing">
                                  <div class="nav_control">
                                      <a href="#nav"><span class="hamburger"></span><span class="hidden_visually">Navigation</span></a>
                                  </div>
                                  <div class="nav_menu">
                                      
                                  </div>
                              </div>

                          </div>
                      </div>
                  </div>
              </div>

          </div>

          <div id="menus">
              <ol class="container">

                  

              </ol>
          </div>

          <div class="container main_content" id="content" tabindex="0">

              <div class="fields">
                  <h1 class="region size2of3 page_heading">{companyName} Menu</h1></div>

             

              <div class="fields">
                  <div class="region size1of1">
                      <ol class="blocks blocks-three-up section_blocks">
                        {products}                      
                      </ol>
                  </div>
              </div>

          </div>

          
          <div class="cd-cart-container">
            <a href="#0" class="cd-cart-trigger">
                Cart
                <ul class="count">
                    <li>0</li>
                    <li>0</li>
                </ul>
            </a>

            <div class="cd-cart">
                <div class="wrapper">
                    <header>
                        <h2>Cart</h2>
                        <span class="undo">Item removed. <a href="#0">Undo</a></span>
                    </header>
                    
                    <div class="body">
                        <ul class="productList">
                            
                        </ul>
                    </div>

                    <footer>
                        <a href="#0" id="checkoutBtn" class="checkout btn"><em>Checkout - $<span>0</span></em></a>
                    </footer>
                </div>
            </div> 
        </div> 
        </div>
        )
    }
}

export default withRouter(Menu);