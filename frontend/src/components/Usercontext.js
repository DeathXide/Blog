const { createContext, useState } = require("react");

export const UserStateContext = createContext({});

export function UserContext({ children }) {
  const [userInfo, setUserInfo] = useState({});

  return (
    <>
      <UserStateContext.Provider value={{ userInfo, setUserInfo }}>
        {children}
      </UserStateContext.Provider>
    </>
  );
}
