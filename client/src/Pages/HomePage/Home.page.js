import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import StockCard from "../../Components/StockCard/StockCard";
import "./Home.page.css";

class HomePage extends Component {
  render() {
    return (
      <>
        <h1 className="title">STOCK MANAGER</h1>
        <div className="main">
          <div className="btn1">
            <Link to="/new">
              <Button>New Stock</Button>
            </Link>
          </div>
          <div className="stock-list">
            <StockCard title="Bike" companyName="BMW" id={1} />
            <StockCard title="Jeans" companyName="Levi's" id={2} />
            <StockCard title="ToothBrush" companyName="Oral-B" id={3} />
            <StockCard title="Car" companyName="Audi" id={4} />
            <StockCard title="T-Shirt" companyName="US Polo" id={5} />
            <StockCard title="Notebook" companyName="Classmate" id={6} />
          </div>
        </div>
      </>
    );
  }
}

export default HomePage;
