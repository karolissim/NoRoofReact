import React, { useEffect, useState, Component } from 'react'
import { useParams } from 'react-router-dom'
import './ItemContainer.css'
import itemPhoto from '../../images/1_back.jpg'
import ItemInformation from '../ItemInformation/ItemInformation'

const AddToCartButtonState = [
    {
        style: 'add-to-cart-button unavailable',
        text: 'OUT OF STOCK :('
    },
    {
        style: 'add-to-cart-button',
        text: 'ADD TO CART'
    }
]

const ItemContainer = () => {
    const { itemId, sizeId } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [item, setItem] = useState([])
    const [userItemQuantity, setUserQuantity] = useState(1)
    const [userItemSize, setUserItemSize] = useState('')
    const [itemQuantityInStock, setItemQuantity] = useState(0)

    const addToCartInfo = itemQuantityInStock === 0 ? AddToCartButtonState[0] : AddToCartButtonState[1]

    useEffect(() => {
        function fetchItem() {
            fetch('http://localhost:3030/api/item/' + itemId + '/' + sizeId, { mode: 'cors', method: 'GET' })
                .then((res) => res.json())
                .then((result) => {
                    setItem(result)
                    setItemQuantity(result.quantity)
                    setUserItemSize(result.available_size.split(",")[0])
                    setIsLoading(false)
                    console.log(result)
                })
        }

        fetchItem()
    }, [])

    function changeQuantity(event) {
        setUserQuantity(event.target.value)
    }

    function changeSize(event) {
        setUserItemSize(event.target.value)
    }

    if (!isLoading) {
        return (
            <div className="item-container">
                <div className="item-container__photo">
                    <img src={itemPhoto} alt="item photo"></img>
                </div>
                <ItemInformation
                    item={item}
                    userQuantity={userItemQuantity}
                    changeQuantity={changeQuantity}
                    changeSize={changeSize}
                    itemQuantity={itemQuantityInStock === 0 ? 1 : itemQuantityInStock}>
                    <div>
                        <button className={addToCartInfo.style} type="submit" name="button" onClick={() => console.log(userItemQuantity + " " + userItemSize)}>{addToCartInfo.text}</button>
                    </div>
                </ItemInformation>
            </div>
        )
    } else {
        return <div></div>
    }
}

export default ItemContainer
