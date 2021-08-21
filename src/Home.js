// imported component from current directory
import BlogList from './BlogList';

// importing custom Hook from current directory
import useFetch from "./useFetch";

const Home  = () => {
    
    // order does not matter for destructuring objects {}
    // getting custom hook variables from useFetch.js
    //const { error, isPending, data: blogs } = useFetch('endpoint')
    const { error, isPending, data: blogs } = useFetch('http://localhost:8000/blogs')
    /*
        for Local development run on CLI:
        >> npm start
        >> npx json-server --watch data/db.json --port 8000
    */

    return (  
        <div className="home">
            {/* React uses logical AND (&&) for conditional template rendering
                if "error" returns true with { error } message will be rendered to the DOM
            */}
            { error && <div>{ error }</div> }
            {/* isPending -> conditional loading message renders when data is still being retrieved for the browser
                or isPending = true
            */}
            { isPending && <div>Loading...</div> }
            {/* 
                BlogList.js component with Props of "blogs" 
                if "blogs" returns false with no value <BlogList> will not render
            */}
            {blogs && <BlogList blogs={blogs} />}
        </div>
    );
}
 
export default Home;