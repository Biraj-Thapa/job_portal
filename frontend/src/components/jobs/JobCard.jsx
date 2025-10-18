import React from "react";

const JobCard = ({ job, onApply, forEmployer }) => {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title">{job.title}</h2>
        <p className="text-sm text-muted">Company: {job.company}</p>
        <p className="text-sm text-muted">Location: {job.location}</p>
        {job.category && <p className="text-sm text-muted">Category: {job.category}</p>}
        {job.salary && <p className="text-sm text-muted">Salary: ${job.salary}</p>}
        {job.jobLevel && <p className="text-sm text-muted">Job Level: {job.jobLevel}</p>}
        {job.applicationDeadline && (
          <p className="text-sm text-muted">
            Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
          </p>
        )}
        <p className="mt-2">{job.description}</p>

        <div className="card-actions justify-end mt-4">
          {forEmployer ? (
            <button className="btn btn-outline btn-sm">Manage</button>
          ) : (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => onApply && onApply(job.id)}
            >
              Apply
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
