
//import firebase from "firebase/app";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import { Card, Button, Form } from "react-bootstrap";

import { useAuth } from "../../contexts/AuthContext";
import { useCreate } from "../../contexts/CreateContext";
import { useMobile } from "../../contexts/MobileContext";


const ProductCard = ({ item }) => {
    const navigate = useNavigate();
    const { admin } = useAuth();
    const { setSingleProduct, productOption, setProductOption } = useCreate();
    const { mobile, mobileDisplays, setMobileDisplays, mobileWidth } = useMobile()
    const location = useLocation();
    const [view, setView] = useState('')
    const { productId } = useParams()


    useEffect(() => {
        if ((location.pathname === `/cms/products/${productOption}/${Number(productId)}`) ||
            (location.pathname === '/cms/products/update') ||
            (location.pathname === `/products/${productOption}/${Number(productId)}`) ||
            (location.pathname === '/products/update')) { setView('single'); }
        else { setView('') }

    }, [location, productOption])

    const handleUpdateProduct = (product) => {

        navigate(`cms/products/update`, { replace: true });
    };

    const handleDeleteProduct = (product) => {
        try {
            const deletion = () => {
                console.log("ddeleteing " + product.name);
                alert('I don´t want to delete products, sorry')
                // await db.collection(`${type}`).doc(`${product.id}`).delete();
            };

            deletion();
        } catch (error) {
            console.log(error);
        }
    };

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
            marginBottom: '15px'
        } : !mobile && view === 'single' ? { width: '800px', display: 'flex', flexDirection: 'row', height: '400px' }
            : { width: '330px', height: 'fit-content', margin: '15px' }}
        className="p-2">

        <div style={!mobile && view === 'single' ? { width: '100%', height: '100%' } : {}} >
            <div style={!mobile && admin && view === 'single' ? {
                zIndex: '5', display: 'flex', flexDirection: 'column',
                alignItems: 'center', width: '100%', height: '260px', overflow: 'hidden'
            } : {}}>
                <Card.Img id="update-product-image" style={!mobile && admin && view === 'single' ? { zIndex: '4', width: '200px', margin: '10px' } :
                    {}} src={item.thumbnail} />
            </div>
            {!mobile && admin && view === 'single' && (<Form.Range style={{ position: 'absolute', top: '85%', width: '200px', left: '1%' }}
                onChange={handleImgResize}></Form.Range>)}
        </div>

        <Card.Body
            onClick={(e) => {
                setSingleProduct(item);
                if (e.target.id === 'updateProduct') navigate(`/cms/products/update/`, { replace: true })
                else navigate(admin ? `/cms/products/${item.category}/${item.id}` : `/products/${item.category}/${item.id}`, { replace: true })
            }}
            style={!mobile && view === 'single' ? {
                height: '100%', display: 'flex', flexDirection: 'column',
                margin: '10px', justifyContent: 'space-between', alignItems: 'start', fontSize: '1.3em'
            } : { display: 'block' }}
        >
            {" "}
            <Card.Text style={{ color: 'rgb(79, 48, 48)' }} className="small">
                <b>{item.name}</b>
            </Card.Text>
            <Card.Text className="text-muted small">
                <b>Price: </b> {item.price} €
            </Card.Text>
            <Card.Text className="text-muted small">
                <b>Description: </b>{" "}
                <span>
                    {(view !== 'single') ? <>{item.description.slice(0, 100)}<b>(Read more)</b></> : item.description}
                </span>
            </Card.Text>
            {admin && (
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
                    <Button
                        id="deleteProduct"
                        variant="danger"
                        size="sm"
                        className="col-5 mt-3 mr-1 p-2"
                        onClick={() => {
                            handleDeleteProduct(item);
                        }}
                    >
                        Delete
                    </Button>
                    <Button
                        id="updateProduct"
                        variant="secondary"
                        size="sm"
                        className="col-5 mt-3 ml-3 p-2"
                        onClick={() => {
                            handleUpdateProduct(item);
                        }}
                    >
                        Update
                    </Button>
                </div>
            )
            }
        </Card.Body >
    </Card >)
}

export default ProductCard