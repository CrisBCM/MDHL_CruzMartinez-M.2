//FIRST TABLE

let arrayDatos = JSON.parse(localStorage.getItem("data"));

function obtenerPorcentajeAsistencia(){
    let percentageArray = [];
    

    arrayDatos.events.forEach(element => {
        let event = {
            name:"",
            percentageAssistence:0,
            capacity: 0
        }

        let assistance = element.assistance;
    
        if(assistance){
            let capacity = element.capacity;
    
            let percentageAssistence = assistance / capacity * 100;
        
            event.name = element.name;
            event.percentageAssistence = percentageAssistence;
            event.capacity = capacity;

            percentageArray.push(event);
        }
        
        
    });

    return percentageArray;
}

function ordenarMayorAMenor(){

    let percentageArray = obtenerPorcentajeAsistencia();

    percentageArray.sort( (a, b) =>{
        if (a.percentageAssistence < b.percentageAssistence){
            return -1;
        }
        if (a.percentageAssistence > b.percentageAssistence){
            return 1;
        }

        return 0;
        
    });

    return percentageArray;
    
}

function obtenerMayorCapacidad(){
    let arrayOrdenado = ordenarMayorAMenor();
    arrayOrdenado.sort( (a, b) =>{
        if (a.capacity < b.capacity){
            return -1;
        }
        if (a.capacity > b.capacity){
            return 1;
        }

        return 0;
        
    });

    return arrayOrdenado;
}

function displayFirstTable(){
    let arrayOrdenado = ordenarMayorAMenor();
    let arrayMayorCapacidad = obtenerMayorCapacidad();

    let tDHigh = document.getElementById("high") ;
    let tDLow = document.getElementById("low");
    let tDLarger = document.getElementById("larger");

    let mayorPorcentaje = arrayOrdenado.at(-1);
    let menorPorcentaje = arrayOrdenado[0];
    let mayorCapacidad = arrayMayorCapacidad.at(-1);

    tDHigh.innerText = `${mayorPorcentaje.name} (${mayorPorcentaje.percentageAssistence}%)`;

    tDLow.innerText = `${menorPorcentaje.name} (${menorPorcentaje.percentageAssistence}%)`;

    tDLarger.innerText = `${mayorCapacidad.name} (${mayorCapacidad.capacity})`

}

displayFirstTable();



//SECOND TABLE

function filtradoUpcoming(){
    let upcomingEvents = [];
  
    for(e of arrayDatos.events){
      let currentDate = arrayDatos.currentDate;
      let eventDate = e.date;
    
      let referenceDate = new Date(currentDate);
      let date = new Date (eventDate);
    
      if(date > referenceDate){
        upcomingEvents.push(e);
      }   
    }
    return upcomingEvents;
  }

function filtradoInfoUpcoming(){
    let upcomingEvents = filtradoUpcoming();
    let arrayFiltradoUpcoming = [];

    upcomingEvents.forEach(element =>{

        if (element.estimate){
            let category = {
                category:element.category,
                price:element.price,
                assist:element.estimate,
                capacity:element.capacity
            }
            arrayFiltradoUpcoming.push(category);
        }
                
    })
    return arrayFiltradoUpcoming;
}

let arrayFiltrarInfoUpcoming = filtradoInfoUpcoming();

