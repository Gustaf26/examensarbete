import { useState, useEffect } from "react";

import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useCreate } from "../contexts/CreateContext";
import { useAuth } from "../contexts/AuthContext";
import { useMobile } from "../contexts/MobileContext";

import ArrowBack from "@mui/icons-material/ArrowBack";

export default function BreadCrumbContainer({ qty }) {
	const { productCategories, allProducts } = useCreate();
	const { admin } = useAuth();
	const { mobile } = useMobile();

	const [breadcrumbs, setBreadcrumbs] = useState([]);
	const location = useLocation();
	// const navigate = useNavigate();

	const dummyProdCategories = productCategories.map((cat) => cat.name);

	useEffect(() => {
		if (location.pathname.lastIndexOf("/") === location.pathname.length - 1) {
			location.pathname = location.pathname.slice(0, location.pathname.length - 1);
		}
		let lastDash = location.pathname.lastIndexOf("/");
		let lastChar = location.pathname.length;
		let subcategory = location.pathname.slice(lastDash + 1, lastChar);
		let overcategory = location.pathname.replace(`/${subcategory}`, "");
		overcategory = overcategory.slice(
			overcategory.lastIndexOf("/") + 1,
			overcategory.length
		);

		let dummyBread = ["Home"];
		if (overcategory !== "products") dummyBread.push(overcategory);
		else {
			overcategory = "";
		}

		let singleProd;

		if (subcategory && Number(subcategory)) {
			singleProd = allProducts.filter((prod) => prod.id === Number(subcategory));
		}
		if (singleProd && singleProd.length > 0) {
			subcategory = singleProd[0].name;
		}
		if (subcategory) {
			dummyBread.push(subcategory);
		}

		if (!overcategory && !subcategory) {
			dummyBread = [];
		}

		console.log(dummyBread);
		setBreadcrumbs(dummyBread);
	}, [location]);

	return (
		<Breadcrumb
			style={!(mobile && admin) ? { margin: "40px 40px 0px 0px" } : { margin: "40px" }}
		>
			<ArrowBack
				style={{ color: "#0d6efd" }}
				sx={{ mr: 1, ml: 1, mt: 0.4 }}
				fontSize='medium'
			/>
			{breadcrumbs &&
				breadcrumbs.map((bread, i) => {
					return bread === "Home" ? (
						<Breadcrumb.Item>
							<Link to={admin ? "/cms/index" : "/"}>Home</Link>
						</Breadcrumb.Item>
					) : dummyProdCategories.includes(bread.toLowerCase()) ? (
						<Breadcrumb.Item>
							<Link to={admin ? `/cms/products/${bread}` : `/products/${bread}`}>
								{bread}
							</Link>
						</Breadcrumb.Item>
					) : (
						<Breadcrumb.Item>{bread}</Breadcrumb.Item>
					);
				})}
		</Breadcrumb>
	);
}
