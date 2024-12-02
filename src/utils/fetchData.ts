export const fetchData = async () => {
    const response = await fetch("/data/task-data.json");
    const data = await response.json();
    return data;
  };
  