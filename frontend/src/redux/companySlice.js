import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        singleCompany: null,
        companies: [],
        searchCompanyByName: ""
    },
    reducers: {
        // action
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload
        },

        setCompanies: (state, action) => {
            state.companies = action.payload
        },

        setSearchCompanyByName: (state, action) => {
            state.searchCompanyByName = action.payload
        }
    }
});
export const { setSingleCompany, setCompanies, setSearchCompanyByName } = companySlice.actions;
export default companySlice.reducer;