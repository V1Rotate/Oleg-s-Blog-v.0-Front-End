import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch();
  //TODO...const { userData } = useSelector((state) => state.auth.data); // we are getting authentification data and then go to Post below.
  const { posts, tags } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label='basic tabs example'
      >
        <Tab label='New' />
        <Tab label='Popular' />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {/*if isPostsLoading true, to create an array*/};
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              //we render 5 articles

              //we compare if the id we are getting from the userData auth match the id of the user's post - check isEditable below
              <Post
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl}
                user={obj.user}
                createdAt={obj.createAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable
                key={index}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
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
                text: 'What do you guys think which JS framework is better?',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
