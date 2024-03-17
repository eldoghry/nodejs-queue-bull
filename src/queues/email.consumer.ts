import { Job } from "bull";

const emailProcess = async (job: Job) => {
  console.log(job.data);
};

export { emailProcess };
