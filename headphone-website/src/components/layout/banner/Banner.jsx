import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, scale, useAnimation, useInView } from 'framer-motion';
import './banner.css';
function Banner({ bannerInfo }) {
    const navigate = useNavigate();
    // Reference to observe when banner area becomes visible 
    const ref = useRef(null);

    // Trigger animation when 20% banner area becomes visible(only once) 
    const inView = useInView(ref, { once: true, amount: 0.2 })

    // separate animation controls for text and images
    const textControls = useAnimation();
    const imgControls = useAnimation();

    // when banner enter view trigger animations in sequence
    useEffect(() => {
        if (!inView) return;
        (async () => {
            // start text reveal animation
            await textControls.start("visible");

            // image enter after text
            await imgControls.start("visible");

            // applying infinite floating animation to the image 
            imgControls.start({
                y: ["0px", "-6px", "0px"],
                transition: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 4,
                    ease: "easeInOut",
                    delay: 0.6,
                },
            });
        })();
    }, [inView]);

    // parent animation to stagger children 
    const containerVariant = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.05,
            },
        },
    };

    // left side text (slide-in from left)
    const leftTextVariant = {
        hidden: { opacity: 0, x: -24 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { type: "spring", stiffness: 110, damping: 20 }
        },
    };

    // small fade animation for minor text
    const smallFade = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.48 } },
    };


    // Image entry animation + scale pop
    const imageVariant = {
        hidden: { opacity: 0, scale: 0.9, y: 12 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: "spring", stiffness: 150, damping: 20 }
        },
    };


    return (
        <>
            <div className='banner-section position-relative overflow-hidden'

            >
                <div className='container'>
                    <motion.div className='banner-card rounded-5'
                        style={{
                            backgroundImage: bannerInfo.bg,
                            backgroundColor: "transparent"
                        }}
                        ref={ref}
                        variants={containerVariant}
                        initial="hidden"
                        animate={textControls}>

                        <div className='row g-0 d-flex align-items-center p-4 p-md-5'

                        >
                            {/* Left text section */}
                            <motion.div className='col-12 col-md-4 order-md-1 order-2  position-relative z-1'
                                variants={leftTextVariant}
                            >
                                <motion.h5 variants={leftTextVariant}>{bannerInfo.discount}</motion.h5>
                                <motion.h1 className='fw-bolder display-6 text-white mb-2' variants={leftTextVariant}>
                                    {bannerInfo.tag}
                                </motion.h1>
                                <motion.h5 variants={smallFade}>{bannerInfo.date}</motion.h5>
                            </motion.div>
                            {/* center image section */}
                            <div className='col-12 col-md-4 d-flex justify-content-center align-items-center banner-wrapper order-1 order-md-2'>
                                <motion.img src={bannerInfo.image}
                                    alt="banner" className='promo-image z-2'
                                    variants={imageVariant}
                                    style={{
                                        transform: "translateX(-50%)", // keep image centered
                                    }}
                                    whileHover={{ scale: 1.03 }} // slight hover scale
                                />
                            </div>
                            {/* right text section  */}
                            <motion.div className='col-12 col-md-4 d-flex flex-column justify-content-center gap-3 order-3 order-md-3'
                                variants={containerVariant}

                            >
                                <motion.h3 variants={leftTextVariant} className='fw-bold text-white'>{bannerInfo.subTitle}</motion.h3>
                                <motion.h2 variants={leftTextVariant} className='fw-bold mb-1'>{bannerInfo.title}</motion.h2>
                                <motion.p variants={smallFade}>{bannerInfo.desc}</motion.p>
                                <motion.div variants={smallFade}>
                                    <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className='btn btn-light fw-bold rounded-pill'>Shop Now</button>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    )
}

export default Banner
