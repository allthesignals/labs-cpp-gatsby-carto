import React from "react"

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
        <li><a href="/">Facilities</a></li>
        <li><a href="/">Housing</a></li>
        <li><a href="/">FairShare</a></li>
        <li><a href="/">Utilities</a></li>
        <li><a href="/">Gallery</a></li>
        <li><a href="/">About</a></li>
        <li className="external-nav-item"><a href="mailto:email@example.org">Email</a></li>
      </ul>
    </nav>
  </div>
</header>

export default Header;
