import axios from "../../utils/axiosInstance.js";

const class_EndPoint = "api/class";

// Create Class Function

const createClass = async (classData) => {
 try {
    const response = await axios.post(`${class_EndPoint}/create`, classData, {
      headers: {},
    });
    return response.data;
  } catch (error) {
    throw new Error("Class Creation failed");
  }
};

const getClasses = async () => {
  try {
    const response = await axios.get(`${class_EndPoint}/getAll`, {
      headers: {},
    });
    return response.data;
  } catch (error) {
    throw new Error("Getting classes failed");
  }
};


const getClassById = async (classId) => {
  try {
    const response = await axios.get(`${class_EndPoint}/:id/${classId}`, {
      headers: {},
    });
    return response.data;
  } catch (error) {
    throw new Error("Getting class by ID failed");
  }
};


const getClassByCode = async (classCode) => {
  try {
    const response = await axios.get(`${class_EndPoint}/:code/${classCode}`, {
      headers: {},
    });
    return response.data;
  } catch (error) {
    throw new Error("Getting class by code failed");
  }
};

const getClassByName = async (className) => {
  try {
    const response = await axios.get(`${class_EndPoint}/:name/${className}`, {
      headers: {},
    });
    return response.data;
  } catch (error) {
    throw new Error("Getting class by name failed");
  }
};


const joinClass = async (joinData) => {
  try {
    const response = await axios.post(`${class_EndPoint}/join`, joinData, {
      headers: {},
    });
    return response.data;
  } catch (error) {
    throw new Error("Joining class failed");
  }
};


const deleteClass = async (classId) => {
  try {
    const response = await axios.delete(`${class_EndPoint}/delete/${classId}`, {
      headers: {},
    });
    return response.data;
  } catch (error) {
    throw new Error("Deleting class failed");
  }
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
