const API_ENDPOINT = 'http://localhost:4000';

const featuredIds = [5, 9, 11, 15];
const genderIds = [1,10]
const everydaySneakersIds = [5,1,13,12];
const forRunnersIds = [10,9,15,3];



export async function getbannerProduct() {
    const response = await fetch(`${API_ENDPOINT}/products`)
    .then(async response =>{
        const data =  await response.json();
        const bannerProduct = data.find(product => product.id === 6);
        return bannerProduct
    })
    return response
}

export async function getFeaturedProducts() {
    const response = await fetch(`${API_ENDPOINT}/products`)
    .then(async response =>{
        const data =  await response.json();

        const featuredProducts = data.filter(product => featuredIds.includes(product.id));
        const gender = data.filter(product => genderIds.includes(product.id));
        const everydaySneakersProducts = data.filter(product => everydaySneakersIds.includes(product.id));
        const forRunnersProducts = data.filter(product => forRunnersIds.includes(product.id));

        return {featuredProducts,gender,everydaySneakersProducts,forRunnersProducts}
    })
    return response
}

export async function getFilterProducts(filter,name){
    console.log(name)
    const response = await fetch(`${API_ENDPOINT}/products/${filter}/${name}`)
    .then(async response =>{
        const data =  await response.json();
        return data
    })
    return response
}