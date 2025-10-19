import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { MapPin, DollarSign, Briefcase, Layers, Clock, Building2 } from "lucide-react";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading job details...</p>;
  if (!job) return <p className="text-center mt-10 text-red-500">Job not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      {/* Job Title & Company */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
        <p className="flex items-center text-gray-600 text-sm gap-1 mt-1">
          <Building2 size={16} className="text-blue-500" /> {job.company}
        </p>
      </div>

      {/* Job Info */}
      <div className="space-y-2 text-sm text-gray-700 mb-4">
        {job.location && <p className="flex items-center gap-2"><MapPin size={16} className="text-blue-400" /> {job.location}</p>}
        {job.category && <p className="flex items-center gap-2"><Briefcase size={16} className="text-purple-500" /> {job.category}</p>}
        {job.salary && <p className="flex items-center gap-2"><DollarSign size={16} className="text-green-500" /> ${job.salary}</p>}
        {job.jobLevel && <p className="flex items-center gap-2"><Layers size={16} className="text-orange-500" /> {job.jobLevel}</p>}
        {job.applicationDeadline && <p className="flex items-center gap-2"><Clock size={16} className="text-red-500" /> Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}</p>}
      </div>

      {/* Full Job Description */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Job Description</h2>
        <p className="text-gray-700 whitespace-pre-line leading-relaxed">{job.description}</p>
      </div>

      {/* Apply Button */}
      <div className="flex justify-end">
        <button
          onClick={() => navigate(`/seeker/jobs/${job.id}/apply`)}
          className="px-6 py-2 text-sm rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetail;
