import prisma  from "../prismaClient.js";


export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.user.id; 

     if (!req.file) {
      return res.status(400).json({ message: "CV file is required" });
    }

    const cvUrl = `cv/${req.file.filename}`;;

    const newApp = await prisma.application.create({
      data: {
        userId: Number(userId),
        jobId: Number(jobId),
        cvUrl,
      },
    });

    res.status(201).json({ message: "Application submitted!", application: newApp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const getMyApplications = async (req, res) => {
  try {
    const userId = req.user.id;

    const applications = await prisma.application.findMany({
      where: { userId: Number(userId) },
      include: {
        job: true,
      },
    });

    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getApplicationsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await prisma.application.findMany({
      where: { jobId: Number(jobId) },
      include: {
        user: true,
      },
    });

    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
   if (!req.file) {
      return res.status(400).json({ message: "CV file is required" });
    }

    const cvUrl = req.file.path;

    const updated = await prisma.application.update({
      where: { id: Number(id) },
      data: { cvUrl },
    });

    res.json({ message: "Application updated!", updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.application.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Application deleted!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
