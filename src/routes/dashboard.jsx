import {lazy} from "react";
import {
    Dashboard,
    LocalOffer,
    EventNote,
    PeopleOutlined,
    AssignmentOutlined,
    DashboardOutlined, Subtitles,
    PersonRounded,
    FingerprintOutlined
} from "@material-ui/icons";
import RouteName from "./Route.name";
import Constants from "../config/constants";
import CandidateInfo from "../views/Candidates/CandidateInfo/CandidateInfo.view";
// import ClaimsList from "../views/AdminClaimManagement/ClaimsList/ClaimsList.container";
import ClaimsDetail from "../views/ClaimsManagement/ClaimsDetail/ClaimsDetail.view";
import ClaimMarriageCard from "../views/ClaimsManagement/ClaimsDetail/components/ClaimMarriageCard/ClaimMarriageCard.view";
import ClaimMobileCard from "../views/ClaimsManagement/ClaimsDetail/components/ClaimMobileCard/ClaimMobileCard.view";
import CadreDetails from "../views/CadreDetails/CadreDetails.view";
import ClaimCarCard from "../views/ClaimsManagement/ClaimsDetail/components/ClaimCarCard/ClaimCarCard.view";
import ClaimsList from "../views/AdminClaimManagement/ClaimsList/ClaimsList.container";
import ClaimListDetail from "../views/AdminClaimManagement/ClaimListDetail/ClaimListDetail.view";
import ClaimHealthCard from "../views/ClaimsManagement/ClaimsDetail/components/ClaimHealthCard/ClaimHealthCard.view";
import PmsBatch from "../views/Pms/PmsBatch/PmsBatch.view";

