import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import '../assets/css/admin.css'
import MultiplexForm from './TenantForm';


class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addMultiplex: true,
            addMovie: false,
            addDashboard: false,
            addUserTracking: false,
            showBillingDetails: false,
            showMultiplexBillings: false,
            listUsers: false,
            isLoggedIn: false,
            user:{}

        };
        this.handleLogout = this.handleLogout.bind(this);

    }

    componentWillMount() {
        if(localStorage.getItem('admin-login') === "true"){
            this.setState({
                isLoggedIn: true,
                adminEmail: "admin@saas.com",
            }, () => {
                localStorage.setItem('admin_name','SAAS Admin')
                this.setState({addMultiplex: true})
                this.setState({
                    admin_name:localStorage.getItem('SAAS Admin')
                })
                localStorage.setItem('roleId',3)
            })    
        }else{
            this.props.history.push('/');
        }

    }

    handleLinkClick = (e) => {
        e.preventDefault();
        this.setState({
            addDashboard: e.currentTarget.value == 1,
            addMultiplex: e.currentTarget.value == 4,
            showBillingDetails: e.currentTarget.value == 7,
            listUsers: e.currentTarget.value == 8,
        })
        console.log(this.state);
    }

    render() {
        let addDashboard = 1;
        let addMultiplex = 4;
        let addMultiplexAdmin = 5;
        let showBillingDetails = 7;
        let listUsers = 8;
        return (
            // </body>
            <body class="app" id="admin-pages">
                <div id="loader" class="fadeOut">
                    <div class="spinner"></div>
                </div>
                
                <div>
                    <div class="sidebar">
                        <div class="sidebar-inner">
                            <div class="sidebar-logo">
                                <div class="peers ai-c fxw-nw">
                                    <div class="peer peer-greed">
                                        <a class="sidebar-link td-n" href="https://colorlib.com/polygon/adminator/index.html">
                                            <div class="peers ai-c fxw-nw">
                                            <div class="peer">
                                                <div class="logo"><img src="https://colorlib.com/polygon/adminator/assets/static/images/logo.png" alt="" /></div>
                                            </div>
                                            <div class="peer peer-greed">
                                                <h5 class="admin-head lh-1 mB-0 logo-text">Administrator</h5>
                                            </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="peer">
                                        <div class="mobile-toggle sidebar-toggle"><a href="" class="td-n"><i class="ti-arrow-circle-left"></i></a></div>
                                    </div>
                                </div>
                            </div>
                            
                            <ul class="sidebar-menu scrollable pos-r ps">

                            {localStorage.getItem('roleId')==3 ?
                            <li class="nav-item" value={addMultiplex} onClick={this.handleLinkClick.bind(this)} data-toggle="tooltip" data-placement="right" title="" data-original-title="Link">
                                <a class="sidebar-link" href="#" value={addMultiplex} onClick={this.handleLinkClick.bind(this)}>
                                    <span class="icon-holder">
                                        <i class="c-red-500 ti-files"></i> 
                                        </span><span class="title">Tenant Dashboard</span>
                                </a>
                            </li> : ''}

                            </ul>
                        </div>
                    </div>
                    <div class="page-container">
                        <div id = "admin-header" class="header navbar">
                            <div class="header-container">
                            <ul class="nav-left">
                            </ul>
                            <ul class="nav-right">
                                <li class="dropdown">
                                    <a href="" class="dropdown-toggle no-after peers fxw-nw ai-c lh-1" data-toggle="dropdown">
                                        <div class="peer mR-10"><img class="w-2r bdrs-50p" src="data:image/png;base64,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" alt=""/></div>
                                        <a href="/" onClick={ this.handleLogout } className="hide-logged-in">Sign Out</a>
                                    </a>
                                    <ul class="dropdown-menu fsz-sm">
                                        <li><a href="" class="d-b td-n pY-5 bgcH-grey-100 c-grey-700"><i class="ti-settings mR-10"></i> <span>Setting</span></a></li>
                                        <li><a href="" class="d-b td-n pY-5 bgcH-grey-100 c-grey-700"><i class="ti-user mR-10"></i> <span>Profile</span></a></li>
                                        <li><a href="" class="d-b td-n pY-5 bgcH-grey-100 c-grey-700"><i class="ti-email mR-10"></i> <span>Messages</span></a></li>
                                        <li role="separator" class="divider"></li>
                                        <li><a href="" class="d-b td-n pY-5 bgcH-grey-100 c-grey-700"><i class="ti-power-off mR-10"></i> <span>Logout</span></a></li>
                                    </ul>
                                </li>
                            </ul>
                            </div>
                        </div>
                        <main class="main-content bgc-grey-100">
                            <div id="mainContent">
                            {this.state.addMultiplex ? this.returnMultiplex() : ''}
                            {this.state.addDashboard ? this.returnDashboard() : ''}
                            {this.state.listUsers ? this.returnUserList() : ''}
                            {this.state.showBillingDetails ? this.returnBillingDetails(): ''}
                            </div>
                        </main>
                        <footer class="bdT ta-c p-30 lh-0 fsz-sm c-grey-600">
                            <span>Copyright © 2018 Designed by <a href="" target="_blank" title="NetflixAdmin">SAAS Admin</a>. All rights reserved.</span>

                        </footer>
                    </div>
                </div>
                <script type="text/javascript" src="./vendor.js"></script><script type="text/javascript" src="./bundle.js"></script>
                </body>
            )
    }

    
    returnMultiplex() {
        return (
            <div class="container-fluid">
            <h3 class="data-header">Tenant Dashboard</h3>
            <br/>
            <div class="row">
                <div class="col-md-12">
                    <div class="admin-list bgc-white bd bdrs-3 p-20 mB-20">
                        <MultiplexForm />
                    </div>
                </div>
            </div>            
        </div>
        )
    }

    handleLogout() {
        //alert("In handleLogout");
        localStorage.clear();
        this.props.history.push('/');
    }
}

export default withRouter(AdminDashboard);