import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { getMe } from './rq'

interface IUserContext {
  data: any
  loading: boolean
  isLoggedIn: boolean | null
  refetch: () => void
  logout: () => void
}

export const UserContext = createContext<IUserContext>({
  data: null,
  loading: true,
  isLoggedIn: null,
  refetch: () => {},
  logout: () => {},
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setMe] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  const push = useNavigate()

  const refetch = useCallback(() => {
    setLoading(true)
    getMe()
      .then(res => {
        setMe(res)
        setIsLoggedIn(true)
      })
      .catch(err => {
        setIsLoggedIn(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setMe(null)
    push('/login')
  }, [])

  const value = useMemo(
    () => ({
      data,
      loading,
      isLoggedIn,
      refetch,
      logout,
    }),
    [data, loading, isLoggedIn, refetch, logout]
  )

  useEffect(() => {
    getMe()
      .then(res => {
        console.log(res)
        setMe(res)
        setIsLoggedIn(true)
      })
      .catch(err => {
        setIsLoggedIn(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useGetMe = () => useContext(UserContext);


// export const useGetMe = () => {
//   return {
//     data:{
//       bio: "Best Chicken in the World!",
//       location: "Tunis, Tunisia",
//       coverPicture: "",
//       email: "contact@lospolloshermanos.tn",
//       fullname: "Los Pollos Hermanos",
//       id: "5f9f1b0b0b9b0c0017b0b1a5",
//       profilePicture: "https://wiki.minecartrapidtransit.net/images/8/85/POLLOS.jpg",
//       role: "user",
//       title: "Los Pollos Hermanos",
//       username: "lospolloshermanos",
//     },
//     loading: false,
//     isLoggedIn: true,
//     refetch: () => {},
//     logout: () => {},
//   }
// }