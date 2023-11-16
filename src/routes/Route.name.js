/**
 * Created by charnjeetelectrovese@gmail.com on 10/30/2019.
 */
export default {
  LOGIN: "/login",
  LOCATIONS: "/locations",
  LOCATIONS_CREATE: "/locations/create",
  LOCATIONS_UPDATE: "/locations/update/",
  LOCATIONS_DETAILS: "/locations/details/",
  GRADES: "/grades",
  GRADES_CREATE: "/grades/create",
  GRADES_UPDATE: "/grades/update/",
  CADRES: "/grades/cadres/",
  CADRES_CREATE: "/grades/cadres/create",
  CADRES_UPDATE: "/grades/cadres/update/",
  CADRES_DETAIL:"/grade/cadre/detail/",
  DEPARTMENTS: "/departments",
  DEPARTMENT_DETAIL:'/department/detail/',
  DEPARTMENT_CREATE: "/departments/create",
  DEPARTMENT_UPDATE: "/departments/update/",
  SUB_DEPARTMENTS: "/departments/subs/",
  SUB_DEPARTMENTS_CREATE: "/departments/subs/create",
  SUB_DEPARTMENTS_UPDATE: "/departments/subs/update/",

  JOB_ROLES: "/job/roles/",
  JOB_ROLES_CREATE: "/job/roles/create",
  JOB_ROLES_UPDATE: "/job/roles/update/",
  JOB_ROLES_DETAILS: "/job/roles/details/",

  JOB_OPENINGS: "/job/openings/",
  JOB_OPENINGS_CREATE: "/job/openings/create",
  JOB_OPENINGS_UPDATE: "/job/openings/update/",
  JOB_OPENINGS_DETAILS: "/job/openings/details/",
  DESIGNATION: "/designations",
  DESIGNATION_CREATE: "/designations/create",
  DESIGNATION_UPDATE: "/designations/update/",
  CANDIDATES: "/candidates",
  CANDIDATES_CREATE: "/candidates/create",
  CANDIDATES_UPDATE: "/candidates/update/",
  CANDIDATES_DETAILS: "/candidates/details/",
  CANDIDATES_OFFER:"/candidates/offer/",
  CANDIDATES_OFFER_DETAILS:'/candidates/offer/details/',
  CANDIDATES_INFO:"/candidates/info/",
  CANDIDATES_SUCCESS:'/candidates/success',

  HR_POLICIES: "/hr/policies",
  HR_POLICIES_CREATE: "/hr/policies/create",
  HR_POLICIES_UPDATE: "/hr/policies/update/",

  HR_KNOWLEDGE: "/hr/Knowledge",
  HR_KNOWLEDGE_CREATE: "/hr/Knowledge/create",
  HR_KNOWLEDGE_UPDATE: "/hr/Knowledge/update/",

  HR_ANNOUNCEMENT: "/hr/announcement",
  HR_ANNOUNCEMENT_CREATE: "/hr/announcement/create",
  HR_ANNOUNCEMENT_UPDATE: "/hr/announcement/update/",

  HR_CIRCULARS: "/hr/circulars",
  HR_CIRCULARS_CREATE: "/hr/circulars/create",
  HR_CIRCULARS_UPDATE: "/hr/circulars/update/",

  SETTINGS: "/settings",
  HR_SETTINGS: "/hr/settings",
  HR_USC_UPDATE:'/hr/usc/update/',
  CURRENCY_UPDATE:'/hr/currency/update/',

  EMPLOYEE_DASHBOARD: "/employee/dashboard",
  RESET_PASSWORD_FIRST: "/reset/password/first",

  VIEW_DOCUMENTS: "/view/documents",

  EMPLOYEES: "/employees",
  EMPLOYEE_UPDATE: "/employees/update/",
  EMPLOYEE_CREATE: "/employees/create",
  EMPLOYEE_DETAIL: "/employees/details/",
  EMPLOYEE_VERSIONS: "/employee/versions",
  EMPLOYEE_RECORD_APPROVALs:"/employee-record/approvals",
  NEW_EMPLOYEES:"/new/employee",
  NEW_EMPLOYEE_DETAIL: "/new/employee/details/",


  EAF_LOGIN: '/eaf/login',
  EAF_PERSONAL_DATA: '/eaf/personal',
  EAF_QUALIFICATION_FORM: '/eaf/qualification',
  EAF_EMPLOYMENT_FORM: '/eaf/employment',
  EAF_SUCCESS: '/eaf/success',

  OFFER_LOGIN:'/candidate/offer/login',
  OFFER_LETTER:'/candidate/offer/letter',
  OFFER_SUCCESS:'/candidate/offer/success',

  GUARANTOR_LOGIN:'/guarantor/login',
  GUARANTOR_LETTER:'/guarantor/letter',
  GUARANTOR_SUCCESS:'/guarantor/success',

  MY_PROFILE: '/my/profile',
  MY_PROFILE_UPDATE: '/my/profile/edit',

  CANDIDATE_FEEDBACK_SUCCESS: '/candidate/feedback/success',
  CANDIDATE_FEEDBACK: '/candidate/feedback/',
  CANDIDATE_FEEDBACK_VIEW:'/candidate/view/feedback/',

  INTERVIEW_SCHEDULE: '/interview/schedule',
  REVIEW_OLR: '/olr',
  CV_SHORTLIST_LIST: '/cv/shortlist/',

  CLAIMS_LIST:'/cm/claims' ,
  CLAIMS_DETAILS:'/cm/details/',
  CLAIMS_HR_DETAILS:'/cm/hr/details/',
  TRAVEL_CLAIMS_DETAILS:'/cm/travel/details/',
  FOREIGN_CLAIMS_DETAILS:'/cm/foreign/details/',
  TRAVEL_HR_CLAIMS_DETAILS:'/cm/hr/travel/details/',
  CLAIMS_HR_LIST:'/cm/hr/claims' ,

  CLAIMS_MARRIGE:'/employee/claim/marriage',
  CLAIMS_MOBILE:'/employee/claim/mobile',
  CLAIMS_CAR:'/employee/claim/car',
  CLAIMS_INFO:'/employee/claim/info',
  CLAIMS_HEALTH:'/employee/claim/health',
  CLAIMS_TRAVEL:'/employee/claim/travel',
  CLAIMS_INT:'/employee/claim/int',
  CLAIMS_CURR:'/employee/claim/foreign',
  CLAIMS_INTERVIEW:'/cm/interview',
  CLAIMS_INTERVIEW_DETAILS:'/cm/interview/details/',
  CLAIMS_LOC:'/employee/claim/loc',
  CLAIMS_IMPREST:'/employees/claim/imprest',
  CLAIMS_IMPREST_DETAILS:'/employees/claim/imprest/details',
  CLAIMS_IMPREST_CREATE:'/employees/claim/imprest/create',
  CLAIMS_REPORT:'/cm/report',
  CLAIMS_CAR_REPORT:'/cm/car/report',
  CLAIMS_LOAN:'/cm/loan',
  IMPREST_APPROVAL:'/imprest/list',
  IMPREST_APPROVAL_DETAILS:'/imprest/details/',
  EMPLOYEES_IMPREST:'/employee/imprest',
  EMPLOYEES_IMPREST_DETAILS:'/employee/imprest/details/',
  EMPLOYEE_LOAN_DETAILS:'/employee/loan/details/',
  ADMIN_LOAN_LIST:'/loan/list',
  ADMIN_LOAN_LIST_DETAIL:'/loan/list/details/',
  ADMIN_LOAN_PROCESS:'/loan/process/',
  ADMIN_LOAN_PROCESS_DETAIL:'/loan/process/details/',
  ADMIN_LOAN_RECOVERY:'/loan/recovery/',
  ADMIN_ONGOING_LOANS:'/ongoing/loans',
  ADMIN_ONGOING_LOANS_DETIALS:'/ongoing/loans/details/',


  TRAVEL_PLANNER:'/travel/plan',
  TRAVEL_PLANNER_CREATE:'/travel/plan/create',
  TRAVEL_PLANNER_DETAILS:'/travel/plan/details/',
  TRAVEL_AUTHEN:'/travel/auth',
  TRAVEL_AUTHEN_DETAILS: '/travel/auth/details/',


  PERFORMANCE_BATCH:'/pm/batch',
  PERFORMANCE_REVIEW:'/pm/review',
  PERFORMANCE_PENDING:'/pm/pending',
  PMS_REVIEW_FORM: '/pms/submission/',
  PMS_FORM_DETAIL: '/pms/detail/',
  PMS_PLANNER:'/pms/planner',
  PERFORMANCE_PENDING_REVIEW:'/pms/pending/review',
  PERFORMANCE_NORMALIZE:'/pm/noramlize',
  PERFORMANCE_GRAPH:'/pms/graph',
  PERFORMANCE_HOD:'/pm/hod/batches',
  PERFORMANCE_HOD_REVIEW:'/pm/hod/review',
  PMS_HOD_FORM: '/pms/hod/submission/',
  PMS_HOD_REVIEW_DETAIL: '/pms/hod/detail/',
  REVIEW_RECORD:'/review/record',

  PERFORMANCE_OVERALL_HOD:'/pm/overall/hod/batches',
  PERFORMANCE_OVERALL_HOD_REVIEW:'/pm/overall/hod/review',
  PMS_OVERALL_HOD_FORM: '/pms/overall/hod/submission/',
  PMS_OVERALL_HOD_REVIEW_DETAIL: '/pms/overall/hod/detail/',

  PMS_SITE_PLANNER: '/pms/site',
  PMS_SITE_PLANNER_FORM:'/pms/site/submission',
  PMS_SITE_PENDING: '/pm/site/pending',
  PMS_SITE_SUBMISSION_DETAIL: '/pms/site/form/detail/',

  EMPLOYEE_REPORT:'/employee/report',
  PMS_4B_FORM: '/pms/4B/submission',
  PMS_4B_REVIEW_DETAIL: '/pms/4B/detail/',
  EMPLOYEE_SALARY:'/employee/salary',
  EMPLOYEE_INCREMENT_SALARY:'/employee/increment/salary',


  PMS_INCREMENT_PLANNER : '/increment/planner',
  PMS_INCREMENT_PLANNER_RED: '/increment/planner/red',
  PMS_INCREMENT_PLANNER_NO: '/increment/planner/no',
  PMS_INCREMENT_PLANNER_GRAPH : '/graph/increment/planner',
  PMS_INCREMENT_LETTER : '/increment/letter',


  IRF_LOGIN:'/irf/login',
  IRF_FORM:'/irf/form',
  INCREMENT_MASTER:'/increment-master',

  CANDIDATE_STATUS_GLOSSARY:"/candidate/status",
  SUCCESSION_PLANING:"/succession-planing",
  SUCCESSION_APPROVAL:"/succession-approval",
  SUCCESSION_APPROVAL_DETAIL:"/succession-approval/detail/",

  SUCCESSION_PLANNER:"/succession/planner",
  SUCCESSION_PLANNER_DETAIL_FORM:"/succession/detail/form",
  SUCCESSION_HISTORY:"/succession/history",
  EXPIRING_OFFER_LETTER:"/expiring-offer-letter",

  C3MLETTER:"/c3m-letter",
  NAPS_TRANING:"/naps_traning",
  APPOINTMENT_LETTER:"/appointment-letter",
  RELIEVING_EXPERIENCE_APPROVALS:"/relieving-experience-approval",
  RELIEVING_EXPERIENCE_APPROVALS_DETAILS:"/relieving-experience-approval/details",
  RELIEVING_EXPERIENCE_LETTER:"/relieving-exp-letter",
  RELIEVING_EXPERIENCE_LETTER_DETAIL:"/relieving-exp-letter/detail/",
  PENDING_BACKGROUND_VERIFICATION:"/pending/verification",
  BGV_ANALYSI_REPOST:"/pending/verification/analysis/report",

  PENDING_VERIFICATION_CREATE:"/verification/create/",
  PENDING_VERIFICATION_DETAIL:"/verification/detail",
  PENDING_VERIFICATION_UPDATE:"/verification/update/",


  LEAVE_APPLICATION_LIST_VIEW:'/leave-application/list',
  LEAVE_APPLICATION_FORM:"/leave-application-form",
  PENDING_LEAVE_APPLICATION:"/pending-application/list",


  FULL_FINAL_APPLICATION:"/full-final",
  FULL_FINAL_APPROVAL:"/full-final-approval",
  FULL_FINAL_DETAIL_APPROVAL:"/full-final/detail/",

  FULL_FINAL_FORM:"/full/form/",
  FULL_FINAL_DETAIL:"/full/detail/",

  HRESCALATIONMATRIX:"/hr/escalation",
  EXIT_LOGIN:"/exit/login",
  EXIT_SUCCESS:"/exit/success",
  EXIT_INTERVIEW_LIST:"/exit/interview/list",
  EXIT_INTERVIEW_FORM:"/exit/interview/form",
  EXIT_DETAIL:"/exit/details/",

  SUCCESSION_FORM:"/succession/form"

};
