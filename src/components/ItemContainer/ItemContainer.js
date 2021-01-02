import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './ItemContainer.css'
import ItemInformation from '../ItemInformation/ItemInformation'
import ReccomendedItem from '../RecommendedItem/RecommendedItem'
import ImageSlider from '../ImageSlider/ImageSlider'
import ErrorHandler from '../ErrorHandler/ErrorHandler'

const AddToCartButtonState = [
    {
        style: 'add-to-cart-button unavailable',
        text: 'OUT OF STOCK',
        isDisabled: true
    },
    {
        style: 'add-to-cart-button available',
        text: 'ADD TO CART',
        isDisabled: false
    }
]

/**
 * React functional component which is responsible for rendering 
 * single shopping item with its all information and showing recommended items' on a right side 
 * @param {Object} props 
 */
const ItemContainer = (props) => {
    const { itemId, sizeId } = useParams()
    const [isItemFetched, setIsItemFetched] = useState(false)
    const [item, setItem] = useState([])
    const [itemQuantity, setItemQuantity] = useState([])
    const [userItemQuantity, setUserQuantity] = useState(1)
    const [userItemSize, setUserItemSize] = useState('')
    const [itemQuantityInStock, setItemQuantityInStock] = useState(0)
    const [itemPhotos, setItemPhotos] = useState([])

    const addToCartInfo = itemQuantityInStock === 0 ? AddToCartButtonState[0] : AddToCartButtonState[1]

    const filteredItems = props.allItems.filter((product) => {
        return product.product_id !== parseInt(itemId)
    })

    useEffect(() => {
        /**
         * Fetches single item data from server using item ID and size ID as params
         */
        async function fetchItem() {
            await fetch('http://localhost:3030/api/item/' + itemId + '/' + sizeId, { mode: 'cors', method: 'GET' })
                .then((res) => res.json())
                .then((result) => {
                    setItem(result)
                    setUserItemSize(result.available_size.split(",")[0])
                    setIsItemFetched(true)
                    fetchPhotoIds(result.product_color_id)
                })
        }

        /**
         * Fetches all item's quantities and sizes using item ID as param
         */
        async function fetchQuantity() {
            await fetch('http://localhost:3030/api/quantity/' + itemId, { mode: 'cors', method: 'GET' })
                .then((res) => res.json())
                .then((result) => {
                    setItemQuantity(result)
                    setItemQuantityInStock(result[0].quantity)
                })
        }

        function fetchPhotoIds(colorId) {
            fetch('http://localhost:3030/api/photos/' + itemId + '/' + colorId, { mode: 'cors', method: 'GET' })
                .then((res) => res.json())
                .then((result) => {
                    setItemPhotos(result)
                })
        }

        fetchQuantity()
        fetchItem()
    }, [itemId])

    /**
     * Method is called after item quantity input's onChange event is triggered and
     * it changes user quantity value to the one that is set in quantity input element
     * @param {SyntheticEvent} event
     */
    function changeQuantity(event) {
        setUserQuantity(event.target.value)
    }

    /**
     * Method is called after item quantity input's onBlur event is triggered.
     * If input's value is greater than present item quantity or less than 1,
     * user's quantity is being altered respectively to highest quantity or 1
     * @param {number} value - Item quantity to be set 
     */
    function quantityValidation(value) {
        setUserQuantity(value)
    }

    /**
     * 
     * @param {SyntheticEvent} event 
     */
    function changeSize(event) {
        setUserItemSize(event.target.value)
        var currentQuantity = itemQuantity.find((size) => size.size === event.target.value).quantity
        setItemQuantityInStock(currentQuantity)
        setQuantityInputValue(currentQuantity)
        props.setLimitReached(false);
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

    function generateErrorMessage() {
        return "Only " + itemQuantityInStock + " items in stock";
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

    if (isItemFetched && !itemQuantity.length === false && !itemPhotos.length === false) {
        return (
            <div className="container">

                <div className="item-container">
                    <ImageSlider
                        itemId={itemId}
                        colorId={item.product_color_id}
                        photoIds={itemPhotos} />
                    <div className="item-container-with-error">
                        <ItemInformation
                            item={item}
                            userQuantity={userItemQuantity}
                            changeQuantity={changeQuantity}
                            quantityValidation={quantityValidation}
                            changeSize={changeSize}
                            itemQuantity={itemQuantityInStock === 0 ? 1 : itemQuantityInStock}>
                            <div>
                                <button className={addToCartInfo.style} type="submit" name="button" onClick={() => {
                                    props.addToCart(getItem(item))
                                }} disabled={addToCartInfo.isDisabled}>{addToCartInfo.text}</button>

                            </div>
                        </ItemInformation>
                        <div className="errorWrapper">
                            <ErrorHandler
                                setLimitReached={props.setLimitReached}
                                isActive={props.limitReached}
                                message={generateErrorMessage()}
                            />
                        </div>
                    </div>

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
