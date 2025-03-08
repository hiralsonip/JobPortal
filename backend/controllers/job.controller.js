import { Job } from "../models/job.model.js";

// Create job
export const postJob = async (req, res) => {
    try {

        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;

        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "All fields are mandatory",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created",
            success: true,
            job: job
        })

    } catch (error) {
        console.log(error);
    }
}

// Get all job
export const getAllJobs = async (req, res) => {
    try {

        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        }
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });

        if (!jobs) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// get single job
export const getJobById = async (req, res) => {
    try {

        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path: "applications"
        });

        if (!job) {
            return res.status(400).json({
                message: "Job not found",
                success: false
            })
        }

        return res.status(200).json({
            message: "Job found",
            job: job,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

// get job created by login user
export const getJobByUserId = async (req, res) => {
    try {

        const userId = req.id;
        const jobs = await Job.find({ created_by: userId }).populate({ path: "company" });

        if (!jobs) {
            return res.status(400).json({
                message: "Job not found",
                success: false
            })
        }

        return res.status(200).json({
            message: "Job found",
            jobs,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}