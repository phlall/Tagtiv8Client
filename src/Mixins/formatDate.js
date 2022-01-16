import dayjs from "dayjs";
export default {
  methods: {
    formatDate(dateString) {
      const date = dayjs(dateString);
      return date.format("dddd MMMM D, YYYY");
    },
    formatDateShort(dateString) {
      const date = dayjs(dateString);
      return date.format("DD MM YYYY");
    },
    getYear(dateString) {
      const date = dayjs(dateString);
      return date.get("year").toString();
    },
    getMonth(dateString) {
      const date = dayjs(dateString);
      return date.format("MMMM");
    },
    getMonthInt(dateString) {
      const date = dayjs(dateString);
      return date.get("month");
    },
    getDay(dateString) {
      const date = dayjs(dateString);
      return date.format("dddd");
    },
    getDayInt(dateString) {
      const date = dayjs(dateString);
      return date.format("D");
    },
    getDayTime(dateString) {
      const date = dayjs(dateString);
      return date.format("dddd H:m");
    },
    getTime(dateString) {
      const date = dayjs(dateString);
      return date.format("HH:mm");
    },
  },
};
