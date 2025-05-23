import { current } from "@reduxjs/toolkit";
import api from "../../api/api";
import { validateProduct } from "@/utils/validation";

export const fetchProducts = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/public/products?${queryString}`);
    dispatch({
      type: "FETCH_PRODUCTS",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch products",
    });
  }
};
export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: "CATEGORY_LOADER" });
    const { data } = await api.get(`/public/categories`);
    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "CATEGORY_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch categories",
    });
  }
};

export const addToCart =
  (data, qty = 1, toast) =>
  (dispatch, getState) => {
    const { products } = getState().products;
    const getProduct = products.find(
      (product) => product.productId === data.productId
    );

    const inStock = getProduct.quantity >= qty;

    if (inStock) {
      dispatch({ type: "ADD_CART", payload: { ...data, quantity: qty } });
      toast.success(`${data?.productName} added to the cart`);
      localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } else {
      toast.error("Out of stock");
    }
  };

export const increaseCartQuantity =
  (data, toast, currentQuantity, setCurrentQuantity) =>
  (dispatch, getState) => {
    const { products } = getState().products;
    const getProduct = products.find(
      (product) => product.productId === data.productId
    );

    const qtyExist = getProduct.quantity >= currentQuantity + 1;
    if (qtyExist) {
      const newQuantity = currentQuantity + 1;
      setCurrentQuantity(newQuantity);
      dispatch({
        type: "ADD_CART",
        payload: { ...data, quantity: newQuantity },
      });
      localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } else {
      toast.error("Quantity reached to limit");
    }
  };

export const decreaseCartQuantity =
  (data, newQuantity) => (dispatch, getState) => {
    dispatch({
      type: "ADD_CART",
      payload: { ...data, quantity: newQuantity },
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
  };

export const removeFromCart = (data, toast) => (dispatch, getState) => {
  dispatch({ type: "REMOVE_CART", payload: data });
  toast.success(`${data.productName} removed from cart`);
  localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
};

export const authenticateSignInUser =
  (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      const { data } = await api.post("/auth/signin", sendData);
      dispatch({ type: "LOGIN_USER", payload: data });
      localStorage.setItem("auth", JSON.stringify(data));
      reset();
      toast.success("Login Success");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.mesage || "Internal Server Error");
    } finally {
      setLoader(false);
    }
  };

export const registerNewUser =
  (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      const { data } = await api.post("/auth/signup", sendData);
      reset();
      toast.success(data?.message || "User registered successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
      setLoader(false);
    }
  };

export const logoutUser = (navigate) => (dispatch) => {
  dispatch({ type: "LOG_OUT" });
  localStorage.removeItem("auth");
  navigate("/login");
};

export const addUpdateUserAddress =
  (sendData, toast, addressId, setOpenAddressModal) =>
  async (dispatch, getState) => {
    dispatch({ type: "BUTTON_LOADER" });
    try {
      if (addressId) {
        const { data } = await api.put(`/addresses/${addressId}`, sendData);
      } else {
        const { data } = await api.post("/addresses", sendData);
      }
      dispatch(getUserAddresses());
      toast.success("Address saved successfully");
      dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Internal Server Error");
      dispatch({ type: "IS_ERROR", payload: null });
    } finally {
      setOpenAddressModal(false);
    }
  };

export const getUserAddresses = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/users/addresses`);
    dispatch({
      type: "USER_ADDRESS",
      payload: data,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message || "Failed to fetch user addresses",
    });
  }
};

export const selectUserAddress = (address) => {
  localStorage.setItem("CHECKOUT_ADDRESS", JSON.stringify(address));
  return {
    type: "SELECT_ADDRESS",
    payload: address,
  };
};

export const clearCheckoutAddress = () => {
  return {
    type: "REMOVE_SELECTED_ADDRESS",
  };
};

export const deleteUserAddress =
  (toast, addressId, setOpenDeleteModal) => async (dispatch, getState) => {
    try {
      dispatch({ type: "BUTTON_LOADER" });
      await api.delete(`/addresses/${addressId}`);
      dispatch({ type: "IS_SUCCESS" });
      dispatch(getUserAddresses());
      clearCheckoutAddress();
      toast.success("Address deleted successfully");
    } catch (error) {
      dispatch({
        type: "IS_ERROR",
        payload: error?.response?.data?.message || "Some Error Occured",
      });
    } finally {
      setOpenDeleteModal(false);
    }
  };

