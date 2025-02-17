import React from "react";

const Footer = () => {
    return (
        <footer className="bg-[#6A38C2] text-white py-6 mt-10">
            <div className="container mx-auto px-4 text-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} Job Hunt. All rights reserved.</p>
                <div className="flex justify-center space-x-4 mt-3">
                    <a href="#" className="hover:text-[#F83002]">Privacy Policy</a>
                    <a href="#" className="hover:text-[#F83002]">Terms of Service</a>
                    <a href="#" className="hover:text-[#F83002]">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
