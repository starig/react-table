import React from 'react';
import Preloader from "./Preloader/Preloader";
import Table from "./Components/Table";
import _ from 'lodash';
import ReactPaginate from 'react-paginate';
import TableSearch from "./Components/TableSearch";

class App extends React.Component {

    state = {
        isLoading: true,
        data: [],
        search: '',
        sort: 'asc',
        sortField: 'id',
        currentPage: 0,
        row: null,
    }

    async componentDidMount() {
        const response = await fetch(`http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}`);
        const data = await response.json();
        this.setState({
            isLoading: false,
            data: _.orderBy(data, this.state.sortField, this.state.sort),
        });
    }


    onSort = sortField => {
        const cloneData = this.state.data.concat();
        const sort = this.state.sort === 'asc' ? 'desc' : 'asc';
        const data = _.orderBy(cloneData, sortField, sort);
        this.setState({data, sort, sortField});
    }

    onRowSelect = row => (
        this.setState({row})
    )

    pageChangeHandler = ({selected}) => (
        this.setState({currentPage: selected})
    )

    searchHandler = search =>(
        this.setState({search, currentPage: 0})
    )


    getFilteredData(){
        const {data, search} = this.state
        if (search == null) {
            return data
        }
        var result = data.filter(item => {
            return item['firstName'].toLowerCase().includes(search.toLowerCase())
        });
        if(!result.length){
            result = this.state.data
        }
        return result
    }

    render() {
        const pageSize = 50;
        const filteredData = this.getFilteredData();
        const pageCount = Math.ceil(filteredData.length / pageSize);
        const displayData = _.chunk(filteredData, pageSize)[this.state.currentPage];
        return (
            <div className="container">
                {
                    this.state.isLoading
                        ? <Preloader/>
                        : <React.Fragment>
                            <TableSearch onSearch={this.searchHandler}/>
                            <Table data={displayData}
                                   onSort={this.onSort}
                                   sort={this.state.sort}
                                   sortField={this.state.sortField}
                                   onRowSelect={this.onRowSelect}/>
                        </React.Fragment>
                }
                {
                    this.state.data.length > pageSize
                        ? <ReactPaginate
                            previousLabel={'<'}
                            nextLabel={'>'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.pageChangeHandler}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            nextClassName="page-item"
                            previousLinkClassName="page-link"
                            nextLinkClassName="page-link"
                            forcePage={this.state.currentPage}
                        /> : null
                }
            </div>

        );
    }
}

export default App;
