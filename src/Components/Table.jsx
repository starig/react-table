import './Table.css';

let Table = (props) => (
    <table className="table">
        <thead>
            <tr>
                <th onClick={props.onSort.bind(null, 'id')} className="title">
                    ID {props.sortField === 'id' ? <small>{props.sort === 'asc' ? 'Ascending' : 'Descending'}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'firstName')} className="title">
                    Name {props.sortField === 'firstName' ? <small>{props.sort === 'asc' ? 'Ascending' : 'Descending'}</small> : null}
                </th>
            </tr>
        </thead>
        <tbody>
            {props.data.map(item => (
                <tr key={item.id + item.firstName} onClick={props.onRowSelect.bind(null, item)}>
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default Table;
