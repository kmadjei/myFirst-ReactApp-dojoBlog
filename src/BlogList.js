import { Link } from 'react-router-dom';

/*
    { blogs } :
    >> Props passed to "BlogList" component from Home.js
    >> destructed props for accessing blogs as blogs instead of "props.blogs"
*/ 
const BlogList = ({ blogs }) => {
    
    return (  
        <div className="blog-list">           
            {/* 
                Outputting blog DATA list details from the useFetch.js -->db.json 
                The map() method creates a new array with the results of calling a function for every array element
                [ (x) => ( x + 'A') ] >> arrow functions wrapped in brackets executes the variables in the brackets as a single argument
            */}
            { blogs.map((blog) => (
                // react uses "key" property to keep track of each item in a list being rendered 
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