import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",

    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByName: "",
        allAppliedJobs: [],
        searchQuery: ""
    },

    reducers: {
        // actions
        setAllJobs: (state, action) => {
            state.allJobs = action.payload
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload
        },
        setSearchJobByName: (state, action) => {
            state.searchJobByName = action.payload
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload
        }
    }
});
export const { setAllJobs, setSingleJob, setAllAdminJobs, setSearchJobByName, setAllAppliedJobs, setSearchQuery } = jobSlice.actions;
export default jobSlice.reducer;