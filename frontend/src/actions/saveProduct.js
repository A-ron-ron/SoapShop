import Axios from 'axios';
import { PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL} from '../constants/productConstants';

const saveProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch ({ type: PRODUCT_SAVE_REQUEST, payload: product });
        const { userSignin: { userInfo }} = getState();
        if (!product._id){
        const { data } = await Axios.post('/api/stockmanage', product, { 
            headers: { 
            'Authorization': 'Bearer' + userInfo.token
              } 
            });
            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
        } else {
            const { data } = await Axios.put('/api/stockmanage/' + product._id, product, { 
                headers: { 
                'Authorization': 'Bearer' + userInfo.token
                  } 
                });
            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
        }
    }
    catch (error) {
        dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
    }
}

export default saveProduct