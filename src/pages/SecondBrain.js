import { React } from 'react';
import { Link, useParams } from 'react-router-dom';

import Main from '../layouts/Main';
import Note from '../components/SecondBrain/Note';

import data from '../data/SecondBrain/secondBrain';

const getId = () => {
  let { id } = useParams();
  if (id === null) id = '1';
  return id;
};

const getData = () => {
  const id = getId();
  const note = data[id - 1];

  // eslint-disable-next-line no-console
  // console.log(note);

  return note;
};

const SecondBrain = () => (
  <Main title="secondBrain" description="Second brain of Amir Ekbatani">
    <article className="post" id="secondBrain">
      <header>
        <div className="title">
          <h2 data-testid="heading">
            <Link to="/secondBrain">Second Brain</Link>
          </h2>
        </div>
      </header>
      <Note data={getData()} key={getId()} />
    </article>
  </Main>
);

export default SecondBrain;
