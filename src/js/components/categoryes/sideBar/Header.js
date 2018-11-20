import React from 'react';
import { connect } from 'react-redux';
import { asyncGetAllCategory } from '../../../actions/categoryes';
import List from './List';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const mapStateToProps = state => ({
    state,
});

const mapDispatchToProps = dispatch => {
    return {
        asyncGetAllcategory: () => {
            dispatch(asyncGetAllCategory());
        },
    };
};

class Header extends React.Component {

    componentDidMount = () => {
        this.props.asyncGetAllcategory();
    };

    render() {
        const { tree } = this.props.state.categorys;
        return (
            <div className='treeList'>
                <Link to={'/NewCategory/0'}>
                    <Button>Add New Category</Button>
                </Link>
                {
                    tree.map((category) => {
                        return <List 
                            currentCategory={category}
                            key={category._id}
                        />;
                    })
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
