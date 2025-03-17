import { useState, useEffect, useRef } from 'react'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { useCreate } from "../../contexts/CreateContext"
import { useMobile } from '../../contexts/MobileContext';

import useMobileStyles from '../../hooks/useMobileStyles';

function HomeSections() {

    const { allProducts } = useCreate()
    const [slides, setSlides] = useState()
    const slidesref = useRef()
    const [rightMoves, setRightMoves] = useState(0)

    const { mobile, mobileWidth } = useMobile();
    const { containerStyles, microMobile } = useMobileStyles();

    const moveSlides = (direction) => {

        let slideDistance = microMobile ? 300 : 500
        let maxMoves = mobile ? 12 : 7

        let previousSlides = [...slides]

        // Moves right and left in slider
        if (direction === 'right') {
            previousSlides.push(allProducts)
            slidesref.current.style.transition = 'transform 0.5s linear'
            slidesref.current.style.transform = `translateX(-${(rightMoves + 1) * slideDistance}px)`

            // Go back to start after 7 right moves
            if (rightMoves === maxMoves) {
                slidesref.current.style.transition = `transform 2s ease-out`
                slidesref.current.style.transform = `translateX(0px)`
                setTimeout(() => {
                    setSlides([allProducts])
                    setRightMoves(0)
                }, 2000)
                return
            }
            setRightMoves(prev => prev + 1)
        }
        else {
            if (rightMoves === 0) return
            setRightMoves((prev) => prev - 1)
            previousSlides.pop()
            slidesref.current.style.transition = `transform 1s linear`
            slidesref.current.style.transform = `translateX(-${(rightMoves - 1) * slideDistance}px)`
        }
        setSlides(previousSlides)
    }

    useEffect(() => {
        setSlides([allProducts])
    }, [allProducts])


    return (<div id="home-container" style={{ width: '100%', margin: '0 auto', padding: '0' }}>
        <div id="home-card1"
            className='main-cardp-1'
            style={!mobile ? {
                display: 'flex', justifyContent: 'space-between',
                borderRadius: '10px', width: '80%', margin: '5rem auto'
            } : microMobile ? {
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                borderRadius: '10px', width: '100%', margin: '5rem auto'
            } : null}
        >
            <img alt="home-welcome-picture"
                className='mx-auto p-0'
                style={microMobile ? { width: '100%' } : { margin: '15px' }}
                variant='top'
                src='https://cdn.pixabay.com/photo/2017/09/17/19/43/woman-2759503__340.jpg'
            />
            <div id='home-card-text' style={!mobile ? { margin: '15px', display: 'flex', flexDirection: 'column', alignItems: 'end' } :
                { margin: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                className='text-muted mediums px-2'>
                <h3 style={{ color: 'brown', width: '100%' }}>Cheapest In The Market</h3>
                <div style={{ margin: '2rem auto', color: 'rgb(109, 44, 38)' }}>
                    <p>Work Hard, Not on Your Wallet. Discover our collection of
                        budget-friendly <b>workwear</b> that doesn't compromise on quality.
                        Get the durability and functionality you need, without breaking
                        the bank. Smart savings for the working professional.</p>
                    <p>Affordable Workwear for Every Task. From tough overalls to
                        reliable shirts, find the cheap work clothes you need for any job.
                        Quality and value, all in one place. Explore our budget-friendly selection.</p>
                </div>
                <button>Check cheapest now</button>
            </div>
        </div>
        <div id="home-card2"
            className='main-card mx-auto'
            style={!mobile ? { display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: '10px', width: '80%', margin: '5rem auto' } :
                { margin: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'white', }}
        >
            <div id='home-card-text' style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }} className='text-muted mediums px-2'>
                <h3 style={{ color: 'brown', width: '100%', textAlign: 'center' }}>Your Next Work Outfit Awaits</h3>
                <div style={{ margin: '2rem auto', color: 'rgb(109, 44, 38)' }}>
                    <p>Discover Quality Workwear That Fits Your Budget. Find Your Perfect Work Outfit, Without the Premium Price.</p>
                </div>
            </div>
            <div id="home-slider" style={{ display: 'flex', margin: '2rem auto', position: 'relative', width: microMobile ? '100%' : '80%', justifyContent: 'center' }}>
                <div id="left-arrow" className="slider-arrow" style={microMobile ? { left: '10px' } : {}} >
                    <ArrowBackIosIcon
                        onClick={() => moveSlides('left')}
                    ></ArrowBackIosIcon>
                </div>
                <div style={{ width: 'calc(100vw - 20%)' }}>
                    <div style={{ display: 'flex', flexWrap: 'nowrap' }} ref={slidesref}>
                        {slides && slides.map((arr, i) => {
                            return (<div style={{ display: 'inline flex', flexWrap: 'nowrap', width: 'fit-content' }}>
                                {arr.map(prod => (
                                    <img style={{ margin: '0', padding: '0', width: microMobile ? '300px' : '200px', height: '300px', objectFit: 'cover' }}
                                        alt={prod.description} src={prod.thumbnail} />
                                ))
                                }
                            </div>)
                        })}
                    </div>
                </div>
                <div id="right-arrow" className="slider-arrow" style={microMobile ? { right: '10px' } : {}}>
                    <ArrowForwardIosIcon onClick={() => moveSlides('right')}>
                    </ArrowForwardIosIcon>
                </div>
            </div>
            <button>See all products</button>
        </div>
    </div >)
}

export default HomeSections