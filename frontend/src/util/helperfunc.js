
export function Total(price,quantity){
    return price*quantity;
}

export function OrderTotal(cart){
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total = total + Total(cart[i].price,cart[i].quantity)
    }
    return total
} 

export function orderValue(items){
    console.log(items)
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        total = total + Total(items[i].price,items[i].quantity)
    }
    return total
}
