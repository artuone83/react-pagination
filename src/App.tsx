/* eslint-disable no-use-before-define */
import React from 'react';
import './App.css';
import PostsWithPagination from './components/PostsWithPagination';
// https://academind.com/tutorials/reactjs-pagination/

const URL = 'https://jsonplaceholder.typicode.com/posts';

const App: React.FunctionComponent = () => {
  const [posts, setPosts] = React.useState<
    { body: string; id: number; title: string; userId: number }[]
  >([]);
  const [fetchError, setFetchError] = React.useState('');

  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetch(URL);
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          throw new Error('something went wrong while requesting posts');
        }
      } catch (error) {
        setFetchError(error.message);
      }
    })();
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Simple Pagination</h1>
      </header>
      <main>
        <h2 style={{ textAlign: 'left' }}>Post List</h2>
        <PostsWithPagination data={posts} fetchError={fetchError} />
      </main>
    </div>
  );
};

export default App;
