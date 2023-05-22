/**
 * Created by charnjeetelectrovese@gmail.com on 1/31/2020.
 */
import React, {Component} from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import styles from "./Style.module.css";
import csx from "classnames";
import {MenuItem, Button, IconButton, withStyles, ButtonBase} from "@material-ui/core";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import MUIRichTextEditor from "mui-rte";
import {stateToHTML} from "draft-js-export-html";
import {convertFromRaw} from "draft-js";
import {
  renderOutlinedTextField,
  renderOutlinedTextFieldWithLimit,
  renderOutlinedMultipleSelectField, renderFileField, renderCheckbox, renderDatePicker,
} from "../../../../../../../libs/redux-material.utils";
import EventEmitter from "../../../../../../../libs/Events.utils";
import BackupIcon from "@material-ui/icons/Backup";
// import UploadImagePopover from './component/Popover/Popover.component';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {Delete as DeleteIcon, Bookmark as BookmarkFilled, BookmarkBorder as BookmarkEmpty} from "@material-ui/icons";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import LogUtils from "../../../../../../../libs/LogUtils";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

let requiredFields = [];

const validate = (values) => {
    const errors = {};
    requiredFields.forEach((field) => {
        if (!values[field]) {
            errors[field] = "Required";
        }
    });
    if (values.title && !/^[A-Z ]*$/i.test(values.title)) {
        errors.title = "Only alphabets are allowed";
    }
    return errors;
};

const descNormalize = (value, prevValue) => {
    if (value.length > 500) {
        return prevValue;
    }
    return value;
};

const defaultTheme = createMuiTheme();

