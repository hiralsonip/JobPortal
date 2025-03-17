import { useEffect } from "react";

const useDocumentTitle = (title) => {
    useEffect(() => {
        document.title = title ? `Job Portal | ${title}` : "Job Portal";
    }, [title]);
}

export default useDocumentTitle;