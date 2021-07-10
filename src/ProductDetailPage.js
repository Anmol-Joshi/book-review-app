/* eslint-disable no-useless-constructor */
import React from 'react';

class ProductDetailsPage extends React.Component {
  constructor(props){
    super(props);
    this.state.product={}
  }
  render(){
    return(
      <div>
      {console.log(this.props)}
      <div>{this.props.match.params.id}</div>
      </div>
    )
  }
}

export default ProductDetailsPage;