const NewDashboard = lazy(() => import("../views/dashboard/NewDashboard.view"));
const HRCreateView = lazy(() => import( "../views/HR/HRPolicy/HRPolicyCreate.view"));
const CircularCreateView = lazy(() => import( "../views/HR/Circular/CircularCreate.view"));
const Circular = lazy(() => import( "../views/HR/Circular/Circular.container"));
const DesignationList = lazy(() => import( "../views/Designation/DesignationList.container"));
const DesignationCreateView = lazy(() => import( "../views/Designation/DesignationCreate.view"));
const AppSettings = lazy(() => import( "../views/AppSettings/AppSettings.container"));
const HRSettings = lazy(() => import( "../views/HR/HRSettings/HRSettings.container"));
const EmployeeDashboard = lazy(() => import( "../views/EmployeePanel/EmployeeDashboard/EmployeeDashboard.view"));
const EmployeeInducation = lazy(() => import( "../views/EmployeePanel/EmployeeInducation/EmployeeInducation.container"));
const EmployeeHRPolicy = lazy(() => import( "../views/EmployeePanel/EmployeeHRPolicy/EmployeeHRPolicy.container"));
const EmployeeCircular = lazy(() => import( "../views/EmployeePanel/EmployeeCircular/EmployeeCircular.container"));
const EmployeeEngagement = lazy(() => import( "../views/EmployeeEngagement/EmployeeEngagement.container"));
const EmployeeDrishti = lazy(() => import( "../views/EmployeePanel/EmployeeDrishti/EmployeeDrishti.container"));
const EmployeeIkigai = lazy(() => import( "../views/EmployeePanel/EmployeeIkigai/EmployeeIkigai.container"));
const EmployeeDeepak = lazy(() => import( "../views/EmployeePanel/EmployeeDeepak/EmployeeDeepak.container"));
const EmployeeUtsav = lazy(() => import( "../views/EmployeePanel/EmployeeUtsav/EmployeeUtsav.container"));
const HRKnowledge = lazy(() => import( "../views/HR/HRKnowledge/HRKnowledge.container"));
const HRAnnouncement = lazy(() => import( "../views/HR/HRAnnouncements/HRAnnouncement.container"));
const HRAnnouncementCreateView = lazy(() => import( "../views/HR/HRAnnouncements/HRAnnouncementCreate.view"));
const HRKnowledgeCreateView = lazy(() => import( "../views/HR/HRKnowledge/HRKnowledgeCreate.view"));
const HRUtsav = lazy(() => import( "../views/HR/HRUtsav/HRUtsav.container"));
const EmployeeKnowledge = lazy(() => import( "../views/EmployeePanel/EmployeeKnowledge/EmployeeKnowledge.container"));
const EmployeePerformance = lazy(() => import( "../views/EmployeePerformance/EmployeePerformance.container"));
const EmployeeClaim = lazy(() => import( "../views/EmployeePanel/EmployeeClaim/EmployeeClaim.container"));
const ReviewCandidate = lazy(() => import( "../views/CVReviewCandidate/ReviewCandidate.container"));
const ViewDocuments = lazy(() => import( "../views/ViewDocuments/ViewDocuments"));
const EmployeeListCreate = lazy(() => import( "../views/EmployeeList/EmployeeListCreate"));
const EmployeeEdit = lazy(() => import( "../views/EmployeeEdit/EmployeeEdit"));
const EmployeeEditVersionListContainer = lazy(() => import( "../views/EmployeeEditVersions/ListView/EmployeeEditVersionList.container"));
const EmployeeUtsavDetail = lazy(() => import( "../views/EmployeePanel/EmployeeUtsav/EmployeeUtsavDetail"));
const CandidateDetails = lazy(() => import( "../views/Candidates/CandidateDetails/CandidateDetails.view"));
const InterviewSchedule = lazy(() => import( "../views/InterviewSchedule/InterviewSchedule.container"));
const MyProfileEditView = lazy(() => import( "../views/MyProfileEdit/MyProfileEdit.view"));
const HRPolicy = lazy(() => import( "../views/HR/HRPolicy/HRPolicy.container"));
const EmployeeTab = lazy(() => import( "../views/Employees/EmployeeTab.view"));
const EmployeeList = lazy(() => import( "../views/EmployeeList/EmployeeList.container"));
const JobRolesList = lazy(() => import( "../views/JobRoles/JobRolesList.container"));
const JobRoleCreateView = lazy(() => import( "../views/JobRoleCreate/JobRoleCreate.view"));
const LocationList = lazy(() => import( "../views/Locations/Location/LocationList.container"));
const LocationCreateView = lazy(() => import( "../views/Locations/LocationCreate/LocationCreate.view"));
const DepartmentList = lazy(() => import( "../views/Department/DepartmentList.container"));
const DepartmentCreateView = lazy(() => import( "../views/Department/DepartmentCreate.view"));
const SubDepartmentList = lazy(() => import( "../views/SubDepartment/SubDepartmentList.container"));
const SubDepartmentCreateView = lazy(() => import( "../views/SubDepartment/SubDepartmentCreate.view"));
const LocationDetail = lazy(() => import( "../views/Locations/LocationDetail/LocationDetail.view"));
const CandidateList = lazy(() => import( "../views/Candidates/Candidate/CandidateList.container"));
const CandidateCreateView = lazy(() => import( "../views/Candidates/CandidateCreate/CandidateCreate.view"));
const AnnualList = lazy(() => import( "../views/AnnualBudgets/AnnualList.container"));
const ManpowerList = lazy(() => import( "../views/ManpowerPlanning/ManpowerList.container"));
const JobOpeningsList = lazy(() => import( "../views/JobOpenings/JobOpeningsList.container"));
const JobOpeningCreateView = lazy(() => import( "../views/JobOpeningCreate/JobOpeningCreate.view"));
const JobOpeningDetail = lazy(() => import( "../views/JobOpeningDetail/JobOpeningDetail.view"));
const GradeList = lazy(() => import( "../views/Grade/GradeList.container"));
const GradeCreateView = lazy(() => import( "../views/Grade/GradeCreate.view"));
const CadreList = lazy(() => import( "../views/Cadre/CadreList.container"));
const CadreCreateView = lazy(() => import( "../views/Cadre/CadreCreate.view"));
const CandidateOfferLetter=lazy(()=> import("../views/Candidates/CandidateOfferLetter/CandidateOfferLetter.view"));
const CVShortlistList = lazy( () => import('../views/CVShortlist/CVShortlist.container'));
const JobOpeningUpdateView=lazy(()=> import("../views/JobOpeningUpdate/JobOpeningUpdate.view"))
const CandidateOLR=lazy(()=> import('../views/Candidates/CandidateOLR/CandidateOLR.view'))
const ReviewOLR=lazy(()=>import('../views/ReviewOLR/ReviewOLR.container'))

const Roles = Constants.ROLES;

