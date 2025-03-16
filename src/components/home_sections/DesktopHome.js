import { useState, useEffect, useRef } from 'react'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { useCreate } from "../../contexts/CreateContext"

function DesktopHome() {

    const { allProducts } = useCreate()
    // const [slidesShowing, setSlidesShowing] = useState(7)
    const [slides, setSlides] = useState()
    const slidesref = useRef()
    const [rightMoves, setRightMoves] = useState(0)
    const [leftMoves, setLeftMoves] = useState(0)


    const moveSlides = (direction) => {

        slidesref.current.style.transform = 'none'

        let previousSlides = [...slides]
        if (direction === 'right') {

            // Just setting a maximum for the slider to have arrays of products
            if (slides.length < 10) {
                previousSlides.push(allProducts)
            }
            setRightMoves(prev => prev + 1)
            setLeftMoves(0)
        }
        else {
            if (rightMoves === 0) return
            setLeftMoves((prev) => prev + 1)
            setRightMoves(0)
            setSlides([allProducts])
            return
        }
        setSlides(previousSlides)

        slidesref.current.style.transition = 'transform 1s linear'
        slidesref.current.style.transform = direction === 'right' ? `translateX(-${rightMoves * 150}px)` : `translateX(0px)`
    }

    useEffect(() => {
        setSlides([allProducts])
    }, [allProducts])


    return (<div style={{ width: '100%', overflowX: 'hidden' }}>
        <div id="home-card1"
            className='main-cardp-1'
            style={{
                display: 'flex', justifyContent: 'space-between',
                borderRadius: '10px', width: '80%', margin: '5rem auto'
            }}
        >
            <img alt="home-welcome-picture"
                className='mx-auto p-0'
                style={{ margin: '15px' }}
                variant='top'
                src='https://cdn.pixabay.com/photo/2017/09/17/19/43/woman-2759503__340.jpg'
            />
            <div id='home-card-text' style={{ margin: '15px', display: 'flex', flexDirection: 'column', alignItems: 'end' }}
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
                <button style={{ padding: '10px', backgroundColor: 'brown', color: '#D89E00', border: 'none', borderRadius: '25px' }}>Check cheapest now</button>
            </div>
        </div>
        <div id="home-card2"
            className='main-card mx-auto'
            style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: '10px', width: '80%', margin: '5rem auto' }}
        >
            <div id='home-card-text' style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }} className='text-muted mediums px-2'>
                <h3 style={{ color: 'brown', width: '100%', textAlign: 'center' }}>Your Next Work Outfit Awaits</h3>
                <div style={{ margin: '2rem auto', color: 'rgb(109, 44, 38)' }}>
                    <p>Discover Quality Workwear That Fits Your Budget. Find Your Perfect Work Outfit, Without the Premium Price.</p>
                </div>
            </div>
            <div id="home-slider" style={{ display: 'flex', margin: '2rem auto', position: 'relative', width: '80%', justifyContent: 'center' }}>
                <div style={{
                    position: 'absolute', zIndex: '10', height: '60px', width: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    left: '-40px', top: '40%', backgroundColor: 'rgba(216, 158, 0, 1)', padding: '10px', borderRadius: '50px'
                }}>
                    <ArrowBackIosIcon style={{ color: 'brown', marginLeft: '10px' }}
                        onClick={() => moveSlides('left')}
                    ></ArrowBackIosIcon>
                </div>
                <div style={{ width: 'calc(100vw - 20%)' }}>
                    <div style={{ display: 'flex', flexWrap: 'nowrap' }} ref={slidesref}>
                        {slides && slides.map((arr, i) => {
                            return (<div style={{ display: 'inline flex', flexWrap: 'nowrap', width: 'fit-content' }}>
                                {arr.map(prod => (
                                    <img style={{ margin: '0', padding: '0', width: '200px', height: '300px', objectFit: 'cover' }}
                                        alt={prod.description} src={prod.thumbnail} />
                                ))
                                }
                            </div>)
                        })}

                    </div>
                </div>

                <div style={{
                    position: 'absolute', zIndex: '10', height: '60px', width: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    right: '-40px', top: '40%', backgroundColor: 'rgba(216, 158, 0, 1)', padding: '10px', borderRadius: '50px'
                }}>
                    <ArrowForwardIosIcon onClick={() => moveSlides('right')}
                        style={{ color: 'brown', marginRight: '0px' }}></ArrowForwardIosIcon>
                </div>

            </div>
            <button style={{
                margin: '0 auto', width: 'fit-content', padding: '10px', backgroundColor: 'brown',
                color: '#D89E00', border: 'none', borderRadius: '25px'
            }}>See all products</button>

        </div>
    </div >)
}

export default DesktopHome