import prisma from "../prismaClient.js";

export const createJob = async (req, res) => {
  try {
    const { title, description, company, location } = req.body;

    if (req.user.role !== "EMPLOYER") {
      return res.status(403).json({ message: "Only employers can post jobs" });
    }

    const job = await prisma.job.create({
      data: {
        title,
        description,
        company,
        location,
        employerId: req.user.id,
      },
    });

    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        employer: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await prisma.job.findUnique({
      where: { id: Number(id) },
      include: {
        employer: {
          select: { id: true, name: true, email: true },
        },
        applications: true,
      },
    });

    if (!job) return res.status(404).json({ message: "Job not found" });

    res.json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await prisma.job.findUnique({ where: { id: Number(id) } });
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (req.user.role !== "EMPLOYER" || job.employerId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this job" });
    }

    await prisma.job.delete({ where: { id: Number(id) } });
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
