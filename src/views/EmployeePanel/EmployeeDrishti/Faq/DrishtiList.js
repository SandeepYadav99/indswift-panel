import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "./Faq.module.css";
import DrishtiQuestionView from "./components/Questions/DrishtiQuestionView";
import { serviceGetList } from "../../../../services/Common.service";
import DrishtiTopicView from "./components/Topic/DrishtiTopic.view";
let CreateProvider = null;
class DrishtiFaqList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faq_type: "",
      selectedCategory: null,
      locations: [],
      isDrishtipage: true,
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
            <DrishtiTopicView
              selectedCategory={selectedCategory}
              handleCategoryChange={this._handleCategoryChange}
            />
          </div>
          <div className={styles.right}>
            <DrishtiQuestionView
              locations={this.state?.locations}
              category={selectedCategory}
              isDrishtipage={this?.state?.isDrishtipage}
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

export default connect(mapStateToProps, mapDispatchToProps)(DrishtiFaqList);
