/**
 * Created by charnjeetelectrovese@gmail.com on 1/31/2020.
 */
import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux';
import styles from './Style.module.css'
import csx from 'classnames';
import {MenuItem, Button, IconButton, withStyles} from '@material-ui/core';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'
import MUIRichTextEditor from 'mui-rte';
import {stateToHTML} from 'draft-js-export-html';
import {convertFromHTML, ContentState, convertToRaw, convertFromRaw} from 'draft-js'
import {
    renderOutlinedTextField,
    renderOutlinedTextFieldWithLimit,
    renderOutlinedSelectField, renderCheckbox, renderAutoComplete, renderFileField, renderOutlinedMultipleSelectField,
} from '../../../../../../../libs/redux-material.utils';
import EventEmitter from "../../../../../../../libs/Events.utils";
import BackupIcon from '@material-ui/icons/Backup'
// import UploadImagePopover from './component/Popover/Popover.component';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {Delete as DeleteIcon} from "@material-ui/icons";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


let requiredFields = [];

const validate = (values) => {
    const errors = {};
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    });
    if (values.location_id?.length === 0){
        errors.location_id = 'Required'
    }
    if (values.title && !/^[A-Z ]*$/i.test(values.title)) {
        errors.title = 'Only alphabets are allowed';
    }
    return errors
};

const descNormalize = (value, prevValue) => {
    if (value.length > 500) {
        return prevValue;
    }
    return value;
};

const defaultTheme = createMuiTheme()

Object.assign(defaultTheme, {
    overrides: {
        MUIRichTextEditor: {
            root: {
                // marginTop: 0,
                width: "100%",
            },
            editor: {
                borderBottom: "1px solid gray"
            }
        }
    }
})


