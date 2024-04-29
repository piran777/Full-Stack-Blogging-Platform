import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    ev.preventDefault();
  
    // Split the tags string into an array and remove whitespace from each tag
    const tagsArray = tags.split(',').map(tag => tag.trim());
  
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    // Send tags as an array, not as a JSON string
    tagsArray.forEach(tag => {
      data.append('tags', tag);
    });
    data.set('file', files[0]);
  
    const response = await fetch('http://34.130.156.109:4000/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
  
    if (response.ok) {
      setRedirect(true);
    }
  }
  

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <form onSubmit={createNewPost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <Editor value={content} onChange={setContent} />
      <input
        type="text"
        placeholder="Tags (separated by commas)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setFiles(e.target.files)}
      />
      <button style={{ marginTop: '5px' }}>Create Post</button>
    </form>
  );
}