const dashboardRoutes = [
    {
        path: "/",
        sidebarName: "HR Dashboard",
        navbarName: "Admin Dashboard",
        icon: DashboardOutlined,
        component: NewDashboard,
        is_sidebar: true,
        roles: [Roles.ADMIN, Roles.RECRUITER, Roles.CORPORATE_HR],
    },
    {
        path: RouteName.MY_PROFILE,
        sidebarName: "My Profile",
        navbarName: "My Profile",
        icon: PersonRounded,
        component: EmployeeTab,
        is_sidebar: true,
        is_protect: true,
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
        path: RouteName.JOB_ROLES,
        sidebarName: "Job Description",
        navbarName: "Job Roles(Designation)",
        icon: PeopleOutlined,
        component: JobRolesList,
        is_sidebar: true,
        is_protect: true,
        should_regex: true,
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
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
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
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
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
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
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
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
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },
    {
        path: `${RouteName.EMPLOYEE_UPDATE}:id`,
        icon: AssignmentOutlined,
        component: EmployeeEdit,
        is_sidebar: false,
        is_protect: true,
        // should_regex: true,
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },
    {
        path: `${RouteName.EMPLOYEE_DETAIL}:id`,
        sidebarName: "Employee Details",
        navbarName: "Employee Details",
        icon: Dashboard,
        component: EmployeeTab,
        is_sidebar: false,
        is_protect: true,
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },
    {
        path: 'null',
        sidebarName: "Masters",
        navbarName: "Masters",
        icon: EventNote,
        is_sidebar: true,
        slug: 'masters',
        is_parent: true,
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
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
        path: RouteName.EMPLOYEE_DASHBOARD,
        sidebarName: "Dashboard",
        navbarName: "Dashboard",
        icon: PeopleOutlined,
        component: EmployeeDashboard,
        is_sidebar: true,
        is_protect: true,
        should_regex: true,
        // parent: 'employeedashboard',
    },
    {
        path: '/employeeInduction',
        sidebarName: "Employee Induction",
        navbarName: "Employee Induction",
        icon: PeopleOutlined,
        component: EmployeeInducation,
        is_sidebar: true,
        is_protect: true,
        should_regex: true,
        // parent: 'employeedashboard',
    },
    {
        path: '/hrpolicy',
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
        path: '/employeecircular',
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
        path: '/employee/knowledge',
        sidebarName: "Knowledge Center",
        navbarName: "Knowledge Center",
        icon: PeopleOutlined,
        component: EmployeeKnowledge,
        is_sidebar: true,
        is_protect: true,
        should_regex: true,
        // parent: 'employeedashboard',
    },
    {
        path: '/employee/performance',
        sidebarName: "Employee Performance",
        navbarName: "Employee Performance",
        icon: PeopleOutlined,
        component: EmployeePerformance,
        is_sidebar: true,
        is_protect: true,
        should_regex: true,
        // parent: 'employeedashboard',
    },
    {
        path: '/employee/claim',
        sidebarName: "Employee Claim",
        navbarName: "Employee Claim",
        icon: PeopleOutlined,
        component: ClaimsDetail,
        is_sidebar: true,
        is_protect: true,
        should_regex: true,
        // parent: 'employeedashboard',
    },
    {
        path: '/employee/learning',
        sidebarName: " Learning Management System",
        navbarName: " Learning Management System",
        icon: PeopleOutlined,
        component: EmployeeClaim,
        is_sidebar: true,
        is_protect: true,
        should_regex: true,
        // parent: 'employeedashboard',
    },
    {
        path: 'null',
        sidebarName: "Swift-HCM ",
        navbarName: "Swift-HCM",
        icon: EventNote,
        is_sidebar: true,
        slug: 'swift',
        is_parent: true,
    },
    {
        path: "/employee/engagement",
        sidebarName: "HCM Module",
        navbarName: "Admin Dashboard",
        icon: DashboardOutlined,
        component: EmployeeEngagement,
        is_sidebar: true,
        parent: 'swift',

    },
    {
        path: "/employee/drishti",
        sidebarName: "Drishti",
        navbarName: "Admin Dashboard",
        icon: DashboardOutlined,
        component: EmployeeDrishti,
        is_sidebar: true,
        parent: 'swift',

    },
    {
        path: "/employee/deepak",
        sidebarName: "Deepak",
        navbarName: "Admin Dashboard",
        icon: DashboardOutlined,
        component: EmployeeDeepak,
        is_sidebar: true,
        parent: 'swift',

    },
    {
        path: "/employee/utsav",
        sidebarName: "Utsav",
        navbarName: "Admin Dashboard",
        icon: DashboardOutlined,
        component: EmployeeUtsav,
        is_sidebar: true,
        parent: 'swift',

    },
    {
        path: "/employee/utsav/:id",
        sidebarName: "Utsav",
        navbarName: "Admin Dashboard",
        icon: DashboardOutlined,
        component: EmployeeUtsavDetail,
        is_sidebar: false,
        parent: 'swift',

    },
    {
        path: "/employee/udeshya",
        sidebarName: "Udeshya",
        navbarName: "Admin Dashboard",
        icon: DashboardOutlined,
        component: EmployeeIkigai,
        is_sidebar: true,
        parent: 'swift',

    },

    {
        path: 'null',
        sidebarName: "Budget & Planning",
        navbarName: "Budget & Planning",
        icon: EventNote,
        is_sidebar: true,
        slug: 'budget',
        is_parent: true,
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
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
        parent: 'budget',
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
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
        parent: 'budget',
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },
    {
        path: 'null',
        sidebarName: "Recruitment Management",
        navbarName: "Recruitment Management",
        icon: EventNote,
        is_sidebar: true,
        slug: 'recruitment',
        is_parent: true,
        roles: [Roles.ADMIN, Roles.RECRUITER, Roles.CORPORATE_HR],
    },
    {
        path: RouteName.CANDIDATES,
        sidebarName: "Interview Candidates",
        navbarName: "Interview Candidates",
        icon: PeopleOutlined,
        component: CandidateList,
        is_sidebar: true,
        is_protect: true,
        should_regex: true,
        parent: 'recruitment',
        roles: [Roles.ADMIN, Roles.RECRUITER, Roles.CORPORATE_HR],
    },
    {
        path: `${RouteName.CANDIDATES_DETAILS}:id`,
        sidebarName: "Candidate Details",
        navbarName: "Candidate Details",
        component: CandidateDetails,
        is_sidebar: false,
        is_protect: true,
        roles: [Roles.ADMIN, Roles.RECRUITER, Roles.GENERAL, Roles.CORPORATE_HR],
    },
    {
        path: `${RouteName.CANDIDATES_INFO}:id`,
        sidebarName: "Candidate Details",
        navbarName: "Candidate Details",
        component: CandidateInfo,
        is_sidebar: false,
        is_protect: true,
        roles: [Roles.ADMIN, Roles.RECRUITER,  Roles.CORPORATE_HR],
    },
    {
        path: `${RouteName.CANDIDATES_OFFER}`,
        sidebarName: "Candidate Offer",
        navbarName: "Candidate Offer",
        component: CandidateOfferLetter,
        is_sidebar: false,
        is_protect: true,
        roles: [Roles.ADMIN, Roles.RECRUITER, Roles.CORPORATE_HR],
    },
    {
        path: `${RouteName.CANDIDATES_OFFER_DETAILS}:id`,
        sidebarName: "Candidate Offer Details",
        navbarName: "Candidate Offer Details",
        component: CandidateOLR,
        is_sidebar: false,
        is_protect: true,
        roles: [Roles.ADMIN, Roles.RECRUITER, Roles.CORPORATE_HR, Roles.OLR, Roles.GENERAL],
    },
    {
        path: RouteName.CANDIDATES_CREATE,
        sidebarName: "Location",
        navbarName: "Location",
        icon: LocalOffer,
        component: CandidateCreateView,
        is_sidebar: false,
        is_protect: true,
        roles: [Roles.ADMIN, Roles.RECRUITER, Roles.CORPORATE_HR],
    },
    {
        path: `${RouteName.CANDIDATES_UPDATE}:id`,
        sidebarName: "Location",
        navbarName: "Location",
        icon: LocalOffer,
        component: CandidateCreateView,
        is_sidebar: false,
        is_protect: true,
        roles: [Roles.ADMIN, Roles.RECRUITER, Roles.CORPORATE_HR],
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
        parent: 'masters',
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
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
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
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
        parent: 'masters',
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
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
        roles: [ Roles.CORPORATE_HR],
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
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
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
        parent: 'masters',
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
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
        parent: 'masters',
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },
    {
        path: RouteName.DESIGNATION_CREATE,
        component: DesignationCreateView,
        is_sidebar: false,
        is_protect: true,
        roles: Constants.is_development ? [Roles.CORPORATE_HR, Roles.ADMIN] : [Roles.CORPORATE_HR],
    },
    {
        path: `${RouteName.DESIGNATION_UPDATE}:id`,
        component: DesignationCreateView,
        is_sidebar: false,
        is_protect: true,
        roles: Constants.is_development ? [Roles.CORPORATE_HR, Roles.ADMIN] : [Roles.CORPORATE_HR],
    },
    {
        path: RouteName.GRADES_CREATE,
        component: GradeCreateView,
        is_sidebar: false,
        is_protect: true,
        roles: Constants.is_development ? [Roles.CORPORATE_HR, Roles.ADMIN] : [Roles.CORPORATE_HR],
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
        roles: [Roles.ADMIN,Roles.CORPORATE_HR],
    },
    {
        path: `${RouteName.CADRES}:code`,
        component: CadreList,
        is_sidebar: false,
        should_regex: true,
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
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
        parent: 'recruitment',
        roles: [Roles.ADMIN, Roles.RECRUITER, Roles.CORPORATE_HR],
    },
    {
        path: RouteName.JOB_OPENINGS_CREATE,
        sidebarName: "Job Openings Create",
        navbarName: "Job Openings Create",
        icon: LocalOffer,
        component: JobOpeningCreateView,
        is_sidebar: false,
        is_protect: true,
        roles: [Roles.ADMIN, Roles.RECRUITER, Roles.CORPORATE_HR],
    },
    {
        path: `${RouteName.JOB_OPENINGS_UPDATE}:id`,
        sidebarName: "Job Openings Create",
        navbarName: "Job Openings Create",
        icon: LocalOffer,
        component: JobOpeningUpdateView,
        is_sidebar: false,
        is_protect: true,
        roles: [Roles.ADMIN, Roles.RECRUITER, Roles.CORPORATE_HR],
    },
    {
        path: `${RouteName.JOB_OPENINGS_DETAILS}:id`,
        sidebarName: "Job Openings Detail",
        navbarName: "Job Openings Detail",
        icon: LocalOffer,
        component: JobOpeningDetail,
        is_sidebar: false,
        is_protect: true,
        roles: [Roles.ADMIN, Roles.RECRUITER,  Roles.CORPORATE_HR],
    },
    {
        path: 'null',
        sidebarName: "HR Documents & Updates",
        navbarName: "HR Documents & Updates",
        icon: EventNote,
        is_sidebar: true,
        slug: 'Hr',
        is_parent: true,
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
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
        parent: 'Hr',
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
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
        parent: 'Hr',
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
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
        parent: 'Hr',
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },
    {
        path: '/hr/knowledge',
        sidebarName: "Knowledge Center",
        navbarName: "Knowledge Center",
        icon: PeopleOutlined,
        component: HRKnowledge,
        is_sidebar: true,
        is_protect: true,
        should_regex: true,
        parent: 'Hr',
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },
    {
        path: '/hr/announcement',
        sidebarName: "Announcements",
        navbarName: "Announcements",
        icon: PeopleOutlined,
        component: HRAnnouncement,
        is_sidebar: true,
        is_protect: true,
        should_regex: true,
        parent: 'Hr',
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },
    {
        path: RouteName.HR_ANNOUNCEMENT_CREATE,
        component: HRAnnouncementCreateView,
        is_sidebar: false,
        is_protect: true,
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },
    {
        path: `${RouteName.HR_ANNOUNCEMENT_UPDATE}:id`,
        component: HRAnnouncementCreateView,
        is_sidebar: false,
        is_protect: true,
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },
    {
        path: RouteName.HR_KNOWLEDGE_CREATE,
        component: HRKnowledgeCreateView,
        is_sidebar: false,
        is_protect: true,
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },
    {
        path: `${RouteName.HR_KNOWLEDGE_UPDATE}:id`,
        component: HRKnowledgeCreateView,
        is_sidebar: false,
        is_protect: true,
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },
    {
        path: RouteName.HR_POLICIES_CREATE,
        component: HRCreateView,
        is_sidebar: false,
        is_protect: true,
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },
    {
        path: '/hr/utsav',
        sidebarName: "Utsav",
        navbarName: "Utsav ",
        icon: PeopleOutlined,
        component: HRUtsav,
        is_sidebar: true,
        is_protect: true,
        should_regex: true,
        parent: 'Hr',
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },
    {
        path: `${RouteName.HR_POLICIES_UPDATE}:id`,
        component: HRCreateView,
        is_sidebar: false,
        is_protect: true,
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },
    {
        path: RouteName.HR_CIRCULARS_CREATE,
        component: CircularCreateView,
        is_sidebar: false,
        is_protect: true,
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },
    {
        path: `${RouteName.HR_CIRCULARS_UPDATE}:id`,
        component: CircularCreateView,
        is_sidebar: false,
        is_protect: true,
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },

    {
        path: 'null',
        sidebarName: "Talent Management",
        navbarName: "Talent Management",
        icon: AssignmentOutlined,
        is_sidebar: true,
        slug: 'tm',
        is_parent: true,
        roles: [Roles.ADMIN, Roles.GENERAL, Roles.CORPORATE_HR],
    },
    {
        path: '/tm/review',
        sidebarName: "Review Candidates",
        navbarName: "Review Candidates",
        icon: PeopleOutlined,
        component: ReviewCandidate,
        is_sidebar: true,
        is_protect: true,
        should_regex: true,
        parent: 'tm',
        roles: [Roles.ADMIN, Roles.GENERAL, Roles.CORPORATE_HR],
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
        parent: 'tm',
        roles: [Roles.ADMIN, Roles.GENERAL, Roles.CORPORATE_HR],
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
        parent: 'tm',
        roles: [Roles.ADMIN, Roles.GENERAL, Roles.CORPORATE_HR],
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
        parent: 'tm',
        roles: [Roles.ADMIN, Roles.OLR, Roles.RECRUITER, Roles.CORPORATE_HR],
    },

    {
        path: `${RouteName.EMPLOYEE_VERSIONS}`,
        sidebarName: "Employee Changes",
        navbarName: "Employee Changes",
        icon: LocalOffer,
        component: EmployeeEditVersionListContainer,
        is_sidebar: true,
        is_protect: true,
        roles: Constants.is_development ? [Roles.ADMIN, Roles.CORPORATE_HR] : [Roles.CORPORATE_HR],
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
        path: 'null',
        sidebarName: "Claim Management",
        navbarName: "Claim Management",
        icon: AssignmentOutlined,
        is_sidebar: true,
        slug: 'cm',
        is_parent: true,
        roles: [Roles.ADMIN, Roles.CORPORATE_HR, Roles.ACCOUNTANT, Roles.CORPORATE_REVIEWER],

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
        parent: 'cm',
        roles: [Roles.ADMIN, Roles.CORPORATE_HR, Roles.ACCOUNTANT, Roles.CORPORATE_REVIEWER],
    },
    // {
    //     path: `${RouteName.CLAIMS_INFO}`,
    //     sidebarName: "My Claims",
    //     navbarName: "My Claims",
    //     icon: PeopleOutlined,
    //     component: ClaimsDetail,
    //     is_sidebar: true,
    //     is_protect: true,
    //     should_regex: true,
    //     parent: 'cm',
    // },
    {
        path: `${RouteName.CLAIMS_DETAILS}:id`,
        sidebarName: "Claims List",
        navbarName: "Claims List",
        icon: PeopleOutlined,
        component: ClaimListDetail,
        is_sidebar: false,
        is_protect: true,
        should_regex: true,
        parent: 'cm',
        roles: [Roles.ADMIN, Roles.ACCOUNTANT, Roles.CORPORATE_HR, Roles.CORPORATE_REVIEWER],
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
        parent: 'cm',
        // roles: [Roles.ADMIN, Roles.ACCOUNTANT, Roles.CORPORATE_HR],
    },{
        path: `${RouteName.CLAIMS_MOBILE}`,
        sidebarName: "Claims Mobile",
        navbarName: "Claims Mobile",
        icon: PeopleOutlined,
        component: ClaimMobileCard,
        is_sidebar: false,
        is_protect: true,
        should_regex: true,
        parent: 'cm',
        // roles: [Roles.ADMIN, Roles.ACCOUNTANT, Roles.CORPORATE_HR],
    },{
        path: `${RouteName.CLAIMS_CAR}`,
        sidebarName: "Claims Car",
        navbarName: "Claims Car",
        icon: PeopleOutlined,
        component: ClaimCarCard,
        is_sidebar: false,
        is_protect: true,
        should_regex: true,
        parent: 'cm',
        // roles: [Roles.ADMIN, Roles.ACCOUNTANT, Roles.CORPORATE_HR],
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
        parent: 'cm',
        // roles: [Roles.ADMIN, Roles.ACCOUNTANT, Roles.CORPORATE_HR],
    },
    {
        path: 'null',
        sidebarName: "Performance Management",
        navbarName: "Performance Management",
        icon: AssignmentOutlined,
        is_sidebar: true,
        slug: 'pm',
        is_parent: true,
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],

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
        parent: 'pm',
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },
    {
        path: 'http://122.186.44.85/TOS7x1/frmLogin.aspx',
        sidebarName: "Attendance Management",
        navbarName: "",
        icon: FingerprintOutlined,
        is_external: true,
        component: (<div></div>),
        is_sidebar: true,
        is_protect: false,
    },

    // { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
