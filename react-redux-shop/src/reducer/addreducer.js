export default function addreducer(state={add:true},action){
    switch(action.type){
        case 'ADD_NUM':
            return {
                add:false
            };
        case 'IN_NUM' : 
            return {
                add:true
            };
        default : return state;
    }
}