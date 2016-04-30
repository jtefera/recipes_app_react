var fs = require("fs");
function upperCaseFirstLetter(phrase) {
  return phrase.split(" ") //["esto", "es", "una", "prueba"]
                .map(function(word){
                  return word.substring(0, 1).toUpperCase() + word.substring(1);
                }).join(" ").trim();

}
var paths = {
  ethnic: './EthnicRecipes.xml',
  ethnicjs: './EthnicRecipes.json',
  filtered: './EthnicRecipesFiltered.json'
}

fs.readFile(paths.ethnicjs, function(err, datajsstr) {
  if(err){
    console.error(err);
  }
  var datajs = JSON.parse(datajsstr);
  var correctData = datajs.filter(function(recipe){
    return recipe.memo[0].split("COOK TIME:")[1]
              && recipe.memo[0].split("YIELDS:")[1];
  })
  var filtered = correctData.map(function(recipe){
    var description = recipe.memo[0];
    return {
      basicInfo: {
        name: upperCaseFirstLetter(recipe.$.description.split(",")[1]).trim(),
        difficulty: 3,
        duration: description.split("COOK TIME:")[1].split("\r\n")[0].trim() || null,
        numPlates: description.split("YIELDS:")[1].split(" Servings")[0].trim() || 4
      },
      ingredients: recipe.RecipeItem.map(function(ingredient) {
        return {
          name: ingredient.$.ItemName.trim(),
          quantity: ingredient.$.ItemQuantity
        }
      }),
      steps: recipe.memo[0]
             .substring(description.indexOf("STEP"))
             .split(".\r\n\r\nCopyright")[0]
             .split("STEP ")
             .slice(1)
             .map(function(step){
                return {
                  text: (step.indexOf("\r\n\r\n") !== -1)
                        ? step.substring(3, step.length - "\r\n\r\n".length).trim()
                        : step.substring(3).trim()
                }
              })
    }
  });

  fs.writeFile(paths.filtered, JSON.stringify(filtered, null, 2), function(err) {
    if(err) {
      console.log(err);
    }
    console.log("Convertido!");
  })
})
