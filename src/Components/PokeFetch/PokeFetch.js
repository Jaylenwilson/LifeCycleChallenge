import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      timer: 0,
      timerActive: false,
      pokemonActive: false,
      timerInterval: null

    }
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .catch((err) => console.log(err))
  }

  startTimer() {
    this.fetchPokemon()
    this.setState({
      timerActive: true,
      pokemonActive: false,
      timer: 10
    })
    this.setState({
      timerInterval: setInterval(() => {
        if (this.state.timer > 0) {
          this.setState({
            timer: this.state.timer - 1,
          })
        } else {
          this.setState({
            pokemonActive: true,
          })
          this.setState({
            timerActive: false,
          })
          clearInterval(this.state.timerInterval)
        }
      }, 1000)
    })
  }

  render() {
    return (
      <div className="allContainer">

        <div className="leftSideScreen">
          <div className="pokeSpriteContainer">
            <img className={this.state.pokemonActive ? 'pokeSpriteRevealed' : 'pokeSpriteHidden'} src={this.state.pokeSprite} alt="pokemon sprite" />
          </div>
          <div className="pokeNameContainer">
            <h1 className={this.state.pokemonActive ? 'pokeNameRevealed' : 'pokeNameHidden'}>{this.state.pokeName}</h1>
          </div>
        </div>


        <div className="ButtonTimerSwitcher">
          <div className="pokeButtonContainer">
            <button className={this.state.timerActive ? 'pokeButtonStyleOff' : 'pokeButtonStyleOn'} onClick={() => this.startTimer()}>Start</button>
          </div>
          <div className="timerContainer">
            <h1 className={this.state.timerActive ? 'timerVisible' : 'timerHidden'}>{this.state.timer}</h1>
          </div>
        </div>

      </div>
    )
  }
}

export default PokeFetch;