import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishlist: [],
    cartData: [],
    isCartLink: false,
    coupons: [
        {
            id: 0,
            couponCode: 'BIGDAYS24',
            discountOf: '25',
        },
        {
            id: 1,
            couponCode: 'SEASONALSALE24',
            discountOf: '35',
        },
        {
            id: 2,
            couponCode: 'SUPRISEFRIDAY50',
            discountOf: '20',
        },
        {
            id: 3,
            couponCode: 'CLEARANCE50',
            discountOf: '15',
        },
    ]

}

export const userProducts = createSlice({
    name: 'userProducts',
    initialState,
    reducers: {
        setWishlistData: (state, action) => {
            const { data } = action.payload;
            state.wishlist = [...state.wishlist, data]
        },
        setCartData: (state, action) => {
            const { data } = action.payload;
            state.cartData = [...state.cartData, data]
        },
        removeCartItem: (state, action) => {
            const { id, clearCart } = action.payload;
            clearCart ?
                state.cartData = [] :
                state.cartData = state.cartData.filter((item) => item.id !== id)
        },
        setIsCartLink: (state, action) => {
            const { data } = action.payload;
            state.isCartLink = data;
        },
        updateQuantity: (state, action) => {
            const { id, change } = action.payload;
            state.cartData[id].quantity = state.cartData[id].quantity + change
            if (state.cartData[id].quantity >= 10) {
                state.cartData[id].quantity = 10
            }
            if (state.cartData[id].quantity <= 0) {
                state.cartData[id].quantity = 1
            }

        },
        removeWishListiItem: (state, action) => {
            const { id } = action.payload;
            state.wishlist = state.wishlist.filter((item) => item.id !== id)
        },

    }

})

export const { setWishlistData, setCartData, setIsCartLink, removeCartItem, updateQuantity, removeWishListiItem } = userProducts.actions

export const wishlistSelector = createSelector(
    (state) => state.UserProducts,
    (UserProducts) => UserProducts.wishlist
);

export const cartDataSelector = createSelector(
    (state) => state.UserProducts,
    (UserProducts) => UserProducts.cartData
);

export const isCartLinkSelector = createSelector(
    (state) => state.UserProducts,
    (UserProducts) => UserProducts.isCartLink
);

export const couponsSelector = createSelector(
    (state) => state.UserProducts,
    (UserProducts) => UserProducts.coupons
);

export default userProducts.reducer