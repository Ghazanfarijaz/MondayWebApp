const convertDateFormate = ({ date, format }) => {
  // Try to parse the date
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) return "N/A";

  const day = String(parsedDate.getDate()).padStart(2, "0");
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = parsedDate.getFullYear();

  switch (format) {
    case "MM-DD-YYYY":
      return `${month}-${day}-${year}`;
    case "YYYY-MM-DD":
      return `${year}-${month}-${day}`;
    case "DD-MM-YYYY":
      return `${day}-${month}-${year}`;
    case "DD-MMM-YYYY":
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const monthName = monthNames[parsedDate.getMonth()];
      return `${day}-${monthName}-${year}`;
    default:
      return `${day}-${month}-${year}`;
  }
};

export default convertDateFormate;
