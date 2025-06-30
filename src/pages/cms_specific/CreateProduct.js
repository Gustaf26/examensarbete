import { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router";

import { Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { BounceLoader } from "react-spinners";
import Icon from '@mui/material/Icon';

import MobileList from '../../cms_components/MobileList'
import { productReducer } from '../../hooks/handleProduct'

import { useAuth } from "../../contexts/AuthContext";
import { useCreate } from "../../contexts/CreateContext";
import { useMobile } from "../../contexts/MobileContext";

import useMobileStyles from "../../hooks/useMobileStyles";
import BreadCrumbContainer from '../../components/BreadCrumbContainer'


const originalImgSize = '100%'

const CreateProduct = () => {

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prodPrice, setPrice] = useState("");
  const [prodImgSize, setImgSize] = useState({ width: `${originalImgSize}px`, height: 'auto' })


  const [state, dispatch] = useReducer(productReducer, {})

  const {
    setProductOption,
    singleProduct,
    productCategories,
    setProducts,
    setSingleProduct
  } = useCreate();

  const { mobile, mobileDisplays, setMobileDisplays, mobileHeight, menuShowing, setMenuShowing, mobileWidth } = useMobile()
  const { containerStyles, microMobile } = useMobileStyles()
  const { admin } = useAuth()

  const navigate = useNavigate();

  const handleProduct = (typeAction) => {
    dispatch(typeAction)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state.name.length < 4 || state.description < 20) {
      setError("You are missing some of the required upload parameters");
      return;
    }

    if (!state.thumbnail) { setError('Sorry, you need to choose a product image'); return }

    setError(false);
    setLoading(true);

    const prodId = Math.floor(Math.random() * 10000);

    setProducts((prev) => [...prev, { ...state, id: prodId }])
    setSingleProduct(state)

    setTimeout(() => {
      navigate(`/cms/products/${state.category}/${prodId}`, { replace: true })
    }, 1000)

  };

  const handleImgResize = (e) => {
    if (e.target.value > 50) {
      console.log((1 + Number(e.target.value) / 100).toFixed(1))
      document.getElementById('update-product-image').style.transform = `scale(${((1 + Number(e.target.value) / 100).toFixed(1)).toString()})`
    }
    else {
      document.getElementById('update-product-image').style.transform = `scale(${(1 - ((50 - Number(e.target.value)) / 100)).toFixed(1).toString()})`
    }
  }


  const uploadImg = (e) => {
    e.preventDefault()
    document.getElementById("upfile").click()
  }

  useEffect(() => {
    setProductOption('t-shirts')
    setSingleProduct('');
  }, [])

  return (
    <div id="dummy-container-update" style={admin ? {
      position: 'absolute', top: mobile ? '60px' : '0',
      left: microMobile ? '0' : mobile ? '40px' : '240px', width: mobile ? 'calc(100% - 40px)' : 'calc(100% - 240px)'
    } : {}}
      onClick={(e) => { if (e.target.id === "dummy-container-update") setMobileDisplays(false) }}>

      {!mobile && <BreadCrumbContainer />}

      <Row className="dummy-container-mobile" onLoad={(e) => { mobile && admin && e.target.scrollIntoView({ block: 'center' }) }}
        style={mobile ? { ...containerStyles, margin: '0 auto', height: microMobile ? 'calc(100vh + 70px)' : 'fit-content' } : {
          height: '100vh', margin: '3rem auto',
          justifyContent: 'center', alignItems: 'start'
        }}>

        {mobile && admin && !microMobile && <Icon className="icon-mobile-displays" onClick={() => setMobileDisplays(!mobileDisplays)} style={{ border: '1px solid lightgrey', width: '40px', height: '40px', textAlign: 'left', zIndex: '5', margin: '0 auto', padding: '8px', borderRadius: '5px', position: 'absolute', top: `-20px`, left: '45%', backgroundColor: 'rgb(255, 255, 255)' }} color='primary'>device_unknown</Icon>}
        {mobileDisplays && <MobileList />}

        <Col lg={mobile ? 12 : 6}
          style={mobile ? { paddingTop: '10px', overflowY: 'scroll', height: `${mobileHeight - 20}px`, width: `${mobileWidth}px` }
            : !mobile && admin ? { width: 'fit-content' } : { marginTop: '-40px', width: '600px', height: '500px' }}>
          {admin && !mobile && <h2 style={{ color: 'brown', textAlign: 'center', padding: '10px' }}>Add A New Product</h2>}
          {!loading && (
            <Card className="p-2" style={mobile ? {
              marginTop: '40px',
              height: 'fit-content', overflowY: 'hidden'
            } : admin ? { height: 'fit-content', width: '800px' } : {
              marginTop: '',
              height: `${mobileHeight - 20}px`, overflowY: 'scroll'
            }}>
              {error && <Alert variant="danger" style={{ textAlign: 'center' }}>{error}</Alert>}
              <Card.Body id="update-card" onLoad={(e) => { !mobile && document.getElementById('update-card').scrollIntoView({ block: 'center' }) }}
                className="p-2" onClick={(window.innerWidth < 1100 || mobile) && menuShowing ? () => setMenuShowing(false) : null}
                style={!mobile && admin ? {
                  display: 'flex', justifyContent: 'start', width: '800px',
                  height: 'fit-content', flexWrap: 'wrap', alignItems: 'start'
                } : {}}>

                {admin && mobile && <Card.Title className="p-2" style={{ textAlign: 'center' }}>Update a product entry</Card.Title>}

                <div style={!mobile && admin ? { width: '30%', height: '60%' } : {}} >
                  <div style={!mobile && admin ? {
                    zIndex: '5', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', width: '100%', maxHeight: '300px', overflow: 'hidden'
                  } : {}}>
                    <Card.Img id="update-product-image" style={!mobile && admin ? { zIndex: '4', width: prodImgSize.width } :
                      {}} src={state.thumbnail} />
                  </div>

                  {!mobile && admin && <Form.Range style={{ position: 'absolute', top: '65%', width: '30%' }}
                    onChange={handleImgResize}></Form.Range>}
                  <Form onSubmit={uploadImg} style={!mobile ? {
                    left: `calc(15% - 45px)`,
                    width: '90px', textAlign: 'center', position: 'absolute', top: '72%'
                  } : { position: 'relative', width: '100%', display: 'inline-block', margin: '10px auto' }}>
                    <div style={{ height: '0px', width: '0px', overflow: 'hidden' }}>
                      <input id="upfile" type="file" onChange={(e) => handleProduct({ type: 'prod-image', thumbnail: URL.createObjectURL(e.target.files[0]) })} />
                    </div>
                    <input style={!mobile ? {
                      display: 'block', marginLeft: '20px', backgroundColor: 'rgb(13,110,253)', color: 'white', padding: '5px 15px',
                      borderRadius: '5px', border: '1px solid rgb(246, 212, 212)', boxShadow: '1px 1px 2px rgb(246, 212, 212)'
                    } : {
                      display: 'block', color: 'white', backgroundColor: 'rgb(13,110,253)', margin: '0 auto', borderRadius: '5px',
                      border: '1px solid rgb(246, 212, 212)', boxShadow: '1px 1px 2px rgb(246, 212, 212)', padding: '5px 15px'
                    }} type="submit" value="Upload" />
                  </Form>
                </div>

                <Form onSubmit={handleSubmit} style={!mobile && admin ? { width: '65%', marginLeft: '20px' } : {}}>
                  <Form.Group id="title" style={admin && !mobile ? { width: '100%' } : {}}>
                    <Form.Label className="py-2">Product name</Form.Label>
                    <Form.Control
                      type="title"
                      onChange={(e) => handleProduct({ type: 'prod-name', name: e.target.value })}
                      placeholder="Enter a valid product name"
                      required
                    />
                    {state.name && state.name.length < 4 && (
                      <Form.Text className="text-danger">
                        Please enter a name at least 4 characters long.
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group id="description">
                    <Form.Label className="py-2">Description</Form.Label>
                    <textarea className="p-2" style={{ width: '100%', height: '200px', overflowY: 'scroll', border: '0.5px solid lightgrey', borderRadius: '8px' }}
                      type="title"
                      onChange={(e) => handleProduct({ type: 'prod-description', description: e.target.value })}
                      placeholder="Enter a valid description (20 chars min)"
                      required
                    ></textarea>
                    {singleProduct.description &&
                      singleProduct.description.length < 20 && (
                        <Form.Text className="text-danger">
                          Please update with a description at least 20
                          characters long.
                        </Form.Text>
                      )}
                  </Form.Group>
                </Form>
                <Form onSubmit={handleSubmit} style={!mobile && admin ? { marginTop: '40px', width: '100%', display: 'flex', alignItems: 'end', justifyContent: 'start' } : {}}>
                  <Form.Group controlId="exampleForm.ControlSelect2" style={!mobile && admin ? { marginRight: '15px', width: '31%' } : {}}>
                    <Form.Label>Choose product category</Form.Label>
                    <Form.Control
                      custom
                      as="select"
                      required
                      defaultValue={'t-shirts'}
                      onChange={(e) => handleProduct({ type: 'prod-category', category: e.target.value.toLowerCase() })}
                    >
                      {productCategories &&
                        productCategories.map((category, i) => {
                          return (
                            <option key={i}>
                              {category.name.toUpperCase()}
                            </option>
                          );
                        })}

                    </Form.Control>
                  </Form.Group>
                  <Form.Group id="price" style={!mobile && admin ? { marginRight: '20px', width: '31%' } : {}}>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="title"
                      onChange={(e) => handleProduct({ type: 'prod-price', price: e.target.value })}
                      defaultValue={singleProduct.price}
                      required
                    />
                    {prodPrice && prodPrice === "0" && (
                      <Form.Text className="text-danger">
                        Please set the product price.
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group
                    style={!mobile && admin ? { display: 'flex', width: '31%', justifyContent: 'center' } :
                      mobile ? { width: '100%', marginTop: '30px', display: 'flex', justifyContent: 'center' } : {
                        marginTop: '30px', justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                    <Button
                      disabled={loading}
                      type="submit"
                      style={!mobile && admin ? { width: '100px', margin: '0 10px' } : microMobile ? { width: '90px', margin: '10px auto' } : {}}
                    >
                      Create
                    </Button>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          )}
          {loading && (
            <div className="d-flex justify-content-center my-5">
              <BounceLoader color={"#888"} size={100} />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CreateProduct;
