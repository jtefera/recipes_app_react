//Main component of the  recipeApp
// import is the new way of doing require('react')
//This will do with the creation of a new recipe
import React from 'react'
import ReactDOM from 'react-dom'
import AddRecipe from './components/AddRecipe'
import EditRecipe from './components/EditRecipe'
import AllRecipes from './components/AllRecipes'
import SeeRecipe from './components/SeeRecipe'
import SearchPage from './components/SearchPage'
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
	//Not being used.
	//Second version of menubar
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
						<li>
							 <button
									 className="btn navbar-btn btn-default"
									 value="searchpage"
									 onClick={this.changePage.bind(this)}>
										 Search
							 </button>
						 </li>
				</ul>
			</div>
		);
	}
}

class NewMenuBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: ""
		}
	}
	searchRecipes(e){
		this.setState({
			inputValue: e.target.value
		})
		this.props.searchRecipes(e.target.value);
	}
	addRecipe(e) {
		e.preventDefault();
		this.props.changePage("addrecipe");
	}
	render() {
		return (
			<div className="newmenubar">
				<input className="input-lg"
							 type="text"
							 placeholder="search"
							 onChange={this.searchRecipes.bind(this)}
							 value={this.state.inputValue}
				/><br />
				<a 	href="#"
						onClick={this.addRecipe.bind(this)}
				>
					Add recipe
				</a>
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
							recipeListPage={this.props.recipeListPage}
							numRecipesPerPage={this.props.numRecipesPerPage}
							numTotalRecipes={this.props.numTotalRecipes}
							changeRecipeListPage={this.props.changeRecipeListPage}
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
					<EditRecipe
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
			case "searchpage":
				return (
					<SearchPage
						seeRecipe={this.props.seeRecipe}
						editRecipe={this.props.editRecipe}
						deleteRecipe={this.props.deleteRecipe}
						recipes={this.props.recipes}
						saveRecipe={this.props.saveRecipe}
						recipeListPage={this.props.recipeListPage}
						numRecipesPerPage={this.props.numRecipesPerPage}
						numTotalRecipes={this.props.numTotalRecipes}
						changeRecipeListPage={this.props.changeRecipeListPage}
						searchRecipes={this.props.searchRecipes}
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
			recipeListPage: 0,
			numRecipesPerPage: 10,
			numTotalRecipes: 10,
			query: ""
		};
	}
	loadRecipesFromServer(pageNum, searchQuery){
		let page = (pageNum !== undefined)
								? pageNum
								:this.state.recipeListPage,

		 		startingRecipe = page*this.state.numRecipesPerPage,
				numRecipes = this.state.numRecipesPerPage,
				query = searchQuery || this.state.query;
				console.log("loading ", query);
    $.ajax({
      url: './search',
      dataType: 'json',
			data: {
				startingRecipe: startingRecipe,
				numRecipes: numRecipes,
				query: query
			},
      success: ((data) => {
				//console.log(data);
        this.setState({
          recipes: data.recipes,
					numTotalRecipes: data.numTotalRecipes,
					page: "allrecipes"
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
      url: "./delete",
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
		/*this.loadRecipesFromServer(0);
		this.setState({
			page: page,
			editRecipeMode: false,
			seeRecipeMode: false,
			recipeFocused: {},
			idRecipeFocused: null,
			recipeListPage: 0
		});*/
		this.setState({
			page: page
		})
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
			url: './edit',
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
			url: './add',
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
	changeRecipeListPage(page) {
		this.loadRecipesFromServer(page);
		this.setState({
			recipeListPage: page
		});
	}
	searchRecipes(query) {
		console.log("searchig ", query);
		this.setState({
			page: "allrecipes",
			editRecipeMode: false,
			seeRecipeMode: false,
			recipeFocused: {},
			idRecipeFocused: null,
			recipeListPage: 0,
			'query': query
		});
		this.loadRecipesFromServer(0, query);
		/*$.ajax({
      url: '/recipes/search',
      dataType: 'json',
			data: {
				'query': query
			},
      success: ((data) => {
				console.log(data)
        this.setState({
          recipes: data,
					numTotalRecipes: data.length,
					page: "allrecipes",
					startingRecipe: startingRecipe,
					numRecipes: numRecipes
        });
      }).bind(this),
      error: (err) => {
        console.error(err);
      }
    });*/
	}
	render() {
		return (
			<div>
				<div className="panel-head">
					<NewMenuBar
						changePage={this.changePage.bind(this)}
						searchRecipes={this.searchRecipes.bind(this)}
					/>
				</div>
				<div className="panel-bode">
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
						recipeListPage={this.state.recipeListPage}
						numRecipesPerPage={this.state.numRecipesPerPage}
						numTotalRecipes={this.state.numTotalRecipes}
						changeRecipeListPage={this.changeRecipeListPage.bind(this)}
						searchRecipes={this.searchRecipes.bind(this)}
					/>
			</div>
			</div>
		);
	}
}

ReactDOM.render(
	<App/>,
	document.getElementById('app')
);

export default App
