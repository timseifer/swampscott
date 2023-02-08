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
  difficultProcess = React.createRef();
  diveristy = React.createRef();
  taxes = React.createRef();
  quality = React.createRef();
  same = React.createRef();
  aduSpecial = React.createRef();
  aduRight = React.createRef();
  aduNoPerm = React.createRef();
  affordable = React.createRef();
  coll = React.createRef()


  componentDidMount() {
    // this.appendNegative();
    // this.appendPositive();
    // this.appendNeutral();
    this.appendHousing();
    this.appendDiff();
    this.appendDiversity();
    this.appendTaxes();
    this.appendQuality();
    this.appendSame();
    this.appendAduSpecial();
    this.appendRight();
    this.appendAfford();
  }

  classifyText(text, isSol) {
    var sentiment = new Sentiment();
    var result = sentiment.analyze(text.toString());
    var result_housing = this.notEnoughAffordableHousing(text.toString())
    // console.log(text.toString())
    if(!isSol){
    if(this.diffProcess(text) == 1){
      return 'difficult';
    }
    if(this.noDiversity(text) == 1){
      return 'diversity';
    }
    if(this.taxesSuck(text) == 1){
      return 'taxes';
    }
    if(this.qualityWorse(text) == 1){
      return 'quality';
    }
    if(this.affordDiscuss(text) == 1){
      return 'afford-sol';
    }
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
  }else{
    if(this.sameSolution(text) == 1){
      return 'same';
    }
    if(this.permitIntervention(text) == 1){
      return 'permit';
    }
    if(this.byRight(text) == 1){
      return 'right';
    }
    if(this.affordableHousing(text) == 1){
      return 'afford';
    }
    return 'no classification';
  }
  }

  appendPositive(){

    const element1 = this.posRef.current;
    this.props.products.map((product, key) => {
        if(this.classifyText(product.name, product.isSol) == 'positive'){
        element1.innerHTML += product.name +" "
        element1.innerHTML += "#votes: " + product.upvotes + " "
        element1.innerHTML += "<br />"
        }
    })
  }

  appendNegative(){
    const element2 = this.negRef.current;
    this.props.products.map((product, key) => {
      if(this.classifyText(product.name, product.isSol) == 'negative'){
      element2.innerHTML += product.name + " <br />";
      }
  })
  }

  appendNeutral(){
    const element3 = this.neutRef.current;
    this.props.products.map((product, key) => {
      if(this.classifyText(product.name, product.isSol) == 'neutral'){
      // if(!(element3.innerHTML.indexOf(product.name) >= 0)){
      element3.innerHTML = product.name + " " +  " #votes: " + product.upvotes + " <br />";
      // }
      }
  })
  }

  appendHousing(){
    const element4 = this.affordHouse.current;
    this.props.products.map((product, key) => {
      if(this.classifyText(product.name, product.isSol) == 1 || this.classifyText(product.name, product.isSol) == 'afford-sol'){
        // if(!(element4.innerHTML.indexOf(product.name) >= 0)){
      element4.innerHTML = product.name + " #votes: " + product.upvotes + " <br />";
        // }
      }
  })
  }

  appendDiff(){
    const element4 = this.difficultProcess.current;
    this.props.products.map((product, key) => {
      if(this.classifyText(product.name, product.isSol) == 'difficult'){
        // if(!(element4.innerHTML.indexOf(product.name) >= 0)){
      element4.innerHTML = product.name + " " + " #votes: " + product.upvotes + " <br />";
        // }
      }
  })
  }

  appendDiversity(){
    const element4 = this.diveristy.current;
    this.props.products.map((product, key) => {
      if(this.classifyText(product.name, product.isSol) == 'diversity'){
        // if(!(element4.innerHTML.indexOf(product.name) >= 0)){
      element4.innerHTML = product.name + " " + " #votes: " + product.upvotes + " <br />";
        // }
      }
  })
  }
  
  appendTaxes(){
    const element4 = this.taxes.current;
    this.props.products.map((product, key) => {
      if(this.classifyText(product.name, product.isSol) == 'taxes'){
        // if(!(element4.innerHTML.indexOf(product.name) >= 0)){
      element4.innerHTML = product.name + " " + " #votes: " + product.upvotes + " <br />";
        // }
      }
  })
  }

  appendQuality(){
    const element4 = this.quality.current;
    this.props.products.map((product, key) => {
      if(this.classifyText(product.name, product.isSol) == 'quality'){
      // if(!(element4.innerHTML.indexOf(product.name) >= 0)){
      element4.innerHTML = product.name + " " + " #votes: " + product.upvotes + " <br />";
      // }
      }
  })
  }

  appendSame(){
    const element4 = this.same.current;
    this.props.products.map((product, key) => {
      if(this.classifyText(product.name, product.isSol) == 'same'){
      // if(!(element4.innerHTML.indexOf(product.name) >= 0)){
      element4.innerHTML = product.name + " " + " #votes: " + product.upvotes + " <br />";
      // }
      }
  })
  }

  appendAduSpecial(){
    const element4 = this.aduSpecial.current;
    this.props.products.map((product, key) => {
      if(this.classifyText(product.name, product.isSol) == 'permit'){
        //if(!(element4.innerHTML.indexOf(product.name) >= 0)){
      element4.innerHTML = product.name + " "+ " #votes: " + product.upvotes + " <br />";
        //}
      }
  })
  }
  appendRight(){
    const element4 = this.aduRight.current;
    this.props.products.map((product, key) => {
    if(this.classifyText(product.name, product.isSol) == 'right'){
      // if(!(element4.innerHTML.indexOf(product.name) >= 0)){
      element4.innerHTML += product.name + " " + " #votes: " + product.upvotes + " <br />";
      // }
      }
  })
  }

  appendAfford(){
    const element4 = this.affordable.current;
    this.props.products.map((product, key) => {
    if(this.classifyText(product.name, product.isSol) == 'afford'){
      // if(!(element4.innerHTML.indexOf(product.name) >= 0)){
      element4.innerHTML = product.name + " "+ " #votes: " + product.upvotes + " <br />";
      // }
      }
  })
  }
  //aduspecial
  permitIntervention(text){
    if (text.indexOf('need permission') >= 0) { 
      return 1;
    } else if (text.indexOf('special permit') >= 0 || (text.indexOf('permit') >= 0) || (text.indexOf('government') >= 0) || (text.indexOf('regulation') >= 0) || (text.indexOf('permits') >= 0)){ 
      return 1;
    }else{
      return 0;
    }
  }
  //same
  sameSolution(text){
    if (text.indexOf('same') >= 0) { 
      return 1;
    } else if (text.indexOf('don\'t change') >= 0 || (text.indexOf('keep') >= 0) || (text.indexOf('no solution') >= 0) || (text.indexOf('don\'t') >= 0)){ 
      return 1;
    }else{
      return 0;
    }
  }

    //same
    byRight(text){
      if (text.indexOf('right') >= 0) { 
        return 1;
      } else if (text.indexOf('no permit') >= 0 || (text.indexOf('no government') >= 0)){ 
        return 1;
      }else{
        return 0;
      }
    }
  // Onerous process to go through permit application 
  // permit and fees

  diffProcess(text){
    if (text.indexOf('permit') >= 0) { 
      return 1;
    } else if (text.indexOf('fees') >= 0){ 
      return 1;
    }else{
      return 0;
    }
  }

  noDiversity(text){
    if (text.indexOf('Diverse') >= 0 || text.indexOf('diverse') >= 0) { 
      return 1;
    } else if (text.indexOf('diversity') >= 0 || text.indexOf('Diversity') >= 0 || text.indexOf('community') >= 0 || text.indexOf('inclusion') >= 0){ 
      return 1;
    }else{
      return 0;
    }
  }

  taxesSuck(text){
    if (text.indexOf('Taxes') >= 0 || text.indexOf('high taxes') >= 0) { 
      return 1;
    } else if (text.indexOf('tax') >= 0 || text.indexOf('schools') >= 0 || text.indexOf('education') >= 0){ 
      return 1;
    }else{
      return 0;
    }
  }

  qualityWorse(text){
    if (text.indexOf('Suburban') >= 0 || text.indexOf('lifestyle') >= 0) { 
      return 1;
    } else if (text.indexOf('neighborhood characteristics') >= 0 || text.indexOf('way of life') >= 0){ 
      return 1;
    }else{
      return 0;
    }
  }

  affordDiscuss(text){
    if (text.indexOf('Affordable housing') >= 0 || text.indexOf('affordability') >= 0) { 
      return 1;
    } else if (text.indexOf('expensive') >= 0 || text.indexOf('broke') >= 0 || text.indexOf('cheap') >= 0 || text.indexOf('inexpensive') >= 0){ 
      return 1;
    }else{
      return 0;
    }
  }

  affordableHousing(text){
    if (text.indexOf('affordable') >= 0 || text.indexOf('zoning') >= 0) { 
      return 1;
    } else if (text.indexOf('subsidized') >= 0 || text.indexOf('low income') >= 0 || text.indexOf('income') >= 0){ 
      return 1;
    }else{
      return 0;
    }
  }



  // affordability



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
      "affordable housing is better",
      "I really like swampscott, wish it was more affordable"

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
  // console.log(text)
  // if (predictions.length) {
  //   predictions.forEach(prediction => {
  //     console.log(`${prediction.label} (${prediction.confidence})`)
  //   })
  // } else {
  //   console.log('No predictions returned')
  // }

    if (predictions.length) {
      return 1
  } else {
      return 0
  }
  }

  render() {
    return (
<div id="content" className="content">
        {
        /* <form name="form1" onSubmit={(event) => {
          event.preventDefault()
          var name_two = this.productName_one.value
          var price_two = window.web3.utils.toWei("0.000005", 'Ether')
          var my_val_two = [1, 2, 3, 4, 5]
          this.props.createProduct(name_two, price_two, 0, my_val_two, false)
          // console.log(this.props)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productName_one"
              type="text"
              ref={(input_one) => { this.productName_one= input_one }}
              className="form-control"
              placeholder="Sentence"
              required />
          </div>
          <button type="submit" name="button_0" className="btn btn-primary">Add Sentence</button>
        </form> */}
        <p>&nbsp;</p>
        <h2>Why Care? How Does it Work?</h2>
        <div>
            This website is a web3 application, utilizing blockchain to facilitate dicussions surrounding accesory dwelling units in the town of Swampscott Massachusetts. Using metamask, people can pariticpate 
            in complex conversations, have their responses recorded on a ledger, and maintain their anonymity. 
        </div>
        <h2 >What do you think are the major housing-related issues, challenges, or problems in Swampscott?</h2>
        <h2>Answers</h2>
        <table className="table">
          <thead>
            <tr>
            <th scope="col">Sentence</th>
              <th scope="col">Upvote Fee</th>
              <th scope="col">Upvotes</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            { this.props.products.map((product, key) => {
              return(
                (!product.purchased && !product.isSol) ? <Entry key={key} product={product} purchaseProduct ={this.props.purchaseProduct} getArr ={this.props.getArr}/> : null
              )
            })}
          </tbody>
        </table>
        <h1 >What do you think? </h1>
        <form name="form1" onSubmit={(event) => {
          event.preventDefault()
          var name_two = this.productName_one.value
          var price_two = window.web3.utils.toWei("0.000005", 'Ether')
          var my_val_two = [1, 2, 3, 4, 5]
          this.props.createProduct(name_two, price_two, 0, my_val_two, false)
          // console.log(this.props)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productName_one"
              type="text"
              ref={(input_one) => { this.productName_one= input_one }}
              className="form-control"
              placeholder="Sentence"
              required />
          </div>
          <button type="submit" name="button_0" className="btn btn-primary">Add Sentence</button>
        </form>
        <h2>
          Sentence Classification
        </h2>
          <h3>
            Affordability Discussion
          </h3>
          <div ref={this.affordHouse}></div>
          <br>
          </br>
          <h3>
          Onerous Process To Go Through Permit Application 
          </h3>
          {/* add ID here for style */}
          {/* <div ref={this.difficultProcess} id=""></div> */}
          <div ref={this.difficultProcess}></div>
          <br>
          </br>
          <h3>
            Community Diversity
          </h3>
          <div ref={this.diveristy}></div>
          <br>
          </br>
          <h3>
          More Housing Or People Means More Schools And Higher Taxes
          </h3>
          <div ref={this.taxes}></div>
          <br>
          </br>
          <h3>
          I Moved Here Because Of The Suburban Quality, I Don’t Want The Town To Be Urban
          </h3>
          <br>
          </br>
          <br>
          </br>
          <div ref={this.quality}></div>
          <h1 >How do you think we should address or solve these housing issues in Swampscott?</h1>
        <form id="form2" onSubmit={(event_one) => {
          event_one.preventDefault()
          const name = this.productName.value
          const price = window.web3.utils.toWei("0.000005", 'Ether')
          var my_val = [1, 2, 3, 4, 5]
          this.props.createSolution(name, price, 0, my_val, true)
        }}>
          <div className="form-group mr-sm-3">
            <input
              id="productName"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Sentence"
              required />
          </div>
          <button type="submit" name="button_1" className="btn btn-primary">Add Sentence</button>
        </form>
        <p>&nbsp;</p>
        <h2>All Sentences</h2>
        <table className="table">
          <thead>
            <tr>
            <th scope="col">Sentence</th>
              <th scope="col">Upvote Fee</th>
              <th scope="col">Upvotes</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            { this.props.products.map((product, key) => {
              return(
                (!product.purchased && product.isSol) ? <Entry key={key} product={product} purchaseProduct ={this.props.purchaseProduct} getArr ={this.props.getArr}/> : null
              )
            })}
          </tbody>
        </table>
        <h2>
          Sentence Classification
        </h2>
        <h3>
          Remain The Same
        </h3>
        <div ref={this.same}></div>
        <br>
        </br>
          <h3>
          Allow ADUs Without Permit Or By Right
          </h3>
          <div ref={this.aduRight}></div>
          <br>
          </br>
          <h3>
          Allow detached ADUs By Special Permit
          </h3>
          <div ref={this.aduSpecial}></div>
          <br>
          </br>
          <h3>
            Change Zoning To Encourage Subsidized Affordable Housing
          </h3>
          <div ref={this.affordable}></div>
          <br>
          </br>
          <br>
          </br>
          </div>


    );
  }
}

export default Main;
