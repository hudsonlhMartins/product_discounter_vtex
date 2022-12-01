import React, { useEffect, useState } from 'react'

import { useCssHandles } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'
import { FormattedPrice } from 'vtex.formatted-price'
import style from './style.css'

import Discount from './utils'


const CSS_HANDLES = ['container_discount', 'product_discount_price', 'priceNormal', 'notDisponivel', 'product_discount_text', 'text_not_disponivel']

const ProductDiscount = (props) => {

    const { handles, withModifiers } = useCssHandles(CSS_HANDLES)

    const [priceProduct, setPriceProduct] = useState()
    const [AvailableQuantity, setAvailableQuantity] = useState()

    const productValueContext = useProduct()



    useEffect(() => {
        // console.log('productValue preço --> ', productValueContext.product.priceRange.sellingPrice.lowPrice)
        const price = productValueContext.product.priceRange.sellingPrice.lowPrice
        const value = Discount(props.valueDiscount, price)

        //console.log('AvailableQuantity ==> ', productValueContext?.selectedItem?.sellers[0]?.commertialOffer?.AvailableQuantity)
        setAvailableQuantity(productValueContext?.selectedItem?.sellers[0]?.commertialOffer?.AvailableQuantity)
        setPriceProduct(value)

    }, [productValueContext])

    return (
        <>
            <div className={`${style.container_test} ${handles.container_discount} ${AvailableQuantity > 0 ? handles.priceNormal : handles.notDisponivel}`}>

                {priceProduct !== 0 && AvailableQuantity > 0 ? (
                    <>
                        <strong className={`${handles.product_discount_price}`}>
                            <FormattedPrice value={priceProduct} />
                        </strong>

                        <span className={`${handles.product_discount_text}`}>{props.valueText}</span>
                    </>
                ) : (
                    <span className={`${handles.text_not_disponivel}`}>{props.valueTextEsgotado}</span>
                )}
            </div>
        </>
    )
}


export default ProductDiscount

ProductDiscount.defaultProps = {
    valueDiscount: 5,
    valueText: 'à vista no Boleto/Pix',
    valueTextEsgotado: 'Indísponivel'
}

ProductDiscount.getSchema = () => {
    return {
        title: "Desconto",
        type: "object",
        properties: {
            textTop: {
                title: "desconto a vista",
                description: "",
                type: "number",
                default: ProductDiscount.defaultProps.valueDiscount
            },
            textVista: {
                title: "desconto a vista",
                description: "",
                type: "string",
                default: ProductDiscount.defaultProps.valueText
            },
            textEsgotado: {
                title: "Esgotado",
                description: "",
                type: "string",
                default: ProductDiscount.defaultProps.valueTextEsgotado
            }
        }
    }
}