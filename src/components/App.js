import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import KittyCat from '../abis/KittyCat.json'
import audio from '../meow.mp3';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
      totalSupply: 0,
      kitties: []
    }
  }

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
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()

    const networkData = KittyCat.networks[networkId]
    if(networkData) {
      const abi = KittyCat.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      this.setState({ contract })
      const totalSupply = await contract.methods.totalSupply().call()
      this.setState({ totalSupply })
    
      for (var i = 1; i <= totalSupply; i++) {
        const kitty = await contract.methods.kitties(i - 1).call()
        this.setState({
          kitties: [...this.state.kitties, kitty]
        })
      }


    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  mint = (kitty) => {
    var s3String = `https://anterrisbucket.s3.amazonaws.com/${kitty}.json`;
    this.state.contract.methods.AdoptCat(kitty,s3String).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({
        kitties: [...this.state.kitties, kitty]
      })
    })
  }

  CatName = (theCatId)=>{ 

    this.state.contract.methods.GetCatName(theCatId).call({ from: this.state.account })
    .then(console.log)

  }

  playAudio = () => {
    new Audio(audio).play();
  }

 

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="https://anterris.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kitty Cat Tokens1
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="account">Account: {this.state.account}</span></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1>Adopt a Kitty</h1>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const kitty = this.kitty.value
                  this.mint(kitty)
                  fetch(`https://anterris.com/kittycatmeta.php?name=${kitty}`).then((res) => console.log(res));

                  
                }}>
                  <input
                    type='text'
                    className='form-control mb-1'
                    placeholder="Cat Name"
                    ref={(input) => { this.kitty = input }}
                  />
                  <input
                    type='submit'
                    className='btn btn-block btn-primary'
                    onClick={this.playAudio}
                    value='Adopt'
                  />
                </form>
              </div>
              <div className="content mr-auto ml-auto">
                <h1>Token Id</h1>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const theCatId = this.theCatId.value
                  this.CatName(theCatId)
  
                }}>
                  <input
                    type='text'
                    className='form-control mb-1'
                    placeholder="Token Id"
                    ref={(input) => { this.theCatId = input }}
                    
                  />
                  <input
                    type='submit'
                    className='btn btn-block btn-primary'
                    value='Get Cat Name'
                  />
                </form>
              </div>
            </main>
          </div>
          <hr/>
          <div className="row text-center">
            { this.state.kitties.map((kitty, key) => {
              return(
                <div key={key} className="col-md-3 mb-3">
                  <div className="token"></div>
                  <div>{kitty}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
