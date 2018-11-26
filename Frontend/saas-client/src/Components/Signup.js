//UserDetailsForm.js
import React, { Component } from 'react';
import '../assets/css/custom.css'
import { withRouter } from 'react-router-dom'

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isLoggedIn: false,
            errorMsg: ''
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentWillMount() {
    }

    componentDidMount() {
        document.addEventListener('keydown', function(event) {
            if(event.keyCode === 13 ) {
                document.getElementById('ctl00_GlobalBody_SignOnControl_SignInButton').click();
            }
        });
    }

    handleUsernameChange(e) {
        e.preventDefault();
        this.setState({
            username: e.target.value,
            errorMsg: ''
        })
    }

    handleEmailChange(e) {
        e.preventDefault();
        this.setState({
            username: e.target.value,
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

    handleLogin(e) {
        e.preventDefault();

        //validation of email
        var patt = new RegExp('[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.][a-zA-Z]+');
        var res = patt.test(this.state.username);
        if(res && this.state.password.length > 0 ) {

            if(this.state.username === 'admin@saas.com' && this.state.password === 'admin') {
                localStorage.setItem('admin-login', true );
                localStorage.setItem('userid', "response.data.data.id" );
                localStorage.setItem('email', "response.data.data.email" );
                localStorage.setItem('first_name', "response.data.data.first_name" ); 
                this.props.history.push('/adminDashboard');
            } else {
                this.setState({
                    errorMsg: 'Invalid Username Or Password'
                })
            }
        } else {
            this.setState({
                errorMsg: 'Invalid Email or password'
            })
        }
    }

    render() {

        return (
            <div>
            <div id="partner-band"></div>
            <div class="site-wrap signin vipsignin">
                <form method="post" action="/account/signin?from=%2F" id="Form1">
                    <div class="aspNetHidden">
                        <input type="hidden" name="__EVENTTARGET" id="__EVENTTARGET" value="" />
                        <input type="hidden" name="__EVENTARGUMENT" id="__EVENTARGUMENT" value="" />
                        <input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="Kr07G4Ql3Axco8UucEFovxE1UlU/NFCswD3iEi9nxnNorz5oVjT+8c4UhKmzlWywD/lN8SWMjZ1uITOK7VOXFl30NwY=" />
                    </div>
                    
                    <div class="page registration authentication-form" role="main">
                        <div class="row">                               
                                    <div class="panel main-panel sign-up-form large-6 medium-6 small-12 columns">
                                        <div class="sub-panel">
                                            <p class="join-header">SAAS<span class="page-header-emphasis">  Admin</span>
                                            </p>
                                            <br />
                                                <div id="signin-error" class="error-msg">
                                                    { this.state.errorMsg }
                                                </div>
                                            <label for="EmailnameBox">Email Address</label>
                                            <input name="ctl00$GlobalBody$SignOnControl$EmailnameBox" onChange={ this.handleEmailChange } type="text" id="EmailnameBox" />
                                            <label for="UsernameBox">Email Address</label>
                                            <input name="ctl00$GlobalBody$SignOnControl$UsernameBox" onChange={ this.handleUsernameChange } type="text" id="UsernameBox" />
                                            <label for="PasswordBox">Password</label>
                                            <input name="ctl00$GlobalBody$SignOnControl$PasswordBox" onChange={ this.handlePasswordChange } type="password" maxlength="40" id="PasswordBox" />
                                            <input type="hidden" name="ctl00$GlobalBody$SignOnControl$CaptchEnabledField" id="GlobalBody_SignOnControl_CaptchEnabledField" />
                                            <a id="ctl00_GlobalBody_SignOnControl_SignInButton" onClick={ this.handleLogin } class="btn-cta full-width" AlternateText="Sign In" data-wss="&amp;lid=Sign_Button" href="javascript:__doPostBack(&#39;ctl00$GlobalBody$SignOnControl$SignInButton&#39;,&#39;&#39;)">Sign In</a>
                                            
                                        </div>
                                    </div>
                         
                        </div>
                    </div>
                    <div class="aspNetHidden">
                        <input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="8231AAFB" />
                        <input type="hidden" name="__VIEWSTATEENCRYPTED" id="__VIEWSTATEENCRYPTED" value="" />
                    </div>
                </form>
            </div>
            <footer>
                <div class="row">
                    <p class="small-12 small-centered columns copyright">
                    </p>
                </div>
            </footer>

        </div>
        )
    }
}

export default withRouter(Signup);