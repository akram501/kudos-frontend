import { createContext, useState, useEffect, useContext } from "react";
import axios from "../api/axios";

const KudosContext = createContext();

export const useKudos = () => useContext(KudosContext);

export const KudosProvider = ({ children }) => {
    const [remaining, setRemaining] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            fetchRemaining(token);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchRemaining = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("access_token");
            const res = await axios.get("/kudos/remaining/", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRemaining(res.data.data.kudos_remaining);
        } catch (err) {
            console.error("Error fetching remaining kudos:", err);
        }
        setLoading(false);
    };

    return (
        <KudosContext.Provider value={{ remaining, setRemaining, loading, fetchRemaining }}>
            {children}
        </KudosContext.Provider>
    );
};
