import { useState, useEffect } from 'react'

import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

import { useCreate } from "../contexts/CreateContext";
import { useAuth } from "../contexts/AuthContext";
import ArrowBack from '@mui/icons-material/ArrowBack';

export default function BreadCrumbContainer({ qty }) {

    const { productOption, allProducts } = useCreate();
    const { admin } = useAuth()
    const [breadcrumbs, setBreadcrumbs] = useState([])
    const location = useLocation()


    useEffect(() => {

        let firstDash = location.pathname.lastIndexOf('/');
        let lastDash = location.pathname.length
        let category = location.pathname.slice(firstDash + 1, lastDash);
        let singleProd;

        if (category && Number(category)) {
            singleProd = allProducts.filter(prod => prod.id === Number(category))
        }
        if (singleProd && singleProd.length > 0) {
            category = singleProd[0].name
        }
        if (category && ((category !== 'update') && (category !== 'search-results'))) {
            setBreadcrumbs(['Home', category])
        }
        else { setBreadcrumbs(['Home']) }

    }, [location])

    return (<Breadcrumb className="m-5 pt-5">
        <ArrowBack style={{ color: '#0d6efd' }} sx={{ mr: 1, ml: 1, mt: 0.4 }} fontSize="medium" />
        {breadcrumbs && breadcrumbs.map(bread => {

            return bread === 'Home' ? (
                <Breadcrumb.Item>
                    <Link to={admin ? "/cms/index" : "/"}>Home</Link>
                </Breadcrumb.Item>) :
                (<Breadcrumb.Item>
                    {productOption && (
                        <Link to={admin ? `/cms/products/${bread}` : `/products/${bread}`}>{bread}</Link>
                    )}
                </Breadcrumb.Item>)
        })}
    </Breadcrumb>)
}