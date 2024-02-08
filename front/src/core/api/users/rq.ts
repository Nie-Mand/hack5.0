import { getApi } from '../axios'

export const signup = async (user: any) => {
  const response = await getApi().post('/user/signup', user)
  return response.data
}

export const login = async (user: any) => {
  const response = await getApi().post("/login", user);
  return response.data;
};

export const getMe = async () => {
  const response = await getApi().get("/me");
  return response.data;
};

export const unhandled = async () => {
  const response = await getApi().get("/invoice/unhandled");
  return response.data;
};

export const myInvoices = async () => {
  const response = await getApi().get("/invoice/done");
  return response.data;
};

export const createInvoice = async (data: any) => {
  const response = await getApi().post("/invoice", data);
  return response.data;
};

export const signInvoice = async (id: string) => {
  const response = await getApi().put("/invoice/sign/" + id);
  return response.data;
};

export const updateMe = async (user: any) => {
  const formData = new FormData()
  for (const key in user) {
    formData.append(key, user[key])
  }

  const response = await getApi('multipart/form-data').put(
    '/user/update',
    formData
  )
  return response.data
}

export const getAllUsers = async () => {
  const response = await getApi().get('/user')
  return response.data
}

export const getUser = async (id: string) => {
  const response = await getApi().get(`/user/${id}`)
  return response.data
}
