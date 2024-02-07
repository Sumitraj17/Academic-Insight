import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { checkAuthStatus, userLogin, userLogout, } from "../helpers/api-communicator";

type User = {
    name: string;
    email: string;
    // type: "ADMIN" | "TEACHER" | "STUDENT";
}

type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        async function checkStatus() {
            const data = await checkAuthStatus(); // add user after changing db
            if (data) {
                setUser({ email: data.email, name: data.name });
                setIsLoggedIn(true);
            }
        }
        checkStatus()
    }, []);

    const login = async (email: string, password: string) => {
        const data = await userLogin(email, password);

        if (data) {
            setUser({ email: data.email, name: data.name }); // add user after changing db
            setIsLoggedIn(true);
        }
    }

    const logout = async () => {
        await userLogout();
        setIsLoggedIn(false);
        setUser(null);
        window.location.reload();
    }

    const value = {
        user,
        isLoggedIn,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);