export const getTextColor = (title) => {
  switch (title) {
    case "RESTRICTED":
      return "#E92828"; // Personal events color
    case "OPTIONAL":
      return "#7848CB"; // Business events color
    case "GAZETTED":
      return "#66BA27"; // Holiday events color

    default:
      return "#3174ad";
  }
};
export const getBgColor = (title) => {
  switch (title) {
    case "RESTRICTED":
      return "#FFE8E8"; // Personal events color
    case "OPTIONAL":
      return "#EADEFF"; // Business events color
    // Family events color
    case "GAZETTED":
      return "#E4FED1"; // Holiday events color

    default:
      return "#3174ad";
  }
};
export const calenderData = [
  {
    id: 1,
    type: "personal",
    title: "Meeting",
    start: new Date(2024, 6, 5, 10, 0), // Year, Month (0 indexed), Day, Hour, Minute
    end: new Date(2024, 6, 5, 12, 0),
  },
  {
    id: 2,
    type: "business",
    title: "Presentation",
    start: new Date(2024, 6, 10, 13, 0),
    end: new Date(2024, 6, 10, 15, 0),
  },
  {
    id: 3,
    type: "family",
    title: "Conference",
    start: new Date(2024, 6, 15, 9, 0),
    end: new Date(2024, 6, 15, 17, 0),
  },
  {
    id: 4,
    type: "business",
    title: "Different",
    start: new Date(2024, 6, 15, 9, 0),
    end: new Date(2024, 6, 16, 17, 0),
  },
  {
    id: 4,
    type: "holiday",
    title: "Different",
    start: new Date(2024, 6, 17, 9, 0),
    end: new Date(2024, 6, 16, 17, 0),
  },
  {
    id: 4,
    type: "holiday",
    title: "Different",
    start: new Date(2024, 6, 22, 9, 0),
    end: new Date(2024, 6, 22, 17, 0),
  },
  {
    id: 4,
    type: "family",
    title: "Lorem ispr teseter",
    start: new Date(2024, 6, 16, 9, 0),
    end: new Date(2024, 6, 16, 17, 0),
  },
  {
    id: 5,
    type: "personal",
    title: "Tester",
    start: new Date(2024, 6, 18, 9, 0),
    end: new Date(2024, 6, 19, 17, 0),
  },
  {
    id: 6,
    type: "personal",
    title: "Different",
    start: new Date(2024, 6, 17, 9, 0),
    end: new Date(2024, 6, 17, 17, 0),
  },
];
export const guestList = [
  {
    id: 1,
    label: "Raman",
    title: "Raman",
  },
  {
    id: 2,
    label: "Raj",
    title: "Raj",
  },
  {
    id: 3,
    label: "Pankaj",
    title: "Pankaj",
  },
  {
    id: 4,
    label: "Shivam",
    title: "Shivam",
  },
];
