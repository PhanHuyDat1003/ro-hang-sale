export const COLORS = {
  bg: "#FAF9F6",
  surface: "#FFFFFF",
  ink: "#16201B",
  inkSoft: "#57645D",
  primary: "#1F4B3F",
  primaryDark: "#153A30",
  accent: "#C1622D",
  line: "#E4E1D8",
  available: "#2F7D53",
  availableBg: "#E7F3EC",
  holding: "#B4811F",
  holdingBg: "#FBF1DD",
  rented: "#7C7C76",
  rentedBg: "#EFEEE9",
  stopped: "#A94B45",
  stoppedBg: "#F6E7E5",
};

export const STATUS_META = {
  "Còn phòng": { fg: COLORS.available, bg: COLORS.availableBg },
  "Đang giữ chỗ": { fg: COLORS.holding, bg: COLORS.holdingBg },
  "Đã thuê": { fg: COLORS.rented, bg: COLORS.rentedBg },
  "Ngưng khai thác": { fg: COLORS.stopped, bg: COLORS.stoppedBg },
};

export const STATUS_LIST = Object.keys(STATUS_META);
export const DISTRICTS = ["An Phú - An Khánh", "Bình Trưng Tây", "Bình Trung Đông", "Cát Lái"];

export const EMPTY_ROOM = {
  name: "",
  price: "",
  address: "",
  area: DISTRICTS[0],
  acreage: "",
  maxPeople: "",
  furniture: "",
  electricity: "",
  water: "",
  serviceFee: "",
  description: "",
  ownerPhone: "",
  ownerName: "",
  status: "Còn phòng",
  pet: false,
  washer: false,
  elevator: false,
  hours: "",
  images: [],
};
