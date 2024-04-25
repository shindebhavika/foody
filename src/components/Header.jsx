import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { FaShoppingCart } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Delete } from "../redux/actions/action";

function Header() {
  const [modal, setModal] = useState(false); // Initialize modal state to false
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState(0);
  const getData = useSelector((state) => state.CartReducer.carts);
  const dispatch = useDispatch();
  const handleAddIcon = () => {
    setOpen(true);
    if (getData.length > 0) {
      setModal(1);
    } else {
      setModal(0);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
  };
  function handleRemove(item) {
    dispatch(Delete(item));
  }
  function total(){
    let price=0
    getData.map((item)=>{
      price=item.price+price
    })
    setPrice(price)
  }
  useEffect(()=>{
    total()
  })

  
  return (
    <div>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
        <h1 className="name">
          Foody
        </h1>
          <Navbar.Brand href="#home">Add To Cart</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home " className="text-[30px]"><h3>Home</h3></Nav.Link>

            <Nav.Link href="#home">
              <button
                type="button"
                className="btn btn-primary position-relative add-btn"
                onClick={handleAddIcon}>
                <FaShoppingCart />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {getData.length}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </button>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {open && modal && (
        <div className="card_details">
          <Table>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Restaurant Name</th>
                <th>
                  {" "}
                  <h5 onClick={handleCloseModal}>X</h5>{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {getData.map((item) => (
                <tr key={item.id}>
                  {/* Add key prop */}
                  <td>
                    <NavLink
                      to={`/cart/${item.id}`}
                      onClick={() => setOpen(false)}>
                      <img
                        src={item.imgdata}
                        style={{ width: "5rem", height: "5rem" }}
                        alt=""
                      />
                    </NavLink>
                  </td>
                  <td>
                    <p>{item.rname}</p>
                    <p>Price : ₹{item.price}</p>
                    <p>Quantity : </p>
                    <p
                      style={{ color: "red", fontSize: 20, cursor: "pointer" }}>
                      <i className="fas fa-trash smalltrash"></i>
                    </p>
                  </td>
                  <td>
                    <RiDeleteBin5Fill
                      className="delete"
                      onClick={() => {
                        handleRemove(item);
                      }}
                    />
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="3" className="text-center">
                  Total : ₹{price}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}

      {open && !modal && (
        <div className="empty-cart">
          <div>
            <p>Your cart is Empty</p>
            <img
              src="https://react-redux-cart-youtube.netlify.app/cart.gif"
              alt=""
            />
          </div>
          <div>
            <h5 onClick={handleCloseModal} className=" delete">
              X
            </h5>{" "}
            {/* Close button */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
