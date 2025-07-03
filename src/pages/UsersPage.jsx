import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from '../api/axios';
import Header from '../components/Header'; // adjust path if needed

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("access_token");
                const res = await axios.get("/kudos/users/", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("API Response:", res.data.data.data);
                setUsers(res.data.data.data);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchUsers();
    }, []);

    const columns = [
        { name: "Name", selector: row => row.name, sortable: true },
        { name: "Email", selector: row => row.email, sortable: true },
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
                    <strong>Welcome {user?.name}!</strong> You belong to <strong>{user?.organization_name}</strong>.
                </div>

                <div style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                }}>
                    <DataTable
                        columns={columns}
                        data={users}
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
