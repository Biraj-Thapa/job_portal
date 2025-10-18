import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

const ApplyJob = () => {
  const { id: jobId } = useParams();
  const { user } = useSelector((state) => state.auth); // token is auto-attached via interceptor
  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => setCvFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cvFile) return setMessage("Please select a CV to upload.");

    const formData = new FormData();
    formData.append("cv", cvFile);
    formData.append("jobId", jobId);

    try {
      setLoading(true);
      const res = await api.post("/applications/apply", formData, {
        headers: { "Content-Type": "multipart/form-data" }, // token auto-attached
      });

      setMessage(res.data.message);
      navigate("/seeker/my-applications");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Apply for Job</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-semibold">Upload CV</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? "Submitting..." : "Apply"}
        </button>
      </form>
    </div>
  );
};

export default ApplyJob;
