/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-use-before-define */
import React from 'react';

const pageNumberStyle = {
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 4px 0 0',
  padding: '4px',
  width: '28px',
  height: '28px',
  borderRadius: '50%',
  border: '1px solid black',
  cursor: 'pointer',
};

const pageActiveStyle = {
  ...pageNumberStyle,
  background: 'lightblue',
};

type Props = {
  data: { body: string; id: number; title: string; userId: number }[];
  fetchError: string;
};

const PostsWithPagination: React.FunctionComponent<Props> = ({
  data,
  fetchError,
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pages, setPages] = React.useState<undefined | number>(undefined);
  const [entries, setEntries] = React.useState(10);

  const pagesNumbers = Array.from({ length: pages || 0 }, (_, index) => ({
    id: index + 1,
  }));

  React.useEffect(() => {
    setPages(Math.round(data.length / entries));
  }, [data, entries]);

  if (fetchError) {
    return <h2>{fetchError}</h2>;
  }

  const handleNextPage = (): void => {
    setCurrentPage((prevState) => prevState + 1);
  };

  const handlePrevPage = (): void => {
    setCurrentPage((prevState) => prevState - 1);
  };

  return (
    <div>
      {data
        .slice(entries * currentPage - entries, entries * currentPage)
        .map((post) => {
          return (
            <div key={post.id}>
              <p>{post.id}</p>
              <p>{post.title}</p>
              <p>{post.body}</p>
            </div>
          );
        })}
      <div style={{ margin: '16px 0' }}>
        <button
          type='button'
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
        >
          Prev
        </button>
        <button
          type='button'
          onClick={handleNextPage}
          disabled={currentPage >= 10}
        >
          Next
        </button>
      </div>
      <div style={{ margin: '16px 0' }}>
        {pagesNumbers.map(({ id }) => (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <span
            style={id === currentPage ? pageActiveStyle : pageNumberStyle}
            key={id}
            onClick={() => setCurrentPage(id)}
          >
            {id}
          </span>
        ))}
      </div>
      <div style={{ margin: '16px 0' }}>
        <label htmlFor='entries'>Entries: </label>
        <select
          name='entries'
          id='entries'
          onChange={(e) => setEntries(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={40}>40</option>
        </select>
      </div>
      <p>Page: {`${currentPage} / ${pages}`}</p>
    </div>
  );
};

export default PostsWithPagination;
