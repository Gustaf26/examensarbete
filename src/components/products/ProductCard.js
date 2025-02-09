
//import firebase from "firebase/app";
import React from "react";
import { useNavigate } from "react-router-dom";

import { Card, Button } from "react-bootstrap";


import { useAuth } from "../../contexts/AuthContext";
import { useCreate } from "../../contexts/CreateContext";
import { useMobile } from "../../contexts/MobileContext";


const ProductCard = ({ item }) => {
    const navigate = useNavigate();
    const { admin } = useAuth();
    const { setSingleProduct } = useCreate();
    const { mobile, mobileDisplays, setMobileDisplays, mobileHeight, mobileWidth } = useMobile()



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
            width: `calc(${mobileWidth}px - 30px)`, height: 'fit-content',
            maxHeight: `calc(${mobileHeight}px - 30px)`, overflowY: 'scroll'
        } : { width: '330px' }}
        className="m-2 p-2">
        <a href={item.thumbnail}
            title="View image in lightbox"
            data-attribute="SRL">
            <Card.Img
                variant="top"
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
                    {item.description.slice(0, 100)}... <b>(Read more)</b>
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