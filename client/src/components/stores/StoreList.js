import React, { Component } from "react";
import StorePreview from "./StorePreview";

class StoreList extends Component {
  render() {
    const { stores } = this.props;
    const storeItems = stores.map((store) => (
      <StorePreview key={store._id} store={store} />
    ));

    let storesView;
    if (this.props.type === "all" || !this.props.type)
      // default case
      storesView = (
        <div className="container">
          <div className="row">{storeItems}</div>
        </div>
      );
    else if (this.props.type === "horizontal")
      storesView = (
        <div className="container p-0 px-1 horizontal-scroll">
          <div className="row no-gutters">{storeItems}</div>
        </div>
      );

    return <div>{storesView}</div>;
  }
}

export default StoreList;
