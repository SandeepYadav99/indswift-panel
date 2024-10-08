import { lazy, useState} from "react";
import {
  Dashboard,
  LocalOffer,
  EventNote,
  PeopleOutlined,
  AssignmentOutlined,
  DashboardOutlined,
  Subtitles,
  PersonRounded,
  FingerprintOutlined,
} from "@material-ui/icons";
import RouteName from "./Route.name";
import Constants from "../config/constants";
import ContentList from "../views/Content/ContentList/ContentList.component.js";
import LetterHead from "../views/Content/LetterHeadList/LetterList/LetterList.component.js";
import LetterHeadCreate from "../views/Content/LetterHeadList/Create/LetterHeadCreate.view.js";
import ContentCreate from "../views/Content/Create/ContentCreate.js";
const NewEmployeeEdit = lazy(()=> import("../views/NewEmployeeList/NewEmployeeDetails/NewEmployeeEdit/NewEmployeeEdit.js"));
const CloneClaimsList = lazy(()=> import ("../views/AdminClaimManagement/CloneClaimsList/CloneClaimsList.container.js"));
const CloneExitInterviewList = lazy(()=> import ("../views/ExitInterview/CloneExitInterviewList/CloneExitInterviewList.container.js"));
const CloneFullFinalApproval = lazy (()=> import ("../views/Full&FinalApproval/CloneFull&FInalApproval/CloneFullFinalApproval.component.js"));
const CloneBGVerification_View = lazy(()=>import ("../views/PendingBckgroundVerification/CloneView/CloneBGVerification_View.js"));
const SuccessionPlanDetail = lazy(()=>import ("../views/SuccessionDetail/SuccessionDetail.view.js"));
const PMSMasterAdmin = lazy(()=>import("../views/PMSMasterAdmin/PMSMasterAdmin.view.js"));
const useEmployeeTaxDetail = lazy(()=>import("../views/ClaimsManagement/ClaimsDetail/components/EmployeeClaimList/EmployeeTaxDetail/EmployeeTaxDetail.view.js"));
const TaxDetail = lazy(()=>import ("../views/Tax/Detail/TaxDetail.view.js"));
const TaxList = lazy(()=>import ("../views/Tax/List/TaxList.component.js"));
const ClaimTaxCard = lazy(()=> import("../views/ClaimsManagement/ClaimsDetail/components/ClaimTaxCard/ClaimTaxCard.view.js"));
const EmpTravelDetail = lazy(()=> import ("../views/ClaimsManagement/ClaimsDetail/components/EmployeeClaimList/EmpTravelDetail/EmpTravelDetail.view.js"));
const EmpForeignDetail = lazy(()=> import("../views/ClaimsManagement/ClaimsDetail/components/EmployeeClaimList/EmployeeForeign/EmpForeignDetail.view.js"));
const TravelAuthSpec = lazy (()=> import ("../views/TravelPlanner/TravelAuthSpec/TravelAuthSpec.container.js"));
const  FinalDetail = lazy(()=> import ("../views/Full&Final/FinalDetail/FinalDetail.view.js"));
const  FullDetail = lazy(()=> import ("../views/Full&FinalApproval/FullDetail/FullDetail.js"));
const  EmpClaimDetail = lazy(()=> import ("../views/ClaimsManagement/ClaimsDetail/components/EmployeeClaimList/EmpClaimDetail/EmpClaimDetail.view.js"));

const PendingLeaveApplication  =lazy(()=>import("../views/PendingLeaveApplication/PendingLeaveApplication.view")) ;

const PmsMaster = lazy(()=>import("../views/PmsMaster/PmsMasterView.js"))
const EmployeeRecordApprovals =lazy(()=>import("../views/EmployeeRecordApprovals/EmployeeRecordApprovals")) ;

const RelievingExpLetterDetail = lazy(()=>import("../views/Relieving&ExperienceLetter/component/RelievingExpLetterDetail")) ;

const BgvAnalysisReport = lazy(() =>
  import(
    "../views/PendingBckgroundVerification/BgvAnalysisReport/BgvAnalysisReport"
  )
);

const IncrementLetter = lazy(()=>  import("../views/Pms/IncrementLetter/IncrementLetter.view"));
const USCEditView = lazy(()=>  import("../views/HR/HRSettings/components/USCEdit/USCEdit"));
const SuccessionApproval_List = lazy(()=>  import("../views/SuccessionApproval/SuccessionApproval_List"));
const SuccessionPlanner_list = lazy(()=>  import("../views/SuccessionPlaner/SuccessionPlanner_list"));
const LetterApprovalProces_View = lazy(()=>  import("../views/Relving&ExpernsLetterAprvl/LetterApprovalProces_View"));
const LetterApprovalDetail = lazy(()=>  import("../views/Relving&ExpernsLetterAprvl/component/LetterApprovalDetail"));
const RelievingExpLetter_View = lazy(()=>  import("../views/Relieving&ExperienceLetter/RelievingExpLetter_View"));
const CurrencyEditView = lazy(()=>  import("../views/HR/HRSettings/components/CurrencyEdit/CurrencyEdit"));
const ClaimForCard = lazy(()=>  import("../views/ClaimsManagement/ClaimsDetail/components/ClaimForeignCard/ClaimForCard.view"));
const ForeignClaimDetail = lazy(()=>  import("../views/AdminClaimManagement/ForeignClaimDetail/ForeignClaimDetail.view"));
const BGVStatus_Update = lazy(()=>  import("../views/PendingBckgroundVerification/BGVStatus_Update/BGVStatus_Update"));
const BGVDetailView = lazy(()=>  import("../views/PendingBckgroundVerification/BGVDetail_View/BGVDetail_View"));
const ExitInterviewList = lazy(()=>  import("../views/ExitInterview/ExitInterviewList/ExitInterviewList.container"));
const FinalForm = lazy(()=>  import("../views/Full&Final/FinalForm/FinalForm.view.js"));


// const BgvAnalysisReport =lazy(()=>import("../views/PendingBckgroundVerification/BgvAnalysisReport/BgvAnalysisReport"));
const SuccessionPlannerList = lazy(()=>import("../views/SuccessionPlaner/SuccessionPlanner_list"));
const EmployeeInformation = lazy(() =>import("../views/SuccessionApproval/SuccessionDetail/EmpInformation/EmpInformation"));
const PendingLeaveApplicationList = lazy(()=>import("../views/PendingLeaveApplication/PendingLeaveApplication.view"));

const LeaveApplicationForm = lazy(() =>
  import(
    "../views/LeaveApplicationModule/LeaveApplicationForm/LeaveApplicationForm.container"
  )
);
const LeaveApplication = lazy(() =>
  import("../views/LeaveApplicationModule/LeaveApplication.view")
);

const CandidateInformation = lazy(() =>
  import(
    "../views/PendingBckgroundVerification/BGCandidateInformation/BG_CndidateInfo"
  )
);
const PendingBGVerification_View = lazy(() => import("../views/PendingBckgroundVerification/View/PendingBGVerification_View"));
const CandidateStatusGlossary_List = lazy(() =>
  import("../views/CandidateStatusGlossary/CandidateStatusGlossary_List")
);
const ExpiringOfferLetterView = lazy(() =>
  import("../views/ExpiringOfferLetter/ExpiringOfferLetter_View")
);
const C3MLetterView = lazy(() => import("../views/C3MLetters/C3MLetters_View"));
const NAPS_Traning_View = lazy(() =>
  import("../views/NAPS_Traning/NAPS_Traning_View")
);
const AppointmentLetter_View = lazy(() =>
  import("../views/AppointmentLetters/AppointmentLetter_View")
);

const TravelClaimListDetail = lazy(() =>
  import(
    "../views/AdminClaimManagement/TravelClaimDetail/TravelClaimDetail.view"
  )
);
const LoanProcessDetail = lazy(() =>
  import("../views/LoanManagement/LoanProcessDetail/LoanProcessDetail.view")
);
const LoanRecovery = lazy(() =>
  import("../views/LoanManagement/LoanRecovery/LoanRecovery.view")
);
const EmployeeSalaryReport = lazy(() =>
  import("../views/EmployeeSalaryReport/EmployeeSalaryReport.view")
);
const OngoingLoans = lazy(() =>
  import("../views/LoanManagement/OngoingLoans/OngoingLoans.view")
);
const OngoingLoanDetail = lazy(() =>
  import("../views/LoanManagement/OngoingLoanDetail/OngoingLoanDetail.view")
);
const ProcessDetail = lazy(() =>
  import("../views/LoanManagement/ProcessDetail/ProcessDetail.view")
);
const IncrementEmployeeSalaryReport = lazy(() =>
  import(
    "../views/IncrementEmployeeSalaryReport/IncrementEmployeeSalaryReport.view"
  )
);

const ClaimIntCard = lazy(() =>
  import(
    "../views/ClaimsManagement/ClaimsDetail/components/ClaimIntCard/ClaimIntCard.view"
  )
);
const NewEmployeeList = lazy(() =>
  import("../views/NewEmployeeList/NewEmployeeList.view")
);
const NewEmployeeDetails = lazy(() =>
  import("../views/NewEmployeeList/NewEmployeeDetails/NewEmployeeDetails.view")
);
const ReviewRecord = lazy(() =>
  import("../views/Pms/ReviewRecord/PmsNormailize.view")
);

const EmployeeLoanDetail = lazy(() =>
  import("../views/ClaimsManagement/EmployeeLoanDetail/EmployeeLoanDetail.view")
);
const LoanList = lazy(() =>
  import("../views/LoanManagement/LoanList/LoanList.view")
);
const LoanListDetail = lazy(() =>
  import("../views/LoanManagement/LoanListDetail/LoanListDetail.view")
);

const IncrementDetail = lazy(() =>
  import("../views/PmsIncrements/IncrementDetail/IncrementDetail.view")
);
const CandidateInfo = lazy(() =>
  import("../views/Candidates/CandidateInfo/CandidateInfo.view")
);
const ClaimsDetail = lazy(() =>
  import("../views/ClaimsManagement/ClaimsDetail/ClaimsDetail.view")
);
const ClaimMarriageCard = lazy(() =>
  import(
    "../views/ClaimsManagement/ClaimsDetail/components/ClaimMarriageCard/ClaimMarriageCard.view"
  )
);
const ClaimMobileCard = lazy(() =>
  import(
    "../views/ClaimsManagement/ClaimsDetail/components/ClaimMobileCard/ClaimMobileCard.view"
  )
);
const CadreDetails = lazy(() =>
  import("../views/CadreDetails/CadreDetails.view")
);
const ClaimCarCard = lazy(() =>
  import(
    "../views/ClaimsManagement/ClaimsDetail/components/ClaimCarCard/ClaimCarCard.view"
  )
);
const ClaimsList = lazy(() =>
  import("../views/AdminClaimManagement/ClaimsList/ClaimsList.container")
);
const ClaimListDetail = lazy(() =>
  import("../views/AdminClaimManagement/ClaimListDetail/ClaimListDetail.view")
);
const ClaimHealthCard = lazy(() =>
  import(
    "../views/ClaimsManagement/ClaimsDetail/components/ClaimHealthCard/ClaimHealthCard.view"
  )
);

