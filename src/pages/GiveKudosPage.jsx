import { useEffect, useState } from "react";
import axios from '../api/axios';
import Header from '../components/Header';
import { useKudos } from '../context/KudosContext';

export default function GiveKudosPage() {
    const [users, setUsers] = useState([]);
    const [receiverId, setReceiverId] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const { setRemaining } = useKudos();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("access_token");
                const res = await axios.get("/kudos/users/", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(res.data.data.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMsg("");
        setErrorMsg("");
        try {
            const token = localStorage.getItem("access_token");
            await axios.post("/kudos/give/", {
                receiver_id: receiverId,
                message
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSuccessMsg("Kudos given successfully!");
            setRemaining(prev => prev - 1);
            setReceiverId("");
            setMessage("");
        } catch (err) {
            console.error(err);
            setErrorMsg(err.response?.data?.message || "Something went wrong.");
        }
        setLoading(false);
    };

    return (
        <>
            <Header />
            <div style={{ maxWidth: "600px", margin: "20px auto", padding: "0 20px" }}>
                <div style={{
                    background: "#e0f7fa",
                    padding: "1rem",
                    marginBottom: "1.5rem",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}>
                    <strong>Give Kudos</strong> to someone in your organization.
                </div>

                <form onSubmit={handleSubmit} style={{
                    background: "#fafafa",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                }}>
                    <div style={{ marginBottom: "1rem" }}>
                        <label>Select User</label>
                        <select
                            value={receiverId}
                            onChange={(e) => setReceiverId(e.target.value)}
                            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                            required
                        >
                            <option value="">-- Choose a user --</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.name} ({user.email})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ marginBottom: "1rem" }}>
                        <label>Message</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows="4"
                            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            background: "#4caf50",
                            color: "#fff",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                        }}
                    >
                        {loading ? "Sending..." : "Give Kudos"}
                    </button>

                    {successMsg && <div style={{ color: "green", marginTop: "1rem" }}>{successMsg}</div>}
                    {errorMsg && <div style={{ color: "red", marginTop: "1rem" }}>{errorMsg}</div>}
                </form>
            </div>
        </>
    );
}
