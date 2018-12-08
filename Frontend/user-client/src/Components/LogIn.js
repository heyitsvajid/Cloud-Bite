//UserDetailsForm.js
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import '../assets/css/login-css.css'
import axios from 'axios'
import swal from 'sweetalert2'
import { cartURL, reactURL, userURL, tenantURL, kongURL } from '../config/environment';


class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoggedIn: false,
            errorMsg: '',
            tenantObj: {}
        };
    }

    componentWillMount() {

        var self = this;
        
        var email_id=localStorage.getItem("email")? localStorage.getItem("email"): ""
        var tenant_id=localStorage.getItem("tenant")? localStorage.getItem("tenant"): ""
         
        axios.get( cartURL + 'isLoggedIn/' + email_id+'_'+tenant_id, { headers: { 'Content-Type': 'application/json'}})
        .then(response => { 
            console.log(response)
            window.location.href =  reactURL + "menu/" + this.props.match.params.tenant
        },(error)=>{
            console.log(error)
        })


        var self = this;
        axios.get( kongURL + this.props.match.params.tenant, { headers: { 'Content-Type': 'application/json'}})
        .then(response => { 
            console.log(response)
            self.setState({tenantObj: response.data})
        })
        .catch(error => {
            console.log(error)
            swal({
                type: 'error',
                title: 'Page not found',
                text: "URL does not exist! Please check the URL and try again",
            })
        });
    }

    handleEmailChange(e) {
        e.preventDefault();
        this.setState({
            email: e.target.value,
            errorMsg: ''
        })
    }

    handlePasswordChange(e) {
        e.preventDefault();
        this.setState({
            password: e.target.value,
            errorMsg: ''
        })
    }

    handleJoinButton(e){
        window.location.href = reactURL + "signup/" + this.props.match.params.tenant
    }

    handleLogin(e) {
        e.preventDefault();
        var obj = this;
        axios.get( userURL + 'user/email/' + this.state.email , { headers: { 'Content-Type': 'application/json'}})
        .then(response => { 
            var userPresent = false;
            var userPassword = "";
            var userTenantObjects = response.data.tenants;
            userTenantObjects.forEach(object => {
                if(object["tenant_id"] == obj.state.tenantObj.id){
                    userPresent = true;
                    userPassword = object.password;
                    return
                }
            });

            if(!userPresent){
                swal({
                    type: 'error',
                    title: 'Login Error',
                    text: "You have not registered yet!",
                })
                return;
            }
            if(userPassword == obj.state.password){
                localStorage.setItem("email",this.state.email);
                localStorage.setItem("tenant",this.props.match.params.tenant);
                var riakJson = {"email_id": this.state.email, "tenant_id":this.props.match.params.tenant}
                axios.post( cartURL + 'login', riakJson , { headers: { 'Content-Type': 'application/json'}})
                .then(response => { 
                     console.log(response);
                     window.location.href = reactURL + "menu/" + this.props.match.params.tenant
                    },(error)=>{
                        console.log(error)
                    })
                
                
            }
            else{
                swal({
                    type: 'error',
                    title: 'Login Error',
                    text: "Incorrect Username or Password",
                })
            }
            console.log(response)
            obj.setState({email: ""});
        })
        .catch(error => {
            console.log(error)
            swal({
                type: 'error',
                title: 'Login Error',
                text: "Incorrect Username or Password",
            })
        });   
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
                            <a href="/" class="siren___qFldR block m3 lg-m4" style={{width:"125px"}}>
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
                                            <form method="post" novalidate="" onSubmit = {this.handleLogin.bind(this)}>
                                                <div class="field mb2 field--isInvalid">
                                                    <div class="field__inputWrapper flex">
                                                        {/* <label class="floatLabel color-textBlackSoft" for="username">Username or email address</label> --> */}
                                                        <input aria-required="true" class="fieldInput" placeholder="Username or email address" id="username" name="username" required="" autocomplete="username" data-e2e="username" data-ga-event="change" data-ga="event: account-signin-input; sectionName: SignIn; inputName: Username" type="text" value={this.state.email} onChange={this.handleEmailChange.bind(this)}  aria-describedby="username-validationHint" aria-invalid="true"/>
                                                        <svg viewBox="0 0 24 24" class="valign-middle field__warningIcon self-end flex-shrink-none mb1" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false" style={{width: '24px', height: '24px'}}>
                                                            <path d="M12.65 3.04l7.66 14.165c.264.558-.04 1.2-.662 1.2H4.352c-.622 0-.926-.642-.652-1.22l7.644-14.137c.297-.61 1.025-.606 1.307-.008zM11 8.904v3.192c0 .5.448.904 1 .904s1-.405 1-.904V8.904c0-.5-.448-.904-1-.904s-1 .405-1 .904zM11 15c0 .552.448 1 1 1s1-.448 1-1-.448-1-1-1-1 .448-1 1z"></path>
                                                        </svg>
                                                    </div>
                                                    <div class="">
                                                        {/* <div class=""><span class="block pt2 " id="username-validationHint"><span class="fieldStatus fieldStatus--error"><svg viewBox="0 0 24 24" class="valign-middle fieldStatus__icon" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false" style={{width: '20px', height: '20px'}}><path d="M13.06 12l5.72-5.72c.292-.292.292-.767 0-1.06-.294-.293-.768-.293-1.06 0L12 10.94 6.28 5.22c-.293-.293-.767-.293-1.06 0-.293.293-.293.768 0 1.06L10.94 12l-5.72 5.72c-.293.292-.293.767 0 1.06.146.146.338.22.53.22s.384-.074.53-.22L12 13.06l5.72 5.72c.145.146.337.22.53.22.19 0 .383-.074.53-.22.292-.293.292-.768 0-1.06L13.06 12z"></path></svg><span class="fieldStatus__text"><span><span class="hiddenVisually">Error:</span>Enter an email/username.</span>
                                                            </span>
                                                            </span>
                                                            </span>
                                                        </div> */}
                                                    </div>
                                                </div>
                                                <div class="field mb3 field--isInvalid">
                                                    <div class="field__inputWrapper flex">
                                                        <input aria-required="true" class="fieldInput" placeholder="password" id="password" name="password" required="" autocomplete="current-password" data-ga-event="change" data-ga="event: account-signin-input; sectionName: SignIn; inputName: Password" data-e2e="password" type="password" onChange={this.handlePasswordChange.bind(this)} value={this.state.password} aria-describedby="password-validationHint" aria-invalid="true" />
                                                        {/* <button aria-label="Show password text" class="mb1 color-textBlackSoft text-sm text-bold self-end px3" type="button">
                                                        </button> */}
                                                        <svg viewBox="0 0 24 24" class="valign-middle field__warningIcon self-end flex-shrink-none mb1" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false" style={{width: '24px', height: '24px'}}>
                                                            <path d="M12.65 3.04l7.66 14.165c.264.558-.04 1.2-.662 1.2H4.352c-.622 0-.926-.642-.652-1.22l7.644-14.137c.297-.61 1.025-.606 1.307-.008zM11 8.904v3.192c0 .5.448.904 1 .904s1-.405 1-.904V8.904c0-.5-.448-.904-1-.904s-1 .405-1 .904zM11 15c0 .552.448 1 1 1s1-.448 1-1-.448-1-1-1-1 .448-1 1z"></path>
                                                        </svg>
                                                    </div>
                                                    <div class="">
                                                        {/* <div class=""><span class="block pt2 " id="password-validationHint"><span class="fieldStatus fieldStatus--error"><svg viewBox="0 0 24 24" class="valign-middle fieldStatus__icon" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false" style={{width: '20px', height: '20px'}}><path d="M13.06 12l5.72-5.72c.292-.292.292-.767 0-1.06-.294-.293-.768-.293-1.06 0L12 10.94 6.28 5.22c-.293-.293-.767-.293-1.06 0-.293.293-.293.768 0 1.06L10.94 12l-5.72 5.72c-.293.292-.293.767 0 1.06.146.146.338.22.53.22s.384-.074.53-.22L12 13.06l5.72 5.72c.145.146.337.22.53.22.19 0 .383-.074.53-.22.292-.293.292-.768 0-1.06L13.06 12z"></path></svg><span class="fieldStatus__text"><span><span class="hiddenVisually">Error:</span>Enter a password.</span>
                                                            </span>
                                                            </span>
                                                            </span>
                                                        </div> */}
                                                    </div>
                                                </div>
                                                
                                                <p class="mb3"><a class="color-greenStarbucks" href="/account/forgot-password">Forgot your password?</a></p>
                                                <div class="invisible base___3dWsJ md___X7jh3  ">
                                                    <div class="slider___1lmdn" style={{transform: 'none'}}><span class="flex flex-column items-end"><div class="visible"><button class="sb-frap" type="submit" data-e2e="signInButton" data-ga-event="click" data-ga="event: account-signin-submit-click; sectionName: SignIn; inputName: Sign-In">Sign in</button></div></span></div>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="base___Hvg4n bg-blackWarm container" >
                                            <div class="padding___2PNk5 mx-auto narrow___pLMqt lg-pt6 lg-pb9">
                                                <h2 class="text-xxs text-bold text-upper mb4 color-textWhiteSoft">Join <span>{companyName}</span><span>™</span></h2>
                                                <a href = "#" onClick = {this.handleJoinButton.bind(this)} class="sb-button sb-button--default sb-button--dark sb-button--rewardsGold mb4" type="button" data-e2e="joinNowButton">Join now</a>
                                                <h2 class="sb-heading sb-heading--medium mb3 color-textWhite" tabindex="-1">Create an account and bring on the Order!</h2>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr aria-hidden="true" class="sb-rule sb-rule--thin mb4 lg-mb6" />
                        {/* <footer class="px4 lg-px6 frapPadding">
                            <div class="grid">
                                <div class="gridItem mb3 md-mb5 size12of12 md-size6of12 lg-size4of12"><a class="text-noUnderline"><span class="flag___3BQiR mr2">🇺🇸</span><button class="sb-button sb-button--text pl0 pt0" type="button">Change region</button></a></div>
                                <div class="gridItem mb3 size12of12 md-size6of12 lg-size3of12"><a href="https://www.starbucks.com/responsibility" class="block mb2 text-noUnderline">Responsibility</a><a href="https://www.starbucks.com/about-us/company-information/online-policies/web-accessibility" class="block mb2 text-noUnderline">Web Accessibility</a><a href="https://www.starbucks.com/about-us/company-information/online-policies/privacy-policy" class="block mb2 text-noUnderline">Privacy Policy</a><a href="https://www.starbucks.com/about-us/company-information/online-policies/terms-of-use" class="block mb2 text-noUnderline">Terms of Use</a></div>
                                <div class="gridItem mb3 size12of12 md-size6of12 lg-size3of12">© 2018 {companyName}</div>
                            </div>
                        </footer> */}
                    </div>
                </main>
        </div>
        )
    }
}

export default withRouter(SignIn);