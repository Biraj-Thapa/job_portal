import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const MyApplications = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/applications/my-applications");
        setApps(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Applications</h2>
      <div className="space-y-4">
        {apps.map((a) => (
          <div key={a.id} className="card bg-base-100 shadow-sm p-4">
            <h3 className="font-semibold">{a.job?.title}</h3>
            <p className="text-sm text-muted">Applied: {new Date(a.createdAt).toLocaleString()}</p>
            <a href={`/${a.cvUrl}`} target="_blank" rel="noreferrer" className="text-blue-500">View CV</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApplications;
