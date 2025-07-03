import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from '../api/axios';
import Header from '../components/Header';

export default function ReceivedPage() {
    const [kudos, setKudos] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchKudos = async () => {
            try {
                const token = localStorage.getItem("access_token");
                const res = await axios.get("/kudos/received/", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("Received Kudos Response:", res.data.data);
                setKudos(res.data.data);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchKudos();
    }, []);

    const columns = [
        { name: "From", selector: row => row.from_user.name, sortable: true },
        { name: "Email", selector: row => row.from_user.email, sortable: true },
        { name: "Message", selector: row => row.message, wrap: true },
        { name: "Date", selector: row => (new Date(row.created_at)).toLocaleDateString(), sortable: true },
    ];

    return (
        <>
            <Header />
            <div style={{ maxWidth: "1000px", margin: "20px auto", padding: "0 20px" }}>
                <div style={{
                    background: "#e0f7fa",
                    padding: "1rem",
                    marginBottom: "1.5rem",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}>
                    <strong>Hi {user?.name}!</strong> Here are the kudos you’ve received from your teammates.
                </div>

                <div style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                }}>
                    <DataTable
                        columns={columns}
                        data={kudos}
                        progressPending={loading}
                        pagination
                        highlightOnHover
                        dense
                        noHeader
                    />
                </div>
            </div>
        </>
    );
}
