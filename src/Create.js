// useSTate hooks allows states to update form values dynamically
import { useState } from "react";
import { useHistory } from "react-router-dom";


const Create = () => {
  // useState Hooks
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('mario');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    // prevents form from submitting
    e.preventDefault();
    const blog = { title, body, author };

    // SENDS post request to fake JSON rest api db
    fetch('http://localhost:4000/blogs/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog)
    }).then(() => {
      console.log('new blog added');
      setIsPending(false);

      //redirects to home page after form submission
      // history.go(-1);
      history.push('/');
    })
  }

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input 
          type="text" 
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog author:</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>

        {/* Renders if isPending is false */}
        { !isPending && <button>Add Blog</button> }
        {/* Renders if isPending is true */}
        { isPending && <button disabled>Adding blog...</button> }
      </form>
    </div>
  );
}
 
export default Create;