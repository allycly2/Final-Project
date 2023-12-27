const fetchHolidays = async () => {
  try {
    const response = await fetch(
      "https://api.11holidays.com/v1/holidays?country=HK&year=2023"
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Error: " + response.status);
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export default fetchHolidays;
