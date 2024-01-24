// Home.js
import React from 'react';
import AddNote from './AddNotes';
import Notes from './Notes';

const Home = () => {
  return (
    <div className='lh-lg'>
     
      <AddNote />
      <Notes />
    </div>
  );
};

export default Home;
