import { 
    GET_CATEGORYS,
    ADD_CATEGORY,
    DELETE_CATEGORY,
    UPDATE_CATEGORY,
    GET_NESTEDCATEGORYS,
    BAD_REQEST_CREATECATEGORY,
    CLEAR_STORE,
    BAD_REQEST_UPDATECATEGORY,
    RENDER_UPDATE,
    CLEAR_BADREQ_UPDATE,
    BAD_NEASTED,
    BAD_GETALL,
    BAD_DELETE,
} from '../constants/action-types';

import { push } from 'react-router-redux';
import axios from 'axios';
import { SERVER_URL } from '../Constants';

const currentUrl = SERVER_URL + '/api/v1/';

export const getAllcategory = response => ({
    type: GET_CATEGORYS,
    allCategory: response,
});

export const addCategory = response => ({
    type: ADD_CATEGORY,
    newCategory: response,
});

export const deleteCategory = categoryId => ({
    type: DELETE_CATEGORY,
    idCategoryToDelete: categoryId,
});

export const updateCategory = response => ({
    type: UPDATE_CATEGORY,
    category: response,
});

export const nestedCategoriesList = response => ({
    type: GET_NESTEDCATEGORYS,
    nestedCategoriesList: response
});

export const badReqestCreate = response => ({
    type: BAD_REQEST_CREATECATEGORY,
    response,
});

export const badReqestUpdate = response => ({
    type: BAD_REQEST_UPDATECATEGORY,
    response,
});

export const clearStoreAlerts = toClear => ({
    type: CLEAR_STORE,
    toClear,
});

export const changeRenderUpdate = id => ({
    type: RENDER_UPDATE,
    id,
});

export const clearBadReqestUpdate = () => ({
    type: CLEAR_BADREQ_UPDATE,
});

export const badReqestNeasteg = (message) => ({
    type: BAD_NEASTED,
    message,
});

export const badReqestGetAll = (message) => ({
    type: BAD_GETALL,
    message,
});

export const badReqestDelete = (message) => ({
    type: BAD_DELETE,
    message,
});

export function asyncGetAllCategory() {
    return (dispatch) => {
        axios.get(`${currentUrl}category/all`)
            .then(response => {
                dispatch(getAllcategory(response));
            })
            .catch((err) => {
                dispatch(badReqestGetAll(err.response));
            });
    };
}

export function asyncNestedCategoriesListByRecipe(id) {
    return (dispatch) => {
        axios.get(`${currentUrl}recipe/categoryList/${id}`)
            .then(response => {
                dispatch(nestedCategoriesList(response.data));
            })
            .catch((err) => {
                dispatch(badReqestNeasteg(err.response));
            });
    };
}

export function asyncNestedCategoriesListByArticle(id) {
    return (dispatch) => {
        axios.get(`${currentUrl}article/categoryList/${id}`)
            .then(response => {
                dispatch(nestedCategoriesList(response.data));
            })
            .catch((err) => {
                dispatch(badReqestNeasteg(err.response));
            });
    };
}

export function asyncDeleteCategory(categoryId) {
    return (dispatch) => {
        axios.delete(`${currentUrl}category/${categoryId}`)
            .then(() => {
                dispatch(deleteCategory(categoryId));
                dispatch(push('/'));
            })
            .catch((err) => {
                dispatch(badReqestDelete(err.response));
            });
    };
}

export function asyncNestedCategoriesList(id) {
    return (dispatch) => {
        axios(`${currentUrl}category/categoryList/${id}`)
            .then(response => {
                dispatch(nestedCategoriesList(response.data));
            })
            .catch((err) => {
                dispatch(badReqestNeasteg(err.response));
            });
    };
}

export function asyncUpdateCategory(params) {
    return (dispatch) => {
        axios.put(`${currentUrl}category/update`,
            {
                '_id':params._id,
                'title':params.title,
                'parentId':params.parentId,
            })
            .then(() => {
                dispatch(updateCategory(params));
                dispatch(changeRenderUpdate(params._id));
            })
            .catch((err) => {
                dispatch(badReqestUpdate(err.response));
            });
    };
}

export function asyncAddCategory(title, parentId) {
    return (dispatch) => {
        axios.post(`${currentUrl}category/create`,
            {
                'title':title,
                'parentId':parentId
            })
            .then(response => {
                dispatch(addCategory(response.data));
            })
            .catch((err) => {
                dispatch(badReqestCreate(err.response));
            });
    };
}
