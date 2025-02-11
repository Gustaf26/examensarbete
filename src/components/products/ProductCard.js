
//import firebase from "firebase/app";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import { Card, Button } from "react-bootstrap";


import { useAuth } from "../../contexts/AuthContext";
import { useCreate } from "../../contexts/CreateContext";
import { useMobile } from "../../contexts/MobileContext";


const ProductCard = ({ item }) => {
    const navigate = useNavigate();
    const { admin } = useAuth();
    const { setSingleProduct, productOption } = useCreate();
    const { mobile, mobileDisplays, setMobileDisplays, mobileHeight, mobileWidth } = useMobile()
    const location = useLocation();
    const [view, setView] = useState('')
    const { productId } = useParams()


    useEffect(() => {
        if ((location.pathname === `/cms/products/${productOption}/${productId}`) ||
            (location.pathname === 'cms/products/update')) { setView('single'); }
    })

    const handleUpdateProduct = (product) => {

        navigate(`/cms/products/update/`, { replace: true });
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


    return (<Card key={item.id} onClick={() => { mobileDisplays && setMobileDisplays(!mobileDisplays) }}
        style={mobile && admin ? {
            width: (view === 'single') ? `calc(${mobileWidth}px - 35px)` : `calc(${mobileWidth}px - 50px)`, height: 'fit-content',
            maxHeight: (view === 'single') ? `calc(${mobileHeight}px - 80px)` : 'fit-content', overflowY: view !== 'single' ? '' : 'scroll',
            marginBottom: '15px'
        } : { width: '330px', margin: '15px' }}
        className="p-2">
        <a href={item.thumbnail}
            title="View image in lightbox"
            data-attribute="SRL">
            <Card.Img
                variant="top"
                style={{ height: 'auto' }}
                src={item.thumbnail}
                title={item.name} />
        </a>
        <Card.Body
            className="d-block"
            onClick={(e) => {
                setSingleProduct(item);
                if (e.target.id === 'updateProduct') navigate(`/cms/products/update/`, { replace: true })
                else navigate(admin ? `/cms/products/${item.category}/${item.id}` : `/products/${item.category}/${item.id}`, { replace: true })
            }}
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