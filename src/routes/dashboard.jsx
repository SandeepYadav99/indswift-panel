import {
    Dashboard,
    LocalOffer,
    EventNote,
    PeopleOutlined,
    AssignmentOutlined,
    DashboardOutlined, Subtitles
} from "@material-ui/icons";
import EmployeeTab from "../views/Employees/EmployeeTab.view";
import EmployeeList from "../views/EmployeeList/EmployeeList.container";
import JobRolesList from "../views/JobRoles/JobRolesList.container";
import JobRoleCreateView from "../views/JobRoleCreate/JobRoleCreate.view";
import NewDashboard from "../views/dashboard/NewDashboard.view";
import LocationList from "../views/Location/LocationList.container";
import LocationCreateView from "../views/LocationCreate/LocationCreate.view";
import DepartmentList from "../views/Department/DepartmentList.container";
import DepartmentCreateView from "../views/Department/DepartmentCreate.view";
import SubDepartmentList from "../views/SubDepartment/SubDepartmentList.container";
import SubDepartmentCreateView from "../views/SubDepartment/SubDepartmentCreate.view";
import LocationDetail from "../views/LocationDetail/LocationDetail.view";
import CandidateList from "../views/Candidate/CandidateList.container";
import CandidateCreateView from "../views/CandidateCreate/CandidateCreate.view";
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
import HRPolicy from "../views/HRPolicy/HRPolicy.container";
import HRCreateView from "../views/HRPolicy/HRPolicyCreate.view";
import CircularCreateView from "../views/Circular/CircularCreate.view";
import Circular from "../views/Circular/Circular.container";
import DesignationList from "../views/Designation/DesignationList.container";
import DesignationCreateView from "../views/Designation/DesignationCreate.view";
import AppSettings from "../views/AppSettings/AppSettings.container";
import HRSettings from "../views/HRSettings/HRSettings.container";
import EmployeeDashboard from "../views/employee_dashboard/EmployeeDashboard.view";
import EmployeeInducation from "../views/EmployeeInducation/EmployeeInducation.container";
import EmployeeHRPolicy from "../views/EmployeeHRPolicy/EmployeeHRPolicy.container";
import EmployeeCircular from "../views/EmployeeCircular/EmployeeCircular.container";
import EmployeeEngagement from "../views/EmployeeEngagement/EmployeeEngagement.container";


