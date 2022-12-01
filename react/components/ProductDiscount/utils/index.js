const Discount = (discount, valor)=>{
    if(valor !== null){
        const valorFormated = discount / 100
        const valueWithDiscount = 1 - valorFormated
        return valor * valueWithDiscount
    }else{
        return 0
    }
}
export default Discount