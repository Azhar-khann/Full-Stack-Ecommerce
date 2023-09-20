const API_ENDPOINT = 'http://localhost:4000';

export async function getbannerProduct() {
    const response = await fetch(`${API_ENDPOINT}/products`)
    .then(async response =>{
        const data =  await response.json();
        const bannerProduct = data.find(product => product.id === 18);
        return bannerProduct
    })
    return response
}
