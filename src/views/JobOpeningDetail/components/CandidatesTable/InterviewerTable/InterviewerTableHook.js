import React, {useCallback, useEffect, useMemo, useState} from "react";

const useInterviewerList = () => {

    const [data,setData] = useState([])
    const [currentPage,setCurrentPage] = useState(1);
    const [currentData,setCurrentData] = useState([]);
    const [selectedDate,setSelectedDate] = useState(null);
    const [minDate,setMinDate] = useState(null);
    const [maxDate,setMaxDate] = useState(null);
    const [isCalling, setIsCalling] = useState(false);

    useEffect(() => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 1);
        // this.setState({
        //     selectedDate: date,
        //     minDate: date,
        //     maxDate: maxDate
        // });
    },[])

    useEffect(() => {},[])

    const _processData = () =>  {
        const {data, currentData, currentPage, totalShow} = this.state;
        const from = (((currentPage) * totalShow) - totalShow);
        let to = (((currentPage) * totalShow));
        // all.filter((val, index) => {
        //     if (index >= (((currentPage) * totalShow) - totalShow) && index < (((currentPage) * totalShow))) {
        //         return val;
        //     }
        // });
        if (from <= data.length) {
            to = to <= data.length ? to : data.length;
            this.setState({
                currentData: data.slice(from, to),
            });
        }
    }

    // const handleCellClick = (rowIndex, columnIndex, row, column) => {
    //     console.log(`handleCellClick rowIndex: ${rowIndex} columnIndex: ${columnIndex}`);
    // }

    const handlePageChange = useCallback((type) => {
        console.log('_handlePageChange', type);
        const {data, totalShow} = this.state;
        if (Math.ceil(data.length / totalShow) >= (type + 1)) {
            this.setState({
                currentPage: type + 1
            }, () => {
                _processData();
            });

        }
    }, []);

    const handlePreviousPageClick=()=> {
        console.log('handlePreviousPageClick', 'PREV');
    }

    const handleNextPageClick=()=> {
        console.log('handleNextPageClick', 'NEXT');
    }

    const handleSortOrderChange= (row, order)=>{
        console.log(`handleSortOrderChange key:${row} order: ${order}`);
    }

    const handleRowSize=(page)=>{
        console.log(page);
    }

    const queryFilter = useCallback((key, value) => {
        console.log('_queryFilter', key, value);
    }, []);

    const handleFilterDataChange = useCallback((value) => {
        console.log('_handleFilterDataChange', value);
        queryFilter('FILTER_DATA', value);
    }, [queryFilter]);

    const handleSearchValueChange = useCallback((value) => {
        console.log('_handleSearchValueChange', value);
        queryFilter('SEARCH_TEXT', value);
    }, [queryFilter]);

    const _handleDateChange = (date) => {
        // this.setState({
        //     selectedDate: date,
        // });
    }

    const _handleWarehouseChange = (e, data) =>{
        console.log('handleWarehouseChange', e.target.value)
        const batchId = e.target.value;
    }


    return {
        handlePageChange,
        // handleCellClick,
        handleFilterDataChange,
        handleSearchValueChange,
        // handlePreviousPageClick,
        // handleNextPageClick,
        handleRowSize,
        handleSortOrderChange,
        isCalling,
    }

}

export default useInterviewerList
