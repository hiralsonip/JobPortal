import { Company } from "../models/company.model.js";

// Register company
export const registerCompany = async (req, res) => {
    try {

        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            })
        }

        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "Company is already exist",
                success: false
            })
        };

        company = await Company.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registerd successfully",
            company: company,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

//  Get comapny
export const getComapny = async (req, res) => {
    try {

        const { userId } = req.id; // Logged in user
        const companies = await Company.find(userId);

        if (!companies) {
            return res.status(404).json({
                message: "Comapny not found",
                success: false
            })
        }

        return res.status(200).json({
            company: companies,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

//  Get comapny by ID
export const getComapnyByID = async (req, res) => {
    try {

        const companyId = req.params.id;
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "Comapny not found",
                success: false
            })
        }

        return res.status(200).json({
            company: company,
            success: true
        })

    } catch (error) {
        console.log(error.message);
    }
}

// Update company
export const updateCompany = async (req, res) => {
    try {

        const { name, description, website, location } = req.body;
        const file = req.file

        const updateData = { name, description, website, location };
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Comapny not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company updated",
            company: company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}