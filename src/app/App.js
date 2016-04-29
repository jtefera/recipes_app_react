//Main component of the  recipeApp
// import is the new way of doing require('react')
//This will do with the creation of a new recipe
import React from 'react'
import ReactDOM from 'react-dom'
import AddRecipe from './components/AddRecipe'
import AllRecipes from './components/AllRecipes'
import SeeRecipe from './components/SeeRecipe'
/*
	App
		Menu Bar
			Add Recipe
				Page
				Pagination
			Recipes
			Search recipesss
*/
class MenuBar extends React.Component {
	changePage(e) {
		e.preventDefault();
		this.props.changePage(e.target.value);
	}
	render() {
		return (
			<div className="menuBar">
			<ul className = "nav nav-pills">
				 <li className = "active">
				 		<button
								className="btn navbar-btn btn-default"
								value="allrecipes"
								onClick={this.changePage.bind(this)}>
									Recipes
						</button>
					</li>
				 <li>
				 		<button
								className="btn navbar-btn btn-default"
								value="addrecipe"
								onClick={this.changePage.bind(this)}>
									Add Recipe
						</button>
					</li>
			</ul>
			</div>
		);
	}
}

class AppPage extends React.Component {
	render() {
		let page = this.props.page;
		switch (page) {
			case "allrecipes":
					return (
						<AllRecipes
							seeRecipe={this.props.seeRecipe}
							editRecipe={this.props.editRecipe}
							deleteRecipe={this.props.deleteRecipe}
							recipes={this.props.recipes}
							saveRecipe={this.props.saveRecipe}
						/>
					);
				break;
			case "addrecipe":
					return (
						<AddRecipe
							saveRecipe={this.props.saveRecipe}
						/>
					);
				break;
			case "editpage":
				return (
					<AddRecipe
						editRecipeMode={this.props.editRecipeMode}
						recipeFocused={this.props.recipeFocused}
						saveEditedRecipe={this.props.saveEditedRecipe}
						idRecipeFocused={this.props.idRecipeFocused}
					/>
				);
				break;
			case "seerecipe":
				return (
					<SeeRecipe
						recipe={this.props.recipeFocused}
					/>
				);
			break;
			default:
				return(
					<div> Where are we? </div>
				)
		}
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: "allrecipes",
			recipes: [],
			editRecipeMode: false,
			seeRecipeMode: false,
			recipeFocused: {},
			idRecipeFocused: null,
		};
	}
	loadRecipesFromServer(){
    $.ajax({
      url: '/json/recipe_library.json',
      dataType: 'json',
      success: ((data) => {
        this.setState({
          recipes: data
        });
      }).bind(this),
      error: (err) => {
        console.error(err);
      }
    });
  }
	componentDidMount() {
		this.loadRecipesFromServer();
	}
	seeRecipe(idRecipe) {
		let recipe = this.state.recipes[idRecipe];
		this.setState({
			seeRecipeMode: true,
			recipeFocused: recipe,
			idRecipeFocused: idRecipe,
			page: "seerecipe"
		});
	}
	deleteRecipe(idRecipe) {
    $.ajax({
      url: "/recipes/delete",
      method: "POST",
      data: {
        'idRecipe': idRecipe
      },
      success: ((err, data) => {
        if(err) {
          console.error(err);
        }
        this.loadRecipesFromServer();
      }).bind(this)
    })
  }
	changePage(page) {
		this.setState({
			page: page,
			editRecipeMode: false,
			seeRecipeMode: false,
			recipeFocused: {},
			idRecipeFocused: null,
		});
	}
	editRecipe(indexRecipe) {
		let recipe = this.state.recipes[indexRecipe];
		this.setState({
			editRecipeMode: true,
			recipeFocused: recipe,
			idRecipeFocused: indexRecipe,
			page: "editpage"
		});
	}
	saveEditedRecipe(idRecipe, recipe) {
		$.ajax({
			url: 'recipes/edit',
			method: 'POST',
			dataType: 'json',
			data: {
				'idRecipe': idRecipe,
				'recipe': recipe
			},
			success: ((data) => {
				console.log("Archivo Editado!");
				this.setState({
					page: "allrecipes",
					recipes: data,
					editRecipeMode: false,
					recipeFocused: {},
					idRecipeFocused: -1
				});
			}).bind(this)
		});
	}
	saveRecipe(recipe) {
		$.ajax({
			url: 'recipes/add',
			method: 'POST',
			dataType: 'json',
			data: recipe,
			success: ((data) => {
				console.log("Archivo Subido!");
				this.setState({
					page: "allrecipes",
					recipes: data,
					editRecipeMode: false,
					recipeFocused: {},
					idRecipeFocused: -1
				});
			}).bind(this)
		});
	}
	render() {
		return (
			<div>
				<MenuBar changePage={this.changePage.bind(this)}/>
				<AppPage
					page={this.state.page}
					seeRecipe={this.seeRecipe.bind(this)}
					editRecipe={this.editRecipe.bind(this)}
					deleteRecipe={this.deleteRecipe.bind(this)}
					recipes={this.state.recipes}
					editRecipeMode={this.state.editRecipeMode}
					recipeFocused={this.state.recipeFocused}
					idRecipeFocused={this.state.idRecipeFocused}
					saveEditedRecipe={this.saveEditedRecipe.bind(this)}
					saveRecipe={this.saveRecipe.bind(this)}
				/>
			</div>
		);
	}
}

ReactDOM.render(
	<App/>,
	document.getElementById('app')
);

export default App
