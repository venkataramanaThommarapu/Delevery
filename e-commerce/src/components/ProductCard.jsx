import '../App.css';
import Card from 'react-bootstrap/Card';
import PriceTag from './PriceTag';
import { useState } from 'react';
import axios from 'axios';
import { APIS } from '../apis';
import { toast } from 'react-toastify';

function ProductCard(props) {
  
  const [selected, setSelected] = useState(props.item.selected)
  // const [buttonText,setButtonText]=useState("Add to Cart")
 
  function oncartclick() {
    setSelected(!selected);
  
    axios.post(APIS.ADD_CART, { productId: props.item._id, prodcutTitle: props.item.title })  // to add the product into cart and it will be saved in db
      .then(response => {
        props.setReloadNavbar(Math.random()); // cart will be updated
        toast.success("Item added into the cart successfully.", {theme: 'colored'})
        console.log('Data saved to the database:', response.data);
      })
      .catch(error => {
        toast.error(error.response.data, {theme: 'colored'})
        console.error('Error saving data to the database:', error);
      });
      // setButtonText("Added To Cart")
  }
  

  return (
    <>
      <Card className=' mb-5 mt-3 bg-light shadow product-card'>
        <Card.Img className="product-card-img" variant="top" src={props.item.image} />
        <Card.Body>
          <Card.Title className='text-muted product-card-title'>{props.item.title}</Card.Title>
          <Card.Text className='product-card-text'>
            {props.item.description}
          </Card.Text>


          <div className="d-flex justify-content-between mt-2">
            <Card.Text className="flex-grow-1 text-truncate">
              <strong>Available:</strong> {props.item.available_qty}/{props.item.total_qty}
            </Card.Text>
            <Card.Text className="flex-grow-1 text-truncate">
              <PriceTag price={props.item.price} />
            </Card.Text>
          </div>

          <div className='text-center mt-3'>
                <button
                  className=" btn btn-success btn-md w-75"
                  onClick={oncartclick}
                ><span className="me-2">Add to cart</span>
                  <i className="bi bi-cart-fill"></i>
                </button>
          </div>


        </Card.Body>
      </Card>
     

    </>
  );
}

export default ProductCard;


