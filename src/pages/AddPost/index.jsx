import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
//we use react simple mde for the article form.
import { selectIsAuth } from '../../redux/slices/auth';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';

export const AddPost = () => {
  const isAuth = useSelector(selectIsAuth);
  const imageUrl = '';
  const [value, setValue] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const inputRef = React.useRef(null);

  const handleChangeFile = () => {};

  const onClickRemoveImage = () => {};

  const onChange = React.useCallback((value) => {
    setValue(value); //here we have what user entered in his new post : comes from the onchange simpleMDE from below. useCallback is a requirement of the simpleMDE to have the function to be covered with useCallback.
  }, []);

  //defined options for the new post reductor:
  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Article text...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  //if user is not authenticated, he is redirected to the main page.
  if (!isAuth) {
    return <Navigate to='/' />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button variant='outlined' size='large'>
        Upload preview
      </Button>
      <input type='file' onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant='contained' color='error' onClick={onClickRemoveImage}>
          Delete
        </Button>
      )}
      {imageUrl && (
        <img
          className={styles.image}
          src={`http://localhost:4444${imageUrl}`}
          alt='Uploaded'
        />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant='standard'
        placeholder='Article header...'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant='standard'
        placeholder='Tags'
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={value}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button size='large' variant='contained'>
          Post
        </Button>
        <a href='/'>
          <Button size='large'>Cancel</Button>
        </a>
      </div>
    </Paper>
  );
};
