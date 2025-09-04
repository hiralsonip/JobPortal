import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/couldinary.js";
import zxcvbn from "zxcvbn";
import parsePhoneNumberFromString from "libphonenumber-js";

// Register
export const register = async (req, res) => {
    try {
        const { fullname, email, phonenumber, password, role } = req.body;

        if (!fullname || !email || !phonenumber || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        const cloudResponse = (req.file) ? await cloudinary.uploader.upload(getDataUri(req.file).content) : ""

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User is already exists",
                success: false
            })
        }

        // checks for phone number
        const phoneLib = parsePhoneNumberFromString(phonenumber);
        if (!phoneLib || !phoneLib.isValid()) {
            return res.status(400).json({
                message: "Invalid phone number",
                success: false,
            })
        }
        const normalizedPhoneNumber = phoneLib.number;

        // Run zxcvbn check
        const result = zxcvbn(password);
        // result.score is 0 (weak) to 4 (strong)
        if (result.score < 2) {
            return res.status(400).json({
                message: "Password is too weak",
                suggestions: result.feedback.suggestions,
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phonenumber: normalizedPhoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url
            }
        })

        return res.status(201).json({
            message: "Account creates",
            success: true
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while creating the account",
            success: false,
            error: error.message
        });
    }
}

// Login
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!password || !email || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }
        // Check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account does not exist with the current role",
                success: false
            })
        }

        const tokenData = {
            userId: user._id
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phonenumber: user.phonenumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user: user,
            token: `${token}`,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

// logout
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logout successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// Update
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phonenumber, bio, skills } = req.body;

        const file = req.file;

        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        // if (!fullname || !email || !phonenumber || !bio || !skills) {
        //     return res.status(400).json({
        //         message: "All fields are required",
        //         success: false
        //     });
        // }

        const skillsArray = skills && skills.split(",");
        const userID = req.id;
        let user = await User.findById(userID);

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }

        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phonenumber) user.phonenumber = phonenumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url // Save the cloudinary URL
            user.profile.resumeOriginalName = file.originalname
        }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phonenumber: user.phonenumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updates successfully",
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// Get all user
export const getAllUsers = async (req, res) => {
    try {

        const users = await User.find();

        if (!users) {
            return res.status(404).json({
                message: "Users not found",
                success: false
            })
        }

        return res.status(200).json({
            users: users,
            success: true
        })

    } catch (error) {
        console.log(error.message);
    }
}