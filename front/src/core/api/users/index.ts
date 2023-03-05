import * as api from './rq'
import { useQuery, useMutation } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useGetMe } from './context'

export const useSignup = () => {
  const push = useNavigate()
  const mutation = useMutation(api.signup, {
    onSuccess: () => {
      push('/login')
    },
  })
  return mutation
}

export const useLogin = () => {
  const push = useNavigate();
  const mutation = useMutation(api.login, {
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      push("/profile");
    },
  });
  return mutation;
};

// export const useGetMe = () => {
//   const [redo, setRedo] = useState(true);
//   return useQuery("me", api.getMe, {
//     onError: () => {
//       // localStorage.removeItem('token')
//       setRedo(!redo);
//     },
//     retry: redo,
//     // refetchOnWindowFocus: false,
//     // refetchOnMount: false,
//   });
// };

export const useUpdateMe = () => {
  const me = useGetMe()
  const mutation = useMutation(api.updateMe, {
    onSuccess: () => {
      me.refetch()
    },
  })
  return mutation
}

export const useCreateInvoice = () => {
  const push = useNavigate();
  const mutation = useMutation(api.createInvoice, {
    onSuccess: () => {
      push("/profile/invoices");
    },
  });
  return mutation;
};

export const useSignInvoice = () => {
  const push = useNavigate();
  const mutation = useMutation(api.signInvoice, {
    onSuccess: () => {
      push("/profile/invoices");
    },
  });
  return mutation;
};

export const useGetAllUsers = () => {
  return useQuery('users', api.getAllUsers)
}

export const useGetUnhanldedInvoices = () => {
  return useQuery("unhandled", api.unhandled);
};

export const useGetMyInvoices = () => {
  return useQuery("my-invoices", api.myInvoices);
};

// export const useGetUser = () => {
//   const { id } = useParams()
//   return useQuery(['user', id], () => api.getUser(id || ''))
// }
