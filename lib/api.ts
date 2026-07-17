import axios from "axios";

const API_BASE = "https://nigeria-past-questions2.p.rapidapi.com/api/metrics";
const API_HEADERS = {
  "x-rapidapi-host": "nigeria-past-questions2.p.rapidapi.com",
  // You MUST also include your RapidAPI key:
  "x-rapidapi-key": process.env.RAPIDAPI_KEY as string
};

export async function getSubjectsForYear(year: string) {
  const res = await axios.get(`${API_BASE}/subjects-available-for/${year}`, {
    headers: API_HEADERS
  });
  return res.data;
}

export async function listSubjects() {
  const res = await axios.get(`${API_BASE}/list-subjects`, {
    headers: API_HEADERS
  });
  return res.data;
}

export async function getYearsForSubject(subject: string) {
  const res = await axios.get(`${API_BASE}/years-available-for/${subject}`, {
    headers: API_HEADERS
  });
  return res.data;
}
