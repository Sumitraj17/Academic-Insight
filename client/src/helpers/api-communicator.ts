import axios from "axios";
import { AdminRecords, StudentRecords } from "../interfaces/Records";
import { Classes } from "../interfaces/Classes";

export const checkAuthStatus = async (type: string) => {

    const res = await axios.get(`${type}/auth-status`);

  if (res.status !== 200)
    throw new Error("[AUTHENTICATION_ERROR] Unable to authenticate user...");

  const data = await res.data;
  return data;
};


export const userLogin = async (type: string, email: string, password: string) => {
    const res = await axios.post(`${type}/login`, { email, password });


  if (res.status !== 201) throw new Error("Unable to login...");

  const data = await res.data;
  return data;
};

export const userLogout = async (type: string) => {
  const res = await axios.get(`${type}/logout`);

  if (res.status !== 200) throw new Error("Unable to logout");

  const data = await res.data;
  return data;
};

export const fileUpload = async (
  formData:FormData,
  fileType:string | undefined,
  type: string | undefined
) => {
    console.log(formData);
  const res = await axios.post(`${type}/file-upload`, formData);

  if (res.status !== 201) throw new Error("Unable to send file");

  const data = await res.data;
  return data;
};



export const getClassMarks = async (_class: Classes | undefined) => {
    const res = await axios.get<{ records: StudentRecords[] }>(`/teacher/get-class-records?course_id=${_class?.course_id}&sem_sec=${_class?.semsec}`);

    if (res.status !== 200)
        throw new Error("Unable get marks");

    const data = res?.data.records;
    return data;
}

export const getAllMarksForAdmin = async (selectedClass: Classes | undefined) => {
    const url = selectedClass
        ? `teacher/get-class-records?course_id=${selectedClass.course_id}&sem_sec=${selectedClass.semsec}`
        : 'admin/get-all-records/';

    const res = await axios.get<{ records: AdminRecords[] }>(url);

    if (res.status !== 200)
        throw new Error("Unable get marks");

    const data = res?.data.records
    return data;
}

export const getClasses = async () => {
    const res = await axios.get<{ classes: Classes[] }>("/teacher/get-classes");

    const data = res?.data;
    return data.classes;
}
