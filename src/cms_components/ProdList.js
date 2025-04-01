import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

import { useCreate } from "../contexts/CreateContext"
// import { useAuth } from '../contexts/AuthContext'

import { BounceLoader } from "react-spinners";

import useMobileStyles from '../hooks/useMobileStyles'
// import Navigation from '../components/Navigation'
import { TableHead, TableRow, Table, TableCell } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { useMobile } from "../contexts/MobileContext";


const ProdList = () => {

    const { allProducts, setSingleProduct, setProductOption } = useCreate();
    // const { admin } = useAuth()
    const [editable, setEditable] = useState('')
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const { mobile } = useMobile()
    const { microMobile } = useMobileStyles()

    return (
        <>{loading && (
            <div style={{ marginTop: '10%' }} className="d-flex justify-content-center align-items-center">
                <BounceLoader color={"#888"} size={100} />
            </div>
        )}
            <Table id="products-list-table" style={loading ? { visibility: 'hidden' } : mobile ? {
                position: 'absolute', left: microMobile ? '0' : 'calc(15vw + 30px)', width: microMobile ? '100vw' : '65vw',
                maxWidth: microMobile ? '100vw' : 'calc(100vw - 60px)'
            } :
                {
                    margin: '3rem 0 0 calc(100vw - 75%)', width: 'calc(100vw - 30%)',
                    maxWidth: '900px', border: '1px solid rgb(220,220,220) !important'
                }}>
                {!loading && (<TableHead>
                    <TableCell><b>Name</b></TableCell>
                    <TableCell><b>Category</b></TableCell>
                    <TableCell><b>Price</b></TableCell>
                </TableHead>)}
                {allProducts.map((prod, i) => {
                    return (<TableRow key={prod.id} onMouseOver={(e) => setEditable(prod.id)}
                        onMouseOut={() => setEditable('')} style={{
                            visibility: loading ? 'hidden' : 'visible',
                            width: '100%', cursor: 'pointer', position: 'relative'
                        }}>
                        <TableCell
                            onClick={(e) => {
                                setProductOption(prod.category); setSingleProduct(prod);
                                if (e.target.id === `visit-prod-icon-${prod.id}`) navigate(`/cms/products/${prod.category}/${prod.id}`, { replace: true })
                                else navigate(`/cms/products/update`, { replace: true })
                            }} style={mobile ? { display: 'flex', flexDirection: 'column' } : { paddingLeft: '18px' }} >

                            <img onLoad={() => { if (i === allProducts.length - 1) setLoading(false) }} alt={prod.name} src={prod.thumbnail} />

                            <span>{prod.name}</span>

                            {Number(editable) === prod.id && (
                                <div style={{
                                    position: 'absolute', top: '0', left: '0', width: '100%',
                                    height: '100%', backgroundColor: 'rgba(255,255,255,0.8)'
                                }}>
                                    <VisibilityIcon className="visit-prod-icon prod-list-icon" id={`visit-prod-icon-${prod.id}`} />
                                    <DeleteIcon className="delete-prod-icon prod-list-icon" />
                                    <ModeEditIcon className="edit-prod-icon prod-list-icon" id={`edit-icon-${prod.id}`} />
                                </div>)}
                        </TableCell>
                        <TableCell>{prod.category}</TableCell>
                        <TableCell>{prod.price}</TableCell>
                    </TableRow>)
                })}
            </Table>


        </>
    )

}

export default ProdList