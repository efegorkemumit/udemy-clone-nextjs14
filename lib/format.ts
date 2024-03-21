
export const formatPrice = (price:number)=>{
    return new Intl.NumberFormat("tr-TR",{
        style:"currency",
        currency:"TRY"
    }).format(price)
}