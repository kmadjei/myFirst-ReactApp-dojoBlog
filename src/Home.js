// for using state hook - changes variables rendered dynamically
import BlogList from './BlogList';
import useFetch from "./useFetch";

const Home  = () => {
    
    // order does not matter for destructuring objects
    // getting custom hook value --> useFetch
    const { error, isPending, data: blogs } = useFetch('http://localhost:4000/blogs')

    return (  
        <div className="home">
            {/* 
                BlogList.js module with Props of "blogs" 
                React uses logical AND "&&" for conditional templating 
                if "blogs" returns false with no value <BlogList> will not render
                >> isPending -> conditional loading message

            */}
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            {blogs && <BlogList blogs={blogs} />}
        </div>
    );
}
 
export default Home;