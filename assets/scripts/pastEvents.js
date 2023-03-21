let container = document.getElementById("div-cards");
let data = JSON.parse(localStorage.getItem("data"));
let arrayPastEvents = filtradoPast(data);

function filtradoPast(array){
  let pastEvents = [];
  
  for(e of array.events){
    let currentDate = array.currentDate;
    let eventDate = e.date;
  
    let referenceDate = new Date(currentDate);
    let date = new Date (eventDate);
  
    if(date < referenceDate){
      pastEvents.push(e);
    }   
  }

  return pastEvents;
}

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
  
  container.innerHTML ="";

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

container.innerHTML += cardsArray;

}

displayChecks(arrayPastEvents);
displayCards(arrayPastEvents);

let checks = document.querySelectorAll(".input-check");
let divChecks = document.getElementById("form-category");
const form = document.getElementById("form-search");

function filtrarBusqueda(array){
  let inputValue = document.getElementById("search").value.toLowerCase();

  arrayFiltradoPorTexto = array.filter(elemento => elemento.name.toLowerCase().includes(inputValue));

  return arrayFiltradoPorTexto;
}

function filtrarEventosCheck(array){
  
  let checksArray = Array.from(checks);

  let arrayChecked = checksArray.filter(check => check.checked);

  let checkValues = arrayChecked.map(check => check.value);

  arrayFiltrado = array.filter(element => checkValues.includes(element.category.replace(/\s+/g, '').toLowerCase()));

  if(arrayChecked.length > 0){
    return arrayFiltrado
}
return array;
}

form.addEventListener('keyup', iniciarFiltradoPast);

divChecks.addEventListener("change", iniciarFiltradoPast);

function iniciarFiltradoPast(){

let filtradoBusqueda = filtrarBusqueda(arrayPastEvents);

let filtradoChecks = filtrarEventosCheck(filtradoBusqueda);

displayCards(filtradoChecks);

if(filtradoChecks.length == 0){
  container.innerHTML = "<h2 class='text-danger text-boldder'>No hay coincidencias</h2>";
}

}