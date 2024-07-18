import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";
// import { serviceGetList } from "../../../../../../services/index.services";
import SnackbarUtils from "../../../../../../libs/SnackbarUtils";
import { serviceAddEmployeeShift } from "../../../../../../services/Shifts.service";
import { useParams } from "react-router";
import { serviceGetListData } from "../../../../../../services/index.services";
import { serviceGetList } from "../../../../../../services/Common.service";
const employeStaticData ={
  "EMPLOYEES": [
      {
          "name": "avcdd",
          "label": "avcdd (1)",
          "code": "1",
          "id": "64974e15e5e3b3c648d6a477",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1687637525384_KS_logo.png",
          "status": "ACTIVE"
      },
      {
          "name": "avcdd",
          "label": "avcdd (2)",
          "code": "2",
          "id": "64981566e5e3b3c648d6a4a1",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1687688549574_employee_performance.png",
          "status": "ACTIVE"
      },
      {
          "name": "tester 332",
          "label": "tester 332 (21)",
          "code": "21",
          "id": "64f6d3d7c1115ecaeffbea0c",
          "location_id": "64f57dfe9b089f290e45d68b",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar sonarpura",
              "name_hi": "क्षीर सागर सोनारपुरा",
              "code": "KS/SR/06",
              "type": "SHOWROOM",
              "address": "ksheer sagar sonarpura, b-15/45, sonarpura road, sonarpura, tilbhandeshwer, bhelupur, varanasi, uttar pradesh 221001",
              "city": "Bhelupur, Varanasi",
              "contact": "0720704666",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f57dfe9b089f290e45d68b"
          },
          "role": {
              "name": "showroom manager",
              "code": "SHOWROOM_MANAGER",
              "id": "64f6cf4d38fe1656b5cfa8eb"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "kS user",
          "label": "kS user (32)",
          "code": "32",
          "id": "64f6b17ce6b025f84fc94179",
          "location_id": "64f57dfe9b089f290e45d68b",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar sonarpura",
              "name_hi": "क्षीर सागर सोनारपुरा",
              "code": "KS/SR/06",
              "type": "SHOWROOM",
              "address": "ksheer sagar sonarpura, b-15/45, sonarpura road, sonarpura, tilbhandeshwer, bhelupur, varanasi, uttar pradesh 221001",
              "city": "Bhelupur, Varanasi",
              "contact": "0720704666",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f57dfe9b089f290e45d68b"
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1693893273596_login_bg.png",
          "status": "ACTIVE"
      },
      {
          "name": "AkshitTest",
          "label": "AkshitTest (111)",
          "code": "111",
          "id": "667573d5d6b43b68c1536736",
          "location_id": "665829fddbae3560649e3004",
          "department_id": "6650205529bedd09676287b4",
          "external_emp_code": "QQQ",
          "department": {
              "name": "accountanttt",
              "code": "ACC2",
              "id": "6650205529bedd09676287b4"
          },
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "accountant",
              "code": "ACCOUNTANT",
              "id": "65fa83ca79acd1b808ff868c"
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1718973395191_scaled_10d73dbe-5b2c-4b60-8f0a-b34a340c75ef2150854336213426135.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "pin testing",
          "label": "pin testing (748)",
          "code": "748",
          "id": "64da230e4b7da7c3ddcc80df",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1692017422105_ic_up_arrow.png",
          "status": "ACTIVE"
      },
      {
          "name": "d2",
          "label": "d2 (1234)",
          "code": "1234",
          "id": "653671c9872cdd882ef28ae5",
          "location_id": "64f575de9b089f290e45d4c7",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar sundarpur",
              "name_hi": "क्षीर सागर सुंदरपुर",
              "code": "KS/SR/04",
              "type": "FACTORY",
              "address": "n 8/239, lane number 2, newada, varanasi, uttar pradesh 221005",
              "city": "Newada, Varanasi",
              "contact": "0542237168",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f575de9b089f290e45d4c7"
          },
          "role": {
              "name": "factory",
              "code": "FACTORY",
              "id": "64fee745b2ea36c1b9476af2"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "dataValue",
          "label": "dataValue (3232)",
          "code": "3232",
          "id": "64aa5a86778f48543c370e48",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "ars",
          "label": "ars (12332)",
          "code": "12332",
          "id": "665838bbcf4407768bc7d55a",
          "location_id": "64f57cf29b089f290e45d64d",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar lahartara",
              "name_hi": "क्षीर सागर लहरतारा",
              "code": "KS/SR/05",
              "type": "SHOWROOM",
              "address": "varanasi movies, golghar, bazardiha, maheshpur, varanasi, uttar pradesh 221006",
              "city": "Lahartara Boulia, Varanasi",
              "contact": "0542237168",
              "landline_number": null,
              "fssai_number": "287438274",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f57cf29b089f290e45d64d"
          },
          "role": {
              "name": "security head",
              "code": "SECURITY_HEAD",
              "id": "65fa83ac79acd1b808ff8686"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Sandeep",
          "label": "Sandeep (123123)",
          "code": "123123",
          "id": "655b20c4d3e661911a860974",
          "location_id": "64f571a79b089f290e45d3f4",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar sigra",
              "name_hi": "क्षीर सागर सिगरा",
              "code": "KS/SR/01",
              "type": "FACTORY",
              "address": "ksheer sagar sigra, 12a, d-58, 2, sigra, varanasi, uttar pradesh 221010",
              "city": "Sigra, Varanasi",
              "contact": "0542240777",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f571a79b089f290e45d3f4"
          },
          "role": {
              "name": "factory",
              "code": "FACTORY",
              "id": "64fee745b2ea36c1b9476af2"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "wqerqwr",
          "label": "wqerqwr (543534)",
          "code": "543534",
          "id": "66432b0bc46e6e8253fbdbf6",
          "location_id": "660bb1d18607b69cab207798",
          "department_id": "660bb1f88607b69cab2077a5",
          "external_emp_code": "SDFSDF",
          "department": {
              "name": "dept ss",
              "code": "SS2",
              "id": "660bb1f88607b69cab2077a5"
          },
          "location": {
              "name": "ksheer sagar harsi",
              "name_hi": "क्षीर सागर हारसी",
              "code": "KS004",
              "type": "SHOWROOM",
              "address": "ks kangra",
              "city": "KANGRA",
              "contact": "",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "660bb1d18607b69cab207798"
          },
          "role": {
              "name": "tester12",
              "code": "TESTER12",
              "id": "6606507c3a3ef7eb6df409ea"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Hiramani Devi",
          "label": "Hiramani Devi (KI0096)",
          "code": "KI0096",
          "id": "65fd6c55862d456c374c1cc6",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "female helper",
              "code": "FEMALE_HELPER",
              "id": "65fa82df79acd1b808ff8646"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Raj",
          "label": "Raj (EMP/133)",
          "code": "EMP/133",
          "id": "64f58e329b089f290e45d845",
          "location_id": "64f5840f9b089f290e45d703",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar punjab",
              "name_hi": "क्षीर सागर पंजाब",
              "code": "KS/PN/09",
              "type": "FACTORY",
              "address": "kharar, punjab",
              "city": "Punjab",
              "contact": "8894228604",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f5840f9b089f290e45d703"
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Dinesh Kumar Yadav",
          "label": "Dinesh Kumar Yadav (KA0084)",
          "code": "KA0084",
          "id": "65fd6c55862d456c374c1c83",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "head chef",
              "code": "HEAD_CHEF",
              "id": "65fa850f79acd1b808ff8706"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Sudesh Sharma",
          "label": "Sudesh Sharma (EMP/1201)",
          "code": "EMP/1201",
          "id": "6458b92d8c8b4d16b048fdc0",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1683536173721_demoim.jfif",
          "status": "ACTIVE"
      },
      {
          "name": "Ishant",
          "label": "Ishant (EMP/1222)",
          "code": "EMP/1222",
          "id": "6458c3a28c8b4d16b048fe17",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1683538850722_demoim.jfif",
          "status": "ACTIVE"
      },
      {
          "name": "Pankaj Kumar ",
          "label": "Pankaj Kumar  (EMP/245)",
          "code": "EMP/245",
          "id": "645a3cc7231ee5ed1c94b0eb",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1683635399537_new.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Aryan",
          "label": "Aryan (EMP/622)",
          "code": "EMP/622",
          "id": "646b582c215356bb0b9a316c",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Kaushal",
          "label": "Kaushal (CH0024)",
          "code": "CH0024",
          "id": "65fd6c54862d456c374c1b16",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "SANJAY JAISWAL",
          "label": "SANJAY JAISWAL (SA0178)",
          "code": "SA0178",
          "id": "65fd6c57862d456c374c1eae",
          "location_id": "665829fddbae3560649e3004",
          "department_id": "66506c9884a4f3490b8eaade",
          "external_emp_code": "N/A",
          "department": {
              "name": "software department",
              "code": "SD0012",
              "id": "66506c9884a4f3490b8eaade"
          },
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "ttt",
          "label": "ttt (EMP/777)",
          "code": "EMP/777",
          "id": "667026587f85315b748a987c",
          "location_id": "665829fddbae3560649e3004",
          "department_id": "6650205529bedd09676287b4",
          "external_emp_code": "N/A",
          "department": {
              "name": "accountanttt",
              "code": "ACC2",
              "id": "6650205529bedd09676287b4"
          },
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "showroom manager",
              "code": "SHOWROOM_MANAGER",
              "id": "64f6cf4d38fe1656b5cfa8eb"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "John Stones 123",
          "label": "John Stones 123 (EMP/S123)",
          "code": "EMP/S123",
          "id": "661612c62026ea492fe6337a",
          "location_id": "660fb2a7e0844f1a481f80e2",
          "department_id": "660bb1f88607b69cab2077a5",
          "external_emp_code": "EMP/S",
          "department": {
              "name": "dept ss",
              "code": "SS2",
              "id": "660bb1f88607b69cab2077a5"
          },
          "location": {
              "name": "ksheer sagar solan",
              "name_hi": "क्षीर सागर सोलन",
              "code": "HP14",
              "type": "SHOWROOM",
              "address": "solan, himachal pradesh, india",
              "city": "Solan",
              "contact": "8219105056",
              "landline_number": "01792221322",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "660fb2a7e0844f1a481f80e2"
          },
          "role": {
              "name": "showroom manager",
              "code": "SHOWROOM_MANAGER",
              "id": "64f6cf4d38fe1656b5cfa8eb"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Rajvir",
          "label": "Rajvir (EMP/116)",
          "code": "EMP/116",
          "id": "64fed83eb2ea36c1b947698d",
          "location_id": "64feca88b2ea36c1b947678a",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar ludhiana",
              "name_hi": "क्षीर सागर लुधियाना",
              "code": "KS/321",
              "type": "FACTORY",
              "address": "ludhiana road, friends colony, moga, punjab, india",
              "city": "Ludhiana",
              "contact": "9805640126",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64feca88b2ea36c1b947678a"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Harish kumar",
          "label": "Harish kumar (EMP/051)",
          "code": "EMP/051",
          "id": "65794a2ce888ccb57704afc9",
          "location_id": "64f571a79b089f290e45d3f4",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar sigra",
              "name_hi": "क्षीर सागर सिगरा",
              "code": "KS/SR/01",
              "type": "FACTORY",
              "address": "ksheer sagar sigra, 12a, d-58, 2, sigra, varanasi, uttar pradesh 221010",
              "city": "Sigra, Varanasi",
              "contact": "0542240777",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f571a79b089f290e45d3f4"
          },
          "role": {
              "name": "owner",
              "code": "OWNER",
              "id": "64f6cec538fe1656b5cfa8e8"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Harish",
          "label": "Harish (EMP/330)",
          "code": "EMP/330",
          "id": "64b8d12a778f48543c373acc",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Jagdish Mourya",
          "label": "Jagdish Mourya (EMP33)",
          "code": "EMP33",
          "id": "664f17445ecfe7e8051fcfe3",
          "location_id": "661f615b0c3f7e02a4fa9805",
          "department_id": "664af1d218c5ba6e7dfc9538",
          "external_emp_code": "EMP331",
          "department": {
              "name": "sweet dept",
              "code": "121",
              "id": "664af1d218c5ba6e7dfc9538"
          },
          "location": {
              "name": "warehouse",
              "name_hi": "Warehouse",
              "code": "LKT66",
              "type": "WAREHOUSE",
              "address": "plot no 3",
              "city": "CHDD",
              "contact": "8989898988",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "661f615b0c3f7e02a4fa9805"
          },
          "role": {
              "name": "showroom manager",
              "code": "SHOWROOM_MANAGER",
              "id": "64f6cf4d38fe1656b5cfa8eb"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Phool Chand Yadav",
          "label": "Phool Chand Yadav (CH0028)",
          "code": "CH0028",
          "id": "65fd6c54862d456c374c1b32",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "head chef",
              "code": "HEAD_CHEF",
              "id": "65fa850f79acd1b808ff8706"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Lal Chand",
          "label": "Lal Chand (BS0010)",
          "code": "BS0010",
          "id": "65fd6c53862d456c374c1ac7",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Test boyy",
          "label": "Test boyy (GIGV36000)",
          "code": "GIGV36000",
          "id": "657ef3442752fc2152930fbb",
          "location_id": "6502ad3506130476176bf106",
          "external_emp_code": "DDD",
          "department": {},
          "location": {
              "name": "ksheer sagar palampur",
              "name_hi": "क्षीर सागर पालमपुर",
              "code": "KS/PL/21",
              "type": "SHOWROOM",
              "address": "palampur, himachal pradesh, india",
              "city": "Palampur",
              "contact": "9805670126",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "6502ad3506130476176bf106"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shantnu",
          "label": "Shantnu (EMP/322222)",
          "code": "EMP/322222",
          "id": "64a2a981385afd26c33e705b",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "sandeep",
          "label": "sandeep (EMP/12311)",
          "code": "EMP/12311",
          "id": "66712080b37960a1050ee8c6",
          "location_id": "64f5835c9b089f290e45d6f6",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar delhi",
              "name_hi": "क्षीर सागर दिल्ली",
              "code": "KS/DL/08",
              "type": "SHOWROOM",
              "address": "connaught place, new delhi, delhi",
              "city": "Delhi",
              "contact": "9809562123",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f5835c9b089f290e45d6f6"
          },
          "role": {
              "name": "owner",
              "code": "OWNER",
              "id": "64f6cec538fe1656b5cfa8e8"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Haushila Yadav",
          "label": "Haushila Yadav (KA0086)",
          "code": "KA0086",
          "id": "65fd6c55862d456c374c1c8e",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Ajay Yadav",
          "label": "Ajay Yadav (LO0107)",
          "code": "LO0107",
          "id": "65fd6c55862d456c374c1d08",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "SONU YADAV",
          "label": "SONU YADAV (SA0156)",
          "code": "SA0156",
          "id": "65fd6c56862d456c374c1e2e",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "ABHISHEK CHOURASIA",
          "label": "ABHISHEK CHOURASIA (SA0168)",
          "code": "SA0168",
          "id": "65fd6c56862d456c374c1e76",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Sahil",
          "label": "Sahil (EMP/132)",
          "code": "EMP/132",
          "id": "64f58d8b9b089f290e45d802",
          "location_id": "64f5835c9b089f290e45d6f6",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar delhi",
              "name_hi": "क्षीर सागर दिल्ली",
              "code": "KS/DL/08",
              "type": "SHOWROOM",
              "address": "connaught place, new delhi, delhi",
              "city": "Delhi",
              "contact": "9809562123",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f5835c9b089f290e45d6f6"
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Swati",
          "label": "Swati (EMP516)",
          "code": "EMP516",
          "id": "6658854bf23a92946713a7fd",
          "location_id": "665829fddbae3560649e3004",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "KARAN KHALWAR",
          "label": "KARAN KHALWAR (SA0194)",
          "code": "SA0194",
          "id": "65fd6c57862d456c374c1f07",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "SATISH UPADHYAY",
          "label": "SATISH UPADHYAY (SA0169)",
          "code": "SA0169",
          "id": "65fd6c56862d456c374c1e78",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Madhu Devi",
          "label": "Madhu Devi (CH0027)",
          "code": "CH0027",
          "id": "65fd6c54862d456c374c1b2c",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "female helper",
              "code": "FEMALE_HELPER",
              "id": "65fa82df79acd1b808ff8646"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Anruddha Kumar Singh",
          "label": "Anruddha Kumar Singh (GA0077)",
          "code": "GA0077",
          "id": "65fd6c55862d456c374c1c58",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "guard",
              "code": "GUARD",
              "id": "65fa835579acd1b808ff867d"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "manish",
          "label": "manish (INV0033)",
          "code": "INV0033",
          "id": "661dffd70c3f7e02a4fa8b26",
          "location_id": "65fad482141d532b7effa82d",
          "department_id": "65fd2d01141d532b7effafe7",
          "external_emp_code": "RF33561",
          "department": {
              "name": "ko",
              "code": "KO",
              "id": "65fd2d01141d532b7effafe7"
          },
          "location": {
              "name": "ksheer sagar chitaipur",
              "name_hi": "Ksheer Sagar Chitaipur",
              "code": "KS02",
              "type": "SHOWROOM",
              "address": "chitaipur , varanasi",
              "city": "varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad482141d532b7effa82d"
          },
          "role": {
              "name": "testing 123",
              "code": "TESTING_123",
              "id": "660650b33a3ef7eb6df409fa"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shantnu",
          "label": "Shantnu (EMP/0055777)",
          "code": "EMP/0055777",
          "id": "657019fe4dac489780d00f63",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "ALOK KUMAR",
          "label": "ALOK KUMAR (SA0140)",
          "code": "SA0140",
          "id": "65fd6c56862d456c374c1dce",
          "location_id": "65fad482141d532b7effa82d",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chitaipur",
              "name_hi": "Ksheer Sagar Chitaipur",
              "code": "KS02",
              "type": "SHOWROOM",
              "address": "chitaipur , varanasi",
              "city": "varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad482141d532b7effa82d"
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "VIKASH SINGH",
          "label": "VIKASH SINGH (CA0135)",
          "code": "CA0135",
          "id": "65fd6c56862d456c374c1db0",
          "location_id": "65fad482141d532b7effa82d",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chitaipur",
              "name_hi": "Ksheer Sagar Chitaipur",
              "code": "KS02",
              "type": "SHOWROOM",
              "address": "chitaipur , varanasi",
              "city": "varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad482141d532b7effa82d"
          },
          "role": {
              "name": "cashier",
              "code": "CASHIER",
              "id": "65facd86141d532b7effa803"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Rahul",
          "label": "Rahul (EMP/0121111)",
          "code": "EMP/0121111",
          "id": "6453524b8b4a64666cfddb5c",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1683183480998_45.png",
          "status": "ACTIVE"
      },
      {
          "name": "Arvind",
          "label": "Arvind (EMP/590)",
          "code": "EMP/590",
          "id": "6459df572b3289d121ec6bf0",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1683611930544_new.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Gautam Yadav",
          "label": "Gautam Yadav (CK0037)",
          "code": "CK0037",
          "id": "65fd6c54862d456c374c1b60",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "head chef",
              "code": "HEAD_CHEF",
              "id": "65fa850f79acd1b808ff8706"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Roshan Kumar H K",
          "label": "Roshan Kumar H K (AD0127)",
          "code": "AD0127",
          "id": "65fd6c56862d456c374c1d84",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Aniruddha Sharma",
          "label": "Aniruddha Sharma (PA0076)",
          "code": "PA0076",
          "id": "65fd6c55862d456c374c1c52",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "shivam",
          "label": "shivam (QWDEWQ343434)",
          "code": "QWDEWQ343434",
          "id": "66756a39d6b43b68c1536517",
          "location_id": "66558c8557b3928ec42d2781",
          "department_id": "666b1ee67efe9e445aa3902a",
          "external_emp_code": "XCSC23223",
          "department": {
              "name": "deeed",
              "code": "DE",
              "id": "666b1ee67efe9e445aa3902a"
          },
          "location": {
              "name": "location delhi",
              "name_hi": "location delhi",
              "code": "LD001",
              "type": "FACTORY",
              "address": "shop no.146/2, behind hotel royal plaza, v.p.o, mrw6+9w8, gali number 12, dariya reserved forest, daria, chandigarh, 160101, india",
              "city": "DELHI",
              "contact": "",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "66558c8557b3928ec42d2781"
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Arbind kumar",
          "label": "Arbind kumar (EMP/117)",
          "code": "EMP/117",
          "id": "64fedacfb2ea36c1b9476a33",
          "location_id": "64f5835c9b089f290e45d6f6",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar delhi",
              "name_hi": "क्षीर सागर दिल्ली",
              "code": "KS/DL/08",
              "type": "SHOWROOM",
              "address": "connaught place, new delhi, delhi",
              "city": "Delhi",
              "contact": "9809562123",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f5835c9b089f290e45d6f6"
          },
          "role": {
              "name": "showroom manager",
              "code": "SHOWROOM_MANAGER",
              "id": "64f6cf4d38fe1656b5cfa8eb"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "AJEET YADAV",
          "label": "AJEET YADAV (SA0192)",
          "code": "SA0192",
          "id": "65fd6c57862d456c374c1f02",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "cashier",
              "code": "CASHIER",
              "id": "65facd86141d532b7effa803"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Vrhastpati Tanti",
          "label": "Vrhastpati Tanti (DG0047)",
          "code": "DG0047",
          "id": "65fd6c54862d456c374c1ba0",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "head chef",
              "code": "HEAD_CHEF",
              "id": "65fa850f79acd1b808ff8706"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Jakir Hussain",
          "label": "Jakir Hussain (KS03)",
          "code": "KS03",
          "id": "665ffe4c0f85a3c6add010b1",
          "location_id": "66558c8557b3928ec42d2781",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "location delhi",
              "name_hi": "location delhi",
              "code": "LD001",
              "type": "FACTORY",
              "address": "shop no.146/2, behind hotel royal plaza, v.p.o, mrw6+9w8, gali number 12, dariya reserved forest, daria, chandigarh, 160101, india",
              "city": "DELHI",
              "contact": "",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "66558c8557b3928ec42d2781"
          },
          "role": {
              "name": "manager role",
              "code": "MANAGER_ROLE",
              "id": "665421a1e335f634a958d4a8"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Atul",
          "label": "Atul (EMP/595)",
          "code": "EMP/595",
          "id": "645a03d42b3289d121ec6d02",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1683620820046_new.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Madhuri Devi",
          "label": "Madhuri Devi (KA0087)",
          "code": "KA0087",
          "id": "65fd6c55862d456c374c1c94",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "female helper",
              "code": "FEMALE_HELPER",
              "id": "65fa82df79acd1b808ff8646"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Ratan Kumar Day",
          "label": "Ratan Kumar Day (DR0051)",
          "code": "DR0051",
          "id": "65fd6c54862d456c374c1bbc",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "driver",
              "code": "DRIVER",
              "id": "65fa833779acd1b808ff867a"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Test 4",
          "label": "Test 4 (EMP/1998)",
          "code": "EMP/1998",
          "id": "659547d01bec0ec7dcdcad3e",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Sahil",
          "label": "Sahil (EMP/41)",
          "code": "EMP/41",
          "id": "64534604e146120ada31dffe",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "GAURAV YADAV",
          "label": "GAURAV YADAV (SA0185)",
          "code": "SA0185",
          "id": "65fd6c57862d456c374c1edd",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Harikesh Yadav",
          "label": "Harikesh Yadav (KA0085)",
          "code": "KA0085",
          "id": "65fd6c55862d456c374c1c88",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "head chef",
              "code": "HEAD_CHEF",
              "id": "65fa850f79acd1b808ff8706"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Kaju Devi",
          "label": "Kaju Devi (KI0097)",
          "code": "KI0097",
          "id": "65fd6c55862d456c374c1ccc",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "female helper",
              "code": "FEMALE_HELPER",
              "id": "65fa82df79acd1b808ff8646"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shantnu",
          "label": "Shantnu (EMP/005)",
          "code": "EMP/005",
          "id": "645b6825fd0712fff1b2bc7d",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "ASHISH KUMAR BARANWAL",
          "label": "ASHISH KUMAR BARANWAL (SA0136)",
          "code": "SA0136",
          "id": "65fd6c56862d456c374c1db6",
          "location_id": "65fad482141d532b7effa82d",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chitaipur",
              "name_hi": "Ksheer Sagar Chitaipur",
              "code": "KS02",
              "type": "SHOWROOM",
              "address": "chitaipur , varanasi",
              "city": "varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad482141d532b7effa82d"
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Keshav",
          "label": "Keshav (EMP/099)",
          "code": "EMP/099",
          "id": "645358468b4a64666cfddb6f",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1683183677214_IMG_20210315_091959.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "KESHAV kUMAR",
          "label": "KESHAV kUMAR (EMP/335)",
          "code": "EMP/335",
          "id": "652f7cde13342aa7f0e3729b",
          "location_id": "651f9bf94ea5b67386932533",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar jaisinghpur",
              "name_hi": "Ksheer sagar Jaisinghpur",
              "code": "LC/098",
              "type": "SHOWROOM",
              "address": "jaisinghpur, himachal pradesh, india",
              "city": "Jaisinghpur",
              "contact": "9898989898",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "651f9bf94ea5b67386932533"
          },
          "role": {
              "name": "showroom manager",
              "code": "SHOWROOM_MANAGER",
              "id": "64f6cf4d38fe1656b5cfa8eb"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Reeta Devi",
          "label": "Reeta Devi (MA0058)",
          "code": "MA0058",
          "id": "65fd6c54862d456c374c1be6",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "female helper",
              "code": "FEMALE_HELPER",
              "id": "65fa82df79acd1b808ff8646"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Harish",
          "label": "Harish (EMP515)",
          "code": "EMP515",
          "id": "665884e5f23a92946713a7ee",
          "location_id": "665829fddbae3560649e3004",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "factory",
              "code": "FACTORY",
              "id": "64fee745b2ea36c1b9476af2"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Rajesh",
          "label": "Rajesh (EMP/111)",
          "code": "EMP/111",
          "id": "64fed384b2ea36c1b94768ac",
          "location_id": "64f57cf29b089f290e45d64d",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar lahartara",
              "name_hi": "क्षीर सागर लहरतारा",
              "code": "KS/SR/05",
              "type": "SHOWROOM",
              "address": "varanasi movies, golghar, bazardiha, maheshpur, varanasi, uttar pradesh 221006",
              "city": "Lahartara Boulia, Varanasi",
              "contact": "0542237168",
              "landline_number": null,
              "fssai_number": "287438274",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f57cf29b089f290e45d64d"
          },
          "role": {
              "name": "owner",
              "code": "OWNER",
              "id": "64f6cec538fe1656b5cfa8e8"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Test 5",
          "label": "Test 5 (EMP/2998)",
          "code": "EMP/2998",
          "id": "659548a81bec0ec7dcdcad43",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "showroom manager",
              "code": "SHOWROOM_MANAGER",
              "id": "64f6cf4d38fe1656b5cfa8eb"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Urmila",
          "label": "Urmila (MA0062)",
          "code": "MA0062",
          "id": "65fd6c54862d456c374c1bfe",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "female helper",
              "code": "FEMALE_HELPER",
              "id": "65fa82df79acd1b808ff8646"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Jitendra Yadav",
          "label": "Jitendra Yadav (AD0121)",
          "code": "AD0121",
          "id": "65fd6c56862d456c374c1d60",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Faruk Ali",
          "label": "Faruk Ali (CH0020)",
          "code": "CH0020",
          "id": "65fd6c54862d456c374c1b03",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Sarveen",
          "label": "Sarveen (EMP/808)",
          "code": "EMP/808",
          "id": "645b30f9fd0712fff1b2baef",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1683697912979_demoim.jfif",
          "status": "ACTIVE"
      },
      {
          "name": "Rajiv Yadav",
          "label": "Rajiv Yadav (CK0039)",
          "code": "CK0039",
          "id": "65fd6c54862d456c374c1b6c",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Raman Kumar",
          "label": "Raman Kumar (EMP/110)",
          "code": "EMP/110",
          "id": "64f95050b2ea36c1b9475882",
          "location_id": "64f57cf29b089f290e45d64d",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar lahartara",
              "name_hi": "क्षीर सागर लहरतारा",
              "code": "KS/SR/05",
              "type": "SHOWROOM",
              "address": "varanasi movies, golghar, bazardiha, maheshpur, varanasi, uttar pradesh 221006",
              "city": "Lahartara Boulia, Varanasi",
              "contact": "0542237168",
              "landline_number": null,
              "fssai_number": "287438274",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f57cf29b089f290e45d64d"
          },
          "role": {
              "name": "showroom manager",
              "code": "SHOWROOM_MANAGER",
              "id": "64f6cf4d38fe1656b5cfa8eb"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Anand",
          "label": "Anand (KA0082)",
          "code": "KA0082",
          "id": "65fd6c55862d456c374c1c72",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shantnu",
          "label": "Shantnu (EMP/322222221)",
          "code": "EMP/322222221",
          "id": "64a2a9c3385afd26c33e7066",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Charanjeet",
          "label": "Charanjeet (EMP513)",
          "code": "EMP513",
          "id": "6658843ff23a92946713a7d3",
          "location_id": "665829fddbae3560649e3004",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1717126974274_scaled_1000052171.png",
          "status": "ACTIVE"
      },
      {
          "name": "Vaibhav sood",
          "label": "Vaibhav sood (EMP/211)",
          "code": "EMP/211",
          "id": "651e47e0c6cc7b090e7435c7",
          "location_id": "64fedd3cb2ea36c1b9476ab4",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar hamirpur",
              "name_hi": "क्षीर सागर हमीरपुर",
              "code": "HM/03",
              "type": "SHOWROOM",
              "address": "anu, hamirpur, himachal pradesh, india",
              "city": "Hamirpur",
              "contact": "9876543456",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64fedd3cb2ea36c1b9476ab4"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "rakesh",
          "label": "rakesh (EU3390)",
          "code": "EU3390",
          "id": "661d17890c3f7e02a4fa8370",
          "location_id": "65682d50033c4e8edd634b5f",
          "external_emp_code": "EU3444",
          "department": {},
          "location": {
              "name": "1sand",
              "name_hi": "12Snd",
              "code": "12LOC",
              "type": "WAREHOUSE",
              "address": "pv5p+fph, sector 32, birghaghar, haryana 134109, india",
              "city": "12lo",
              "contact": "8887756098",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65682d50033c4e8edd634b5f"
          },
          "role": {
              "name": "testing 123",
              "code": "TESTING_123",
              "id": "660650b33a3ef7eb6df409fa"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Atul",
          "label": "Atul (EMP666)",
          "code": "EMP666",
          "id": "661e38b10c3f7e02a4fa8da0",
          "location_id": "661f61370c3f7e02a4fa97fe",
          "department_id": "660bb1f88607b69cab2077a5",
          "external_emp_code": "EXTEE",
          "department": {
              "name": "dept ss",
              "code": "SS2",
              "id": "660bb1f88607b69cab2077a5"
          },
          "location": {
              "name": "factory",
              "name_hi": "Factory",
              "code": "DFC3",
              "type": "FACTORY",
              "address": "plot no 2",
              "city": "CHD",
              "contact": "9898989898",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "661f61370c3f7e02a4fa97fe"
          },
          "role": {
              "name": "showroom manager",
              "code": "SHOWROOM_MANAGER",
              "id": "64f6cf4d38fe1656b5cfa8eb"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "MOHIT PATEL",
          "label": "MOHIT PATEL (CA0176)",
          "code": "CA0176",
          "id": "65fd6c57862d456c374c1ea6",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "cashier",
              "code": "CASHIER",
              "id": "65facd86141d532b7effa803"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Sixteen November",
          "label": "Sixteen November (EMP1611)",
          "code": "EMP1611",
          "id": "6555efc5d3e661911a85f36f",
          "location_id": "64f581069b089f290e45d6c6",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandigarh",
              "name_hi": "क्षीर सागर चंडीगढ़",
              "code": "KS/CH/06",
              "type": "FACTORY",
              "address": "sector 34, chandigarh",
              "city": "Chandigarh",
              "contact": "8899889988",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f581069b089f290e45d6c6"
          },
          "role": {
              "name": "factory",
              "code": "FACTORY",
              "id": "64fee745b2ea36c1b9476af2"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shantnu",
          "label": "Shantnu (EMP/322211)",
          "code": "EMP/322211",
          "id": "64a2a9d2385afd26c33e7069",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Ravindra Kumar Patel",
          "label": "Ravindra Kumar Patel (DR0052)",
          "code": "DR0052",
          "id": "65fd6c54862d456c374c1bc2",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "driver",
              "code": "DRIVER",
              "id": "65fa833779acd1b808ff867a"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Prince kumar",
          "label": "Prince kumar (EM/3)",
          "code": "EM/3",
          "id": "645b58affd0712fff1b2bbd4",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1683708078791_demoim.jfif",
          "status": "ACTIVE"
      },
      {
          "name": "Shantnu",
          "label": "Shantnu (EMP/32222)",
          "code": "EMP/32222",
          "id": "64a2a966385afd26c33e7058",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Pradyumn",
          "label": "Pradyumn (KA0090)",
          "code": "KA0090",
          "id": "65fd6c55862d456c374c1ca6",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "NEERAJ PATEL",
          "label": "NEERAJ PATEL (SA0161)",
          "code": "SA0161",
          "id": "65fd6c56862d456c374c1e4e",
          "location_id": "66542aac49e27a36406d164a",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar tripura",
              "name_hi": "क्षीर साग",
              "code": "TRI002",
              "type": "FACTORY",
              "address": "pr47+jh chandigarh, india",
              "city": "TRIPURA",
              "contact": "9066555554",
              "landline_number": "8908908908",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "66542aac49e27a36406d164a"
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "RAKHI SHAHNI",
          "label": "RAKHI SHAHNI (CA0162)",
          "code": "CA0162",
          "id": "65fd6c56862d456c374c1e4d",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "cashier",
              "code": "CASHIER",
              "id": "65facd86141d532b7effa803"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Rahul",
          "label": "Rahul (EMP/136)",
          "code": "EMP/136",
          "id": "65019e3406130476176bea15",
          "location_id": "64feca88b2ea36c1b947678a",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar ludhiana",
              "name_hi": "क्षीर सागर लुधियाना",
              "code": "KS/321",
              "type": "FACTORY",
              "address": "ludhiana road, friends colony, moga, punjab, india",
              "city": "Ludhiana",
              "contact": "9805640126",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64feca88b2ea36c1b947678a"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Prema Devi",
          "label": "Prema Devi (MA0057)",
          "code": "MA0057",
          "id": "65fd6c54862d456c374c1be0",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "female helper",
              "code": "FEMALE_HELPER",
              "id": "65fa82df79acd1b808ff8646"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Randiv singh",
          "label": "Randiv singh (EMP321)",
          "code": "EMP321",
          "id": "664eddbf5ecfe7e8051fc48a",
          "location_id": "661f61370c3f7e02a4fa97fe",
          "department_id": "664af1d218c5ba6e7dfc9538",
          "external_emp_code": "EMP32",
          "department": {
              "name": "sweet dept",
              "code": "121",
              "id": "664af1d218c5ba6e7dfc9538"
          },
          "location": {
              "name": "factory",
              "name_hi": "Factory",
              "code": "DFC3",
              "type": "FACTORY",
              "address": "plot no 2",
              "city": "CHD",
              "contact": "9898989898",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "661f61370c3f7e02a4fa97fe"
          },
          "role": {
              "name": "showroom manager",
              "code": "SHOWROOM_MANAGER",
              "id": "64f6cf4d38fe1656b5cfa8eb"
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1716444834546_speaker_im.jpeg",
          "status": "ACTIVE"
      },
      {
          "name": "Pankaj kumar choudhary ksjsksk",
          "label": "Pankaj kumar choudhary ksjsksk (EMP/11111111)",
          "code": "EMP/11111111",
          "id": "663dbeb4d50e68c9e77f4010",
          "location_id": "660fb2a7e0844f1a481f80e2",
          "department_id": "660bb1f88607b69cab2077a5",
          "external_emp_code": "EMP/555",
          "department": {
              "name": "dept ss",
              "code": "SS2",
              "id": "660bb1f88607b69cab2077a5"
          },
          "location": {
              "name": "ksheer sagar solan",
              "name_hi": "क्षीर सागर सोलन",
              "code": "HP14",
              "type": "SHOWROOM",
              "address": "solan, himachal pradesh, india",
              "city": "Solan",
              "contact": "8219105056",
              "landline_number": "01792221322",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "660fb2a7e0844f1a481f80e2"
          },
          "role": {
              "name": "showroom manager",
              "code": "SHOWROOM_MANAGER",
              "id": "64f6cf4d38fe1656b5cfa8eb"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Sandeep mahajan",
          "label": "Sandeep mahajan (EMP/321111)",
          "code": "EMP/321111",
          "id": "655b435cd3e661911a860b49",
          "location_id": "64feca88b2ea36c1b947678a",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar ludhiana",
              "name_hi": "क्षीर सागर लुधियाना",
              "code": "KS/321",
              "type": "FACTORY",
              "address": "ludhiana road, friends colony, moga, punjab, india",
              "city": "Ludhiana",
              "contact": "9805640126",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64feca88b2ea36c1b947678a"
          },
          "role": {
              "name": "showroom manager",
              "code": "SHOWROOM_MANAGER",
              "id": "64f6cf4d38fe1656b5cfa8eb"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "SANJAY KUMAR",
          "label": "SANJAY KUMAR (CA0166)",
          "code": "CA0166",
          "id": "65fd6c56862d456c374c1e6a",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "cashier",
              "code": "CASHIER",
              "id": "65facd86141d532b7effa803"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Harish",
          "label": "Harish (EMP/888)",
          "code": "EMP/888",
          "id": "664203beab296fdd1ff99ce7",
          "location_id": "661f615b0c3f7e02a4fa9805",
          "department_id": "660bb1f88607b69cab2077a5",
          "external_emp_code": "EMP88888",
          "department": {
              "name": "dept ss",
              "code": "SS2",
              "id": "660bb1f88607b69cab2077a5"
          },
          "location": {
              "name": "warehouse",
              "name_hi": "Warehouse",
              "code": "LKT66",
              "type": "WAREHOUSE",
              "address": "plot no 3",
              "city": "CHDD",
              "contact": "8989898988",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "661f615b0c3f7e02a4fa9805"
          },
          "role": {
              "name": "sd1234",
              "code": "SD1234",
              "id": "6603c03e18680ae083d548b0"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Saroj Das",
          "label": "Saroj Das (DG0046)",
          "code": "DG0046",
          "id": "65fd6c54862d456c374c1b9b",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "head chef",
              "code": "HEAD_CHEF",
              "id": "65fa850f79acd1b808ff8706"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Sunil",
          "label": "Sunil (LO0106)",
          "code": "LO0106",
          "id": "65fd6c55862d456c374c1d06",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Admin",
          "label": "Admin (EMP/001)",
          "code": "EMP/001",
          "id": "64440eb90b5bd42f84ae18f9",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Bhupendra Kumar Yadav",
          "label": "Bhupendra Kumar Yadav (AD0115)",
          "code": "AD0115",
          "id": "65fd6c55862d456c374c1d38",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "MUNNA",
          "label": "MUNNA (SA0187)",
          "code": "SA0187",
          "id": "65fd6c57862d456c374c1eec",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Harshita",
          "label": "Harshita (EMP508)",
          "code": "EMP508",
          "id": "66588233f23a92946713a790",
          "location_id": "665829fddbae3560649e3004",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Nirmala Devi",
          "label": "Nirmala Devi (KI0099)",
          "code": "KI0099",
          "id": "65fd6c55862d456c374c1cdc",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "female helper",
              "code": "FEMALE_HELPER",
              "id": "65fa82df79acd1b808ff8646"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Sabbun Devi",
          "label": "Sabbun Devi (CH0029)",
          "code": "CH0029",
          "id": "65fd6c54862d456c374c1b38",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "female helper",
              "code": "FEMALE_HELPER",
              "id": "65fa82df79acd1b808ff8646"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Kamlesh",
          "label": "Kamlesh (CH0023)",
          "code": "CH0023",
          "id": "65fd6c54862d456c374c1b10",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Sourabh Kumar Yadav",
          "label": "Sourabh Kumar Yadav (AD0131)",
          "code": "AD0131",
          "id": "65fd6c56862d456c374c1d9c",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Test name",
          "label": "Test name (EMP/0007)",
          "code": "EMP/0007",
          "id": "651fe8964ea5b67386932746",
          "location_id": "652632f34ea5b67386933bf8",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "test001",
              "name_hi": "TEST001",
              "code": "TEST/001",
              "type": "FACTORY",
              "address": "test001",
              "city": "TEST001",
              "contact": "9988224477",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "652632f34ea5b67386933bf8"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Himanshi",
          "label": "Himanshi (EMPH/21)",
          "code": "EMPH/21",
          "id": "66712151b37960a1050ee90c",
          "location_id": "665829fddbae3560649e3004",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Kumari Devi",
          "label": "Kumari Devi (KI0098)",
          "code": "KI0098",
          "id": "65fd6c55862d456c374c1cd7",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "female helper",
              "code": "FEMALE_HELPER",
              "id": "65fa82df79acd1b808ff8646"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "TESTT",
          "label": "TESTT (WSW)",
          "code": "WSW",
          "id": "66614334e33f1499e3eeea77",
          "location_id": "665050c484a4f3490b8e931a",
          "department_id": "664af1d218c5ba6e7dfc9538",
          "external_emp_code": "WSA",
          "department": {
              "name": "sweet dept",
              "code": "121",
              "id": "664af1d218c5ba6e7dfc9538"
          },
          "location": {
              "name": "ksheer sagar bengaluru",
              "name_hi": "क्षीर सागर बेंगलुरु",
              "code": "LB001",
              "type": "FACTORY",
              "address": "mvw2+gqf town park, sector 5, panchkula, haryana 134109, india",
              "city": "BENGALURU",
              "contact": "8894228601",
              "landline_number": "6767678989",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665050c484a4f3490b8e931a"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shantnu2233",
          "label": "Shantnu2233 (EMP/00599)",
          "code": "EMP/00599",
          "id": "655ddf1c05f163f6f815a606",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "test",
          "label": "test (YA002)",
          "code": "YA002",
          "id": "66700dab49d9e752cb030da1",
          "location_id": "665829fddbae3560649e3004",
          "department_id": "6650205529bedd09676287b4",
          "external_emp_code": "AD003",
          "department": {
              "name": "accountanttt",
              "code": "ACC2",
              "id": "6650205529bedd09676287b4"
          },
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "security head",
              "code": "SECURITY_HEAD",
              "id": "65fa83ac79acd1b808ff8686"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Rajan kumar",
          "label": "Rajan kumar (EMP/129)",
          "code": "EMP/129",
          "id": "65019ad506130476176be8c4",
          "location_id": "64f57cf29b089f290e45d64d",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar lahartara",
              "name_hi": "क्षीर सागर लहरतारा",
              "code": "KS/SR/05",
              "type": "SHOWROOM",
              "address": "varanasi movies, golghar, bazardiha, maheshpur, varanasi, uttar pradesh 221006",
              "city": "Lahartara Boulia, Varanasi",
              "contact": "0542237168",
              "landline_number": null,
              "fssai_number": "287438274",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f57cf29b089f290e45d64d"
          },
          "role": {
              "name": "hr",
              "code": "HR",
              "id": "6501954a06130476176be845"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Ram Prasad",
          "label": "Ram Prasad (PA0073)",
          "code": "PA0073",
          "id": "65fd6c55862d456c374c1c40",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Arshiya ",
          "label": "Arshiya  (EMP500)",
          "code": "EMP500",
          "id": "66587c5c1895df9309050991",
          "location_id": "665829fddbae3560649e3004",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Deepesh",
          "label": "Deepesh (EMP502)",
          "code": "EMP502",
          "id": "66587f4ff23a92946713a70a",
          "location_id": "665829fddbae3560649e3004",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Bechan Mourya",
          "label": "Bechan Mourya (AD0114)",
          "code": "AD0114",
          "id": "65fd6c55862d456c374c1d36",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Checking",
          "label": "Checking (EMP/090)",
          "code": "EMP/090",
          "id": "66711fe2b37960a1050ee868",
          "location_id": "665829fddbae3560649e3004",
          "department_id": "66506c9884a4f3490b8eaade",
          "external_emp_code": "EMP/099",
          "department": {
              "name": "software department",
              "code": "SD0012",
              "id": "66506c9884a4f3490b8eaade"
          },
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "owner",
              "code": "OWNER",
              "id": "64f6cec538fe1656b5cfa8e8"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "RAMESH SAHNI",
          "label": "RAMESH SAHNI (SA0177)",
          "code": "SA0177",
          "id": "65fd6c57862d456c374c1ea8",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shantnu",
          "label": "Shantnu (EMP/3222222)",
          "code": "EMP/3222222",
          "id": "64a2a99c385afd26c33e705e",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Pranav",
          "label": "Pranav (EMP001)",
          "code": "EMP001",
          "id": "64f436459b089f290e45d0f5",
          "location_id": "64f5840f9b089f290e45d703",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar punjab",
              "name_hi": "क्षीर सागर पंजाब",
              "code": "KS/PN/09",
              "type": "FACTORY",
              "address": "kharar, punjab",
              "city": "Punjab",
              "contact": "8894228604",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f5840f9b089f290e45d703"
          },
          "role": {
              "name": "owner",
              "code": "OWNER",
              "id": "64f6cec538fe1656b5cfa8e8"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Sahil",
          "label": "Sahil (EMP/141)",
          "code": "EMP/141",
          "id": "6501a3e406130476176beaf2",
          "location_id": "64fedd3cb2ea36c1b9476ab4",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar hamirpur",
              "name_hi": "क्षीर सागर हमीरपुर",
              "code": "HM/03",
              "type": "SHOWROOM",
              "address": "anu, hamirpur, himachal pradesh, india",
              "city": "Hamirpur",
              "contact": "9876543456",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64fedd3cb2ea36c1b9476ab4"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Pankaj",
          "label": "Pankaj (EMP514)",
          "code": "EMP514",
          "id": "66588488f23a92946713a7e0",
          "location_id": "665058ae84a4f3490b8e98cc",
          "department_id": "6650205529bedd09676287b4",
          "external_emp_code": "N/A",
          "department": {
              "name": "accountanttt",
              "code": "ACC2",
              "id": "6650205529bedd09676287b4"
          },
          "location": {
              "name": "ksheer sagar chennai",
              "name_hi": "Ksheer sagar Chennai",
              "code": "LC001",
              "type": "FACTORY",
              "address": "mvvv+mx chaunki, haryana, india",
              "city": "CHENNAI",
              "contact": "",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665058ae84a4f3490b8e98cc"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Ranjeet Rajbhar",
          "label": "Ranjeet Rajbhar (AD0125)",
          "code": "AD0125",
          "id": "65fd6c56862d456c374c1d78",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shantnu",
          "label": "Shantnu (EMP/005598)",
          "code": "EMP/005598",
          "id": "65a7858c258d9520c336637b",
          "location_id": null,
          "external_emp_code": "EMP/99888",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Test 7",
          "label": "Test 7 (EMP5190)",
          "code": "EMP5190",
          "id": "65954a7a1bec0ec7dcdcad53",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "owner",
              "code": "OWNER",
              "id": "64f6cec538fe1656b5cfa8e8"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Sachin",
          "label": "Sachin (EMP/112)",
          "code": "EMP/112",
          "id": "648813bc13358717ee78ad1c",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "SHIVAM SINGH",
          "label": "SHIVAM SINGH (SA0139)",
          "code": "SA0139",
          "id": "65fd6c56862d456c374c1dc9",
          "location_id": "65fad482141d532b7effa82d",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chitaipur",
              "name_hi": "Ksheer Sagar Chitaipur",
              "code": "KS02",
              "type": "SHOWROOM",
              "address": "chitaipur , varanasi",
              "city": "varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad482141d532b7effa82d"
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shivnath",
          "label": "Shivnath (KA0092)",
          "code": "KA0092",
          "id": "65fd6c55862d456c374c1cb2",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Bechan Sao",
          "label": "Bechan Sao (PA0070)",
          "code": "PA0070",
          "id": "65fd6c55862d456c374c1c2e",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Sourabh Yadav",
          "label": "Sourabh Yadav (AD0132)",
          "code": "AD0132",
          "id": "65fd6c56862d456c374c1da2",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shubham Sharma",
          "label": "Shubham Sharma (EMP/1401)",
          "code": "EMP/1401",
          "id": "6458b8668c8b4d16b048fdb8",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1683535974040_demoim.jfif",
          "status": "ACTIVE"
      },
      {
          "name": "Ritik",
          "label": "Ritik (EMP/135)",
          "code": "EMP/135",
          "id": "65019dc706130476176be9ee",
          "location_id": "64feca88b2ea36c1b947678a",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar ludhiana",
              "name_hi": "क्षीर सागर लुधियाना",
              "code": "KS/321",
              "type": "FACTORY",
              "address": "ludhiana road, friends colony, moga, punjab, india",
              "city": "Ludhiana",
              "contact": "9805640126",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64feca88b2ea36c1b947678a"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Tripti",
          "label": "Tripti (EMP507)",
          "code": "EMP507",
          "id": "665881acf23a92946713a782",
          "location_id": "665829fddbae3560649e3004",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "ShantnuK",
          "label": "ShantnuK (EMP/00557)",
          "code": "EMP/00557",
          "id": "655f935238deee2d5c2a3f64",
          "location_id": "65352770872cdd882ef28556",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "abc",
              "name_hi": "abc",
              "code": "123321",
              "type": "WAREHOUSE",
              "address": "zafarabad",
              "city": "abc",
              "contact": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65352770872cdd882ef28556"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1700766046928_scaled_IMG-20231120-WA0001.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Yogendra Yadav",
          "label": "Yogendra Yadav (KA0095)",
          "code": "KA0095",
          "id": "65fd6c55862d456c374c1cc0",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "head chef",
              "code": "HEAD_CHEF",
              "id": "65fa850f79acd1b808ff8706"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Rahul rana",
          "label": "Rahul rana (EMP/0422)",
          "code": "EMP/0422",
          "id": "646471f143165ae44431b668",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1684304368996_new.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "External Employee Onee",
          "label": "External Employee Onee (EMP8700)",
          "code": "EMP8700",
          "id": "65a79113258d9520c33663f2",
          "location_id": "651f9bf94ea5b67386932533",
          "external_emp_code": "EXTEMP8700",
          "department": {},
          "location": {
              "name": "ksheer sagar jaisinghpur",
              "name_hi": "Ksheer sagar Jaisinghpur",
              "code": "LC/098",
              "type": "SHOWROOM",
              "address": "jaisinghpur, himachal pradesh, india",
              "city": "Jaisinghpur",
              "contact": "9898989898",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "651f9bf94ea5b67386932533"
          },
          "role": {
              "name": "head accountant",
              "code": "HEAD_ACCOUNTANT",
              "id": "65fa83bd79acd1b808ff8689"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Kapil sharma",
          "label": "Kapil sharma (EMP/12222)",
          "code": "EMP/12222",
          "id": "64fff765b2ea36c1b9477286",
          "location_id": "64f5840f9b089f290e45d703",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar punjab",
              "name_hi": "क्षीर सागर पंजाब",
              "code": "KS/PN/09",
              "type": "FACTORY",
              "address": "kharar, punjab",
              "city": "Punjab",
              "contact": "8894228604",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f5840f9b089f290e45d703"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "SOUROJIT LAHA",
          "label": "SOUROJIT LAHA (CA0167)",
          "code": "CA0167",
          "id": "65fd6c56862d456c374c1e71",
          "location_id": "665829fddbae3560649e3004",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "cashier",
              "code": "CASHIER",
              "id": "65facd86141d532b7effa803"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "SANDEEP KUMAR",
          "label": "SANDEEP KUMAR (SA0148)",
          "code": "SA0148",
          "id": "65fd6c56862d456c374c1dfe",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shantnu",
          "label": "Shantnu (EMP/3222)",
          "code": "EMP/3222",
          "id": "64a2a945385afd26c33e7054",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "RABI PRAKASH JAISWAL",
          "label": "RABI PRAKASH JAISWAL (SA0173)",
          "code": "SA0173",
          "id": "65fd6c57862d456c374c1e95",
          "location_id": "665829fddbae3560649e3004",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Arshiya",
          "label": "Arshiya (EMP/2525)",
          "code": "EMP/2525",
          "id": "6530b404872cdd882ef27990",
          "location_id": "64f5840f9b089f290e45d703",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar punjab",
              "name_hi": "क्षीर सागर पंजाब",
              "code": "KS/PN/09",
              "type": "FACTORY",
              "address": "kharar, punjab",
              "city": "Punjab",
              "contact": "8894228604",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f5840f9b089f290e45d703"
          },
          "role": {
              "name": "factory",
              "code": "FACTORY",
              "id": "64fee745b2ea36c1b9476af2"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Karan kumar",
          "label": "Karan kumar (EMP/115)",
          "code": "EMP/115",
          "id": "64fed3dab2ea36c1b94768bb",
          "location_id": "64f57cf29b089f290e45d64d",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar lahartara",
              "name_hi": "क्षीर सागर लहरतारा",
              "code": "KS/SR/05",
              "type": "SHOWROOM",
              "address": "varanasi movies, golghar, bazardiha, maheshpur, varanasi, uttar pradesh 221006",
              "city": "Lahartara Boulia, Varanasi",
              "contact": "0542237168",
              "landline_number": null,
              "fssai_number": "287438274",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f57cf29b089f290e45d64d"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Mangaldev Singh",
          "label": "Mangaldev Singh (PA0071)",
          "code": "PA0071",
          "id": "65fd6c55862d456c374c1c34",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Rakesh",
          "label": "Rakesh (EMP501)",
          "code": "EMP501",
          "id": "66587ef2f23a92946713a6e5",
          "location_id": "665829fddbae3560649e3004",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "showroom manager",
              "code": "SHOWROOM_MANAGER",
              "id": "64f6cf4d38fe1656b5cfa8eb"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Gautam Kumar",
          "label": "Gautam Kumar (NM0013)",
          "code": "NM0013",
          "id": "65fd6c53862d456c374c1ad8",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "head chef",
              "code": "HEAD_CHEF",
              "id": "65fa850f79acd1b808ff8706"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Rajan Yadav",
          "label": "Rajan Yadav (DG0043)",
          "code": "DG0043",
          "id": "65fd6c54862d456c374c1b84",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "head chef",
              "code": "HEAD_CHEF",
              "id": "65fa850f79acd1b808ff8706"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Pankaj kumar",
          "label": "Pankaj kumar (EMP/0011)",
          "code": "EMP/0011",
          "id": "661d29850c3f7e02a4fa83e7",
          "location_id": "660fb2a7e0844f1a481f80e2",
          "department_id": "660bb1f88607b69cab2077a5",
          "external_emp_code": "TEST",
          "department": {
              "name": "dept ss",
              "code": "SS2",
              "id": "660bb1f88607b69cab2077a5"
          },
          "location": {
              "name": "ksheer sagar solan",
              "name_hi": "क्षीर सागर सोलन",
              "code": "HP14",
              "type": "SHOWROOM",
              "address": "solan, himachal pradesh, india",
              "city": "Solan",
              "contact": "8219105056",
              "landline_number": "01792221322",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "660fb2a7e0844f1a481f80e2"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Ravindra Kumar Sharma",
          "label": "Ravindra Kumar Sharma (AD0126)",
          "code": "AD0126",
          "id": "65fd6c56862d456c374c1d7e",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Neeraj Kumar",
          "label": "Neeraj Kumar (AD0123)",
          "code": "AD0123",
          "id": "65fd6c56862d456c374c1d6c",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Akshay Maurya",
          "label": "Akshay Maurya (AD0108)",
          "code": "AD0108",
          "id": "65fd6c55862d456c374c1d0e",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Robin sharma",
          "label": "Robin sharma (EMP/333)",
          "code": "EMP/333",
          "id": "652f705213342aa7f0e36fd9",
          "location_id": "652f71b913342aa7f0e37051",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar kotlu",
              "name_hi": "क्षीर सागर कोटलू",
              "code": "KT/02",
              "type": "FACTORY",
              "address": "kotlu, himachal pradesh, india",
              "city": "KOTLU",
              "contact": "9876543245",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "652f71b913342aa7f0e37051"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Arun Pal",
          "label": "Arun Pal (AD0110)",
          "code": "AD0110",
          "id": "65fd6c55862d456c374c1d1a",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "rider",
              "code": "RIDER",
              "id": "65fa83a079acd1b808ff8683"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "AKASH PATEL",
          "label": "AKASH PATEL (SA0189)",
          "code": "SA0189",
          "id": "65fd6c57862d456c374c1ef4",
          "location_id": "665829fddbae3560649e3004",
          "department_id": "66506c9884a4f3490b8eaade",
          "external_emp_code": "N/A",
          "department": {
              "name": "software department",
              "code": "SD0012",
              "id": "66506c9884a4f3490b8eaade"
          },
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Vishal",
          "label": "Vishal (EMP/0121)",
          "code": "EMP/0121",
          "id": "64534e4755d19f64d3b0acf4",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1683181124911_IMG_20210315_091959.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Sandeep Kumar",
          "label": "Sandeep Kumar (AD0130)",
          "code": "AD0130",
          "id": "65fd6c56862d456c374c1d96",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Ashrfa Devi",
          "label": "Ashrfa Devi (AD0112)",
          "code": "AD0112",
          "id": "65fd6c55862d456c374c1d2b",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "female helper",
              "code": "FEMALE_HELPER",
              "id": "65fa82df79acd1b808ff8646"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "AKHILESH KUMAR MAURYA",
          "label": "AKHILESH KUMAR MAURYA (SA0171)",
          "code": "SA0171",
          "id": "65fd6c57862d456c374c1e85",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Sohan",
          "label": "Sohan (EMP/138)",
          "code": "EMP/138",
          "id": "6501a01406130476176bea86",
          "location_id": "64feca88b2ea36c1b947678a",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar ludhiana",
              "name_hi": "क्षीर सागर लुधियाना",
              "code": "KS/321",
              "type": "FACTORY",
              "address": "ludhiana road, friends colony, moga, punjab, india",
              "city": "Ludhiana",
              "contact": "9805640126",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64feca88b2ea36c1b947678a"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Seven",
          "label": "Seven (EMP1612)",
          "code": "EMP1612",
          "id": "6555ffa9d3e661911a85f577",
          "location_id": "64f581069b089f290e45d6c6",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandigarh",
              "name_hi": "क्षीर सागर चंडीगढ़",
              "code": "KS/CH/06",
              "type": "FACTORY",
              "address": "sector 34, chandigarh",
              "city": "Chandigarh",
              "contact": "8899889988",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f581069b089f290e45d6c6"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "AKHIL YADAV",
          "label": "AKHIL YADAV (SA0142)",
          "code": "SA0142",
          "id": "65fd6c56862d456c374c1dd6",
          "location_id": "65fad482141d532b7effa82d",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chitaipur",
              "name_hi": "Ksheer Sagar Chitaipur",
              "code": "KS02",
              "type": "SHOWROOM",
              "address": "chitaipur , varanasi",
              "city": "varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad482141d532b7effa82d"
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Pranav",
          "label": "Pranav (EMP509)",
          "code": "EMP509",
          "id": "665882d8f23a92946713a79d",
          "location_id": "665829fddbae3560649e3004",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Sandeep",
          "label": "Sandeep (EMP/323)",
          "code": "EMP/323",
          "id": "664b065bc8341c82ecbb4034",
          "location_id": "661f615b0c3f7e02a4fa9805",
          "external_emp_code": "EMP233312",
          "department": {},
          "location": {
              "name": "warehouse",
              "name_hi": "Warehouse",
              "code": "LKT66",
              "type": "WAREHOUSE",
              "address": "plot no 3",
              "city": "CHDD",
              "contact": "8989898988",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "661f615b0c3f7e02a4fa9805"
          },
          "role": {
              "name": "showroom manager",
              "code": "SHOWROOM_MANAGER",
              "id": "64f6cf4d38fe1656b5cfa8eb"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Ashit Chandra Mahanta",
          "label": "Ashit Chandra Mahanta (CH0016)",
          "code": "CH0016",
          "id": "65fd6c53862d456c374c1ae6",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "head chef",
              "code": "HEAD_CHEF",
              "id": "65fa850f79acd1b808ff8706"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Deepak Kumar Yadav",
          "label": "Deepak Kumar Yadav (OF0064)",
          "code": "OF0064",
          "id": "65fd6c55862d456c374c1c0a",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "female helper",
              "code": "FEMALE_HELPER",
              "id": "65fa82df79acd1b808ff8646"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Rajeev",
          "label": "Rajeev (EMP/401)",
          "code": "EMP/401",
          "id": "6458c5398c8b4d16b048fe31",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1683539257200_demoim.jfif",
          "status": "ACTIVE"
      },
      {
          "name": "Rajat",
          "label": "Rajat (EMP/23456)",
          "code": "EMP/23456",
          "id": "64ad0b6d778f48543c3711e1",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1689062251663_Demoim.png",
          "status": "ACTIVE"
      },
      {
          "name": "SURESH JAISWAL",
          "label": "SURESH JAISWAL (SA0160)",
          "code": "SA0160",
          "id": "65fd6c56862d456c374c1e42",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Sandeep",
          "label": "Sandeep (EMP510)",
          "code": "EMP510",
          "id": "6658832bf23a92946713a7a9",
          "location_id": "665829fddbae3560649e3004",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shantnu",
          "label": "Shantnu (EMP/32001)",
          "code": "EMP/32001",
          "id": "64a2aa07385afd26c33e7073",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "BHASKAR PRATAP",
          "label": "BHASKAR PRATAP (SA0141)",
          "code": "SA0141",
          "id": "65fd6c56862d456c374c1dd0",
          "location_id": "65fad482141d532b7effa82d",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chitaipur",
              "name_hi": "Ksheer Sagar Chitaipur",
              "code": "KS02",
              "type": "SHOWROOM",
              "address": "chitaipur , varanasi",
              "city": "varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad482141d532b7effa82d"
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shubham Kumar",
          "label": "Shubham Kumar (EMP/32211)",
          "code": "EMP/32211",
          "id": "664f16755ecfe7e8051fcfa7",
          "location_id": "661f615b0c3f7e02a4fa9805",
          "department_id": "664af1d218c5ba6e7dfc9538",
          "external_emp_code": "N/A",
          "department": {
              "name": "sweet dept",
              "code": "121",
              "id": "664af1d218c5ba6e7dfc9538"
          },
          "location": {
              "name": "warehouse",
              "name_hi": "Warehouse",
              "code": "LKT66",
              "type": "WAREHOUSE",
              "address": "plot no 3",
              "city": "CHDD",
              "contact": "8989898988",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "661f615b0c3f7e02a4fa9805"
          },
          "role": {
              "name": "owner",
              "code": "OWNER",
              "id": "64f6cec538fe1656b5cfa8e8"
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1716459211603_scaled_23kohli3.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shamsher Ansari",
          "label": "Shamsher Ansari (CH0032)",
          "code": "CH0032",
          "id": "65fd6c54862d456c374c1b4a",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shantnu",
          "label": "Shantnu (EMP/32222222)",
          "code": "EMP/32222222",
          "id": "64a2a9ac385afd26c33e7062",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "AKSHAYBAR PRASAD",
          "label": "AKSHAYBAR PRASAD (SA0137)",
          "code": "SA0137",
          "id": "65fd6c56862d456c374c1dbc",
          "location_id": "65fad482141d532b7effa82d",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chitaipur",
              "name_hi": "Ksheer Sagar Chitaipur",
              "code": "KS02",
              "type": "SHOWROOM",
              "address": "chitaipur , varanasi",
              "city": "varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad482141d532b7effa82d"
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "SANTOSH YADAV",
          "label": "SANTOSH YADAV (SA0155)",
          "code": "SA0155",
          "id": "65fd6c56862d456c374c1e29",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Test 4",
          "label": "Test 4 (EMP/TEST1)",
          "code": "EMP/TEST1",
          "id": "65261dba4ea5b67386933b59",
          "location_id": "64f5733c9b089f290e45d42b",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar",
              "name_hi": "क्षीर सागर",
              "code": "KS/SR/03",
              "type": "FACTORY",
              "address": "3/335, lanka rd, anandbagh, lanka, varanasi, uttar pradesh 221001",
              "city": "Lanka, Varanasi",
              "contact": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f5733c9b089f290e45d42b"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Krishna Kumar Yadav",
          "label": "Krishna Kumar Yadav (OF0065)",
          "code": "OF0065",
          "id": "65fd6c55862d456c374c1c10",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "female helper",
              "code": "FEMALE_HELPER",
              "id": "65fa82df79acd1b808ff8646"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Pramod Kumar Yadav",
          "label": "Pramod Kumar Yadav (GA0080)",
          "code": "GA0080",
          "id": "65fd6c55862d456c374c1c66",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "electrician",
              "code": "ELECTRICIAN",
              "id": "65fa836d79acd1b808ff8680"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Raj Kumar",
          "label": "Raj Kumar (KI0100)",
          "code": "KI0100",
          "id": "65fd6c55862d456c374c1ce2",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "female helper",
              "code": "FEMALE_HELPER",
              "id": "65fa82df79acd1b808ff8646"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Akhilesh",
          "label": "Akhilesh (EMP/291)",
          "code": "EMP/291",
          "id": "651fa0854ea5b67386932557",
          "location_id": "64f5835c9b089f290e45d6f6",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar delhi",
              "name_hi": "क्षीर सागर दिल्ली",
              "code": "KS/DL/08",
              "type": "SHOWROOM",
              "address": "connaught place, new delhi, delhi",
              "city": "Delhi",
              "contact": "9809562123",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f5835c9b089f290e45d6f6"
          },
          "role": {
              "name": "showroom manager",
              "code": "SHOWROOM_MANAGER",
              "id": "64f6cf4d38fe1656b5cfa8eb"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Karan",
          "label": "Karan (EMP/525)",
          "code": "EMP/525",
          "id": "6458d7fc837902639b474bf0",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1683544060501_new.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "SUNIL YADAV",
          "label": "SUNIL YADAV (CA0190)",
          "code": "CA0190",
          "id": "65fd6c57862d456c374c1efa",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "cashier",
              "code": "CASHIER",
              "id": "65facd86141d532b7effa803"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Ram",
          "label": "Ram (EMP/999)",
          "code": "EMP/999",
          "id": "645b2f7efd0712fff1b2bacf",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Ramjee Verma",
          "label": "Ramjee Verma (DG0044)",
          "code": "DG0044",
          "id": "65fd6c54862d456c374c1b8b",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Ganga Devi Sahani",
          "label": "Ganga Devi Sahani (CH0021)",
          "code": "CH0021",
          "id": "65fd6c54862d456c374c1b04",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "female helper",
              "code": "FEMALE_HELPER",
              "id": "65fa82df79acd1b808ff8646"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "AKHILESH YADAV",
          "label": "AKHILESH YADAV (CA0163)",
          "code": "CA0163",
          "id": "65fd6c56862d456c374c1e55",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "cashier",
              "code": "CASHIER",
              "id": "65facd86141d532b7effa803"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Ram",
          "label": "Ram (EMP/0012)",
          "code": "EMP/0012",
          "id": "6452743fe146120ada31dfbf",
          "location_id": "64f581069b089f290e45d6c6",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandigarh",
              "name_hi": "क्षीर सागर चंडीगढ़",
              "code": "KS/CH/06",
              "type": "FACTORY",
              "address": "sector 34, chandigarh",
              "city": "Chandigarh",
              "contact": "8899889988",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f581069b089f290e45d6c6"
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Deepak H.K",
          "label": "Deepak H.K (AD0117)",
          "code": "AD0117",
          "id": "65fd6c56862d456c374c1d44",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Test 3",
          "label": "Test 3 (EMP/TEST)",
          "code": "EMP/TEST",
          "id": "65260f104ea5b67386933af4",
          "location_id": "660fb2a7e0844f1a481f80e2",
          "department_id": "65fd2d01141d532b7effafe7",
          "external_emp_code": "N/A",
          "department": {
              "name": "ko",
              "code": "KO",
              "id": "65fd2d01141d532b7effafe7"
          },
          "location": {
              "name": "ksheer sagar solan",
              "name_hi": "क्षीर सागर सोलन",
              "code": "HP14",
              "type": "SHOWROOM",
              "address": "solan, himachal pradesh, india",
              "city": "Solan",
              "contact": "8219105056",
              "landline_number": "01792221322",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "660fb2a7e0844f1a481f80e2"
          },
          "role": {
              "name": "owner",
              "code": "OWNER",
              "id": "64f6cec538fe1656b5cfa8e8"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Harish",
          "label": "Harish (EMP/0021)",
          "code": "EMP/0021",
          "id": "645343a1e146120ada31dfe7",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1683530326416_demoim.jfif",
          "status": "ACTIVE"
      },
      {
          "name": "Rajat singh",
          "label": "Rajat singh (EMP111)",
          "code": "EMP111",
          "id": "661904cd2026ea492fe64fdf",
          "location_id": "64feca88b2ea36c1b947678a",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar ludhiana",
              "name_hi": "क्षीर सागर लुधियाना",
              "code": "KS/321",
              "type": "FACTORY",
              "address": "ludhiana road, friends colony, moga, punjab, india",
              "city": "Ludhiana",
              "contact": "9805640126",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64feca88b2ea36c1b947678a"
          },
          "role": {
              "name": "owner",
              "code": "OWNER",
              "id": "64f6cec538fe1656b5cfa8e8"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Arshiya",
          "label": "Arshiya (EMP/2220)",
          "code": "EMP/2220",
          "id": "650191e406130476176be7f2",
          "location_id": "650027e0b2ea36c1b9477643",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar  haryana",
              "name_hi": "क्षीर सागर हरियाणा",
              "code": "HR07",
              "type": "FACTORY",
              "address": "rajpura, punjab, india",
              "city": "Rajpura",
              "contact": "9876475867",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "650027e0b2ea36c1b9477643"
          },
          "role": {
              "name": "showroom manager",
              "code": "SHOWROOM_MANAGER",
              "id": "64f6cf4d38fe1656b5cfa8eb"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Chotu H.K",
          "label": "Chotu H.K (AD0116)",
          "code": "AD0116",
          "id": "65fd6c55862d456c374c1d3e",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "tty",
          "label": "tty (WERWER324)",
          "code": "WERWER324",
          "id": "66758229d6b43b68c15368c1",
          "location_id": "665829fddbae3560649e3004",
          "external_emp_code": "ERERT34433",
          "department": {},
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shivam",
          "label": "Shivam (EMP12)",
          "code": "EMP12",
          "id": "664f3ab37609ca07861dd486",
          "location_id": "661f615b0c3f7e02a4fa9805",
          "department_id": "664af1ec18c5ba6e7dfc954c",
          "external_emp_code": "EFFGG",
          "department": {
              "name": "hr dept",
              "code": "DEP5",
              "id": "664af1ec18c5ba6e7dfc954c"
          },
          "location": {
              "name": "warehouse",
              "name_hi": "Warehouse",
              "code": "LKT66",
              "type": "WAREHOUSE",
              "address": "plot no 3",
              "city": "CHDD",
              "contact": "8989898988",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "661f615b0c3f7e02a4fa9805"
          },
          "role": {
              "name": "head accountant",
              "code": "HEAD_ACCOUNTANT",
              "id": "65fa83bd79acd1b808ff8689"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Sahil",
          "label": "Sahil (EMP/767)",
          "code": "EMP/767",
          "id": "64b51f86778f48543c37215f",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Anil H K",
          "label": "Anil H K (AD0109)",
          "code": "AD0109",
          "id": "65fd6c55862d456c374c1d14",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Usha Devi",
          "label": "Usha Devi (CK0042)",
          "code": "CK0042",
          "id": "65fd6c54862d456c374c1b7f",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "female helper",
              "code": "FEMALE_HELPER",
              "id": "65fa82df79acd1b808ff8646"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Pankaj Kumar",
          "label": "Pankaj Kumar (EMP/101010)",
          "code": "EMP/101010",
          "id": "6458a4978c8b4d16b048fd24",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1683530903187_demoim.jfif",
          "status": "ACTIVE"
      },
      {
          "name": "Lakshmina Devi",
          "label": "Lakshmina Devi (CH0026)",
          "code": "CH0026",
          "id": "65fd6c54862d456c374c1b27",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "female helper",
              "code": "FEMALE_HELPER",
              "id": "65fa82df79acd1b808ff8646"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Test one",
          "label": "Test one (EMP7800)",
          "code": "EMP7800",
          "id": "655f938638deee2d5c2a3f67",
          "location_id": "652f71b913342aa7f0e37051",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar kotlu",
              "name_hi": "क्षीर सागर कोटलू",
              "code": "KT/02",
              "type": "FACTORY",
              "address": "kotlu, himachal pradesh, india",
              "city": "KOTLU",
              "contact": "9876543245",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "652f71b913342aa7f0e37051"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1700762502679_scaled_IMG-20231122-WA0000.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "vaishali",
          "label": "vaishali (EMP/899)",
          "code": "EMP/899",
          "id": "6602b93bbc65f5712723b1c9",
          "location_id": "65fad482141d532b7effa82d",
          "department_id": "65fd2d01141d532b7effafe7",
          "external_emp_code": "HDHD",
          "department": {
              "name": "ko",
              "code": "KO",
              "id": "65fd2d01141d532b7effafe7"
          },
          "location": {
              "name": "ksheer sagar chitaipur",
              "name_hi": "Ksheer Sagar Chitaipur",
              "code": "KS02",
              "type": "SHOWROOM",
              "address": "chitaipur , varanasi",
              "city": "varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad482141d532b7effa82d"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Rahul",
          "label": "Rahul (EMP/131)",
          "code": "EMP/131",
          "id": "64f58d009b089f290e45d7c3",
          "location_id": "64f581069b089f290e45d6c6",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandigarh",
              "name_hi": "क्षीर सागर चंडीगढ़",
              "code": "KS/CH/06",
              "type": "FACTORY",
              "address": "sector 34, chandigarh",
              "city": "Chandigarh",
              "contact": "8899889988",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f581069b089f290e45d6c6"
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Rohit",
          "label": "Rohit (EMP/134)",
          "code": "EMP/134",
          "id": "65019d8506130476176be9da",
          "location_id": "64feca88b2ea36c1b947678a",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar ludhiana",
              "name_hi": "क्षीर सागर लुधियाना",
              "code": "KS/321",
              "type": "FACTORY",
              "address": "ludhiana road, friends colony, moga, punjab, india",
              "city": "Ludhiana",
              "contact": "9805640126",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64feca88b2ea36c1b947678a"
          },
          "role": {
              "name": "owner",
              "code": "OWNER",
              "id": "64f6cec538fe1656b5cfa8e8"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shahanwaz Warsi",
          "label": "Shahanwaz Warsi (OF0069)",
          "code": "OF0069",
          "id": "65fd6c55862d456c374c1c28",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "accountant",
              "code": "ACCOUNTANT",
              "id": "65fa83ca79acd1b808ff868c"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "ABHISHEK YADAV",
          "label": "ABHISHEK YADAV (SA0150)",
          "code": "SA0150",
          "id": "65fd6c56862d456c374c1e0a",
          "location_id": "64f5835c9b089f290e45d6f6",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar delhi",
              "name_hi": "क्षीर सागर दिल्ली",
              "code": "KS/DL/08",
              "type": "SHOWROOM",
              "address": "connaught place, new delhi, delhi",
              "city": "Delhi",
              "contact": "9809562123",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f5835c9b089f290e45d6f6"
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Lakkhi Devi",
          "label": "Lakkhi Devi (MA0056)",
          "code": "MA0056",
          "id": "65fd6c54862d456c374c1bda",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "female helper",
              "code": "FEMALE_HELPER",
              "id": "65fa82df79acd1b808ff8646"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Sanjay Kumar Gwal",
          "label": "Sanjay Kumar Gwal (OF0068)",
          "code": "OF0068",
          "id": "65fd6c55862d456c374c1c22",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "female helper",
              "code": "FEMALE_HELPER",
              "id": "65fa82df79acd1b808ff8646"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Akshit",
          "label": "Akshit (EMP504)",
          "code": "EMP504",
          "id": "66588002f23a92946713a759",
          "location_id": "665829fddbae3560649e3004",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1717135803657_images.jpeg",
          "status": "ACTIVE"
      },
      {
          "name": "Sonu Yadav",
          "label": "Sonu Yadav (CH0034)",
          "code": "CH0034",
          "id": "65fd6c54862d456c374c1b52",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Reshav",
          "label": "Reshav (EMP222)",
          "code": "EMP222",
          "id": "661e11250c3f7e02a4fa8bc7",
          "location_id": "660fb2a7e0844f1a481f80e2",
          "department_id": "660bb1f88607b69cab2077a5",
          "external_emp_code": "EXT222",
          "department": {
              "name": "dept ss",
              "code": "SS2",
              "id": "660bb1f88607b69cab2077a5"
          },
          "location": {
              "name": "ksheer sagar solan",
              "name_hi": "क्षीर सागर सोलन",
              "code": "HP14",
              "type": "SHOWROOM",
              "address": "solan, himachal pradesh, india",
              "city": "Solan",
              "contact": "8219105056",
              "landline_number": "01792221322",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "660fb2a7e0844f1a481f80e2"
          },
          "role": {
              "name": "owner",
              "code": "OWNER",
              "id": "64f6cec538fe1656b5cfa8e8"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "ds",
          "label": "ds (DFSFREW)",
          "code": "DFSFREW",
          "id": "66757e99d6b43b68c1536854",
          "location_id": "66558c8557b3928ec42d2781",
          "department_id": "666b1ee67efe9e445aa3902a",
          "external_emp_code": "SDF",
          "department": {
              "name": "deeed",
              "code": "DE",
              "id": "666b1ee67efe9e445aa3902a"
          },
          "location": {
              "name": "location delhi",
              "name_hi": "location delhi",
              "code": "LD001",
              "type": "FACTORY",
              "address": "shop no.146/2, behind hotel royal plaza, v.p.o, mrw6+9w8, gali number 12, dariya reserved forest, daria, chandigarh, 160101, india",
              "city": "DELHI",
              "contact": "",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "66558c8557b3928ec42d2781"
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "ASFAR",
          "label": "ASFAR (EMP/2029)",
          "code": "EMP/2029",
          "id": "6530b4d7872cdd882ef279a0",
          "location_id": "6502ad3506130476176bf106",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar palampur",
              "name_hi": "क्षीर सागर पालमपुर",
              "code": "KS/PL/21",
              "type": "SHOWROOM",
              "address": "palampur, himachal pradesh, india",
              "city": "Palampur",
              "contact": "9805670126",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "6502ad3506130476176bf106"
          },
          "role": {
              "name": "factory",
              "code": "FACTORY",
              "id": "64fee745b2ea36c1b9476af2"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "SHANI SHARMA",
          "label": "SHANI SHARMA (SA0153)",
          "code": "SA0153",
          "id": "65fd6c56862d456c374c1e1d",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Avdhesh Yadav",
          "label": "Avdhesh Yadav (CH0018)",
          "code": "CH0018",
          "id": "65fd6c54862d456c374c1af2",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Pankaj kumar",
          "label": "Pankaj kumar (EMP/233)",
          "code": "EMP/233",
          "id": "645a31a6231ee5ed1c94b06c",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1683635310897_new.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Ash",
          "label": "Ash (EMP445)",
          "code": "EMP445",
          "id": "6530b592872cdd882ef279be",
          "location_id": "64f5840f9b089f290e45d703",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar punjab",
              "name_hi": "क्षीर सागर पंजाब",
              "code": "KS/PN/09",
              "type": "FACTORY",
              "address": "kharar, punjab",
              "city": "Punjab",
              "contact": "8894228604",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f5840f9b089f290e45d703"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "xyz",
          "label": "xyz (0001)",
          "code": "0001",
          "id": "65fa894f79acd1b808ff8782",
          "location_id": "650027e0b2ea36c1b9477643",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar  haryana",
              "name_hi": "क्षीर सागर हरियाणा",
              "code": "HR07",
              "type": "FACTORY",
              "address": "rajpura, punjab, india",
              "city": "Rajpura",
              "contact": "9876475867",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "650027e0b2ea36c1b9477643"
          },
          "role": {
              "name": "head chef",
              "code": "HEAD_CHEF",
              "id": "65fa850f79acd1b808ff8706"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Rohan dogra",
          "label": "Rohan dogra (EMP/119)",
          "code": "EMP/119",
          "id": "64ff167bb2ea36c1b9476e59",
          "location_id": "64f5840f9b089f290e45d703",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar punjab",
              "name_hi": "क्षीर सागर पंजाब",
              "code": "KS/PN/09",
              "type": "FACTORY",
              "address": "kharar, punjab",
              "city": "Punjab",
              "contact": "8894228604",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f5840f9b089f290e45d703"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Sanju",
          "label": "Sanju (MA0059)",
          "code": "MA0059",
          "id": "65fd6c54862d456c374c1bec",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "female helper",
              "code": "FEMALE_HELPER",
              "id": "65fa82df79acd1b808ff8646"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "rakesh",
          "label": "rakesh (EJJS3455)",
          "code": "EJJS3455",
          "id": "667558f97d4a7550deb62f05",
          "location_id": "665829fddbae3560649e3004",
          "department_id": "66506c9884a4f3490b8eaade",
          "external_emp_code": "WERQ2322",
          "department": {
              "name": "software department",
              "code": "SD0012",
              "id": "66506c9884a4f3490b8eaade"
          },
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "ABHISHEK CHAURASIA",
          "label": "ABHISHEK CHAURASIA (SA0165)",
          "code": "SA0165",
          "id": "65fd6c56862d456c374c1e65",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Rishikesh Yadav",
          "label": "Rishikesh Yadav (GA0081)",
          "code": "GA0081",
          "id": "65fd6c55862d456c374c1c6c",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Samim Ansari",
          "label": "Samim Ansari (CH0030)",
          "code": "CH0030",
          "id": "65fd6c54862d456c374c1b3e",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shyamlal",
          "label": "Shyamlal (CH0033)",
          "code": "CH0033",
          "id": "65fd6c54862d456c374c1b4c",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Pramod Yadav",
          "label": "Pramod Yadav (KA0091)",
          "code": "KA0091",
          "id": "65fd6c55862d456c374c1cac",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "head chef",
              "code": "HEAD_CHEF",
              "id": "65fa850f79acd1b808ff8706"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Basanta Ray",
          "label": "Basanta Ray (NM0012)",
          "code": "NM0012",
          "id": "65fd6c53862d456c374c1ad2",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Rahul rana",
          "label": "Rahul rana (EMP/022)",
          "code": "EMP/022",
          "id": "6463666f43165ae44431b5be",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1684235887139_new.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Vinod Yadav",
          "label": "Vinod Yadav (PA0075)",
          "code": "PA0075",
          "id": "65fd6c55862d456c374c1c4c",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Ashutosh",
          "label": "Ashutosh (EMP505)",
          "code": "EMP505",
          "id": "66588072f23a92946713a766",
          "location_id": "665829fddbae3560649e3004",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "RESHAV",
          "label": "RESHAV (EMP/3231)",
          "code": "EMP/3231",
          "id": "66541a7c1a3b7d321f193fbd",
          "location_id": "665050c484a4f3490b8e931a",
          "external_emp_code": "EXTER16",
          "department": {},
          "location": {
              "name": "ksheer sagar bengaluru",
              "name_hi": "क्षीर सागर बेंगलुरु",
              "code": "LB001",
              "type": "FACTORY",
              "address": "mvw2+gqf town park, sector 5, panchkula, haryana 134109, india",
              "city": "BENGALURU",
              "contact": "8894228601",
              "landline_number": "6767678989",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665050c484a4f3490b8e931a"
          },
          "role": {
              "name": "owner",
              "code": "OWNER",
              "id": "64f6cec538fe1656b5cfa8e8"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "ash",
          "label": "ash (EMP/2527)",
          "code": "EMP/2527",
          "id": "6572f959092780bee06c9f85",
          "location_id": "650027e0b2ea36c1b9477643",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar  haryana",
              "name_hi": "क्षीर सागर हरियाणा",
              "code": "HR07",
              "type": "FACTORY",
              "address": "rajpura, punjab, india",
              "city": "Rajpura",
              "contact": "9876475867",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "650027e0b2ea36c1b9477643"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Chetan singh",
          "label": "Chetan singh (EMP/020)",
          "code": "EMP/020",
          "id": "661519c723a8913cedfc3181",
          "location_id": "64f5835c9b089f290e45d6f6",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar delhi",
              "name_hi": "क्षीर सागर दिल्ली",
              "code": "KS/DL/08",
              "type": "SHOWROOM",
              "address": "connaught place, new delhi, delhi",
              "city": "Delhi",
              "contact": "9809562123",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f5835c9b089f290e45d6f6"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "BRIJBHAN YADAV",
          "label": "BRIJBHAN YADAV (SA0193)",
          "code": "SA0193",
          "id": "65fd6c57862d456c374c1f06",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "ABHINAV",
          "label": "ABHINAV (SA0191)",
          "code": "SA0191",
          "id": "65fd6c57862d456c374c1efc",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Roshan Sahani",
          "label": "Roshan Sahani (AD0128)",
          "code": "AD0128",
          "id": "65fd6c56862d456c374c1d8a",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Roman",
          "label": "Roman (EMP/1112)",
          "code": "EMP/1112",
          "id": "64a3ad39385afd26c33e73ab",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1688448313654_Demoim.png",
          "status": "ACTIVE"
      },
      {
          "name": "Anil Yadav",
          "label": "Anil Yadav (CH0015)",
          "code": "CH0015",
          "id": "65fd6c53862d456c374c1ae0",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Jitendra Mouya",
          "label": "Jitendra Mouya (CH0022)",
          "code": "CH0022",
          "id": "65fd6c54862d456c374c1b0a",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "head chef",
              "code": "HEAD_CHEF",
              "id": "65fa850f79acd1b808ff8706"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Surendra Bhardwaj",
          "label": "Surendra Bhardwaj (KA0093)",
          "code": "KA0093",
          "id": "65fd6c55862d456c374c1cb4",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "head chef",
              "code": "HEAD_CHEF",
              "id": "65fa850f79acd1b808ff8706"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shekhar Singh",
          "label": "Shekhar Singh (EMP322)",
          "code": "EMP322",
          "id": "664af31218c5ba6e7dfc957e",
          "location_id": "661f615b0c3f7e02a4fa9805",
          "department_id": "664af1d218c5ba6e7dfc9538",
          "external_emp_code": "EMP3221",
          "department": {
              "name": "sweet dept",
              "code": "121",
              "id": "664af1d218c5ba6e7dfc9538"
          },
          "location": {
              "name": "warehouse",
              "name_hi": "Warehouse",
              "code": "LKT66",
              "type": "WAREHOUSE",
              "address": "plot no 3",
              "city": "CHDD",
              "contact": "8989898988",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "661f615b0c3f7e02a4fa9805"
          },
          "role": {
              "name": "owner",
              "code": "OWNER",
              "id": "64f6cec538fe1656b5cfa8e8"
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1716187993025_scaled_23kohli3.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "SATYA NARAYAN BHARTI",
          "label": "SATYA NARAYAN BHARTI (SA0186)",
          "code": "SA0186",
          "id": "65fd6c57862d456c374c1ee7",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Sagar",
          "label": "Sagar (EMP4334)",
          "code": "EMP4334",
          "id": "664b209e2194438d5976f79b",
          "location_id": "661f615b0c3f7e02a4fa9805",
          "department_id": "664af1d218c5ba6e7dfc9538",
          "external_emp_code": "EMP23331",
          "department": {
              "name": "sweet dept",
              "code": "121",
              "id": "664af1d218c5ba6e7dfc9538"
          },
          "location": {
              "name": "warehouse",
              "name_hi": "Warehouse",
              "code": "LKT66",
              "type": "WAREHOUSE",
              "address": "plot no 3",
              "city": "CHDD",
              "contact": "8989898988",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "661f615b0c3f7e02a4fa9805"
          },
          "role": {
              "name": "showroom manager",
              "code": "SHOWROOM_MANAGER",
              "id": "64f6cf4d38fe1656b5cfa8eb"
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1716200368067_bannerrrrrr.jpeg",
          "status": "ACTIVE"
      },
      {
          "name": "Ramesh Mourya",
          "label": "Ramesh Mourya (NM0014)",
          "code": "NM0014",
          "id": "65fd6c53862d456c374c1ade",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Kusum",
          "label": "Kusum (CH0025)",
          "code": "CH0025",
          "id": "65fd6c54862d456c374c1b1c",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "female helper",
              "code": "FEMALE_HELPER",
              "id": "65fa82df79acd1b808ff8646"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "PRIYANKA CHAKRAVARTI",
          "label": "PRIYANKA CHAKRAVARTI (CA0179)",
          "code": "CA0179",
          "id": "65fd6c57862d456c374c1eb9",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "cashier",
              "code": "CASHIER",
              "id": "65facd86141d532b7effa803"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Pankaj Kumar",
          "label": "Pankaj Kumar (EMP/12W)",
          "code": "EMP/12W",
          "id": "65701a8e4dac489780d00f73",
          "location_id": "64f57cf29b089f290e45d64d",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar lahartara",
              "name_hi": "क्षीर सागर लहरतारा",
              "code": "KS/SR/05",
              "type": "SHOWROOM",
              "address": "varanasi movies, golghar, bazardiha, maheshpur, varanasi, uttar pradesh 221006",
              "city": "Lahartara Boulia, Varanasi",
              "contact": "0542237168",
              "landline_number": null,
              "fssai_number": "287438274",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f57cf29b089f290e45d64d"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1701845646599_scaled_gettyimages-1308115923-612x612.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Pankaj Kumar",
          "label": "Pankaj Kumar (EMP/786)",
          "code": "EMP/786",
          "id": "652f921d872cdd882ef27075",
          "location_id": "651f9bf94ea5b67386932533",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar jaisinghpur",
              "name_hi": "Ksheer sagar Jaisinghpur",
              "code": "LC/098",
              "type": "SHOWROOM",
              "address": "jaisinghpur, himachal pradesh, india",
              "city": "Jaisinghpur",
              "contact": "9898989898",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "651f9bf94ea5b67386932533"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Sanjay Yadav",
          "label": "Sanjay Yadav (DR0053)",
          "code": "DR0053",
          "id": "65fd6c54862d456c374c1bc8",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "driver",
              "code": "DRIVER",
              "id": "65fa833779acd1b808ff867a"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Test 2",
          "label": "Test 2 (EMP/0098)",
          "code": "EMP/0098",
          "id": "652607624ea5b67386933a04",
          "location_id": "651f9bf94ea5b67386932533",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar jaisinghpur",
              "name_hi": "Ksheer sagar Jaisinghpur",
              "code": "LC/098",
              "type": "SHOWROOM",
              "address": "jaisinghpur, himachal pradesh, india",
              "city": "Jaisinghpur",
              "contact": "9898989898",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "651f9bf94ea5b67386932533"
          },
          "role": {
              "name": "owner",
              "code": "OWNER",
              "id": "64f6cec538fe1656b5cfa8e8"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Nitin kumar",
          "label": "Nitin kumar (EMP/123)",
          "code": "EMP/123",
          "id": "650009b8b2ea36c1b9477483",
          "location_id": "64f5840f9b089f290e45d703",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar punjab",
              "name_hi": "क्षीर सागर पंजाब",
              "code": "KS/PN/09",
              "type": "FACTORY",
              "address": "kharar, punjab",
              "city": "Punjab",
              "contact": "8894228604",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f5840f9b089f290e45d703"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Ramdhari Yadav",
          "label": "Ramdhari Yadav (PA0072)",
          "code": "PA0072",
          "id": "65fd6c55862d456c374c1c3a",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Robin",
          "label": "Robin (EMP/440)",
          "code": "EMP/440",
          "id": "64cb3e0b015fc080fcbe0017",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1691041291839_Demoim.png",
          "status": "ACTIVE"
      },
      {
          "name": "Pankaj Kumar",
          "label": "Pankaj Kumar (EMP/1010)",
          "code": "EMP/1010",
          "id": "6458a4008c8b4d16b048fd20",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1683530752792_demoim.jfif",
          "status": "ACTIVE"
      },
      {
          "name": "Vishal singh",
          "label": "Vishal singh (EMP/420)",
          "code": "EMP/420",
          "id": "6458d6fc837902639b474be8",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1683543803913_new.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "SHIVAM YADAV",
          "label": "SHIVAM YADAV (SA0181)",
          "code": "SA0181",
          "id": "65fd6c57862d456c374c1ec5",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Ayush",
          "label": "Ayush (EMP01)",
          "code": "EMP01",
          "id": "652dfeae84477f0b99b24d96",
          "location_id": "64f581069b089f290e45d6c6",
          "department_id": "65fd2d01141d532b7effafe7",
          "external_emp_code": "N/A",
          "department": {
              "name": "ko",
              "code": "KO",
              "id": "65fd2d01141d532b7effafe7"
          },
          "location": {
              "name": "ksheer sagar chandigarh",
              "name_hi": "क्षीर सागर चंडीगढ़",
              "code": "KS/CH/06",
              "type": "FACTORY",
              "address": "sector 34, chandigarh",
              "city": "Chandigarh",
              "contact": "8899889988",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f581069b089f290e45d6c6"
          },
          "role": {
              "name": "factory",
              "code": "FACTORY",
              "id": "64fee745b2ea36c1b9476af2"
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1712315181431_360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Test5",
          "label": "Test5 (EMP02)",
          "code": "EMP02",
          "id": "652e689115e75c81bce5c744",
          "location_id": "64f57cf29b089f290e45d64d",
          "external_emp_code": "AB123",
          "department": {},
          "location": {
              "name": "ksheer sagar lahartara",
              "name_hi": "क्षीर सागर लहरतारा",
              "code": "KS/SR/05",
              "type": "SHOWROOM",
              "address": "varanasi movies, golghar, bazardiha, maheshpur, varanasi, uttar pradesh 221006",
              "city": "Lahartara Boulia, Varanasi",
              "contact": "0542237168",
              "landline_number": null,
              "fssai_number": "287438274",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f57cf29b089f290e45d64d"
          },
          "role": {
              "name": "owner",
              "code": "OWNER",
              "id": "64f6cec538fe1656b5cfa8e8"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Raman km",
          "label": "Raman km (EMP/137)",
          "code": "EMP/137",
          "id": "65019eb106130476176bea47",
          "location_id": "64feca88b2ea36c1b947678a",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar ludhiana",
              "name_hi": "क्षीर सागर लुधियाना",
              "code": "KS/321",
              "type": "FACTORY",
              "address": "ludhiana road, friends colony, moga, punjab, india",
              "city": "Ludhiana",
              "contact": "9805640126",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64feca88b2ea36c1b947678a"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Rahul",
          "label": "Rahul (EMP/575)",
          "code": "EMP/575",
          "id": "6458e728837902639b474cf8",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1683547944618_new.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Ram Raj",
          "label": "Ram Raj (AD0124)",
          "code": "AD0124",
          "id": "65fd6c56862d456c374c1d72",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shikhar",
          "label": "Shikhar (EMP/299)",
          "code": "EMP/299",
          "id": "651fa0d74ea5b67386932563",
          "location_id": "64f5835c9b089f290e45d6f6",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar delhi",
              "name_hi": "क्षीर सागर दिल्ली",
              "code": "KS/DL/08",
              "type": "SHOWROOM",
              "address": "connaught place, new delhi, delhi",
              "city": "Delhi",
              "contact": "9809562123",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f5835c9b089f290e45d6f6"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "ASHISH KUMAR JAISWAL",
          "label": "ASHISH KUMAR JAISWAL (SA0147)",
          "code": "SA0147",
          "id": "65fd6c56862d456c374c1df9",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Ranjeet Yadav",
          "label": "Ranjeet Yadav (BS0011)",
          "code": "BS0011",
          "id": "65fd6c53862d456c374c1acc",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Test Two",
          "label": "Test Two (EMP/4567)",
          "code": "EMP/4567",
          "id": "655fa31838deee2d5c2a42d4",
          "location_id": "652ecd5b13342aa7f0e36d29",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "location name",
              "name_hi": "Location Naem",
              "code": "222151",
              "type": "FACTORY",
              "address": "dgznbfgdz",
              "city": "Ah",
              "contact": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "652ecd5b13342aa7f0e36d29"
          },
          "role": {
              "name": "showroom manager",
              "code": "SHOWROOM_MANAGER",
              "id": "64f6cf4d38fe1656b5cfa8eb"
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1700766488180_scaled_IMG-20231121-WA0000.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Pappu Yadav",
          "label": "Pappu Yadav (GA0079)",
          "code": "GA0079",
          "id": "65fd6c55862d456c374c1c60",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "electrician",
              "code": "ELECTRICIAN",
              "id": "65fa836d79acd1b808ff8680"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Ramesh Chandra",
          "label": "Ramesh Chandra (DR0049)",
          "code": "DR0049",
          "id": "65fd6c54862d456c374c1bb0",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "driver",
              "code": "DRIVER",
              "id": "65fa833779acd1b808ff867a"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "External Employee One",
          "label": "External Employee One (EMP/87000)",
          "code": "EMP/87000",
          "id": "663dc5d8afc481cb66574a13",
          "location_id": "661f615b0c3f7e02a4fa9805",
          "external_emp_code": "EXT234346",
          "department": {},
          "location": {
              "name": "warehouse",
              "name_hi": "Warehouse",
              "code": "LKT66",
              "type": "WAREHOUSE",
              "address": "plot no 3",
              "city": "CHDD",
              "contact": "8989898988",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "661f615b0c3f7e02a4fa9805"
          },
          "role": {
              "name": "testing 123",
              "code": "TESTING_123",
              "id": "660650b33a3ef7eb6df409fa"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "RAHUL",
          "label": "RAHUL (SA0152)",
          "code": "SA0152",
          "id": "65fd6c56862d456c374c1e12",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Raghav",
          "label": "Raghav (EMP444)",
          "code": "EMP444",
          "id": "661e130e0c3f7e02a4fa8c08",
          "location_id": "660bb1d18607b69cab207798",
          "department_id": "660bb1f88607b69cab2077a5",
          "external_emp_code": "EXT333",
          "department": {
              "name": "dept ss",
              "code": "SS2",
              "id": "660bb1f88607b69cab2077a5"
          },
          "location": {
              "name": "ksheer sagar harsi",
              "name_hi": "क्षीर सागर हारसी",
              "code": "KS004",
              "type": "SHOWROOM",
              "address": "ks kangra",
              "city": "KANGRA",
              "contact": "",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "660bb1d18607b69cab207798"
          },
          "role": {
              "name": "owner",
              "code": "OWNER",
              "id": "64f6cec538fe1656b5cfa8e8"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Mulayam Yadav",
          "label": "Mulayam Yadav (KA0088)",
          "code": "KA0088",
          "id": "65fd6c55862d456c374c1c9a",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Deepak Singh",
          "label": "Deepak Singh (AD0118)",
          "code": "AD0118",
          "id": "65fd6c56862d456c374c1d4a",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "External Employee One",
          "label": "External Employee One (EMP/8700000)",
          "code": "EMP/8700000",
          "id": "663dc625afc481cb66574a1f",
          "location_id": "661f615b0c3f7e02a4fa9805",
          "external_emp_code": "EXT23434655",
          "department": {},
          "location": {
              "name": "warehouse",
              "name_hi": "Warehouse",
              "code": "LKT66",
              "type": "WAREHOUSE",
              "address": "plot no 3",
              "city": "CHDD",
              "contact": "8989898988",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "661f615b0c3f7e02a4fa9805"
          },
          "role": {
              "name": "testing 123",
              "code": "TESTING_123",
              "id": "660650b33a3ef7eb6df409fa"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "ANIL KUMAR YADAV",
          "label": "ANIL KUMAR YADAV (SA0174)",
          "code": "SA0174",
          "id": "65fd6c57862d456c374c1e9b",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Geeta",
          "label": "Geeta (MA0055)",
          "code": "MA0055",
          "id": "65fd6c54862d456c374c1bd4",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "female helper",
              "code": "FEMALE_HELPER",
              "id": "65fa82df79acd1b808ff8646"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Fekkan",
          "label": "Fekkan (GA0078)",
          "code": "GA0078",
          "id": "65fd6c55862d456c374c1c5e",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "test",
          "label": "test (EE4)",
          "code": "EE4",
          "id": "66587e0bf23a92946713a6b0",
          "location_id": "665829fddbae3560649e3004",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "KRISHNA CHAURASIA",
          "label": "KRISHNA CHAURASIA (SA0157)",
          "code": "SA0157",
          "id": "65fd6c56862d456c374c1e30",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "New ",
          "label": "New  (EMP/580)",
          "code": "EMP/580",
          "id": "6458f37b837902639b474e0a",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1683551099121_new.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Manish Kumar",
          "label": "Manish Kumar (OF0066)",
          "code": "OF0066",
          "id": "65fd6c55862d456c374c1c16",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "head accountant",
              "code": "HEAD_ACCOUNTANT",
              "id": "65fa83bd79acd1b808ff8689"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Himanshu",
          "label": "Himanshu (EMP503)",
          "code": "EMP503",
          "id": "66587fa6f23a92946713a731",
          "location_id": "665829fddbae3560649e3004",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "owner",
              "code": "OWNER",
              "id": "64f6cec538fe1656b5cfa8e8"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Mangal Yadav",
          "label": "Mangal Yadav (CK0038)",
          "code": "CK0038",
          "id": "65fd6c54862d456c374c1b67",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "head chef",
              "code": "HEAD_CHEF",
              "id": "65fa850f79acd1b808ff8706"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shikhar Yadav",
          "label": "Shikhar Yadav (EMP/322)",
          "code": "EMP/322",
          "id": "646472a943165ae44431b66d",
          "location_id": "665829fddbae3560649e3004",
          "external_emp_code": "ETR",
          "department": {},
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "owner",
              "code": "OWNER",
              "id": "64f6cec538fe1656b5cfa8e8"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shantnu",
          "label": "Shantnu (EMP/00559)",
          "code": "EMP/00559",
          "id": "65a78536258d9520c3366376",
          "location_id": null,
          "external_emp_code": "EMP/9988",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Employee 12",
          "label": "Employee 12 (E0133)",
          "code": "E0133",
          "id": "6661b2f6ec5992ba647ce9e1",
          "location_id": "665829fddbae3560649e3004",
          "department_id": "66506c9884a4f3490b8eaade",
          "external_emp_code": "N/A",
          "department": {
              "name": "software department",
              "code": "SD0012",
              "id": "66506c9884a4f3490b8eaade"
          },
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "showroom manager",
              "code": "SHOWROOM_MANAGER",
              "id": "64f6cf4d38fe1656b5cfa8eb"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shivam",
          "label": "Shivam (EMP506)",
          "code": "EMP506",
          "id": "665880ecf23a92946713a775",
          "location_id": "665829fddbae3560649e3004",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "dbsjns",
          "label": "dbsjns (BEB3B3B3)",
          "code": "BEB3B3B3",
          "id": "663dae618e8138879cb13f54",
          "location_id": "661f615b0c3f7e02a4fa9805",
          "external_emp_code": "DBN3N3",
          "department": {},
          "location": {
              "name": "warehouse",
              "name_hi": "Warehouse",
              "code": "LKT66",
              "type": "WAREHOUSE",
              "address": "plot no 3",
              "city": "CHDD",
              "contact": "8989898988",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "661f615b0c3f7e02a4fa9805"
          },
          "role": {
              "name": "test",
              "code": "TEST",
              "id": "660b9ef88607b69cab207598"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Ramratan Yadav",
          "label": "Ramratan Yadav (DR0050)",
          "code": "DR0050",
          "id": "65fd6c54862d456c374c1bb6",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "driver",
              "code": "DRIVER",
              "id": "65fa833779acd1b808ff867a"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Nand Lal",
          "label": "Nand Lal (AD0122)",
          "code": "AD0122",
          "id": "65fd6c56862d456c374c1d66",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "AKBAR ALI",
          "label": "AKBAR ALI (SA0170)",
          "code": "SA0170",
          "id": "65fd6c56862d456c374c1e7e",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "ANIL",
          "label": "ANIL (SA0164)",
          "code": "SA0164",
          "id": "65fd6c56862d456c374c1e5a",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "ddsf",
          "label": "ddsf (SDFSF)",
          "code": "SDFSF",
          "id": "66753850bec419446f88d4b6",
          "location_id": "66548597a182a5523a338c6a",
          "external_emp_code": "SDFDSF",
          "department": {},
          "location": {
              "name": "location 122",
              "name_hi": "location",
              "code": "4R55",
              "type": "FACTORY",
              "address": "151, sector 8, panchkula, haryana 134109, india",
              "city": "loc",
              "contact": "",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "66548597a182a5523a338c6a"
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Akshay",
          "label": "Akshay (EMP511)",
          "code": "EMP511",
          "id": "6658837af23a92946713a7b6",
          "location_id": "665829fddbae3560649e3004",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Kumar",
          "label": "Kumar (EMP/2020)",
          "code": "EMP/2020",
          "id": "6458a5d18c8b4d16b048fd32",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1683531217889_demoim.jfif",
          "status": "ACTIVE"
      },
      {
          "name": "Vishal",
          "label": "Vishal ()",
          "code": "",
          "id": "6453500755d19f64d3b0acf9",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1683181571773_IMG_20210315_091959.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Pankaj",
          "label": "Pankaj (EMP/435)",
          "code": "EMP/435",
          "id": "64a2a547385afd26c33e7013",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1688380740819_Demoim.png",
          "status": "ACTIVE"
      },
      {
          "name": "JITENDRA KUMAR BHARDAWAJ",
          "label": "JITENDRA KUMAR BHARDAWAJ (SA0184)",
          "code": "SA0184",
          "id": "65fd6c57862d456c374c1ed2",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shikhar",
          "label": "Shikhar (0000001)",
          "code": "0000001",
          "id": "657058344dac489780d01517",
          "location_id": "65683b5f033c4e8edd634c14",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "sannddd",
              "name_hi": "nnnn",
              "code": "CNNN",
              "type": "FACTORY",
              "address": "tank chowk, chandimandir cantonment, khark mangoli, panchkula, haryana 134109, india",
              "city": "cnnn",
              "contact": "8400442094",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65683b5f033c4e8edd634c14"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1701861428769_image_picker_3E4E2B82-AF0D-4E63-9386-76EE2369EDFB-3915-000005DC87C945C8.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Ravindra Kumar",
          "label": "Ravindra Kumar (PA0074)",
          "code": "PA0074",
          "id": "65fd6c55862d456c374c1c46",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Savitri Devi",
          "label": "Savitri Devi (KI0101)",
          "code": "KI0101",
          "id": "65fd6c55862d456c374c1ce8",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "female helper",
              "code": "FEMALE_HELPER",
              "id": "65fa82df79acd1b808ff8646"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Sandeep",
          "label": "Sandeep (EMP5555)",
          "code": "EMP5555",
          "id": "66742085410ba4b315ac069a",
          "location_id": "64f571a79b089f290e45d3f4",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar sigra",
              "name_hi": "क्षीर सागर सिगरा",
              "code": "KS/SR/01",
              "type": "FACTORY",
              "address": "ksheer sagar sigra, 12a, d-58, 2, sigra, varanasi, uttar pradesh 221010",
              "city": "Sigra, Varanasi",
              "contact": "0542240777",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f571a79b089f290e45d3f4"
          },
          "role": {
              "name": "factory",
              "code": "FACTORY",
              "id": "64fee745b2ea36c1b9476af2"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Nitin Kumar",
          "label": "Nitin Kumar (EMP/118)",
          "code": "EMP/118",
          "id": "64fee7dfb2ea36c1b9476b09",
          "location_id": "64f5840f9b089f290e45d703",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar punjab",
              "name_hi": "क्षीर सागर पंजाब",
              "code": "KS/PN/09",
              "type": "FACTORY",
              "address": "kharar, punjab",
              "city": "Punjab",
              "contact": "8894228604",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f5840f9b089f290e45d703"
          },
          "role": {
              "name": "factory",
              "code": "FACTORY",
              "id": "64fee745b2ea36c1b9476af2"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Kaushal Keshari",
          "label": "Kaushal Keshari (LO0103)",
          "code": "LO0103",
          "id": "65fd6c55862d456c374c1cf4",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "ISHU",
          "label": "ISHU (SA0195)",
          "code": "SA0195",
          "id": "65fd6c57862d456c374c1f0a",
          "location_id": "65fad482141d532b7effa82d",
          "department_id": "65fd2d01141d532b7effafe7",
          "external_emp_code": "N/A",
          "department": {
              "name": "ko",
              "code": "KO",
              "id": "65fd2d01141d532b7effafe7"
          },
          "location": {
              "name": "ksheer sagar chitaipur",
              "name_hi": "Ksheer Sagar Chitaipur",
              "code": "KS02",
              "type": "SHOWROOM",
              "address": "chitaipur , varanasi",
              "city": "varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad482141d532b7effa82d"
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Brijesh Yadav",
          "label": "Brijesh Yadav (KA0083)",
          "code": "KA0083",
          "id": "65fd6c55862d456c374c1c78",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Harivant Kumar",
          "label": "Harivant Kumar (AD0120)",
          "code": "AD0120",
          "id": "65fd6c56862d456c374c1d5b",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Vijay Bahadur Yadav",
          "label": "Vijay Bahadur Yadav (AD0133)",
          "code": "AD0133",
          "id": "65fd6c56862d456c374c1da8",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Dinesh Lal Yadav",
          "label": "Dinesh Lal Yadav (AD0119)",
          "code": "AD0119",
          "id": "65fd6c56862d456c374c1d50",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shivam ",
          "label": "Shivam  (EMP/9999)",
          "code": "EMP/9999",
          "id": "64895da613358717ee78b3cf",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1686724006052_Demoim.png",
          "status": "ACTIVE"
      },
      {
          "name": "BACHCHE LAL",
          "label": "BACHCHE LAL (CA0144)",
          "code": "CA0144",
          "id": "65fd6c56862d456c374c1de2",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "cashier",
              "code": "CASHIER",
              "id": "65facd86141d532b7effa803"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shantnu",
          "label": "Shantnu (EMP/3200)",
          "code": "EMP/3200",
          "id": "64a2a9f9385afd26c33e7070",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Arpit",
          "label": "Arpit (EMP/123456)",
          "code": "EMP/123456",
          "id": "667564e8d6b43b68c1536485",
          "location_id": "665829fddbae3560649e3004",
          "department_id": "66506c9884a4f3490b8eaade",
          "external_emp_code": "N/A",
          "department": {
              "name": "software department",
              "code": "SD0012",
              "id": "66506c9884a4f3490b8eaade"
          },
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "owner",
              "code": "OWNER",
              "id": "64f6cec538fe1656b5cfa8e8"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Gama Yadav",
          "label": "Gama Yadav (CK0036)",
          "code": "CK0036",
          "id": "65fd6c54862d456c374c1b5e",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "head chef",
              "code": "HEAD_CHEF",
              "id": "65fa850f79acd1b808ff8706"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "AMIT CHATTERJEE",
          "label": "AMIT CHATTERJEE (SA0172)",
          "code": "SA0172",
          "id": "65fd6c57862d456c374c1e8a",
          "location_id": "665829fddbae3560649e3004",
          "department_id": "6650205529bedd09676287b4",
          "external_emp_code": "N/A",
          "department": {
              "name": "accountanttt",
              "code": "ACC2",
              "id": "6650205529bedd09676287b4"
          },
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Rajat",
          "label": "Rajat (EMP/121)",
          "code": "EMP/121",
          "id": "64ff18cab2ea36c1b9476ea4",
          "location_id": "64f57cf29b089f290e45d64d",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar lahartara",
              "name_hi": "क्षीर सागर लहरतारा",
              "code": "KS/SR/05",
              "type": "SHOWROOM",
              "address": "varanasi movies, golghar, bazardiha, maheshpur, varanasi, uttar pradesh 221006",
              "city": "Lahartara Boulia, Varanasi",
              "contact": "0542237168",
              "landline_number": null,
              "fssai_number": "287438274",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f57cf29b089f290e45d64d"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "RAJA GUPTA",
          "label": "RAJA GUPTA (SA0143)",
          "code": "SA0143",
          "id": "65fd6c56862d456c374c1ddd",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Ashok Kumar Yadav",
          "label": "Ashok Kumar Yadav (CH0017)",
          "code": "CH0017",
          "id": "65fd6c54862d456c374c1aec",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Ayush",
          "label": "Ayush (EMP512)",
          "code": "EMP512",
          "id": "665883e7f23a92946713a7c4",
          "location_id": "665829fddbae3560649e3004",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "showroom manager",
              "code": "SHOWROOM_MANAGER",
              "id": "64f6cf4d38fe1656b5cfa8eb"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "RAVI GUPTA",
          "label": "RAVI GUPTA (SA0158)",
          "code": "SA0158",
          "id": "65fd6c56862d456c374c1e36",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shakuntala Devi",
          "label": "Shakuntala Devi (CK0041)",
          "code": "CK0041",
          "id": "65fd6c54862d456c374c1b79",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "female helper",
              "code": "FEMALE_HELPER",
              "id": "65fa82df79acd1b808ff8646"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "arsh",
          "label": "arsh (EMP/456)",
          "code": "EMP/456",
          "id": "659654cbfbe83b5628409bdf",
          "location_id": "65682d50033c4e8edd634b5f",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "1sand",
              "name_hi": "12Snd",
              "code": "12LOC",
              "type": "WAREHOUSE",
              "address": "pv5p+fph, sector 32, birghaghar, haryana 134109, india",
              "city": "12lo",
              "contact": "8887756098",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65682d50033c4e8edd634b5f"
          },
          "role": {
              "name": "factory",
              "code": "FACTORY",
              "id": "64fee745b2ea36c1b9476af2"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "RATAN VERMA",
          "label": "RATAN VERMA (SA0159)",
          "code": "SA0159",
          "id": "65fd6c56862d456c374c1e3d",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "PRADEEP KUMAR",
          "label": "PRADEEP KUMAR (SA0151)",
          "code": "SA0151",
          "id": "65fd6c56862d456c374c1e0c",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Prince kumar",
          "label": "Prince kumar (EMP/3)",
          "code": "EMP/3",
          "id": "645b5869fd0712fff1b2bbd1",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1683708009583_demoim.jfif",
          "status": "ACTIVE"
      },
      {
          "name": "Sushila Devi",
          "label": "Sushila Devi (MA0061)",
          "code": "MA0061",
          "id": "65fd6c54862d456c374c1bf8",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "female helper",
              "code": "FEMALE_HELPER",
              "id": "65fa82df79acd1b808ff8646"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Ajay Kumar",
          "label": "Ajay Kumar (OF0063)",
          "code": "OF0063",
          "id": "65fd6c54862d456c374c1c04",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Ravindra Yadav",
          "label": "Ravindra Yadav (DG0045)",
          "code": "DG0045",
          "id": "65fd6c54862d456c374c1b90",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Rahul",
          "label": "Rahul (EMP555)",
          "code": "EMP555",
          "id": "661e385c0c3f7e02a4fa8d74",
          "location_id": "661f615b0c3f7e02a4fa9805",
          "department_id": "660bb1f88607b69cab2077a5",
          "external_emp_code": "EXT555",
          "department": {
              "name": "dept ss",
              "code": "SS2",
              "id": "660bb1f88607b69cab2077a5"
          },
          "location": {
              "name": "warehouse",
              "name_hi": "Warehouse",
              "code": "LKT66",
              "type": "WAREHOUSE",
              "address": "plot no 3",
              "city": "CHDD",
              "contact": "8989898988",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "661f615b0c3f7e02a4fa9805"
          },
          "role": {
              "name": "showroom manager",
              "code": "SHOWROOM_MANAGER",
              "id": "64f6cf4d38fe1656b5cfa8eb"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Santram Yadav",
          "label": "Santram Yadav (OF0067)",
          "code": "OF0067",
          "id": "65fd6c55862d456c374c1c1c",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Sushila Devi",
          "label": "Sushila Devi (MA0060)",
          "code": "MA0060",
          "id": "65fd6c54862d456c374c1bf2",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "female helper",
              "code": "FEMALE_HELPER",
              "id": "65fa82df79acd1b808ff8646"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Umashankar Paswan",
          "label": "Umashankar Paswan (CH0035)",
          "code": "CH0035",
          "id": "65fd6c54862d456c374c1b58",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "ARYAN SONI",
          "label": "ARYAN SONI (CA0138)",
          "code": "CA0138",
          "id": "65fd6c56862d456c374c1dc2",
          "location_id": "65fad482141d532b7effa82d",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chitaipur",
              "name_hi": "Ksheer Sagar Chitaipur",
              "code": "KS02",
              "type": "SHOWROOM",
              "address": "chitaipur , varanasi",
              "city": "varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad482141d532b7effa82d"
          },
          "role": {
              "name": "cashier",
              "code": "CASHIER",
              "id": "65facd86141d532b7effa803"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Pankaj kumar",
          "label": "Pankaj kumar (EMP/010)",
          "code": "EMP/010",
          "id": "660ba5138607b69cab2075c7",
          "location_id": "660bb1d18607b69cab207798",
          "department_id": "660bb1f88607b69cab2077a5",
          "external_emp_code": "N/A",
          "department": {
              "name": "dept ss",
              "code": "SS2",
              "id": "660bb1f88607b69cab2077a5"
          },
          "location": {
              "name": "ksheer sagar harsi",
              "name_hi": "क्षीर सागर हारसी",
              "code": "KS004",
              "type": "SHOWROOM",
              "address": "ks kangra",
              "city": "KANGRA",
              "contact": "",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "660bb1d18607b69cab207798"
          },
          "role": {
              "name": "showroom manager",
              "code": "SHOWROOM_MANAGER",
              "id": "64f6cf4d38fe1656b5cfa8eb"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Khushi",
          "label": "Khushi (EMP517)",
          "code": "EMP517",
          "id": "6658859df23a92946713a80d",
          "location_id": "665829fddbae3560649e3004",
          "department_id": "66506c9884a4f3490b8eaade",
          "external_emp_code": "N/A",
          "department": {
              "name": "software department",
              "code": "SD0012",
              "id": "66506c9884a4f3490b8eaade"
          },
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "KAMLESH KUMAR",
          "label": "KAMLESH KUMAR (SA0188)",
          "code": "SA0188",
          "id": "65fd6c57862d456c374c1eee",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "SHIVANSHU GUPTA",
          "label": "SHIVANSHU GUPTA (SA0146)",
          "code": "SA0146",
          "id": "65fd6c56862d456c374c1dee",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Test",
          "label": "Test (TEST)",
          "code": "TEST",
          "id": "6675af05d6b43b68c1536af3",
          "location_id": "665829fddbae3560649e3004",
          "external_emp_code": "112",
          "department": {},
          "location": {
              "name": "location chandigarh",
              "name_hi": "Location chandigarh",
              "code": "1111",
              "type": "SHOWROOM",
              "address": "chandigarh, india",
              "city": "chandigarh",
              "contact": "7814863549",
              "landline_number": "6756765",
              "fssai_number": "13243243",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "665829fddbae3560649e3004"
          },
          "role": {
              "name": "owner",
              "code": "OWNER",
              "id": "64f6cec538fe1656b5cfa8e8"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "CHANDRA PRAKASH VERMA",
          "label": "CHANDRA PRAKASH VERMA (CA0149)",
          "code": "CA0149",
          "id": "65fd6c56862d456c374c1e05",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "cashier",
              "code": "CASHIER",
              "id": "65facd86141d532b7effa803"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Hari ",
          "label": "Hari  (EMP/900)",
          "code": "EMP/900",
          "id": "64e893f4ff86f5739c50d203",
          "location_id": "64f57cf29b089f290e45d64d",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar lahartara",
              "name_hi": "क्षीर सागर लहरतारा",
              "code": "KS/SR/05",
              "type": "SHOWROOM",
              "address": "varanasi movies, golghar, bazardiha, maheshpur, varanasi, uttar pradesh 221006",
              "city": "Lahartara Boulia, Varanasi",
              "contact": "0542237168",
              "landline_number": null,
              "fssai_number": "287438274",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f57cf29b089f290e45d64d"
          },
          "role": {
              "name": "owner",
              "code": "OWNER",
              "id": "64f6cec538fe1656b5cfa8e8"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Fagnu Yadav",
          "label": "Fagnu Yadav (CH0019)",
          "code": "CH0019",
          "id": "65fd6c54862d456c374c1af8",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "ASHISH KUMAR GUPAT",
          "label": "ASHISH KUMAR GUPAT (SA0196)",
          "code": "SA0196",
          "id": "65fd6c57862d456c374c1f0b",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Rahul kumar",
          "label": "Rahul kumar (EMP/321)",
          "code": "EMP/321",
          "id": "645b32b2fd0712fff1b2bb01",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1683698354138_demoim.jfif",
          "status": "ACTIVE"
      },
      {
          "name": "Deepak Yadav",
          "label": "Deepak Yadav (DR0048)",
          "code": "DR0048",
          "id": "65fd6c54862d456c374c1bab",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "driver",
              "code": "DRIVER",
              "id": "65fa833779acd1b808ff867a"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Bachau Lal",
          "label": "Bachau Lal (LO0102)",
          "code": "LO0102",
          "id": "65fd6c55862d456c374c1cee",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "ANKIT",
          "label": "ANKIT (SA0154)",
          "code": "SA0154",
          "id": "65fd6c56862d456c374c1e22",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Sagar Kumar",
          "label": "Sagar Kumar (EMP/00111)",
          "code": "EMP/00111",
          "id": "6654443149e27a36406d1e26",
          "location_id": "66542d5c49e27a36406d172e",
          "external_emp_code": "EXT33",
          "department": {},
          "location": {
              "name": "ksheer sagar hp",
              "name_hi": "KSHEER SAGAR hp",
              "code": "LK0011",
              "type": "SHOWROOM",
              "address": "haryana, sco -42, dariya reserved forest, sector -11, panchkula, chandigarh, haryana 134109, india",
              "city": "KANGRA",
              "contact": "",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "66542d5c49e27a36406d172e"
          },
          "role": {
              "name": "manager role",
              "code": "MANAGER_ROLE",
              "id": "665421a1e335f634a958d4a8"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Sachin Kumar",
          "label": "Sachin Kumar (EMP/2391)",
          "code": "EMP/2391",
          "id": "64e5a99bdc7bbb267d5130c7",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "SATYAPRAKASH RAV",
          "label": "SATYAPRAKASH RAV (SA0180)",
          "code": "SA0180",
          "id": "65fd6c57862d456c374c1ebe",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shubhankar Sharma",
          "label": "Shubhankar Sharma (EMP/007)",
          "code": "EMP/007",
          "id": "6464ebac90b11c87de30ac8f",
          "location_id": "64f57cf29b089f290e45d64d",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar lahartara",
              "name_hi": "क्षीर सागर लहरतारा",
              "code": "KS/SR/05",
              "type": "SHOWROOM",
              "address": "varanasi movies, golghar, bazardiha, maheshpur, varanasi, uttar pradesh 221006",
              "city": "Lahartara Boulia, Varanasi",
              "contact": "0542237168",
              "landline_number": null,
              "fssai_number": "287438274",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f57cf29b089f290e45d64d"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "External Employee ",
          "label": "External Employee  (EMP/6000)",
          "code": "EMP/6000",
          "id": "65a78bd4258d9520c33663be",
          "location_id": "6502ad3506130476176bf106",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar palampur",
              "name_hi": "क्षीर सागर पालमपुर",
              "code": "KS/PL/21",
              "type": "SHOWROOM",
              "address": "palampur, himachal pradesh, india",
              "city": "Palampur",
              "contact": "9805670126",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "6502ad3506130476176bf106"
          },
          "role": {
              "name": "others",
              "code": "OTHERS",
              "id": "64f6cf5738fe1656b5cfa8ee"
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1705479123989_scaled_1000053304.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Honey",
          "label": "Honey (emp/588)",
          "code": "emp/588",
          "id": "645a17df231ee5ed1c94b01d",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1683625951383_new.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Sandeep Yadav",
          "label": "Sandeep Yadav (CH0031)",
          "code": "CH0031",
          "id": "65fd6c54862d456c374c1b44",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "head chef",
              "code": "HEAD_CHEF",
              "id": "65fa850f79acd1b808ff8706"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "VISHAKHA KUMARI",
          "label": "VISHAKHA KUMARI (CA0183)",
          "code": "CA0183",
          "id": "65fd6c57862d456c374c1ecc",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "cashier",
              "code": "CASHIER",
              "id": "65facd86141d532b7effa803"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Sachin",
          "label": "Sachin (EMP/301)",
          "code": "EMP/301",
          "id": "6458c49a8c8b4d16b048fe2b",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1683539098732_demoim.jfif",
          "status": "ACTIVE"
      },
      {
          "name": "Ramashish Yadav",
          "label": "Ramashish Yadav (CK0040)",
          "code": "CK0040",
          "id": "65fd6c54862d456c374c1b72",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "head chef",
              "code": "HEAD_CHEF",
              "id": "65fa850f79acd1b808ff8706"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Rajan",
          "label": "Rajan (EMP/191)",
          "code": "EMP/191",
          "id": "651f9ad44ea5b673869324e0",
          "location_id": "64f5835c9b089f290e45d6f6",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar delhi",
              "name_hi": "क्षीर सागर दिल्ली",
              "code": "KS/DL/08",
              "type": "SHOWROOM",
              "address": "connaught place, new delhi, delhi",
              "city": "Delhi",
              "contact": "9809562123",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64f5835c9b089f290e45d6f6"
          },
          "role": {
              "name": "showroom manager",
              "code": "SHOWROOM_MANAGER",
              "id": "64f6cf4d38fe1656b5cfa8eb"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shantnu",
          "label": "Shantnu (EMP/3211)",
          "code": "EMP/3211",
          "id": "64a2a9e9385afd26c33e706d",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shivshankar",
          "label": "Shivshankar (LO0105)",
          "code": "LO0105",
          "id": "65fd6c55862d456c374c1d00",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shivam Rajput",
          "label": "Shivam Rajput (EMP/139)",
          "code": "EMP/139",
          "id": "6501a1e806130476176beaa9",
          "location_id": "64fedd3cb2ea36c1b9476ab4",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar hamirpur",
              "name_hi": "क्षीर सागर हमीरपुर",
              "code": "HM/03",
              "type": "SHOWROOM",
              "address": "anu, hamirpur, himachal pradesh, india",
              "city": "Hamirpur",
              "contact": "9876543456",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "64fedd3cb2ea36c1b9476ab4"
          },
          "role": {
              "name": "showroom manager",
              "code": "SHOWROOM_MANAGER",
              "id": "64f6cf4d38fe1656b5cfa8eb"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "External Employee Two",
          "label": "External Employee Two (EMP/8888)",
          "code": "EMP/8888",
          "id": "65a7f298258d9520c336643a",
          "location_id": "652f71b913342aa7f0e37051",
          "external_emp_code": "EXTEMP8888",
          "department": {},
          "location": {
              "name": "ksheer sagar kotlu",
              "name_hi": "क्षीर सागर कोटलू",
              "code": "KT/02",
              "type": "FACTORY",
              "address": "kotlu, himachal pradesh, india",
              "city": "KOTLU",
              "contact": "9876543245",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "652f71b913342aa7f0e37051"
          },
          "role": {
              "name": "hr",
              "code": "HR",
              "id": "6501954a06130476176be845"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "NOOR ANWAR",
          "label": "NOOR ANWAR (CA0182)",
          "code": "CA0182",
          "id": "65fd6c57862d456c374c1ec6",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "cashier",
              "code": "CASHIER",
              "id": "65facd86141d532b7effa803"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Shivpratap Yadav",
          "label": "Shivpratap Yadav (AD0134)",
          "code": "AD0134",
          "id": "65fd6c56862d456c374c1daa",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Pankaj Yadav",
          "label": "Pankaj Yadav (KA0089)",
          "code": "KA0089",
          "id": "65fd6c55862d456c374c1ca0",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "head chef",
              "code": "HEAD_CHEF",
              "id": "65fa850f79acd1b808ff8706"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Vijendra Yadav",
          "label": "Vijendra Yadav (KA0094)",
          "code": "KA0094",
          "id": "65fd6c55862d456c374c1cba",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "head chef",
              "code": "HEAD_CHEF",
              "id": "65fa850f79acd1b808ff8706"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Ramu Vishwakarma",
          "label": "Ramu Vishwakarma (LO0104)",
          "code": "LO0104",
          "id": "65fd6c55862d456c374c1cfa",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Sagar",
          "label": "Sagar (AD0129)",
          "code": "AD0129",
          "id": "65fd6c56862d456c374c1d90",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "helper",
              "code": "HELPER",
              "id": "65fa852479acd1b808ff8709"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Arun Panday",
          "label": "Arun Panday (AD0111)",
          "code": "AD0111",
          "id": "65fd6c55862d456c374c1d20",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "name": "security head",
              "code": "SECURITY_HEAD",
              "id": "65fa83ac79acd1b808ff8686"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "SANDEEP KUMAR",
          "label": "SANDEEP KUMAR (SA0175)",
          "code": "SA0175",
          "id": "65fd6c57862d456c374c1ea0",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Karan singh",
          "label": "Karan singh (EMP/599)",
          "code": "EMP/599",
          "id": "645a04b32b3289d121ec6d06",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1683621043291_new.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Rahul",
          "label": "Rahul (EMP/550)",
          "code": "EMP/550",
          "id": "6458df0b837902639b474ca3",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/employee_images/1683545867897_new.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Aryan",
          "label": "Aryan (EMP/722)",
          "code": "EMP/722",
          "id": "646b5996215356bb0b9a3180",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Virat Kholi",
          "label": "Virat Kholi (EMP1212)",
          "code": "EMP1212",
          "id": "6642dcd7bcac1b33bcfb59cc",
          "location_id": "661f615b0c3f7e02a4fa9805",
          "department_id": "660bb1f88607b69cab2077a5",
          "external_emp_code": "EMP1122",
          "department": {
              "name": "dept ss",
              "code": "SS2",
              "id": "660bb1f88607b69cab2077a5"
          },
          "location": {
              "name": "warehouse",
              "name_hi": "Warehouse",
              "code": "LKT66",
              "type": "WAREHOUSE",
              "address": "plot no 3",
              "city": "CHDD",
              "contact": "8989898988",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "661f615b0c3f7e02a4fa9805"
          },
          "role": {
              "name": "showroom manager",
              "code": "SHOWROOM_MANAGER",
              "id": "64f6cf4d38fe1656b5cfa8eb"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "MAYANK KESHARI",
          "label": "MAYANK KESHARI (SA0145)",
          "code": "SA0145",
          "id": "65fd6c56862d456c374c1de9",
          "location_id": null,
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": null
          },
          "role": {
              "name": "salesman",
              "code": "SALESMAN",
              "id": "65facd77141d532b7effa800"
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      },
      {
          "name": "Babu H K",
          "label": "Babu H K (AD0113)",
          "code": "AD0113",
          "id": "65fd6c55862d456c374c1d30",
          "location_id": "65fad1a3141d532b7effa823",
          "external_emp_code": "N/A",
          "department": {},
          "location": {
              "name": "ksheer sagar chandpur",
              "name_hi": "Ksheer Sagar Chandpur",
              "code": "KS01",
              "type": "SHOWROOM",
              "address": "ksheer sagar, sundarpur, newada, varanasi, uttar pradesh, india",
              "city": "Varanasi",
              "contact": "7814863549",
              "landline_number": "",
              "gstin": "09AAECK7896D1Z2",
              "cin": "U74120UP2012PTC050510",
              "state_code": "09",
              "id": "65fad1a3141d532b7effa823"
          },
          "role": {
              "id": null
          },
          "image": "http://91.205.173.97:8586/public/logo/default_image.jpg",
          "status": "ACTIVE"
      }
  ]
}

const initForm={
    location_aplly:[]
}
const useAddEmployeeTable = ({ handleClose }) => {
  const [selected, setSelected] = useState([]);
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [totalShow, setTotalShow] = useState(10);
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const [form, setForm]=useState({...initForm});
  const [errorData, setErrorData] = useState({});
  const [employees, setEmployees] = useState([]);
  const [allSelect, setAllSelect]=useState(false);
    useEffect(() => {
    serviceGetList(["EMPLOYEES"]).then((res) => {
      if (!res.error) {
        setEmployees(res?.data?.EMPLOYEES);
      }
    });
  }, []);

  const renderList = useCallback(() => {
    serviceGetListData(["EMPLOYEES"]).then((res) => {
      if (!res.error) {
        const data = res?.data?.EMPLOYEES;
        console.log("data", data);
        setAllData(data);
        setData(data);
      }else{
        setAllData(employeStaticData?.EMPLOYEES);
        setData(employeStaticData?.EMPLOYEES);
      }
    });
  }, []);
  useEffect(() => {
    renderList();
  }, []);

  useEffect(() => {
    // initData();
    _processData();
  }, [currentPage, data]);

  const _processData = () => {
    const from = currentPage * totalShow - totalShow;
    let to = currentPage * totalShow;

    if (from <= data.length) {
      to = to <= data.length ? to : data.length;
      setCurrentData(data.slice(from, to));
    }
  };

  const handlePageChange = useCallback(
    (type) => {
      console.log("_handlePageChange", type);
      if (Math.ceil(data.length / totalShow) >= type + 1) {
        setCurrentPage(type + 1);
        _processData();
      }
    },
    [_processData, setCurrentPage, data, totalShow]
  );

  const queryFilter = useCallback((key, value) => {
    console.log("_queryFilter", key, value);
  }, []);

  const handleFilterDataChange = useCallback(
    (value) => {
      console.log("_handleFilterDataChange", value);
      queryFilter("FILTER_DATA", value);
    },
    [queryFilter]
  );
  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
      if (fieldName === "location_aplly") {
        t[fieldName] = text;
      }  else {
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );
  const handleSearchValueChange = useCallback(
    (value) => {
      console.log("_handleSearchValueChange", value);
      queryFilter("SEARCH_TEXT", value);
      if (value) {
        const tempData = allData.filter((val) => {
          if (
            val?.name?.match(new RegExp(value, "ig")) ||
            val?.code?.match(new RegExp(value, "ig"))
          ) {
            return val;
          }
        });
        setData(tempData);
      } else {
        setData(allData);
      }
    },
    [queryFilter, _processData, data, setData, allData]
  );

  const handleSortOrderChange = useCallback((row, order) => {
    console.log(`handleSortOrderChange key:${row} order: ${order}`);
  }, []);

  const handleRowSize = (page) => {
    console.log(page);
  };
  console.log(">>>>>", selected);

  const handleCheckbox = useCallback(
    (data) => {
      const tempSelected = JSON.parse(JSON.stringify(selected));
      const tempIndex = tempSelected.findIndex((sel) => sel.id === data.id);
      if (tempIndex >= 0) {
        tempSelected.splice(tempIndex, 1);
      } else {
        tempSelected.push(data);
      }
      setSelected(tempSelected);
    },
    [selected, setSelected]
  );
  const handleSubmit = useCallback(() => {
    if (selected?.length > 0) {
      if (!isSubmitting) {
        setIsSubmitting(true);
        const getEmpID = selected?.map((item) => item?.id);
        let req = serviceAddEmployeeShift;
        req({
          shift_id: id,
          employee_ids: getEmpID ? getEmpID : [],
        }).then((res) => {
          if (!res.error) {
            handleClose();
            // renderList();
            // SnackbarUtils.success("Added successfully");
          } else {
            // SnackbarUtils.error(res?.message);
          }
          setIsSubmitting(false);
        });
      }
    } else {
    //   SnackbarUtils.error("Please select atlest one Employee");
    }
  }, [selected, setSelected, isSubmitting, setIsSubmitting, handleClose]);

  return {
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    handleCheckbox,
    selected,
    currentPage,
    currentData,
    data,
    allData,
    isFetching,
    isSubmitting,
    handleSubmit,
    changeTextData,
    form,
    errorData,
    employees,
    allSelect,
    setAllSelect

  };
};

export default useAddEmployeeTable;
