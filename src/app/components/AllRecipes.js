import React from 'react'
import ReactDOM from 'react-dom'

class RecipeBtns extends React.Component {
  seeRecipe(e) {
    e.preventDefault();
    let idRecipe = this.props.idRecipe;
    this.props.seeRecipe(idRecipe);
  }

  editRecipe(e) {
    e.preventDefault();
    let idRecipe = this.props.idRecipe;
    this.props.editRecipe(idRecipe);
  }

  deleteRecipe(e) {
    e.preventDefault();
    let idRecipe = this.props.idRecipe;
    this.props.deleteRecipe(idRecipe);
  }
  render() {
    return (
      <div className="btn-group">
        <button
          className="btn btn-default"
          onClick={this.seeRecipe.bind(this)}>See</button>
        <button
          className="btn btn-warning"
          onClick={this.editRecipe.bind(this)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={this.deleteRecipe.bind(this)}
        >
          X
        </button>
      </div>
    );
  }
}

class ListAllRecipes extends React.Component {
  render() {
    let recipesNames = this.props.recipes.map((recipe, index) => {
      return (
        <li key={index}>
          {recipe.basicInfo.name}
          <RecipeBtns
            idRecipe={index}
            seeRecipe={this.props.seeRecipe}
            deleteRecipe={this.props.deleteRecipe}
            editRecipe={this.props.editRecipe}
          />
        </li>
      );
    });
    return (
      <ul>
        {recipesNames}
      </ul>
    );
  }
}


class AllRecipes extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="AllRecipes">
        Let us start listing all recipes!
        <ListAllRecipes
            recipes={this.props.recipes}
            deleteRecipe={this.props.deleteRecipe}
            editRecipe={this.props.editRecipe}
            seeRecipe={this.props.seeRecipe}
        />
      </div>
    );
  }

}

export default AllRecipes
