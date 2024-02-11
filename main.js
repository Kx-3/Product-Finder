const container = document.querySelector('.container')
const form = document.querySelector('.form')
const input = document.querySelector('.search')

let searchQuery



const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd4b3a1d197msh6884c92b6b1d1f3p1691a0jsna830dfed23e2',
		'X-RapidAPI-Host': 'real-time-product-search.p.rapidapi.com'
	}
};




form.addEventListener('submit', (e) => {
    e.preventDefault()
    searchQuery = input.value
    fetchData()
    input.value = ''
    container.innerHTML = ''
})


const fetchData = async () => {
    try {
        const response = await fetch(`https://real-time-product-search.p.rapidapi.com/search?q=${searchQuery}&country=ke&language=en`, options);
        const result = await response.json();
        console.log(result);
        result.data.forEach(product => {
            const card = document.createElement('div')
            card.classList.add('card')
            card.innerHTML = `
            <div class= 'image'>
                <img src='${product.product_photos[0]}' alt= 'hotel image'>
            </div>
            <div class= 'text'>
                <h3>${product.product_title}</h3>
                <h4>Price: ${product.offer.price}</h4>
                <h4>Store: ${product.offer.store_name}      <a href="${product.offer.offer_page_url}" target = '_blank'>Buy</a></h4>
            </div>
            `
            container.appendChild(card)
        })
    } catch (error) {
        console.error(error);
    }
    // try {
    //     const response = await fetch(`https://local-business-data.p.rapidapi.com/search?query=${searchQuery}&limit=20`, options);
    //     const result = await response.json();
    //     result.data.forEach(business => {
    //         const card = document.createElement('div')
    //         card.classList.add('card')
    //         card.innerHTML = `
    //         <div class= 'image'>
    //             <img src='${business.photos_sample[0].photo_url}' alt= 'hotel image'>
    //         </div>
    //         `
    //         container.appendChild(card)
    //     })
    // } catch (error) {
    //     console.error(error);
    // }
}
