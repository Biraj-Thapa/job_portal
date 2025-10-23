import prisma from "../prismaClient.js";

export const deleteOldClosedJobs = async () => {
  try {
    const now = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const expiredJobs = await prisma.job.findMany({
      where: {
        applicationDeadline: {
          lt: oneMonthAgo, 
        },
      },
      select: { id: true },
    });

    if (expiredJobs.length === 0) {
      console.log("No expired jobs older than 1 month to delete.");
      return;
    }

    const jobIds = expiredJobs.map((job) => job.id);

    // Delete applications first to avoid foreign key constraint error
    await prisma.application.deleteMany({
      where: { jobId: { in: jobIds } },
    });

    // Delete the jobs
    const result = await prisma.job.deleteMany({
      where: { id: { in: jobIds } },
    });

    console.log(`Deleted ${result.count} expired jobs (older than 1 month).`);
  } catch (err) {
    console.error("Error deleting old expired jobs:", err);
  }
};
