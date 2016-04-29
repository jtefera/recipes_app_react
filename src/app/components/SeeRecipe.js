import React from 'react'
import ReactDOM from 'react-dom'
import AllRecipeInfo from './add-recipe-components/all-recipe-info'


export default class SeeRecipe extends React.Component {

  render() {
    return (
      <div>
        <AllRecipeInfo recipe={this.props.recipe} />
      </div>
    );
  }
}
