import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'reactstrap';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    state,
});

class Breadcrumbs extends React.Component {
    state = {
        badResponseGetNeasted: [],
    }

    isBreatcrumbNeedTramsition = (id) => {
        if (this.props.transitionBetweenCategories) {
            this.props.transitionBetweenCategories(id);
        }
    }

    componentWillReceiveProps = (nextProps) => {
        let badReqNeasted = nextProps.state.categorys.badReqNeasted;
        if (badReqNeasted.length > 0) {
            this.setState ({ badResponseGetNeasted: nextProps.state.categorys.badReqNeasted });                    
        }
    }

    render() {
        const { nestedList } = this.props.nestedList;
        return (
            <div className='content'>
                {this.state.badResponseGetNeasted.map((response) => {
                    return <div key={response.message}>{response.message}</div>;
                })}
                <Breadcrumb tag='nav'>
                    { nestedList.map((category) => {
                        return <div key={category._id} onClick={() => this.isBreatcrumbNeedTramsition(category._id)}>
                            <Link value={category._id} to={'/Category/'+category._id+'/Content'}>
                                {category.title}
                            </Link> >
                        </div>;
                    })}
                </Breadcrumb>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Breadcrumbs);
