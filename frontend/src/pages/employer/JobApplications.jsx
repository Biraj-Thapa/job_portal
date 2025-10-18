import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

const JobApplications = () => {
  const { id: jobId } = useParams();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/applications/job/${jobId}`);
        setApplications(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [jobId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Applications</h2>
      <div className="space-y-4">
        {applications.length === 0 && <p className="text-muted">No applications yet.</p>}
        {applications.map((app) => (
          <div key={app.id} className="card p-4 shadow-sm space-y-2">
            <p><strong>Name:</strong> {app.user.name}</p>
            <p><strong>Email:</strong> {app.user.email}</p>
            <p><strong>Education:</strong> {app.education || "N/A"}</p>
            <p><strong>Cover Letter:</strong></p>
            <p className="whitespace-pre-wrap border p-2 rounded bg-gray-50">
              {app.coverLetter || "No cover letter"}
            </p>
            <p><strong>Applied at:</strong> {new Date(app.createdAt).toLocaleString()}</p>
            <a
              href={`http://localhost:5000/${app.cvUrl}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500"
            >
              View CV
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobApplications;
