import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    actionGetJobOpeningCandidates,
    actionGetJobOpeningInterviewers
} from "../../../../../actions/JobOpeningDetail.action";
import LogUtils from "../../../../../libs/LogUtils";

const totalShow = 20;

const useInterviewerList = ({jobId}) => {
    const dispatch = useDispatch();
    const [currentPage,setCurrentPage] = useState(0);
    const [currentData,setCurrentData] = useState([]);
    const {isInterviewerFetching, interviewers } = useSelector(state => state.job_opening_detail);

    useEffect(() => {
        dispatch(actionGetJobOpeningInterviewers(jobId));
    }, []);

    useEffect(() => {
        _processData();
    }, [interviewers]);

    const _processData = useCallback(() =>  {
        const data = interviewers;
        const from = (((currentPage + 1) * totalShow) - totalShow);
        let to = (((currentPage + 1) * totalShow));
        LogUtils.log('from', from, to);
        // all.filter((val, index) => {
        //     if (index >= (((currentPage) * totalShow) - totalShow) && index < (((currentPage) * totalShow))) {
        //         return val;
        //     }
        // });
        if (from <= data.length) {
            to = to <= data.length ? to : data.length;
            setCurrentData(data.slice(from, to));
        }
    }, [setCurrentData, currentPage, interviewers]);

    const handlePageChange = useCallback((type) => {
        const data = interviewers;
        if (Math.ceil(data.length / totalShow) >= (type + 1)) {
            setCurrentPage(type + 1);
            _processData()
        }
    }, [_processData, setCurrentPage, interviewers]);

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
        isInterviewerFetching,
        currentData,
        data: interviewers,
        currentPage
    }

}

export default useInterviewerList
