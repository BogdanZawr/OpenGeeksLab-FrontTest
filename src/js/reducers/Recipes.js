import * as types from '../constants/action-types';

const initialState = {
    categoryRecipe: [],
    recipeById: {},
    badResponseUpdate: [],
    badResponseGetById: [],
    badResponseDelete: [],
    badResponseCreate: [],
    badResponseGetByCategory: [],
};

const Recipes = (state = initialState, action) => {
    switch (action.type) {

    case (types.BAD_RESPONSE_UPDATE_RECIPE): {
        return {
            ...state,
            badResponseUpdate: action.data
        };
    }

    case (types.BAD_RESPONSE_GETRECIPE_BYCATEGORY): {
        return {
            ...state,
            badResponseGetByCategory: action.data,
        };
    }

    case (types.BAD_RESPONSE_GET_RECIPEBYID): {
        return {
            ...state,
            badResponseGetById: action.data,
        };
    }

    case (types.BAD_RESPONSE_DELETE_RECIPE): {
        return {
            ...state,
            badResponseDelete: action.data,
        };
    }

    case(types.BAD_RESPONSE_CREATE_RECIPE): {
        return {
            ...state,
            badResponseCreate: action.data
        };
    }

    case (types.ADD_RECIPE): {
        return {
            ...state,
            categoryRecipe:  [...state.categoryRecipe, action.recipe]
        };
    }

    case (types.GET_RECIPE): {
        return {
            ...state,
            recipeById: action.recipe
        };
    }

    case (types.GET_ALLRECIPE): {
        return {
            ...state,
            categoryRecipe: action.categoryRecipe
        };
    }

    case (types.UPDATE_RECIPE): {
        let categoryRecipe = [...state.categoryRecipe];
        
        for (let i = 0; i < categoryRecipe.length; i++) {
            if (categoryRecipe[i]._id === action.recipe._id) {
                categoryRecipe.splice(i, 1, action.recipe);
                break;
            }
        }

        return {
            ...state,
            categoryRecipe: categoryRecipe
        };
    }

    case (types.DELETE_RECIPE): {
        let categoryRecipe = [...state.categoryRecipe];
        let deleteIndex = -1;

        for (let i = 0; i < categoryRecipe.length; i++) {
            if (categoryRecipe[i]._id === action.idRecipe) {
                deleteIndex = i;
                break;
            }
        }
        if (~deleteIndex) {
            categoryRecipe.splice(deleteIndex, 1);
        }  
        return {
            ...state,
            categoryRecipe: categoryRecipe
        };
    }

    default:
        return state;
    }
};

export default Recipes;

