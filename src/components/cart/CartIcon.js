
import { NavItem } from "react-bootstrap";

import ShoppingCart from "@mui/icons-material/ShoppingCart";



const CartIcon = () => {

    return (<NavItem style={{ display: 'flex', alignItems: 'center', border: '1px solid brown', borderRadius: '5px', padding: '0px 10px' }}><ShoppingCart style={{ color: 'brown' }} /></NavItem>)

}

export default CartIcon