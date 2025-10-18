import prisma from "../prismaClient.js";

export const deleteExpiredJobs = async () => {
  try {
    const now = new Date();
    const expiredJobs = await prisma.job.findMany({
      where: { applicationDeadline: { lt: now } },
    });

    for (const job of expiredJobs) {
      await prisma.job.delete({ where: { id: job.id } });
      console.log(`Deleted expired job: ${job.title}`);
    }
  } catch (err) {
    console.error("Error deleting expired jobs:", err);
  }
};
