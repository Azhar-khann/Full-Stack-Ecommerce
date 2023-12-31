import { serverUrl } from "./serverUrl";

const featuredIds = [5, 9, 11, 15];
const genderIds = [1,10]
const everydaySneakersIds = [5,1,13,12];
const forRunnersIds = [10,9,15,3];
const iconicCollectionIds = [6,7,8,12,11,15]


export async function getProductbyId(id) {
    const response = await fetch(`${serverUrl}/products/${id}`)
    .then(async response =>{
        const product =  await response.json();
        return product
    })
    return response
}

export async function getProducts() {
    const response = await fetch(`${serverUrl}/products`)
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

export async function getIconicCollections(){
    const response = await fetch(`${serverUrl}/products`)
    .then(async response =>{
        const data =  await response.json();

        const iconicProducts = data.filter(product => iconicCollectionIds.includes(product.id));
        return iconicProducts
    })
    return response
}

export async function getFilterProducts(filter,name){
    const response = await fetch(`${serverUrl}/products/${filter}/${name}`)
    .then(async response =>{
        const data =  await response.json();
        return data
    })
    return response
}

export async function checkLogin(){
    const response = await fetch(`${serverUrl}/loggedInUserInfo`,{
        credentials: 'include'
    })
    .then(async response =>{
        const {LoggedIn,id,firstname} =  await response.json();
        return {LoggedIn,id,firstname}
    })
    return response
}

export async function getUserCart(){
    const response = await fetch(`${serverUrl}/cart/user`,{
        credentials: 'include'
    })
    .then(async response =>{
        const data =  await response.json();
        return data
    })
    return response
}


export async function getUserOrders(){
    const response = await fetch(`${serverUrl}/order/user`,{
        credentials: 'include'
    })
    .then(async response =>{
        const data =  await response.json();
        return data
    })
    return response
}