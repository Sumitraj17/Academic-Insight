import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type Teacher = {
    name: string;
    password: string;
}

type TeacherAuth = {
    isLoggedIn: boolean;
    teacher: Teacher | null;
    signup: (name: string, email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<TeacherAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [teacher, setTeacher] = useState<Teacher | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

    }, []);

    const login = async (email: string, password: string) => {

    }

    const signup = async (email: string, password: string) => {

    }

    const logout = async () => {

    }

    const value = {
        teacher,
        isLoggedIn,
        signup,
        login,
        logout
    }

    // return (
    //     <AuthContext
    // )
}

export const useAuth = () => useContext(AuthContext);