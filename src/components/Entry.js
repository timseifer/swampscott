import React, { Component } from 'react';
import './App.css'

class Entry extends Component {

  render() {	
    return (
	((this.props.product.upvotes <= 2) ?
		<tr key={this.props.key}>
	   { !this.props.product.purchased
		   ?
	   <td>{this.props.product.name}</td> : null}
		<td dangerouslySetInnerHTML={{ __html: this.props.getArr(this.props.getArr(this.props.product.id))}}></td>
	 </tr> : null)
    );
  }
}

export default Entry;
