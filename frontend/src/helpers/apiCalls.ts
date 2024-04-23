import axios from "axios";

 export const loginUser = async (email: string, password: string) => {
  const response = await axios.post("/user/login", { email, password });
    if (response.status !== 200) {
      throw new Error("Unable to Login");
    } 
    const data = await response.data;
    return data
};

