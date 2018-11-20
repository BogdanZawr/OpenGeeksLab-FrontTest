import React from 'react';
import { connect } from 'react-redux';
import { asyncNestedCategoriesList } from '../../../actions/categoryes';
import { asyncGetCategoryArticle } from '../../../actions/articles';
import { asyncGetCategoryRecept } from '../../../actions/recipes';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import Dropdown from './Dropdown';

const mapStateToProps = state => ({
    state,
});

const mapDispatchToProps = dispatch => {
    return {
        asyncGetCategoryRecept: (idCategory) => {
            dispatch(asyncGetCategoryRecept(idCategory));
        },
        asyncGetCategoryArticle: (idCategory) =>{
            dispatch(asyncGetCategoryArticle(idCategory));
        },
        asyncNestedCategoriesList: (id) => {
            dispatch(asyncNestedCategoriesList(id));
        },
    };
};

class ListItem extends React.Component {

    state = {
        dropdownOpen: false,
        childDropdownButton: false, 
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    getCategoryRecepts = () => {
        let idCategory = this.props.currentCategory._id;
        this.props.asyncGetCategoryRecept(idCategory);
        this.props.asyncGetCategoryArticle(idCategory);
        this.props.asyncNestedCategoriesList(idCategory);
    }

    checkForStringLength = (string) => {
        let maxlength = 10;
        if (string.length > maxlength) {
            return string.slice(0, maxlength) + '...';
        }
        return string;
    }

    render() {
        const { currentCategory } = this.props;
        return (
            <div className='listElement'>
                <div className='listItemContent'>
                    {
                        this.props.currentCategory.children.length > 0 && 
                        <Button color='secondary' onClick={this.props.renderComponent} size='sm'>
                            {(this.props.sideDropDown && '+') || '-'}
                        </Button>
                    }
                </div>
                <div className='listItemContent'>
                    <Link to={`/Category/${currentCategory._id}/Content`}>
                        <div className='text-muted' onClick={this.getCategoryRecepts}>
                            {(() => this.checkForStringLength(currentCategory.title))()}
                        </div>
                    </Link> 
                </div>
                <Dropdown
                    currentCategory={this.props.currentCategory}
                    updateRenderFlag={this.props.updateRenderFlag}
                    renderModal={this.props.renderModal}
                    updateCategoryToDispatch={this.updateCategoryToDispatch}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
