let container = document.getElementById("div-cards");


for(e of upcomingEvents){
    let card = `<article class="article-card mb-5 d-flex justify-content-center">
    <div class="d-flex flex-column justify-content-center">
    <img class="article-image mb-3" src="${e.image}" alt="event-image">
  <h2 h2 class="h2-article m-0 container-fluid text-center mb-2">${e.name}</h2>
  <span class="text-center mb-4">${e.description}</span>
  <div class="container d-flex flex-row flex-wrap text-center justify-content-around mb-4">
    <span class="span-price">$${e.price}</span>
    <button class="btn button-see">see more</button>
  </div>
</div>
</article>`;

    container.innerHTML += card;

}