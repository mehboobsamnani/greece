// import history from 'utils/history'

const fetch = window.fetch;
window.fetch = (...args) => (async(args) => {
    var result = await fetch(...args);
    //console.log('result intercept',result); // intercept response here
    if (result.status === 401){
      console.log('this is unAuthorized my friend');
      //redirect to home or login page
      //history.push('/')
    }
    return result;
})(args);
