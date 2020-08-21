import React, { Component } from "react";
import ProductPreview from "./ProductPreview";

class ProductList extends Component {
  render() {
    const { products } = this.props;

    const productItems = this.props.saleInfo
      ? products.map((product) =>
          Object.keys(this.props.saleInfo).includes(product._id) ? (
            <ProductPreview
              cols="col-6"
              key={product._id}
              product={product}
              saleInfo={this.props.saleInfo[product._id]}
            />
          ) : (
            <ProductPreview
              cols="col-6"
              key={product._id}
              product={product}
              saleInfo={{ profit: 0, quantity: 0 }}
            />
          )
        )
      : products.map((product) => (
          <ProductPreview key={product._id} product={product} />
        ));

    let productsView;
    if (this.props.saleInfo)
      // default case
      productsView = (
        <div className="container p-0 px-1 vertical-scroll">
          <div style={{ height: "400px" }} className="row no-gutters">
            {productItems}
          </div>
        </div>
      );
    else if (this.props.type === "all" || !this.props.type)
      // default case
      productsView = (
        <div className="container p-0 px-1">
          <div className="row no-gutters">{productItems}</div>
        </div>
      );
    else if (this.props.type === "horizontal")
      productsView = (
        <div className="container p-0 px-1 horizontal-scroll">
          <div className="row no-gutters">{productItems}</div>
        </div>
      );

    return <div>{productsView}</div>;
  }
}

export default ProductList;

// TODO MAYBE:
// if (this.props.type === "horizontal") {
//   for (let i = 0; i < products.length; i += 2) {
//     let divToAdd;
//     if (products.length - 1 !== i)
//       divToAdd = (
//         <div>
//           <ProductPreview key={products[i]._id} product={products[i]} />
//           <ProductPreview
//             key={products[i + 1]._id}
//             product={products[i + 1]}
//           />
//         </div>
//       );
//     else
//       divToAdd = (
//         <div>
//           <ProductPreview key={products[i]._id} product={products[i]} />
//         </div>
//       );
//     productItems.push(divToAdd);
//   }
// }
