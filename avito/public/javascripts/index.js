fetch('http://localhost:3000/get_ads').then((response) => {return response.json();}).then((myJson) => {render(myJson)});

//Object-card on server
function render(sortedCards) {
    console.log(sortedCards)
    document.querySelector('.cards-wrapper').innerHTML = '';

}