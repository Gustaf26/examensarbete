import { useState } from "react";
import { useNavigate } from 'react-router-dom'

import { useCreate } from "../contexts/CreateContext"
import { useAuth } from '../contexts/AuthContext'

// import Navigation from '../components/Navigation'
import { TableHead, TableRow, Table, TableCell } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import { useMobile } from "../contexts/MobileContext";


const ProdList = () => {

    const { allProducts, setSingleProduct, setProductOption } = useCreate();
    const [editable, setEditable] = useState('')
    const navigate = useNavigate()
    const { mobile } = useMobile()

    return (
        <>
            <Table style={mobile ? {
                position: 'absolute', left: '60px', height: 'fi-content', width: 'calc(100vw - 60px)',
                maxWidth: 'calc(100vw - 80px)'
            } :
                {
                    position: 'absolute', left: '220px', margin: '5rem', width: 'calc(100vw - 360px)',
                    maxWidth: '900px', border: '1px solid rgb(220,220,220) !important'
                }}>
                <TableHead style={!mobile ? { backgroundColor: 'rgb(220,220,220)' } : {}}>
                    <TableCell style={!mobile ? { color: 'rgb(104, 57, 23)' } : { color: 'rgb(220, 220, 220)' }}><b>Name</b></TableCell>
                    <TableCell style={!mobile ? { color: 'rgb(104, 57, 23)' } : { color: 'rgb(220, 220, 220)' }}><b>Category</b></TableCell>
                    <TableCell style={!mobile ? { color: 'rgb(104, 57, 23)' } : { color: 'rgb(220, 220, 220)' }}><b>Price</b></TableCell>
                </TableHead>

                {allProducts.map(prod => {
                    return (<TableRow key={prod.id} onMouseOver={(e) => setEditable(prod.id)}
                        onMouseOut={() => setEditable('')} style={{ width: '100%', cursor: 'pointer', position: 'relative' }}>
                        <TableCell
                            onClick={(e) => {
                                setProductOption(prod.category); setSingleProduct(prod);
                                if (e.target.id === `edit-icon-${prod.id}`) navigate(`/cms/products/update`, { replace: true })
                                else navigate(`/cms/products/${prod.category}/${prod.id}`, { replace: true })
                            }} style={{ paddingLeft: '18px' }} >

                            <img alt={prod.name} src={prod.thumbnail} style={{
                                width: '40px', height: '40px',
                                border: '1px solid rgb(220,220,220)',
                                borderRadius: '3px', padding: '5px', marginRight: '15px', verticalAlign: 'middle'
                            }} />

                            <span>{prod.name}</span>

                            {Number(editable) === prod.id && (<div style={{
                                position: 'absolute', top: '0', left: '0', width: '100%',
                                height: '100%', backgroundColor: 'rgba(255,255,255,0.8)'
                            }}>
                                <DeleteIcon style={{
                                    width: '30px', padding: '5px', height: '30px', color: 'rgb(113, 47, 47)', borderRadius: '3px', margin: '8px',
                                    position: 'absolute', top: 'calc(50% - 20px)', right: '51%', border: '1px solid rgb(113, 47, 47)'
                                }}
                                /><ModeEditIcon id={`edit-icon-${prod.id}`} style={{
                                    width: '30px', padding: '5px', height: '30px', color: 'rgb(67, 153, 252)', borderRadius: '3px', margin: '8px',
                                    position: 'absolute', top: 'calc(50% - 20px)', right: 'calc(51% - 40px)', border: '1px solid rgb(67, 153, 252)'
                                }} />
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