import React from "react"
import { Link } from "@reach/router"

const NYCID_AUTH = `https://accounts-nonprd.nyc.gov/account/api/oauth/authorize.htm?response_type=token&client_id=cpp-staging`;

const Header = () => <header className="site-header" role="banner">
  <div href="https://planninglabs.nyc/" className="labs-beta-notice hide-for-print"></div>
  <div className="grid-x grid-padding-x">
    <div className="branding cell medium-auto shrink">
      <a href="http://www1.nyc.gov/site/planning/index.page" className="dcp-link"><img src="https://raw.githubusercontent.com/NYCPlanning/logo/master/dcp_logo_772.png" alt="NYC Planning" className="dcp-logo" /></a>
      <a className="site-title">Capital Planning Platform</a>
    </div>
    <div className="cell auto hide-for-medium text-right">
      <button className="responsive-nav-toggler hide-for-print" data-toggle="menu">Menu</button>
    </div>
    <nav role="navigation" className="cell medium-shrink responsive show-for-medium hide-for-print" id="menu" data-toggler=".show-for-medium">
      <ul className="menu vertical medium-horizontal">
        <li><Link activeClassName="active" to="/">Facilities</Link></li>
        <li><Link activeClassName="active" to="/housing">Housing</Link></li>
        <li><Link activeClassName="active" to="/projects">Projects</Link></li>
        <li><Link activeClassName="active" to="/blog">Gallery</Link></li>
        <li><a href={NYCID_AUTH} target="_blank">Login</a></li>
      </ul>
    </nav>
  </div>
</header>

export default Header;
