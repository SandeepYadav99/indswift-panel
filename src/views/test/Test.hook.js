import useFormHook from "./Form.hook";

const initialForm = {
    name: `""|required,num,max:5,min:`,
    email: ""
};

const useTestHook = ({}) => {
    const { errorData, changeTextData, form, handleDelete, handleReset, handleSubmit, removeError, onBlurHandler } = useFormHook({initialForm: initialForm, requiredFields: ['name', 'email']});
    return {
        errorData,
        changeTextData,
        form,
        handleDelete,
        handleReset,
        handleSubmit,
        removeError,
        onBlurHandler
    };
};

export default useTestHook;