const BudgetPending = lazy(() =>
  import("../views/BudgetPending/BudgetPending.container")
);
const EmployeeReport = lazy(() =>
  import("../views/EmployeeReport/EmployeeReport.view")
);
const NewDashboard = lazy(() => import("../views/dashboard/NewDashboard.view"));
const HRCreateView = lazy(() =>
  import("../views/HR/HRPolicy/HRPolicyCreate.view")
);
const CircularCreateView = lazy(() =>
  import("../views/HR/Circular/CircularCreate.view")
);
const Circular = lazy(() => import("../views/HR/Circular/Circular.container"));
const DesignationList = lazy(() =>
  import("../views/Designation/DesignationList.container")
);
const DesignationCreateView = lazy(() =>
  import("../views/Designation/DesignationCreate.view")
);
const AppSettings = lazy(() =>
  import("../views/AppSettings/AppSettings.container")
);
const HRSettings = lazy(() =>
  import("../views/HR/HRSettings/HRSettings.container")
);
const EmployeeDashboard = lazy(() =>
  import("../views/EmployeePanel/EmployeeDashboard/EmployeeDashboard.view")
);
const EmployeeInducation = lazy(() =>
  import(
    "../views/EmployeePanel/EmployeeInducation/EmployeeInducation.container"
  )
);
const EmployeeHRPolicy = lazy(() =>
  import("../views/EmployeePanel/EmployeeHRPolicy/EmployeeHRPolicy.container")
);
const EmployeeCircular = lazy(() =>
  import("../views/EmployeePanel/EmployeeCircular/EmployeeCircular.container")
);
const EmployeeEngagement = lazy(() =>
  import("../views/EmployeeEngagement/EmployeeEngagement.container")
);
const EmployeeDrishti = lazy(() =>
  import("../views/EmployeePanel/EmployeeDrishti/EmployeeDrishti.container")
);
const EmployeeIkigai = lazy(() =>
  import("../views/EmployeePanel/EmployeeIkigai/EmployeeIkigai.container")
);
const EmployeeDeepak = lazy(() =>
  import("../views/EmployeePanel/EmployeeDeepak/EmployeeDeepak.container")
);
const EmployeeUtsav = lazy(() =>
  import("../views/EmployeePanel/EmployeeUtsav/EmployeeUtsav.container")
);
const HRKnowledge = lazy(() =>
  import("../views/HR/HRKnowledge/HRKnowledge.container")
);
const HRAnnouncement = lazy(() =>
  import("../views/HR/HRAnnouncements/HRAnnouncement.container")
);
const HRAnnouncementCreateView = lazy(() =>
  import("../views/HR/HRAnnouncements/HRAnnouncementCreate.view")
);
const HRKnowledgeCreateView = lazy(() =>
  import("../views/HR/HRKnowledge/HRKnowledgeCreate.view")
);
const HRUtsav = lazy(() => import("../views/HR/HRUtsav/HRUtsav.container"));
const EmployeeKnowledge = lazy(() =>
  import("../views/EmployeePanel/EmployeeKnowledge/EmployeeKnowledge.container")
);
const EmployeePerformance = lazy(() =>
  import("../views/EmployeePerformance/EmployeePerformance.container")
);
const EmployeeClaim = lazy(() =>
  import("../views/EmployeePanel/EmployeeClaim/EmployeeClaim.container")
);
const ReviewCandidate = lazy(() =>
  import("../views/CVReviewCandidate/ReviewCandidate.container")
);
const ViewDocuments = lazy(() =>
  import("../views/ViewDocuments/ViewDocuments")
);
const EmployeeListCreate = lazy(() =>
  import("../views/EmployeeList/EmployeeListCreate")
);
const EmployeeEdit = lazy(() => import("../views/EmployeeEdit/EmployeeEdit"));
const EmployeeEditVersionListContainer = lazy(() =>
  import(
    "../views/EmployeeEditVersions/ListView/EmployeeEditVersionList.container"
  )
);
const EmployeeUtsavDetail = lazy(() =>
  import("../views/EmployeePanel/EmployeeUtsav/EmployeeUtsavDetail")
);
const CandidateDetails = lazy(() =>
  import("../views/Candidates/CandidateDetails/CandidateDetails.view")
);
const InterviewSchedule = lazy(() =>
  import("../views/InterviewSchedule/InterviewSchedule.container")
);
const MyProfileEditView = lazy(() =>
  import("../views/MyProfileEdit/MyProfileEdit.view")
);
const HRPolicy = lazy(() => import("../views/HR/HRPolicy/HRPolicy.container"));
const EmployeeTab = lazy(() => import("../views/Employees/EmployeeTab.view"));
const EmployeeList = lazy(() =>
  import("../views/EmployeeList/EmployeeList.container")
);
const JobRolesList = lazy(() =>
  import("../views/JobRoles/JobRolesList.container")
);
const JobRoleCreateView = lazy(() =>
  import("../views/JobRoleCreate/JobRoleCreate.view")
);
const LocationList = lazy(() =>
  import("../views/Locations/Location/LocationList.container")
);
const LocationCreateView = lazy(() =>
  import("../views/Locations/LocationCreate/LocationCreate.view")
);
const DepartmentList = lazy(() =>
  import("../views/Department/DepartmentList.container")
);
const DepartmentCreateView = lazy(() =>
  import("../views/Department/DepartmentCreate.view")
);
const SubDepartmentList = lazy(() =>
  import("../views/SubDepartment/SubDepartmentList.container")
);
const SubDepartmentCreateView = lazy(() =>
  import("../views/SubDepartment/SubDepartmentCreate.view")
);
const LocationDetail = lazy(() =>
  import("../views/Locations/LocationDetail/LocationDetail.view")
);
const CandidateList = lazy(() =>
  import("../views/Candidates/Candidate/CandidateList.container")
);
const CandidateCreateView = lazy(() =>
  import("../views/Candidates/CandidateCreate/CandidateCreate.view")
);
const AnnualList = lazy(() =>
  import("../views/AnnualBudgets/AnnualList.container")
);
const ManpowerList = lazy(() =>
  import("../views/ManpowerPlanning/ManpowerList.container")
);
const JobOpeningsList = lazy(() =>
  import("../views/JobOpenings/JobOpeningsList.container")
);
const JobOpeningCreateView = lazy(() =>
  import("../views/JobOpeningCreate/JobOpeningCreate.view")
);
const JobOpeningDetail = lazy(() =>
  import("../views/JobOpeningDetail/JobOpeningDetail.view")
);
const GradeList = lazy(() => import("../views/Grade/GradeList.container"));
const GradeCreateView = lazy(() => import("../views/Grade/GradeCreate.view"));
const CadreList = lazy(() => import("../views/Cadre/CadreList.container"));
const CadreCreateView = lazy(() => import("../views/Cadre/CadreCreate.view"));
const CandidateOfferLetter = lazy(() =>
  import("../views/Candidates/CandidateOfferLetter/CandidateOfferLetter.view")
);
const CVShortlistList = lazy(() =>
  import("../views/CVShortlist/CVShortlist.container")
);
const JobOpeningUpdateView = lazy(() =>
  import("../views/JobOpeningUpdate/JobOpeningUpdate.view")
);
const CandidateOLR = lazy(() =>
  import("../views/Candidates/CandidateOLR/CandidateOLR.view")
);
const ReviewOLR = lazy(() => import("../views/ReviewOLR/ReviewOLR.container"));
const PmsBatch = lazy(() =>
  import("../views/Pms/PmsEmployeeWiseBatch/PmsBatch.view")
);
const ClaimTravelCard = lazy(() =>
  import(
    "../views/ClaimsManagement/ClaimsDetail/components/ClaimTravelCard/ClaimTravelCard.view"
  )
);
const ClaimLoanCard = lazy(() =>
  import(
    "../views/ClaimsManagement/ClaimsDetail/components/ClaimLoanCard/ClaimLoanCard.view"
  )
);

const PmsReview = lazy(() => import("../views/Pms/PmsReview/PmsReview.view"));
const PmsPending = lazy(() =>
  import("../views/Pms/PmsReviewerPending/PmsPending.view")
);
const PmsPlanner = lazy(() =>
  import("../views/Pms/Pms4BPlanner/PmsPlanner.view")
);
const PmsPendingReview = lazy(() =>
  import("../views/Pms/Pms4BMyPendingReview/PmsMyPendingReview.view")
);
const InterviewClaimsList = lazy(() =>
  import("../views/InterviewClaimsList/InterviewClaimsList.container")
);
const InterviewClaimDetail = lazy(() =>
  import("../views/InterviewClaimDetail/InterviewClaimDetail.view")
);
const PmsNormailize = lazy(() =>
  import("../views/Pms/PmsNormailize/PmsNormailize.view")
);
const PmsHod = lazy(() => import("../views/Pms/PmsHodPlanner/PmsHod.view"));
const PmsHodReview = lazy(() =>
  import("../views/Pms/PmsHodReview/PmsHodReview.view")
);
const PmsOverallHod = lazy(() =>
  import("../views/Pms/OverallHOD/PmsOverallHodPlanner/PmsOverallHod.view")
);
const PmsOverallHodReview = lazy(() =>
  import("../views/Pms/OverallHOD/PmsOverallHodReview/PmsOverallHodReview.view")
);
const TravelList = lazy(() =>
  import("../views/TravelPlanner/TravelList/TravelList.container")
);
const TravelCreate = lazy(() =>
  import("../views/TravelPlanner/TravelCreate/TravelCreate.view")
);
const TravelDetail = lazy(() =>
  import("../views/TravelPlanner/TravelDetail/TravelDetail.view")
);
const TravelAuth = lazy(() =>
  import("../views/TravelPlanner/TravelAuth/TravelAuth.container")
);
const TravelAuthDetail = lazy(() =>
  import("../views/TravelPlanner/TravelAuthDetail/TravelAuthDetail.view")
);
const ClaimLocCard = lazy(() =>
  import(
    "../views/ClaimsManagement/ClaimsDetail/components/ClaimLocCard/ClaimLocCard.view"
  )
);
const ImprestList = lazy(() =>
  import("../views/ClaimImprest/ImprestList/ImprestList.view")
);
const ImprestCreate = lazy(() =>
  import("../views/ClaimImprest/ImprestCreate/ImprestCreate.view")
);
const ClaimsReport = lazy(() =>
  import("../views/ClaimsReport/ClaimsReport.view")
);
const ClaimCarReport = lazy(() =>
  import("../views/ClaimCarReport/ClaimCarReport.container")
);
const PmsSiteReview = lazy(() =>
  import("../views/Pms/PmsSiteBatches/PmsSiteBatch.view")
);
const PMSSitePendingReview = lazy(() =>
  import("../views/Pms/PMSSitePendingReview/PMSSitePendingReview.view")
);
const EmployeeImprest = lazy(() =>
  import("../views/ClaimImprest/EmployeeImprest/EmployeeImprest.view")
);
const ImprestApproval = lazy(() =>
  import("../views/ClaimImprest/ImprestApproval/ImprestApproval.container")
);
const IncrementMaster = lazy(() =>
  import("../views/Pms/IncrementMaster/IncrementMaster.view")
);
const ImprestApprovalDetail = lazy(() =>
  import(
    "../views/ClaimImprest/ImprestApprovalDetail/ImprestApprovalDetail.view"
  )
);
const EmployeeImprestDetail = lazy(() =>
  import(
    "../views/ClaimImprest/EmployeeImprestDetail/EmployeeImprestDetail.view"
  )
);
const DepartmentDetail = lazy(() =>
  import("../views/Department/DepartmentDetail/DepartmentDetail.view")
);
const ImprestDetail = lazy(() =>
  import("../views/ClaimImprest/ImprestDetail/ImprestDetail.view")
);
const IncrementPlanner = lazy(() =>
  import("../views/PmsIncrements/IncrementPlanner/IncrementPlanner.view")
);

const NotificationData = lazy(()=>import("../views/Notification/Notification.component.js"))

const FullFinalComponent = lazy(()=>import("../views/Full&Final/FullFinal.component"));

const FullFinalApprovalJourney = lazy(()=>import("../views/Full&FinalApproval/FullFinalApproval.component"))

const PendingLeaveDetailApplication = lazy(()=>import("../views/PendingLeaveApplication/PendingApplicationDetail/PendingApplication.view.js"))

const NotificationListModule = lazy(()=>import("../views/NotificationModule/NotificationList.module.js"));

const NotificationCreateModule = lazy(()=>import("../views/NotificationModule/SendNotification/Create.module.js"))

const MobileLandingPage = lazy(()=>import("../views/MobileLandingPage/MobileLandingPage.component.js"))
const TestView = lazy(()=>import("../views/test/Test.view"))
const SubscribeView = lazy(()=>import("../views/Subscribe/SubscribeView.js"))
const CalendarList = lazy(()=>import("../views/PayrollManagement/Calendar/List/CalendarList.js"));
const AttendanceReport = lazy(()=>import("../views/PayrollManagement/AttendanceReport/AttendanceReport.js"))

const ShiftsLists = lazy(()=>import("../views/PayrollManagement/ShiftManagement/Lists/ShiftsLists.js"))
const AddEmployeeTable = lazy(()=>import("../views/PayrollManagement/ShiftManagement/AssociatedEmployees/Component/AddEmployeeTable/AddEmployeeTable.component.js"))

