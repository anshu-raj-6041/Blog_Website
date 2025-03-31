import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { baseUrl } from '../baseUrl';

const BlogPage = () => {
    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();
    const { loading, setLoading } = useContext(AppContext);

    // Extract blogId from URL params
    const searchParams = new URLSearchParams(location.search);
    const blogId = searchParams.get("blogId");

    async function fetchRelatedBlogs() {
        if (!blogId) return;

        setLoading(true);
        let url = `${baseUrl}?blogId=${blogId}`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            setBlog(data.blog);
            setRelatedBlogs(data.relatedBlogs);
        } catch (error) {
            console.error("Error fetching blog data:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchRelatedBlogs();
    }, [blogId]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : blog ? (
                <>
                    <h1>{blog.title}</h1>
                    <p>{blog.content}</p>

                    <h2>Related Blogs</h2>
                    <ul>
                        {relatedBlogs.map((related) => (
                            <li key={related.id}>{related.title}</li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>No blog found.</p>
            )}
        </div>
    );
};

export default BlogPage;
