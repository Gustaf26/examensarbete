import { useState, useEffect } from 'react'

import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

import { useCreate } from "../contexts/CreateContext";
import { useAuth } from "../contexts/AuthContext";
import ArrowBack from '@mui/icons-material/ArrowBack';

export default function BreadCrumbContainer({ qty }) {

    const { productCategories, allProducts } = useCreate();
    const { admin } = useAuth()
    const [breadcrumbs, setBreadcrumbs] = useState([])
    const location = useLocation()

    const dummyProdCategories = productCategories.map(cat => cat.name)


    useEffect(() => {

        let lastDash = location.pathname.lastIndexOf('/');
        let lastChar = location.pathname.length
        let subcategory = location.pathname.slice(lastDash + 1, lastChar);
        let overcategory = location.pathname.replace(`/${subcategory}`, '')
        overcategory = overcategory.slice(overcategory.lastIndexOf('/') + 1, overcategory.length)

        let dummyBread = ['Home']
        if (overcategory !== 'products') dummyBread.push(overcategory)
        else { overcategory = "" }

        let singleProd;

        if (subcategory && Number(subcategory)) {
            singleProd = allProducts.filter(prod => prod.id === Number(subcategory))
        }
        if (singleProd && singleProd.length > 0) {
            subcategory = singleProd[0].name
        }
        if (subcategory && ((subcategory !== 'update') && (subcategory !== 'search-results'))) {
            dummyBread.push(subcategory)
        }

        if (!overcategory && !subcategory) { dummyBread = [] }

        setBreadcrumbs(dummyBread)

    }, [location])

    return (<Breadcrumb className="m-5 pt-5">
        <ArrowBack style={{ color: '#0d6efd' }} sx={{ mr: 1, ml: 1, mt: 0.4 }} fontSize="medium" />
        {breadcrumbs && breadcrumbs.map((bread, i) => {

            return bread === 'Home' ? (
                <Breadcrumb.Item>
                    <Link to={admin ? "/cms/index" : "/"}>Home</Link>
                </Breadcrumb.Item>) :
                dummyProdCategories.includes(bread.toLowerCase()) ? (<Breadcrumb.Item>
                    <Link to={admin ? `/cms/products/${bread}` : `/products/${bread}`}>{bread}</Link>
                </Breadcrumb.Item>) :
                    (<Breadcrumb.Item>
                        {bread}
                    </Breadcrumb.Item>)
        })}
    </Breadcrumb>)
}