// imported react Hooks
import { useHistory, useParams } from "react-router-dom";

// imported custom Hook from current directory
import useFetch from "./useFetch";

const BlogDetails = () => {

  /*
    "useParams" returns an object of key/value pairs of URL parameters. Use it to access match.params of the current <Route>. 
    >> /blog/:slug
  */
  const { id } = useParams();

  // getting data from custom hook from useFetch.js
  const { data: blog, error, isPending } = useFetch('https://myfirst-reactapp-dojoblog.herokuapp.com/blogs/' + id);

  //The useHistory hook gives you access to the history instance that you may use to navigate.
  const history = useHistory();

  // SENDS DELETE request to fake JSON rest api db.json
  const handleClick = () => {
    fetch('https://myfirst-reactapp-dojoblog.herokuapp.com/blogs/' + blog.id, {
      method: 'DELETE'
    }).then(() => {
      // redirects to the home page
      history.push('/');
    }) 
  }

  return (
    <div className="blog-details">
      {/* renders loading message if data is delayed */}
      { isPending && <div>Loading...</div> }
      {/* renders error message if error is detected from fetch request */}
      { error && <div>{ error }</div> }
      {/* renders blog data when fetch request is successful */}
      { blog && (
        <article>
          <h2>{ blog.title }</h2>
          <p>Written by { blog.author }</p>
          <div>{ blog.body }</div>
          <button onClick={handleClick}>delete</button>
        </article>
      )}
    </div>
  );
}
 
export default BlogDetails;