class QuestionsFormView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_checked: false,
            editor: null,
            editor_data: null,
            anchor: null,
            is_active: true,
            show_confirm: false,
            keywords: []
        };
        this.editorRef = null;
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleEditor = this._handleEditor.bind(this);
        this._setAnchor = this._setAnchor.bind(this);
        this._handleFileUpload = this._handleFileUpload.bind(this);
        this._uploadImage = this._uploadImage.bind(this);
        this._handleActive = this._handleActive.bind(this);
        this._handleDelete = this._handleDelete.bind(this);
        this._handleDialogClose = this._handleDialogClose.bind(this);
        this._suspendItem = this._suspendItem.bind(this);
    }

    componentDidMount() {
        const {data} = this.props;
        if (data) {
            this.setState({
                is_active: data.status == 'ACTIVE'
            })
            requiredFields = ['name', 'description', 'priority', 'location_id'];
            Object.keys(data).forEach((val) => {
                if (['status'].indexOf(val) < 0) {
                    const temp = data[val];
                    this.props.change(val, temp);
                }
            });
            // this.props.change('location_id', data?.location?.id);
        } else {
            requiredFields = ['name', 'description', 'priority', 'location_id'];
        }


    }

    _handleSubmit(tData) {
        const {category} = this.props;
        const status = this.state.is_active ? 'ACTIVE' : 'INACTIVE'
        const {data} = this.props;
        if (data) {
            this.props.handleDataSave({...tData, status: status, facility_id: category?.id, id: data.id}, 'UPDATE')
        } else {
            this.props.handleDataSave({...tData, status: status, facility_id: category?.id}, 'CREATE')
        }

    }

    _handleEditor(data, b) {
        // console.log('data',convertFromRaw(data));
        if (!data.getCurrentContent().hasText()) {
            this.setState({
                editor: null
            })
        } else {
            const html = stateToHTML(data.getCurrentContent());
            console.log('data', data);
            this.setState({
                editor: html
            })
        }
    }

    _handleActive() {
        this.setState({
            is_active: !this.state.is_active,
        });
    }

    _renderStatus() {
        // const {data} = this.props;
        // if (data) {
        return (<FormControlLabel
            control={
                <Switch color={'primary'} checked={this.state.is_active} onChange={this._handleActive.bind(this)}
                        value="is_active"/>
            }
            label="Active ?"
        />);
        // } else {
        //     return null;
        // }
    }

    handleEditorChange = (content, editor) => {
        // console.log('Content was updated:', content);
    }

    async _handleFileUpload(file) {
        console.log(this.editorRef);
        if (this.editorRef) {
            this.editorRef.insertAtomicBlockAsync("IMAGE", this._uploadImage(file), "Uploading now...")
        }
    }

    _handleSave = (data) => {
        console.log('handleSave', (data));
        const tData = JSON.parse(data);
        const state = convertFromRaw(tData)
        console.log('state', state);
    }

    _uploadImage(file) {
        // console.log(file);
        // return new Promise(async (res, rej) => {
        //     const fd = new FormData();
        //     fd.append('image', file);
        //     const req = await serviceUploadBlogImage(fd );
        //     if (!req.error) {
        //         res({
        //             data: {
        //                 src:req.data.image,
        //                 url: req.data.image,
        //                 width: 300,
        //                 // height: 200,
        //                 alignment: "left", // or "center", "right"
        //                 type: "image" // or "video"
        //             }
        //         })
        //     } else {
        //         rej();
        //     }
        //
        // })
    }

    _setAnchor(anchor) {
        this.setState({
            anchor: anchor
        })
    }

    _handleChange() {
        this.setState({
            is_checked: !this.state.is_checked
        })
    }


    _suspendItem() {
        const {data} = this.props;
        this.setState({
            show_confirm: false,
        });
        this.props.handleDelete(data.id);
    }

    _handleDialogClose() {
        this.setState({
            show_confirm: false,
        })
    }


    _handleDelete() {
        this.setState({
            show_confirm: true
        });
    }


    _renderDialog() {
        const {classes} = this.props;
        if (this.state.show_confirm) {
            return (<Dialog
                keepMounted
                TransitionComponent={Transition}
                open={this.state.show_confirm}
                onClose={this._handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                classes={{paper: classes.dialog}}
            >
                <DialogTitle id="alert-dialog-title">{"Are You Sure"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you really want to delete the item?
                        <br/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this._handleDialogClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={this._suspendItem} color="primary">
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>)
        }
        return null;
    }

    _convertData(data) {
        const temp = {};
        data.forEach((val) => {
            temp[val.id] = val.name;
        });
        return temp;
    }

    render() {
        const {handleSubmit, cities, data, faq_type, category} = this.props;
        return (
            <div>
              <br/>
                <br/>
                <form onSubmit={handleSubmit(this._handleSubmit)}>
                    <div className={styles.category}>
                        <b>{category?.name} Facility</b>
                    </div>

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field
                                fullWidth={true}
                                name="name"
                                component={renderOutlinedTextFieldWithLimit}
                                maxLimit={100}
                                margin={'dense'}
                                normalize={descNormalize}
                                label={`${category?.name?.toUpperCase()} Name`}/>
                        </div>
                    </div>

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field
                                fullWidth={true}
                                name="description"
                                component={renderOutlinedTextFieldWithLimit}
                                maxLimit={500}
                                margin={'dense'}
                                rows={3}
                                multiline
                                normalize={descNormalize}
                                label="Description"/>
                        </div>
                    </div>
                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field fullWidth={true}
                                   name="location_id"
                                   component={renderOutlinedMultipleSelectField}
                                   margin={'dense'}
                                   label="Location"
                                   dataObj={this._convertData(this.props.locations)}
                                   extract={{value: 'id', title: 'name'}}
                                   data={this.props.locations}
                            >
                                {/*<MenuItem value={'ALL'}>ALL</MenuItem>*/}
                                {/*{this.props.locations.map((val) => {*/}
                                {/*    return (<MenuItem value={val.id} key={val.id}>{val.name}</MenuItem>);*/}
                                {/*})}*/}
                            </Field>
                        </div>
                    </div>
                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field
                                fullWidth={true}
                                name="priority"
                                type={'number'}
                                component={renderOutlinedTextField}
                                margin={'dense'}
                                label="Priority"/>
                        </div>
                    </div>


                    <div className={styles.bottomFlex}>
                        {this._renderStatus()}
                        <div>
                            <IconButton variant={'contained'} className={this.props.classes.iconBtnError}
                                        onClick={this._handleDelete}
                                        type="button">
                                <DeleteIcon/>
                            </IconButton>
                            {/*<span className={styles.delete}>Delete Permanently</span>*/}
                        </div>
                    </div>

                    <br/>
                    <div className={styles.submitBtn}>
                        <Button className={'sub'} variant={'contained'} color={'primary'} type={'submit'}>
                            Save
                        </Button>
                    </div>
                </form>
                {this._renderDialog()}
            </div>
        )
    }
}

const useStyle = theme => ({
    btnSuccess: {
        backgroundColor: theme.palette.success.dark,
        color: 'white',
        marginRight: 5,
        marginLeft: 5,
        '&:hover': {
            backgroundColor: theme.palette.success.main,
        }
    },
    btnError: {
        backgroundColor: theme.palette.error.dark,
        color: 'white',
        marginLeft: 5,
        marginRight: 5,
        '&:hover': {
            backgroundColor: theme.palette.error.main,
        }
    },
    iconBtnError: {
        color: theme.palette.error.dark
    }
});

const ReduxForm = reduxForm({
    form: 'hr_facility_items',  // a unique identifier for this form
    validate,
    onSubmitFail: errors => {
        console.log(errors);
    }

})(withStyles(useStyle, {withTheme: true})(QuestionsFormView));

export default connect(null, null)(ReduxForm);
