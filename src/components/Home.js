import React from "react";
import { Breadcrumb, Card } from "react-bootstrap";
//import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  // const { currentUser } = useAuth();

  return (
    <div>
      <Breadcrumb className="mb-3">
        <Breadcrumb.Item active>Home</Breadcrumb.Item>
      </Breadcrumb>
      <Card className="mb-3 col-10 mx-auto mb-5 ustify-content-center">
        <h2 className="mb-3 mt-3 col-12 d-flex justify-content-center">
          WELCOME TO WORK OUT!
        </h2>
        <Card.Img
          className="col-lg-6 col-sm-12 col-md-9 mx-auto"
          variant="top"
          src="https://cdn.pixabay.com/photo/2017/09/17/19/43/woman-2759503__340.jpg"
        />
        <Card.Body>
          <Card.Text className="text-muted medium">
            <b>WORK OUT</b> has you covered for all your work footwear and
            clothing needs with well over 200 work brands to choose from. We
            believe we have the most comprehensive selection of work clothes,
            boots, shoes, and accessories. Choose from the best of the best for
            clothing, like Carhartt or Wrangler. With over a thousand styles of
            Work Boots to choose from, you’ll find exactly what you need from
            great brands like Wolverine Boots and Carolina Shoes. Our selection
            of FR workwear and high visibility workwear is awesome.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;
