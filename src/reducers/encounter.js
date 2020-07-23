const initialState = {
    telehealthLength: 0,
    onsiteLength: 0
};

const count = (state = initialState, action) => {
    switch (action.type) {
        case 'COUNT_TELEHEALTH':
            return {
                ...state,
                telehealthLength: action.payload,
            };
        case 'COUNT_ONSITE':
            return {
                ...state,
                onsiteLength: action.payload,
            };
        default:
            return state;
    }
};

export default count;