function displaySecondTable(){
    let arrayNombresCategoriaUpcoming = filtrarNombresCategoria(arrayFiltrarInfoUpcoming);

    let arrayFiltrarCategorias = filtrarCategorias(arrayNombresCategoriaUpcoming, arrayFiltrarInfoUpcoming);

    let tDArray = document.querySelectorAll(".td-upcoming");
    let tDRevenue = document.querySelectorAll(".revenues-upcoming");
    let tDAtlendance = document.querySelectorAll(".atlendance-upcoming");

    for(i = 0; i < tDArray.length; i++){
        tDArray[i].innerText = `${arrayFiltrarCategorias[i][0].category}`;
    }

    for(i = 0; i < tDRevenue.length; i++){
        let revenue = 0;
        
        for(i = 0; i < arrayFiltrarCategorias.length; i++){
            revenue = 0;
            
            for(categoria of arrayFiltrarCategorias[i]){
                

                revenue += categoria.price * categoria.assist;

            }

            tDRevenue[i].innerText = `${revenue}`;
        }
    }
    
    for(i = 0; i < tDAtlendance.length; i++){
        let atlendancePercentage = 0;
        let sumaAsistencia = 0;
        let sumaCapacidad = 0;

        for(i= 0; i < arrayFiltrarCategorias.length; i++){

            sumaAsistencia = 0;
            sumaCapacidad = 0;

            for(categoria of arrayFiltrarCategorias[i]){
                sumaAsistencia += categoria.assist;
                sumaCapacidad += categoria.capacity;
            }
            let resultado = (sumaAsistencia / sumaCapacidad) * 100;
            tDAtlendance[i].innerText = `${resultado.toFixed(2)}%`;
        }
    }
}

displaySecondTable();
//THIRD TABLE

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


function filtrarInfoPast (){
    let pastEvents = filtradoPast(arrayDatos);
    let arrayFiltradoPast = [];

    
    pastEvents.forEach(element =>{

            if (element.assistance){
                let category = {
                    category:element.category,
                    price:element.price,
                    assist:element.assistance,
                    capacity:element.capacity
                }
                arrayFiltradoPast.push(category);
            }
            
    })
    return arrayFiltradoPast;
}

function filtrarNombresCategoria(array){
    let arrayNombresCategoria = [];
    for (categoria of array){
        arrayNombresCategoria.push(categoria.category);
    }

    let categoriasFiltradas = arrayNombresCategoria.filter((category, index) =>{
        return arrayNombresCategoria.indexOf(category) == index;
    })
    return categoriasFiltradas;
}

let arrayfiltrarInfoPast = filtrarInfoPast();


let arrayNombresCategoriaPast = filtrarNombresCategoria(arrayfiltrarInfoPast);

function filtrarCategorias(array1, array2){

    let arrayDeCategorias = [];

    array1.forEach(element => {
        arrayDeCategorias.push(array2.filter(evento => evento.category.toLowerCase() == element.toLowerCase()));
    })
    return arrayDeCategorias;
}


function displayThirdTable(){

    let arrayFiltrarCategorias = filtrarCategorias(arrayNombresCategoriaPast,arrayfiltrarInfoPast);

    let tDArray = document.querySelectorAll(".td-past");
    let tDRevenue = document.querySelectorAll(".revenues");
    let tDAtlendance = document.querySelectorAll(".atlendance");

    for(i = 0; i < tDArray.length; i++){
        tDArray[i].innerText = `${arrayFiltrarCategorias[i][0].category}`;
    }

    for(i = 0; i < tDRevenue.length; i++){
        let revenue = 0;
        
        for(i = 0; i < arrayFiltrarCategorias.length; i++){
            revenue = 0;
            
            for(categoria of arrayFiltrarCategorias[i]){
                

                revenue += categoria.price * categoria.assist;

            }

            tDRevenue[i].innerText = `${revenue}`;
        }
    }
    
    for(i = 0; i < tDAtlendance.length; i++){
        let atlendancePercentage = 0;
        let sumaAsistencia = 0;
        let sumaCapacidad = 0;

        for(i= 0; i < arrayFiltrarCategorias.length; i++){

            sumaAsistencia = 0;
            sumaCapacidad = 0;

            for(categoria of arrayFiltrarCategorias[i]){
                sumaAsistencia += categoria.assist;
                sumaCapacidad += categoria.capacity;
            }
            let resultado = (sumaAsistencia / sumaCapacidad) * 100;
            tDAtlendance[i].innerText = `${resultado.toFixed(2)}%`;
        }
    }
}

displayThirdTable();