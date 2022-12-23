import React from 'react';
import { useParams } from 'react-router-dom';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import axios from '../axios.js';

export const FullPost = () => {
  //we make a request not to Redux, but locally. There is no reason to keep only article only in Redux:
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        //with 1 render we make a request to posts/id. When request completed, we get a result and save it into th state.
        setData(res.data);
        //if res data is successful, we change setLoading to false:
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Error of getting a post');
      });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl}
        user={data.user}
        createdAt={data.createAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <p>{data.text}</p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: 'John Smith',
              avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
            },
            text: 'Happy New 2023 Year!',
          },
          {
            user: {
              fullName: 'Chris Dornand',
              avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
            },
            text: 'What do you guys think which JS framework better?',
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
