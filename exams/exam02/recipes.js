const users = {};
const recipeList = {};

recipeList[0] = {id: 0, title: "Double cook pork", author: "Jiali Yuan", 
            ingredients: "Pork, soy souce, onions", instruction: "Fry with oil"};
recipeList[1] = {id: 1, title: "Hot pot", author: "Pose", 
            ingredients: "Beef, lamb, eggs, lettuce, mushtoom", instruction: "Put all in boiled soup"};

module.exports = {
    users,
    recipeList,
};
