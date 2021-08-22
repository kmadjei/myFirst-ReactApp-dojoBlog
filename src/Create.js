// useState react Hook imported
import { useState } from "react";
// imported useHistory hook  from react router dom
import { useHistory } from "react-router-dom";


const Create = () => {
  
  // useSTate hooks allows states to update form values dynamically
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('mario');
  const [isPending, setIsPending] = useState(false);


  const history = useHistory();

  const handleSubmit = (e) => {
    // prevents form from submitting
    // or page refreshing
    e.preventDefault();
    const blog = { title, body, author };

    // SENDS post request to  db
    fetch(
        //'http://localhost:8000/blogs'
        // Firebase Database API endpoint
        'https://react-dojo-e473f-default-rtdb.firebaseio.com/blogs.json' 
      , {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      // converts JavaScript array Object to string
      body: JSON.stringify(blog) 
    }).then(() => {
      console.log('new blog added');
      setIsPending(false);

      
      // history.go(-1) --> previous page;
      //redirects to home page after form submission
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
          /* updates Blog TItle  state 
            "onChange" is a javascript dom event
          */
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