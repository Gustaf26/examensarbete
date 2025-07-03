
import { useAuth } from "../../contexts/AuthContext";
import { useCreate } from "../../contexts/CreateContext";
import { useMobile } from "../../contexts/MobileContext";

import MobileList from "../../cms_components/MobileList";
import useMobileStyles from "../../hooks/useMobileStyles";

import Navigation from "../Navigation";
import ProductCard from "../products/ProductCard";
import CardContainer from "../products/CardContainer";
import BreadcrumbContainer from "../BreadCrumbContainer";

import Icon from "@mui/material/Icon";


const ProductsGrid = ({ products, type }) => {

	const { admin } = useAuth();
	const { setProductOption } = useCreate();
	const { mobile, mobileDisplays, setMobileDisplays } = useMobile();

	const { containerStyles, microMobile } = useMobileStyles();

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

					{/* Blurred cards for lazy loading of images */}
					{/* {!contentLoaded ? (<CardContainer className='category-products-placeholder'>

						{products.map((prod, i) => {
							return (
								<Card className="product-card blurred">
									<img alt="blurred product" src={dummyCard} />
									<Card.Body style={{ display: 'block' }} className="py-0">
										<Card.Text style={{ color: 'rgb(79, 48, 48)' }} className="small">
											<b>{prod.name}</b>
										</Card.Text>
										<Card.Text className=" small">
											<b className="small">Price: </b> {prod.price} €
										</Card.Text>
										{prod.attribution && <Card.Text className=" small">
											<a className="small" href={prod.attLink}>{prod.attribution}</a>
										</Card.Text>}
										<Card.Text className=" small">
											<b className="small">Description: </b>{" "}
											<span className="small">
												{prod.description}
											</span>
										</Card.Text>
									</Card.Body>
								</Card>
							)
						})}
					</CardContainer>
					) : null} */}
					<CardContainer>
						{products &&
							products.map((item, i) => (
								<ProductCard
									index={i}
									id={`${item.id}`}
									key={item.id}
									item={item}
								/>
							))}
					</CardContainer>
				</div>
			</div>
		</>
	);
};

export default ProductsGrid;
