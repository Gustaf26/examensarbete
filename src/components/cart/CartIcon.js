
import { NavItem } from "react-bootstrap";

import ShoppingCart from "@mui/icons-material/ShoppingCart";



const CartIcon = () => {

    return (<NavItem style={{ display: 'flex', alignItems: 'center' }}><ShoppingCart style={{ color: 'brown' }} /></NavItem>)

}

export default CartIcon