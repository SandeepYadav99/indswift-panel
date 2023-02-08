import {useCallback, useEffect, useRef} from "react";
import { useState } from "react";
import { serviceUploadEmployeeInduction } from "../../../../services/AppSettings.service";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import { useSelector } from "react-redux";
import useDebounce from "../../../../hooks/DebounceHook";
import {serviceUpdateMonthlyTheme} from "../../../../services/MonthlyTheme.service";

function useMonthlyThemeItem({index, data}) {
    const [title, setTitle] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [error, setIsError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const textDebouncer = useDebounce(title, 500);
    const mountRef = useRef(false);

    useEffect(() => {
        if (data) {
            setTitle(data?.title);
        }
        setTimeout(() => {mountRef.current = true;}, 1000);
    }, [data]);

    useEffect(() => {
        if (title.trim() && mountRef.current) {
            handleSubmit();
        }
    }, [textDebouncer, coverImage])

    const handleSubmit = useCallback(() => {
        if (!isSubmitting) {
            setIsSubmitting(true);
            const fd = new FormData();
            fd.append("title", title.trim());
            fd.append("cover_image", coverImage);
            fd.append('month', index);
            serviceUpdateMonthlyTheme(fd).then((res) => {
                if (!res.error) {
                    SnackbarUtils.success("Theme Updated");
                }
                setIsSubmitting(false);
            });
        }
    }, [isSubmitting, setIsSubmitting, title, coverImage, index]);

    const handleTextChange = useCallback((title) => {
        setTitle(title);
    }, [setTitle]);

    const handleCoverImageChange = useCallback(
        (file) => {
            setCoverImage(file);
        }, [setCoverImage]);

    // const getImageUrl = useCallback(() => {
    //   if (document) {
    //     return URL.createObjectURL(document);
    //   }
    //   return require("../../../../assets/img/profile.png");
    // }, [document]);

    return {
        title,
        handleTextChange,
        handleSubmit,
        error,
        isSubmitting,
        coverImage,
        handleCoverImageChange
    };
}

export default useMonthlyThemeItem;
