import React from 'react'

const ContactUs = () => {
  return (
    <div className='text-zinc-300 px-[15vw] flex items-center justify-center'>
        
       
        
        <div className="container">
            <div className="row">
                <div className="col-md-10 offset-md-1">
                    <div className="contact_inner">
                        <div className="row">
                            <div className="col-md-10">
                                <div className="contact_form_inner">
                                    <div className="contact_field">
                                        <h3>Contact Us</h3>
                                        <p>Feel Free to contact us any time. We will get back to you as soon as we can!.</p>
                                        <input type="text" className="form-control form-group bg-transparent" placeholder="Name" />
                                        <input type="text" className="form-control form-group bg-transparent" placeholder="Email" />
                                        <textarea className="form-control form-group bg-transparent" placeholder="Message"></textarea>
                                        <button className="contact_form_submit">Send</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="right_conatct_social_icon d-flex align-items-end">
                                   <div className="socil_item_inner d-flex">
                                      <li><a href="#"><i className="fab fa-facebook-square"></i></a></li>
                                      <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                                      <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                   </div>
                                </div>
                            </div>
                        </div>
                        <div className="contact_info_sec">
                            <h4>Contact Info</h4>
                            <div className="d-flex info_single align-items-center">
                                <i className="fas fa-headset"></i>
                                <span>+91 7000654043</span>
                            </div>
                            <div className="d-flex info_single align-items-center">
                                <i className="fas fa-envelope-open-text"></i>
                                <span>pawarjay7000@gmail.com</span>
                            </div>
                            <div className="d-flex info_single align-items-center">
                                <i className="fas fa-map-marked-alt"></i>
                                <span>Have a question, suggestion, or feedback? Feel free to reach out to us. We’re always here to improve your experience and help you with anything related to movies, TV shows, and entertainment.</span>
                            </div>
            
                        </div>
                    </div>
                </div>
            </div>
        </div>
  
    </div>
  )
}

export default ContactUs