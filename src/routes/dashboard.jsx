import {
    Dashboard,
    LocalOffer,
    EventNote,
    PeopleOutlined,
    AssignmentOutlined,
    DashboardOutlined, Subtitles,
    PersonRounded
} from "@material-ui/icons";
import EmployeeTab from "../views/Employees/EmployeeTab.view";
import EmployeeList from "../views/EmployeeList/EmployeeList.container";
import JobRolesList from "../views/JobRoles/JobRolesList.container";
import JobRoleCreateView from "../views/JobRoleCreate/JobRoleCreate.view";
import NewDashboard from "../views/dashboard/NewDashboard.view";
import LocationList from "../views/Locations/Location/LocationList.container";
import LocationCreateView from "../views/Locations/LocationCreate/LocationCreate.view";
import DepartmentList from "../views/Department/DepartmentList.container";
import DepartmentCreateView from "../views/Department/DepartmentCreate.view";
import SubDepartmentList from "../views/SubDepartment/SubDepartmentList.container";
import SubDepartmentCreateView from "../views/SubDepartment/SubDepartmentCreate.view";
import LocationDetail from "../views/Locations/LocationDetail/LocationDetail.view";
import CandidateList from "../views/Candidates/Candidate/CandidateList.container";
import CandidateCreateView from "../views/Candidates/CandidateCreate/CandidateCreate.view";
import AnnualList from "../views/AnnualBudgets/AnnualList.container";
import ManpowerList from "../views/ManpowerPlanning/ManpowerList.container";
import JobOpeningsList from "../views/JobOpenings/JobOpeningsList.container";
import JobOpeningCreateView from "../views/JobOpeningCreate/JobOpeningCreate.view";
import JobOpeningDetail from "../views/JobOpeningDetail/JobOpeningDetail.view";
import GradeList from "../views/Grade/GradeList.container";
import GradeCreateView from "../views/Grade/GradeCreate.view";
import CadreList from "../views/Cadre/CadreList.container";
import CadreCreateView from "../views/Cadre/CadreCreate.view";
import RouteName from "./Route.name";
import HRPolicy from "../views/HR/HRPolicy/HRPolicy.container";
import HRCreateView from "../views/HR/HRPolicy/HRPolicyCreate.view";
import CircularCreateView from "../views/HR/Circular/CircularCreate.view";
import Circular from "../views/HR/Circular/Circular.container";
import DesignationList from "../views/Designation/DesignationList.container";
import DesignationCreateView from "../views/Designation/DesignationCreate.view";
import AppSettings from "../views/AppSettings/AppSettings.container";
import HRSettings from "../views/HR/HRSettings/HRSettings.container";
import EmployeeDashboard from "../views/EmployeePanel/EmployeeDashboard/EmployeeDashboard.view";
import EmployeeInducation from "../views/EmployeePanel/EmployeeInducation/EmployeeInducation.container";
import EmployeeHRPolicy from "../views/EmployeePanel/EmployeeHRPolicy/EmployeeHRPolicy.container";
import EmployeeCircular from "../views/EmployeePanel/EmployeeCircular/EmployeeCircular.container";
import Constants from "../config/constants";
import EmployeeEngagement from "../views/EmployeeEngagement/EmployeeEngagement.container";
import EmployeeDrishti from "../views/EmployeePanel/EmployeeDrishti/EmployeeDrishti.container";
import EmployeeIkigai from "../views/EmployeePanel/EmployeeIkigai/EmployeeIkigai.container";
import EmployeeDeepak from "../views/EmployeePanel/EmployeeDeepak/EmployeeDeepak.container";
import EmployeeUtsav from "../views/EmployeePanel/EmployeeUtsav/EmployeeUtsav.container";
import HRKnowledge from "../views/HR/HRKnowledge/HRKnowledge.container";
import HRKnowledgeCreateView from "../views/HR/HRKnowledge/HRKnowledgeCreate.view";
import HRUtsav from "../views/HR/HRUtsav/HRUtsav.container";
import EmployeeKnowledge from "../views/EmployeePanel/EmployeeKnowledge/EmployeeKnowledge.container";
import EmployeePerformance from "../views/EmployeePerformance/EmployeePerformance.container";
import EmployeeClaim from "../views/EmployeePanel/EmployeeClaim/EmployeeClaim.container";
import ReviewCandidate from "../views/ReviewCandidate/ReviewCandidate.container";
import ViewDocuments from "../views/ViewDocuments/ViewDocuments";
import EmployeeListCreate from "../views/EmployeeList/EmployeeListCreate";
import EmployeeEdit from "../views/EmployeeEdit/EmployeeEdit";
import EmployeeEditVersionListContainer from "../views/EmployeeEditVersions/ListView/EmployeeEditVersionList.container";
import EmployeeUtsavDetail from "../views/EmployeePanel/EmployeeUtsav/EmployeeUtsavDetail";
import CandidateDetails from "../views/Candidates/CandidateDetails/CandidateDetails.view";
import InterviewSchedule from "../views/InterviewSchedule/InterviewSchedule.container";
import MyProfileEditView from "../views/MyProfileEdit/MyProfileEdit.view";

