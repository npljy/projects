export default function cartreducer(state=[],action){
    switch(action.type){
        case 'ADD_CART':
            let ck = document.cookie.split("; ").find(e=>/^u=/.test(e));
            let user = ck ? ck.split("=")[1]:null;
            let carts =JSON.parse(localStorage.getItem(user));
            if(carts)return carts;
            else return state;
        default : return state;
    }
}
