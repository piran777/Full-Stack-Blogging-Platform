import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch post details when the component mounts or the id changes
  useEffect(() => {
    setLoading(true);
    fetch(`http://34.130.156.109:4000/post/${id}`, {
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch post details.');
        }
        return response.json();
      })
      .then(postInfo => {
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setContent(postInfo.content);
        setTags(postInfo.tags.join(', ')); // Convert array of tags to a comma-separated string
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
        setError('Failed to load post.');
        setLoading(false);
      });
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();

    const tagsArray = tags.split(',').map(tag => tag.trim());
    const formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('content', content);
    formData.append('tags', JSON.stringify(tagsArray));
    if (files?.[0]) {
      formData.append('file', files[0]);
    }

    try {
      const response = await fetch(`http://34.130.156.109:4000/post/${id}`, {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log('Update successful, redirecting...');
      setRedirect(true);
    } catch (error) {
      console.error('Update error:', error);
      setError('Failed to update post.');
    }
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
      <button type="submit" style={{ marginTop: '5px' }}>Update Post</button>
    </form>
  );
}