const dashboardRoutes = [
    {
        path: "/",
        sidebarName: "Dashboard",
        navbarName: "Admin Dashboard",
        icon: DashboardOutlined,
        component: NewDashboard,
        is_sidebar: true,
    },
    {
        path: "/employee/engagement",
        sidebarName: "Enagement",
        navbarName: "Admin Dashboard",
        icon: DashboardOutlined,
        component: EmployeeEngagement,
        is_sidebar: true,
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
    },
    {
        path: "/employees",
        sidebarName: "Employee Records",
        navbarName: "Employee Records",
        icon: AssignmentOutlined,
        component: EmployeeList,
        is_sidebar: true,
        is_protect: true,
        // should_regex: true,
    },
    {
        path: "/employees/details/:id",
        sidebarName: "Employee Details",
        navbarName: "Employee Details",
        icon: Dashboard,
        component: EmployeeTab,
        is_sidebar: false,
        is_protect: true,
    },
    {
        path: 'null',
        sidebarName: "Masters",
        navbarName: "Masters",
        icon: EventNote,
        is_sidebar: true,
        slug: 'masters',
        is_parent: true,
    },
    {
        path: 'null',
        sidebarName: "Emp-Dashboard",
        navbarName: "Emp-Dashboard",
        icon: EventNote,
        is_sidebar: true,
        slug: 'employeedashboard',
        is_parent: true,
    },
    {
        path: '/employeedashboard',
        sidebarName: "Dashboard",
        navbarName: "Dashboard",
        icon: PeopleOutlined,
        component: EmployeeDashboard,
        is_sidebar: true,
        is_protect: true,
        should_regex: true,
        parent: 'employeedashboard',
    },
    {
        path: '/employeeInduction',
        sidebarName: "EmployeeInduction",
        navbarName: "EmployeeInduction",
        icon: PeopleOutlined,
        component: EmployeeInducation,
        is_sidebar: true,
        is_protect: true,
        should_regex: true,
        parent: 'employeedashboard',
    },
    {
        path: '/hrpolicy',
        sidebarName: "EmployeeHRPolicy",
        navbarName: "EmployeeHRPolicy",
        icon: PeopleOutlined,
        component: EmployeeHRPolicy,
        is_sidebar: true,
        is_protect: true,
        should_regex: true,
        parent: 'employeedashboard',
    },
    {
        path: '/employeecircular',
        sidebarName: "EmployeeCircular",
        navbarName: "EmployeeCircular",
        icon: PeopleOutlined,
        component: EmployeeCircular,
        is_sidebar: true,
        is_protect: true,
        should_regex: true,
        parent: 'employeedashboard',
    },
    {
        path: 'null',
        sidebarName: "Budget & Planning",
        navbarName: "Budget & Planning",
        icon: EventNote,
        is_sidebar: true,
        slug: 'budget',
        is_parent: true,
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
    },
    {
        path: RouteName.CANDIDATES_CREATE,
        sidebarName: "Location",
        navbarName: "Location",
        icon: LocalOffer,
        component: CandidateCreateView,
        is_sidebar: false,
        is_protect: true,
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
    },
    {
        path: RouteName.LOCATIONS_CREATE,
        component: LocationCreateView,
        is_sidebar: false,
        is_protect: true,
    },
    {
        path: `${RouteName.LOCATIONS_UPDATE}:id`,
        component: LocationCreateView,
        is_sidebar: false,
        is_protect: true,
    },
    {
        path: `${RouteName.LOCATIONS_DETAILS}:id`,
        sidebarName: "Location Detail",
        navbarName: "Location Detail",
        icon: LocalOffer,
        component: LocationDetail,
        is_sidebar: false,
        is_protect: true,
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
    },
    {
        path: RouteName.DEPARTMENT_CREATE,
        component: DepartmentCreateView,
        is_sidebar: false,
        is_protect: true,
    },
    {
        path: `${RouteName.DEPARTMENT_UPDATE}:id`,
        component: DepartmentCreateView,
        is_sidebar: false,
        is_protect: true,
    },
    {
        path: RouteName.SUB_DEPARTMENTS_CREATE,
        component: SubDepartmentCreateView,
        is_sidebar: false,
        is_protect: true,
    },
    {
        path: `${RouteName.SUB_DEPARTMENTS_UPDATE}:id`,
        component: SubDepartmentCreateView,
        is_sidebar: false,
        is_protect: true,
    },
    {
        path: `${RouteName.SUB_DEPARTMENTS}:code`,
        sidebarName: "SubDepartment",
        navbarName: "SubDepartment",
        icon: Subtitles,
        component: SubDepartmentList,
        is_sidebar: false,
        should_regex: true
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
    },
    {
        path: RouteName.DESIGNATION_CREATE,
        component: DesignationCreateView,
        is_sidebar: false,
        is_protect: true,
    },
    {
        path: `${RouteName.DESIGNATION_UPDATE}:id`,
        component: DesignationCreateView,
        is_sidebar: false,
        is_protect: true,
    },
    {
        path: RouteName.GRADES_CREATE,
        component: GradeCreateView,
        is_sidebar: false,
        is_protect: true,
    },
    {
        path: `${RouteName.GRADES_UPDATE}:id`,
        component: GradeCreateView,
        is_sidebar: false,
        is_protect: true,
    },
    {
        path: RouteName.CADRES_CREATE,
        component: CadreCreateView,
        is_sidebar: false,
        is_protect: true,
    },
    {
        path: `${RouteName.CADRES_UPDATE}:id`,
        component: CadreCreateView,
        is_sidebar: false,
        is_protect: true,
    },
    {
        path: `${RouteName.CADRES}:code`,
        component: CadreList,
        is_sidebar: false,
        should_regex: true
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
    },
    {
        path: RouteName.JOB_OPENINGS_CREATE,
        sidebarName: "Job Openings Create",
        navbarName: "Job Openings Create",
        icon: LocalOffer,
        component: JobOpeningCreateView,
        is_sidebar: false,
        is_protect: true,
    },
    {
        path: 'null',
        sidebarName: "HR Documents & Updates",
        navbarName: "HR Documents & Updates",
        icon: EventNote,
        is_sidebar: true,
        slug: 'Hr',
        is_parent: true,
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
    },
    {
        path: RouteName.HR_POLICIES_CREATE,
        component: HRCreateView,
        is_sidebar: false,
        is_protect: true,
    },
    {
        path: `${RouteName.HR_POLICIES_UPDATE}:id`,
        component: HRCreateView,
        is_sidebar: false,
        is_protect: true,
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
    },
    {
        path: RouteName.HR_CIRCULARS_CREATE,
        component: CircularCreateView,
        is_sidebar: false,
        is_protect: true,
    },
    {
        path: `${RouteName.HR_CIRCULARS_UPDATE}:id`,
        component: CircularCreateView,
        is_sidebar: false,
        is_protect: true,
    },
    {
        path: `${RouteName.JOB_OPENINGS_DETAILS}:id`,
        sidebarName: "Job Openings Detail",
        navbarName: "Job Openings Detail",
        icon: LocalOffer,
        component: JobOpeningDetail,
        is_sidebar: false,
        is_protect: true,
    },
    // { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
