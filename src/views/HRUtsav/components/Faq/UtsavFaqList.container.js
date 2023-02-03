/**
 * Created by charnjeetelectrovese@gmail.com on 12/3/2019.
 */
import React, { Component } from "react";
import { Button, Paper } from "@material-ui/core";

import classNames from "classnames";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "./UtsavFaq.module.css";
import Constants from "../../../../config/constants";
import TopicView from "./components/Topic/Topic.view";
import QuestionView from "./components/Questions/QuestionView";
import { serviceGetList } from "../../../../services/Common.service";

let CreateProvider = null;
class UtsavFaqList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faq_type: "",
      selectedCategory: null,
      locations: [],
    };
    this._handleCategoryChange = this._handleCategoryChange.bind(this);
  }

  componentDidMount() {
    serviceGetList(["LOCATIONS"]).then((res) => {
      if (!res.error) {
        this.setState({
          locations: res?.data?.LOCATIONS,
        });
      }
    });
  }

  _handleCategoryChange(category) {
    this.setState({
      selectedCategory: category,
    });
  }

  render() {
    const { selectedCategory } = this.state;
    return (
      <div>
        {/*<PageBox>*/}
        <div className={styles.headerContainer}>
          <span className={styles.title}>
            Ind-Swift Corporate Tie-Ups (SEA)
          </span>
        </div>
        {/*</PageBox>*/}

        <div className={styles.outerFlex}>
          <div className={styles.left}>
            <TopicView
              selectedCategory={selectedCategory}
              handleCategoryChange={this._handleCategoryChange}
            />
          </div>
          <div className={styles.right}>
            <QuestionView
              locations={this.state?.locations}
              category={selectedCategory}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UtsavFaqList);
