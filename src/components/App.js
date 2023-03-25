import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Marketplace from '../abis/Marketplace.json'
import Navbar from './Navbar'
import Main from './Main'
import './Loading.scss'
import { expect } from 'chai';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3)
      await window.web3.enable()
    }
    else {
      window.web3 = new Web3(window.ethereum)
      window.location.reload();
      // window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = new Web3(window.ethereum)
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Marketplace.networks[networkId]
    if(networkData) {
      // console.log(networkData)
      const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address.toString().toLowerCase())
      // console.log(marketplace)
      this.setState({ marketplace })
      const productCount = await marketplace.methods.productCount().call()
      this.setState({ productCount })
      const vote_end = await marketplace.methods.getCurrentVote().call()
      this.setState({vote_end})
      // const historyProdCount = await marketplace.methods.historyProdCount().call()
      // this.setState({ historyProdCount })
      // const products_historical = await marketplace.methods.products_historical().call()
      // this.setState({products_historical })
      // Load products
      try{
      for (var i = 1; i <= productCount; i++) {
        console.log(i)
        const product = await marketplace.methods.products(i).call()
        this.setState({
          products: [...this.state.products, product]
        })
      }
    }catch{
      window.alert('Problems Encountered With Network, refresh the page')
    }
      this.setState({ loading: false})
    } else {
      window.alert('Marketplace contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      historyProdCount: 0,
      products_historical: '',
      vote_end: 0,
      loading: true
    }

    this.createProduct = this.createProduct.bind(this)
    this.purchaseProduct = this.purchaseProduct.bind(this)
    this.getArr = this.getArr.bind(this)
    this.createVoteEnd = this.createVoteEnd.bind(this)
    this.getCurrentVote = this.getCurrentVote.bind(this)
    this.createSolution = this.createSolution.bind(this)
  }

  createProduct(name, price, upvotes, contributors, isSol) {
    this.setState({ loading: true })
    this.state.marketplace.methods.createProduct(name, price, upvotes, contributors, isSol).send({ from: this.state.account })
    .once('transactionHash', (transactionHash) => {
      this.setState({ loading: false })
    })
  }

  createSolution(name, price, upvotes, contributors, isSol) {
    this.setState({ loading: true })
    this.state.marketplace.methods.createSolution(name, price, upvotes, contributors, isSol).send({ from: this.state.account })
    .once('transactionHash', (transactionHash) => {
      this.setState({ loading: false })
    })
  }

  purchaseProduct(id, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.purchaseProduct(id, price).send({ from: this.state.account})
    .once('transactionHash', (transactionHash) => {
      this.setState({ loading: false })
    })
  }


  createVoteEnd() {
    this.setState({ loading: true })
    this.state.marketplace.methods.createVoteEnd().send({ from: this.state.account })
    .once('transactionHash', (transactionHash) => {
    this.setState({ loading: false })
    })
    console.log(this.state.marketplace.methods.getCurrentVote())
    //document.getElementById('vote').innerHTML = ""+this.marketplace.vote_end() + ""
  }

  getArr(id) {
    this.state.marketplace.methods.getArr(id)
  }

  increaseVotes(){
    this.vote_end = this.createVoteEnd(this.vote_end)
    this.setState({ loading: false })
  }

  getCurrentVote(){
    return this.state.marketplace.methods.getCurrentVote()
  }



  render() {
    return (
      <div className='all_encomp'>
        <link href='https://fonts.googleapis.com/css?family=Cabin+Condensed:700' rel='stylesheet' type='text/css'></link>
        <div id="particles-js">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.loading
                ? <div className="body_loading"><div id="container">
                <p className="loading-text" aria-label="Loading">
                  <span className="letter" aria-hidden="true">L</span>
                  <span className="letter" aria-hidden="true">o</span>
                  <span className="letter" aria-hidden="true">a</span>
                  <span className="letter" aria-hidden="true">d</span>
                  <span className="letter" aria-hidden="true">i</span>
                  <span className="letter" aria-hidden="true">n</span>
                  <span className="letter" aria-hidden="true">g</span>
                </p>
              </div>
              </div>
                : <Main
                  products={this.state.products}
                  // historicalProducts={this.state.products_historical}
                  votez = {this.state.vote_end}
                  createProduct={this.createProduct}
                  createSolution={this.createSolution}
                  purchaseProduct={this.purchaseProduct}
                  getArr={this.getArr} 
                  voteEnd={this.createVoteEnd}
                  increase={this.increaseVotes}
                  getVote={this.getCurrentVote}/>
              }
            </main>
            </div>
      </div>
    );
  }
}

export default App;