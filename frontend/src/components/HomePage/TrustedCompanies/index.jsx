import airbnbLogo from "../../../assets/images/airbnb-logo.png";
import nasaLogo from "../../../assets/images/logo-nasa.png";
import uberLogo from "../../../assets/images/uber.png";
import targetLogo from "../../../assets/images/target-logo.png";
import nytLogo from "../../../assets/images/nyt.png";
import etsyLogo from "../../../assets/images/logo-etsy.png";

const TrustedCompanies = () => {
  return (
    <div className="trusted-companies-cont">
      <p>TRUSTED BY COMPANIES ALL OVER THE WORLD</p>
      <div className="company-logos-cont">
        <div className="airbnb">
          <img
            alt="Airbnb"
            height="35"
            width="112"
            loading="lazy"
            src={airbnbLogo}
          />
        </div>
        <div className="nasa">
          <img
            alt="NASA"
            height="60"
            width="67"
            loading="lazy"
            src={nasaLogo}
          ></img>
        </div>
        <div className="uber">
          <img
            alt="Uber"
            height="26"
            width="75"
            loading="lazy"
            src={uberLogo}
          ></img>
        </div>
        <div className="target">
          <img
            alt="Target"
            height="48"
            width="48"
            loading="lazy"
            src={targetLogo}
          ></img>
        </div>
        <div className="ny-times">
          <img
            alt="New York Times"
            height="32.56"
            width="230"
            loading="lazy"
            src={nytLogo}
          ></img>
        </div>
        <div className="etsy">
          <img
            alt="Etsy"
            height="36"
            width="74"
            loading="lazy"
            src={etsyLogo}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default TrustedCompanies;
