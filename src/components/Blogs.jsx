import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Spinner from './Spinner';
// import Card from './Card';

const Blogs = () => {
  // Consume context
  const { posts, loading } = useContext(AppContext);

  return (
    <div className='w-11/12 max-w-[670px] py-8 flex flex-col gap-y-7 mt-[70px] flex justify-center items-center'>
      {loading ? (
        <Spinner />
      ) : posts.length === 0 ? (
        <div>
          <p>No Post Found</p>
        </div>
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            <p className='font-bold text-lg'>{post.title}</p>
            <p className='text-sm mt-[4px]'>
              By <span>{post.author}</span> on <span className='underline font-bold'>{post.category}</span>
            </p>
            <p className='text-sm mt-[4px]'>Posted on {post.date}</p>
            <p className='text-md mt-[14px]'>{post.content}</p>

            <div>
              {post.tags.map((tag, index) => {
                return <span key={index}>{`#${tag}`}</span>
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Blogs;
