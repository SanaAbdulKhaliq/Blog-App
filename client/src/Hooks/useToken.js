import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useTokenStore = create(
  persist(
    (set, get) => ({
      token: "",
      setToken: (value) => set({ token: value }),
    }),
    {
      name: 'token-storage', // name of the item in the storage (must be unique)
    //   storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)

export default useTokenStore