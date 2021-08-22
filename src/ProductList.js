import React from 'react';
import axios from 'axios';
import './ProductList.css';
import Products from './Components/Products/Products';
class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }
  componentDidMount() {
    // axios.get('https://best-read.herokuapp.com/api/items').then((res)=>{
    axios
      .get('http://localhost:4000/api/items')
      .then((res) => {
        this.setState({ products: res.data });
        // console.log(this.state.products)
        // for(const ele of this.state.products){
        // console.log('products are',this.state.products)
        // }
      })
      .catch((err) => {
        console.log('error occurred', err);
      });
  }

  render() {
    // console.log(this.state.products)
    // this.fetchProducts()
    return <Products products={this.state.products} />;
    // return (<Products products={this.state.products} />)
  }
}
export default ProductList;
