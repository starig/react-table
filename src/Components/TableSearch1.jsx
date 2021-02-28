import React, {useState} from 'react';

let TableSearch = (props) => {
    const [value, setValue] = useState('')
    const valueChangeHandler = event => {
        setValue(event.target.value)
    }
    const dataSearch = e => {};
    return (
        <div className="input-group mb-3 mt-3">
            <div className="input-group-prepend">
                <button
                    className="btn btn-outline-secondary"
                    onClick={() => props.onSearch(value)} >Search</button>
            </div>
            <input
                type="text"
                className="form-control"
                placeholder="Search people by name..."
                onChange={dataSearch}
                value={term}
            />
        </div>
    )
}

export default TableSearch;