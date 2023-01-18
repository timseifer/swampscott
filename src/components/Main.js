import React, { Component, ScrollView} from 'react';
import './App.css';
import Entry from './Entry'
import './typewriter.css'
import Sentiment from 'sentiment';
import Classifier from 'ml-classify-text';


class Main extends Component {
  posRef = React.createRef();
  negRef = React.createRef();
  neutRef = React.createRef();
  affordHouse = React.createRef();


  componentDidMount() {
    this.appendNegative();
    this.appendPositive();
    this.appendNeutral();
    this.appendHousing();
  }

  classifyText(text) {
    var sentiment = new Sentiment();
    var result = sentiment.analyze(text.toString());
    var result_housing = this.notEnoughAffordableHousing(text.toString())
    // console.log(text.toString())
    console.log(result_housing)
    if(result_housing == 1){
      // console.log("here")
      return 1
    }else{
    if (result.score > 0) {
      return 'positive';
    } else if (result.score < 0) {
      return 'negative';
    } else if (result.tokens[0] != '[object'){
      //console.log(result.tokens[0])
      return 'neutral';
    }
    else{
      return 'no classification'
    }
  }
  }

  appendPositive(){

    const element1 = this.posRef.current;
    this.props.products.map((product, key) => {
        if(this.classifyText(product.name) == 'positive'){
        element1.innerHTML += product.name +" "
        element1.innerHTML += "<br />"
        }
    })
  }

  appendNegative(){
    const element2 = this.negRef.current;
    this.props.products.map((product, key) => {
      if(this.classifyText(product.name) == 'negative'){
      element2.innerHTML += product.name + " <br />";
      }
  })
  }

  appendNeutral(){
    const element3 = this.neutRef.current;
    this.props.products.map((product, key) => {
      if(this.classifyText(product.name) == 'neutral'){
      element3.innerHTML += product.name + " <br />";
      }
  })
  }

  appendHousing(){
    const element4 = this.affordHouse.current;
    this.props.products.map((product, key) => {
      if(this.classifyText(product.name) == 1){
        console.log("here")
      element4.innerHTML += product.name + " <br />";
      }
  })
  }

  notEnoughAffordableHousing(text){
    const classifier = new Classifier({nGramMin: 1,
      nGramMax: 1})
    let afforable_pos = [
      "Increasing the supply of affordable housing can help address rising housing costs and make it easier for low-income families to find a place to live.",
      "Reducing regulations on housing development can make it easier and less expensive to build new housing, which can increase the overall supply of housing and help bring down prices.",
      "Creating more affordable housing can help reduce homelessness and improve the lives of people who are struggling to afford a place to live.",
      "By decreasing regulations on housing development, we can encourage more builders to enter the market and create more competition, which can lead to lower prices for buyers.",
      "Providing more affordable housing options can help stimulate economic growth by allowing more people to afford to live in an area, which can increase demand for local goods and services.",
      "Relaxing regulations on housing development can help create jobs in the construction industry and boost the local economy.",
      "Affordable housing can help improve the overall quality of life for residents by giving them access to safe, stable housing at a price they can afford.",
      "Decreasing regulations on housing development can help reduce the burden on developers and make it easier for them to build new housing, which can increase the overall supply of housing and help bring down prices.",
      "you can't buy a house here",
      "why are all the houses so unafforable",
      "we need more houses that poorer individuals can buy",
      "I can't afford swampscott",
      "I cannot afford swampscott",
      "I can't afford it here",
      "I cannot afford it here",
      "the houses are so expensive",
      "I'm going to be broke",
      "they need more affordable places",
      "I love afforable housing",
      "affordable housing is better"

  ]
   
  let afforable_neg = [
    "Some people may be concerned that adding more affordable housing to an area could lead to overcrowding or a decrease in property values.",
    "Reducing regulations on housing development could lead to lower construction standards or create a risk of building unsafe or unhealthy housing.",
    "There may be concerns that decreasing regulations on housing development could lead to overdevelopment or an increase in traffic and congestion in an area.",
    "Some people may be opposed to the idea of adding more affordable housing because they believe it could lead to a change in the character of their neighborhood.",
    "There may be concerns that decreasing regulations on housing development could make it easier for developers to build in areas that are environmentally sensitive or prone to natural disasters.",
    "There may be opposition to adding more affordable housing due to concerns about the impact on local schools, infrastructure, or other community resources.",
    "Some people may be opposed to the idea of decreasing regulations on housing development because they believe it could lead to a decrease in quality of life or a loss of community character.",
    "There may be concerns that adding more affordable housing could lead to a strain on local government resources, such as police and fire services.",
    "we don't want loud college students living here",
    "low income people bring crime into our neighborhood",
    "affordable housing is bad",
    "we don't want low income people living here",
    "I hate affordable housing",
  ]

   
  classifier.train(afforable_pos, 'afforable-pos')
  classifier.train(afforable_neg, 'afforable-neg')

  let predictions = classifier.predict(text)
  console.log(text)
  if (predictions.length) {
    predictions.forEach(prediction => {
      console.log(`${prediction.label} (${prediction.confidence})`)
    })
  } else {
    console.log('No predictions returned')
  }

    if (predictions.length) {
      return 1
  } else {
      return 0
  }
  }

  render() {
    return (

<div id="content" className="content">
        <h1 >What do you think are the major housing-related issues, challenges, or problems in Swampscott? </h1>
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
        <h2>Why Care? How Does it Work?</h2>
        <div>
            Your response is processed for its overall sentiment, either positive or negative, and then matched to various categories of discussion. Responses here could be used to help your
            community legislators make decisions.
        </div>
        <h2>All Sentences</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sentence</th>
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
          Sentence Classification
        </h2>
        <h3>
            Positive Positions
        </h3>
          <div ref={this.posRef}></div>
        <h3>
           Negative Positions
        </h3>
          <div ref={this.negRef}></div>
          <h3>
           Neutral Positions
        </h3>
          <div ref={this.neutRef}></div>
          <h3>
            Affordability Discussion
          </h3>
          <div ref={this.affordHouse}></div>
          <h3>
            Community Diversity
          </h3>
          <h3>
            Permit Application
          </h3>
          <h3>
            Taxes: Monetary Upsides & Downsides
          </h3>
      </div>
    );
  }
}

export default Main;
