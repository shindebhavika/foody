import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import CardsData from "./CardsData";
import { useDispatch } from "react-redux";
import { Add, Delete } from "../redux/actions/action";

function Cards() {
  const dispatch = useDispatch();
  const [items, setItems] = useState(CardsData);

  const addToCart = (item) => {
    // Update the state of the item to reflect that it is added to cart
    const updatedItems = items.map((i) =>
      i.id === item.id ? { ...i, addedToCart: true } : i
    );
    setItems(updatedItems);
    dispatch(Add(item));
  };

  const handleRemove = (item) => {
    // Update the state of the item to reflect that it is removed from cart
    const updatedItems = items.map((i) =>
      i.id === item.id ? { ...i, addedToCart: false } : i
    );
    setItems(updatedItems);
    dispatch(Delete(item));
  };

  return (
    <div className="items-container">
      {items.map((item) => (
        <div key={item.id}>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={item.imgdata} />
            <Card.Body>
              <Card.Title>{item.rname}</Card.Title>
              <Card.Text>Price: {item.price}</Card.Text>
              <Button
                className="CartBtn"
                onClick={() =>
                  item.addedToCart ? handleRemove(item) : addToCart(item)
                }>
                <span className="IconContainer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 576 512"
                    fill="rgb(17, 17, 17)"
                    className="cart">
                    <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                  </svg>
                </span>
                <p className="text">
                  {item.addedToCart ? "REMOVE" : "Add to Cart"}
                </p>
              </Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default Cards;
