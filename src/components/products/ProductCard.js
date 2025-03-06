
//import firebase from "firebase/app";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import { Card, CardFooter, Form } from "react-bootstrap";
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { useAuth } from "../../contexts/AuthContext";
import { useCreate } from "../../contexts/CreateContext";
import { useMobile } from "../../contexts/MobileContext";

import useCart from '../../hooks/useCart'


const ProductCard = ({ item, index, setLoading }) => {

    const [lastImgIndex, setLastImgIndex] = useState('')
    const [activeSize, setActiveSize] = useState()
    const [view, setView] = useState('')
    const updateCart = useCart()

    const navigate = useNavigate();
    const { admin } = useAuth();
    const { setSingleProduct, productOption, setProductOption } = useCreate();
    const { mobile, mobileDisplays, setMobileDisplays, mobileWidth, mobileHeight } = useMobile()

    const location = useLocation();

    const { productId } = useParams()


    useEffect(() => {
        if ((location.pathname === `/cms/products/${productOption}/${Number(productId)}`) ||
            (location.pathname === '/cms/products/update') ||
            (location.pathname === `/products/${productOption}/${Number(productId)}`) ||
            (location.pathname === '/products/update')) { setView('single'); }
        else { setView('') }

        if (location.pathname === admin ? "/cms/search-results" : "/search-results") {
            if (lastImgIndex === index) {
                setLoading(false)
            }
        }
        else if (location.pathname === admin ? `/cms/products/${productOption}` : `/products/${productOption}/`) {
            if (lastImgIndex === index) {
                setLoading(false)
            }
        }

    }, [location, productOption, lastImgIndex])


    // FIREBASE DELETING PRODUCT

    // const handleUpdateProduct = (product) => {

    //     navigate(`cms/products/update`, { replace: true });
    // };

    // const handleDeleteProduct = (product) => {
    //     try {
    //         const deletion = () => {
    //             console.log("ddeleteing " + product.name);
    //             alert('I don´t want to delete products, sorry')
    //             // await db.collection(`${type}`).doc(`${product.id}`).delete();
    //         };

    //         deletion();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const handleImgResize = (e) => {

        if (e.target.value > 50) {
            console.log((1 + Number(e.target.value) / 100).toFixed(1))
            document.getElementById('update-product-image').style.transform = `scale(${((1 + Number(e.target.value) / 100).toFixed(1)).toString()})`
        }
        else {
            document.getElementById('update-product-image').style.transform = `scale(${(1 - ((50 - Number(e.target.value)) / 100)).toFixed(1).toString()})`
        }
    }

    return (<Card key={item.id} onClick={() => {
        setProductOption(item.category); setSingleProduct(item);
        mobileDisplays && setMobileDisplays(!mobileDisplays)
    }}
        style={mobile && admin ? {
            width: (view === 'single') ? `calc(${mobileWidth}px - 35px)` : `calc(${mobileWidth}px - 50px)`, height: 'fit-content',
            maxHeight: 'fit-content',
            marginBottom: '15px', padding: '15px'
        } : !mobile && view === 'single' ? {
            position: 'relative',
            width: '800px', display: 'flex', marginTop: '0',
            flexDirection: 'row', height: '550px', alignItems: 'start', padding: '15px'
        } : mobile ? {
            width: '100%', height: view === 'single' ? `${mobileHeight + 80}px` : 'fit-content', paddingTop: '15px',
            maxWidth: '330px', margin: '10px auto', display: 'flex', justifyContent: 'center'
        }
            : admin ? { width: '330px', height: '570px', margin: '15px', padding: '10px' } :
                { width: '330px', height: '630px', margin: '15px', padding: '10px' }}>

        <div style={!mobile && admin && view === 'single' ? { width: '400px', height: '100%' } : mobile ? { width: '100%', margin: '0 auto' }
            : view === 'single' ? { width: '50%', height: 'fit-content' } : {}} >
            <div style={!mobile && admin && view === 'single' ? {
                zIndex: '5', display: 'flex', flexDirection: 'column',
                alignItems: 'center', width: '100%', height: '300px', overflow: 'hidden'
            } : {}}>
                <Card.Img onClick={() => {
                    setSingleProduct(item);
                    navigate(admin ? `/cms/products/${item.category}/${item.id}` : `/products/${item.category}/${item.id}`, { replace: true })
                }}
                    onLoad={() => setLoading(prev => prev + 1)}
                    id="update-product-image" style={!mobile && admin && view === 'single' ? { zIndex: '4', width: '100%' } :
                        { width: '100%', height: '300px', objectFit: 'cover' }} src={item.thumbnail} />
            </div>
            {!mobile && admin && view === 'single' && (<Form.Range style={{ display: 'block', margin: '0 auto', width: '200px', left: '12%' }}
                onChange={handleImgResize}></Form.Range>)}
            <div id="single-product-sizes">
                <ul>
                    <li className={activeSize === 0 ? 'active' : ''} onClick={() => { setActiveSize(0) }}>
                        S
                    </li>
                    <li className={activeSize === 1 ? 'active' : ''} onClick={() => { setActiveSize(1) }}>
                        M
                    </li>
                    <li className={activeSize === 2 ? 'active' : ''} onClick={() => { setActiveSize(2) }}>
                        L
                    </li>
                    <li className={activeSize === 3 ? 'active' : ''} onClick={() => { setActiveSize(3) }}>
                        XL
                    </li>

                </ul>
            </div>
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
                <Card.Text className="text-muted small">
                    <b>Price: </b> {item.price} €
                </Card.Text>
                {item.attribution && <Card.Text className="text-muted small">
                    <a href={item.attLink}>{item.attribution}</a>
                </Card.Text>}
                <Card.Text className="text-muted small">
                    <b>Description: </b>{" "}
                    <span>
                        {(view !== 'single') ? <>{item.description.slice(0, item.description.slice(0, 80).lastIndexOf(' '))}<b> (Read more)</b></>
                            : item.description}
                    </span>
                </Card.Text>
            </div>
            {!admin && <CardFooter id="product-card-footer-container" style={{
                width: (view === 'single') && !mobile ? 'calc(50% - 40px)' : 'calc(100%)', margin: '10px auto',
                position: (view === 'single') ? 'absolute' : 'relative',
                bottom: (view === 'single') ? '0px' : '-20px', display: 'block',
                left: (view === 'single') && mobile ? '0' : '',
                alignText: 'center'
            }}><div id="product-card-footer" style={{ width: 'fit-content', margin: '0 auto', display: 'block' }}>
                    <span onClick={(e) => updateCart(item, 'plus')} style={{
                        fontSize: '1.2em', color: 'brown', width: '40px',
                        textAlign: 'center'
                    }}>+</span>
                    <input type="button" value={item.qty} style={{
                        textAlign: 'center', color: 'brown', fontWeight: 'bold', outline: 'none',
                        border: '1px solid rgb(246, 212, 212)', boxShadow: '1px 1px 2px rgb(246, 212, 212)',
                        backgroundColor: 'white', margin: '0px 8px', width: '40px', borderRadius: '4px'
                    }} />
                    <span onClick={(e) => updateCart(item, 'minus')} style={{
                        fontSize: '1.2em',
                        color: 'brown', width: '40px', textAlign: 'center'
                    }}>-</span>
                </div>
            </CardFooter>}
        </Card.Body >

    </Card >)
}

export default ProductCard