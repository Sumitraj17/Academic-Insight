import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { checkAuthStatus, userLogin } from "../helpers/api-communicator";

type User = {
    name: string;
    email: string;
}

type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    signup: (id: string, name: string, email: string, password: string, phoneNumber: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        async function checkStatus() {
            const data = await checkAuthStatus();
            if (data) {
                setUser({ email: data.email, name: data.name });
                setIsLoggedIn(true);
            }
        }
        checkStatus();
    }, []);

    const login = async (email: string, password: string) => {
        const data = await userLogin(email, password);

        if (data) {
            setUser({ email: data.email, name: data.name });
            setIsLoggedIn(true);
        }
    }

    const signup = async (id: string, name: string, email: string, password: string, phoneNumber: string) => {

    }

    const logout = async () => {

    }

    const value = {
        user,
        isLoggedIn,
        signup,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);