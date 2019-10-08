import React from 'react';
import {connect} from 'react-redux';

import {fetchPostAndUser} from '../actions';
import UserHeader from './UserHeader';
class PostList extends React.Component {
    componentDidMount(){
        this.props.fetchPostAndUser();
    };
    
    renderPostList = () =>{
        return this.props.posts.map((post)=>{
            return (
                    <div className="item" key={post.id}>
                        <i className="large middle aligned icon user"></i>
                        <div className="content">
                            <div className="description">
                                <h2>{post.title}</h2>
                                <p>{post.body}</p>
                            </div>
                            <UserHeader userID={post.userId}/>
                        </div>
                    </div>
                    );
        })
    };
    render(){
        return <div className="ui relaxed divided list">
            {this.renderPostList()}
        </div>;
    }
}
const mapStateToProps = (state) =>{
    return {posts:state.posts};
}
export default connect(mapStateToProps,{fetchPostAndUser:fetchPostAndUser})(PostList);