export const addPaymentMethod = (method) => {
  return {
    type: "ADD_PAYMENT_METHOD",
    payload: method,
  };
};

export const createUserCart = (sendCartItems) => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    await api.post("/carts/create", sendCartItems);
    await dispatch(getUserCart());
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to create cart items",
    });
  }
};

export const getUserCart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/carts/users/cart`);
    dispatch({
      type: "GET_USER_CART_PRODUCTS",
      payload: data.products,
      totalPrice: data.totalPrice,
      cartId: data.cartId,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch cart items.",
    });
  }
};

export const createStripePaymentSecret =
  (totalPrice, toast) => async (dispatch, getState) => {
    try {
      dispatch({ type: "IS_FETCHING" });
      const { data } = await api.post("/order/stripe-client-secret", {
        amount: Number(totalPrice) * 100,
        currency: "usd",
      });
      dispatch({ type: "CLIENT_SECRET", payload: data });
      dispatch({ type: "IS_SUCCESS" });
      localStorage.setItem("client-secret", JSON.stringify(data));
    } catch (error) {
      toast.error("Failed to create client secret.");
    }
  };

export const stripePaymentConfirmation =
  (sendData, setErrorMessage, setLoading, toast) =>
  async (dispatch, getState) => {
    try {
      const response = await api.post("/order/users/payments/online", sendData);
      if (response.data) {
        localStorage.removeItem("cartItems");
        localStorage.removeItem("CHECKOUT_ADDRESS");
        localStorage.removeItem("client-secret");
        dispatch({ type: "REMOVE_CLIENT_SECRET_ADDRESS" });
        dispatch({ type: "CLEAR_CART" });
        toast.success("Order Accepted!");
      } else {
        setErrorMessage("Payment failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Payment failed. Please try again.");
    }
  };

export const getProductsRecommendation =
  (sendData, toast) => async (dispatch, getState) => {
    try {
      dispatch({ type: "IS_FETCHING" });
      const response = await api.post("/recommendations", sendData);
      if (response.data) {
        dispatch({ type: "IS_SUCCESS" });
        return response.data;
      } else {
        dispatch({
          type: "IS_ERROR",
          payload: "Failed to generate recommendations.",
        });
        toast.error("Failed to generate recommendations.");
      }
    } catch (error) {
      dispatch({
        type: "IS_ERROR",
        payload: "Failed to generate recommendations.",
      });
    }
  };

export const updateUser = (data) => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const response = await api.put("/auth/user", data);
    if (response.data) {
      dispatch({ type: "IS_SUCCESS" });
      dispatch({ type: "LOGIN_USER", payload: response.data });
      localStorage.setItem("auth", JSON.stringify(response.data));
      return data;
    }
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to update info.",
    });
  }
};

export const getUserOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/orders`);
    dispatch({
      type: "FETCH_ORDERS",
      payload: data.content,
      // pageNumber: data.pageNumber,
      // pageSize: data.pageSize,
      // totalElements: data.totalElements,
      // totalPages: data.totalPages,
      // lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch orders.",
    });
  }
};

export const getOrderById = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/orders/${orderId}`);
    dispatch({ type: "IS_SUCCESS" });
    return data;
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch order.",
    });
  }
};

export const getAddressById = (addressId) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/addresses/${addressId}`);
    dispatch({ type: "IS_SUCCESS" });
    return data;
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch address.",
    });
  }
};

export const addNewProduct =
  (newProduct, categoryId, toast) => async (dispatch, getState) => {
    try {
      dispatch({ type: "IS_FETCHING" });
      validateProduct(newProduct, categoryId);
      const response = await api.post(
        `/seller/categories/${categoryId}/product`,
        newProduct
      );
      await dispatch(fetchSellerProducts());
      dispatch({ type: "IS_SUCCESS" });
      toast.success("Product added successfully");
      return response;
    } catch (error) {
      let errorMessage;

      const responseData = error?.response?.data;

      if (
        responseData &&
        typeof responseData === "object" &&
        !Array.isArray(responseData)
      ) {
        const firstKey = Object.keys(responseData)[0];
        errorMessage = `${firstKey}: ${responseData[firstKey]}`;
      } else {
        errorMessage =
          responseData?.message || error.message || "Failed to create product";
      }

      dispatch({
        type: "IS_ERROR",
        payload: errorMessage,
      });

      toast.error(errorMessage);
      return null;
    }
  };

