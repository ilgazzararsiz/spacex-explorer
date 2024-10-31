import "./header.scss";

import Navigation from "../Navigation";
import spaceXLogo from "../../assests/images/spacex_logo.png";

const Header = () => {
  return (
    <div className="header">
      <img className="header__logo" src={spaceXLogo} alt="space x logo"></img>
      <Navigation />
    </div>
  );
};

export default Header;
