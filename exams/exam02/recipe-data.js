const users = {};
const recipeList = {};

recipeList[0] = {
    id: 0, title: "MULLIGATAWNY LENTILS", 
    author: "Jiali Yuan",
    ingredients: `1 Cup split Masoor dal (Red Lentils), 
                  1/2 ground turmeric, 
                  1-2 fresh hot green chilies , 
                  finely chopped (optional),
                  1 clove garlic, 
                  1.5 teaspoon salt , or to taste,
                  2 tablespoons olive oil,
                  1 teaspoon whole cumin seed,
                  1 dried hot red chili,
                  1/2 medium shallot/small sweet onion, peeled and cut into very fine slivers`,
    instruction: `1. Wash lentils thoroughly, place in a heavy botton sauce pan with 4 cups of water.
                  2. Stir in turmeric, green chilies, and garlic.
                  3. Put the oil in a small frying pan and set over medium high heat.
                  4. Add the contents of the pan over the dal. Cover with tight fitting lid to trap aromas.
                  Additionally, at step 1, you could add 3 tablespoons cooked rice, diced apple, cooked potato.`};
recipeList[1] = {
    id: 1,
    title: "GRILLED PEARS",
    author: "Jiali Yuan",
    ingredients: `
     Pears (1/2 a pear per person),Good Vanilla Ice Cream,Cinnamon,Olive, Canola, Grapeseed Oil or clarified butter`,
    instruction: `
                1. Pre-heat grill to medium high heat
                2. Cut pears in half and remove stem as well as seeds with a melon baller
                3. Oil pears very well to prevent sticking
                4. Place pears cut side down on the hot grill for 4-5 minutes
                5. Use a spatula to remove the pears
                6. Fill each pear with a scoop of ice cream
                7. Dust with cinnamon and serve immediately`};

module.exports = {
    users,
    recipeList,
};
