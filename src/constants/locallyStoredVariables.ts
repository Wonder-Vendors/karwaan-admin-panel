export const locallyStoredVariables = () => {
    let token = undefined;
    let user = undefined;

    if(typeof(window) !== "undefined"){
        token = localStorage.getItem('token');
        user = JSON.parse(localStorage.getItem('user')!);
    }

    return {token, user};
}