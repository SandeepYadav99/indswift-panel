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
        path: "/job/role",
        sidebarName: "Job Description",
        navbarName: "Job Roles(Designation)",
        icon: PeopleOutlined,
        component: JobRolesList,
        is_sidebar: true,
        is_protect: true,
        should_regex: true,
    },
    {
        path: "/job/role/create",
        sidebarName: "Products",
        navbarName: "Products",
        icon: LocalOffer,
        component: JobRoleCreateView,
        is_sidebar: false,
        is_protect: true,
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
        path: "/candidate",
        sidebarName: "Interview Candidates",
        navbarName: "Interview Candidates",
        icon: PeopleOutlined,
        component: CandidateList,
        is_sidebar: true,
        is_protect: true,
        should_regex: true,
    },
    {
        path: "/candidate/create",
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
        path: "/locations/detail",
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
        path: "/job/openings",
        sidebarName: "Job Openings",
        navbarName: "Job Openings",
        icon: PeopleOutlined,
        component: JobOpeningsList,
        is_sidebar: true,
        is_protect: true,
        should_regex: true,
    },
    {
        path: "/job/openings/create",
        sidebarName: "Job Openings Create",
        navbarName: "Job Openings Create",
        icon: LocalOffer,
        component: JobOpeningCreateView,
        is_sidebar: false,
        is_protect: true,
    },
    {
        path: "/job/openings/detail",
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
