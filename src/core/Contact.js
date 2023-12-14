import React from "react";
import Base from "./Base";

export default function Contact() {
  const sendMail = () => {
    const recipient = "allaboutfly20@gmail.com";
    const subject = "Hello";
    const body = "This is the body of the email.";

    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <Base>
      {/* <!--================Contact Area =================--> */}
      <section
        className="contact_area section_gap_bottom"
        style={{ marginTop: "8%" }}
      >
        <div className="container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d756.4108282787985!2d77.3073812046834!3d28.67161176474855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb736f50b3d5%3A0x8b9f1ddc9e346766!2sa%2C%20A-41%2C%20Block%20A%2C%20Jhilmil%20Colony%2C%20Delhi%2C%20110095!5e0!3m2!1sen!2sin!4v1702529796335!5m2!1sen!2sin"
            width={"100%"}
            height={"450"}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="row mt-4">
            <div className="col-lg-3">
              <div className="contact_info text-light">
                <div className="info_item">
                  <i className="lnr lnr-home"></i>
                  <h6 className="text-light">Delhi, India</h6>
                  <p>Block A, Jhilmil Colony</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="contact_info text-light">
                <div className="info_item">
                  <i className="lnr lnr-phone-handset"></i>
                  <h6 className="text-light">+91 8178604322</h6>
                  <h6 className="text-light">+91 9654651207</h6>
                  <p>Mon to Fri 9am to 6 pm</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="contact_info text-light">
                <div className="info_item">
                  <i className="lnr lnr-envelope"></i>
                  <h6 className="text-light">allaboutfly20@gmail.com</h6>
                  <p>Send us your query anytime!</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="contact_info text-light">
                <div className="info_item">
                  <div className="col-md-12 text-right">
                    <button
                      onClick={sendMail}
                      className="btn btn-info btn-large"
					  style={{background:"#5B8FB9"}}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--================Contact Area =================--> */}
    </Base>
  );
}
