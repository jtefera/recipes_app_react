var fs = require("fs");
var parseString = require("xml2js").parseString;
var paths = {
  ethnic: './EthnicRecipes.xml',
  ethnicjs: './EthnicRecipes.json'
}
fs.readFile(paths.ethnic, function(err, dataxml) {
  if(err){
    console.error(err);
  }
  parseString(dataxml, function(err, datajs) {
    fs.writeFile(paths.ethnicjs, JSON.stringify(datajs.data.recipe, null, 2), function(err) {
      if(err) {
        console.log(err);
      }
      console.log("Convertido!");
    })
  });
})
