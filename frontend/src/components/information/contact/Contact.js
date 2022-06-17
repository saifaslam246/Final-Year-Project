import "./contact.css";
import Location from "./icon/location.jpg";
import Email from "./icon/email5.png";
import Phone from "./icon/phone3.png";
import emailjs from "emailjs-com";
import { useAlert } from "react-alert";
function Contact() {
  const alert = useAlert();
  function sendEmail(e) {
    alert.success("Thank You for contacting us");
    e.preventDefault();
    emailjs
      .sendForm(
        "service_4w80uyi",
        "template_mo6hfmg",
        e.target,
        "user_eUQ9AAvFBWJv825QPdR2r"
      )
      .then((res) => console.log(res))
      .then((err) => console.log(err));
    e.target.reset();
  }
  return (
    <>
      <div className="main-contact">
        <section className="section">
          <div className="container">
            <div className="contactinfo">
              <div>
                <h2>Contact Info</h2>
                <ul className="info">
                  <li>
                    <span>
                      <img src={Location} alt="Location" />
                    </span>
                    <span>
                      Main Riwand Road <br />
                      Near Comsats,
                      <br />
                      Lahore
                    </span>
                  </li>
                  <li>
                    <span>
                      <img src={Email} alt="Email" />
                    </span>
                    <span>Medicare051@gmail.com</span>
                  </li>
                  <li>
                    <span>
                      <img src={Phone} alt="phone number" />
                    </span>
                    <span>+92-349-6582448</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="contactForm">
              <h2>Send a message</h2>
              <form onSubmit={sendEmail}>
                <div className="formBox">
                  <div className="inputBox w50">
                    <input
                      type="text"
                      placeholder="First Name"
                      name="f_name"
                      required
                    />
                  </div>
                  <div className="inputBox w50">
                    <input
                      type="text"
                      placeholder="Last Name"
                      name="l_name"
                      required
                    />
                  </div>
                  <div className="inputBox w50">
                    <input
                      type="text"
                      placeholder="Email Address"
                      name="user_email"
                      required
                    />
                  </div>
                  <div className="inputBox w50">
                    <input
                      type="text"
                      placeholder="Mobile Number"
                      name="number"
                      required
                    />
                  </div>
                  <div className="inputBox w100">
                    <textarea
                      name="message"
                      placeholder="Write your messages here..."
                      required
                    ></textarea>
                  </div>
                  <div className="inputBox w100">
                    <input type="submit" value="send" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Contact;
