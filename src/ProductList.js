import React from 'react';
import axios from 'axios';
import './ProductList.css';
import Navbar from './Components/Navbar/Navabar';
import Products from './Components/Products/Products';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap');
</style>;
class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isLoaded: false,
    };
  }
  componentDidMount() {
    // axios.get('https://best-read.herokuapp.com/api/items').then((res)=>{
    axios
      // .get('http://localhost:4000/api/items')
      .get('/api/items/')
      .then((res) => {
        this.setState({ products: res.data });
        this.setState({ isLoaded: true });
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

    return (
      <div className="product-list-page-main-div">
        <Navbar />

        <Products products={this.state.products} />
        {this.state.isLoaded === false && (
          <div>
            <Loader
              className="loader"
              type="ThreeDots"
              color="#000000"
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
          </div>
        )}
      </div>
    );
    // return (<Products products={this.state.products} />)
  }
}
export default ProductList;