const ShiftDetail = lazy(()=>import("../views/PayrollManagement/ShiftManagement/ShiftDetail/ShiftDetail.js"))
const UpdateAttendance = lazy(()=>import("../views/UpdateAttendance/UpdateAttendance.js"))
const MusterReport = lazy(()=>import("../views/PayrollManagement/MusterReport/MusterReport.js"))
const ShiftWiseReport = lazy(()=>import("../views/PayrollManagement/ShiftWiseReport/ShiftWiseReport.js"))
const PayslipsGeneration = lazy(()=>import("../views/PayrollManagement/PayslipsGeneration/PayslipsGeneration.js"))


const Roles = Constants.ROLES;
const Modules= Constants.MODULES;

const dashboardRoutes = [
  {
    path: `${RouteName.HOMEPAGE_MOBILE}`,
    icon: DashboardOutlined,
    sidebarName: "Homepage",
    navbarName: "Homepage",
    component: MobileLandingPage,
    is_sidebar:true,
    is_protect: true,
    isDesktopHide:true,
    moduleName:Modules?.MOB_HOME
  },
  {
    path: RouteName.MY_PROFILE,
    sidebarName: "My Profile",
    navbarName: "My Profile",
    icon: PersonRounded,
    component: EmployeeTab,
    is_sidebar: true,
    is_protect: true,
    moduleName:Modules?.EMP_PROFILE
  },
  {
    path: `${RouteName.MY_PROFILE_UPDATE}`,
    sidebarName: "My Profile",
    navbarName: "My Profile",
    icon: PersonRounded,
    component: MyProfileEditView,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: RouteName.EMPLOYEE_DASHBOARD,
    sidebarName: "Dashboard",
    navbarName: "Dashboard",
    icon: PeopleOutlined,
    component: EmployeeDashboard,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    moduleName:Modules?.EMP_DAHSBOARD
    // parent: 'employeedashboard',
  },
  {
    path: "/",
    sidebarName: "HR Dashboard",
    navbarName: "Admin Dashboard",
    icon: DashboardOutlined,
    component: NewDashboard,
    is_sidebar: true,
    moduleName:Modules?.HR_DASHBOARD,
    roles: [Roles.ADMIN,Roles.HR, Roles.RECRUITER, Roles.CORPORATE_HR],
  },
  {
    path: RouteName.EMPLOYEES,
    sidebarName: "Employee Records",
    navbarName: "Employee Records",
    icon: AssignmentOutlined,
    component: EmployeeList,
    is_sidebar: true,
    is_protect: true,
    // should_regex: true,
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
    moduleName:Modules?.HR_EMP_RECORD,
  },
  {
    path: "null",
    sidebarName: "HR Approvals",
    navbarName: "HR Approvals",
    icon: EventNote,
    is_sidebar: true,
    slug: "approval",
    is_parent: true,
    roles: [Roles.CORPORATE_HR, Roles.HR_CHANGE_APPROVER],
  },
  {
    path: "/hrpolicy",
    sidebarName: "HR Policies",
    navbarName: "HR Policies",
    icon: PeopleOutlined,
    component: EmployeeHRPolicy,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    // parent: 'employeedashboard',
  },
  {
    path: "/employeecircular",
    sidebarName: "Circulars",
    navbarName: "Circulars",
    icon: PeopleOutlined,
    component: EmployeeCircular,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    // parent: 'employeedashboard',
  },
  {
    path: "/employeeInduction",
    sidebarName: "Employee Induction",
    navbarName: "Employee Induction",
    icon: PeopleOutlined,
    component: EmployeeInducation,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    moduleName:Modules?.EMP_INDUCTION
    // parent: 'employeedashboard',
  },
  {
    path: "/employee/knowledge",
    sidebarName: "Knowledge Center",
    navbarName: "Knowledge Center",
    icon: PeopleOutlined,
    component: EmployeeKnowledge,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    moduleName:Modules?.EMP_KNOWLEDGE
    // parent: 'employeedashboard',
  },
  {
    path: "/employee/learning",
    sidebarName: " Learning Management System",
    navbarName: " Learning Management System",
    icon: PeopleOutlined,
    component: EmployeeClaim,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    moduleName:Modules?.EMP_LMS
    // parent: 'employeedashboard',
  },
  {
    path: "null",
    sidebarName: "Swift-HCM ",
    navbarName: "Swift-HCM",
    icon: EventNote,
    is_sidebar: true,
    slug: "swift",
    is_parent: true,
  },
  {
    path: "/employee/engagement",
    sidebarName: "HCM Module",
    navbarName: "Admin Dashboard",
    icon: DashboardOutlined,
    component: EmployeeEngagement,
    is_sidebar: true,
    parent: "swift",
    moduleName:Modules?.EMP_HCM
  },
  {
    path: "/employee/drishti",
    sidebarName: "Drishti",
    navbarName: "Admin Dashboard",
    icon: DashboardOutlined,
    component: EmployeeDrishti,
    is_sidebar: true,
    parent: "swift",
    moduleName:Modules?.EMP_DRISHTI
  },
  {
    path: "/employee/deepak",
    sidebarName: "Deepak",
    navbarName: "Admin Dashboard",
    icon: DashboardOutlined,
    component: EmployeeDeepak,
    is_sidebar: true,
    parent: "swift",
    moduleName:Modules?.EMP_DEEPAK
  },
  {
    path: "/employee/utsav",
    sidebarName: "Utsav",
    navbarName: "Admin Dashboard",
    icon: DashboardOutlined,
    component: EmployeeUtsav,
    is_sidebar: true,
    parent: "swift",
    moduleName:Modules?.EMP_UTSAV
  },
  {
    path: "/employee/utsav/:id",
    sidebarName: "Utsav",
    navbarName: "Admin Dashboard",
    icon: DashboardOutlined,
    component: EmployeeUtsavDetail,
    is_sidebar: false,
    parent: "swift",
  },
  {
    path: "/employee/udeshya",
    sidebarName: "Udeshya",
    navbarName: "Admin Dashboard",
    icon: DashboardOutlined,
    component: EmployeeIkigai,
    is_sidebar: true,
    parent: "swift",
    moduleName:Modules?.EMP_UDESHYA
  },
  {
    path: "/employee/claim",
    sidebarName: "Employee Claim",
    navbarName: "Employee Claim",
    icon: PeopleOutlined,
    component: ClaimsDetail,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    moduleName:Modules?.EMP_CLAIMS
    // parent: 'employeedashboard',
  },
  {
    path: "null",
    sidebarName: "Imprest",
    navbarName: "Imprest",
    icon: AssignmentOutlined,
    is_sidebar: true,
    slug: "imp",
    is_parent: true,
    // roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR, Roles.ACCOUNTANT, Roles.CORPORATE_REVIEWER],
  },
  {
    path: "null",
    sidebarName: "Travel Planner",
    navbarName: "Travel Planner",
    icon: AssignmentOutlined,
    is_sidebar: true,
    slug: "tp",
    is_parent: true,
    // roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR, Roles.ACCOUNTANT, Roles.CORPORATE_REVIEWER],
  },
  {
    path: "null",
    sidebarName: "Claim Management",
    navbarName: "Claim Management",
    icon: AssignmentOutlined,
    is_sidebar: true,
    slug: "cm",
    is_parent: true,
    // roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR, Roles.ACCOUNTANT, Roles.CORPORATE_REVIEWER],
  },
  {
    path: "null",
    sidebarName: "Employee Loans",
    navbarName: "Employee Loans",
    icon: AssignmentOutlined,
    is_sidebar: true,
    slug: "emp_loan",
    is_parent: true,
    // roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR, Roles.ACCOUNTANT, Roles.CORPORATE_REVIEWER],
  },
  {
    path: "null",
    sidebarName: "Recruitment",
    navbarName: "Recruitment",
    icon: AssignmentOutlined,
    is_sidebar: true,
    slug: "recure",
    is_parent: true,
    roles: [Roles.ADMIN,Roles.HR, Roles.GENERAL, Roles.CORPORATE_HR,Roles.MD],
    // roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR, Roles.ACCOUNTANT, Roles.CORPORATE_REVIEWER],
  },
  {
    path: "null",
    sidebarName: "Talent Acquistion",
    navbarName: "Talent Acquistion",
    icon: EventNote,
    is_sidebar: true,
    slug: "recruitment",
    is_parent: true,
    // roles: [Roles.ADMIN,Roles.HR, Roles.RECRUITER, Roles.CORPORATE_HR],
    roles: [Roles.ADMIN,Roles.HR, Roles.OLR, Roles.RECRUITER, Roles.CORPORATE_HR,Roles.MD,Roles.OTHERS],
  },
  {
    path: "null",
    sidebarName: "PMS Planner",
    navbarName: "PMS Planner",
    icon: AssignmentOutlined,
    is_sidebar: true,
    slug: "pm",
    is_parent: true,
    // hideMobileView:true,
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: "null",
    sidebarName: "Employee Performance",
    navbarName: "Employee Performance",
    icon: AssignmentOutlined,
    is_sidebar: true,
    slug: "employee_pm",
    is_parent: true,
    // hideMobileView:true,
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR, Roles.GENERAL],
  },
  {
    path: "null",
    sidebarName: "Increments",
    navbarName: "Increments",
    icon: AssignmentOutlined,
    is_sidebar: true,
    slug: "pms_increments",
    is_parent: true,
    hideMobileView:true,
    roles: [Roles.CORPORATE_HR],
  },
  {
    path: "null",
    sidebarName: "Manpower Budget & Planning",
    navbarName: "Manpower Budget & Planning",
    icon: EventNote,
    is_sidebar: true,
    slug: "budget",
    is_parent: true,
    // roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: "null",
    sidebarName: "Leave & Attandance",
    navbarName: "Leave & Attendance",
    icon: AssignmentOutlined,
    is_sidebar: true,
    slug: "leave_attend",
    is_parent: true,
    // roles: [Roles.CORPORATE_HR],
  },
  {
    path: "null",
    sidebarName: "On-Boarding",
    navbarName: "On-Boarding",
    icon: AssignmentOutlined,
    is_sidebar: true,
    slug: "onboard",
    is_parent: true,
    // hideMobileView:true,
    // roles: [Roles.CORPORATE_HR],
  },
  {
    path: "null",
    sidebarName: "Off-Boarding",
    navbarName: "Off-Boarding",
    icon: AssignmentOutlined,
    is_sidebar: true,
    slug: "offboard",
    is_parent: true,
    // roles: [Roles.CORPORATE_HR],
  },
  {
    path: "null",
    sidebarName: "HR Documents & Updates",
    navbarName: "HR Documents & Updates",
    icon: EventNote,
    is_sidebar: true,
    slug: "Hr",
    is_parent: true,
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: "null",
    sidebarName: "Skynet Admin",
    navbarName: "Skynet Admin",
    icon: EventNote,
    is_sidebar: true,
    slug: "masters",
    is_parent: true,
    roles: [Roles.CORPORATE_HR],
  },
  {
    path: RouteName.EXPIRING_OFFER_LETTER,
    sidebarName: "Expiring Offer Letter",
    navbarName: "Expiring Offer Letter",
    icon: AssignmentOutlined,
    component: ExpiringOfferLetterView,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    // parent: 'employeedashboard',
    roles: [Roles.RECRUITER, Roles.CORPORATE_HR,Roles.ADMIN,Roles.HR],
  },
  {
    path: `${RouteName.SUCCESSION_APPROVAL_DETAIL}:id`,
    sidebarName: "Succession Approval",
    navbarName: "Succession Approval",
    icon: AssignmentOutlined,
    component: EmployeeInformation,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    // parent: 'employeedashboard',
  },
  {
    path: "/employee/performance",
    sidebarName: "Employee Performance",
    navbarName: "Employee Performance",
    icon: PeopleOutlined,
    component: EmployeePerformance,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "employee_pm",
  },
  {
    path: `${RouteName.PERFORMANCE_PENDING}`,
    sidebarName: "Pending 90 Degree Review",
    navbarName: "Pending 90 Degree Review",
    icon: PeopleOutlined,
    component: PmsPending,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "employee_pm",
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR, Roles.GENERAL],
  },
  {
    path: `${RouteName.PERFORMANCE_PENDING_REVIEW}`,
    sidebarName: "Pending 360 Review",
    navbarName: "Pending 360 Review",
    icon: PeopleOutlined,
    component: PmsPendingReview,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "employee_pm",
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR, Roles.GENERAL],
  },

  {
    path: `${RouteName.PMS_SITE_PENDING}`,
    sidebarName: "Type 5 Form Pending Review",
    navbarName: "Type 5 Form Pending Review",
    icon: PeopleOutlined,
    component: PMSSitePendingReview,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "employee_pm",
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR, Roles.GENERAL],
  },
  {
    path: `${RouteName.PERFORMANCE_HOD_REVIEW}`,
    sidebarName: "HOD Pending Reviews",
    navbarName: "HOD Pending Reviews",
    icon: PeopleOutlined,
    component: PmsHodReview,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "employee_pm",
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR, Roles.GENERAL],
  },
  {
    path: `${RouteName.PERFORMANCE_OVERALL_HOD_REVIEW}`,
    sidebarName: "Overall HOD Pending Reviews",
    navbarName: "Overall HOD Pending Reviews",
    icon: PeopleOutlined,
    component: PmsOverallHodReview,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "employee_pm",
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR, Roles.GENERAL],
  },
  // {
  //   path: "/employee/learning",
  //   sidebarName: " Learning Management System",
  //   navbarName: " Learning Management System",
  //   icon: PeopleOutlined,
  //   component: EmployeeClaim,
  //   is_sidebar: true,
  //   is_protect: true,
  //   should_regex: true,
  //   // parent: 'employeedashboard',
  // },
  // {
  //   path: "null",
  //   sidebarName: "Talent Management",
  //   navbarName: "Talent Management",
  //   icon: AssignmentOutlined,
  //   is_sidebar: true,
  //   slug: "tm",
  //   is_parent: true,
  //   roles: [Roles.ADMIN,Roles.HR, Roles.GENERAL, Roles.CORPORATE_HR],
  // },
  {
    path: "/tm/review",
    sidebarName: "Review Candidates",
    navbarName: "Review Candidates",
    icon: PeopleOutlined,
    component: ReviewCandidate,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "recure",
    roles: [Roles.ADMIN,Roles.HR, Roles.GENERAL, Roles.CORPORATE_HR,Roles.MD],
    moduleName:Modules?.HR_REVIEW_CANDIDATE
  },
  {
    path: `${RouteName.CV_SHORTLIST_LIST}:id`,
    sidebarName: "Review Candidates",
    navbarName: "Review Candidates",
    icon: PeopleOutlined,
    component: CVShortlistList,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "tm",
    roles: [Roles.ADMIN,Roles.HR, Roles.GENERAL, Roles.CORPORATE_HR,Roles.MD],
  },
  {
    path: RouteName.INTERVIEW_SCHEDULE,
    sidebarName: "Interview Schedule",
    navbarName: "Interview Schedule",
    icon: PeopleOutlined,
    component: InterviewSchedule,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "recure",
    roles: [Roles.ADMIN,Roles.HR, Roles.GENERAL, Roles.CORPORATE_HR,Roles.MD],
    moduleName:Modules?.HR_INTERVIEW
  },
  {
    path: RouteName.CANDIDATES,
    sidebarName: "Candidate Data-Base",
    navbarName: "Candidate Data-Base",
    icon: PeopleOutlined,
    component: CandidateList,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "recruitment",
    roles: [Roles.ADMIN,Roles.HR, Roles.RECRUITER, Roles.CORPORATE_HR],
    moduleName:Modules?.HR_CANDIDATE
  },
  {
    path: RouteName.JOB_OPENINGS,
    sidebarName: "Job Openings",
    navbarName: "Job Openings",
    icon: PeopleOutlined,
    component: JobOpeningsList,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "recruitment",
    roles: [Roles.ADMIN,Roles.HR, Roles.RECRUITER, Roles.CORPORATE_HR],
    moduleName:Modules?.HR_JOB_OPENING
  },
  {
    path: RouteName.REVIEW_OLR,
    sidebarName: "Review OLR",
    navbarName: "Review OLR",
    icon: PeopleOutlined,
    component: ReviewOLR,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "recruitment",
    moduleName:Modules?.HR_OLR_REVIEW,
    roles: [Roles.ADMIN,Roles.HR, Roles.OLR, Roles.RECRUITER, Roles.CORPORATE_HR,Roles.MD,Roles.OTHERS],
  },
  {
    path: RouteName.CANDIDATE_STATUS_GLOSSARY,
    sidebarName: "Candidate Status Glossary",
    navbarName: "Candidate Status Glossary",
    icon: AssignmentOutlined,
    component: CandidateStatusGlossary_List,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "recruitment",
    moduleName:Modules?.GLOSSARY,
    roles: [Roles.ADMIN,Roles.HR, Roles.RECRUITER, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.PERFORMANCE_BATCH}`,
    sidebarName: "Employee Wise Planner",
    navbarName: "Employee Wise Planner",
    icon: PeopleOutlined,
    component: PmsBatch,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "pm",
    moduleName:Modules?.HR_EMP_PLANNER,
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.PERFORMANCE_REVIEW}`,
    sidebarName: "Reviewer Wise Planner",
    navbarName: "Reviewer Wise Planner",
    icon: PeopleOutlined,
    component: PmsReview,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "pm",
    // moduleName:Modules?.,
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.PMS_PLANNER}`,
    sidebarName: "360 Degree Grid Planner",
    navbarName: "360 Degree Grid Planner",
    icon: PeopleOutlined,
    component: PmsPlanner,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "pm",
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.PMS_SITE_PLANNER}`,
    sidebarName: "Type 5 Form Planner",
    navbarName: "Type 5 Form Planner",
    icon: PeopleOutlined,
    component: PmsSiteReview,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "pm",
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.PERFORMANCE_HOD}`,
    sidebarName: "HOD Wise Planner",
    navbarName: "HOD Wise Planner",
    icon: PeopleOutlined,
    component: PmsHod,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "pm",
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.PERFORMANCE_OVERALL_HOD}`,
    sidebarName: "Overall HOD Wise Planner",
    navbarName: "Overall HOD Wise Planner",
    icon: PeopleOutlined,
    component: PmsOverallHod,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "pm",
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.INCREMENT_MASTER}`,
    sidebarName: "Increments Master",
    navbarName: "Increments Master",
    icon: PeopleOutlined,
    component: IncrementMaster,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "pm",
    hideMobileView:true,
    roles: [Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.PERFORMANCE_NORMALIZE}`,
    sidebarName: "Normalized Records",
    navbarName: "Normalized Records",
    icon: PeopleOutlined,
    component: PmsNormailize,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "pms_increments",
    roles: [Roles.CORPORATE_HR],
  },
  // {
  //     path: `${RouteName.REVIEW_RECORD}`,
  //     sidebarName: "Review Increment Records",
  //     navbarName: "Review Increment Records",
  //     icon: PeopleOutlined,
  //     component: ReviewRecord,
  //     is_sidebar: true,
  //     is_protect: true,
  //     should_regex: true,
  //     // parent: 'pms_increments',
  //     roles: [Roles.CORPORATE_HR,Roles.PMS],
  // },
  {
    path: `${RouteName.PMS_INCREMENT_PLANNER}`,
    sidebarName: "General Award Sheet",
    navbarName: "General Award Sheet",
    icon: PeopleOutlined,
    component: IncrementPlanner,
    is_sidebar: true,
    is_protect: true,
    should_regex: false,
    parent: "pms_increments",
    roles: [Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.PMS_INCREMENT_PLANNER_RED}`,
    sidebarName: "Red Award Sheet",
    navbarName: "Red Award Sheet",
    icon: PeopleOutlined,
    component: IncrementPlanner,
    is_sidebar: true,
    is_protect: true,
    should_regex: false,
    parent: "pms_increments",
    roles: [Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.PMS_INCREMENT_PLANNER_NO}`,
    sidebarName: "Blank Award Sheet",
    navbarName: "Blank Award Sheet",
    icon: PeopleOutlined,
    component: IncrementPlanner,
    is_sidebar: true,
    is_protect: true,
    should_regex: false,
    parent: "pms_increments",
    roles: [Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.PMS_INCREMENT_LETTER}`,
    sidebarName: "Increment Letter",
    navbarName: "Increment Letter",
    icon: PeopleOutlined,
    component: IncrementLetter,
    is_sidebar: true,
    is_protect: true,
    should_regex: false,
    parent: "pms_increments",
    roles: [Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.PMS_INCREMENT_PLANNER_GRAPH}`,
    sidebarName: "Increments Planner Detail",
    navbarName: "Increments Planner",
    icon: PeopleOutlined,
    component: IncrementDetail,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "pms_increments",
    roles: [Roles.CORPORATE_HR],
  },
  {
    path: RouteName.LOCATIONS,
    sidebarName: "Locations",
    navbarName: "Locations",
    icon: PeopleOutlined,
    component: LocationList,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "masters",
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: RouteName.DEPARTMENTS,
    sidebarName: "Department",
    navbarName: "department",
    icon: PeopleOutlined,
    component: DepartmentList,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "masters",
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: RouteName.GRADES,
    sidebarName: "Grades & Cadre",
    navbarName: "Grades & Cadre",
    icon: PeopleOutlined,
    component: GradeList,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "masters",
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: RouteName.DESIGNATION,
    sidebarName: "Designation",
    navbarName: "Designation",
    icon: PeopleOutlined,
    component: DesignationList,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "masters",
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: RouteName.PMS_MASTER_ADMIN,
    sidebarName: "PMS Master",
    navbarName: "PMS Master",
    icon: PeopleOutlined,
    component: PMSMasterAdmin,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "masters",
    roles: [Roles.CORPORATE_HR],
  },
  {
    path: RouteName.PMS_MASTER,
    sidebarName: "PMS Master",
    navbarName: "PMS Master",
    icon: PeopleOutlined,
    component: PmsMaster,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "masters",
    roles: [Roles.ADMIN, Roles.CORPORATE_HR],
  },
  {
    path: RouteName.NEW_EMPLOYEES,
    sidebarName: "New Employee Request",
    navbarName: "New Employee Request",
    icon: PeopleOutlined,
    component: NewEmployeeList,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "approval",
    roles: [Roles.CORPORATE_HR, Roles.HR_CHANGE_APPROVER],
  },
  {
    path: `${RouteName.EMPLOYEE_VERSIONS}`,
    sidebarName: "Employee Changes",
    navbarName: "Employee Changes",
    icon: LocalOffer,
    component: EmployeeEditVersionListContainer,
    is_sidebar: true,
    is_protect: true,
    parent: "approval",
    roles: Constants.is_development
      ? [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR, Roles.HR_CHANGE_APPROVER]
      : [Roles.CORPORATE_HR, Roles.HR_CHANGE_APPROVER],
    moduleName:Modules?.HR_EMP_CHANGE

  },

  {
    path: RouteName.EMPLOYEE_RECORD_APPROVALs,
    sidebarName: "Employee Record Approval",
    navbarName: "Employee Record Approval",
    icon: LocalOffer,
    component: EmployeeRecordApprovals,
    is_sidebar: true,
    is_protect: true,
    parent: "approval",
    roles: Constants.is_development
      ? [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR, Roles.HR_CHANGE_APPROVER]
      : [Roles.CORPORATE_HR, Roles.HR_CHANGE_APPROVER],
      moduleName:Modules?.HR_EMP_APPROVAL
  },


  {
    path: `${RouteName.NEW_EMPLOYEE_DETAIL}:id`,
    sidebarName: "Employee Details",
    navbarName: "Employee Details",
    icon: Dashboard,
    component: NewEmployeeDetails,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
    moduleName:Modules?.HR_NEW_EMP
  },
  {
    path: "/annual",
    sidebarName: "Annual Budgets",
    navbarName: "Annual Budgets",
    icon: PeopleOutlined,
    component: AnnualList,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "budget",
    // hideMobileView:true,
    roles: [Roles.ADMIN,Roles.HR,Roles.CORPORATE_HR],
  },
  {
    path: "/manpower",
    sidebarName: "Manpower Planning",
    navbarName: "Manpower Planning",
    icon: PeopleOutlined,
    component: ManpowerList,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "budget",
    // hideMobileView:true,
    // roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: RouteName.JOB_ROLES,
    sidebarName: "Job Description",
    navbarName: "Job Roles(Designation)",
    icon: PeopleOutlined,
    component: JobRolesList,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent:"budget",
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: "/budget/pending",
    sidebarName: "Pending Approvals",
    navbarName: "Pending Approvals",
    icon: PeopleOutlined,
    component: BudgetPending,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "budget",
    hideMobileView:true,
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: RouteName.JOB_ROLES_CREATE,
    sidebarName: "Products",
    navbarName: "Products",
    icon: LocalOffer,
    component: JobRoleCreateView,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.JOB_ROLES_UPDATE}:id`,
    sidebarName: "Products",
    navbarName: "Products",
    icon: LocalOffer,
    component: JobRoleCreateView,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.JOB_ROLES_DETAILS}:id`,
    sidebarName: "Products",
    navbarName: "Products",
    icon: LocalOffer,
    component: JobRoleCreateView,
    is_sidebar: false,
    is_protect: true,
    onlyShow: true,
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: RouteName.EMPLOYEE_CREATE,
    sidebarName: "Employee Records",
    navbarName: "Employee Records",
    icon: AssignmentOutlined,
    component: EmployeeListCreate,
    is_sidebar: false,
    is_protect: true,
    // should_regex: true,
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.EMPLOYEE_UPDATE}:id`,
    icon: AssignmentOutlined,
    component: EmployeeEdit,
    is_sidebar: false,
    is_protect: true,
    // should_regex: true,
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.NEW_EMPLOYEE_UPDATE}:id`,
    icon: AssignmentOutlined,
    component: NewEmployeeEdit,
    is_sidebar: false,
    is_protect: true,
    // should_regex: true,
    // roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.EMPLOYEE_DETAIL}:id`,
    sidebarName: "Employee Details",
    navbarName: "Employee Details",
    icon: Dashboard,
    component: EmployeeTab,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
    moduleName:Modules?.HR_EMP_PROFLE
  },

  {
    path: `${RouteName.VIEW_DOCUMENTS}`,
    sidebarName: "",
    navbarName: "",
    icon: LocalOffer,
    component: ViewDocuments,
    is_sidebar: false,
    is_protect: false,
  },

  {
    path: `${RouteName.CLAIMS_LIST}`,
    sidebarName: "Claims List",
    navbarName: "Claims List",
    icon: PeopleOutlined,
    component: ClaimsList,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "cm",
    moduleName:Modules?.HR_CLAIM_APPROVE
    // roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR, Roles.ACCOUNTANT, Roles.CORPORATE_REVIEWER],
  },
  // {
  //   path: `${RouteName.CLAIMS_HR_LIST}`,
  //   sidebarName: "Spl claim list (CEO Tab)",
  //   navbarName: "Spl claim list (CEO Tab)",
  //   icon: PeopleOutlined,
  //   component: ClaimsList,
  //   is_sidebar: true,
  //   is_protect: true,
  //   should_regex: true,
  //   parent: "cm",
  //   roles: [Roles.CORPORATE_HR],
  // },
  {
    path: `${RouteName.CLAIMS_CAR_REPORT}`,
    sidebarName: "Car Claims Report",
    navbarName: "Car Claims Report",
    icon: PeopleOutlined,
    component: ClaimCarReport,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "cm",
    roles: [Roles.CORPORATE_HR],
    moduleName:Modules?.HR_CAR_REPORT
  },
  {
    path: `${RouteName.CLAIMS_REPORT}`,
    sidebarName: "Claims Report",
    navbarName: "Claims Report",
    icon: PeopleOutlined,
    component: ClaimsReport,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "cm",
    roles: [Roles.CORPORATE_HR],
    moduleName:Modules?.HR_CLAIM_REPORT
  },
  {
    path: `${RouteName.CLAIMS_INFO}`,
    sidebarName: "My Claims",
    navbarName: "My Claims",
    icon: PeopleOutlined,
    component: ClaimsDetail,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "cm",
  },
  {
    path: `${RouteName.CLAIMS_DETAILS}:id`,
    sidebarName: "Claims List",
    navbarName: "Claims List",
    icon: PeopleOutlined,
    component: ClaimListDetail,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "cm",
    // roles: [Roles.ADMIN,Roles.HR, Roles.ACCOUNTANT, Roles.CORPORATE_HR, Roles.CORPORATE_REVIEWER],
  },
  {
    path: `${RouteName.EMPLOYEE_CLAIMS_DETAILS}:id`,
    sidebarName: "Claims List",
    navbarName: "Claims List",
    icon: PeopleOutlined,
    component: EmpClaimDetail,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "cm",
    // roles: [Roles.ADMIN,Roles.HR, Roles.ACCOUNTANT, Roles.CORPORATE_HR, Roles.CORPORATE_REVIEWER],
  },
  {
    path: `${RouteName.CLAIMS_HR_DETAILS}:id`,
    sidebarName: "Claims List",
    navbarName: "Claims List",
    icon: PeopleOutlined,
    component: ClaimListDetail,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "cm",
    roles: [Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.TRAVEL_CLAIMS_DETAILS}:id`,
    sidebarName: "Claims List",
    navbarName: "Claims List",
    icon: PeopleOutlined,
    component: TravelClaimListDetail,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "cm",
    // roles: [Roles.ADMIN,Roles.HR, Roles.ACCOUNTANT, Roles.CORPORATE_HR, Roles.CORPORATE_REVIEWER],
  },
  {
    path: `${RouteName.EMPLOYEE_TRAVEL_DETAILS}:id`,
    sidebarName: "Claims List",
    navbarName: "Claims List",
    icon: PeopleOutlined,
    component: EmpTravelDetail,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "cm",
    // roles: [Roles.ADMIN,Roles.HR, Roles.ACCOUNTANT, Roles.CORPORATE_HR, Roles.CORPORATE_REVIEWER],
  },
  {
    path: `${RouteName.EMPLOYEE_FOREIGN_DETAILS}:id`,
    sidebarName: "Claims List",
    navbarName: "Claims List",
    icon: PeopleOutlined,
    component: EmpForeignDetail,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "cm",
    // roles: [Roles.ADMIN,Roles.HR, Roles.ACCOUNTANT, Roles.CORPORATE_HR, Roles.CORPORATE_REVIEWER],
  },
  {
    path: `${RouteName.EMPLOYEE_TAX_DETAILS}:id`,
    sidebarName: "Claims List",
    navbarName: "Claims List",
    icon: PeopleOutlined,
    component: useEmployeeTaxDetail,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "cm",
    // roles: [Roles.ADMIN,Roles.HR, Roles.ACCOUNTANT, Roles.CORPORATE_HR, Roles.CORPORATE_REVIEWER],
  },
  {
    path: `${RouteName.FOREIGN_CLAIMS_DETAILS}:id`,
    sidebarName: "Claims List",
    navbarName: "Claims List",
    icon: PeopleOutlined,
    component: ForeignClaimDetail,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "cm",
    // roles: [Roles.ADMIN, Roles.ACCOUNTANT, Roles.CORPORATE_HR, Roles.CORPORATE_REVIEWER],
  },
  {
    path: `${RouteName.FOREIGN_HR_CLAIMS_DETAILS}:id`,
    sidebarName: "Claims List",
    navbarName: "Claims List",
    icon: PeopleOutlined,
    component: ForeignClaimDetail,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "cm",
    roles: [Roles.CORPORATE_HR],
    // roles: [Roles.ADMIN, Roles.ACCOUNTANT, Roles.CORPORATE_HR, Roles.CORPORATE_REVIEWER],
  },
  {
    path: `${RouteName.TRAVEL_HR_CLAIMS_DETAILS}:id`,
    sidebarName: "Claims List",
    navbarName: "Claims List",
    icon: PeopleOutlined,
    component: TravelClaimListDetail,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "cm",
    roles: [Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.CLAIMS_IMPREST}`,
    sidebarName: "My Imprest Ledger",
    navbarName: "My Imprest Ledger",
    icon: PeopleOutlined,
    component: ImprestList,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "imp",
    moduleName:Modules?.EMP_IMPRESTLEDG
    // roles: [Roles.ADMIN,Roles.HR, Roles.ACCOUNTANT, Roles.CORPORATE_HR, Roles.CORPORATE_REVIEWER],
  },
  {
    path: `${RouteName.CLAIMS_IMPREST_DETAILS}:id`,
    sidebarName: "My Imprest Ledger",
    navbarName: "My Imprest Ledger",
    icon: PeopleOutlined,
    component: ImprestDetail,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "imp",
    // roles: [Roles.ADMIN,Roles.HR, Roles.ACCOUNTANT, Roles.CORPORATE_HR, Roles.CORPORATE_REVIEWER],
  },
  {
    path: `${RouteName.IMPREST_APPROVAL}`,
    sidebarName: "Imprest Approval",
    navbarName: "Imprest Approval",
    icon: PeopleOutlined,
    component: ImprestApproval,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "imp",
    moduleName:Modules?.HR_IMPRESTAPPROVAL    // roles: [Roles.ADMIN,Roles.HR, Roles.ACCOUNTANT, Roles.CORPORATE_HR, Roles.CORPORATE_REVIEWER],
  },
  {
    path: `${RouteName.IMPREST_APPROVAL_DETAILS}:id`,
    sidebarName: "Claims List",
    navbarName: "Claims List",
    icon: PeopleOutlined,
    component: ImprestApprovalDetail,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "imp",
    // roles: [Roles.ADMIN,Roles.HR, Roles.ACCOUNTANT, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.EMPLOYEES_IMPREST}`,
    sidebarName: "Employee Imprest Ledger",
    navbarName: "Employee Imprest Ledger",
    icon: PeopleOutlined,
    component: EmployeeImprest,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "imp",
    roles: [Roles.ADMIN, Roles.ACCOUNTANT, Roles.CORPORATE_HR, Roles.HR, Roles.CASHIER],
    moduleName:Modules?.HR_IMPREST_LEDGER
  },
  {
    path: `${RouteName.EMPLOYEES_IMPREST_DETAILS}:id`,
    sidebarName: "Employee Imprest",
    navbarName: "Employee Imprest",
    icon: PeopleOutlined,
    component: EmployeeImprestDetail,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "imp",
    roles: [Roles.ADMIN, Roles.HR,  Roles.ACCOUNTANT, Roles.CORPORATE_HR, Roles.CASHIER],
  },
  {
    path: `${RouteName.CLAIMS_IMPREST_CREATE}`,
    sidebarName: "My Imprest Ledger",
    navbarName: "My Imprest Ledger",
    icon: PeopleOutlined,
    component: ImprestCreate,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "imp",
    // roles: [Roles.ADMIN,Roles.HR, Roles.ACCOUNTANT, Roles.CORPORATE_HR, Roles.CORPORATE_REVIEWER],
  },
  {
    path: `${RouteName.CLAIMS_INTERVIEW}`,
    sidebarName: "Interview Claims List",
    navbarName: "Interview Claims List",
    icon: PeopleOutlined,
    component: InterviewClaimsList,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "cm",
    moduleName:Modules?.HR_INTERVIEW_CLAIM
    // roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR, Roles.ACCOUNTANT, Roles.CORPORATE_REVIEWER],
  },
  {
    path: `${RouteName.CLAIMS_INTERVIEW_DETAILS}:id`,
    sidebarName: "Interview Claims List",
    navbarName: "Interview Claims List",
    icon: PeopleOutlined,
    component: InterviewClaimDetail,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "cm",
    // roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR, Roles.ACCOUNTANT, Roles.CORPORATE_REVIEWER],
  },
  {
    path: `${RouteName.CLAIMS_MARRIGE}`,
    sidebarName: "Claims Marrige",
    navbarName: "Claims Marrige",
    icon: PeopleOutlined,
    component: ClaimMarriageCard,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "cm",
    // roles: [Roles.ADMIN,Roles.HR, Roles.ACCOUNTANT, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.CLAIMS_MOBILE}`,
    sidebarName: "Claims Mobile",
    navbarName: "Claims Mobile",
    icon: PeopleOutlined,
    component: ClaimMobileCard,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "cm",
    // roles: [Roles.ADMIN,Roles.HR, Roles.ACCOUNTANT, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.CLAIMS_CAR}`,
    sidebarName: "Claims Car",
    navbarName: "Claims Car",
    icon: PeopleOutlined,
    component: ClaimCarCard,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "cm",
    // roles: [Roles.ADMIN,Roles.HR, Roles.ACCOUNTANT, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.CLAIMS_TRAVEL}`,
    sidebarName: "Claims Car",
    navbarName: "Claims Car",
    icon: PeopleOutlined,
    component: ClaimTravelCard,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "cm",
    // roles: [Roles.ADMIN,Roles.HR, Roles.ACCOUNTANT, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.CLAIMS_INT}`,
    sidebarName: "Claims Int",
    navbarName: "Claims Int",
    icon: PeopleOutlined,
    component: ClaimIntCard,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "cm",
    // roles: [Roles.ADMIN,Roles.HR, Roles.ACCOUNTANT, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.CLAIMS_CURR}`,
    sidebarName: "Claims Int",
    navbarName: "Claims Int",
    icon: PeopleOutlined,
    component: ClaimForCard,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "cm",
    // roles: [Roles.ADMIN,Roles.HR, Roles.ACCOUNTANT, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.CLAIMS_TAX}`,
    sidebarName: "Claims Int",
    navbarName: "Claims Int",
    icon: PeopleOutlined,
    component: ClaimTaxCard,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "cm",
    // roles: [Roles.ADMIN,Roles.HR, Roles.ACCOUNTANT, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.CLAIMS_LOC}`,
    sidebarName: "Claims Loc",
    navbarName: "Claims Loc",
    icon: PeopleOutlined,
    component: ClaimLocCard,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "cm",
    // roles: [Roles.ADMIN,Roles.HR, Roles.ACCOUNTANT, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.CLAIMS_HEALTH}`,
    sidebarName: "Claims Car",
    navbarName: "Claims Car",
    icon: PeopleOutlined,
    component: ClaimHealthCard,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "cm",
    // roles: [Roles.ADMIN,Roles.HR, Roles.ACCOUNTANT, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.CLAIMS_LOAN}`,
    sidebarName: "Claims Loan",
    navbarName: "Claims Loan",
    icon: PeopleOutlined,
    component: ClaimLoanCard,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "cm",
    // roles: [Roles.ADMIN,Roles.HR, Roles.ACCOUNTANT, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.EMPLOYEE_LOAN_DETAILS}:id`,
    sidebarName: "Employee Loan ",
    navbarName: "Employee Loan ",
    icon: PeopleOutlined,
    component: EmployeeLoanDetail,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "cm",
    // roles: [Roles.ADMIN,Roles.HR, Roles.GENERAL, Roles.CORPORATE_HR],
  },
  {
    path: "null",
    sidebarName: "Reports",
    navbarName: "Reports",
    icon: EventNote,
    is_sidebar: true,
    slug: "reports",
    is_parent: true,
    // hideMobileView:true,
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.EMPLOYEE_REPORT}`,
    sidebarName: "Employee Reports",
    navbarName: "Employee Reports",
    icon: AssignmentOutlined,
    component: EmployeeReport,
    is_sidebar: true,
    parent: "reports",
    roles: [Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.EMPLOYEE_SALARY}`,
    sidebarName: "Salary Comparison Report",
    navbarName: "Salary Comparison Report",
    icon: AssignmentOutlined,
    component: EmployeeSalaryReport,
    is_sidebar: true,
    parent: "reports",
    roles: [Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.EMPLOYEE_INCREMENT_SALARY}`,
    sidebarName: "Increment Salary Comparison Report",
    navbarName: " Increment Salary Comparison Report",
    icon: AssignmentOutlined,
    component: IncrementEmployeeSalaryReport,
    is_sidebar: true,
    parent: "reports",
    roles: [Roles.CORPORATE_HR],
  },

  {
    path: RouteName.HR_POLICIES,
    sidebarName: "HR Policies",
    navbarName: "HR Policies",
    icon: PeopleOutlined,
    component: HRPolicy,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "Hr",
    roles: [Roles.CORPORATE_HR],
    moduleName:Modules?.EMP_HRPOLICY
  },
  {
    path: RouteName.HR_CIRCULARS,
    sidebarName: "Circulars",
    navbarName: "Circulars",
    icon: PeopleOutlined,
    component: Circular,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "Hr",
    roles: [Roles.CORPORATE_HR],
    moduleName:Modules?.EMP_HRCIRCULARS

  },
  {
    path: RouteName.HR_SETTINGS,
    sidebarName: "Settings",
    navbarName: "Settings",
    icon: PeopleOutlined,
    component: HRSettings,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "Hr",
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.HR_USC_UPDATE}:id`,
    sidebarName: "Settings",
    navbarName: "Settings",
    icon: PeopleOutlined,
    component: USCEditView,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "Hr",
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.CURRENCY_UPDATE}:id`,
    sidebarName: "Settings",
    navbarName: "Settings",
    icon: PeopleOutlined,
    component: CurrencyEditView,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "Hr",
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: "/hr/knowledge",
    sidebarName: "Knowledge Center",
    navbarName: "Knowledge Center",
    icon: PeopleOutlined,
    component: HRKnowledge,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "Hr",
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: "/hr/announcement",
    sidebarName: "Announcements",
    navbarName: "Announcements",
    icon: PeopleOutlined,
    component: HRAnnouncement,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "Hr",
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: "/hr/utsav",
    sidebarName: "Utsav",
    navbarName: "Utsav ",
    icon: PeopleOutlined,
    component: HRUtsav,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "Hr",
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  // {
  //     path: 'null',
  //     sidebarName: "Emp-Dashboard",
  //     navbarName: "Emp-Dashboard",
  //     icon: EventNote,
  //     is_sidebar: true,
  //     slug: 'employeedashboard',
  //     is_parent: true,
  // },

  {
    path: `${RouteName.CANDIDATES_DETAILS}:id`,
    sidebarName: "Candidate Details",
    navbarName: "Candidate Details",
    component: CandidateDetails,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.ADMIN,Roles.HR, Roles.RECRUITER, Roles.GENERAL, Roles.CORPORATE_HR],
    moduleName:Modules?.HR_CANDIDATE_PROFILE
  },
  {
    path: `${RouteName.CANDIDATES_INFO}:id`,
    sidebarName: "Candidate Details",
    navbarName: "Candidate Details",
    component: CandidateInfo,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.ADMIN,Roles.HR, Roles.RECRUITER, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.CANDIDATES_OFFER}`,
    sidebarName: "Candidate Offer",
    navbarName: "Candidate Offer",
    component: CandidateOfferLetter,
    is_sidebar: false,
    is_protect: true,
    moduleName:Modules?.HR_OLR_DRAFT,
    roles: [Roles.ADMIN,Roles.HR, Roles.RECRUITER, Roles.CORPORATE_HR,Roles.MD,],
  },
  {
    path: `${RouteName.CANDIDATES_OFFER_DETAILS}:id`,
    sidebarName: "Candidate Offer Details",
    navbarName: "Candidate Offer Details",
    component: CandidateOLR,
    is_sidebar: false,
    is_protect: true,
    roles: [
      Roles.ADMIN,Roles.HR,
      Roles.RECRUITER,
      Roles.CORPORATE_HR,
      Roles.OLR,
      Roles.GENERAL,
      Roles.MD
    ],
  },
  {
    path: RouteName.CANDIDATES_CREATE,
    sidebarName: "Location",
    navbarName: "Location",
    icon: LocalOffer,
    component: CandidateCreateView,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.ADMIN,Roles.HR, Roles.RECRUITER, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.CANDIDATES_UPDATE}:id`,
    sidebarName: "Location",
    navbarName: "Location",
    icon: LocalOffer,
    component: CandidateCreateView,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.ADMIN,Roles.HR, Roles.RECRUITER, Roles.CORPORATE_HR],
  },

  {
    path: RouteName.LOCATIONS_CREATE,
    component: LocationCreateView,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.LOCATIONS_UPDATE}:id`,
    component: LocationCreateView,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.LOCATIONS_DETAILS}:id`,
    sidebarName: "Location Detail",
    navbarName: "Location Detail",
    icon: LocalOffer,
    component: LocationDetail,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },

  {
    path: `${RouteName.DEPARTMENT_DETAIL}:id`,
    sidebarName: "Department Detail",
    navbarName: "Department Detail",
    icon: LocalOffer,
    component: DepartmentDetail,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: RouteName.DEPARTMENT_CREATE,
    component: DepartmentCreateView,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.DEPARTMENT_UPDATE}:id`,
    component: DepartmentCreateView,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.CORPORATE_HR],
  },
  {
    path: RouteName.SUB_DEPARTMENTS_CREATE,
    component: SubDepartmentCreateView,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.SUB_DEPARTMENTS_UPDATE}:id`,
    component: SubDepartmentCreateView,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.SUB_DEPARTMENTS}:code`,
    sidebarName: "SubDepartment",
    navbarName: "SubDepartment",
    icon: Subtitles,
    component: SubDepartmentList,
    is_sidebar: false,
    should_regex: true,
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },

  {
    path: RouteName.DESIGNATION_CREATE,
    component: DesignationCreateView,
    is_sidebar: false,
    is_protect: true,
    roles: Constants.is_development
      ? [Roles.CORPORATE_HR, Roles.ADMIN,Roles.HR]
      : [Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.DESIGNATION_UPDATE}:id`,
    component: DesignationCreateView,
    is_sidebar: false,
    is_protect: true,
    roles: Constants.is_development
      ? [Roles.CORPORATE_HR, Roles.ADMIN,Roles.HR]
      : [Roles.CORPORATE_HR],
  },
  {
    path: RouteName.GRADES_CREATE,
    component: GradeCreateView,
    is_sidebar: false,
    is_protect: true,
    roles: Constants.is_development
      ? [Roles.CORPORATE_HR, Roles.ADMIN,Roles.HR]
      : [Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.GRADES_UPDATE}:id`,
    component: GradeCreateView,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.CORPORATE_HR],
  },
  {
    path: RouteName.CADRES_CREATE,
    component: CadreCreateView,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.CADRES_UPDATE}:id`,
    component: CadreCreateView,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.CADRES_DETAIL}:id`,
    component: CadreDetails,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.CADRES}:code`,
    component: CadreList,
    is_sidebar: false,
    should_regex: true,
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },

  {
    path: RouteName.JOB_OPENINGS_CREATE,
    sidebarName: "Job Openings Create",
    navbarName: "Job Openings Create",
    icon: LocalOffer,
    component: JobOpeningCreateView,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.ADMIN,Roles.HR, Roles.RECRUITER, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.JOB_OPENINGS_UPDATE}:id`,
    sidebarName: "Job Openings Create",
    navbarName: "Job Openings Create",
    icon: LocalOffer,
    component: JobOpeningUpdateView,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.ADMIN,Roles.HR, Roles.RECRUITER, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.JOB_OPENINGS_DETAILS}:id`,
    sidebarName: "Job Openings Detail",
    navbarName: "Job Openings Detail",
    icon: LocalOffer,
    component: JobOpeningDetail,
    is_sidebar: false,
    is_protect: true,
    moduleName:Modules?.HR_JOB_DETAIL,
    roles: [Roles.ADMIN,Roles.HR, Roles.RECRUITER, Roles.CORPORATE_HR],
  },

  {
    path: RouteName.HR_ANNOUNCEMENT_CREATE,
    component: HRAnnouncementCreateView,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.HR_ANNOUNCEMENT_UPDATE}:id`,
    component: HRAnnouncementCreateView,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: RouteName.HR_KNOWLEDGE_CREATE,
    component: HRKnowledgeCreateView,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.HR_KNOWLEDGE_UPDATE}:id`,
    component: HRKnowledgeCreateView,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: RouteName.HR_POLICIES_CREATE,
    component: HRCreateView,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },

  {
    path: `${RouteName.HR_POLICIES_UPDATE}:id`,
    component: HRCreateView,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: RouteName.HR_CIRCULARS_CREATE,
    component: CircularCreateView,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.HR_CIRCULARS_UPDATE}:id`,
    component: CircularCreateView,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },

  {
    path: `${RouteName.TRAVEL_PLANNER}`,
    sidebarName: "My Travel Planner",
    navbarName: "My Travel Planner",
    icon: PeopleOutlined,
    component: TravelList,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "tp",
    moduleName:Modules?.EMP_TAP
    // roles: [Roles.ADMIN,Roles.HR, Roles.ACCOUNTANT, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.TRAVEL_PLANNER_CREATE}`,
    sidebarName: "My Travel Planner",
    navbarName: "My Travel Planner",
    icon: PeopleOutlined,
    component: TravelCreate,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "tp",
    // roles: [Roles.ADMIN,Roles.HR, Roles.ACCOUNTANT, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.TRAVEL_PLANNER_DETAILS}:id`,
    sidebarName: "Interview Claims List",
    navbarName: "Interview Claims List",
    icon: PeopleOutlined,
    component: TravelDetail,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "tp",
    // roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR, Roles.ACCOUNTANT, Roles.CORPORATE_REVIEWER],
  },

  {
    path: `${RouteName.TRAVEL_AUTHEN}`,
    sidebarName: "Travel Authorization",
    navbarName: "Travel Authorization",
    icon: PeopleOutlined,
    component: TravelAuth,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: "tp",
    moduleName:Modules?.HR_TAP_APPROVE
    // roles: [Roles.ADMIN,Roles.HR, Roles.ACCOUNTANT, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.TRAVEL_AUTHEN_SPEC}`,
    sidebarName: "Travel Authorization",
    navbarName: "Travel Authorization",
    icon: PeopleOutlined,
    component: TravelAuthSpec,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "tp",
    // roles: [Roles.ADMIN,Roles.HR, Roles.ACCOUNTANT, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.TRAVEL_AUTHEN_DETAILS}:id`,
    sidebarName: "Interview Claims List",
    navbarName: "Interview Claims List",
    icon: PeopleOutlined,
    component: TravelAuthDetail,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "tp",
    // roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR, Roles.ACCOUNTANT, Roles.CORPORATE_REVIEWER],
  },
  {
    path: `${RouteName.TRAVEL_AUTHEN_DETAILS_SPEC}:id`,
    sidebarName: "Interview Claims List",
    navbarName: "Interview Claims List",
    icon: PeopleOutlined,
    component: TravelAuthDetail,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: "tp",
    // roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR, Roles.ACCOUNTANT, Roles.CORPORATE_REVIEWER],
  },
  {
    path: RouteName.ADMIN_LOAN_LIST,
    sidebarName: "Loan Management",
    navbarName: "Loan Management",
    icon: AssignmentOutlined,
    component: LoanList,
    is_sidebar: true,
    is_protect: true,
    parent:"emp_loan",
    moduleName:Modules?.HR_LOAN_APPROVE
  },
  {
    path: `${RouteName.ADMIN_LOAN_LIST_DETAIL}:id`,
    sidebarName: "Loan Management",
    navbarName: "Loan Management",
    icon: PeopleOutlined,
    component: LoanListDetail,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    // parent: 'tp',
    // roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR, Roles.ACCOUNTANT, Roles.CORPORATE_REVIEWER],
  },

  {
    path: `${RouteName.ADMIN_LOAN_PROCESS}:id`,
    sidebarName: "Loan Management",
    navbarName: "Loan Management",
    icon: PeopleOutlined,
    component: LoanProcessDetail,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    // parent: 'tp',
    // roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR, Roles.ACCOUNTANT, Roles.CORPORATE_REVIEWER],
  },
  {
    path: `${RouteName.ADMIN_LOAN_PROCESS_DETAIL}:id`,
    sidebarName: "Loan Management",
    navbarName: "Loan Management",
    icon: PeopleOutlined,
    component: ProcessDetail,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    // parent: 'tp',
    // roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR, Roles.ACCOUNTANT, Roles.CORPORATE_REVIEWER],
  },
  {
    path: `${RouteName.ADMIN_LOAN_RECOVERY}`,
    sidebarName: "Loan Management",
    navbarName: "Loan Management",
    icon: PeopleOutlined,
    component: LoanRecovery,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    // parent: 'tp',
    // roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR, Roles.ACCOUNTANT, Roles.CORPORATE_REVIEWER],
  },

  {
    path: RouteName.ADMIN_ONGOING_LOANS,
    sidebarName: "Ongoing Loans",
    navbarName: "Ongoing Loans",
    icon: AssignmentOutlined,
    component: OngoingLoans,
    is_sidebar: true,
    is_protect: true,
    roles: [Roles.CORPORATE_HR],
    parent:"emp_loan",
    moduleName:Modules?.HR_ONGOING_LOAN
  },
  {
    path: `${RouteName.ADMIN_ONGOING_LOANS_DETIALS}:id`,
    sidebarName: "Ongoing Loans",
    navbarName: "Ongoing Loans",
    icon: PeopleOutlined,
    component: OngoingLoanDetail,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    // parent: 'tp',
    // roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR, Roles.ACCOUNTANT, Roles.CORPORATE_REVIEWER],
  },
  {
    path: RouteName.PENDING_BACKGROUND_VERIFICATION,
    sidebarName: "Background Verification",
    navbarName: "Background Verification",
    icon: AssignmentOutlined,
    component: PendingBGVerification_View,
    is_sidebar: true,
    is_protect: true,
    parent: "onboard",
     roles: [Roles.ADMIN, Roles.CORPORATE_HR,Roles.RECRUITER, Roles.HR,],
  },
  {
    path: `${RouteName.BGV_ANALYSI_REPOST}`,
    sidebarName: "Pending Background Verification",
    navbarName: "Pending Background Verification",
    icon: AssignmentOutlined,
    component: BgvAnalysisReport,
    is_sidebar: false,
    is_protect: true,
    // slug: 'tp',
    // is_parent: true,
    // parent: "skynetLetter",
    // roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR, Roles.ACCOUNTANT, Roles.CORPORATE_REVIEWER],
  },
  {
    path: `${RouteName.PENDING_VERIFICATION_CREATE}:id`,
    sidebarName: "Pending Background Verification",
    navbarName: "Pending Background Verification",
    icon: AssignmentOutlined,
    component: CandidateInformation,
    is_sidebar: false,
    is_protect: true,
    // slug: 'tp',
    // is_parent: true,
    // parent: "skynetLetter",
    // roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR, Roles.ACCOUNTANT, Roles.CORPORATE_REVIEWER],
  },
  {
    path: `${RouteName.PENDING_VERIFICATION_UPDATE}:id`,
    sidebarName: "Pending Background Verification",
    navbarName: "Pending Background Verification",
    icon: AssignmentOutlined,
    component: BGVStatus_Update,
    is_sidebar: false,
    is_protect: true,
    // slug: 'tp',
    // is_parent: true,
    // parent: "skynetLetter",
    // roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR, Roles.ACCOUNTANT, Roles.CORPORATE_REVIEWER],
  },
  {
    path: `${RouteName.PENDING_VERIFICATION_DETAIL}:id`,
    sidebarName: "Pending Background Verification",
    navbarName: "Pending Background Verification",
    icon: PeopleOutlined,
    component: BGVDetailView,
    is_sidebar: false,
    is_protect: true,
    // slug: 'tp',
    // is_parent: true,
    // parent: "skynetLetter",
    // roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR, Roles.ACCOUNTANT, Roles.CORPORATE_REVIEWER],
  },
  // {
  //   path: "null",
  //   sidebarName: "Skynet Letters",
  //   navbarName: "Skynet Letters",
  //   icon: AssignmentOutlined,
  //   is_sidebar: true,
  //   slug: "skynetLetter",
  //   is_parent: true,
  //   // roles: [Roles.CORPORATE_HR, Roles.ADMIN,Roles.HR, Roles.OTHERS],
  //   roles: [
  //     Roles.ADMIN,Roles.HR,
  //     Roles.CORPORATE_HR,
  //     // Roles.ACCOUNTANT,
  //     // Roles.OTHERS,
  //     // Roles.CORPORATE_REVIEWER,
  //     // Roles.PMS,
  //     // Roles.GENERAL,
  //     // Roles.OLR,
  //     // Roles.RECRUITER,

  //   ],
  // },
  {
    path: RouteName.APPOINTMENT_LETTER,
    sidebarName: "Appointment Letters",
    navbarName: "Appointment Letters",
    icon: PeopleOutlined,
    component: AppointmentLetter_View,
    is_sidebar: true,
    is_protect: true,
    // slug: 'tp',
    // is_parent: true,
    parent: "onboard",
     roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: RouteName.C3MLETTER,
    sidebarName: "C3M Letters",
    navbarName: "C3M Letters",
    icon: PeopleOutlined,
    component: C3MLetterView,
    is_sidebar: true,
    is_protect: true,
    // slug: 'tp',
    // is_parent: true,
    parent: "onboard",
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: RouteName.NAPS_TRANING,
    sidebarName: "NAPS Training Completion Letters",
    navbarName: "NAPS Training Completion Letters",
    icon: PeopleOutlined,
    component: NAPS_Traning_View,
    is_sidebar: true,
    is_protect: true,
    // slug: 'tp',
    parent: "onboard",
     roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: RouteName.RELIEVING_EXPERIENCE_APPROVALS,
    sidebarName: "Relieving & Experience Letter Approvals",
    navbarName: "Relieving & Experience Letter Approvals",
    icon: PeopleOutlined,
    component: LetterApprovalProces_View,
    is_sidebar: false,
    is_protect: true,
    // slug: 'tp',
    // is_parent: true,
    parent: "skynetLetter",
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
    // roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR, Roles.ACCOUNTANT, Roles.CORPORATE_REVIEWER],
  },
  {
    path: RouteName.RELIEVING_EXPERIENCE_APPROVALS_DETAILS,
    sidebarName: "Relieving & Experience Letter Approvals",
    navbarName: "Relieving & Experience Letter Approvals",
    icon: PeopleOutlined,
    component: LetterApprovalDetail,
    is_sidebar: false,
    is_protect: true,
    // slug: 'tp',
    // is_parent: true,
    parent: "skynetLetter",
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
    // roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR, Roles.ACCOUNTANT, Roles.CORPORATE_REVIEWER],
  },

  {
    path: `${RouteName.RELIEVING_EXPERIENCE_LETTER_DETAIL}:id`,
    sidebarName: "Relieving & Experience Letter",
    navbarName: "Relieving & Experience Letter",
    icon: PeopleOutlined,
    component: RelievingExpLetterDetail,
    is_sidebar: false,
    is_protect: true,
    // slug: 'tp',
    // is_parent: true,
    parent: "skynetLetter",
    //  roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: "http://103.99.200.193/TOS7x1/frmLogin.aspx",
    sidebarName: "Attendance Gateway",
    navbarName: "",
    icon: FingerprintOutlined,
    is_external: true,
    component: <div></div>,
    is_sidebar: true,
    is_protect: false,
    parent:"leave_attend"
  },
  // { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
  {
    path: RouteName.LEAVE_APPLICATION_LIST_VIEW,
    sidebarName: "My Leave Application",
    navbarName: "My Leave Application",
    icon: AssignmentOutlined,
    component: LeaveApplication,
    is_sidebar: true,
    is_protect: true,
    parent:"leave_attend"
  },
  {
    path: RouteName.PENDING_LEAVE_APPLICATION,
    sidebarName: "Leave Approval",
    navbarName: "Leave Approval",
    icon: AssignmentOutlined,
    component: PendingLeaveApplicationList,
    is_sidebar: true,
    is_protect: true,
    parent:"leave_attend"
  },
  {
    path: RouteName.LEAVE_APPLICATION_FORM,
    sidebarName: "My Leave Application",
    navbarName: "My Leave Application",
    component: LeaveApplicationForm,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: RouteName.EXIT_INTERVIEW_LIST,
    sidebarName: "Exit Interview List",
    navbarName: "Exit Interview List",
    icon: PeopleOutlined,
    component: ExitInterviewList,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent:"offboard",
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: RouteName.RELIEVING_EXPERIENCE_LETTER,
    sidebarName: "Relieving & Experience Letter",
    navbarName: "Relieving & Experience Letter",
    icon: PeopleOutlined,
    component: RelievingExpLetter_View,
    is_sidebar: true,
    is_protect: true,
    // slug: 'tp',
    // is_parent: true,
    should_regex: true,
    parent: "offboard",
    roles: [
      Roles.ADMIN,Roles.HR,
      Roles.CORPORATE_HR,
      Roles.ACCOUNTANT,
      Roles.OTHERS,
      Roles.CORPORATE_REVIEWER,
      Roles.PMS,
      Roles.GENERAL,
      Roles.OLR,
      Roles.RECRUITER,

    ],
  },
  {
    path: `${RouteName.FULL_FINAL_FORM}:id`,
    sidebarName: "Full & Final Form",
    navbarName: "Full & Final Form",
    icon: AssignmentOutlined,
    component: FinalForm,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.ADMIN, Roles.CORPORATE_HR,Roles.OTHERS, Roles.HR,Roles.RECRUITER,Roles.ACCOUNTANT],
  },
  {
    path: `${RouteName.FULL_FINAL_DETAIL}:id`,
    sidebarName: "Full & Final Form",
    navbarName: "Full & Final Form",
    icon: AssignmentOutlined,
    component: FinalDetail,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.TAX_DETAIL}:id`,
    sidebarName: "Tax Detail",
    navbarName: "Tax Detail",
    icon: AssignmentOutlined,
    component: TaxDetail,
    is_sidebar: false,
    is_protect: true,
    roles: [Roles.ACCOUNTANT,Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.FULL_FINAL_DETAIL_APPROVAL}:id`,
    sidebarName: "Full & Final Form",
    navbarName: "Full & Final Form",
    icon: AssignmentOutlined,
    component: FullDetail,
    is_sidebar: false,
    is_protect: true,
    // roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: RouteName.FULL_FINAL_APPLICATION,
    sidebarName: "Full & Final Form",
    navbarName: "Full & Final Form",
    icon: AssignmentOutlined,
    component: FullFinalComponent,
    is_sidebar: true,
    is_protect: true,
    parent:"offboard",
    // hideMobileView:true,
    roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: RouteName.FULL_FINAL_APPROVAL,
    sidebarName: "Full & Final Approval",
    navbarName: "Full & Final Approval",
    icon: AssignmentOutlined,
    component: FullFinalApprovalJourney,
    is_sidebar: true,
    is_protect: true,
    parent:"offboard",
    // hideMobileView:true,
    // roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
  },
  {
    path: RouteName.SUCCESSION_PLANING,
    sidebarName: "Succession Planner",
    navbarName: "Succession Planner",
    icon: PeopleOutlined,
    component: SuccessionPlanner_list,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    roles:[Roles.CORPORATE_HR, Roles.ADMIN,Roles.HR]
  },
  {
    path: RouteName.SUCCESSION_PLANNER,
    sidebarName: "Succession Planner",
    navbarName: "Succession Planner",
    icon: AssignmentOutlined,
    component: SuccessionPlannerList,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: 'offboard',
    // hideMobileView:true,
    roles: [Roles.CORPORATE_HR,Roles.ADMIN,Roles.HR,Roles.MD],
    // parent: 'employeedashboard',
  },
  {
    path: `${RouteName.SUCCESSION_DETAIL}:id`,
    sidebarName: "Succession Planner",
    navbarName: "Succession Planner",
    icon: AssignmentOutlined,
    component: SuccessionPlanDetail,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    parent: 'offboard',
    roles: [Roles.CORPORATE_HR,Roles.ADMIN,Roles.HR,Roles.MD],
  },

  {
    path: RouteName.SUCCESSION_APPROVAL,
    sidebarName: "Succession Approval",
    navbarName: "Succession Approval",
    icon: AssignmentOutlined,
    component: SuccessionApproval_List,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
    parent: 'offboard',
    // hideMobileView:true,
  },
  {
      path: `${RouteName.PENDING_LEAVE_APPLICATION}`+`/:id`,
      sidebarName: "Pending Leave Application",
      navbarName: "Pending Leave Application",
      icon: AssignmentOutlined,
      component: PendingLeaveDetailApplication,
      is_sidebar: false,
      is_protect: true,
  },
  {
    path: `${RouteName.NOTIFICATION}`,
    icon: AssignmentOutlined,
    component: NotificationData,
    is_sidebar: false,
    is_protect: true,
},
{
  path: `${RouteName.APP_NOTIFICATION}`,
  sidebarName: "Notification",
  navbarName: "Notification",
  icon: DashboardOutlined,
  component: NotificationListModule,
  is_sidebar: true,
  is_protect: true,
  hideMobileView:true,
  roles: [Roles.ADMIN,Roles.HR, Roles.RECRUITER, Roles.CORPORATE_HR],
},
{
  path: `${RouteName.APP_NOTIFICATION_CREATE}`,
  icon: DashboardOutlined,
  component: NotificationCreateModule,
  is_sidebar: false,
  is_protect: true,
},
{
  path: `${RouteName.APP_NOTIFICATION_CREATE}`+`/:id`,
  icon: DashboardOutlined,
  component: NotificationCreateModule,
  is_sidebar: false,
  is_protect: true,
},
{
  path: RouteName.TAX_LIST,
  sidebarName: "Tax Rebate Approval",
  navbarName: "Tax Rebate Approval",
  icon: AssignmentOutlined,
  component: TaxList,
  is_sidebar: true,
  is_protect: true,
  roles: [Roles.ACCOUNTANT,Roles.CORPORATE_HR],
},
{
  path: RouteName.CONTENT_LIST,
  sidebarName: "Content Customization",
  navbarName: "Content Customization",
  icon: AssignmentOutlined,
  component: ContentList,
  is_sidebar: true,
  is_protect: true,
  // roles: [Roles.ACCOUNTANT,Roles.CORPORATE_HR],
},
{
  path: RouteName.LETTERHEAD_LIST,
  sidebarName: "Content Customization",
  navbarName: "Content Customization",
  icon: AssignmentOutlined,
  component: LetterHead,
  is_sidebar: false,
  is_protect: true,
  // roles: [Roles.ACCOUNTANT,Roles.CORPORATE_HR],
},
{
  path: RouteName.CONTENT_CREATE,
  sidebarName: "Content Customization",
  navbarName: "Content Customization",
  icon: AssignmentOutlined,
  component: ContentCreate,
  is_sidebar: false,
  is_protect: true,
  // roles: [Roles.ACCOUNTANT,Roles.CORPORATE_HR],
},
{
  path: `${RouteName.CONTENT_UPDATE}:id`,
  sidebarName: "Content Customization",
  navbarName: "Content Customization",
  icon: AssignmentOutlined,
  component: ContentCreate,
  is_sidebar: false,
  is_protect: true,
  // roles: [Roles.ACCOUNTANT,Roles.CORPORATE_HR],
},
{
  path: RouteName.LETTERHEAD_CREATE,
  sidebarName: "Content Customization",
  navbarName: "Content Customization",
  icon: AssignmentOutlined,
  component: LetterHeadCreate,
  is_sidebar: false,
  is_protect: true,
  // roles: [Roles.ACCOUNTANT,Roles.CORPORATE_HR],
},
{
  path: `${RouteName.LETTERHEAD_UPDATE}:id`,
  sidebarName: "Content Customization",
  navbarName: "Content Customization",
  icon: AssignmentOutlined,
  component: LetterHeadCreate,
  is_sidebar: false,
  is_protect: true,
  // roles: [Roles.ACCOUNTANT,Roles.CORPORATE_HR],
},
{
  path: "null",
  sidebarName: "Shifted to SLPL tab",
  navbarName: "Shifted to SLPL tab",
  icon: EventNote,
  is_sidebar: true,
  slug: "slpl",
  is_parent: true,
  roles: [Roles.CORPORATE_HR],
},
{
  path: RouteName.CLONE_BACKGROUND_VERIFICATION,
  sidebarName: "SLPL Background Verification",
  navbarName: "SLPL Background Verification",
  icon: AssignmentOutlined,
  component: CloneBGVerification_View,
  is_sidebar: true,
  is_protect: true,
  parent: "slpl",
   roles: [Roles.ADMIN, Roles.CORPORATE_HR,Roles.RECRUITER, Roles.HR,],
},
{
  path: RouteName.CLONE_FULL_FINAL_APPROVAL,
  sidebarName: "SLPL Full & Final Approval",
  navbarName: "SLPL Full & Final Approval",
  icon: AssignmentOutlined,
  component: CloneFullFinalApproval,
  is_sidebar: true,
  is_protect: true,
  parent:"slpl",
},
{
  path: RouteName.CLONE_EXIT_INTERVIEW_LIST,
  sidebarName: "SLPL Exit Interview List",
  navbarName: "SLPL Exit Interview List",
  icon: PeopleOutlined,
  component: CloneExitInterviewList,
  is_sidebar: true,
  is_protect: true,
  should_regex: true,
  parent:"slpl",
  roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR],
},
{
  path: `${RouteName.CLONE_CLAIMS_LIST}`,
  sidebarName: "SLPL Claim List",
  navbarName: "SLPL Claim List",
  icon: PeopleOutlined,
  component: CloneClaimsList,
  is_sidebar: true,
  is_protect: true,
  should_regex: true,
  parent: "slpl",
  moduleName:Modules?.HR_CLAIM_APPROVE
  // roles: [Roles.ADMIN,Roles.HR, Roles.CORPORATE_HR, Roles.ACCOUNTANT, Roles.CORPORATE_REVIEWER],
},
  {
    path: '/testview',
    sidebarName: "Tax Rebate Approval",
    navbarName: "Tax Rebate Approval",
    icon: AssignmentOutlined,
    component: TestView,
    is_sidebar: false,
    is_protect: false,
  },
  {
    path: RouteName.SUBSCRIBE_PAGE,
    sidebarName: "Tax Rebate Approval",
    navbarName: "Tax Rebate Approval",
    icon: AssignmentOutlined,
    component: SubscribeView,
    is_sidebar: false,
    is_protect: false,
  },
  {
    path: "null",
    sidebarName: "Leave & Attendance",
    navbarName: "",
    icon: EventNote,
    is_sidebar: true,
    slug: "mark_attendance",
    is_parent: true,
    // roles: [Roles.CORPORATE_HR],
  },
  {
    path: RouteName.MARK_ATTENDANCE,
    sidebarName: "Update Attendance",
    navbarName: "",
    icon: EventNote,
    is_sidebar: true,
    parent:"mark_attendance",
    component:UpdateAttendance
    // roles: [Roles.CORPORATE_HR],
  },
  {
    path: "null",
    sidebarName: "Payroll Management",
    navbarName: "Payroll Management",
    icon: EventNote,
    is_sidebar: true,
    slug: "payroll",
    is_parent: true,
    // roles: [Roles.CORPORATE_HR],
  },

  {
    path: RouteName.CALENDAR,
    sidebarName: "Calendar",
    navbarName: "Calendar",
    icon: EventNote,
    is_sidebar: true,
    parent:"payroll",
    component:CalendarList
    // roles: [Roles.CORPORATE_HR],
  },
  {
    path: RouteName.ATTENDANCE_REPORT,
    sidebarName: "Attendance Report",
    navbarName: "Attendance Report",
    icon: EventNote,
    is_sidebar: true,
    parent:"payroll",
    component:AttendanceReport
    // roles: [Roles.CORPORATE_HR],
  },
  {
    path: RouteName.SHIFTS,
    sidebarName: "Shift Management",
    navbarName: "Shift Management",
    icon: EventNote,
    is_sidebar: true,
    parent:"payroll",
    component:ShiftsLists
    // roles: [Roles.CORPORATE_HR], AddEmployeeTable
  },
  {
    path: `${RouteName.SHIFTS_DETAILS}:id`,
    navbarName: "Shift Management",
    component: ShiftDetail,
    is_protect: true,
    should_regex: true,
    parent: "payroll",
    // roles: [Roles.ADMIN, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.ADD_EMPLOYEE}`,
    navbarName: "Shift Management",
    component: AddEmployeeTable,
    is_protect: true,
    should_regex: true,
    parent: "payroll",
   
    // roles: [Roles.ADMIN, Roles.CORPORATE_HR],
  },

  {
    path: RouteName.MUSTER_REPORT,
    sidebarName: "Muster Report",
    navbarName: "Muster Report",
    icon: PeopleOutlined,
    is_sidebar: true,
    parent: "payroll",
    component:MusterReport
    // roles: [Roles.ADMIN, Roles.CORPORATE_HR],
  }, 
  {
    path: RouteName.SHIFTS_WISE_REPORT,
    sidebarName: "Shift  Report",
    navbarName: "Shift  Report",
    icon: PeopleOutlined,
    is_sidebar: true,
    parent: "payroll",
    component:ShiftWiseReport
    // roles: [Roles.ADMIN, Roles.CORPORATE_HR],
  },
  {
    path: RouteName.PAYSLIPS_GENERATION,
    sidebarName: "Payslips Generation",
    navbarName: "Payslips Generation",
    icon: PeopleOutlined,
    is_sidebar: true,
    parent: "payroll",
    component:PayslipsGeneration
    // roles: [Roles.ADMIN, Roles.CORPORATE_HR],
  },
];

export default dashboardRoutes;
