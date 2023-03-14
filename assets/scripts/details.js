let container = document.getElementById("details-container");

const queryString = location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const eventCard = data.events.find(event => event._id == id);



container.innerHTML = `
<div class="image-details-container d-flex col-12 col-md-5">
    <img class="details-image" src="${eventCard.image}" alt="cinema-image">
</div>
<article class="article-details col-12 col-md-5 d-flex flex-column align-items-center justify-content-center">
    <h2>${eventCard.name}</h2>
    <p> Date: ${eventCard.date}</p>
    <p>${eventCard.description}</p>
    <p>Place: ${eventCard.place}</p>
</article>`

