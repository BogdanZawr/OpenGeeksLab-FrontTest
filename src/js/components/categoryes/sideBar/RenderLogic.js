import React from 'react';
import { connect } from 'react-redux';
import { asyncUpdateCategory, changeRenderUpdate, clearBadReqestUpdate, asyncDeleteCategory } from '../../../actions/categoryes';
import NewCategoryForm from './NewCategoryForm';
import ListItem from './ListItem';
import ModalLogic from '../../ModalLogic';
import ModalDelete from '../../ModalDelete';

const mapStateToProps = state => ({
    state,
});

const mapDispatchToProps = dispatch => {
    return {
        updateCategory: (params) => {
            dispatch(asyncUpdateCategory(params));
        },
        changeRenderUpdate: (id) => {
            dispatch(changeRenderUpdate(id));
        },
        clearBadReqestUpdate: () => {
            dispatch(clearBadReqestUpdate());
        },
        deleteCategory: (currentId) => {
            dispatch(asyncDeleteCategory(currentId));
        },
    };
};

class RenderLogic extends React.Component {
    state = {
        updateFormRender: false,
        titleEmptyAlert: '',
        titleToLongAlert: '',
        modal: false,
    }

    updateCategoryToDispatch = (e) => {
        e.preventDefault();

        let parentId = e.target.parentId.value;
        const maxTitleLength = 30;
        if (parentId === 'null') {
            parentId = null;
        }
        if (e.target.title.value === '') {
            this.setState ({ titleEmptyAlert: 'Title should not be empty ' });
        } else if (e.target.title.value.length > maxTitleLength) {
            this.setState ({ titleToLongAlert: 'Title cannot be more than '+ maxTitleLength + ' characters ' });
        } else {
            this.props.updateCategory({
                '_id': this.props.currentCategory._id,
                'title': e.target.title.value,
                'parentId': parentId,
            });
        }
    }

    renderModal = () => {
        this.setState ({
            modal: !this.state.modal,
        });
    }

    deleteCategoryToDispatch = () => {
        let currentId = this.props.currentCategory._id;
        this.props.deleteCategory(currentId);
    }

    clearBadReqestUpdate = () => {
        this.props.clearBadReqestUpdate();
    }

    updateRenderFlag = () => {
        this.props.changeRenderUpdate(this.props.currentCategory._id);
        this.setState ({
            titleEmptyAlert: '',
            titleToLongAlert: '',
        });
    }

    render() {
        const { currentCategory } = this.props;
        return (
            <div>
                {
                    this.props.currentCategory.renderUpdate &&
                    <NewCategoryForm
                        currentCategory={currentCategory}
                        updateCategoryToDispatch={this.updateCategoryToDispatch}
                        updateRenderFlag={this.updateRenderFlag}
                        badReqest={this.props.state.categorys.badReqestCategoryUpdate}
                        clearBadReqestUpdate={this.clearBadReqestUpdate}
                        state={this.props.state}
                        titleEmptyAlert={this.state.titleEmptyAlert}
                        titleToLongAlert={this.state.titleToLongAlert}
                    />
                }
                {
                    !this.props.currentCategory.renderUpdate &&
                        <ListItem 
                            currentCategory={currentCategory}
                            updateRenderFlag={this.updateRenderFlag}
                            renderComponent={this.props.renderComponent}
                            sideDropDown={this.props.sideDropDown}
                            renderModal={this.renderModal}
                        />
                }
                {
                    this.state.modal &&
                    <ModalLogic yesButton={this.deleteCategoryToDispatch} renderModal={this.renderModal}>
                        <ModalDelete/>
                    </ModalLogic>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderLogic);
