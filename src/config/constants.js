/* eslint-disable indent,linebreak-style */
const TABLE_LIMIT = 50;
const tempLevel = true//!(!process.env.NODE_ENV || process.env.NODE_ENV === 'development');
const tempDate = new Date();
export default {
    TIME_ZONE: -(tempDate.getTimezoneOffset()/60),
    DEFAULT_TIME_FORMAT: 'DD-MM-YYYY, HH:mm',
    APP_NAME: '36ty Panel',
    DEFAULT_APP_URL: tempLevel ? 'http://91.205.173.97:8097/api/admin/' :'http://localhost:8094/api/admin/',
    SOCKET_URL: tempLevel ? 'http://91.205.173.97:8097/' : 'http://91.205.173.97:8097/',
    // DEFAULT_APP_URL: 'http://35.154.147.169:5055/api/',
    DEFAULT_PAGE_VALUE: TABLE_LIMIT,
    GOOGLE_LOGIN_KEY: '1027293586426-qg6lv2vsp57m05tn32m9stku2ljsd1uh.apps.googleusercontent.com',
    GOOGLE_MAP_KEY: 'AIzaSyDUTIV7DaCvMUMg3qElE-sxdj4zR-dxhFM',
    FACEBOOK_LOGIN_KEY: '213504989180156',
    DATATABLE_PROPERTIES: {
        title: 'Search',
        height: 'auto',
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
    PRODUCT_TAGS: ['VEG', 'VEGAN', 'GLUTEN FREE', 'DIARY'],
    CURRENCY: 'RS.',
    STATUS: {
        'PENDING': 'warning',
        'WAITING': 'waiting',
        'ACCEPTED': 'success',
        'ACTIVE': 'success',
        'SUSPENDED': 'error',
        'ALLOTTED': 'success',
        'COMPLETED': 'success',
        RECEIVED: 'success',
        Received: 'success',
        'Partially Received': 'success',
        'Pending': 'warning',

    },
    SALES_ORDER_STATUS: {
        PROCESSING: 'PROCESSING',
        ON_GOING: 'ON_GOING',
        PENDING: 'PENDING',
        CONFIRMED: 'CONFIRMED',
        PICKED: 'PICKED',
        PACKED: 'PACKED',
        ACTIVE: 'ACTIVE',
        CANCELLED: 'CANCELLED',
    },
    SALES_ORDER_STATUS_COLOR: {
        ACTIVE: 'success',
        PENDING: 'pending_sales',
        CANCELLED: 'cancelled',
        CONFIRMED: 'confirmed',
        PROCESSING: 'processing',
        PICKED: 'picked',
        PACKED: 'packed',
        ON_GOING: 'on_going'
    },
    SALE_ORDER_CALLING_STATUS: {
        PENDING: 'PENDING',
        ASSIGNED: 'ASSIGNED',
        REATTEMPT: 'REATTEMPT',
        CONFIRMED: 'CONFIRMED',
        CANCELLED: 'CANCELLED',
        NO_RESPONSE: 'NO_RESPONSE',
    },
    SALE_ORDER_CALLING_STATUS_COLOR: {
        PENDING: 'pending_calling',
        ASSIGNED: 'assigned_calling',
        REATTEMPT: 'reattempt_calling',
        CONFIRMED: 'confirmed_calling',
        CANCELLED: 'cancelled_calling',
        NO_RESPONSE: 'no_response_calling',
    },
    SALES_ORDER_CALLING_STATUS_TEXT: {
        PENDING: 'Pending',
        REATTEMPT: 'Reattempt',
        CONFIRMED: 'Confirmed',
        CANCELLED: 'Cancelled',
        NO_RESPONSE: 'No Response',
    },
    ORDER_STATUS: {
        PENDING: 'PENDING',
        ASSIGNED: 'ASSIGNED',
        PAYMENT: 'PAYMENT',
        ON_PICKUP_LOCATION: 'ON_PICKUP_LOCATION',
        OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
        ON_DROP_LOCATION: 'ON_DROP_LOCATION',
        DELIVERED: 'DELIVERED',
        REJECTED: 'REJECTED',
        ACCEPTED: 'ACCEPTED'
    },
    ORDER_STATUS_TEXT: {
        ORDER: 'Ordered',
        PENDING: 'Pending',
        ASSIGNED: 'Driver Assigned',
        PAYMENT: 'Payment Pending',
        ON_PICKUP_LOCATION: 'Dispatching',
        OUT_FOR_DELIVERY: 'Out For Delivery',
        ON_DROP_LOCATION: 'Arrived On Location',
        DELIVERED: 'Order Delivered',
        REJECTED: 'Rejected',
        ACCEPTED: 'Accepted'
    },
    SOCKET_EVENTS: {
        NEW_ORDER: 'COMPANY_NEW_ORDER',
        ORDER_UPDATE: 'COMPANY_ORDER_UPDATE',
        ORDER_ACCEPTED: 'ORDER_ACCEPTED',
        ORDER_ASSIGNED: 'ORDER_ASSIGNED',
        ORDER_REJECTED: 'ORDER_REJECTED',
        ORDER_ON_PICKUP_LOCATION: 'ORDER_ON_PICKUP_LOCATION',
        ORDER_ON_WAY: 'ORDER_ON_WAY',
        ORDER_ON_DROP_LOCATION: 'ORDER_ON_DROP_LOCATION',
        ORDER_DELIVERED: 'ORDER_DELIVERED',
        ORDER_LOCATION_UPDATE: 'COMPANY_LOCATION_UPDATE',
        ORDER_DATA: 'ORDER_DATA',
        COMPANY_DRIVER_ADD: 'COMPANY_DRIVER_ADD',
        COMPANY_DRIVER_REMOVE: 'COMPANY_DRIVER_REMOVE',
    },
    USER_TYPES: {
        CUSTOMER: 'CUSTOMER',
        MANUFACTURE: 'MANUFACTURER',
        BOTH: 'BOTH'
    },
    TRANSFER_TYPE_TEXT: {
        SALES_ORDER: 'Sales Order',
        SALES_EXCHANGE_ORDER: 'Sales Exchange Order',
        STOCK_TRANSFER_NOTE: 'Stock Transfer Note',
    },
    PRIORITY_TEXT: {
        HIGH: 'Hot',
        MEDIUM: 'Warm',
        LOW: 'Cold '
    },
    PRIORITY: {
        HIGH: 'HIGH',
        MEDIUM: 'MEDIUM',
        LOW: 'LOW'
    },
    CONCERN_STATUS_TEXT: {
        TRANSACTION_FAILURE : 'Transaction Failure',
        ORDER_DISPUTE: 'Order Dispute',
        ACCOUNT_RELATED_ISSUE: 'Account Related Issue',
        PARTNER_REQUEST : 'Partner Request',
        MEDIA_QUERY: 'Media Query',
        GENERAL_SUPPORT: 'General Support',
        CAREER_OPPORTUNITY: 'Career Opportunity',
        OTHER: 'Other'
    },
    SUPPORT_STATUS: {
        PENDING: 'PENDING',
        RESOLVED: 'RESOLVED'
    },
    SUPPORT_STATUS_TEXT: {
        PENDING: 'Pending',
        RESOLVED: 'Resolved'
    },
    QUOTE_STATUS: {
        PENDING: 'PENDING',
        ON_GOING: 'ON_GOING',
        CONVERTED: 'CONVERTED',
        JUNK: 'JUNK',
        COMPLETED: 'COMPLETED'
    },
    QUOTE_STATUS_TEXT: {
        PENDING: 'Pending',
        ON_GOING: 'On Going',
        CONVERTED: 'Converted',
        JUNK: 'Junk',
        COMPLETED: 'Completed'
    },
    QUOTE_STATUS_COLOR: {
        PENDING: 'pending',
        ON_GOING: 'on_going',
        CONVERTED: 'converted',
        JUNK: 'junk',
        COMPLETED: 'completed'
    },
    INDUSTRY_STATUS_TEXT: {
        'ACTIVE': 'ACTIVE',
        'INACTIVE': 'INACTIVE',
        'PENDING' : 'COMING SOON'
    },
    LEAD_STATUS: {
        PENDING: 'PENDING',
        IN_PROGRESS: 'IN_PROGRESS',
        QUOTE_SENT: 'QUOTE_SENT',
        ARCHIVED: 'ARCHIVED',
    },
    LEAD_STATUS_COLOR: {
        PENDING: 'pending',
        IN_CONTACT: 'in_Contact',
        FOLLOWUP: 'followup',
        CONTACT_IN_FUTURE: 'contact_in_future',
        JUNK: 'junk',
        SUCCESSFUL: 'success',
        LOST: 'lost',
        UNQUALIFIED: 'unqualified',
        DUPLICATE: 'duplicate',
    },
    LEAD_STATUS_TEXT: {
        PENDING: 'Pending',
        IN_PROGRESS: 'In Progress',
        QUOTE_SENT: 'Quote Sent',
        ARCHIVED: 'Archived',
    },
    LEAD_REQUEST_STATUS: {
        PENDING: 'PENDING',
        IN_CONTACT: 'IN_CONTACT',
        FOLLOWUP: 'FOLLOWUP',
        CONTACT_IN_FUTURE: 'CONTACT_IN_FUTURE',
        JUNK: 'JUNK',
        SUCCESSFUL: 'SUCCESSFUL',
        LOST: 'LOST',
        UNQUALIFIED: 'UNQUALIFIED',
        DUPLICATE: 'DUPLICATE',
    },
    LEAD_REQUEST_STATUS_TEXT: {
        PENDING: 'Pending',
        IN_CONTACT: 'In Contact',
        FOLLOWUP: 'Followup',
        CONTACT_IN_FUTURE: 'Contact In Future',
        JUNK: 'Junk',
        SUCCESSFUL: 'Successful',
        LOST: 'Lost',
        UNQUALIFIED: 'Unqualified',
        DUPLICATE: 'Duplicate',
    },
    VENDOR_STATUS: {
        PENDING: 'PENDING',
        LEAD: 'LEAD',
        ONBOARDED: 'ONBOARDED',
        SUSPENDED: 'SUSPENDED',
        CANCELLED: 'CANCELLED'
    },
    VENDOR_STATUS_TEXT: {
        PENDING: 'pending',
        LEAD: 'lead',
        ONBOARDED: 'onboarded',
        SUSPENDED: 'suspended',
        CANCELLED: 'cancelled'
    },
    USER_TYPE: {
        NEW_LEAD: 'New Lead',
        REPEAT_LEAD: 'Repeat Lead',
        VENDOR_TEAM: 'Vendor Lead',
        BLOCK: 'Block',
        DUPLICATE: 'Duplicate',
        JUNK: 'Junk'
    },
    SOURCE: {
        QUOTE_FORM: 'Quote Form',
        GET_IN_TOUCH: 'Get In Touch',
        ONBOARD_FORM: 'Onboard Form',
        ADMIN: 'Admin',
        VENDOR: 'Vendor',
        NONE: 'None'
    },
    INDUSTRY: {
        E_COMMERCE: 'E-Commerce',
        FASHION: 'Fashion',
        ELECTRONICS : 'Electronics',
        FMCG: 'FMCG',
        GAMES_AND_TOYS: 'Games & Toys',
        PRINTING_AND_PACKAGING: 'Printing & Packaging',
        FOOTWEAR: 'Footwear',
        OTHER: 'Other',
    },
    PRODUCT_PACKAGING: {
        'PACKET': 'Packet',
        'BOX': 'Box',
        'POUCH': 'Pouch',
        'CARTON': 'Carton',
        'PIECES': 'Pieces',
        'PALETTE': 'Palette',
        'UNIT': 'Unit',
        'COMBO': 'Combo'
    },
    ORDER_TYPE: {
        'NEW_ORDER': 'New Order',
        'EXCHANGE_ORDER': 'Exchange Order',
        'RETURN_ORDER': 'Return Order',
        'RETURN_STOCK': 'Return Stock'
    },
    AWB_STATUS: {
        PENDING: 'PENDING',
        DISPATCHED: 'DISPATCHED',
        IN_TRANSIT: 'IN_TRANSIT',
        DELIVERED: 'DELIVERED',
        RECEIVED: 'RECEIVED',
    },
    AWB_STATUS_TEXT: {
        PENDING: 'Pending',
        DISPATCHED: 'Dispatched',
        IN_TRANSIT: 'In Transit',
        DELIVERED: 'Delivered',
        RECEIVED: 'Received',
    },
    MANIFEST_STATUS_TEXT: {
        PENDING: 'Pending',
        DISPATCHED: 'Dispatched',
        IN_TRANSIT: 'In Transit',
        DELIVERED: 'Delivered',
        RECEIVED: 'Received',
        PARTIALLY_RECEIVED: 'Partially Received',
    },
    MANIFEST_STATUS: {
        PENDING: 'PENDING',
        DISPATCHED: 'DISPATCHED',
        IN_TRANSIT: 'IN_TRANSIT',
        DELIVERED: 'DELIVERED',
        RECEIVED: 'RECEIVED',
        PARTIALLY_RECEIVED: 'PARTIALLY_RECEIVED',
    },
    SKU_STATUS: {
        AVAILABLE: 'AVAILABLE',
        IN_TRANSIT: 'IN_TRANSIT',
        ON_HOLD: 'ON_HOLD',
        PACKED: 'PACKED',
        DESTROYED: 'DESTROYED',
        DELIVERED: 'DELIVERED',
        NOT_INTENDED: 'NOT_INTENDED',
    },
    SUPPORT_CONCERN : {
        'GENERAL': 'General',
        'ORDER_ISSUE': 'Order Issue',
        'INVENTORY_ISSUE': 'Inventory Issue'
    },
    TAX_TREATMENT_TEXT: {
        'TAXABLE': 'Taxable',
        'NON_TAXABLE' : 'Non Taxable',
        'OTHERS': 'Other'
    },
    PAYMENT_MODE_TEXT: {
        'PREPAID': 'Prepaid',
        'PAY_ON_DELIVERY': 'Pay On Delivery'
    },
    PAYMENT_MODE: {
        'PREPAID': 'PREPAID',
        'PAY_ON_DELIVERY': 'PAY_ON_DELIVERY'
    },
    // SALE_ORDER_CALLING_STATUS: {
    //     REATTEMPT: 'REATTEMPT',
    //     CONFIRMED: 'CONFIRMED',
    //     CANCEL_ORDER: 'CANCEL_ORDER',
    //     NO_RESPONSE: 'NO_RESPONSE',
    // },
    LOG_ENABLED: true,
    WARNING_ENABLED: true,
    ERROR_ENABLED: true
};
