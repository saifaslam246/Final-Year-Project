import React, { useEffect } from "react";
import "./Home.css";
import ReasonsComponent from "./Reason";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import slider1 from "./slider/home-slider-1.jpg";
import slider2 from "./slider/home-slider-2.jpg";
import slider3 from "./slider/home-slider-3.jpg";
import registerimg from "./icons/register.jpg";
import Contact from "../contact/Contact";
import sign from "./icons/plus-sign.jpg";
import Logo from "./icons/logo.png";
import img3 from "./icons/2nd-img.jpeg";
import img2 from "./icons/3rd-img.png";
import AOS from "aos";
import "aos/dist/aos.css";
import MessengerCustomerChat from "react-messenger-customer-chat";
function Home() {
  useEffect(() => {
    AOS.init();
  });
  return (
    <>
      <div className="div-bg-color">
        <Carousel className="carousel-main" controls={false}>
          <Carousel.Item className="saifc" interval={10000}>
            <img className="d-block w-100" src={slider1} alt="First slide" />
            <Carousel.Caption className="carousal-caption">
              <h1 className="carousal-h1">
                <b>BECAUSE THEY NEED YOUR HELP</b>
              </h1>
              <h3 className="carousal-h3">DO NOT LET THEM DOWN</h3>
              <br />

              <Link
                to="/donor/product"
                className="carousal-btn btn btn-lg btn-secondary hidden-xs bounceInUp animated slow"
                data-toggle="modal"
                data-target="#donateModal"
              >
                Donate Medicine NOW
              </Link>
              <br></br>
              <br></br>
              <Link
                to="/"
                className="carousal-btn btn btn-lg btn-secondary hidden-xs bounceInUp animated slow"
                data-toggle="modal"
                data-target="#donateModal"
              >
                Request for Medicine
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <img className="d-block w-100" src={slider2} alt="Second slide" />
            <Carousel.Caption className="carousal-caption">
              <h1 className="carousal-h1">
                <b>Together we can improve their lives</b>
              </h1>
              <h3 className="carousal-h3">So let's do it !</h3>
              <br />
              <Link
                to="/donor/product"
                className="carousal-btn btn btn-lg btn-secondary hidden-xs bounceInUp animated slow"
                data-toggle="modal"
                data-target="#donateModal"
              >
                Donate Medicine NOW
              </Link>
              <br></br>
              <br></br>
              <Link
                to="/"
                className="carousal-btn btn btn-lg btn-secondary hidden-xs bounceInUp animated slow"
                data-toggle="modal"
                data-target="#donateModal"
              >
                Request for Medicine
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <img className="d-block w-100" src={slider3} alt="Third slide" />
            <Carousel.Caption className="carousal-caption">
              <h1 className="carousal-h1">
                <b>A penny is a lot of money, if you have not got a penny.</b>
              </h1>
              <h3 className="carousal-h3">You can make the diffrence !</h3>
              <br />
              <Link
                to="/donor/product"
                className="carousal-btn btn btn-lg btn-secondary hidden-xs bounceInUp animated slow"
                data-toggle="modal"
                data-target="#donateModal"
              >
                Donate Medicine NOW
              </Link>
              <br></br>
              <br></br>
              <Link
                to="/"
                className=" carousal-btn btn btn-lg btn-secondary hidden-xs bounceInUp animated slow"
                data-toggle="modal"
                data-target="#donateModal"
              >
                Request for Medicine
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <ReasonsComponent />
      </div>
      <div
        className="section-resons container"
        data-aos="fade-down"
        data-aos-duration="1000"
        data-aos-offset="300"
      >
        <div className="left-section">
          <h2 className="left-sec-h2">Why medicine ??</h2>
          <br />
          <h4>
            Because our health is a fundamental part of being human. Without it,
            we have nothing.
          </h4>
        </div>
        <div className="right-section">
          <h5>
            50 million people from Pakistan don’t take their prescribed
            medication because they can’t afford it. With soaring copays,
            deductibles, and insurance costs, many people are making impossible
            choices between medications, food and housing, gas to get to work,
            and more.
          </h5>
          <br />
          <br />
          <h5>
            Not taking your medications, however, often leads to even worse
            outcomes—heart attacks, strokes, and even higher costs. This is our
            nation’s most critical problem, but it doesn’t have to be.
          </h5>
          <br />
          <br />
          <h5>
            That’s why we’re here. Our plateform provides access so everyone
            gets the care they deserve.
          </h5>
        </div>
      </div>
      <div className="donate-buttons">
        <Link
          data-aos="slide-right"
          data-aos-duration="1500"
          data-aos-offset="200"
          to="/donor/product"
          className="carousal-btn btn btn-lg btn-secondary hidden-xs bounceInUp animated slow btnn-donate"
          data-toggle="modal"
          data-target="#donateModal"
        >
          Donate Medicine NOW
        </Link>
        <Link
          data-aos="flip-down"
          data-aos-duration="1500"
          data-aos-offset="200"
          to="/"
          className="carousal-btn btn btn-lg btn-secondary hidden-xs bounceInUp animated slow btnn-donate"
          data-toggle="modal"
          data-target="#donateModal"
        >
          Request Medicine NOW
        </Link>
        <Link
          data-aos="zoom-in-left"
          data-aos-duration="1500"
          data-aos-offset="200"
          to="/payment"
          className="carousal-btn btn btn-lg btn-secondary hidden-xs bounceInUp animated slow btnn-donate"
          data-toggle="modal"
          data-target="#donateModal"
        >
          Donate Money NOW
        </Link>
      </div>
      <div
        className="main-donate container "
        data-aos="zoom-in"
        data-aos-duration="500"
        data-aos-offset="200"
      >
        <div className="donate-left">
          <h5>
            Our platform directly accepts medicine from manufacturers,
            pharmacies, wholesalers, and health facilities. If you’re an
            individual with unused medicine to donate, you can donate through
            one of our partners.
            <br />
            <br />
            <br />
            You can also contribute to our cause with a monetary donation. Every
            little bit helps, and we appreciate your support.
          </h5>
        </div>
        <div className="donate-right">
          <h1>
            Who can <br /> donate?
          </h1>
        </div>
      </div>
      <div className="three-steps container">
        <div
          className="left-step"
          data-aos="zoom-in"
          data-aos-duration="500"
          data-aos-offset="200"
        >
          <img
            style={{ margin: "0px 100px" }}
            className="w-10 h-10 img-margin"
            src={registerimg}
            alt="First slide"
          />
          <h3 className="steps-h3" style={{ margin: "30px 135px" }}>
            Register
          </h3>
          <br />
          <h5>
            Answer a few simple questions and sign our agreement to donate or
            receive medicine.
          </h5>
        </div>
        <div
          className="center-step"
          data-aos="zoom-in"
          data-aos-duration="1000"
          data-aos-offset="200"
        >
          <img
            style={{ margin: "0px 30px" }}
            className="img-margin"
            src="https://tse2.mm.bing.net/th?id=OIP.QUPFVUQ5ioqy8O-FZVurhAHaEP&pid=Api&P=0&w=306&h=175"
            alt="First slide"
          />
          <h3 className="steps-h33" style={{ margin: "30px 90px" }}>
            Box it up
          </h3>
          <br />
          <h5>
            We’ll send everything you need to ship. Place medicines in the
            provided box, and we’ll schedule a pickup through TCS.
          </h5>
        </div>
        <div
          className="right-step"
          data-aos="zoom-in"
          data-aos-duration="1500"
          data-aos-offset="200"
        >
          <img
            style={{ margin: "0px 105px" }}
            className="w-10 h-10 img-margin"
            src="https://tse2.mm.bing.net/th?id=OIP.UMrHSOehsLqy0YdkRyUFLgHaLG&pid=Api&P=0&w=104&h=157"
            alt="First slide"
          />
          <h3 className="steps-h23" style={{ margin: "50px 50px" }}>
            Online Donations
          </h3>
          <br />
          <h5 style={{ margin: "-20px 0px" }}>
            We provide a full record of the donation, along with the impact it
            had on the community.
          </h5>
        </div>
      </div>
      <div className="home-information-part">
        <div style={{ margin: "0px 100px" }}>
          <h1>Want more information?</h1>
          <br />
          <h5>
            We’d love to connect with anyone interested in learning more about
            our work.
            <br />
            Simply fill out the form below ..
          </h5>
          <img className="plus-img" src={sign} alt="First slide" />
        </div>
        <br />
        <Contact />
      </div>
      <MessengerCustomerChat pageId="109568921760430" appId="530339108756375" />
      ,
    </>
  );
}

export default Home;
