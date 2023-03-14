let container = document.getElementById("div-cards");

//Array category filtrado

function displayChecks(array){
  categoriasArray = [];
  
  for(a of array){
      categoriasArray.push(a.category);
  }
  
  let categoriasFiltradas = categoriasArray.filter((categoria, index) =>{
    return categoriasArray.indexOf(categoria) == index;
  })
  
  let categoryContainer = document.getElementById("form-category");
  
  let checkArray = [];
  
  for(category of categoriasFiltradas){

    let checkbox = `<label class="label-category d-flex flex-wrap justify-content-center align-content-center gap-1" for="${category.replace(/\s+/g, '').toLowerCase()}">
    <input class="form-check-input input-check" type="checkbox" id="${category.replace(/\s+/g, '').toLowerCase()}" name="${category.replace(/\s+/g, '').toLowerCase()}" value="${category.replace(/\s+/g, '').toLowerCase()}">
    ${category}
  </label>`;
  
    checkArray.push(checkbox);

  }
  categoryContainer.innerHTML += checkArray;
}

function displayCards(array){
  let cardsArray = [];

  for(e of array){
    let card = `<article class="article-card mb-5 d-flex justify-content-center">
    <div class="d-flex flex-column justify-content-center">
    <img class="article-image mb-3" src="${e.image}" alt="event-image">
  <h2 h2 class="h2-article m-0 container-fluid text-center mb-2">${e.name}</h2>
  <span class="text-center mb-4">${e.description}</span>
  <div class="container d-flex flex-row flex-wrap text-center justify-content-around mb-4">
    <span class="span-price">$${e.price}</span>
    <a href="./details.html?id=${e._id}" class="btn button-see">See More</a>
  </div>
</div>
</article>`;

cardsArray.push(card);

}
console.log(cardsArray);
container.innerHTML += cardsArray;

}

function filtradoBusqueda(array){
  let inputValue = document.getElementById("search").value.toLowerCase();
  let cardsFiltradas = [];
  for(e of array){

    if(e.name.toLowerCase().includes(inputValue)){
      let card = `<article class="article-card mb-5 d-flex justify-content-center">
      <div class="d-flex flex-column justify-content-center">
      <img class="article-image mb-3" src="${e.image}" alt="event-image">
      <h2 h2 class="h2-article m-0 container-fluid text-center mb-2">${e.name}</h2>
      <span class="text-center mb-4">${e.description}</span>
      <div class="container d-flex flex-row flex-wrap text-center justify-content-around mb-4">
        <span class="span-price">$${e.price}</span>
        <a href="./details.html?id=${e._id}" class="btn button-see">see more</a>
      </div>
      </div>
      </article>`;

      cardsFiltradas.push(card);
    }
}
if(cardsFiltradas.length == 0){
  container.innerHTML = "<h2 class='text-danger text-boldder'>No hay coincidencias</h2>";
}else{
  container.innerHTML += cardsFiltradas;
}
}

displayChecks(data.events);
displayCards(data.events);

//Checkbox and Search event

let checks = document.querySelectorAll(".input-check");
const form = document.getElementById("form-search");


form.addEventListener('submit', (e)=>{
  e.preventDefault();

  container.innerHTML = "";

  let checkedArray = [];
  checks.forEach((e)=>{
    if(e.checked == true){
      filterArray = [];
      filterArray = data.events.filter(element => element.category.replace(/\s+/g, '').toLowerCase() == e.value);

      for(element of filterArray){
        checkedArray.push(element);
      }
    }
  });

  if(checkedArray.length > 0){
    filtradoBusqueda(checkedArray);

    console.log(inputValue);
  }else{
    filtradoBusqueda(data.events);
  }
})

