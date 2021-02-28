const ADD_ROW = 'ADD-ROW';
const UPDATE_NEW_ROW_TEXT = 'UPDATE-NEW-ROW-TEXT';

let initialState = {
    tableData: [
        {id: 1, text: 'Frog'},
        {id: 2, text: 'Cat'},
    ],
    newRowText: '',
}

const tableReducer = (state = initialState, action) => {
    let stateCopy = {
        ...state,
        tableData: [...state.tableData],
        newRowText: {...state.newRowText}
    };

    switch (action.type) {
        case ADD_ROW:
            let newRow = {
                id: state.tableData.length + 1,
                text: state.newRowText,
            };
            stateCopy.tableData.push(newRow);
            return stateCopy;
        case UPDATE_NEW_ROW_TEXT:
            stateCopy.newRowText =action.newText;
            return stateCopy;
        default:
            return state;
    }
}

export const addRow = () => ({type: ADD_ROW});
export const updateNewRowText = (newText) => ({type: UPDATE_NEW_ROW_TEXT, newText});

export default tableReducer;