export const updateProductImage =
  (productId, image, toast) => async (dispatch) => {
    try {
      dispatch({ type: "IS_FETCHING" });

      const formData = new FormData();
      formData.append("image", image);

      await api.put(`/seller/products/${productId}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch({ type: "IS_SUCCESS" });
      return true;
    } catch (error) {
      let errorMessage;

      const responseData = error?.response?.data;

      if (
        responseData &&
        typeof responseData === "object" &&
        !Array.isArray(responseData)
      ) {
        const firstKey = Object.keys(responseData)[0];
        errorMessage = `${firstKey}: ${responseData[firstKey]}`;
      } else {
        errorMessage =
          responseData?.message ||
          error.message ||
          "Failed to update product image";
      }

      dispatch({
        type: "IS_ERROR",
        payload: errorMessage,
      });

      toast.error(errorMessage);
      return false;
    }
  };
export const fetchSellerProducts = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/seller/products?${queryString}`);
    dispatch({
      type: "FETCH_SELLER_PRODUCTS",
      payload: data,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch products",
    });
  }
};

export const updateProduct =
  (product, productId, toast) => async (dispatch) => {
    try {
      dispatch({ type: "IS_FETCHING" });
      const response = await api.put(`/seller/products/${productId}`, product);

      dispatch({ type: "IS_SUCCESS" });
      toast.success("Product updated successfully");
      await dispatch(fetchSellerProducts());

      return response;
    } catch (error) {
      let errorMessage;

      const responseData = error?.response?.data;

      if (
        responseData &&
        typeof responseData === "object" &&
        !Array.isArray(responseData)
      ) {
        const firstKey = Object.keys(responseData)[0];
        errorMessage = `${firstKey}: ${responseData[firstKey]}`;
      } else {
        errorMessage =
          responseData?.message || error.message || "Failed to update product";
      }

      dispatch({
        type: "IS_ERROR",
        payload: errorMessage,
      });

      toast.error(errorMessage);
      return false;
    }
  };

export const deleteProduct = (productId, toast) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const response = await api.put(
      `seller/products/${productId}/availability`,
      false,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: "IS_SUCCESS" });
    toast.success("Product deleted successfully");
    await dispatch(fetchSellerProducts());

    return response;
  } catch (error) {
    let errorMessage;

    const responseData = error?.response?.data;

    if (
      responseData &&
      typeof responseData === "object" &&
      !Array.isArray(responseData)
    ) {
      const firstKey = Object.keys(responseData)[0];
      errorMessage = `${firstKey}: ${responseData[firstKey]}`;
    } else {
      errorMessage =
        responseData?.message || error.message || "Failed to delete product";
    }

    dispatch({
      type: "IS_ERROR",
      payload: errorMessage,
    });

    toast.error(errorMessage);
    return false;
  }
};

export const fetchUser = () => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get("/auth/user");
    dispatch({ type: "LOGIN_USER", payload: data });
    localStorage.setItem("auth", JSON.stringify(data));
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({ type: "IS_ERROR" });
  }
};

export const fetchWeeklySales = () => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get("/seller/sales", {
      params: { pageSize: 7 },
    });
    dispatch({ type: "FETCH_RECENT_SALES", payload: data });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({ type: "IS_ERROR" });
  }
};

export const becomeSeller = (toast) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const response = await api.put("/auth/user/become-seller");
    dispatch({ type: "IS_SUCCESS" });
    dispatch({ type: "LOGIN_USER", payload: response.data });
    localStorage.setItem("auth", JSON.stringify(response.data));
    toast.success("You successfully became a seller");
  } catch (error) {
    toast.error("Unable to grant seller authorities.");
    dispatch({ type: "IS_ERROR" });
  }
};
