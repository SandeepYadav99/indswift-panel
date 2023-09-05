import {useEffect, useState} from "react";
import {serviceGetEmployeePmsRatings} from "../../../services/IncrementPlanner.service";
import {useParams} from "react-router";
import LogUtils from "../../../libs/LogUtils";

const data = [
    {
        label: 'Math',
        self: 120,
        others: 110,
        fullMark: 150,
    },
    {
        label: 'Chinese',
        self: 98,
        others: 130,
        fullMark: 150,
    },
    {
        label: 'English',
        self: 86,
        others: 130,
        fullMark: 150,
    },
    {
        label: 'Geography',
        self: 99,
        others: 100,
        fullMark: 150,
    },
    {
        label: 'Physics',
        self: 85,
        others: 90,
        fullMark: 150,
    },
    {
        label: 'History',
        self: 65,
        others: 85,
        fullMark: 150,
    },
];

const useAwardSheet = ({}) => {
    const { id } = useParams();
    const [isFetching, setIsFetching] = useState(true);
    const [ratingData, setRatingData] = useState([]);
    const [group4Data, setGroup4Data] = useState(data);
    const [empData, setEmpData] = useState({form_type: 'TYPE_4'});
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        serviceGetEmployeePmsRatings({employee_id: id}).then((res) => {
            if (!res.error) {
                setGroup4Data(res?.data?.four_b_ratings);
                setRatingData(res?.data?.ratings);
                setEmpData(res?.data?.employee);
                // if (res?.data?.employee?.form_type === 'TYPE_4') {
                //     setTimeout(() => {
                //         setIsLoad(true);
                //     }, 5000);
                // }
            }
            setIsFetching(false);
        });
    }, []);


    return {
        ratingData,
        group4Data,
        isFetching,
        empData,
        isLoad
    };
};

export default useAwardSheet;
