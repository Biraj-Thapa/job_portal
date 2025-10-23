import prisma from "../prismaClient.js";
import { calculateIsClosed } from "./calculateIsClosed.js";

export const closeExpiredJobs = async () => {
  try {
    const jobs = await prisma.job.findMany({
      where: { applicationDeadline: { not: null } },
    });

    const now = new Date();

    const expiredJobs = jobs.filter(job => calculateIsClosed(job.applicationDeadline));

    console.log(`Found ${expiredJobs.length} expired jobs.`);

  } catch (err) {
    console.error("Error closing expired jobs:", err);
  }
};
