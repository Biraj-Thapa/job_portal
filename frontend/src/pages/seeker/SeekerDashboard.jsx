import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import JobCard from "../../components/jobs/JobCard";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Pagination from "../../components/common/Pagination";

const SeekerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 7;
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/jobs");
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  useEffect(() => {
    let filtered = [...jobs];

    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter((job) => job.category === categoryFilter);
    }

    if (levelFilter) {
      filtered = filtered.filter((job) => job.jobLevel === levelFilter);
    }

    setFilteredJobs(filtered);
    setFilteredJobs(filtered);
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, levelFilter, jobs]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handleApply = (jobId) => navigate(`/seeker/jobs/${jobId}/apply`);
  const handleViewDetail = (jobId) => navigate(`/seeker/jobs/${jobId}`);

  const categories = [
    ...new Set(jobs.map((job) => job.category).filter(Boolean)),
  ];
  const levels = [...new Set(jobs.map((job) => job.jobLevel).filter(Boolean))];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Search className="text-blue-600" /> Available Jobs
        </h2>

        <input
          type="text"
          placeholder="Search by job title or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full sm:w-64"
        />
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="select select-bordered w-full sm:w-48"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          className="select select-bordered w-full sm:w-48"
        >
          <option value="">All Levels</option>
          {levels.map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl}
            </option>
          ))}
        </select>
      </div>
      {filteredJobs.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No jobs found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onApply={() => !job.isClosed && handleApply(job.id)}
              onClickCard={() => handleViewDetail(job.id)}
            />
          ))}
        </div>
        
      )}
       <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
    </div>
  );
};

export default SeekerDashboard;
