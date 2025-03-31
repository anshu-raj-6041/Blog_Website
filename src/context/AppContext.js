import { createContext, useState } from "react";
// import { baseUrl } from "../../baseUrl";
import { baseUrl } from "../baseUrl";


// step 1 => context creation
export const AppContext = createContext();

function AppContextProvider({ children }) {     // children <App /> ko show kr rha hai (index.js)
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);    // by default 1 page aana chahiye
    const [totalPages, setTotalPages] = useState(null);

    // data filling pending
    async function fetchBlogPosts(page = 1, tag=null, category) {
        setLoading(true);
        let url = `${baseUrl}?page=${page}`;

        if(tag) {
            url += `&category=${category}`;
        }

        try {
            const result = await fetch(url);
            const data = await result.json();
            console.log(data);
            setPage(data.page);
            setPosts(data.posts);
            setTotalPages(data.totalPages);

        }
        catch (error) {
            console.log("Error 404");
            setPage(1);
            setPosts([]);
            setTotalPages(null);


        }
        setLoading(false);


    }
    function handlePageChange(page) {
        setPage(page);
        fetchBlogPosts(page);

    }

    // data pass krna hai
    const value = {
        posts,
        setPosts,
        loading,
        setLoading,
        page,
        setPage,
        totalPages,
        setTotalPages,
        fetchBlogPosts,
        handlePageChange

    };

    // step 2 => context providing
    return <AppContext.Provider value={value} >
        {children}
    </AppContext.Provider>

}



export default AppContextProvider;
