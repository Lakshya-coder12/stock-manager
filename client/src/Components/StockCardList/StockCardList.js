import React, { Component } from "react";
import StockCard from "../StockCard/StockCard";

class StockCardList extends Component {
  render() {
    const items = this.props.items;
    return (
      <div>
        {items.map((item) => {
          return (
            <StockCard
              key={item._id}
              name={item.name}
              companyName={item.companyName}
              stock={item.stock}
              id={item._id}
            />
          );
        })}
      </div>
    );
  }
}

export default StockCardList;
