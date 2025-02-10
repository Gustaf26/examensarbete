import { useState } from "react";
import { useNavigate } from 'react-router-dom'

import { useCreate } from "../contexts/CreateContext"
import { useAuth } from '../contexts/AuthContext'

// import Navigation from '../components/Navigation'
import { TableHead, TableRow, Table, TableCell } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';




const ProdList = () => {

    const { allProducts, setSingleProduct, setProductOption } = useCreate();
    const [editable, setEditable] = useState('')
    const navigate = useNavigate()

    return (
        <>
            <Table style={{ margin: '5rem', maxWidth: '1000px', border: '1px solid rgb(220,220,220) !important' }}>
                <TableHead>
                    <TableCell><b>Name</b></TableCell>
                    <TableCell><b>Category</b></TableCell>
                    <TableCell><b>Price</b></TableCell>
                </TableHead>

                {allProducts.map(prod => {
                    return (<TableRow key={prod.id} style={{ cursor: 'pointer' }}>
                        <TableCell onMouseOver={(e) => setEditable(prod.id)}
                            onMouseOut={() => setEditable('')}
                            onClick={() => { setProductOption(prod.category); setSingleProduct(prod); navigate(`/cms/products/${prod.category}/${prod.id}`, { replace: true }) }}
                            style={{ position: 'relative' }} ><img alt={prod.name} src={prod.thumbnail} style={{
                                width: '40px', height: '40px',
                                border: '1px solid rgb(220,220,220)',
                                borderRadius: '3px', padding: '5px', marginRight: '15px', verticalAlign: 'middle'
                            }} />{prod.name}
                            {Number(editable) === prod.id && (<>
                                <DeleteIcon style={{
                                    width: '30px', padding: '5px', height: '30px', color: 'white', borderRadius: '6px', margin: '8px',
                                    position: 'absolute', top: '12px', right: '40px', border: '1px solid white'
                                }}
                                /><ModeEditIcon style={{
                                    width: '30px', padding: '5px', height: '30px', color: 'rgb(67, 153, 252)', borderRadius: '6px', margin: '8px',
                                    position: 'absolute', top: '12px', right: '0px', border: '1px solid rgb(67, 153, 252)'
                                }} />
                            </>)}
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