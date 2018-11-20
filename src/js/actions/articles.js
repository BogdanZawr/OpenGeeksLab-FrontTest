import { 
    GET_ARTICLE,
    ADD_NEWARTICLE,
    DELETE_ARTICLE,
    ADD_UPDATEARTICLE,
    ADD_UPDATEDARTICLE,
    BAD_RESPONSE_ARTICLEBYID,
    BAD_RESPONSE_UPDATE,
    BAD_RESPONSE_CREATE,
    BAD_RESPONSE_DELETE,
    BAD_RESPONSE_GETARRBYCATEGORY,
} from '../constants/action-types';
import { push } from 'react-router-redux';
import axios from 'axios';
import { SERVER_URL } from '../Constants';

const currentUrl = SERVER_URL + '/api/v1/';

export const getCategoryArticle = response => ({
    type: GET_ARTICLE,
    article: response,
});

export const AddArticle = response => ({
    type: ADD_NEWARTICLE,
    article: response,
});

export const deleteArticle = id => ({
    type: DELETE_ARTICLE,
    id: id,
});

export const articleToUpdate = response => ({
    type: ADD_UPDATEARTICLE,
    article: response,
});

export const addNewArticle = response => ({
    type: ADD_UPDATEDARTICLE,
    article: response,
});

export const badResponseGerById = data => ({
    type: BAD_RESPONSE_ARTICLEBYID,
    data,
});

export const badResponseUpdate = data => ({
    type: BAD_RESPONSE_UPDATE,
    data,
});

export const badResponseCreate = data => ({
    type: BAD_RESPONSE_CREATE,
    data,
});

export const badResponseDelete = data => ({
    type: BAD_RESPONSE_DELETE,
    data,
});

export const badResponseGetArrByCategory = data => ({
    type: BAD_RESPONSE_GETARRBYCATEGORY,
    data,
});

export function asyncGetArticleById(id) {
    return (dispatch) => {
        axios.get(`${currentUrl}article/item/${id}`)
            .then(response => {
                dispatch(articleToUpdate(response.data));
            })
            .catch((err) => {
                dispatch(badResponseGerById(err.response.data));
            });
    };
}

export function asyncUpdateArticle(params, pageId) {
    return (dispatch) => {
        axios.put(`${currentUrl}article/update`, params)
            .then(response => {
                dispatch(addNewArticle(response.data));
                dispatch(push(`/Category/${pageId}/Content`));
            })
            .catch((err) => {
                dispatch(badResponseUpdate(err.response.data));
            });
    };
}

export function asyncDeleteArticle(id) {
    return (dispatch) => {
        axios.delete(`${currentUrl}article/${id}`)
            .then(() => {
                dispatch(deleteArticle(id));
            })
            .catch((err) => {
                dispatch(badResponseDelete(err.response.data));
            });
    };
}

export function addArticleToDispatch(params) {
    return (dispatch) => {
        axios.post(`${currentUrl}article/create`, params)
            .then(response => {
                dispatch(AddArticle(response.data));
                dispatch(push(`/Category/${params.categoryId}/Content`));
            })
            .catch((err) => {
                dispatch(badResponseCreate(err.response.data));
            });
    };
}

export function asyncGetCategoryArticle(id) {
    return (dispatch) => {
        axios.get(`${currentUrl}article/byCategory/${id}`)
            .then(response => {
                dispatch(getCategoryArticle(response.data));
            })
            .catch((err) => {
                dispatch(badResponseGetArrByCategory(err.response.data));
            });
    };
}
