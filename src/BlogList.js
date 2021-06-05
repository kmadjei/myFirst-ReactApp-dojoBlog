import { Link } from 'react-router-dom';

//{ blogs } Props passed to module from Home.js
const BlogList = ({ blogs }) => {
    
    return (  
        <div className="blog-list">           
            {/* Outputting blog data details from the useFetch.js -->db.json */}
            { blogs.map((blog) => (
                <div className="blog-preview" key={blog.id} >
                    <Link to={`/blogs/${blog.id}`}>
                        <h2>{ blog.title }</h2>
                        <p>Written by { blog.author }</p>
                    </Link>
                </div>
            ))}
        </div>
    );
}
 
export default BlogList;