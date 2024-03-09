import React, { useState, useEffect } from 'react';
import image3 from '../images/headway-F2KRf_QfCqw-unsplash.jpg';
import image2 from '../images/stem-list-EVgsAbL51Rk-unsplash.jpg';
import image1 from '../images/victoria-priessnitz-JFAPl7brL6U-unsplash.jpg';
import Services from './Services';
import ContactUs from './Contactus';
import Venue from './Venue';


function Home() {
  const slides = [
    {
      url: image1,
    },
    {
      url: image2,
    },
    {
      url: image3,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval); 
  }, [currentIndex]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className='max-w-[2000px] h-[800px] w-full relative group'>
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})`, height: '100%', width: '100%', backgroundSize: 'cover', backgroundPosition: 'center' }}
        className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
      ></div>
      {/* Left Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <span onClick={prevSlide}>Previous</span>
      </div>
      {/* Right Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <span onClick={nextSlide}>Next</span>
      </div>
      <div className='flex top-4 justify-center py-2'>
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className='text-2xl cursor-pointer'
          >
            {slideIndex === currentIndex ? '●' : '○'}
          </div>
        ))}
      </div>
      <div>
        <Services/>
      </div>
      <div>
        <Venue/>
      </div>
      {/* <div>
        <AboutUs/>
      </div> */}
      <div>
        <ContactUs/>
      </div>

    </div>
  );
}

export default Home;
