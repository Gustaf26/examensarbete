import { useNavigate } from "react-router-dom";


import {
    Form,
    FormControl,
    NavItem
} from "react-bootstrap";

import CartIcon from "./cart/CartIcon";

import { useAuth } from "../contexts/AuthContext";
import { useMobile } from "../contexts/MobileContext";
import { useCreate } from "../contexts/CreateContext";


const SearchForm = () => {

    const { admin } = useAuth();
    const { mobile } = useMobile()
    const { setSearchString } = useCreate();
    const navigate = useNavigate();


    const omitReload = (e) => {
        e.preventDefault();
    };

    const changeString = (val) => {
        setSearchString(val);
        localStorage.setItem("search", JSON.stringify(val));
        navigate(admin ? "/cms/search-results" : "/search-results", { replace: true });
    };

    return (< div id="nav-container" style={mobile ? {
        display: 'flex',
        justifyContent: 'center', alignItems: 'center', flexDirection: 'row',
        height: '75%', width: '100%'
    } : admin ? { display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'fit-content', padding: '20px 240px 20px 20px' }
        : { display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'fit-content', padding: '20px' }}>
        <NavItem className="d-flex align-items-center my-0 navitem"
            style={mobile ? {
                width: '70%', textAlign: 'center', margin: '0', padding: '20px 0px', height: '100%',
            } : { width: '500px' }}>
            <Form style={mobile ? {
                width: '100%', textAlign: 'center', padding: '15px', display: 'flex', alignItems: 'center',
                margin: '0', height: '100%'
            }
                : { width: '400px' }} onSubmit={omitReload}>
                <FormControl
                    style={mobile && admin ? { minWidth: '200px', margin: '0 auto' } : mobile ? { width: '60%', margin: '0 auto' } :
                        admin ? { margin: '0 auto 0 80px', maxWidth: '600px' } : { margin: '0 auto' }}
                    onChange={(e) => changeString(e.target.value)}
                    type="text"
                    id="product-search"
                    placeholder="Search product"
                />
            </Form>
        </NavItem>
        {mobile && <NavItem>
            <CartIcon />
        </NavItem>}
    </div>)
}

export default SearchForm