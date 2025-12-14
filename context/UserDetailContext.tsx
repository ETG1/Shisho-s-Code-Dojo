import React, { createContext } from "react";

export const UserDetailContext = createContext<any>({
    userDetail:undefined,
    setUserDetail: () => {}
});