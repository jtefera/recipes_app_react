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
        <tr key={index}>
          <td>
            {recipe.basicInfo.name}
          </td>
          <td>
            <RecipeBtns
              idRecipe={index}
              seeRecipe={this.props.seeRecipe}
              deleteRecipe={this.props.deleteRecipe}
              editRecipe={this.props.editRecipe}
            />
          </td>
        </tr>
      );
    });
    return (
      <table>
        <tbody>
          {recipesNames}
        </tbody>
      </table>
    );
  }
}

class RecipeListBtn extends React.Component {
  constructor(props) {
    super(props);
  }
  changeRecipePage() {
    this.props.changeRecipeListPage(this.props.pageNum)
  }
  render() {

    return (
      <button
        className={this.props.btnOfActualPage?
          "btn btn-default active"
          :"btn btn-default"
        }
        onClick={this.changeRecipePage.bind(this)}
      >
          {this.props.pageNum }
      </button>
    )
  }
}

class AllRecipesPagination extends React.Component {
  render() {
    let numPages = Math.ceil(this.props.numTotalRecipes/this.props.numRecipesPerPage);
    let recipeListPagesBtns = [... Array(numPages)].map((val, idx) => {
      return (
        <RecipeListBtn
          key={idx}
          pageNum={idx}
          btnOfActualPage={this.props.recipeListPage === idx}
          changeRecipeListPage={this.props.changeRecipeListPage}/>
      );
    });
    return (
      <div className="btn-group">
        {recipeListPagesBtns}
      </div>
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
        <hr />
        <AllRecipesPagination
          recipeListPage={this.props.recipeListPage}
          numRecipesPerPage={this.props.numRecipesPerPage}
          numTotalRecipes={this.props.numTotalRecipes}
          changeRecipeListPage={this.props.changeRecipeListPage}
        />
      </div>
    );
  }

}

export default AllRecipes