const Roles = Constants.ROLES;

const dashboardRoutes = [
    {
        path: "/",
        sidebarName: "HR Dashboard",
        navbarName: "Admin Dashboard",
        icon: DashboardOutlined,
        component: NewDashboard,
        is_sidebar: true,
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
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
        path: "/employees/details/:id",
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
        component: EmployeeClaim,
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
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
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
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },
    {
        path: `${RouteName.CANDIDATES_DETAILS}:id`,
        sidebarName: "Candidate Details",
        navbarName: "Candidate Details",
        component: CandidateDetails,
        is_sidebar: false,
        is_protect: true,
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },
    {
        path: RouteName.CANDIDATES_CREATE,
        sidebarName: "Location",
        navbarName: "Location",
        icon: LocalOffer,
        component: CandidateCreateView,
        is_sidebar: false,
        is_protect: true,
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
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
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },
    {
        path: `${RouteName.LOCATIONS_UPDATE}:id`,
        component: LocationCreateView,
        is_sidebar: false,
        is_protect: true,
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
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
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },
    {
        path: `${RouteName.DEPARTMENT_UPDATE}:id`,
        component: DepartmentCreateView,
        is_sidebar: false,
        is_protect: true,
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },
    {
        path: RouteName.SUB_DEPARTMENTS_CREATE,
        component: SubDepartmentCreateView,
        is_sidebar: false,
        is_protect: true,
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },
    {
        path: `${RouteName.SUB_DEPARTMENTS_UPDATE}:id`,
        component: SubDepartmentCreateView,
        is_sidebar: false,
        is_protect: true,
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
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
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },
    {
        path: `${RouteName.DESIGNATION_UPDATE}:id`,
        component: DesignationCreateView,
        is_sidebar: false,
        is_protect: true,
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },
    {
        path: RouteName.GRADES_CREATE,
        component: GradeCreateView,
        is_sidebar: false,
        is_protect: true,
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },
    {
        path: `${RouteName.GRADES_UPDATE}:id`,
        component: GradeCreateView,
        is_sidebar: false,
        is_protect: true,
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },
    {
        path: RouteName.CADRES_CREATE,
        component: CadreCreateView,
        is_sidebar: false,
        is_protect: true,
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },
    {
        path: `${RouteName.CADRES_UPDATE}:id`,
        component: CadreCreateView,
        is_sidebar: false,
        is_protect: true,
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
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
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },
    {
        path: RouteName.JOB_OPENINGS_CREATE,
        sidebarName: "Job Openings Create",
        navbarName: "Job Openings Create",
        icon: LocalOffer,
        component: JobOpeningCreateView,
        is_sidebar: false,
        is_protect: true,
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
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
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },{
        path: '/tm/review',
        sidebarName: "Review Candidates",
        navbarName: "Review Candidates",
        icon: PeopleOutlined,
        component: ReviewCandidate,
        is_sidebar: true,
        is_protect: true,
        should_regex: true,
        parent: 'tm',
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
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
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },
    {
        path: `${RouteName.JOB_OPENINGS_DETAILS}:id`,
        sidebarName: "Job Openings Detail",
        navbarName: "Job Openings Detail",
        icon: LocalOffer,
        component: JobOpeningDetail,
        is_sidebar: false,
        is_protect: true,
        roles: [Roles.ADMIN, Roles.CORPORATE_HR],
    },
    {
        path: `${RouteName.EMPLOYEE_VERSIONS}`,
        sidebarName: "Employee Changes",
        navbarName: "Employee Changes",
        icon: LocalOffer,
        component: EmployeeEditVersionListContainer,
        is_sidebar: true,
        is_protect: true,
        roles: process.env.NODE_ENV === "development" ? [Roles.ADMIN, Roles.CORPORATE_HR] : [Roles.CORPORATE_HR],
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

    // { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
