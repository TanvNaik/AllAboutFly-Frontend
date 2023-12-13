import React from 'react'
import Base from './Base'

export default function Contact() {

	const sendMail = () => {
		const recipient = 'naiktanvi30@gmail.com';
		const subject = 'Hello';
		const body = 'This is the body of the email.';
		
		const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		window.location.href = mailtoLink;

	}
	
  return (
    <Base>
	      {/* <!--================Contact Area =================--> */}
	<section className="contact_area section_gap_bottom" style={{marginTop: "7%"}}>
		<div className="container">
			
			<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15087.840252982785!2d72.83266059708016!3d19.021481400893133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cedb0ea0cd0f%3A0x428a465039995bd0!2sDadar%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1696083650114!5m2!1sen!2sin" width="100%" className='m-2' height="450" style={{border:"1px solid gray"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
			<div className="row">
				<div className="col-lg-3">
					<div className="contact_info">
						<div className="info_item">
							<i className="lnr lnr-home"></i>
							<h6>California, United States</h6>
							<p>Santa monica bullevard</p>
						</div>
						<div className="info_item">
							<i className="lnr lnr-phone-handset"></i>
							<h6><a href="#">00 (440) 9865 562</a></h6>
							<p>Mon to Fri 9am to 6 pm</p>
						</div>
						<div className="info_item">
							<i className="lnr lnr-envelope"></i>
							<h6><a href="#">support@colorlib.com</a></h6>
							<p>Send us your query anytime!</p>
						</div>
					</div>
				</div>
				<div className="col-lg-9">
					<form className="row contact_form" id="contactForm" novalidate="novalidate">
						<div className="col-md-6">
							<div className="form-group">
								<input type="text" className="form-control" id="name" name="name" placeholder="Enter your name" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter your name'"/>
							</div>
							<div className="form-group">
								<input type="email" className="form-control" id="email" name="email" placeholder="Enter email address" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter email address'"/>
							</div>
							<div className="form-group">
								<input type="text" className="form-control" id="subject" name="subject" placeholder="Enter Subject" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Subject'"/>
							</div>
						</div>
						<div className="col-md-6">
							<div className="form-group">
								<textarea className="form-control" name="message" id="message" rows="1" placeholder="Enter Message" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Message'"></textarea>
							</div>
						</div>
						<div className="col-md-12 text-right">
							<button onClick={sendMail} value="submit" className="primary-btn">Send Message</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</section>
	{/* <!--================Contact Area =================--> */}
</Base>
  )
}
