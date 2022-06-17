import React, { useEffect } from "react";
import help from "./icons/help-icon.png";
import donation from "./icons/make-donation-icon.png";
import programs from "./icons/programs-icon.png";
import mission from "./icons/our-mission-icon.png";
import AOS from "aos";
import "aos/dist/aos.css";
function ReasonsComponent() {
  useEffect(() => {
    AOS.init();
  });
  return (
    <div>
      <div
        className="section-home about-us fadeIn animated"
        data-aos="zoom-in-up"
        data-aos-duration="1000"
        data-aos-offset="250"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <div className="about-us-col">
                <div className="col-icon-wrapper">
                  <img src={mission} alt="" />
                </div>
                <h3 className="col-title">our mission</h3>
                <div className="col-details">
                  <p>
                    Our mission is to help needy persons who cannot afford
                    expensive medicines for thier treatment!
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="about-us-col">
                <div className="col-icon-wrapper">
                  <img src={donation} alt="" />
                </div>
                <h3 className="col-title">Make donations</h3>
                <div className="col-details">
                  <p>
                    Donate Unused medicine here to help needy people because:
                    “Giving is not just about making a donation. It is about
                    making a difference!”
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="about-us-col">
                <div className="col-icon-wrapper">
                  <img src={help} alt="" />
                </div>
                <h3 className="col-title">Help & support</h3>
                <div className="col-details">
                  <p>
                    Help and support us beacuse Alone we can do so little;
                    together we can do so much!
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="about-us-col">
                <div className="col-icon-wrapper">
                  <img src={programs} alt="" />
                </div>
                <h3 className="col-title">our program</h3>
                <div className="col-details">
                  <p>
                    Our program is to provide needy persons and donor a platform
                    where donor can easily do donation and needy people can get
                    it!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReasonsComponent;
