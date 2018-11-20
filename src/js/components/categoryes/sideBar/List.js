import React from 'react';
import { connect } from 'react-redux';
import RenderLogic from './RenderLogic';

const mapStateToProps = state => ({
    state,
});

class List extends React.Component {

    state = {
        componentIsRender: false,
        componentIsUpdading: false,
        dropdownOpen: false,
        sideDropDown: true,
    }

    renderComponent = () => {
        this.setState ({ 
            componentIsRender: !this.state.componentIsRender,
            sideDropDown: !this.state.sideDropDown,
        });
    }

    render() {
        const { currentCategory } = this.props;
        return (
            <div className='list'>
                <RenderLogic
                    currentCategory={this.props.currentCategory}
                    renderComponent={this.renderComponent}
                    sideDropDown={this.state.sideDropDown}
                />
                {
                    this.state.componentIsRender && 
                    currentCategory.children.map((category) => {
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

export default connect(mapStateToProps)(List);
