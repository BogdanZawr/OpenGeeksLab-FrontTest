
import * as types from '../constants/action-types';

const initialState = {
    all: [],
    tree: [],
    nestedList: [],
    deleteSucsses: false,
    badReqestsCategoryCreate: [],
    badReqestCategoryUpdate: [],
    badReqestsCategoryDelete: [],
    badReqNeasted: [],
};
    
const Categorys = (state = initialState, action) => {

    function treeRemodeling(action, idOfUpdateCat) {
        let tree = [];
        let categoryes = action;
        let categoryesIndexId = {};

        for (let i = 0; i < categoryes.length; i++) {
            categoryes[i].children = [];

            if (idOfUpdateCat === categoryes[i]._id) {
                categoryes[i].renderUpdate = !categoryes[i].renderUpdate;
            } else { categoryes[i].renderUpdate = false; }

            if (!categoryes[i].parentId) {
                tree.push(categoryes[i]);
            }
            
            const id = categoryes[i]._id;
            categoryesIndexId[id] = categoryes[i];
        }

        for (let i = 0; i < categoryes.length; i++) {
            if (categoryes[i].parentId) {
                if (categoryesIndexId[categoryes[i].parentId]) {
                    categoryesIndexId[categoryes[i].parentId].children.push(categoryes[i]);
                }
            }
        }

        return tree;
    }

    switch (action.type) {

    case (types.CLEAR_STORE): {
        return {
            ...state,
            badReqestsCategoryCreate: [],
            badReqNeasted: [],
        };
    }

    case (types.BAD_NEASTED): {
        return {
            ...state,
            badReqNeasted: action.message.data,
        };
    }

    case (types.BAD_DELETE): {
        return {
            ...state,
            badReqestsCategoryDelete: action.message.data,
        };
    }

    case (types.RENDER_UPDATE): {
        return {
            ...state,
            tree: treeRemodeling([...state.all], action.id)
        };
    }

    case (types.BAD_REQEST_CREATECATEGORY): {
        return {
            ...state,
            badReqestsCategoryCreate: action.response.data
        };
    }

    case (types.BAD_REQEST_UPDATECATEGORY): {
        return {
            ...state,
            badReqestCategoryUpdate: action.response.data,
        };
    }
        
    case (types.GET_CATEGORYS): {
        return { ...state, 
            all: action.allCategory.data,
            tree: treeRemodeling(action.allCategory.data)
        };
    }
    
    case (types.GET_NESTEDCATEGORYS): {
        return { ...state, 
            nestedList: action.nestedCategoriesList
        };
    }
    
    case (types.ADD_CATEGORY): {
        const allCategorys = [...state.all, action.newCategory];
        return { 
            ...state,
            all: allCategorys,
            tree: treeRemodeling(allCategorys)
        };
    }
    
    case (types.UPDATE_CATEGORY): {
        let allCategorys = [...state.all];
        for (let i = 0; i < allCategorys.length; i++) {
            if (allCategorys[i]._id === action.category._id) {
                allCategorys.splice(i, 1, action.category);
                break;
            }
        }

        return { 
            ...state,
            all: allCategorys,
            tree: treeRemodeling(allCategorys, action.category._id)
        };
    }
    
    case (types.DELETE_CATEGORY): {
        let allCategorys = [...state.all];
        let deleteIndex = -1;
    
        for (let i = 0; i < allCategorys.length; i++) {
            if (allCategorys[i]._id === action.idCategoryToDelete) {
                deleteIndex = i;
                break;
            }
        }
    
        if (~deleteIndex) {
            allCategorys.splice(deleteIndex, 1);
        }
    
        return { 
            ...state,
            all: allCategorys,
            tree: treeRemodeling(allCategorys),
            deleteSucsses: true,
        };
    }
    default:
        return state;
    }
};
        
export default Categorys;
        