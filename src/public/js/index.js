const socketClient = io();


socketClient.on("productos", (data) => {
    console.log("Productos en tiempo real:", data);

    const divProd = document.getElementById("divProd");
    let html = '<ul>';
    data.forEach(product => {
        html += `<li>${product.title} - ${product.price}</li>`;
    });
    html += '</ul>';
    
    divProd.innerHTML = html;
});



