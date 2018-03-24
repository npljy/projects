export default function routereducer(state={},action){
    switch(action.type){
        case 'NEW_PATH' : 
                    return {
                        date:+new Date()
                    };          
        default : return state;
    }
}
