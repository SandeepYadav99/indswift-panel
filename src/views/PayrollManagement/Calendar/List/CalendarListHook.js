import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { calenderData } from "../../helper/calenderData";

const datas =[
  {
      "_id": "66868cd091b36d097084fdcd",
      "holiday_type": "GAZETTED",
      "type": "HALF_DAY",
      "applies_locations": "ALL_LOCATIONS",
      "excluded_employees": [],
      "name": "tes",
      "half_day_type": "FIRST_HALF",
      "start_date": "2023-11-04T18:30:00.000Z",
      "end_date": "2023-11-05T18:29:59.000Z",
      "createdAt": "2024-07-04T11:51:44.301Z",
      "updatedAt": "2024-07-04T11:52:10.301Z",
      "id": "66868cd091b36d097084fdcd",
      "startDateText": "05/11/2023",
      "endDateText": "05/11/2023",
      "createdAtText": "04/07/2024",
      "updatedAtText": "04/07/2024"
  },
  {
      "_id": "668cd232803a6fae1dff2d46",
      "holiday_type": "OPTIONAL",
      "type": "FULL_DAY",
      "applies_locations": [
          "ALL_LOCATIONS"
      ],
      "excluded_employees": [],
      "name": "task",
      "start_date": "2024-02-07T18:30:00.000Z",
      "end_date": "2024-02-08T18:29:59.000Z",
      "createdAt": "2024-07-09T06:01:22.922Z",
      "updatedAt": "2024-07-09T06:01:22.922Z",
      "id": "668cd232803a6fae1dff2d46",
      "startDateText": "08/02/2024",
      "endDateText": "08/02/2024",
      "createdAtText": "09/07/2024",
      "updatedAtText": "09/07/2024"
  },
  {
      "_id": "668b86c62c7fc5c599a64ea5",
      "holiday_type": "GAZETTED",
      "type": "FULL_DAY",
      "applies_locations": [
          "ALL_LOCATIONS"
      ],
      "excluded_employees": [],
      "name": "zumbo",
      "start_date": "2024-06-30T18:30:00.000Z",
      "end_date": "2024-07-01T18:29:59.000Z",
      "createdAt": "2024-07-08T06:27:18.625Z",
      "updatedAt": "2024-07-08T06:27:18.625Z",
      "id": "668b86c62c7fc5c599a64ea5",
      "startDateText": "01/07/2024",
      "endDateText": "01/07/2024",
      "createdAtText": "08/07/2024",
      "updatedAtText": "08/07/2024"
  },
  {
      "_id": "668e1066e187d86fa9b6f752",
      "holiday_type": "RESTRICTED",
      "type": "FULL_DAY",
      "applies_locations": [
          "ALL_LOCATIONS"
      ],
      "excluded_employees": [],
      "name": "2 julyy",
      "start_date": "2024-07-01T18:30:00.000Z",
      "end_date": "2024-07-02T18:29:59.000Z",
      "createdAt": "2024-07-10T04:39:02.731Z",
      "updatedAt": "2024-07-10T04:42:06.129Z",
      "id": "668e1066e187d86fa9b6f752",
      "startDateText": "02/07/2024",
      "endDateText": "02/07/2024",
      "createdAtText": "10/07/2024",
      "updatedAtText": "10/07/2024"
  },
  {
      "_id": "66868fbf91b36d097084fe3c",
      "holiday_type": "GAZETTED",
      "type": "FULL_DAY",
      "applies_locations": "SHOWROOM",
      "excluded_employees": [],
      "name": "scsacas",
      "start_date": "2024-07-03T18:30:00.000Z",
      "end_date": "2024-07-04T18:29:59.000Z",
      "createdAt": "2024-07-04T12:04:15.401Z",
      "updatedAt": "2024-07-04T12:04:25.635Z",
      "id": "66868fbf91b36d097084fe3c",
      "startDateText": "04/07/2024",
      "endDateText": "04/07/2024",
      "createdAtText": "04/07/2024",
      "updatedAtText": "04/07/2024"
  },
  {
      "_id": "668cdd2e803a6fae1dff2dcc",
      "holiday_type": "OPTIONAL",
      "type": "FULL_DAY",
      "applies_locations": [
          "ALL_LOCATIONS"
      ],
      "excluded_employees": [],
      "name": "5 july",
      "start_date": "2024-07-04T18:30:00.000Z",
      "end_date": "2024-07-05T18:29:59.000Z",
      "createdAt": "2024-07-09T06:48:14.192Z",
      "updatedAt": "2024-07-09T06:48:29.373Z",
      "id": "668cdd2e803a6fae1dff2dcc",
      "startDateText": "05/07/2024",
      "endDateText": "05/07/2024",
      "createdAtText": "09/07/2024",
      "updatedAtText": "09/07/2024"
  },
  {
      "_id": "6683be92b9ba006c98c78ddd",
      "holiday_type": "RESTRICTED",
      "type": "HALF_DAY",
      "applies_locations": [
          "SHOWROOM"
      ],
      "excluded_employees": [
          "64da230e4b7da7c3ddcc80df"
      ],
      "name": "18 date",
      "start_date": "2024-07-10T18:30:00.000Z",
      "end_date": "2024-07-11T18:29:59.000Z",
      "createdAt": "2024-07-02T08:47:14.721Z",
      "updatedAt": "2024-07-09T06:07:41.145Z",
      "half_day_type": "SECOND_HALF",
      "id": "6683be92b9ba006c98c78ddd",
      "startDateText": "11/07/2024",
      "endDateText": "11/07/2024",
      "createdAtText": "02/07/2024",
      "updatedAtText": "09/07/2024"
  },
  {
      "_id": "668281c87a1f2366896b875a",
      "holiday_type": "OPTIONAL",
      "type": "FULL_DAY",
      "applies_locations": "SHOWROOM",
      "excluded_employees": [],
      "name": "new tester",
      "start_date": "2024-07-12T18:30:00.000Z",
      "end_date": "2024-07-13T18:29:59.000Z",
      "createdAt": "2024-07-01T10:15:36.461Z",
      "updatedAt": "2024-07-01T10:15:36.461Z",
      "id": "668281c87a1f2366896b875a",
      "startDateText": "13/07/2024",
      "endDateText": "13/07/2024",
      "createdAtText": "01/07/2024",
      "updatedAtText": "01/07/2024"
  },
  {
      "_id": "668d1b717d4497dcc674c5c0",
      "holiday_type": "GAZETTED",
      "type": "FULL_DAY",
      "applies_locations": [
          "ALL_LOCATIONS"
      ],
      "excluded_employees": [],
      "name": "test user",
      "start_date": "2024-07-13T18:30:00.000Z",
      "end_date": "2024-07-14T18:29:59.000Z",
      "createdAt": "2024-07-09T11:13:53.813Z",
      "updatedAt": "2024-07-09T11:14:03.189Z",
      "id": "668d1b717d4497dcc674c5c0",
      "startDateText": "14/07/2024",
      "endDateText": "14/07/2024",
      "createdAtText": "09/07/2024",
      "updatedAtText": "09/07/2024"
  },
  {
      "_id": "6683bebdb9ba006c98c78de2",
      "holiday_type": "GAZETTED",
      "type": "HALF_DAY",
      "applies_locations": "FACTORY",
      "excluded_employees": [],
      "name": "19 date",
      "start_date": "2024-07-18T18:30:00.000Z",
      "end_date": "2024-07-19T18:29:59.000Z",
      "createdAt": "2024-07-02T08:47:57.318Z",
      "updatedAt": "2024-07-02T08:47:57.318Z",
      "id": "6683bebdb9ba006c98c78de2",
      "startDateText": "19/07/2024",
      "endDateText": "19/07/2024",
      "createdAtText": "02/07/2024",
      "updatedAtText": "02/07/2024"
  },
  {
      "_id": "6685259806329e672a74a65f",
      "holiday_type": "GAZETTED",
      "type": "FULL_DAY",
      "applies_locations": "ALL_LOCATIONS",
      "excluded_employees": [],
      "name": "22",
      "start_date": "2024-07-21T18:30:00.000Z",
      "end_date": "2024-07-22T18:29:59.000Z",
      "createdAt": "2024-07-03T10:19:04.324Z",
      "updatedAt": "2024-07-03T10:19:04.324Z",
      "id": "6685259806329e672a74a65f",
      "startDateText": "22/07/2024",
      "endDateText": "22/07/2024",
      "createdAtText": "03/07/2024",
      "updatedAtText": "03/07/2024"
  },
  {
      "_id": "668b871a2c7fc5c599a64eab",
      "holiday_type": "GAZETTED",
      "type": "FULL_DAY",
      "applies_locations": [
          "SHOWROOM",
          "WAREHOUSE"
      ],
      "excluded_employees": [],
      "name": "tester 24",
      "start_date": "2024-07-22T18:30:00.000Z",
      "end_date": "2024-07-23T18:29:59.000Z",
      "createdAt": "2024-07-08T06:28:42.004Z",
      "updatedAt": "2024-07-08T06:28:42.004Z",
      "id": "668b871a2c7fc5c599a64eab",
      "startDateText": "23/07/2024",
      "endDateText": "23/07/2024",
      "createdAtText": "08/07/2024",
      "updatedAtText": "08/07/2024"
  },
  {
      "_id": "6687b168ce18f9ceeaae921d",
      "holiday_type": "GAZETTED",
      "type": "FULL_DAY",
      "applies_locations": [
          "FACTORY",
          "SHOWROOM"
      ],
      "excluded_employees": [],
      "name": "tester",
      "start_date": "2024-07-25T18:30:00.000Z",
      "end_date": "2024-07-26T18:29:59.000Z",
      "createdAt": "2024-07-05T08:40:08.707Z",
      "updatedAt": "2024-07-05T08:40:08.707Z",
      "id": "6687b168ce18f9ceeaae921d",
      "startDateText": "26/07/2024",
      "endDateText": "26/07/2024",
      "createdAtText": "05/07/2024",
      "updatedAtText": "05/07/2024"
  },
  {
      "_id": "668b88452c7fc5c599a64eb1",
      "holiday_type": "GAZETTED",
      "type": "HALF_DAY",
      "applies_locations": [
          "ALL_LOCATIONS"
      ],
      "excluded_employees": [],
      "name": "test",
      "half_day_type": "FIRST_HALF",
      "start_date": "2024-08-12T18:30:00.000Z",
      "end_date": "2024-08-13T18:29:59.000Z",
      "createdAt": "2024-07-08T06:33:41.606Z",
      "updatedAt": "2024-07-08T06:33:41.606Z",
      "id": "668b88452c7fc5c599a64eb1",
      "startDateText": "13/08/2024",
      "endDateText": "13/08/2024",
      "createdAtText": "08/07/2024",
      "updatedAtText": "08/07/2024"
  },
  {
      "_id": "668b885a2c7fc5c599a64eb5",
      "holiday_type": "OPTIONAL",
      "type": "FULL_DAY",
      "applies_locations": [
          "SHOWROOM"
      ],
      "excluded_employees": [],
      "name": "20 aug",
      "start_date": "2024-08-19T18:30:00.000Z",
      "end_date": "2024-08-20T18:29:59.000Z",
      "createdAt": "2024-07-08T06:34:02.082Z",
      "updatedAt": "2024-07-08T06:34:02.082Z",
      "id": "668b885a2c7fc5c599a64eb5",
      "startDateText": "20/08/2024",
      "endDateText": "20/08/2024",
      "createdAtText": "08/07/2024",
      "updatedAtText": "08/07/2024"
  },
  {
      "_id": "6687c938ce18f9ceeaae934a",
      "holiday_type": "GAZETTED",
      "type": "FULL_DAY",
      "applies_locations": [
          "SHOWROOM"
      ],
      "excluded_employees": [],
      "name": "againnbv",
      "start_date": "2025-07-01T18:30:00.000Z",
      "end_date": "2025-07-02T18:29:59.000Z",
      "createdAt": "2024-07-05T10:21:44.089Z",
      "updatedAt": "2024-07-05T10:22:45.144Z",
      "id": "6687c938ce18f9ceeaae934a",
      "startDateText": "02/07/2025",
      "endDateText": "02/07/2025",
      "createdAtText": "05/07/2024",
      "updatedAtText": "05/07/2024"
  }
]
function useCalendarList() {
  const [isSidePanel, setSidePanel] = useState(false);
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const [editData, setEditData] = useState(null);
  const [checkedItems, setCheckedItems] = useState({
    all: true,
    GAZETTED: true,
    RESTRICTED: true,
    OPTIONAL: true,
  });

  const renderList = useCallback(() => {
    // serviceGetCalendar({
    //   index: 1,
    //   row: "createdAt",
    //   order: "desc",
    //   query: "",
    //   query_data: null,
    // }).then((res) => {
    //   if (!res.error) {
    //     setData(res.data);
    //   }
    // });
    setData([...datas])
  }, []);
  useEffect(() => {
    renderList();
  }, []);

  const handleDateChange = (date) => {
    console.log(">>>>", date);
    setSelectedDate(date);
  };
  console.log("data", data);
  const handleCheckboxChange = useCallback(
    (event) => {
      const { name, checked } = event.target;
      if (name === "all") {
        setCheckedItems({
          all: checked,
          GAZETTED: checked,
          RESTRICTED: checked,
          OPTIONAL: checked,
        });
      } else {
        setCheckedItems({
          ...checkedItems,
          [name]: checked,
          all: false,
        });
      }
    },
    [checkedItems, setCheckedItems, data]
  );

  console.log("checkedItems", checkedItems);
  const filteredData = useMemo(() => {
    if (checkedItems?.all) {
      return data;
    } else {
      return data?.filter((item) => checkedItems[item?.holiday_type]);
    }
  }, [data, setData, checkedItems, setCheckedItems]);

  const handleSideToggle = useCallback(
    (data) => {
      setSidePanel((e) => !e);
      if (data) {
        setEditData(data);
      } else {
        setEditData(null);
      }
    },
    [setEditData, setSidePanel]
  );

  console.log("editdata", editData);
  return {
    isSidePanel,
    handleSideToggle,
    checkedItems,
    handleCheckboxChange,
    filteredData,
    selectedDate,
    handleDateChange,
    editData,
    renderList
  };
}

export default useCalendarList;
