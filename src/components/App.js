import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => {
    this.setState({filters: {
      type: event.target.value
    }})
  }

  findPets = () => {
    let url
    if (this.state.filters.type === 'all') {
      url = "/api/pets"
    } else if (this.state.filters.type === 'cat') {
      url = "/api/pets?type=cat"
    } else if (this.state.filters.type === 'dog') {
      url = "/api/pets?type=dog"
    } else if (this.state.filters.type === 'micropig') {
      url = "/api/pets?type=micropig"
    }
    fetch(url)
      .then(resp => resp.json())
      .then((json) => {
        this.setState({pets: json})
      })
  }

  adoptPet = (id) => {
    let adoptedPetIndex = this.state.pets.findIndex(pet => pet.id === id)
    let newPetsState = this.state.pets
    newPetsState[adoptedPetIndex].isAdopted = true 
    this.setState({pets: newPetsState})
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.findPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
