// component for rendering url route parameter
// and history for redirects
import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {

  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch('https://myfirst-reactapp-dojoblog.herokuapp.com/blogs/' + id);
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
      {/* Conditional loading */}
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
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