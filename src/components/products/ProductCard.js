
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router";

import { Card, CardFooter, Form, Alert } from "react-bootstrap";

import { useAuth } from "../../contexts/AuthContext";
import { useCreate } from "../../contexts/CreateContext";
import { useMobile } from "../../contexts/MobileContext";

import useCart from '../../hooks/useCart'

const ProductCard = ({ item, index }) => {

    const [lastImgIndex, setLastImgIndex] = useState('')
    const [activeSize, setActiveSize] = useState()
    const [view, setView] = useState('')
    const [sizeAlert, setSizeAlert] = useState(false)
    const updateCart = useCart()

    const navigate = useNavigate();
    const { admin } = useAuth();
    const { setSingleProduct, productOption, setProductOption, allProducts, setProdId } = useCreate();
    const { mobile, mobileDisplays, setMobileDisplays, mobileWidth, microMobile } = useMobile()

    const location = useLocation();

    const { productId } = useParams()


    // Effect for setting single product view if some urls are reloaded
    useEffect(() => {
        if ((location.pathname === `/cms/products/${productOption}/${Number(productId)}`) ||
            (location.pathname === '/cms/products/update') ||
            (location.pathname === `/products/${productOption}/${Number(productId)}`) ||
            (location.pathname === '/products/update')) { setView('single'); }
        else { setView('') }


    }, [location, productOption, lastImgIndex])


    const handleImgResize = (e) => {

        if (e.target.value > 0) {
            document.getElementById('update-product-image').style.transform = `scale(${((1 + (Number(e.target.value) / 100)).toFixed(1)).toString()})`
        }
        else {
            document.getElementById('update-product-image').style.transform = `scale(${(1).toFixed(1).toString()})`
        }
    }

    return (<Card key={item.id} className={!mobile && view === 'single' ? 'product-card single' : microMobile ? 'product-card micromobile' :
        mobile && admin ? 'product-card mobile admin' : mobile ? 'product-card mobile' : "product-card"} onClick={() => {
            setProductOption(item.category); setSingleProduct(item);
            mobileDisplays && setMobileDisplays(!mobileDisplays)
        }}
        style={mobile && admin ? {
            width: (view === 'single') ? `calc(${mobileWidth}px - 35px)` : `calc(${mobileWidth}px - 80px)`
        } : {}}>

        <div style={!mobile && admin && view === 'single' ? { width: '400px', height: '100%' }
            : mobile ? { width: '100%', margin: '0 auto' }
                : view === 'single' ? { width: '50%', height: 'fit-content' } : {}} >
            <div style={admin && view === 'single' ? {
                zIndex: '5', display: 'flex', flexDirection: 'column',
                alignItems: 'center', width: '100%', height: '300px', overflow: 'hidden'
            } : {}}>
                <Card.Img onClick={() => {
                    navigate(admin ? `/cms/products/${item.category}/${item.id}` : `/products/${item.category}/${item.id}`, { replace: true })
                }}
                    id="update-product-image" style={!mobile && admin && view === 'single' ? { zIndex: '4', width: '100%' } :
                        { width: '100%', height: '300px', objectFit: 'cover' }}
                    src={item.thumbnail} />
            </div>
            {admin && view === 'single' && (<Form.Range defaultValue={0} style={{ display: 'block', margin: '10px auto', width: '200px', left: '12%' }}
                onChange={handleImgResize}></Form.Range>)}
            <div id="single-product-sizes">
                <ul>
                    <li className={activeSize === 'S' ? 'active' : ''} onClick={() => { setActiveSize('S') }}>
                        S
                    </li>
                    <li className={activeSize === 'M' ? 'active' : ''} onClick={() => { setActiveSize('M') }}>
                        M
                    </li>
                    <li className={activeSize === 'L' ? 'active' : ''} onClick={() => { setActiveSize('L') }}>
                        L
                    </li>
                    <li className={activeSize === 'XL' ? 'active' : ''} onClick={() => { setActiveSize('XL') }}>
                        XL
                    </li>

                </ul>
            </div>
            {view === 'single' && !mobile ? (<div id="related-prods">
                <p>Same Category</p>
                <ul>
                    {allProducts.filter(prod => prod.category === item.category && prod.id !== item.id).map((prod, i) => {
                        // Showing only 3 related products
                        if (i <= 3) {
                            return (<li>
                                <img className="related-prods-pic" onClick={(e) => {
                                    setProdId(prod.id)
                                    e.stopPropagation()
                                    setSingleProduct(prod)
                                    navigate(admin ? `/cms/products/${prod.category}/${prod.id}` : `/products/${prod.category}/${prod.id}`, { replace: true })
                                }} alt={prod.description} src={prod.thumbnail} />
                                <p>{prod.title}</p>
                            </li>)
                        }
                        else return null
                    })}</ul>
            </div>) : null}
        </div>

        <Card.Body
            onClick={(e) => {
                if (e.target.id === 'updateProduct') { setSingleProduct(item); navigate(`/cms/products/update/`, { replace: true }) }
                else if (e.target.parentElement.id !== 'product-card-footer' && e.target.id !== 'product-card-footer-container') {
                    setSingleProduct(item);
                    navigate(admin ? `/cms/products/${item.category}/${item.id}` : `/products/${item.category}/${item.id}`, { replace: true })
                }
            }}
            style={!mobile && view === 'single' ? {
                height: 'fit-content', display: 'flex', flexDirection: 'column', width: '400px',
                marginLeft: '10px', justifyContent: 'space-between', alignItems: 'start', fontSize: '1.3em'
            } : { display: 'block' }} className="py-0"
        >
            {" "}
            <div>
                <Card.Text style={{ color: 'rgb(79, 48, 48)' }} className="small">
                    <b>{(view !== 'single') ? item.name.slice(0, item.name.slice(0, 30).lastIndexOf(' ')) : item.name}</b>
                </Card.Text>
                <Card.Text className=" small">
                    <b className="small">Price: </b> {item.price} €
                </Card.Text>
                {item.attribution && <Card.Text className=" small">
                    <a className="small" href={item.attLink}>{item.attribution}</a>
                </Card.Text>}
                <Card.Text className=" small">
                    <b className="small">Description: </b>{" "}
                    <span className="small">
                        {(view !== 'single') ? <>{item.description.slice(0, item.description.slice(0, 80).lastIndexOf(' '))}<b> (Read more)</b></>
                            : item.description}
                    </span>
                </Card.Text>
                {view === 'single' && mobile ? (<div id="related-prods">
                    <b className="small">Same Category</b>
                    <ul>
                        {allProducts.filter(prod => prod.category === item.category && prod.id !== item.id).map((prod, i) => {
                            // Showing only 4 related products
                            if (i <= 3) {
                                return (<li>
                                    <img className="related-prods-pic" onClick={(e) => {
                                        e.stopPropagation()
                                        setProdId(prod.id)
                                        setSingleProduct(prod);
                                        navigate(admin ? `/cms/products/${prod.category}/${prod.id}` : `/products/${prod.category}/${prod.id}`, { replace: true })
                                    }} alt={prod.description} src={prod.thumbnail} />
                                    <p>{prod.title}</p>
                                </li>)
                            }
                            else return null
                        })}</ul>
                </div>) : null}
            </div>
            {!admin && <CardFooter id="product-card-footer-container" style={{
                width: (view === 'single') && !mobile ? 'calc(50% - 40px)' : 'calc(100%)',
                margin: (view === 'single') ? '10px auto' : '10px auto',
                left: (view === 'single') && mobile ? '0' : view !== 'single' ? '0' : '',
            }}>
                <div id="product-card-footer">

                    {!activeSize && sizeAlert ? <Alert className="size-alert-message" variant="danger">You need to pick a size</Alert> : null}

                    <button type="button" className="add-to-cart-button" onClick={(e) => {
                        e.stopPropagation(); if (!activeSize) { setSizeAlert(true) } else { updateCart(item, 'plus', activeSize) }
                    }}>{item.qty === 0 ? 'Add To Cart' : `${item.qty} in Cart`}</button>

                    {item.qty > 0 ? <button className="remove-from-cart-button" type="button" onClick={(e) => { e.stopPropagation(); updateCart(item, 'minus', activeSize) }}>Remove</button> : null}
                </div>
            </CardFooter>}
        </Card.Body >
    </Card >)
}

export default ProductCard