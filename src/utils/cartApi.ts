import axiosClient from './axiosClient';

const addToCart = (userId: string, item: any) => 
  axiosClient.post(`/api/cart/${userId}`, { item });

const getUserCartItems = (userId: string) => 
  axiosClient.get(`/api/cart/${userId}`);

const deleteCartItem = (userId: string, itemId: string) => 
  axiosClient.delete(`/api/cart/${userId}/${itemId}`);

export default {
  addToCart,
  getUserCartItems,
  deleteCartItem,
}