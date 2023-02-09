import React, { Component } from "react";
import styles from "./Style.module.css";
import { IconButton } from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";
import { bindActionCreators } from "redux";
import {
  actionChangeStatusFacilityItem,
  actionCreateFacilityItem,
  actionDeleteFacilityItem,
  actionFetchHRFacilityItem,
  actionFilterFacilityItem,
  actionResetFilterFacilityItem,
  actionSetPageFacilityItem,
  actionUpdateFacilityItem,
} from "../../../../../actions/HRFacilityItem.action";
import { connect } from "react-redux";
import Accordion from "../../../../../components/Accordion/Accordion.component";

class QuestionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      side_panel: false,
      edit_data: null,
    };
    this._handleSideToggle = this._handleSideToggle.bind(this);
    this._handleDataSave = this._handleDataSave.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
    this._handleEdit = this._handleEdit.bind(this);
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      JSON.stringify(prevProps.category) != JSON.stringify(this.props.category)
    ) {
      this.props.actionFetchData(this.props.category.id);
    }
  }

  _handleEdit(index) {
    const { data } = this.props;
    const selectedQues = data[index];
    this.setState({
      side_panel: !this.state.side_panel,
      edit_data: selectedQues,
    });
  }

  _handleDelete(id) {
    this.props.actionDelete(id);
    this.setState({
      side_panel: !this.state.side_panel,
      edit_data: null,
    });
  }

  _handleSideToggle() {
    this.setState({
      side_panel: !this.state.side_panel,
      edit_data: null,
    });
  }

  _handleDataSave(data, type) {
    // this.props.actionChangeStatus({...data, type: type});
    if (type == "CREATE") {
      this.props.actionCreateFaq(data);
    } else {
      this.props.actionUpdateFaq(data);
    }
    this.setState({
      side_panel: !this.state.side_panel,
      edit_data: null,
    });
  }

  _handleAddTopic(type) {
    this.props.handleSideToggle(type);
  }

  _renderQuestions() {
    const { category } = this.props;
    const { data } = this.props;

    if (Array.isArray(data) && data.length > 0) {
      data.sort((a, b) => (a.priority > b.priority ? 1 : -1));
      return data.map((val, index) => {
        return (
          <Accordion
            quesIndex={index}
            key={val.id}
            onEditClick={this._handleEdit}
            title={val.name}
            initial="hide"
          >
            <div
              className={"innerHtml"}
              dangerouslySetInnerHTML={{ __html: val.description }}
            ></div>
            <div className={styles.locationText}>
              Locations: {val?.location}
            </div>
          </Accordion>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <div className={styles.plainBg}>
          <div>{this._renderQuestions()}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.hr_facilities_item.present,
    total_count: state.hr_facilities_item.all.length,
    currentPage: state.hr_facilities_item.currentPage,
    serverPage: state.hr_facilities_item.serverPage,
    sorting_data: state.hr_facilities_item.sorting_data,
    is_fetching: state.hr_facilities_item.is_fetching,
    query: state.hr_facilities_item.query,
    query_data: state.hr_facilities_item.query_data,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      actionFetchData: actionFetchHRFacilityItem,
      actionSetPage: actionSetPageFacilityItem,
      actionResetFilter: actionResetFilterFacilityItem,
      actionSetFilter: actionFilterFacilityItem,
      actionChangeStatus: actionChangeStatusFacilityItem,
      actionCreateFaq: actionCreateFacilityItem,
      actionUpdateFaq: actionUpdateFacilityItem,
      actionDelete: actionDeleteFacilityItem,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionView);
