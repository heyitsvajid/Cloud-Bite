//UserDetailsForm.js
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import '../assets/js/main.js'

import '../assets/css/reset.css'
import '../assets/css/style.css'
import '../assets/css/font.css'
import '../assets/css/menu.css'
class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isLoggedIn: false,
            errorMsg: ''
        };
        // this.handleUsernameChange = this.handleUsernameChange.bind(this);
        // this.handlePasswordChange = this.handlePasswordChange.bind(this);
        // this.handleLogin = this.handleLogin.bind(this);
    }

    componentWillMount() {
    }

    // componentDidMount() {
    //     document.addEventListener('keydown', function(event) {
    //         if(event.keyCode === 13 ) {
    //             document.getElementById('ctl00_GlobalBody_SignOnControl_SignInButton').click();
    //         }
    //     });
    // }

    // handleUsernameChange(e) {
    //     e.preventDefault();
    //     this.setState({
    //         username: e.target.value,
    //         errorMsg: ''
    //     })
    // }

    // handlePasswordChange(e) {
    //     e.preventDefault();
    //     this.setState({
    //         password: e.target.value,
    //         errorMsg: ''
    //     })
    // }

    // handleLogin(e) {
    //     e.preventDefault();

    //     //validation of email
    //     var patt = new RegExp('[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.][a-zA-Z]+');
    //     var res = patt.test(this.state.username);
    //     if(res && this.state.password.length > 0 ) {

    //         if(this.state.username === 'admin@saas.com' && this.state.password === 'admin') {
    //             localStorage.setItem('admin-login', true );
    //             localStorage.setItem('userid', "response.data.data.id" );
    //             localStorage.setItem('email', "response.data.data.email" );
    //             localStorage.setItem('first_name', "response.data.data.first_name" ); 
    //             this.props.history.push('/adminDashboard');
    //         } else {
    //             this.setState({
    //                 errorMsg: 'Invalid Username Or Password'
    //             })
    //         }
    //     } else {
    //         this.setState({
    //             errorMsg: 'Invalid Email or password'
    //         })
    //     }
    // }

    render() {

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

                              <a id="logo" href="/" rel="home"><span class="hidden_visually">Starbucks Coffee Company</span></a>


                              <div id="utilities">
                                  <ul class="utility_list">

                                      <li class="utility_link store_locator">
                                          <a href="/store-locator"><span aria-hidden="true" data-icon=""></span><span class="hidden_visually med_render_visually">Find a Store</span></a>
                                      </li>

                                      <li class="utility_link signin"><a href="/account/signin" id="signIn">Sign In</a></li>

                                  </ul>
                              </div>

                              <div id="nav" class="content_box_sizing">
                                  <div class="nav_control">
                                      <a href="#nav"><span class="hamburger"></span><span class="hidden_visually">Navigation</span></a>
                                  </div>
                                  <div class="nav_menu">
                                      <ul>

                                          <li id="nav_coffee">
                                              <div class="null_left">

                                              </div><a class="tab" href="/coffee"><strong>Coffee</strong></a>
                                              <div class="null_right">

                                              </div>
                                          </li>
                                          <li id="nav_menudrinkstea">
                                              <div class="null_left">

                                              </div><a class="tab" href="/menu/drinks/tea"><strong>TEA</strong></a>
                                              <div class="null_right">

                                              </div>
                                          </li>
                                          <li id="nav_menu" class="selected">
                                              <div class="null_left">

                                              </div><a class="tab" href="/menu"><strong>Menu</strong></a>
                                              <div class="null_right">

                                              </div>
                                          </li>
                                          <li id="nav_coffeehouse">
                                              <div class="null_left">

                                              </div><a class="tab" href="/coffeehouse"><strong>Coffeehouse</strong></a>
                                              <div class="null_right">

                                              </div>
                                          </li>
                                          <li id="nav_responsibility">
                                              <div class="null_left">

                                              </div><a class="tab" href="/responsibility"><strong>Social Impact</strong></a>
                                              <div class="null_right">

                                              </div>
                                          </li>
                                          <li id="nav_starbucks_rewards">
                                              <div class="null_left">

                                              </div><a class="tab" href="/starbucks-rewards"><strong>Starbucks Rewards</strong></a>
                                              <div class="null_right">

                                              </div>
                                          </li>
                                          <li id="nav_blog">
                                              <div class="null_left">

                                              </div><a class="tab" href="https://starbuckschannel.com"><strong>Blog</strong></a>
                                              <div class="null_right">

                                              </div>
                                          </li>
                                          <li id="nav_gift_cards">
                                              <div class="null_left">

                                              </div><a class="tab" href="https://www.starbucks.com/shop/card/egift"><strong>Gift Cards</strong></a>
                                              <div class="null_right">

                                              </div>
                                          </li>
                                      </ul>
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
                  <h1 class="region size2of3 page_heading">Starbucks Menu</h1></div>

             

              <div class="fields">
                  <div class="region size1of1">
                      <ol class="blocks blocks-three-up section_blocks">
                        <li>
                          <dl><dt><span><a href="/menu/drinks">Drinks</a></span></dt>
                              <dd class="image">
                                  <a href="/menu/drinks"><img src="https://globalassets.starbucks.com/assets/10f88951d9ce4fd4b6eec3f0be5516d2.jpg" alt="" /></a>
                              </dd>
                              <dd>
                                  <p>Ristretto shots of Starbucks® Blonde Espresso harmonize sweetly with steamed whole milk in the Flat White.</p>
                                  
                                  <p><a href="#0" class="cd-add-to-cart" data-price="25.99">Add To Cart</a></p>
                              </dd>
                          </dl>
                      </li>
                      <li>
                          <dl><dt><span><a href="/menu/food">Food</a></span></dt>
                              <dd class="image">
                                  <a href="/menu/food"><img src="https://globalassets.starbucks.com/assets/5c7c2bd2cdf240819e21a7596a37348f.jpg" alt="" /></a>
                              </dd>
                              <dd>
                                  <p>A worthy reason to hit the alarm and hop out of bed: our craveable, flavorful <a href="/menu/food/hot-breakfast/double-smoked-bacon-cheddar-and-egg-sandwich" shape="rect">Double-Smoked Bacon, Cheddar & Egg Breakfast Sandwich</a>.</p>
                                  <p><a href="/promo/food">Check out the full menu</a></p>
                                  <p/>
                              </dd>
                          </dl>
                      </li>
                      <li>
                          <dl><dt><span><a href="/promo/nutrition">Nutrition</a></span></dt>
                              <dd class="image">
                                  <a href="/promo/nutrition"><img src="https://globalassets.starbucks.com/assets/9c289f8e8367411886aab49042d12661.jpg" alt="" /></a>
                              </dd>
                              <dd>
                                  <p>Our <a href="/menu/food/hot-breakfast/sous-vide-egg-bites-bacon-gruyere" shape="rect">Bacon & Gruyère</a> or <a href="/menu/food/hot-breakfast/sous-vide-egg-bites-egg-white-roasted-red-pepper" shape="rect">Egg White & Red Pepper Sous Vide Egg Bites</a> are protein packed and bursting with flavor.</p>
                                  <p><a href="/promo/nutrition">See smart choices to fuel your day</a></p>
                              </dd>
                          </dl>
                      </li>
                      <li>
                          <dl><dt><span><a href="/menu/drinks">Drinks</a></span></dt>
                              <dd class="image">
                                  <a href="/menu/drinks"><img src="https://globalassets.starbucks.com/assets/10f88951d9ce4fd4b6eec3f0be5516d2.jpg" alt="" /></a>
                              </dd>
                              <dd>
                                  <p>Ristretto shots of Starbucks® Blonde Espresso harmonize sweetly with steamed whole milk in the Flat White.</p>
                                  <p><a href="/menu/drinks">See all drinks</a></p>
                              </dd>
                          </dl>
                      </li>
                      <li>
                          <dl><dt><span><a href="/menu/food">Food</a></span></dt>
                              <dd class="image">
                                  <a href="/menu/food"><img src="https://globalassets.starbucks.com/assets/5c7c2bd2cdf240819e21a7596a37348f.jpg" alt="" /></a>
                              </dd>
                              <dd>
                                  <p>A worthy reason to hit the alarm and hop out of bed: our craveable, flavorful <a href="/menu/food/hot-breakfast/double-smoked-bacon-cheddar-and-egg-sandwich" shape="rect">Double-Smoked Bacon, Cheddar & Egg Breakfast Sandwich</a>.</p>
                                  <p><a href="/promo/food">Check out the full menu</a></p>
                                  <p/>
                              </dd>
                          </dl>
                      </li>
                      <li>
                          <dl><dt><span><a href="/promo/nutrition">Nutrition</a></span></dt>
                              <dd class="image">
                                  <a href="/promo/nutrition"><img src="https://globalassets.starbucks.com/assets/9c289f8e8367411886aab49042d12661.jpg" alt="" /></a>
                              </dd>
                              <dd>
                                  <p>Our <a href="/menu/food/hot-breakfast/sous-vide-egg-bites-bacon-gruyere" shape="rect">Bacon & Gruyère</a> or <a href="/menu/food/hot-breakfast/sous-vide-egg-bites-egg-white-roasted-red-pepper" shape="rect">Egg White & Red Pepper Sous Vide Egg Bites</a> are protein packed and bursting with flavor.</p>
                                  <p><a href="/promo/nutrition">See smart choices to fuel your day</a></p>
                              </dd>
                          </dl>
                      </li>
                      </ol>
                  </div>
              </div>

          </div>

          <div id="footer" tabindex="0" class="footer">


              <div class="footer-top">
                  <div class="container">
                      <div class="grid">

                          <ul class="sb-social-icons column size12of12 
                      med_size4of12 ">

                              <li class="facebook">
                                  <a href="http://www.facebook.com/starbucks">
                                      <span class="hidden_visually">Facebook</span>
                                  </a>
                              </li>

                              <li class="twitter">
                                  <a href="http://www.twitter.com/starbucks">
                                      <span class="hidden_visually">Twitter</span>
                                  </a>
                              </li>

                              <li class="googleplus">
                                  <a href="https://plus.google.com/117575809843355974839/" rel="publisher">
                                      <span class="hidden_visually">Google Plus</span>
                                  </a>
                              </li>

                              <li class="pinterest">
                                  <a href="https://www.pinterest.com/starbucks/">
                                      <span class="hidden_visually">Pinterest</span>
                                  </a>
                              </li>

                              <li class="instagram">
                                  <a href="https://instagram.com/starbucks/">
                                      <span class="hidden_visually">Instagram</span>
                                  </a>
                              </li>

                          </ul>

                          <div class="promo column size12of12 med_size8of12" aria-live="polite">
                              <form action="/email-prospect?requesturl=/menu" class="AjaxForm required_form NewsletterSignup" name="NewsletterSignup" method="post" novalidate="novalidate">
                                  <fieldset>
                                      <legendz class="hidden_visually i18n_text" data-email_required="Please enter your email address." data-email_invalid="Please enter a valid email address." data-zipcode_required="Please enter your zip code." data-zipcode_invalid="Please enter a valid zip code.">
                                          Join our email list
                                      </legendz>
                                      <label for="newsletter_signup">Join our email list</label>
                                      <ol class="form">
                                          <li class="input ">
                                              <input class="newsletter_signup" name="newsletter_signup_email" type="email" placeholder="Email address" value="" maxlength="50" />
                                          </li>
                                          <li>
                                              <label for="newsletter_signup_zipcode" class="hidden_visually">Zip code</label>
                                          </li>
                                          <li class="input newsletter_signup_zipcode ">
                                              <input class="newsletter_signup newsletter_signup_zipcode" name="newsletter_signup_zipcode" type="text" pattern="\d*" placeholder="Zip code" value="" maxlength="5" />
                                          </li>
                                          <li class="newsletter_signup_submit">
                                              <span class="button form_button"><button type="submit" aria-describedby="EmailSignupInfo">Get Started</button></span>
                                          </li>
                                      </ol>
                                      <p class="mt_5 clearfix" id="EmailSignupInfo">By clicking "GET STARTED" I agree to receive news, promotions, information, and offers from Starbucks. See our <a href="https://www.starbucks.com/about-us/company-information/online-policies/privacy-policy">Privacy Statement</a> and <a href="https://customerservice.starbucks.com">Customer Service</a>.</p>
                                  </fieldset>
                                  <span class="hidden_visually"><input name="newsletter_placement" maxlength="50" value="footer" /></span>
                              </form>
                          </div>

                      </div>
                  </div>
              </div>

              <div class="footer-main">
                  <div class="container">
                      <div class="grid">
                          <div class="footer_global accordion">
                              <div class="info_block column size12of12 med_size4of12 lg_size2of12">

                                  <h4>
                                      <a href="/about-us">About Us</a>
                                      <label for="726" data-icon="&#x2304" tabindex="0"></label>
                              </h4>
                                  <input id="726" name="footer" type="radio" aria-hidden="true" />
                                  <ol>
                                      <li>
                                          <a href="/about-us/company-information">Our Company</a> </li>
                                      <li>
                                          <a href="http://investor.starbucks.com">Investor Relations</a> </li>
                                      <li>
                                          <a href="http://news.starbucks.com/">Newsroom</a> </li>
                                  </ol>
                              </div>
                              <div class="info_block column size12of12 med_size4of12 lg_size2of12">

                                  <h4>
                                      <a href="/careers">Career Center</a>
                                      <label for="782" data-icon="&#x2304" tabindex="0"></label>
                              </h4>
                                  <input id="782" name="footer" type="radio" aria-hidden="true" />
                                  <ol>
                                      <li>
                                          <a href="/careers/working-at-starbucks">Working at Starbucks</a> </li>
                                      <li>
                                          <a href="/careers/college-plan">College Plan</a> </li>
                                      <li>
                                          <a href="/careers/current-partners">Current Partners</a> </li>
                                      <li>
                                          <a href="/careers/corporate-careers">Corporate Careers</a> </li>
                                      <li>
                                          <a href="/careers/manufacturing-distribution">Manufacturing and Distribution</a> </li>
                                      <li>
                                          <a href="/careers/retail-careers">Retail Careers</a> </li>
                                      <li>
                                          <a href="/careers/international-careers">International Careers</a> </li>
                                  </ol>
                              </div>
                              <div class="info_block column size12of12 med_size4of12 lg_size2of12">

                                  <h4>
                                      <a href="/business">For Business</a>
                                      <label for="813" data-icon="&#x2304" tabindex="0"></label>
                              </h4>
                                  <input id="813" name="footer" type="radio" aria-hidden="true" />
                                  <ol>
                                      <li>
                                          <a href="https://solutions.starbucks.com/your-business/office-coffee">Office Coffee</a> </li>
                                      <li>
                                          <a href="/business/international-stores">Starbucks Coffee International</a> </li>
                                      <li>
                                          <a href="/business/foodservice">Foodservice</a> </li>
                                      <li>
                                          <a href="https://solutions.starbucks.com/our-platforms/licensed-stores">Licensed Stores</a> </li>
                                      <li>
                                          <a href="http://explore.starbuckscardb2b.com/businessgifts?utm_source=SBUX.com&amp;utm_medium=SBUXsiteLink&amp;utm_campaign=Footer-ForBusiness">Starbucks Card Corporate Sales</a> </li>
                                      <li>
                                          <a href="/business/landlord-faq">Landlord Support Center</a> </li>
                                      <li>
                                          <a href="/business/suppliers">Suppliers</a> </li>
                                  </ol>
                              </div>
                              <div class="info_block column size12of12 med_size4of12 lg_size2of12">

                                  <h4>
                                      <a href="/coffeehouse/community">Online Community</a>
                                      <label for="827" data-icon="&#x2304" tabindex="0"></label>
                              </h4>
                                  <input id="827" name="footer" type="radio" aria-hidden="true" />
                                  <ol>
                                      <li>
                                          <a href="http://www.twitter.com/starbucks/">Twitter</a> </li>
                                      <li>
                                          <a href="http://www.facebook.com/starbucks/">Facebook</a> </li>
                                      <li>
                                          <a href="https://instagram.com/starbucks/">Instagram</a> </li>
                                      <li>
                                          <a href="https://www.linkedin.com/company/starbucks?utm_source=homepage&amp;utm_medium=footer&amp;utm_campaign=ev">LinkedIn</a> </li>
                                      <li>
                                          <a href="https://www.pinterest.com/starbucks/">Pinterest</a> </li>
                                      <li>
                                          <a href="http://www.youtube.com/starbucks">YouTube</a> </li>
                                      <li>
                                          <a href="https://ideas.starbucks.com">My Starbucks Idea</a> </li>
                                  </ol>
                              </div>
                              <div class="info_block column size12of12 med_size4of12 lg_size2of12">

                                  <h4>
      <span>Quick Links</span>                        </h4>
                                  <ol>
                                      <li>
                                          <a href="/account">My Account</a> </li>
                                      <li>
                                          <a href="/store-locator">Store Locator</a> </li>
                                      <li>
                                          <a href="/menu/nutrition">Nutrition Info</a> </li>
                                      <li>
                                          <a href="https://customerservice.starbucks.com/">Customer Service</a> </li>
                                  </ol>
                              </div>

                          </div>
                      </div>
                  </div>
              </div>

              <div class="footer-bottom">
                  <div class="container">
                      <div class="grid">

                          <div class="column size12of12">
                              <ul class="site_selection">
                                  <li class="change">
                                      <a class="culture" href="/site-selector"><img alt="en-US" class="flag" src="https://www.starbucks.com/static/images/global/flags/us.png" />Change Region</a>
                                  </li>

                                  <li class="only language">English </li>

                              </ul>
                          </div>

                          <div class="column size12of12">
                              <ul class="footer_sub">
                                  <li><a href="/about-us/company-information/online-policies/web-accessibility">Web Accessibility</a></li>
                                  <li><a href="/about-us/company-information/online-policies/privacy-policy">Privacy Policy</a></li>
                                  <li><a href="/about-us/company-information/online-policies/terms-of-use">Terms of Use</a></li>
                                  <li><a href="https://customerservice.starbucks.com/app/contact/ask/">Contact Us</a></li>
                                  <li><a href="/partners">Partners</a></li>
                                  <li><a href="/site-map">Site Map</a></li>
                              </ul>
                          </div>

                          <div class="column size12of12">
                              <p class="footer_copyright">© 2018 Starbucks Corporation. All rights reserved.</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="cd-cart-container empty">
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
                        <ul>
                            
                        </ul>
                    </div>

                    <footer>
                        <a href="#0" class="checkout btn"><em>Checkout - $<span>0</span></em></a>
                    </footer>
                </div>
            </div> 
        </div> 
        </div>
        )
    }
}

export default withRouter(Menu);