import * as types from '../constants/action-types';

const initialState = {
    categoryArticles: [],
    articleToUpdate: {},
    badResponseGetById: [],
    badResponseUpdate: [],
    badResponseCreate: [],
    badResponseDelete: [],
    badResponseGetArrByCategory: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

    case (types.BAD_RESPONSE_ARTICLEBYID): {
        return {
            ...state,
            badResponseGetById: action.data
        };
    }

    case (types.BAD_RESPONSE_UPDATE): {
        return{
            ...state,
            badResponseUpdate: action.data,
        };
    }

    case (types.BAD_RESPONSE_DELETE): {
        return {
            ...state,
            badResponseDelete: action.data,
        };
    }

    case(types.BAD_RESPONSE_GETARRBYCATEGORY): {
        return {
            ...state,
            badResponseGetArrByCategory: action.data
        };
    }

    case(types.BAD_RESPONSE_CREATE): {
        return {
            ...state,
            badResponseCreate: action.data
        };
    }

    case (types.ADD_UPDATEARTICLE): {
        return { ...state, articleToUpdate: action.article};
    }
    
    
    case (types.ADD_NEWARTICLE): {
        return {
            ...state,
            categoryArticles: [...state.categoryArticles, action.article]
        };
    }

    case (types.GET_ARTICLE): {
        return {
            ...state,
            categoryArticles: action.article
        };
    }

    case (types.DELETE_ARTICLE): {
        let categoryArticles = [...state.categoryArticles];
        let deleteIndex = -1;

        for (let i = 0; i < categoryArticles.length; i++) {
            if (categoryArticles[i]._id === action.id) {
                deleteIndex = i;
                break;
            }
        }

        if (~deleteIndex) {
            categoryArticles.splice(deleteIndex, 1);
        }

        return {
            ...state,
            categoryArticles: categoryArticles
        };
    }

    case (types.ADD_UPDATEDARTICLE): {
        let categoryArticles = [...state.categoryArticles];
        for (let i = 0; i < categoryArticles.length; i++) {
            if (categoryArticles[i]._id === action.article._id) {
                categoryArticles.splice(i, 1, action.article);
                break;
            }
        }
        return {
            ...state,
            categoryArticles: categoryArticles
        };
    }

    default:
        return state;
    }
};

export default rootReducer;

