import React from "react";
import styles from "./Style.module.css";
import UtsavImage from "../../assets/img/employee performance.png";

function EmployeePerformance() {
  return (
    <div className={styles.employeeDrishtiWrapper}>
      <div className={styles.employeeInducationWrapper}>
        <div>
          <div>
            <span className={styles.title}>Employee Performance</span>
            <div className={styles.newLine} />
          </div>
          <div className={styles.contentWrapper}>
            <div className={styles.content}>
              <p className={styles.contentFormat}>
                To take a great care of our employees’ career pathways,
                organization operates a scientific, credible, and transparent
                Performance Management System that includes components of 360
                Degree assessments.
              </p>
              <p>
                This system gets updated at set periodicity to keep it relevant
                for the changing organizational needs.
              </p>
              <p>
                PMS is <strong>NOT</strong> just the “Appraisal process”, rather
                it is a complete package which contains a series of policies,
                procedures and protocols to propagate the performance culture in
                organization. That is why it is called as a “System” (group of
                activities), not just some single “Policy or Process”.
              </p>
              <div className={styles.eventsFlex}>
                <span className={styles.spanGap}>
                  PMS is to serve on following 7 objectives-
                </span>
                <span className={styles.spanGap}>
                  1. <strong>First,</strong> it is to define what is the
                  expectation and how those expectations can be achieved
                </span>
                <span className={styles.spanGap}>
                  2. <strong>Second,</strong> it is to decide that how much is
                  the viable manpower expense on meeting or not meeting the
                  expectations at organization and Individual level.
                </span>
                <span className={styles.spanGap}>
                  3. <strong>Third ,</strong> it is to propagate each resource
                  of organization to deliver on those expectations. This means
                  building a performance driven transparent culture in
                  organization.
                </span>
                <span className={styles.spanGap}>
                  4. <strong>Fourth ,</strong> it is to rationally link
                  performance of all segments of organization with one another
                  and to align all resources to move in one common direction
                </span>
                <span className={styles.spanGap}>
                  5. <strong>Fifth ,</strong> it is to reward those who worked
                  better on expectations, motivate those who can do better and
                  handle those who cannot do any better.
                </span>
                <span className={styles.spanGap}>
                  6. <strong>Sixth ,</strong> it is to set career pathway,
                  successions and promote internal talent
                </span>
                <span className={styles.spanGap}>
                  7. <strong>Seventh ,</strong> it is to keep the process
                  economic and linked with future of organization.
                </span>
              </div>
              <div className={styles.mappedDataWrapper2}>
                <div>
                  <p>Our PMS have all above elements included in it.</p>
                </div>
                <span className={styles.title}>
                  PMS @ Ind-Swift is a 3-Dimensional Model under which,
                  performance of an employee is designed/measured/rewarded from
                  3 angles-{" "}
                </span>
                <div style={{ width: "100%" }}>
                  <div className={styles.qWrap}>
                    <span style={{ flex: "1" }}>
                      1. Qualitative Individual Angle
                    </span>
                    <span style={{ flex: "1" }} className={styles.title}>
                      Through Goal Sheet A
                    </span>
                  </div>
                  <div className={styles.qWrap}>
                    <span style={{ flex: "1" }}>
                      2. Quantitative Individual Angle
                    </span>
                    <span style={{ flex: "1" }} className={styles.title}>
                      Through Goal Sheet B
                    </span>
                  </div>{" "}
                  <div className={styles.qWrap}>
                    <span style={{ flex: "1" }}>3. Departmental Angle</span>
                    <span style={{ flex: "1" }} className={styles.title}>
                      Through Goal Sheet C
                    </span>
                  </div>
                </div>
                <div>
                  <span>
                    All these 3 angles work within the brackets decided by a
                    grand angle i.e. “Organization’s profitability”
                  </span>
                </div>
              </div>
              <div className={styles.SubhekshWrapper}>
                <span className={styles.title}>
                  Goal Sheet A- To measure how competent an employee is?
                </span>
                <span>
                  Goal Sheet-A collect ratings of employee on general
                  competencies which are derived as per the layer in which
                  he/she is currently working in organization. Different layers
                  need different competencies, and they have different
                  assessment criteria.
                </span>
              </div>
              <div className={styles.descWrapper}>
                <span className={styles.title}>
                  Goal Sheet B- To measure how employee has been able to utilize
                  those competencies for deliver on quantitative expectations.
                </span>
                <div className={styles.mappedDataWrapper}>
                  <span className={styles.mappedData2}>
                    Having competencies is one part of story, but how well an
                    employee is able to utilize those competencies to deliver
                    actual job is another part of story. So, this is measured by
                    Goal Sheet- B (which is the KRA sheet of each individual,
                    high key result areas and target performance in each result
                    area)
                  </span>
                </div>
              </div>

              <div className={styles.descWrapper}>
                <span className={styles.title}>
                  Goal Sheet C- To measure what have been the contribution of
                  employee in overall departmental achievements-
                </span>
                <div className={styles.mappedDataWrapper}>
                  <span className={styles.mappedData2}>
                    If certain employees in a department is performing well, but
                    the overall department has not been able to meet its
                    targeted achievements, or if certain departments performed
                    well, but overall organization has not been able to meet its
                    targeted achievements, then being part of system, this will
                    make an impact on PMS outcome for employees.
                    <br />
                    <p className={styles.restrictPadding}>
                      {" "}
                      Therefore, Goal Sheet C means, overall KRA sheet of entire
                      department (sum total of KRA sheets of all employees of a
                      department).
                    </p>
                  </span>
                </div>
              </div>
              <div className={styles.descWrapper}>
                <span className={styles.title}>
                  For final classification of employee in one of several
                  performance categories following criteria applies-
                </span>
                <span className={styles.title}>
                  20 % weightage to Goal Sheet A* + 60 % Weightage to Goal
                  Sheet-B + 20 % Weightage to Goal Sheet C
                </span>
                <div className={styles.mappedDataWrapper}>
                  <span className={styles.mappedData2}>
                    This generates final score of an employee out of 100, based
                    on which employee gets classified in in one of the 11
                    performance categories.
                    <br />
                    <p className={styles.restrictPadding}>
                      Each performance category will have a pre-decided %
                      increase which is arriving from scientific calculations of
                      DISHA + Budgets + PCR targets.
                    </p>
                    <br />
                    <p className={styles.restrictPadding}>
                      As Goal Sheet-A collect rating on general traits, Ratings
                      received from different reviewers will be normalized with
                      organization’s average to make the ratings more relevant
                      and realistic
                    </p>
                    <br />
                    <p className={styles.restrictPadding}>
                      For Promotions, organization follow its Promotion Policy
                      provided for employees at SkyNet.
                    </p>
                    <br />
                    <p className={styles.restrictPadding}>
                      We may understand that above model is balancing or linking
                      the performance of{" "}
                      <strong>organization- department – individual</strong>
                      with one another and it fixes the scientifically
                      calculated PMS brackets for entire organization (amount
                      and distribution).
                    </p>
                    <br />
                    <p className={styles.restrictPadding}>
                      At the end of process, employee get result of all 3 Goal
                      Sheets in details PMS letter (with mention of further
                      career plan + compensation change).
                    </p>
                    <br />
                    <p className={styles.restrictPadding}>
                      One to One interaction is conducted, and Training Need of
                      employee is also identified from above process.
                    </p>
                  </span>
                </div>
                <span className={styles.title}>
                  If you have any questions/queries you may reach the HR
                  terminals for clarification/discussion.
                </span>
              </div>
            </div>
            <div className={styles.imageWrapper}>
              <img className={styles.image} src={UtsavImage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeePerformance;
