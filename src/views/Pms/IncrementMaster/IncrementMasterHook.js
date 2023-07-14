import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {isAlpha, isAlphaNum, isAlphaNumChars, isNum, isSpace} from "../../../libs/RegexUtils";
import useDebounce from "../../../hooks/DebounceHook";
import LogUtils from "../../../libs/LogUtils";
import {
    serviceCheckDepartment,
    serviceCreateDepartment,
    serviceGetDepartmentDetails, serviceUpdateDepartment
} from "../../../services/Department.service";
import historyUtils from "../../../libs/history.utils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import {useParams} from "react-router";
import Constants from "../../../config/constants";
import { serviceGetList } from "../../../services/Common.service";
import {serviceGetPmsIncrements, servicePmsUpdateIncrements} from "../../../services/AppSettings.service";

const initialForm = {
    grade_ids_one: [],
    grade_ids_two: [],
    is_active: true
};

const useDepartmentDetail = ({}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [errorData, setErrorData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({...initialForm});
    const [isEdit, setIsEdit] = useState(false);
    // const codeDebouncer = useDebounce(form?.code, 500);
    const { id } = useParams();
    const [listData,setListData]=useState();
    const slabOneRef = useRef(null);
    const slabTwoRef = useRef(null);
    const [editData , setEditData] = useState([]);

    const getListFromGradeIds = useCallback((ids, grades) => {
        return grades.filter(grade => ids.indexOf(grade?.id) >=0 );
    }, []);

    useEffect(() => {
        if (!isLoading) {
            setTimeout(() => {
                editData.forEach((val, ind) => {
                    ind === 0 && slabOneRef?.current.setData(val.data);
                    ind === 1 && slabTwoRef?.current.setData(val.data);
                })
            }, 0);
        }
    }, [isLoading]);

    useEffect(() => {
        serviceGetList(["GRADES"]).then((res) => {
            if (!res.error) {
                const listData = res.data?.GRADES;
              setListData(res.data);
              const tForm = {...form};
                serviceGetPmsIncrements({}).then((res) => {
                    if (!res.error) {
                        setEditData(res.data);
                        res.data.forEach((incr) => {
                            const grades = getListFromGradeIds(incr.grade_ids, listData);
                            if (incr.slab === 'SLAB_ONE') {
                                tForm['grade_ids_one'] = grades;
                            } else {
                                tForm['grade_ids_two'] = grades;
                            }
                            setForm(tForm);
                            setTimeout(() => {
                                setIsLoading(false);
                            }, 0);

                        });
                    }
                });
            }
        });
    }, []);

    const checkFormValidation = useCallback(() => {
        const errors = {...errorData};
        let required = ['grade_ids_one','grade_ids_two'];
        required.forEach(val => {
            if (!form?.[val] || (Array.isArray(form?.[val]) && form?.[val].length === 0)) {
                errors[val] = true;
            } else if (['code'].indexOf(val) < 0) {
                delete errors[val]
            }
        });
        Object.keys(errors).forEach(key => {
            if (!errors[key]) {
                delete errors[key];
            }
        })
        return errors;
    }, [form, errorData]);

    const submitToServer = useCallback(() => {
        if (!isSubmitting) {
            setIsSubmitting(true);
            const data = [
                {
                    slab: "SLAB_ONE",
                    grade_ids: form?.grade_ids_one?.map(val => val.id),
                    data: slabOneRef.current.getData(),
                },
                {
                    slab: "SLAB_TWO",
                    grade_ids: form?.grade_ids_two?.map(val => val.id),
                    data: slabTwoRef.current.getData(),
                },
            ];
            servicePmsUpdateIncrements({
                data: data
            }).then((res) => {
                if (!res.error) {
                    historyUtils.goBack();
                    SnackbarUtils.success('Data Saved Successfully');
                } else {
                    SnackbarUtils.error(res?.message);
                }
                setIsSubmitting(false);
            });
        }
    }, [form, isSubmitting, setIsSubmitting, id]);

    const handleSubmit = useCallback(async () => {
        const errors = checkFormValidation();
        const isIncludesValidOne = slabOneRef.current.isValid();
        const isIncludesValidTwo = slabTwoRef.current.isValid();
        if (Object.keys(errors).length > 0 || !isIncludesValidOne || !isIncludesValidTwo) {
            setErrorData(errors);
            return true;
        }


        submitToServer();

    }, [
        checkFormValidation,
        setErrorData,
        form
    ]);

    const removeError = useCallback(
        title => {
            const temp = JSON.parse(JSON.stringify(errorData));
            temp[title] = false;
            setErrorData(temp);
        },
        [setErrorData, errorData],
    );

    const changeTextData = useCallback((text, fieldName) => {
            let shouldRemoveError = true;
            const t = {...form};
            if (fieldName === 'name') {
                if (!text || (isAlphaNumChars(text) && text.toString().length <= 30)) {
                    t[fieldName] = text;
                }
            } else if (fieldName === 'code') {
                if (!text || (!isSpace(text) && isAlphaNumChars(text))) {
                    t[fieldName] = text.toUpperCase();
                }
                shouldRemoveError = false;
            } else {
                t[fieldName] = text;
            }
            setForm(t);
            shouldRemoveError && removeError(fieldName);
        }, [removeError, form, setForm]);

    // const onBlurHandler = useCallback(
    //     type => {
    //         if (form?.[type]) {
    //             changeTextData(form?.[type].trim(), type);
    //         }
    //     }, [changeTextData, checkCodeValidation]);

    const handleDelete = useCallback(() => {

    }, []);


    // const handleReset = useCallback(() => {
    //     setForm({...initialForm})
    // },[form])

    return {
        form,
        changeTextData,
        // // onBlurHandler,
        removeError,
        handleSubmit,
        isLoading,
        isSubmitting,
        errorData,
        isEdit,
        handleDelete,
        // handleReset,
        id,
        listData,
        slabOneRef,
        slabTwoRef
    };
};

export default useDepartmentDetail;
