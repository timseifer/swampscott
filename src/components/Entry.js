import React, { Component } from 'react';
import './App.css'

class Entry extends Component {

  render() {
	console.log(this.props.getArr('0x5EfA5CFeee4F8AF6Ffd109875c58329B042C3Bea'))
    return (
	((this.props.product.upvotes <= 2) ?
		<tr key={this.props.key}>
	   { !this.props.product.purchased
		   ?
	   <td>{this.props.product.name}</td> : null}
	   { !this.props.product.purchased
		   ?
	   <td>{window.web3.utils.fromWei(this.props.product.price.toString(), 'Ether')} Eth</td> : null}
	   { !this.props.product.purchased
		   ?
	   <td>{this.props.product.upvotes.toString()}</td>: null}
	   { !this.props.product.purchased
		   ?
	   <td>{this.props.product.owner}</td>: null}
		<td dangerouslySetInnerHTML={{ __html: this.props.getArr(this.props.getArr(this.props.product.id))}}></td>
	   <td>
		 { !this.props.product.purchased
		   ? <button
			   name={this.props.product.id}
			   value={this.props.product.price}
			   onClick={(event) => {
				 this.props.purchaseProduct(event.target.name, event.target.value)
			   }}
			 >
			   Buy
			 </button>
		   : null
		 }
		 </td>
	 </tr> : null)
    );
  }
}

export default Entry;
