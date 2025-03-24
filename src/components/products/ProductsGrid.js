//import firebase from "firebase/app";
import React, { useEffect } from "react";
// import { Link } from "react-router-dom";

import { Row } from "react-bootstrap";
import Icon from "@mui/material/Icon";

import { BounceLoader } from "react-spinners";

import { useAuth } from "../../contexts/AuthContext";
import { useCreate } from "../../contexts/CreateContext";
import { useMobile } from "../../contexts/MobileContext";

import MobileList from "../../cms_components/MobileList";
import useMobileStyles from "../../hooks/useMobileStyles";

import Navigation from "../Navigation";
import ProductCard from "../products/ProductCard";
import CardContainer from "../products/CardContainer";
import BreadcrumbContainer from "../BreadCrumbContainer";

const ProductsGrid = ({ products, type, loading, setLoading }) => {
	// const navigate = useNavigate();
	const { admin } = useAuth();
	const { setProductOption } = useCreate();
	const { mobile, mobileDisplays, setMobileDisplays } = useMobile();

	const { containerStyles, microMobile } = useMobileStyles();


	useEffect(() => {
		console.log(loading)
	}, [loading])

	return (
		<>
			<div
				className={microMobile ? 'dummy-container-products micromobile' : admin && mobile ? 'dummy-container-products admin mobile' :
					admin ? 'dummy-container-products admin' : mobile ? 'dummy-container-products mobile' : 'dummy-container-products'}
				onClick={(e) => {
					if (e.target.id === "dummy-container-products") setMobileDisplays(false);
				}}
			>
				{microMobile && admin && <Navigation />}
				{!(admin && mobile) && <BreadcrumbContainer />}

				<Row className={microMobile ? 'dummy-container-products-row micromobile' : admin && mobile ? 'dummy-container-products-row admin mobile' :
					admin ? 'dummy-container-products-row admin' : mobile ? 'dummy-container-products-row mobile' : 'dummy-container-products-row'}
					onLoad={(e) => {
						setProductOption(type);
					}}
					style={mobile && admin ? { ...containerStyles } : {}}>
					{admin && mobile && !microMobile && <Navigation />}

					{mobile && admin && !microMobile && (
						<Icon
							className='icon-mobile-displays'
							onClick={() => setMobileDisplays(!mobileDisplays)}
							color='primary'
						>
							device_unknown
						</Icon>
					)}

					{mobileDisplays && <MobileList />}
					{loading < products.length && (
						<div
							style={{ marginTop: "10%" }}
							className='d-flex justify-content-center align-items-center'
						>
							<BounceLoader color={"#888"} size={100} />
						</div>
					)}
					<CardContainer style={{ visibility: loading !== products.length ? 'none' : 'visible' }}>
						{products &&
							products.map((item, i) => (
								<ProductCard
									setLoading={setLoading}
									index={i}
									id={`${item.id}`}
									key={item.id}
									item={item}
								/>
							))}
					</CardContainer>
				</Row>
			</div>
		</>
	);
};

export default ProductsGrid;
