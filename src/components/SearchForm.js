import { useNavigate } from "react-router";

import {
    Form,
    FormControl,
    NavItem
} from "react-bootstrap";

import CartIcon from "./cart/CartIcon";

import { useAuth } from "../contexts/AuthContext";
import { useMobile } from "../contexts/MobileContext";
import { useCreate } from "../contexts/CreateContext";
import useMobileStyles from '../hooks/useMobileStyles'


const SearchForm = () => {

    const { admin } = useAuth();
    const { mobile } = useMobile()
    const { microMobile } = useMobileStyles()
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

    return (< div id="nav-container" style={mobile && admin ? {
        display: 'flex',
        justifyContent: 'center', alignItems: 'center', flexDirection: 'row',
        height: 'fit-content', width: `100%`, paddingLeft: microMobile ? '0' : ''
    } : admin ? { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', padding: '20px 240px 20px 20px' }
        : mobile ? { width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px 20px' } :
            { display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center', height: '100%', padding: '20px' }}>
        <NavItem className="d-flex align-items-center my-0 navitem"
            style={mobile && admin ? {
                width: '90%', textAlign: 'center', margin: '0', padding: '20px 0px', height: '100%',
            } : mobile ? { width: '90%', maxWidth: '400px' } : { width: '500px' }}>
            <Form style={mobile & admin ? {
                width: microMobile ? '100%' : '100%', textAlign: 'center', padding: '15px', display: 'flex', alignItems: 'center',
                margin: '0', height: '100%'
            } : mobile ? { width: '90%' } : { width: '400px' }} onSubmit={omitReload}>
                <FormControl
                    style={mobile && admin ? { width: '80%', margin: '0 auto' } : mobile ? { width: '100%', minWidth: '200px', margin: '0 auto' } :
                        admin ? { margin: '0 auto 0 80px', maxWidth: '600px' } : { width: '80%', margin: '0 auto' }}
                    onChange={(e) => changeString(e.target.value)}
                    type="text"
                    id="product-search"
                    placeholder="Search product"
                />
            </Form>
        </NavItem>
        {mobile && !admin && <NavItem>
            <CartIcon />
        </NavItem>}
    </div>)
}

export default SearchForm