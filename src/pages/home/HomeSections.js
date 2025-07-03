import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'

import verkstadImg from '../../assets/images/verkstad.jpg'

import { useCreate } from "../../contexts/CreateContext"
import { useMobile } from '../../contexts/MobileContext';
import { useAuth } from '../../contexts/AuthContext';

import useMobileStyles from '../../hooks/useMobileStyles';

function HomeSections() {

    const { allProducts, setSingleProduct, setSearchResults, setSearchString } = useCreate()

    const [slides, setSlides] = useState([])

    const slidesref = useRef()

    const { mobile } = useMobile();
    const { microMobile } = useMobileStyles();

    const navigate = useNavigate()

    const { admin } = useAuth()

    const [currentDevice, setCurrentDevice] = useState(microMobile ? 'micromobile' : mobile ? 'mobile' : 'desktop')
    const deviceChanging = useRef('')

    useEffect(() => {

        setCurrentDevice(microMobile ? 'micromobile' : mobile ? 'mobile' : 'desktop')

    }, [mobile, microMobile, admin])

    const showCheapest = () => {

        let cheapestProducts = allProducts.filter(prod => prod.price < 20)
        setSearchResults(cheapestProducts)

        navigate(admin ? `/cms/search-results` : `/search-results`, { replace: true })
    }

    const goToAllProducts = () => {

        localStorage.setItem("search", JSON.stringify(' '));
        setSearchString(' ')
        setTimeout(() => {
            navigate(admin ? "/cms/search-results" : "/search-results", { replace: true })
        }, 500)
    }

    const goToSingleProduct = (prod) => {

        setSingleProduct(prod);
        navigate(admin ? `/cms/products/${prod.category}/${prod.id}` : `/products/${prod.category}/${prod.id}`, { replace: true })

    }

    // Fuction for lazy loading of images in slider through a promise for every image
    const loadImages = () => {

        let maxSlides = currentDevice === 'micromobile' ? 0 : (currentDevice === 'mobile') && admin ? 0 :
            currentDevice === 'mobile' ? 7 : 8

        return allProducts.map(async (prod, i) => {

            if (i <= maxSlides) {

                return await new Promise((resolve, reject) => {

                    let imageEl = document.createElement('img')
                    imageEl.style.padding = '0 20px 0 auto'
                    imageEl.style.width = microMobile ? '100vw' : mobile & admin ? '160px' : mobile ? '170px' : '200px'
                    imageEl.style.maxWidth = microMobile ? '100vw' : mobile & admin ? '160px' : mobile ? '170px' : '200px'
                    imageEl.style.height = '200px'
                    imageEl.style.transform = microMobile ? 'none' : mobile && admin ? 'skew(0deg, 4deg) rotateY(30deg)' : 'skew(0deg, 4deg)'
                    imageEl.style.objectFit = 'cover'
                    imageEl.style.zIndex = `${i + 1}`
                    imageEl.style.marginLeft = microMobile ? '0' : mobile && admin ? '-35px' : '-90px'

                    imageEl.src = prod.thumbnail
                    imageEl.alt = prod.description
                    imageEl.addEventListener('click', () => {
                        goToSingleProduct(prod)
                    })
                    imageEl.addEventListener('load', (e) => {
                        if (imageEl.complete) resolve(imageEl)
                    })
                })
            }
            else {
                let dummyDiv = document.createElement('div')
                return await new Promise((resolve, reject) => { resolve(dummyDiv) })
            }
        })
    }

    useEffect(() => {

        const showSlides = () => {
            if (currentDevice !== deviceChanging.current) deviceChanging.current = currentDevice
            let imagesPromises = loadImages()

            let allFulfilledPromises = Promise.all(imagesPromises)

            if (slides.length > 0) slidesref.current.innerHTML = ""
            allFulfilledPromises.then(res => {
                res.forEach(slide => {
                    if (!slides.includes(slide)) {
                        setSlides((prev) => [...prev, slide]); slidesref.current?.append(slide)
                    }
                })
            })
        }

        if (currentDevice !== deviceChanging.current) {
            showSlides()
        }
        else if (slides.length === 0) {
            showSlides()
        }
        // eslint-disable-next-line
    }, [allProducts, currentDevice])


    return (<div id="home-sections-container" className={microMobile ? 'micromobile' : admin && mobile ? 'admin mobile' : admin ? 'admin' : mobile ? 'mobile' : ''}>
        <div id="home-card1"
            className={microMobile ? 'micromobile' : admin && mobile ? 'admin mobile' : admin ? 'admin' : mobile ? 'mobile' : ''}>
            <img alt="home-welcome-picture"
                className='p-0'
                variant='top'
                src='https://cdn.pixabay.com/photo/2017/09/17/19/43/woman-2759503__340.jpg'
            />
            <div id='home-card1-text'
                className={mobile ? 'mobile home-card-text text-muted mediums px-2' : 'home-card-text text-muted mediums px-2'}>
                <h3 style={{ textAlign: mobile ? 'center' : 'left' }}>The Most Affordable In The Market</h3>
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
                <div style={{ width: microMobile ? '100%' : mobile && admin ? '400px' : admin ? 'calc(100% - 180px)' : '100%', }}>
                    <div style={{
                        display: 'flex', justifyContent: 'center', flexWrap: 'nowrap',
                        width: microMobile ? '100%' : mobile && admin ? '400px' : admin ? 'calc(100%)' : '100%',
                        margin: admin && !mobile & !microMobile ? ' 0 auto' : '0 auto'
                    }} ref={slidesref}>
                        {!slides.length ? [0, 1, 2, 3, 4, 5, 6, 7].map(num => {
                            return (<div key={'placeholder' + num} id="home-slider-placeholder-container"
                            //  style={{ display: 'inline flex', flexWrap: 'nowrap', width: 'fit-content' }}
                            >
                                <img alt="blurry placeholder" src={verkstadImg} />
                            </div>)
                        }) : null}
                    </div>
                </div>
            </div>
            <button onClick={goToAllProducts}>See all products</button>
        </div>
    </div >)
}

export default HomeSections