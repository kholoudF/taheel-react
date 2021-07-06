const { APIRequest } = require("src/api/APIRequest");

const LoginRequest = async (email, password, userType) => {

  const requestBody = {
    username: email,
    password: password,
    userLoginType:userType,
  };

  const url = '/taheel-apis-users-login-v2'
  const response = await APIRequest({ requestBody, url });
  return response;
};
export default LoginRequest;