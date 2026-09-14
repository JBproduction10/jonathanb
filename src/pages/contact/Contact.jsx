import './contact.css';
import {
  FaEnvelopeOpen,
  FaPhoneSquareAlt,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
  FaGithub

} from 'react-icons/fa';

import {FiSend} from 'react-icons/fi';

const Contact = () => {
    return (
      <section className='contact section'>
        <h2 className='section__title'>
          Get In <span>Touch</span>
        </h2>

        <div className='contact__container container grid'>
          <div className='contact__data'>
            <h3 className='contact__title'>Don't be Shy!</h3>

            <p className='contact__description'>
              Feel free to get in touch with me. I am always open to discussing
              new projects, creative ideas or opportunities to be part of your
              visions.
            </p>

            <div className='contact__info'>
              <div className='info__item'>
                <FaEnvelopeOpen className='info__icon'/>

                <div>
                  <span className='info__title'> Mail me</span>
                  <h4 className='info__desc'> jbangala90@gmail.com</h4>
                </div>
              </div>

              {/* <div className='info__item'>
                <FaPhoneSquareAlt className='info__icon'/>

                <div>
                  <span className='info__title'>Call me</span>
                  <h4 className='info__desc'> +27 73 851 7865</h4>
                </div>
              </div> */}
            </div>

            <div className="contact__socials">
              <a href='https://www.facebook.com/jonathan.bangala.5/' className='contact__social-link'>
                <FaFacebook/>
              </a>

              <a href='https://www.instagram.com/jbangala90/' className='contact__social-link'>
                <FaInstagram/>
              </a>

              <a href='https://www.linkedin.com/in/jonathan-bangala/' className='contact__social-link'>
                <FaLinkedin/>
              </a>

              <a href='https://github.com/JBproduction10/' className='contact__social-link'>
                <FaGithub/>
              </a>
            </div>
          </div>

          <form className="contact__form">
            <div className="form__input-group">
              <div className="form__input-div">
                <input
                  type='text'
                  placeholder='Your Name'
                  className='form__control'
                />
              </div>

              <div className="form__input-div">
                <input
                  type='email'
                  placeholder='Your Email'
                  className='form__control'
                />
              </div>

              <div className="form__input-div">
                <input
                  type='text'
                  placeholder='Your Subject'
                  className='form__control'
                />
              </div>
            </div>

            <div className="form__input-div">
                <textarea placeholder='Your Message'
                  className='form__control textarea'
                >
                </textarea>
              </div>

              <button className='button'>
                Send Message
                <span className='button__icon contact__button_icon'>
                  <FiSend/>
                </span>
              </button>
          </form>
        </div>
    </section>
    )
}

export default Contact;