import axios from "../../utils/axiosInstance.js";

const class_EndPoint = "/api/class";

// Create Class Function

const createClass = async (className) => {
  const response = await axios.post(
    `${class_EndPoint}/create`,
    { className: className },
    {
      headers: {},
    }
  );
  return response.data;
};

const getClasses = async () => {
  const response = await axios.get(`${class_EndPoint}/`);
  return response.data;
};

const getClassById = async (classId) => {
  const response = await axios.get(`${class_EndPoint}/:id/${classId}`, {
    headers: {},
  });
  return response.data;
};

const getClassByCode = async (classCode) => {
  const response = await axios.get(`${class_EndPoint}/code/${classCode}`);
  return response.data;
};

const getClassByName = async (className) => {
  const response = await axios.get(`${class_EndPoint}/${className}`);
  return response.data;
};

const joinClass = async (joinData) => {
  const response = await axios.post(`${class_EndPoint}/join`, joinData, {
    headers: {},
  });
  return response.data;
};

const deleteClass = async (classId) => {
  const response = await axios.delete(`${class_EndPoint}/delete/${classId}`, {
    headers: {},
  });
  return response.data;
};

export const classService = {
  createClass,
  getClasses,
  getClassById,
  getClassByCode,
  getClassByName,
  joinClass,
  deleteClass,
};
