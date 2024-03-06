import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { checkAuthStatus, userLogin, userLogout } from "../helpers/api-communicator";

type User = {
    name: string;
    email: string;
    // type: "admin" | "teacher" | "student";
}

type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (type: string, email: string, password: string) => Promise<void>;
    logout: (type: string) => Promise<void>;
    type: string | "admin";
}

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [type, setType] = useState(() => {
        // Retrieve the user type from localStorage on component mount
        const storedType = localStorage.getItem('userType');
        return storedType || 'admin'; // Default to 'admin' if not found
    });

    useEffect(() => {
        async function checkStatus() {
            const data = await checkAuthStatus(type); // add user after changing db
            if (data) {
                setUser({ name: data.name, email: data.email, });
                setIsLoggedIn(true);
                setType(type);
            }
        }
        checkStatus()
    }, []);

    const login = async (type: string, email: string, password: string) => {
        const data = await userLogin(type, email, password);

        if (data) {
            setUser({ name: data.name, email: data.email, }); // add user after changing db
            setIsLoggedIn(true);
            setType(type);
            localStorage.setItem('userType', type);
        }
    }

    const logout = async (type: string) => {
        const data = await userLogout(type);
        if (data) {
            setUser(null);
            setIsLoggedIn(false);
            localStorage.removeItem('userType');
            window.location.assign('/');
        }
    }

    const value = {
        user,
        isLoggedIn,
        login,
        logout,
        type
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);