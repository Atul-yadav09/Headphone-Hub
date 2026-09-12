import Carousel from 'react-bootstrap/Carousel';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './heroSlider.css';
import { heroSlider } from '../../../constants/data';
import { AnimatePresence, motion,} from 'framer-motion';
function HeroSlider() {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);
// text animation

const textVariants={
    hidden:{opacity:0, y:12},
    visible:{opacity:1, y:0},
    exit:{opacity:0, y:-8},
}


// image animation 
    const imageVariants={
        hidden:{opacity:0, scale:0.95, filter:'blur(6px)'},
        visible:{
            opacity:1,
            scale:1,
            filter:'blur(0px)',
            transition:{duration:1}
        },
        exit:{opacity:0, scale:0.95, filter:'blur(6px)'}
    }

    return (
        <>
            <section className='hero-carousel-wrapper overflow-hidden'>
                {/* Background crossfade */}
                {
                    heroSlider.map((s, i) => (
                        <div key={s.id}
                            className='bg-layer'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: activeIndex === i ? 1 : 0 }}
                            transition={{ duration: 1.5 }}
                            style={{ background: s.bg }} />
                    ))
                }
                <Carousel activeIndex={activeIndex} onSelect={setActiveIndex}
                    interval={4000}
                    controls={false}
                    indicators
                    fade
                    pause="hover"
                >
                    {
                        heroSlider.map((s, i) => (
                            <Carousel.Item key={s.id}>
                                <div className="container">
                                    <div className="row">
                                        <div className='row align-items-center slider-row'>
                                            {/* {text column} */}
                                            <div className='col-md-6 col-12 order-md-1 order-2 mt-3' >
                                            <motion.div variants={textVariants} delay={0.12} duration={1.2}>
                                            <AnimatePresence mode='wait' initial={false}>
                                                {activeIndex == i&&(
                                                 <motion.div variants={textVariants} 
                                                 exit='exit'
                                                 animate='visible'
                                                  initial='hidden'>
                                                <h2 className='hero-title text-white mb-3 fw-bold'>
                                                    {s.title}
                                                </h2>
                                                <p className='text-white mb-2'>
                                                    {s.desc}
                                                </p>
                                                <h3 className='text-white fw-bold'>
                                                    {s.price}
                                                </h3>
                                                <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className='btn btn-light btn-sm me-2 mt-2 fw-bold'>
                                                    Shop Now <i className='bi bi-arrow-right ms-1'></i>
                                                </button>
                                                </motion.div>
                                                )}
                                            </AnimatePresence>
                                            </motion.div>
                                            </div>
                                            {/* {image column} */}
                                            <div className='col-md-6 col-12 order-md-2 order-1 '>
                                                <div className='d-flex align-items-center justify-content-center'>
                                                    <AnimatePresence mode='wait' initial={false}>

                                                        {activeIndex == i && (
                                                            <motion.img src={s.image}
                                                                alt={s.title} 
                                                                className='hero-image img-fluid w-100'
                                                                initial='hidden'
                                                                animate='visible'
                                                                exit='exit'
                                                                variants={imageVariants}
                                                                />
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Carousel.Item>
                        ))}
                </Carousel>
            </section>
        </>
    )
}

export default HeroSlider