Object.assign(defaultTheme, {
    overrides: {
        MUIRichTextEditor: {
            root: {
                // marginTop: 0,
                width: "100%",
            },
            editor: {
                borderBottom: "1px solid gray",
            },
        },
    },
});

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
            keywords: [],
            thumbnail_index: [0],
            remote_images: [],
            deleted_images: [],
            is_delete_calling: false,
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
        this._renderImages = this._renderImages.bind(this);
    }

    componentDidMount() {
        const {data} = this.props;
        if (data) {
            this.setState({
                is_active: data.status == "ACTIVE",
            });
            requiredFields = ["name", "description", "priority", "location_id", 'date'];
            Object.keys(data).forEach((val) => {
                if (["status", 'images', 'cover_image'].indexOf(val) < 0) {
                    const temp = data[val];
                    this.props.change(val, temp);
                }
            });
            const images = [];
            data.images.forEach((val) => {
               images.push(val.image);
            });
            this.setState({
                remote_images: images,
            })
        } else {
            requiredFields = ["name", "description", "priority", "location_id", 'images', 'cover_image', 'date'];
            this.props.change('date', new Date());
        }
    }

    _handleSubmit(tData) {
        const {category} = this.props;
        const status = this.state.is_active ? "ACTIVE" : "INACTIVE";
        const formInitialValue={date:'',name:'',description:'',priority:'',facility_id:'',parent_id:'',images:'',cover_image:'',location_id:'',status:'',is_dashboard:''}

        const {data} = this.props;
        const newObj={}
        if(data){
        Object.keys({ ...tData }).forEach((key) => {
            if (key in formInitialValue && key !== "image" ) {
                    newObj[key] = tData[key];
                
            }
          });
          tData = {...newObj,status:status,is_dashboard:tData?.is_dashboard ? tData?.is_dashboard: false}
        }
        const fd = new FormData();
        Object.keys(tData).forEach((key) => {
            if (['images'].indexOf(key) < 0) {
                if (['location_id'].indexOf(key) >= 0) {
                    fd.append(key, JSON.stringify(tData[key]));
                } else {
                    fd.append(key, tData[key]);
                }
            }
        });
        
        Array.isArray(tData?.images) && tData?.images.forEach((val) => {
            fd.append('images', val);
        })
        fd.append('facility_id', category?.id);
        fd.append('bookmarks', JSON.stringify(this.state.thumbnail_index));
        if(data) {
            fd.append('id', data?.id);
        }
        if (data) {
            this.props.handleDataSave(
               fd,
                "UPDATE"
            );
        } else {
            this.props.handleDataSave(
                fd,
                "CREATE"
            );
        }
    }

    _handleEditor(data, b) {
        // console.log('data',convertFromRaw(data));
        if (!data.getCurrentContent().hasText()) {
            this.setState({
                editor: null,
            });
        } else {
            const html = stateToHTML(data.getCurrentContent());
            console.log("data", data);
            this.setState({
                editor: html,
            });
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
        return (
            <FormControlLabel
                control={
                    <Switch
                        color={"primary"}
                        checked={this.state.is_active}
                        onChange={this._handleActive.bind(this)}
                        value="is_active"
                    />
                }
                label="Active ?"
            />
        );
        // } else {
        //     return null;
        // }
    }

    handleEditorChange = (content, editor) => {
        // console.log('Content was updated:', content);
    };

    async _handleFileUpload(file) {
        console.log(this.editorRef);
        if (this.editorRef) {
            this.editorRef.insertAtomicBlockAsync(
                "IMAGE",
                this._uploadImage(file),
                "Uploading now..."
            );
        }
    }

    _handleSave = (data) => {
        console.log("handleSave", data);
        const tData = JSON.parse(data);
        const state = convertFromRaw(tData);
        console.log("state", state);
    };

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
            anchor: anchor,
        });
    }

    _handleChange() {
        this.setState({
            is_checked: !this.state.is_checked,
        });
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
        });
    }

    _handleDelete() {
        this.setState({
            show_confirm: true,
        });
    }

    _renderDialog() {
        const {classes} = this.props;
        if (this.state.show_confirm) {
            return (
                <Dialog
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
                </Dialog>
            );
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

    _handleDeleteImage(type, index, uniIndex) {
        console.log(type, index);
        const {thumbnail_index, remote_images} = this.state;
        const {data} = this.props;
        // if (uniIndex <= thumbnail_index) {
        //     this.setState({
        //         thumbnail_index: thumbnail_index == 0 ? 0 : thumbnail_index - 1,
        //     });
        // }
        if (type == 'LOCAL') {
            const {form_values} = this.props;
            if (form_values && 'images' in form_values) {
                const images = form_values.images;
                images.splice(index, 1);
                this.props.change('images', images);
                this.setState({
                    d: 1
                });
            }
        } else {
            if (!this.state.is_delete_calling) {
                // this.setState({
                //   is_delete_calling: true,
                // });
                // serviceDeleteTourImage({id: data.id, index}).then(() => {
                //   if (remote_images.length == 0) {
                //     requiredFields.push('images');
                //   }
                //   this.setState({
                //     is_delete_calling: false,
                //   });
                // });
                const images = remote_images;
                images.splice(index, 1);
                this.setState({
                    remote_images: images,
                });
                // this.props.handleImageDelete(data.id, index);

            }
        }
    }

    _handleThumbnail(type, index) {
        const { thumbnail_index } = this.state;
        const arr = [...thumbnail_index];
        const tIndex = arr.indexOf(index);
        if (tIndex >= 0) {
            arr.splice(tIndex, 1);
        } else {
            arr.push(index);
        }
        LogUtils.log('arr', arr);
        this.setState({
            thumbnail_index: arr
        });
    }


    _renderImages() {
        const {thumbnail_index, remote_images} = this.state;
        const {data, form_values} = this.props;
        const imagesArr = [];
        let tempIndex = 0;
        if (data) {
            remote_images.forEach((val, index) => {
                imagesArr.push(
                    <div className={styles.imgContainer}>
                        <div className={styles.imgLikeBtn}>
                            <ButtonBase
                                onClick={this._handleThumbnail.bind(this, 'REMOTE', tempIndex)}>{thumbnail_index.indexOf(index) >= 0 ? (
                                <BookmarkFilled/>) : (<BookmarkEmpty/>)}</ButtonBase>
                        </div>
                        <div className={styles.imgBtn}>
                            <ButtonBase
                                onClick={this._handleDeleteImage.bind(this, 'REMOTE', index, tempIndex)}><DeleteIcon/></ButtonBase>
                        </div>
                        <a href={val} target={'_blank'}><img src={val} key={'tour_images' + index}
                                                             className={styles.img} alt=""/></a>
                    </div>
                );
                tempIndex++;
            });
        } else {
        }
        if (form_values && 'images' in form_values) {
            form_values.images.forEach((val, index) => {
                imagesArr.push(
                    <div className={styles.imgContainer}>
                        <div className={styles.imgLikeBtn}>
                            <ButtonBase
                                onClick={this._handleThumbnail.bind(this, 'LOCAL', tempIndex)}>{thumbnail_index.indexOf(index) >= 0 ? (
                                <BookmarkFilled/>) : (<BookmarkEmpty/>)}</ButtonBase>
                        </div>
                        <div className={styles.imgBtn}>
                            <ButtonBase
                                onClick={this._handleDeleteImage.bind(this, 'LOCAL', index, tempIndex)}><DeleteIcon/></ButtonBase>
                        </div>
                        <img
                            src={URL.createObjectURL(val)}
                            className={styles.img} alt=""/>
                    </div>
                );
                tempIndex++;
            });
        }
        if (imagesArr.length > 0) {
            return (
                <div style={{marginLeft: '15px'}}>
                    {/*<div className={styles.formHeading}>Tour Images</div>*/}
                    <hr className={styles.bottomLine}/>
                    <div className={styles.flexWrap}>
                        {imagesArr}
                    </div>
                    <br/>
                </div>
            )
        }
        return null;
    }

    render() {
        const {handleSubmit, cities, data, faq_type, category} = this.props;
        return (
            <div>
                <br/>
                <br/>
                <form onSubmit={handleSubmit(this._handleSubmit)}>
                    <div className={styles.category}>
                        {/* <b>{category?.name} Facility</b> */}
                    </div>

                    <div className={"formFlex"}>
                        <div className={"formGroup"}>
                            <Field
                                fullWidth={true}
                                name="name"
                                component={renderOutlinedTextField}
                                // maxLimit={100}
                                margin={"dense"}
                                // normalize={descNormalize}
                                label={`Event Name`}
                            />
                        </div>
                    </div>
                  <div className={"formFlex"}>
                    <div className={"formGroup"}>
                      <Field
                          fullWidth={true}
                          name="date"
                          component={renderDatePicker}
                          margin={"dense"}
                          label={`Date`}
                          maxDate={new Date()}
                      />
                    </div>
                  </div>
                    <div className={"formFlex"}>
                        <div className={"formGroup"}>
                            <Field
                                fullWidth={true}
                                name="description"
                                component={renderOutlinedTextField}
                                // maxLimit={500}
                                margin={"dense"}
                                rows={3}
                                multiline
                                // normalize={descNormalize}
                                label="Event Description"
                            />
                        </div>
                    </div>
                    <div className={"formFlex"}>
                        <div className={"formGroup"}>
                            <Field
                                fullWidth={true}
                                name="location_id"
                                component={renderOutlinedMultipleSelectField}
                                margin={"dense"}
                                label="Location"
                                dataObj={this._convertData(this.props.locations)}
                                extract={{value: "id", title: "name"}}
                                data={this.props.locations}
                            >
                                {/*<MenuItem value={'ALL'}>ALL</MenuItem>*/}
                                {/*{this.props.locations.map((val) => {*/}
                                {/*    return (<MenuItem value={val.id} key={val.id}>{val.name}</MenuItem>);*/}
                                {/*})}*/}
                            </Field>
                        </div>
                    </div>

                    <div className={"formFlex"}>
                        <div className={"formGroup"}>
                            <Field
                                fullWidth={true}
                                name="priority"
                                type={"number"}
                                component={renderOutlinedTextField}
                                margin={"dense"}
                                label="Priority"
                            />
                        </div>
                    </div>
                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field
                                max_size={1024 * 1024 * 5}
                                type={['jpg', 'png', 'pdf', 'jpeg']}
                                error_text={'Max Size 5MB and valid files are jpg, png, jpeg'}
                                fullWidth={true}
                                name="images"
                                multiple
                                shouldClearOld={true}
                                component={renderFileField}
                                label="Images"
                            />
                        </div>
                    </div>
                    {this._renderImages()}
                    <div className={styles.bookmarkLabelWrapper}>
                        <span className={styles.bookmarkHeading}>Images Note:</span>
                        <span>Bookmarked Images will show on Employees Dashboard Event Section</span>
                    </div>
                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field
                                max_size={1024 * 1024 * 5}
                                type={['jpg', 'png', 'pdf', 'jpeg']}
                                error_text={'Max Size 5MB and valid files are jpg, png, jpeg'}
                                fullWidth={true}
                                name="cover_image"
                                show_image
                                component={renderFileField}
                                label="Cover Image"
                            />
                        </div>
                    </div>

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field
                                name="is_dashboard"
                                component={renderCheckbox}
                                label={"Show this event on Dashboard page"}
                            />
                        </div>
                    </div>
                    <div className={styles.bottomFlex}>
                        {this._renderStatus()}
                        <div>
                            <IconButton
                                variant={"contained"}
                                className={this.props.classes.iconBtnError}
                                onClick={this._handleDelete}
                                type="button"
                            >
                                <DeleteIcon/>
                            </IconButton>
                            {/*<span className={styles.delete}>Delete Permanently</span>*/}
                        </div>
                    </div>

                    <br/>
                    <div className={styles.submitBtn}>
                        <Button
                            className={"sub"}
                            variant={"contained"}
                            color={"primary"}
                            type={"submit"}
                        >
                            Save
                        </Button>
                    </div>
                </form>
                {this._renderDialog()}
            </div>
        );
    }
}

const useStyle = (theme) => ({
    btnSuccess: {
        backgroundColor: theme.palette.success.dark,
        color: "white",
        marginRight: 5,
        marginLeft: 5,
        "&:hover": {
            backgroundColor: theme.palette.success.main,
        },
    },
    btnError: {
        backgroundColor: theme.palette.error.dark,
        color: "white",
        marginLeft: 5,
        marginRight: 5,
        "&:hover": {
            backgroundColor: theme.palette.error.main,
        },
    },
    iconBtnError: {
        color: theme.palette.error.dark,
    },
});

const ReduxForm = reduxForm({
    form: "hr_utsav_items", // a unique identifier for this form
    validate,
    onSubmitFail: (errors) => {
        console.log(errors);
    },
})(withStyles(useStyle, {withTheme: true})(QuestionsFormView));

function mapStateToProps(state) {
    return {
        form_values: state.form.hr_utsav_items ? state.form.hr_utsav_items.values : null,
    };
}

export default connect(mapStateToProps, null)(ReduxForm);
