import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const mapStateToProps = state => ({
    state,
});

class ListItem extends React.Component {

    state = {
        dropdownOpen: false,
        sideDropDown: true,
    }

    render() {   
        return (
            <div className='buttonDropdown'>
                <ButtonDropdown direction='right' isOpen={this.state.btnDropright} toggle={() => { this.setState({ btnDropright: !this.state.btnDropright }); }}>
                    <DropdownToggle caret size='sm'>
                        #
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>
                            <div onClick={this.props.renderModal}>
                                Delete
                            </div>
                        </DropdownItem>
                        <DropdownItem>
                            <div onClick={this.props.updateRenderFlag}>
                                Update
                            </div>
                        </DropdownItem>
                        <DropdownItem>
                            <Link to={'/NewCategory/'+ this.props.currentCategory._id}>
                                <div>
                                    Add Category
                                </div>
                            </Link>
                        </DropdownItem>
                        <DropdownItem><Link to={'/NewRecipe/' + this.props.currentCategory._id}>
                            <div>
                                Add Recipe
                            </div>
                        </Link>
                        </DropdownItem>
                        <DropdownItem><Link to={'/NewArticle/' + this.props.currentCategory._id}>
                            <div>
                                Add Article
                            </div>
                        </Link>
                        </DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </div>

        );
    }
}

export default connect(mapStateToProps)(ListItem);
