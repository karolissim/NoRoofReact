import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './ItemContainer.css'
import ItemInformation from '../ItemInformation/ItemInformation'
import ReccomendedItem from '../RecommendedItem/RecommendedItem'
import ImageSlider from '../ImageSlider/ImageSlider'
import { api } from '../../api/Api'
import { ADD_TO_CART_BUTTON_STATE, ERROR_MESSAGE_ITEM } from '../../Constants/Constants'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import ErrorPage from '../ErrorPage/ErrorPage'

/**
 * React functional component which is responsible for rendering 
 * single shopping item with its all information and showing recommended items' on a right side 
 * @param {Object} props 
 */
const ItemContainer = (props) => {
    const { itemId, sizeId, colorId } = useParams()
    const [isItemFetched, setIsItemFetched] = useState(false)
    const [item, setItem] = useState([])
    const [itemQuantity, setItemQuantity] = useState([])
    const [itemColors, setItemColors] = useState([])
    const [userItemQuantity, setUserQuantity] = useState(1)
    const [userItemSize, setUserItemSize] = useState('')
    const [itemQuantityInStock, setItemQuantityInStock] = useState(0)
    const [itemPhotos, setItemPhotos] = useState([])
    const [showError, setShowError] = useState(false)

    const addToCartInfo = itemQuantityInStock === 0 ? ADD_TO_CART_BUTTON_STATE[0] : ADD_TO_CART_BUTTON_STATE[1]

    const filteredItems = props.allItems.filter((item) => {
        return item.product_id !== parseInt(itemId)
    })

    const filteredPhotos = itemPhotos.filter((item) => {
        return item.color_id === parseInt(colorId)
    })

    const isLoading = isItemFetched && !itemColors.length === false && !itemPhotos.length === false && !filteredPhotos.length === false

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const { data } = await api.get(`/api/item/${itemId}/${sizeId}/${colorId}`)
                setItem(data)
                setIsItemFetched(true)
            } catch (error) {
                setShowError(true)
            }
        }

        const fetchItemColors = async () => {
            try {
                const { data } = await api.get(`/api/color/${itemId}`)
                setItemColors(data.colors)
            } catch (error) {
                setShowError(true)
            }
        }

        const fetchPhotoIds = async () => {
            try {
                const { data } = await api.get(`/api/photos/${itemId}`)
                setItemPhotos(data)
            } catch (error) {
                setShowError(true)
            }
        }

        fetchItem()
        fetchItemColors()
        fetchPhotoIds()

        return () => {
            setItem([])
            setItemPhotos([])
            setItemColors([])
            setIsItemFetched(false)
            props.closeSnackbar()
        }
    }, [itemId])

    useEffect(() => {
        const fetchQuantity = async () => {
            try {
                const { data } = await api.get(`/api/quantity/${itemId}/${colorId}`)
                setItemQuantity(data)
                setItemQuantityInStock(data[0].quantity)
                setUserItemSize(data[0].size)
            } catch (error) {
                setShowError(true)
            }
        }

        fetchQuantity()

        return () => {
            setItemQuantity([])
        }
    }, [colorId, itemId])

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
        props.closeSnackbar()
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
        if (itemQuantityInStock === 1) {
            return `We have only ${itemQuantityInStock} item in stock`
        } else {
            return `We have only ${itemQuantityInStock} items in stock`
        }
    }

    function getItem(item) {
        return {
            key: "" + itemId + colorId + userItemSize,
            cartItem: {
                itemId: itemId,
                itemSizeId: itemQuantity.find((size) => size.size === userItemSize).size_id,
                itemColorId: colorId,
                quantity: userItemQuantity * 1,
                name: item.name,
                color: itemColors.filter((color) => {
                    return color.color_id === parseInt(colorId)
                }).shift().color,
                size: userItemSize,
                price: item.price * 1,
                maxQuantity: itemQuantityInStock
            }
        }
    }

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    if (isLoading) {
        return (
            <div className="container">
                <div className="item-container">
                    <ImageSlider
                        itemId={itemId}
                        colorId={colorId}
                        photoIds={filteredPhotos.shift().photo_ids} />
                    <div className="item-container-with-error">
                        <ItemInformation
                            itemId={itemId}
                            item={item}
                            itemSizes={itemQuantity}
                            itemColors={itemColors}
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
                            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={props.snackbarState.isOpen} autoHideDuration={6000} onClose={props.handleSnackbarClose}>
                                <Alert onClose={props.handleSnackbarClose} severity={props.snackbarState.messageType}>
                                    {props.snackbarState.limitReached === true ? generateErrorMessage() : "Item added successfully!"}
                                </Alert>
                            </Snackbar>
                        </div>
                    </div>
                </div>
                <div className="recommended-items-container">
                    <div className="recommended-items">
                        {filteredItems.map((item) => {
                            return (
                                <ReccomendedItem
                                    key={item.product_id}
                                    item={item}
                                    sizeId={item.size_id}
                                    colorId={item.product_color_id} />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    } else if (showError) {
        return (
            <ErrorPage
                message={ERROR_MESSAGE_ITEM} />
        )
    } else {
        return (
            <div className="loader-wrapper">
                <img className="loader" src={require("../../loaders/colored_loader.gif").default} height="150px" width="150px" alt="" />
            </div>
        );
    }
}

export default ItemContainer
