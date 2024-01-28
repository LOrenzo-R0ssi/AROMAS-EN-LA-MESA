const input = document.querySelector("#input")
const submit = document.querySelector("#submit")
const form = document.querySelector("#form")
const resultados = document.querySelector("#resultados")
const selectedRecipe = document.querySelector("#selectedRecipe")

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'a8d1cf48b5msh8c2bfcc05350c92p185cc3jsnf60a9c605930',
    'X-RapidAPI-Host': 'food-recipes-with-images.p.rapidapi.com'
  }
};


const buscarReceta = () => {
  let recetaBuscada
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    recetaBuscada = input.value


    fetch(`https://food-recipes-with-images.p.rapidapi.com/?q=${recetaBuscada}`, options)
      .then(res => res.json())
      .then(response => { 
        
        let recetas = response.d || [] 

        recetas.forEach((receta) => {
          let contenedorProductos = document.createElement("div");
          contenedorProductos.innerHTML = `<div class="card">
          <div class="card-details">
            <p class="text-title">${receta.Title}</p>
            <img src="${receta.Image}" alt="Fotografía a modo de ejemplo de la receta" class="card-img">
          </div>
          <button class="card-button" id="recipe${receta.id}" >More info</button>
        </div>`;

          resultados.appendChild(contenedorProductos);

          //Visualizar más informacion sobre la receta seleccionada
          const btnRecipe = document.querySelector(`#recipe${receta.id}`)
          btnRecipe.addEventListener("click", () =>{

            resultados.innerHTML = ""


            let ingredientsList = "";
          
            if (Array.isArray(receta.Ingredients)) {
              ingredientsList = receta.Ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');
            } else if (typeof receta.Ingredients === 'object') {
              // Si los ingredientes son un objeto, asumimos que es una estructura diferente
              for (const key in receta.Ingredients) {
                if (receta.Ingredients.hasOwnProperty(key)) {
                  const ingredient = receta.Ingredients[key];
                  ingredientsList += `<li>${ingredient}</li>`;
                }
              }
            } else if (typeof receta.Ingredients === 'string') {
              // Si es una cadena, asumimos que es una lista separada por comas u otro delimitador
              ingredientsList = receta.Ingredients.split(',').map(ingredient => `<li>${ingredient.trim()}</li>`).join('');
            }

            selectedRecipe.innerHTML = ` <div class="recipe">
            <div class="title-img">
            <h1 class="tituloRecipe">${receta.Title}</h1>
            <img src="${receta.Image}" alt="" class="imgRecipe">
            </div>

            <div class="recipeInfo">
            <p class="instructionsRecipe">${receta.Instructions}</p>
            <ul class="ingredientsRecipe">${ingredientsList}</ul>
            </div>
        </div>`
          })

        });
        
        //Limpiar los resultados al buscar una nueva receta
        input.addEventListener("keyup", () =>{
          resultados.innerHTML = ``
          selectedRecipe.innerHTML = ""
        })

      })
      .catch(error => {Swal.fire({
        title: "Oops!",
        text: "Ha habido un error en el servidor",
        icon: "error"
      }, error);
    })
  })
}



buscarReceta();

