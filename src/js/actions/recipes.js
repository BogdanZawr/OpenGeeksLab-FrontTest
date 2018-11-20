import { 
    GET_ALLRECIPE,
    DELETE_RECIPE,
    ADD_RECIPE,
    GET_RECIPE,
    UPDATE_RECIPE,
    BAD_RESPONSE_UPDATE_RECIPE,
    BAD_RESPONSE_GET_RECIPEBYID,
    BAD_RESPONSE_DELETE_RECIPE,
    BAD_RESPONSE_CREATE_RECIPE,
    BAD_RESPONSE_GETRECIPE_BYCATEGORY,
} from '../constants/action-types';
import { push } from 'react-router-redux';
import axios from 'axios';
import { SERVER_URL } from '../Constants';

const currentUrl = SERVER_URL + '/api/v1/';

export const getAllRecepts = response => ({
    type: GET_ALLRECIPE,
    categoryRecipe: response,
});

export const deleteRecipe = id => ({  
    type: DELETE_RECIPE,
    idRecipe: id,
});

export const addRecipe = recipe => ({
    type: ADD_RECIPE,
    recipe,
});

export const getRecipeById = response => ({
    type: GET_RECIPE,
    recipe: response,
});

export const updateRecipe = response => ({
    type: UPDATE_RECIPE,
    recipe: response,
});

export const badResponseUpdate = data => ({
    type: BAD_RESPONSE_UPDATE_RECIPE,
    data,
});

export const badResponseGetById = data => ({
    type: BAD_RESPONSE_GET_RECIPEBYID,
    data,
});

export const badResponseDelete = data => ({
    type: BAD_RESPONSE_DELETE_RECIPE,
    data,
});

export const badResponseCreate = data => ({
    type: BAD_RESPONSE_CREATE_RECIPE,
    data,
});

export const badResponseGetByCategory = data => ({
    type: BAD_RESPONSE_GETRECIPE_BYCATEGORY,
    data,
});

export function asyncUpdateRecipe(params, pageId) {
    return (dispatch) => {
        axios.put(`${currentUrl}recipe/update`, params)
            .then(response => {
                dispatch(updateRecipe(response.data));
                dispatch(push(`/Category/${pageId}/Content`));
            })
            .catch((err) => {
                dispatch(badResponseUpdate(err.response.data));
            });
    };
}

export function asyncGetRecipeById(id) {
    return (dispatch) => {
        axios.get(`${currentUrl}recipe/item/${id}`)
            .then(response => {
                dispatch(getRecipeById(response.data));
            })
            .catch((err) => {
                dispatch(badResponseGetById(err.response.data));
            });
    };
}

export function asyncDeleteRecipe(id) {
    return (dispatch) => {
        axios.delete(`${currentUrl}recipe/${id}`)
            .then(() => {
                dispatch(deleteRecipe(id));
            })
            .catch((err) => {
                dispatch(badResponseDelete(err.response.data));
            });
    };
}

export function asyncAddRecipe(categoryId, title, text) {
    return (dispatch) => {
        axios.post(`${currentUrl}recipe/create`,
            {
                title,
                text,
                categoryId,
            })
            .then(response => {
                dispatch(addRecipe(response.data));
                dispatch(push(`/Category/${categoryId}/Content`));
            })
            .catch((err) => {
                dispatch(badResponseCreate(err.response.data));
            });
    };
}

export function asyncGetCategoryRecept(idCategory) {
    return (dispatch) => {
        axios.get(`${currentUrl}recipe/byCategory/${idCategory}`)
            .then(response => {
                dispatch(getAllRecepts(response.data));
            })
            .catch((err) => {
                dispatch(badResponseGetByCategory(err.response.data));
            });
    };
}