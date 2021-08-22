// imported react Hooks
import { useHistory, useParams } from "react-router-dom";

// imported custom Hook from current directory
import useFetch from "./useFetch";

const BlogDetails = () => {

  /*
    "useParams" returns an object of key/value pairs of URL parameters. Use it to access match.params of the current <Route>. 
    >> /blog/:slug --> from home page link
  */
  const { id } = useParams();

  // getting data from custom hook from useFetch.js
  const { data: blog, error, isPending } = useFetch(
    //'http://localhost:8000/blogs/' + id
    // Firebase Database API endpoint
    'https://react-dojo-e473f-default-rtdb.firebaseio.com/blogs.json'
  );

  //The useHistory hook gives you access to the history instance that you may use to navigate.
  const history = useHistory();

  // SENDS DELETE request to json db to
  const handleClick = (id) => {
    fetch(
        //'http://localhost:8000/blogs/' + blog.id
        // Firebase Database API endpoint
        `https://react-dojo-e473f-default-rtdb.firebaseio.com/blogs/${id}.json`
        , {
        method: 'DELETE'
      }).then(() => {
        // redirects to the home page
        history.push('/');
      }) 
    }
  
  return (
    <div className="blog-details">

      {/* renders loading message if data is delayed  */}
      { isPending && <div>Loading...</div> }
      {/* renders error message if error is detected from fetch request */}
      { error && <div>{ error }</div> }

      {/* renders blog data when fetch request is successful and "id" returns true*/}
      { blog && ( 
        blog.map((blogdata) => {
          if (blogdata.id === id) {
            return (
              <article>
                <h2>{ blogdata.title }</h2>
                <p>Written by { blogdata.author }</p>
                <div>{ blogdata.body }</div>
                <button onClick={() => handleClick(id)}>delete</button>
              </article>
            );
          }
        }
        )
      
      )}
         
    </div>

  );

}
 
export default BlogDetails;

