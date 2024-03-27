import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState(''); // Add tags state
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then(response => response.json())
      .then(postInfo => {
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setContent(postInfo.content);
        setTags(postInfo.tags.join(', ')); // Convert array of tags to string
      });
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();
    
    // Convert the tags from a comma-separated string to an array
    const tagsArray = tags.split(',').map(tag => tag.trim());
  
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.append('tags', tagsArray); // Make sure this matches your server's expected format
    if (files?.[0]) {
      data.append('file', files[0]);
    }
  
    try {
        const response = await fetch(`http://localhost:4000/post/${id}`, {
        method: 'PUT',
        body: data,
        credentials: 'include',
      });
  
      console.log('Update response:', response);
  
      if (response.ok) {
        console.log('Update successful, redirecting...');
        setRedirect(true);
      } else {
        console.error('Update failed:', response.statusText);
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  }
  
  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <form onSubmit={updatePost}>
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
      <Editor value={content} onChange={(setContent)} />
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
      <button style={{ marginTop: '5px' }}>Update Post</button>
    </form>
  );
}
