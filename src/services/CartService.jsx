// src/services/CartService.jsx
import axios from 'axios';
import authHeader from './AuthHeader';

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

export const addToCart = async (userId, productId, productSubtypeIdentifier, grindType, quantity, price) => {
    try {
        
        const response = await axios.post(`${BASE_URL}/cart`, {
            userId,
            product: {
                id: productId,
                subtypeIdentifier: productSubtypeIdentifier,
                grindType: grindType,
                quantity,
                price
            }},
            {
                headers: { ...authHeader()}
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error adding to cart', error);
        return error.response.data;
    }
};

export const getCart = async (userId) => {
    try {
        
        const response = await axios.get(`${BASE_URL}/cart/${userId}`, {
            headers: { ...authHeader()}
        });

        return response.data;

    } catch (error) {
        console.error('Error getting cart', error);
        return error.response.data;
    }
}

export const removeFromCart = async (userId, productSubtypeId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/cart/${userId}/${productSubtypeId}`, {
            headers: { ...authHeader()}
        });

        return response.data;
    } catch (error) {
        console.error('Error removing from cart', error);
        return error.response.data;
    }
}