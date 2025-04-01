import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { useCreate } from "../../contexts/CreateContext"
import { useMobile } from '../../contexts/MobileContext';
import { useAuth } from '../../contexts/AuthContext';

import useMobileStyles from '../../hooks/useMobileStyles';

function HomeSections() {

    const { allProducts, setSingleProduct, setSearchResults, setSearchString } = useCreate()
    const [slides, setSlides] = useState()
    const slidesref = useRef()
    const [rightMoves, setRightMoves] = useState(0)

    const { mobile } = useMobile();
    const { microMobile } = useMobileStyles();
    const navigate = useNavigate()

    const { admin } = useAuth()

    const showCheapest = () => {

        let cheapestProducts = allProducts.filter(prod => prod.price < 20)
        setSearchResults(cheapestProducts)
        navigate(admin ? `/cms/search-results` : `/search-results`, { replace: true })
    }

    const moveSlides = (direction) => {

        let slideDistance = microMobile ? 300 : 500
        let maxMoves = mobile ? 12 : 7

        let previousSlides = [...slides]

        // Moves right and left in slider
        if (direction === 'right') {
            previousSlides.push(allProducts)
            slidesref.current.style.transition = 'transform 0.5s ease-out'
            slidesref.current.style.transform = `translateX(-${(rightMoves + 1) * slideDistance}px)`

            // Go back to start after 7 / 12 right moves
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


    return (<div id="home-sections-container">
        <div id="home-card1"
            className={microMobile ? 'micromobile' : admin && mobile ? 'admin mobile' : admin ? 'admin' : mobile ? 'mobile' : ''}>
            <img alt="home-welcome-picture"
                className='p-0'
                variant='top'
                src='https://cdn.pixabay.com/photo/2017/09/17/19/43/woman-2759503__340.jpg'
            />
            <div id='home-card1-text'
                className={mobile ? 'mobile home-card-text text-muted mediums px-2' : 'home-card-text text-muted mediums px-2'}>
                <h3 style={{ textAlign: mobile ? 'center' : 'left' }}>Cheapest In The Market</h3>
                <div style={{ margin: '2rem auto', color: 'rgb(109, 44, 38)' }}>
                    <p>Work Hard, Not on Your Wallet. Discover our collection of
                        budget-friendly <b>workwear</b> that doesn't compromise on quality.
                        Get the durability and functionality you need, without breaking
                        the bank. Smart savings for the working professional.</p>
                    <p>Affordable Workwear for Every Task. From tough overalls to
                        reliable shirts, find the cheap work clothes you need for any job.
                        Quality and value, all in one place. Explore our budget-friendly selection.</p>
                </div>
                <button onClick={() => { setTimeout(() => { showCheapest() }, 500) }}>Check cheapest now</button>
            </div>
        </div>
        <div id="home-card2"
            className={microMobile ? 'micromobile' : admin && mobile ? 'admin mobile' : admin ? 'admin' : mobile ? 'mobile' : ''}>
            <div id='home-card2-text' className={mobile ? 'mobile home-card-text text-muted mediums px-2' : 'home-card-text text-muted mediums px-2'}>
                <h3>Your Next Work Outfit Awaits</h3>
                <div style={{ margin: '2rem auto', color: 'rgb(109, 44, 38)' }}>
                    <p>Discover Quality Workwear That Fits Your Budget. Find Your Perfect Work Outfit, Without the Premium Price.</p>
                </div>
            </div>
            <div id="home-slider" className={microMobile ? 'micromobile' : ''}>
                <div onClick={() => moveSlides('left')} id="left-arrow" className="slider-arrow" style={microMobile ? { left: '10px' } : {}} >
                    <ArrowBackIosIcon></ArrowBackIosIcon>
                </div>
                <div style={{ width: 'calc(100vw - 20%)' }}>
                    <div style={{ display: 'flex', flexWrap: 'nowrap' }} ref={slidesref}>
                        {slides && slides.map((arr, i) => {
                            return (<div style={{ display: 'inline flex', flexWrap: 'nowrap', width: 'fit-content' }}>
                                {arr.map(prod => (
                                    <img onClick={() => {
                                        setSingleProduct(prod); navigate(admin ? `/cms/products/${prod.category}/${prod.id}`
                                            : `/products/${prod.category}/${prod.id}`, { replace: true })
                                    }}
                                        style={{ margin: '0', padding: '0', width: microMobile ? '300px' : '200px', height: '300px', objectFit: 'cover' }}
                                        alt={prod.description} src={prod.thumbnail} />
                                ))
                                }
                            </div>)
                        })}
                    </div>
                </div>
                <div id="right-arrow" onClick={() => moveSlides('right')} className="slider-arrow" style={microMobile ? { right: '10px' } : {}}>
                    <ArrowForwardIosIcon></ArrowForwardIosIcon>
                </div>
            </div>
            <button onClick={() => {
                localStorage.setItem("search", JSON.stringify(' '));
                setSearchString(' ')
                setTimeout(() => {
                    navigate(admin ? "/cms/search-results" : "/search-results", { replace: true })
                }, 500)
            }}>See all products</button>
        </div>
    </div >)
}

export default HomeSections