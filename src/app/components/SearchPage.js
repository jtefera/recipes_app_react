import React from 'react'
import ReactDOM from 'react-dom'

import AllRecipes from './AllRecipes'

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    }
  }
  inputText(e) {
    this.setState({
      value: e.target.value
    });
    this.props.searchRecipes(e.target.value);
  }
  submitOnEnter(e) {
    if(e.key == "Enter") {
      this.props.searchRecipes(e.target.value);
    }
  }

  render() {
    return(
      <input
          type="text"
          placeholder="search name"
          value={this.state.value}
          onChange={this.inputText.bind(this)}
          onKeyPress={this.submitOnEnter.bind(this)}
        />
    );
  }
}

export default class SearchPage extends React.Component {


  render() {
    return (
      <div>
        <SearchInput
          searchRecipes={this.props.searchRecipes}
        />
        <AllRecipes
          seeRecipe={this.props.seeRecipe}
          editRecipe={this.props.editRecipe}
          deleteRecipe={this.props.deleteRecipe}
          recipes={this.props.recipes}
          saveRecipe={this.props.saveRecipe}
          recipeListPage={this.props.recipeListPage}
          numRecipesPerPage={this.props.numRecipesPerPage}
          numTotalRecipes={this.props.numTotalRecipes}
          changeRecipeListPage={this.props.changeRecipeListPage}
        />
      </div>
    )
  }
}
