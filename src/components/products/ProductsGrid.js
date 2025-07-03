
import { useEffect, useState } from "react";
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

import verkstadImg from '../../assets/images/verkstad.jpg'
import Icon from "@mui/material/Icon";

const ProductsGrid = ({ products, type }) => {

	const { admin } = useAuth();
	const { setProductOption } = useCreate();
	const { mobile, mobileDisplays, setMobileDisplays } = useMobile();
	const [contentLoaded, setContentLoaded] = useState(false)

	const { containerStyles, microMobile } = useMobileStyles();

	useEffect(() => {

		setTimeout(() => {
			setContentLoaded(true)
		}, 1000)

		return () => setContentLoaded(false)
	}, [])

	return (
		<>
			<div id="dummy-container-products"
				className={microMobile ? 'dummy-container-products micromobile' : admin && mobile ? 'dummy-container-products admin mobile' :
					admin ? 'dummy-container-products admin' : mobile ? 'dummy-container-products mobile' : 'dummy-container-products'}
				onClick={(e) => {
					if (e.target.id === "dummy-container-products") setMobileDisplays(false);
				}}
			>
				{((admin && microMobile) || (admin && !mobile)) && <Navigation />}
				{!(admin && mobile) && <BreadcrumbContainer />}

				<div className={microMobile ? 'dummy-container-products-row micromobile' : admin && mobile ? 'dummy-container-products-row admin mobile' :
					admin ? 'dummy-container-products-row admin' : mobile ? 'dummy-container-products-row mobile' : 'dummy-container-products-row'}
					onLoad={(e) => {
						setProductOption(type);
					}}
					style={mobile && admin & !microMobile ? { ...containerStyles } : {}}>
					{(admin && mobile && !microMobile) && <Navigation />}

					{mobile && admin && !microMobile && (
						<Icon
							className='icon-mobile-displays'
							onClick={() => setMobileDisplays(!mobileDisplays)}
							color='primary'
							style={{ zIndex: '1000 !important' }}
						>
							device_unknown
						</Icon>
					)}

					{mobileDisplays && <MobileList />}
					{!contentLoaded ? (
						products.map(prod => {
							return (<div
								style={{ marginTop: "10%" }}
								className='category-products-placeholder'
							>
								<img alt="dummy-placeholder for products" src={verkstadImg} />
							</div>)
						})
					) : null}
					{contentLoaded ? <CardContainer>
						{products &&
							products.map((item, i) => (
								<ProductCard
									index={i}
									id={`${item.id}`}
									key={item.id}
									item={item}
									className='category-product-placeholder'
								/>
							))}
					</CardContainer> : null}
				</div>
			</div>
		</>
	);
};

export default ProductsGrid;
