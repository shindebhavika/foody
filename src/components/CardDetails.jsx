import { RiDeleteBin5Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Delete } from "../redux/actions/action";

function CardDetails() {
  const [price, setPrice] = useState("");
  const [quantity, setquantity] = useState(1);
  const history=useNavigate()
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const getData = useSelector((state) => state.CartReducer.carts);
  
  const compare = () => {

    let comparedata = getData.filter((e) => {
      return e.id == id;
    });
    setData(comparedata);
    setPrice(comparedata.price)
  };

  useEffect(() => {
    compare();
  }, [id]);
 
  
  function handleRemove(item) {
    history('/')
    dispatch(Delete(item));
  }

  const handleQuantity=(item,action)=>{
if(action=="increase"){
  setquantity(quantity+1)
  setPrice(item.price*quantity)
}else{
  setquantity(quantity-1)
}
  }
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Item Details Page</h2>

      <section className="container">
        {data.map((item) => (
          <div className="card details-section" key={item.id}>
            <img
              src={item.imgdata} // Use item.img for the image source
              className="card-img-top"
              alt="Restaurant"
            />
            <div className="card-body info-container">
              <h5 className="card-title">Restaurant: {item.rname}</h5>{" "}
              {/* Use item.name for the restaurant name */}
              <p>
                <strong>Price:</strong> ₹{item.price}
              </p>
              <p>
                <strong>Rating:</strong> <span></span>
                <span className="rating">{item.rating} ★ </span>
              </p>
              <p>
                <strong>Dishes:</strong> {item.address}
              </p>
              <p>
                <strong>Order Review:</strong> {item.somedata}
              </p>
              <p>
                <strong>Total:</strong> ₹{price }

              </p>
              <p>
                <strong>Remove:</strong>{" "}
                <RiDeleteBin5Fill
                  className="delete"
                  onClick={() => {
                    handleRemove(item);
                  }}
                />
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <button className="btn btn-primary">Order Now</button>
                <div className="quantity-container d-flex align-items-center add-more">
                  <button className="btn btn-outline-danger" onClick={()=>{
                    handleQuantity(item,"decrease")
                  }}>-</button>
                  <span className="quantity">{quantity}</span>
                  <button className="btn btn-outline-success" onClick={()=>{
                    handleQuantity(item,"increase")
                  }}>+</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default CardDetails;
