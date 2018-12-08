//UserDetailsForm.js
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import '../assets/css/login-css.css'
import axios from 'axios'
import swal from 'sweetalert2'
import { cartURL, reactURL, userURL, tenantURL, kongURL } from '../config/environment';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            tenantObj: {}
        };
    }

    componentWillMount() {
        var self = this;
        axios.get( kongURL + this.props.match.params.tenant, { headers: { 'Content-Type': 'application/json'}})
        .then(response => { 
            console.log(response)
            this.setState({tenantObj: response.data})
        })
    }

    handleNameChange(e) {
        e.preventDefault();
        this.setState({
            name: e.target.value,
        })
    }

    handleEmailChange(e) {
        e.preventDefault();
        this.setState({
            email: e.target.value,
        })
    }

    handlePasswordChange(e) {
        e.preventDefault();
        this.setState({
            password: e.target.value,
        })
    }

    handleSubmit(e) {
        e ? e.preventDefault() : '';
        var tenantObject = this.state.tenantObj;
        if(Object.keys(this.state.tenantObj).length==0){
            swal({
                type: 'error',
                title: 'Invalid Tenant',
                text: "No Tenant found",
            })
            return;
        }
        var self = this;


         axios.get( userURL + 'user/email/' + this.state.email , { headers: { 'Content-Type': 'application/json'}})
         .then(response => { 
            var alreadyPresent = false;
            var userTenantObjects = response.data.tenants;
            userTenantObjects.forEach(object => {
                if(object["tenant_id"] == self.state.tenantObj.id){
                    alreadyPresent = true;
                    swal({
                        type: 'error',
                        title: 'Registration Error',
                        text: "You have already registered!",
                    })
                    return
                }
            });

            if(alreadyPresent){
                return;
            }

            var userObj = {
                        "user_name": this.state.name,
                        "tenant_name": tenantObject.name,
                        "tenant_id": tenantObject.id,
                        "password": this.state.password,
                        "orders": []
             }

            self.setState({password: ''});

            response.data.tenants.push(userObj);
            
            axios.put( userURL + "user" , response.data,{ headers: { 'Content-Type': 'application/json'}})
            .then(response => { 
                console.log(response)
                swal({
                    type: 'success',
                    title: 'Howdy!',
                    text: "You have successfully registered! Please login for some snacks!",
                })
                window.location.href = userURL + this.props.match.params.tenant 
            })
         },(error)=>{
            var userObj = {
                "email": this.state.email,
                "tenants": [
                    {
                        "user_name": this.state.name,
                        "tenant_name": tenantObject.name,
                        "tenant_id": tenantObject.id,
                        "password": this.state.password,
                        "orders": []
                    }
                ]
             }
            axios.post( userURL + "user" ,userObj,{ headers: { 'Content-Type': 'application/json'}})
            .then(response => { 
                console.log(response)
                swal({
                    type: 'success',
                    title: 'Howdy!',
                    text: "You have successfully registered! Please login for some snacks!",
                })
                window.location.href = userURL + this.props.match.params.tenant 
            })
            .catch(error => {
                console.log(error)
                swal({
                    type: 'error',
                    title: 'Sign Up!',
                    text: "Error in joining the website! Please try again later!",
                })

                });

         })
    }

    handleJoinButton(e){
        window.location.href = reactURL + localStorage.getItem("tenant");
    }


    render() {
        var image_url = "";
        var companyName = "";
        if(Object.keys(this.state.tenantObj).length!=0){
            var tenantObject = this.state.tenantObj;
            image_url = tenantObject.image;
            companyName = tenantObject.name;
        }
        return (
            <div>
                <main id="content" class="base___8qAal height-100 flex flex-column " role="main">
                    <div class="sb-headerCrate flex flex-column bg-white  flex-shrink-none">
                        <div class="lg-flex flex-column base___46s3P">
                            <a href="/" class="siren___qFldR block m3 lg-m4">
                            <img src={image_url} alt="Smiley face" style={{width: '90px', height:'90px'}}/>
                                <span class="hiddenVisually">{companyName} Company</span></a>
                            <div class="flex flex-grow flex-column ">
                                <div class="container--headerCrate sb-headerCrate--content size12of12 ">
                                    <h1 class="sb-heading sb-heading--large text-bold" tabindex="-1">Sign in or create an account 🌟</h1></div>
                            </div>
                        </div>
                    </div>
                    <div class="sb-contentCrate flex-grow ">
                        <div class="relative flex-auto">
                            <div class="flex-auto">
                                <div>
                                    <div>
                                        <div class="padding___2PNk5 mx-auto narrow___pLMqt pb5">
                                            <form method="post" novalidate="" onSubmit={this.handleSubmit.bind(this)}>
                                                <div class="field mb2 field--isInvalid">
                                                    <div class="field__inputWrapper flex">
                                                        <input value={this.state.name} onChange={this.handleNameChange.bind(this)} aria-required="true" class="fieldInput" placeholder="Name" id="username" name="username" required="" autocomplete="username" data-e2e="username" data-ga-event="change" data-ga="event: account-signin-input; sectionName: SignIn; inputName: Username" type="text" aria-describedby="username-validationHint" aria-invalid="true"/>
                                                        <svg viewBox="0 0 24 24" class="valign-middle field__warningIcon self-end flex-shrink-none mb1" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false" style={{width: '24px', height: '24px'}}>
                                                            <path d="M12.65 3.04l7.66 14.165c.264.558-.04 1.2-.662 1.2H4.352c-.622 0-.926-.642-.652-1.22l7.644-14.137c.297-.61 1.025-.606 1.307-.008zM11 8.904v3.192c0 .5.448.904 1 .904s1-.405 1-.904V8.904c0-.5-.448-.904-1-.904s-1 .405-1 .904zM11 15c0 .552.448 1 1 1s1-.448 1-1-.448-1-1-1-1 .448-1 1z"></path>
                                                        </svg>
                                                    </div>
                                                    <div class="">
                                                    </div>
                                                </div>
                                                <div class="field mb2 field--isInvalid">
                                                    <div class="field__inputWrapper flex">
                                                        {/* <label class="floatLabel color-textBlackSoft" for="username">Email address</label> --> */}
                                                        <input onChange={this.handleEmailChange.bind(this)} aria-required="true" class="fieldInput" placeholder="Email Address" id="username" name="username" required="" autocomplete="username" data-e2e="username" data-ga-event="change" data-ga="event: account-signin-input; sectionName: SignIn; inputName: Username" type="text" value={this.state.email} aria-describedby="username-validationHint" aria-invalid="true"/>
                                                        <svg viewBox="0 0 24 24" class="valign-middle field__warningIcon self-end flex-shrink-none mb1" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false" style={{width: '24px', height: '24px'}}>
                                                            <path d="M12.65 3.04l7.66 14.165c.264.558-.04 1.2-.662 1.2H4.352c-.622 0-.926-.642-.652-1.22l7.644-14.137c.297-.61 1.025-.606 1.307-.008zM11 8.904v3.192c0 .5.448.904 1 .904s1-.405 1-.904V8.904c0-.5-.448-.904-1-.904s-1 .405-1 .904zM11 15c0 .552.448 1 1 1s1-.448 1-1-.448-1-1-1-1 .448-1 1z"></path>
                                                        </svg>
                                                    </div>
                                                    <div class="">
                                                    </div>
                                                </div>
                                                <div class="field mb3 field--isInvalid">
                                                    <div class="field__inputWrapper flex">
                                                        {/* <label class="floatLabel color-textBlackSoft" for="password">Password</label> */}
                                                        <input value={this.state.password} onChange={this.handlePasswordChange.bind(this)} placeholder="Password" aria-required="true" class="fieldInput" id="password" name="password" required="" autocomplete="current-password" data-ga-event="change" data-ga="event: account-signin-input; sectionName: SignIn; inputName: Password" data-e2e="password" type="password"  aria-describedby="password-validationHint" aria-invalid="true" />

                                                        <svg viewBox="0 0 24 24" class="valign-middle field__warningIcon self-end flex-shrink-none mb1" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false" style={{width: '24px', height: '24px'}}>
                                                            <path d="M12.65 3.04l7.66 14.165c.264.558-.04 1.2-.662 1.2H4.352c-.622 0-.926-.642-.652-1.22l7.644-14.137c.297-.61 1.025-.606 1.307-.008zM11 8.904v3.192c0 .5.448.904 1 .904s1-.405 1-.904V8.904c0-.5-.448-.904-1-.904s-1 .405-1 .904zM11 15c0 .552.448 1 1 1s1-.448 1-1-.448-1-1-1-1 .448-1 1z"></path>
                                                        </svg>
                                                    </div>
                                                    <div class="">
                                                    </div>
                                                </div>
                                                
                                                <div class="invisible base___3dWsJ md___X7jh3  ">
                                                    <div class="slider___1lmdn" style={{transform: 'none'}}><span class="flex flex-column items-end"><div class="visible"><button class="sb-frap" type="submit" data-e2e="signInButton" data-ga-event="click" data-ga="event: account-signin-submit-click; sectionName: SignIn; inputName: Sign-In">Register</button></div></span></div>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="base___Hvg4n bg-blackWarm container" >
                                            <div class="padding___2PNk5 mx-auto narrow___pLMqt lg-pt6 lg-pb9">
                                                <h2 class="text-xxs text-bold text-upper mb4 color-textWhiteSoft">Join <span>{companyName} Rewards</span><span>™</span></h2>
                                                <a href = "#" onClick = {this.handleJoinButton.bind(this)} class="sb-button sb-button--default sb-button--dark sb-button--rewardsGold mb4" type="button" data-e2e="joinNowButton">Sign In</a>
                                                <h2 class="sb-heading sb-heading--medium mb3 color-textWhite" tabindex="-1">Create an account and bring on the Rewards!</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr aria-hidden="true" class="sb-rule sb-rule--thin mb4 lg-mb6" />
                        <footer class="px4 lg-px6 frapPadding">
                            <div class="grid">
                                <div class="gridItem mb3 md-mb5 size12of12 md-size6of12 lg-size4of12"><a class="text-noUnderline"><span class="flag___3BQiR mr2">🇺🇸</span><button class="sb-button sb-button--text pl0 pt0" type="button">Change region</button></a></div>
                                <div class="gridItem mb3 size12of12 md-size6of12 lg-size3of12"><a href="https://www.starbucks.com/responsibility" class="block mb2 text-noUnderline">Responsibility</a><a href="https://www.starbucks.com/about-us/company-information/online-policies/web-accessibility" class="block mb2 text-noUnderline">Web Accessibility</a><a href="https://www.starbucks.com/about-us/company-information/online-policies/privacy-policy" class="block mb2 text-noUnderline">Privacy Policy</a><a href="https://www.starbucks.com/about-us/company-information/online-policies/terms-of-use" class="block mb2 text-noUnderline">Terms of Use</a></div>
                                <div class="gridItem mb3 size12of12 md-size6of12 lg-size3of12">© 2018 {companyName}</div>
                            </div>
                        </footer>
                    </div>
                </main>

        </div>
        )
    }
}

export default withRouter(Signup);