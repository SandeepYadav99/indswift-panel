import React, {useCallback, useState, useEffect, useRef, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    actionCreateCandidate, actionDeleteCandidate,
    actionFetchCandidate,
    actionSetPageCandidate,
    actionUpdateCandidate
} from "../../actions/Candidate.action";
import {serviceRejectJobCandidates, serviceShortlistJobCandidates} from "../../services/JobOpenings.service";
import SnackbarUtils from "../../libs/SnackbarUtils";
import {actionGetJobOpeningCandidates} from "../../actions/JobOpeningDetail.action";

const useCandidateShortlistTable = ({jobId, handleClose }) => {
    const [selected, setSelected] = useState([]);
    const [data, setData] = useState([])
    const [currentPage,setCurrentPage] = useState(1);
    const [currentData,setCurrentData] = useState([]);
    const [isDialog, setIsDialog] = useState(false);
    const [totalShow, setTotalShow] = useState(10);
    const [isFetching, setIsFetching] = useState(false);
    const [dialogType, setDialogType] = useState('REJECTED');
    const { candidates, isCandidatesFetching } = useSelector((state) => state.job_opening_detail);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setData(candidates);
    }, [candidates]);

    useEffect(() => {
        // initData();
        _processData();
    },[currentPage, data])

    const _processData = () =>  {
        const from = (((currentPage) * totalShow) - totalShow);
        let to = (((currentPage) * totalShow));
        // all.filter((val, index) => {
        //     if (index >= (((currentPage) * totalShow) - totalShow) && index < (((currentPage) * totalShow))) {
        //         return val;
        //     }
        // });
        if (from <= data.length) {
            to = to <= data.length ? to : data.length;
            setCurrentData(data.slice(from, to));
        }
    }

    const handlePageChange = useCallback((type) => {
        console.log('_handlePageChange', type);
        if (Math.ceil(data.length / totalShow) >= (type + 1)) {
            setCurrentPage(type+1);
            _processData();
        }
    }, [_processData, setCurrentPage, data, totalShow]);


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



    const handleSortOrderChange = useCallback((row, order) => {
        console.log(`handleSortOrderChange key:${row} order: ${order}`);
    }, []);

    const handleRowSize = (page) => {
        console.log(page);
    }


    const handleCheckbox = useCallback((data) => {
        const tempSelected = JSON.parse(JSON.stringify(selected));
        const tempIndex = tempSelected.findIndex(sel => sel.id === data.id);
        if (tempIndex >= 0) {
            tempSelected.splice(tempIndex, 1);
        } else {
            tempSelected.push(data);
        }
        setSelected(tempSelected)
    }, [selected, setSelected]);

    const toggleConfirmDialog = useCallback((type) => {
        setDialogType(type);
        setIsDialog(e => !e);
    }, [setIsDialog, setDialogType]);

    const dialogText = useMemo(() => {
        if (dialogType === 'REJECTED') {
            return (<p>
                Are you sure you want to{" "}
                <strong>REJECT CANDIDATES - {selected.length} CANDIDATES</strong>. The
                candidates once rejected will be sent automatic email regarding
                rejection.
            </p>);
        } else {
            return (<p>
                Are you sure you want to{" "}
                <strong>SHORTLIST CANDIDATES - {selected.length} CANDIDATES</strong>. The
                candidates once shortlisted will be sent automatic email regarding
                interview.
            </p>);
        }
    }, [dialogType, selected])

    const handleDialogConfirm = useCallback(() => {
        if (!isSubmitting) {
            const candidatIds = selected.map(val => val.id);
            let req = serviceRejectJobCandidates;
            if (dialogType === 'SHORTLISTED') {
                req = serviceShortlistJobCandidates;
            }
            req({id: jobId, candidateIds: candidatIds}).then((res) => {
                if(!res.error) {
                    setSelected([]);
                    dispatch(actionGetJobOpeningCandidates(jobId));
                    handleClose();
                } else {
                    SnackbarUtils.error(res?.message);
                }
                setIsDialog(false);
                setIsSubmitting(false);
            });
        }

    }, [dialogType, selected, setSelected, setIsDialog, jobId, setIsSubmitting, isSubmitting, handleClose]);

    return {
        handlePageChange,
        handleFilterDataChange,
        handleSearchValueChange,
        handleRowSize,
        handleSortOrderChange,
        handleCheckbox,
        selected,
        currentPage,
        currentData,
        data,
        isFetching,
        isDialog,
        toggleConfirmDialog,
        dialogType,
        dialogText,
        handleDialogConfirm,
        isSubmitting
    }
};

export default useCandidateShortlistTable;
