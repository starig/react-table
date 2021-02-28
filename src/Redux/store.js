import tableReducer from "./table-reducer";

let store = {
    _state: {
        table: {
            tableData: [
                {id: 1, text: 'Frog'},
                {id: 2, text: 'Cat'},
            ],
            newRowText: '',
        }
    },
    getState() {
        return this._state;
    },
    _callSubscriber() {

    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.table = tableReducer(this._state.table, action);
        this._callSubscriber(this._state);
    },
}

export default store;