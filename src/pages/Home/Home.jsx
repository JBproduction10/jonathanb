import Profile from '../../assets/jona1.png';
import {Link} from 'react-router-dom';
import {FaArrowRight} from 'react-icons/fa';
import './home.css';

const Home = () => {
  return (
    <section className='home section grid'>
      <img src={Profile} alt='' className='home__img'/>

      <div className='home__content'>
        <div className='home__data'>
          <h1 className='home__title'>
            <span>I'm Jonathan Bangala.</span> a Software Developer
          </h1>

          <p className='home__description'>
          Software engineer| Game developer & full-stack developer focused on
          crafting clean & user-friendly experience. I am passionate about
          building excellent sofware that improves the lives of those around me.
          </p>

          <Link to='/about' className='button'>
            More About Me 
            <span className='button__icon'> <FaArrowRight/>
            </span>
          </Link>
        </div>
      </div>

      <div className='color-block'></div>
    </section>
  )
}

export default Home;