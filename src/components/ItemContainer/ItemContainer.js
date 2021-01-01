import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './ItemContainer.css'
import ItemInformation from '../ItemInformation/ItemInformation'
import ReccomendedItem from '../RecommendedItem/RecommendedItem'
import ErrorHandler from '../ErrorHandler/ErrorHandler'

const AddToCartButtonState = [
    {
        style: 'add-to-cart-button unavailable',
        text: 'OUT OF STOCK'
    },
    {
        style: 'add-to-cart-button available',
        text: 'ADD TO CART'
    }
]


const ItemContainer = (props) => {
    const { itemId, sizeId } = useParams()
    const [isItemFetched, setIsItemFetched] = useState(false)
    const [item, setItem] = useState([])
    const [itemQuantity, setItemQuantity] = useState([])
    const [userItemQuantity, setUserQuantity] = useState(1)
    const [userItemSize, setUserItemSize] = useState('')
    const [itemQuantityInStock, setItemQuantityInStock] = useState(0)

    const addToCartInfo = itemQuantityInStock === 0 ? AddToCartButtonState[0] : AddToCartButtonState[1]

    const filteredItems = props.allItems.filter((product) => {
        return product.product_id !== parseInt(itemId)
    })

    useEffect(() => {
        async function fetchItem() {
            await fetch('http://192.168.1.160:3030/api/item/' + itemId + '/' + sizeId, { mode: 'cors', method: 'GET' })
                .then((res) => res.json())
                .then((result) => {
                    setItem(result)
                    setUserItemSize(result.available_size.split(",")[0])
                    setIsItemFetched(true)
                })
        }

        async function fetchQuantity() {
            await fetch('http://192.168.1.160:3030/api/quantity/' + itemId, { mode: 'cors', method: 'GET' })
                .then((res) => res.json())
                .then((result) => {
                    setItemQuantity(result)
                    setItemQuantityInStock(result[0].quantity)
                })
        }

        fetchQuantity()
        fetchItem()
    }, [itemId])

    function changeQuantity(event) {
        setUserQuantity(event.target.value)
    }

    function changeSize(event) {
        setUserItemSize(event.target.value)
        var currentQuantity = itemQuantity.find((size) => size.size === event.target.value).quantity
        setItemQuantityInStock(currentQuantity)
        setQuantityInputValue(currentQuantity)
        props.setLimitReached(false, null);
    }

    function setQuantityInputValue(quantity) {
        if (quantity < document.getElementById('quantity-input').value && quantity !== 0) {
            document.getElementById('quantity-input').value = quantity
            setUserQuantity(quantity)
        } else if (quantity === 0) {
            document.getElementById('quantity-input').value = 1
            setUserQuantity(1)
        }
    }

    function generateErrorMessage(itemsLeft) {
        if(itemsLeft === 0) {
            return "Sorry, we dont have any more of these fine ass hoodies in stock";
        }
        if (itemsLeft === 1) {
            return "Sorry, adin item budet, mozna paiti naxui?";
        }

        return "Sorry, you can only add " + itemsLeft + " more";
    }

    function getItem(item) {
        console.log("" + itemId + item.product_color_id + userItemSize);
        return {
            key: "" + itemId + item.product_color_id + userItemSize,
            cartItem: {
                itemId: itemId,
                src: require("../../images/" + item.product_id + ".jpg").default,
                itemSizeId: itemQuantity.find((size) => size.size === userItemSize).size_id,
                itemColorId: item.product_color_id,
                quantity: userItemQuantity * 1,
                name: item.name,
                color: item.color,
                size: userItemSize,
                price: item.price * 1,
                maxQuantity: itemQuantityInStock
            }
        };
    }

    if (isItemFetched && !itemQuantity.length === false) {
        return (
            <div className="container">
                <div className="item-container">
                    <div className="item-container__photo">
                        <img src={require("../../images/" + item.product_id + ".jpg").default} alt="item photo"></img>
                    </div>
                    <ItemInformation
                        item={item}
                        userQuantity={userItemQuantity}
                        changeQuantity={changeQuantity}
                        changeSize={changeSize}
                        itemQuantity={itemQuantityInStock === 0 ? 1 : itemQuantityInStock}>
                        <div>
                            <button className={addToCartInfo.style} type="submit" name="button" onClick={() => {
                                props.addToCart(getItem(item))
                            }}>{addToCartInfo.text}</button>
                            <ErrorHandler 
                                setLimitReached = {props.setLimitReached}
                                isActive = {props.limitReached[0]}
                                message = {generateErrorMessage(props.limitReached[1])}
                            /> 
                        </div>
                    </ItemInformation>
                </div>
                <div className="recommended-items-container">
                    <div className="recommended-items">
                        {filteredItems.map((item) => {
                            return (
                                <ReccomendedItem
                                    key={item.product_id}
                                    item={item} />
                            )
                        })}
                    </div>

                </div>
            </div>
        )
    } else {
        return <div></div>
    }
}

export default ItemContainer
