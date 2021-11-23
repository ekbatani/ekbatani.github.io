import { React } from 'react';
import Async from 'react-async';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import Note from '../components/SecondBrain/Note';

// const { data } = import(`../data/SecondBrain/secondBrain`);
// import data from '../data/SecondBrain/secondBrain';
import noteList from '../data/SecondBrain/noteList';

const getId = () => {
  // const { search } = useLocation();
  let id = new URLSearchParams('search').get('id');
  // eslint-disable-next-line no-console
  // console.log(this);
  if (id === null) id = '1';
  return id;
};

const getData = async () => {
  const id = 1;
  const fileName = noteList
    .filter((note) => note.id === id)
    .map((item) => item.link + item.file)
    .toString();
  // eslint-disable-next-line no-console
  console.log(fileName);

  // eslint-disable-next-line prefer-template
  const link = '../data/SecondBrain/' + fileName;

  // eslint-disable-next-line no-console
  console.log(link);

  // const data = await import(link).then(async (fileData) => fileData.default);
  let object;
  import('../data/SecondBrain/secondBrain.js')
    .then((fileData) => fileData.default)
    .then((importedData) => {
      object = importedData;
    });

  // eslint-disable-next-line no-console
  console.log(object);

  return object;
};

// loadJs = (url, name) => {
//   return new Promise((resolve) => {
//     import(`../data/SecondBrain/${name}`).then((module) => {
//       resolve(module.default);
//     });
//   });
// };

const SecondBrain = () => (
  <Main title="secondBrain" description="Second brain of Amir Ekbatani">
    <article className="" id="secondBrain">
      <header>
        <div className="title">
          <h2 data-testid="heading">
            <Link to="/secondBrain">Second Brain</Link>
          </h2>
        </div>
      </header>
      <Async promiseFn={getData} id="1">
        {({ data, error, isPending }) => {
          if (isPending) return 'Loading...';
          if (error) return `Something went wrong: ${error.message}`;
          if (data) return <Note data={data} key={getId()} />;
          return null;
        }}
      </Async>
    </article>
  </Main>
);

export default SecondBrain;
