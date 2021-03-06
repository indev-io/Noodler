const initialState = 'Initial Module Data';

const reducer = (
    state = initialState,
    action
) => {
    switch (action.type){
        case "send":
            return action.payload;
        case "receive":
            return action.payload;
        default: 
            return state;
    }
}

export default reducer;

