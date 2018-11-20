// import * as types from '../constants/action-types';

// const initialState = {
//     allCategorys: [],
//     tree: [],
//     categoryRecipe: [],
//     recipeById: {},
//     categoryArticles: [],
//     articleToUpdate: {},
//     nestedCategoriesList: [],
// };

// const rootReducer = (state = initialState, action) => {
//     function treeRemodeling(action) {
//         let tree = [];
//         let childrenCategoryes = [];

//         for (let i = 0; i < action.length; i++) {
//             if (action[i].parentId === null ) {
//                 tree.push(action[i]);
//             } else {
//                 childrenCategoryes.push(action[i]);
//             }
//         }

//         treeBuild(tree);

//         function treeBuild(categorys) {
//             for (let i = 0; i < categorys.length; i++) {
//                 let childArr = [];

//                 for (let j = 0; j < childrenCategoryes.length; j++) {
//                     if (categorys[i]._id === childrenCategoryes[j].parentId) {
//                         childArr.push(childrenCategoryes[j]);
//                     }
//                 }

//                 categorys[i].children = childArr;
//                 treeBuild(childArr);
//             }
//         }

//         return tree;
//     }
  

//     switch (action.type) {
//     case (types.GET_CATEGORYS): {
//         return { ...state, allCategorys: action.allCategory, tree: treeRemodeling(action.allCategory) };
//     }
//     case (types.ADD_RECIPE): {
//         return { ...state, categoryRecipe:  [...state.categoryRecipe, action.recipe]};
//     }

//     case (types.ADD_UPDATEARTICLE): {
//         return { ...state, articleToUpdate: action.article};
//     }

//     case (types.GET_NESTEDCATEGORYS): {
//         return { ...state, nestedCategoriesList: action.nestedCategoriesList };
//     }

//     case (types.GET_ALLRECIPE): {
//         return { ...state, categoryRecipe: action.categoryRecipe };
//     }

//     case (types.UPDATE_RECIPE): {
//         let categoryRecipe = [...state.categoryRecipe];
        
//         for (let i = 0; i < categoryRecipe.length; i++) {
//             if (categoryRecipe[i]._id === action.recipe._id) {
//                 categoryRecipe.splice(i, 1, action.recipe);
//                 break;
//             }
//         }

//         return { ...state, categoryRecipe: categoryRecipe };
//     }

//     case (types.ADD_CATEGORY): {
//         let allCategorys = [...state.allCategorys];
//         allCategorys.push(action.newCategory);
//         return { ...state, allCategorys: allCategorys, tree: treeRemodeling(allCategorys) };
//     }

//     case (types.DELETE_ARTICLE): {
//         let categoryArticles = [...state.categoryArticles];
//         let deleteIndex = -1;

//         for (let i = 0; i < categoryArticles.length; i++) {
//             if (categoryArticles[i]._id === action.id) {
//                 deleteIndex = i;
//             }
//         }

//         if (~deleteIndex) {
//             categoryArticles.splice(deleteIndex, 1);
//         }

//         return { ...state, categoryArticles: categoryArticles };
//     }

//     case (types.ADD_NEWARTICLE): {
//         let categoryArticles = [...state.categoryArticles];
//         categoryArticles.push(action.article);
//         return { ...state, categoryArticles: categoryArticles };
//     }

//     case (types.GET_RECIPE): {
//         return { ...state, recipeById: action.recipe};
//     }

//     case (types.GET_ARTICLE): {
//         return { ...state, categoryArticles: action.article };
//     }

//     case (types.UPDATE_CATEGORY): {
//         let allCategorys = [...state.allCategorys];
//         allCategorys.find((element) => {
//             if (element._id === action.category._id) {
//                 return action.category;
//             } else { return element; }
//         });
//         return { ...state, allCategorys: allCategorys, tree: treeRemodeling(allCategorys) };
//     }

//     case (types.ADD_UPDATEDARTICLE): {
//         let categoryArticles = [...state.categoryArticles];
//         for (let i = 0; i < categoryArticles.length; i++) {
//             if (categoryArticles[i]._id === action.article._id) {
//                 categoryArticles.splice(i, 1, action.article);
//             }
//         }
//         return { ...state, categoryArticles: categoryArticles };
//     }

//     case (types.DELETE_RECIPE): {
//         let categoryRecipe = [...state.categoryRecipe];
//         let deleteIndex = null;
//         let isDelete = false;
//         for (let i = 0; i < categoryRecipe.length; i++) {
//             if (categoryRecipe[i]._id === action.idRecipe) {
//                 deleteIndex = i;
//                 isDelete = !isDelete;
//             }
//         }
//         if (isDelete) {
//             categoryRecipe.splice(deleteIndex, 1);
//         }  
//         return {...state, categoryRecipe: categoryRecipe};
//     }

//     case (types.DELETE_CATEGORY): {
//         let allCategorys = [...state.allCategorys];
//         let deleteIndex = null;
//         let isDelete = false;
//         for (let i = 0; i < allCategorys.length; i++) {
//             if (allCategorys[i]._id === action.idCategoryToDelete) {
//                 deleteIndex = i;
//                 isDelete = !isDelete;
//             }
//         }
//         if (isDelete) {
//             allCategorys.splice(deleteIndex, 1);
//         }  
//         return { ...state, allCategorys: allCategorys, tree: treeRemodeling(allCategorys) };
//     }

//     case (types.ADD_ARTICLE):
//         return { ...state, articles: [...state.articles, action.payload] };
//     default:
//         return state;
//     }
// };

// export default rootReducer;

