const pizzas = (req, res) => {
  res.send({
    pizzas: [
      {
        name: "Pepperoni Pizza",
        image_url:
          "https://img.freepik.com/free-photo/thinly-sliced-pepperoni-is-popular-pizza-topping-american-style-pizzerias-isolated-white-background-still-life_639032-229.jpg?w=740&t=st=1693737546~exp=1693738146~hmac=620ef31bdd954f13e53f99dab94bbf25249fb6dfcd4b5fb51e92edd507652c43",
        description:
          "Classic pepperoni pizza with tomato sauce, mozzarella cheese, and pepperoni slices.",
        price: "$10.99",
      },
      {
        name: "Margherita Pizza",
        image_url:
          "https://www.acouplecooks.com/wp-content/uploads/2022/10/Margherita-Pizza-093.jpg",
        description:
          "A simple and delicious pizza with tomato sauce, fresh mozzarella, basil, and olive oil.",
        price: "$9.99",
      },
      {
        name: "Vegetarian Pizza",
        image_url:
          "https://cdn.loveandlemons.com/wp-content/uploads/2023/02/vegetarian-pizza.jpg",
        description:
          "A veggie-packed pizza with bell peppers, onions, mushrooms, black olives, and mozzarella cheese.",
        price: "$11.99",
      },
      {
        name: "Supreme Pizza",
        image_url:
          "https://www.southernliving.com/thmb/UuflED14dkNrrm-TFbkz42Z5mRg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/sl_supremepizza_00072-2000-4cab71bd67774233b45f05e4e32fdfde.jpg",
        description:
          "Loaded with toppings including pepperoni, sausage, bell peppers, onions, mushrooms, and black olives.",
        price: "$12.99",
      },
      {
        name: "Hawaiian Pizza",
        image_url:
          "https://www.jessicagavin.com/wp-content/uploads/2020/07/hawaiian-pizza-16-1200.jpg",
        description:
          "A tropical delight with ham, pineapple, and mozzarella cheese.",
        price: "$11.49",
      },
      {
        name: "BBQ Chicken Pizza",
        image_url:
          "https://sallysbakingaddiction.com/wp-content/uploads/2014/03/Homemade-BBQ-Chicken-Pizza.jpg",
        description:
          "Tangy barbecue sauce, grilled chicken, red onions, and cilantro on a pizza.",
        price: "$13.49",
      },
      {
        name: "Mushroom Lovers Pizza",
        image_url:
          "https://www.tablefortwoblog.com/wp-content/uploads/2017/08/triple-mushroom-grilled-pizza-recipe-photos-tablefortwoblog-1.jpg",
        description:
          "For mushroom enthusiasts - loaded with various mushroom varieties and mozzarella cheese.",
        price: "$11.99",
      },
      {
        name: "Meat Lover's Pizza",
        image_url:
          "https://grandbaby-cakes.com/wp-content/uploads/2022/05/Meat-Lovers-Pizza-1.jpeg",
        description:
          "A carnivore's dream with pepperoni, sausage, bacon, and ground beef.",
        price: "$13.99",
      },
      {
        name: "Veggie Delight Pizza",
        image_url:
          "https://product-assets.faasos.io/production/product/image_1646385183543_Corn_Veggie_Delight_Pizza_11_Inch_.jpg?d=500",
        description:
          "A garden-fresh combination of tomatoes, bell peppers, onions, black olives, and more.",
        price: "$11.49",
      },
      {
        name: "Four Cheese Pizza",
        image_url:
          "https://ohsweetbasil.com/wp-content/uploads/four-cheese-margherita-pizza-recipe-12-scaled.jpg",
        description:
          "A cheesy masterpiece with a blend of mozzarella, cheddar, provolone, and parmesan cheeses.",
        price: "$12.99",
      },
      {
        name: "Pesto Veggie Pizza",
        image_url:
          "https://tastesbetterfromscratch.com/wp-content/uploads/2020/08/Veggie-Pizza-2.jpg",
        description:
          "A unique twist with pesto sauce, tomatoes, spinach, artichokes, and feta cheese.",
        price: "$12.49",
      },
      {
        name: "Buffalo Chicken Pizza",
        image_url:
          "https://easychickenrecipes.com/wp-content/uploads/2019/11/buffalo-chicken-pizza-4.jpg",
        description:
          "Spicy buffalo sauce, grilled chicken, red onions, and blue cheese crumbles.",
        price: "$13.49",
      },
      {
        name: "Classic Cheese Pizza",
        image_url:
          "https://samsgiantmanhattanpizzaca.com/wp-content/uploads/2019/04/cheese.jpg",
        description:
          "The timeless favorite with a generous layer of melted mozzarella cheese.",
        price: "$9.99",
      },
      {
        name: "Vegan Delight Pizza",
        image_url:
          "https://www.gortsa.com/cache/large/product/110942/asNA8c9KTethsFbuteCtH3URZXui87SqPSokEMCS.png",
        description:
          "A plant-based delight with vegan cheese, veggies, and a tomato base.",
        price: "$12.99",
      },
      {
        name: "Pineapple Jalapeño Pizza",
        image_url:
          "https://sweetcaramelsunday.com/wp-content/uploads/Jalapeno-Pizza-180.jpg",
        description:
          "A sweet and spicy fusion with pineapple and jalapeño peppers.",
        price: "$11.99",
      },
      {
        name: "White Garlic Pizza",
        image_url:
          "https://www.nelliebellie.com/wp-content/uploads/garlic-white-pizza-720x1080-1.jpg",
        description:
          "Creamy garlic sauce, mozzarella cheese, and a sprinkle of herbs.",
        price: "$10.99",
      },
      {
        name: "BBQ Bacon Burger Pizza",
        image_url:
          "https://www.readyseteat.com/sites/g/files/qyyrlu501/files/uploadedImages/img_7866_8672.jpg",
        description:
          "Inspired by the classic burger with barbecue sauce, ground beef, bacon, and onions.",
        price: "$13.49",
      },
      {
        name: "Chicken Alfredo Pizza",
        image_url:
          "https://www.simplyrecipes.com/thmb/Rl5tkZSBjruwEa78PnI1P696VgQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Chicken-Alfredo-Pizza-Lead-Shot-2c-923f76bfca36416cba0e0ac1de062782.jpg",
        description:
          "Creamy Alfredo sauce, grilled chicken, mushrooms, and parmesan cheese.",
        price: "$12.99",
      },
      {
        name: "Spinach and Feta Pizza",
        image_url:
          "https://www.kingarthurbaking.com/sites/default/files/styles/featured_image_2x/public/recipe_legacy/3843-3-large.jpg?itok=_5oI7CFt",
        description:
          "A Mediterranean-inspired delight with spinach, feta cheese, olives, and garlic sauce.",
        price: "$11.99",
      },
      {
        name: "Bacon Ranch Pizza",
        image_url:
          "https://www.mybakingaddiction.com/wp-content/uploads/2020/09/Chicken-Bacon-Ranch-Pizza-15-of-30.jpg",
        description:
          "Ranch dressing, bacon, tomatoes, and mozzarella cheese on a pizza.",
        price: "$12.49",
      },
      {
        name: "Sausage and Peppers Pizza",
        image_url:
          "https://www.killingthyme.net/wp-content/uploads/2020/09/sausage-and-roasted-red-pepper-pizza-2.jpg",
        description:
          "Savory Italian sausage, bell peppers, and onions on a pizza crust.",
        price: "$11.99",
      },
      {
        name: "Buffalo Ranch Chicken Pizza",
        image_url:
          "https://images-gmi-pmc.edge-generalmills.com/84d51825-51c9-450c-be7c-860d17160951.jpg",
        description:
          "The perfect combination of buffalo sauce, ranch dressing, grilled chicken, and celery.",
        price: "$13.49",
      },
      {
        name: "Mediterranean Veggie Pizza",
        image_url:
          "https://www.cookinwithmima.com/wp-content/uploads/2019/08/mediterranean-veggie-pizza.jpg",
        description:
          "A Mediterranean-inspired pizza with olives, artichokes, tomatoes, and feta cheese.",
        price: "$12.99",
      },
      {
        name: "Garlic Parmesan Pizza",
        image_url:
          "https://www.sargento.com/assets/Uploads/Recipe/Image/pizza-v2__FillWzExNzAsNTgzXQ.jpg",
        description:
          "A garlic lover's delight with garlic Parmesan sauce and mozzarella cheese.",
        price: "$10.99",
      },
      {
        name: "Pesto Chicken Pizza",
        image_url:
          "https://www.healthyseasonalrecipes.com/wp-content/uploads/2023/04/chicken-pesto-pizza-3-014.jpg",
        description:
          "Pesto sauce, grilled chicken, sun-dried tomatoes, and mozzarella cheese.",
        price: "$12.49",
      },
      {
        name: "Bacon Spinach Alfredo Pizza",
        image_url:
          "https://assets.kraftfoods.com/recipe_images/opendeploy/120201_640x428.jpg",
        description:
          "Creamy Alfredo sauce, bacon, spinach, and mozzarella cheese.",
        price: "$13.49",
      },
      {
        name: "Tex-Mex Taco Pizza",
        image_url:
          "https://dudethatcookz.com/wp-content/uploads/2019/09/mexican_taco_pizza_9.jpg.webp",
        description:
          "A pizza with taco sauce, seasoned ground beef, cheddar cheese, and taco toppings.",
        price: "$11.99",
      },
      {
        name: "Pulled Pork BBQ Pizza",
        image_url:
          "https://www.thegunnysack.com/wp-content/uploads/2023/05/Pulled-Pork-Pizza-Recipe.jpg",
        description:
          "Tender pulled pork, barbecue sauce, red onions, and mozzarella cheese.",
        price: "$13.49",
      },
    ],
  });
};

export default pizzas;
