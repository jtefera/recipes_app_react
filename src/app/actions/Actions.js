import * as types from "../constants/ActionTypes"

//Here we will describe all the actions
export const addRecipe = (recipe) => {
  return {
    type: types.ADD_RECIPE,
    recipe: recipe,
  }
}

export const addIngredient = (ingredient, quantity) => {
  return {
    type: types.ADD_INGREDIENT,
    ingredient: ingredient,
  }
}


export const addStep = (step) => {
  return {
    type: types.ADD_STEP,
    step: step
  }
}

export const addBasicInfo = (name, difficulty, time, numPlates) => {
  return {
    type: types.ADD_BASIC_INFO,
    name,
    difficulty,
    time,
    numPlates
  }
}

export const editRecipe = (idRecipe) => {
  return {
    type: types.EDIT_RECIPE,
    idRecipe
  }
}

export const deleteRecipe = (idRecipe) => {
  return {
    type: types.DELETE_RECIPE,
    idRecipe
  }
}
