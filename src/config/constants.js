/* eslint-disable indent,linebreak-style */
const TABLE_LIMIT = 50;
const tempLevel = !(
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
);

const tempDate = new Date();
const isProduction = false;

let url = "http://91.205.173.97:8111/api/admin/";
let socketUrl = "http://91.205.173.97:8111";

if (isProduction) {
  url = "https://api.indswiftlabs.com/api/admin/";
  socketUrl = "https://api.indswiftlabs.com";
}

export default {
  is_development: (process.env.NODE_ENV === 'development' || !isProduction ),
  TIME_ZONE: -(tempDate.getTimezoneOffset() / 60),
  DEFAULT_TIME_FORMAT: "DD-MM-YYYY, HH:mm",
  APP_NAME: "IndSwift Panel",
  DEFAULT_APP_URL: tempLevel ? url : "http://localhost:8111/api/admin/",
  SOCKET_URL: tempLevel ? socketUrl : "http://91.205.173.97:8111/",
  // DEFAULT_APP_URL: 'http://35.154.147.169:5055/api/',
  DEFAULT_PAGE_VALUE: TABLE_LIMIT,
  GOOGLE_LOGIN_KEY: "1027293586426-qg6lv2vsp57m05tn32m9stku2ljsd1uh.apps.googleusercontent.com",
  GOOGLE_MAP_KEY: "AIzaSyDUTIV7DaCvMUMg3qElE-sxdj4zR-dxhFM",
  FACEBOOK_LOGIN_KEY: "213504989180156",
  DATATABLE_PROPERTIES: {
    title: "Search",
    height: "auto",
    selectable: false,
    showRowHover: true,
    columns: [],
    data: [],
    count: 0,
    page: 0,
    showCheckboxes: false,
    // showHeaderToolbar: true,
    rowsPerPage: TABLE_LIMIT,
    rowsPerPageOptions: [],
  },
  PRODUCT_TAGS: ["VEG", "VEGAN", "GLUTEN FREE", "DIARY"],
  CURRENCY: "RS.",
  GENERAL_STATUS: {
    PENDING: "PENDING",
    WAITING: "WAITING",
    ACCEPTED: "ACCEPTED",
    ACTIVE: "ACTIVE",
    SUSPENDED: "SUSPENDED",
    ALLOTTED: "ALLOTTED",
    COMPLETED: "COMPLETED",
  },
  STATUS: {
    PENDING: "pending",
    WAITING: "waiting",
    ACCEPTED: "success",
    ACTIVE: "warning",
    INACTIVE: "error",
    SUSPENDED: "error",
    ALLOTTED: "success",
    COMPLETED: "success",
    RECEIVED: "success",
    Received: "success",
    "Partially Received": "success",
    Pending: "pending",
    TERMINATED:"error",
    ABSCONDED:'error',
    RESIGNED:'error',
    EXPIRED:'success',
    REJECTED:'error',
    // PENDING:'pending',
    SOURCING:'warning',
    NOSOURCING:'nosourcing',
    'CV Rejected':'error',
    'INTERVIEW REJECTED' : 'error',
    'Interview Rejected' :'error',
    'PENDING REVIEW':'pending',
    'Pending Review':'pending',
    'CV SHORTLIST REJECTED':'error'
  },
  VACANCY_TYPE: {
    RAP: 'RAP',
    ADDITIONAL_REQUIREMENT: 'ADDITIONAL_REQUIREMENT',
  },
  OFFER_LETTER_STATUS: {
    WAITING: 'WAITING',
    DRAFTED: 'DRAFTED',
    APPROVAL_DUE: 'APPROVAL_DUE',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
    PENDING: 'PENDING',
    SENT: 'SENT',
    ACCEPTED: 'ACCEPTED',
    EXPIRED: 'EXPIRED',
    DROPPED: 'DROPPED',
    ON_HOLD: 'ON_HOLD',
    HR_APPROVAL_PENDING: 'HR_APPROVAL_PENDING',
    HR_REJECTED: 'HR_REJECTED',
    HR_APPROVED: 'HR_APPROVED',
    PENDING_APPROVAL: 'PENDING_APPROVAL',
  },
  STATES: [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ],
  MONTHS: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  SALES_ORDER_STATUS_COLOR: {
    ACTIVE: "success",
    PENDING: "pending_sales",
    CANCELLED: "cancelled",
    CONFIRMED: "confirmed",
    PROCESSING: "processing",
    PICKED: "picked",
    PACKED: "packed",
    ON_GOING: "on_going",
  },
  INTERVIEW_STATUS: {
    PENDING: "PENDING",
    ACTIVE: "ACTIVE",
    SCHEDULED: "SCHEDULED",
    REJECTED: "REJECTED",
    SHORTLISTED: "SHORTLISTED",
    FEEDBACK_PENDING: "FEEDBACK_PENDING",
    COMPLETED: "COMPLETED",
    INTERVIEW_COMPLETED: "INTERVIEW_COMPLETED",
    INTERVIEW_REJECTED: "INTERVIEW_REJECTED",
  },
  JOB_CANDIDATE_STATUS: {
    ACTIVE: "ACTIVE",
    REJECTED: "REJECTED",
    SHORTLISTED: "SHORTLISTED",
    INTERVIEW_ALIGNED: "INTERVIEW_ALIGNED",
    CV_SHORTLIST_REJECTED: "CV_SHORTLIST_REJECTED",
    PENDING_SHORTLIST: "PENDING_SHORTLIST",
    SELECTED: "SELECTED",
    PENDING: "PENDING",
    CV_SHORTLISTED: "CV_SHORTLISTED",
    PENDING_REVIEW:"PENDING_REVIEW"
  },
  INTERVIEW_STATUS_TEXT: {
    PENDING: "Pending",
    ACTIVE: "Active",
    SCHEDULED: "Scheduled",
    REJECTED: "Rejected",
    SHORTLISTED: "Shortlisted",
    FEEDBACK_PENDING: "Feedback Pending",
    COMPLETED: "Completed",
    INTERVIEW_COMPLETED: "Interview Completed",
    INTERVIEW_REJECTED: "Interview Rejected",
    SELECTED: 'SELECTED',

  },
  JOB_CANDIDATE_STATUS_TEXT: {
    ACTIVE: "Active",
    REJECTED: "Rejected",
    SHORTLISTED: "Shortlisted",
    INTERVIEW_ALIGNED: "Interview Aligned",
    CV_SHORTLIST_REJECTED: "CV Rejected",
    PENDING_SHORTLIST: "Pending Shortlist",
    SELECTED: "Selected",
    PENDING: "Pending",
    CV_SHORTLISTED: "CV Shortlisted",
    PENDING_REVIEW: 'Pending Review',
    INTERVIEW_REJECTED: 'Interview Rejected',
    JOINING: 'Joining',
    DROPPED: 'Dropped',
    ON_HOLD: 'On Hold',
    OFFER_LETTER: "Offer Letter"
  },
  SOCKET_EVENTS: {
    NEW_ORDER: "COMPANY_NEW_ORDER",
    ORDER_UPDATE: "COMPANY_ORDER_UPDATE",
    ORDER_ACCEPTED: "ORDER_ACCEPTED",
    ORDER_ASSIGNED: "ORDER_ASSIGNED",
    ORDER_REJECTED: "ORDER_REJECTED",
    ORDER_ON_PICKUP_LOCATION: "ORDER_ON_PICKUP_LOCATION",
    ORDER_ON_WAY: "ORDER_ON_WAY",
    ORDER_ON_DROP_LOCATION: "ORDER_ON_DROP_LOCATION",
    ORDER_DELIVERED: "ORDER_DELIVERED",
    ORDER_LOCATION_UPDATE: "COMPANY_LOCATION_UPDATE",
    ORDER_DATA: "ORDER_DATA",
    COMPANY_DRIVER_ADD: "COMPANY_DRIVER_ADD",
    COMPANY_DRIVER_REMOVE: "COMPANY_DRIVER_REMOVE",
  },
  USER_TYPES: {
    CUSTOMER: "CUSTOMER",
    MANUFACTURE: "MANUFACTURER",
    BOTH: "BOTH",
  },
  TRANSFER_TYPE_TEXT: {
    SALES_ORDER: "Sales Order",
    SALES_EXCHANGE_ORDER: "Sales Exchange Order",
    STOCK_TRANSFER_NOTE: "Stock Transfer Note",
  },
  PRIORITY_TEXT: {
    HIGH: "Hot",
    MEDIUM: "Warm",
    LOW: "Cold ",
  },
  PRIORITY: {
    HIGH: "HIGH",
    MEDIUM: "MEDIUM",
    LOW: "LOW",
  },
  CONCERN_STATUS_TEXT: {
    TRANSACTION_FAILURE: "Transaction Failure",
    ORDER_DISPUTE: "Order Dispute",
    ACCOUNT_RELATED_ISSUE: "Account Related Issue",
    PARTNER_REQUEST: "Partner Request",
    MEDIA_QUERY: "Media Query",
    GENERAL_SUPPORT: "General Support",
    CAREER_OPPORTUNITY: "Career Opportunity",
    OTHER: "Other",
  },
  SUPPORT_STATUS: {
    PENDING: "PENDING",
    RESOLVED: "RESOLVED",
  },
  SUPPORT_STATUS_TEXT: {
    PENDING: "Pending",
    RESOLVED: "Resolved",
  },
  QUOTE_STATUS: {
    PENDING: "PENDING",
    ON_GOING: "ON_GOING",
    CONVERTED: "CONVERTED",
    JUNK: "JUNK",
    COMPLETED: "COMPLETED",
  },
  QUOTE_STATUS_TEXT: {
    PENDING: "Pending",
    ON_GOING: "On Going",
    CONVERTED: "Converted",
    JUNK: "Junk",
    COMPLETED: "Completed",
  },
  QUOTE_STATUS_COLOR: {
    PENDING: "pending",
    ON_GOING: "on_going",
    CONVERTED: "converted",
    JUNK: "junk",
    COMPLETED: "completed",
  },
  INDUSTRY_STATUS_TEXT: {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
    PENDING: "COMING SOON",
  },
  LEAD_STATUS: {
    PENDING: "PENDING",
    IN_PROGRESS: "IN_PROGRESS",
    QUOTE_SENT: "QUOTE_SENT",
    ARCHIVED: "ARCHIVED",
  },
  LEAD_STATUS_COLOR: {
    PENDING: "pending",
    IN_CONTACT: "in_Contact",
    FOLLOWUP: "followup",
    CONTACT_IN_FUTURE: "contact_in_future",
    JUNK: "junk",
    SUCCESSFUL: "success",
    LOST: "lost",
    UNQUALIFIED: "unqualified",
    DUPLICATE: "duplicate",
  },
  LEAD_STATUS_TEXT: {
    PENDING: "Pending",
    IN_PROGRESS: "In Progress",
    QUOTE_SENT: "Quote Sent",
    ARCHIVED: "Archived",
  },
  LEAD_REQUEST_STATUS: {
    PENDING: "PENDING",
    IN_CONTACT: "IN_CONTACT",
    FOLLOWUP: "FOLLOWUP",
    CONTACT_IN_FUTURE: "CONTACT_IN_FUTURE",
    JUNK: "JUNK",
    SUCCESSFUL: "SUCCESSFUL",
    LOST: "LOST",
    UNQUALIFIED: "UNQUALIFIED",
    DUPLICATE: "DUPLICATE",
  },
  LEAD_REQUEST_STATUS_TEXT: {
    PENDING: "Pending",
    IN_CONTACT: "In Contact",
    FOLLOWUP: "Followup",
    CONTACT_IN_FUTURE: "Contact In Future",
    JUNK: "Junk",
    SUCCESSFUL: "Successful",
    LOST: "Lost",
    UNQUALIFIED: "Unqualified",
    DUPLICATE: "Duplicate",
  },
  VENDOR_STATUS: {
    PENDING: "PENDING",
    LEAD: "LEAD",
    ONBOARDED: "ONBOARDED",
    SUSPENDED: "SUSPENDED",
    CANCELLED: "CANCELLED",
  },
  VENDOR_STATUS_TEXT: {
    PENDING: "pending",
    LEAD: "lead",
    ONBOARDED: "onboarded",
    SUSPENDED: "suspended",
    CANCELLED: "cancelled",
  },
  ROLES: {
    ADMIN: "ADMIN",
    OTHERS: "OTHERS",
    CORPORATE_HR: "CORPORATE_HR",
    RECRUITER: 'RECRUITER',
    GENERAL: 'GENERAL',
  },
  LOG_ENABLED: true,
  WARNING_ENABLED: true,
  ERROR_ENABLED: true,
  TYPE_OF_VACANCY: {
    RAP: "Request Against Position",
    ADDITIONAL_REQUIREMENT: "Additional Requirement",
    RAB: "Requirement Against Budget",
  },
};
