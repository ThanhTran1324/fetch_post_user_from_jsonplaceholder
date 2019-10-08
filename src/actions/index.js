import jsonPlaceholder from '../apis/jsonPlaceholder';
import _ from 'lodash';


//action creater
export const fetchPostAndUser = () => async (dispatch,getState) =>{
   await dispatch(fetchPosts());
   //await to wait for pispatch finish.

   const userId=_.uniq(_.map(getState().posts,"userId"));
   // _.map get through all data and return all "userId"
   //_.uniq(data) return only unic data
   //after get all userid from posts => we fetchUser 
   userId.forEach(id=> dispatch(fetchUser(id)));
   
   // _.chain(getState().posts)
   //    .map('userId')
   //    .uniq()
   //    .forEach(id => dispatch(fetchUser(id)))
   //    .value()

};


export const fetchPosts = () => {
   return async function (dispatch) {
        const response = await jsonPlaceholder.get('/posts');
        dispatch({type: 'FETCH_POSTS', payload: response.data});
   };
};

export const fetchUser = (id) => {
   return async function (dispatch){
      const response = await jsonPlaceholder.get(`/users/${id}`);
      dispatch({type:"FETCH_USER",payload:response.data});
   };
};

// export const fetchUser = (id) => {
//    return  function (dispatch) {
//       _fetchUSer(id,dispatch);
//    };
// };
// const _fetchUSer =  _.memoize(async (id,dispatch) => {
//    const response = await jsonPlaceholder.get(`/users/${id}`);
//    dispatch({type:'FETCH_USER',payload:response.data});
// }); 
