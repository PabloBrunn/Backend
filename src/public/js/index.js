const socketClient = io()

const realTimeProd = document.getElementById("divProd")

socketClient.on('allProds', (data) => {

    const allProds = data.map((e) => {
        return `<h1>title: ${e.title}</h1><p> description : ${e.description}</p><p> price : ${e.price}</p><p> thumbnail : ${e.thumbnail}</p><p> code : ${e.code}</p><p> status : ${e.status}</p><p> stock : ${e.stock}</p><p> id : ${e.id}</p>`
    });

    console.log(allProds)
    prodRealTime.innerHTML = allProds


})