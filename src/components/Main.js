import React, { Component } from 'react';
import './App.css';
import Entry from './Entry'
import './typewriter.css'

class Main extends Component {

  render() {
    return (
<div id="content" className="content">
        <h1 className='typewriter'>Add a Sentence</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.productName.value
          const price = window.web3.utils.toWei("0.000005", 'Ether')
          var my_val = [1, 2, 3, 4, 5]
          this.props.createProduct(name, price, 0, my_val)
          console.log(this.props)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Sentence"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Sentence</button>
        </form>
        <p>&nbsp;</p>
        <h2>How it Works</h2>
        <div>
          Every sentence is given a base price.
          Once a sentence, reaches 5 upvotes the word can no longer be purchased.
          The people who bought the sentence are listed as contributors to the story. Once
          the story reaches 10 sentences it is minted as its own contract available for purchase.
          The contributors are then sent an equal proportion of the sale of the story.
        </div>
        <h2>Buy Sentence</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sentence</th>
              <th scope="col">Price</th>
              <th scope="col">Upvotes</th>
              <th scope="col">Owner</th>
              <th scope="col">Contributors</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            { this.props.products.map((product, key) => {
              return(
                !product.purchased ? <Entry key={key} product={product} purchaseProduct ={this.props.purchaseProduct} getArr ={this.props.getArr}/> : null
              )
            })}
          </tbody>
        </table>
        <h2>
          The Story
        </h2>
        { 
        this.props.products.map((product, key) => {
              return(
                (product.upvotes >= 2) ?
                <div key={key}>
                    { product.purchased
                      ? <div  ref="setter" className="sentence" dangerouslySetInnerHTML={{ __html: product.name}}></div>
                      : null
                    }
                </div>
                : null
              )
            })}
            <br>
            </br>
          <h2>
            Vote to End
          </h2>
          <button
			   onClick={(event) => {
				 this.props.voteEnd()
			   }}>
			   Vote to End
			 </button>
       <div dangerouslySetInnerHTML={{ __html: this.props.votez}}></div>

       <h2>
          Past Stories
        </h2>

       <div  ref="setter" className="sentence" dangerouslySetInnerHTML={{ __html: this.props.historicalProducts}}></div>
      </div>
    );
  }
}

export default Main;
