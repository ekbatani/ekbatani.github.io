import { React } from 'react';
import { Link, useParams } from 'react-router-dom';

import Main from '../layouts/Main';
import Note from '../components/SecondBrain/NoteFa';

import data from '../data/SecondBrain/secondBrainFa';

const sections = [
  { title: 'مغز دوم', link: 1 },
  { title: 'برنامه نویسی', link: 2 },
];

const getId = () => {
  let { id } = useParams();
  if (id === null) id = '1';
  return id;
};

const getData = () => {
  const id = getId();
  const note = data[id - 1];
  return note;
};

const SecondBrainFa = () => (
  <Main title="secondBrain" description="Second brain of Amir Ekbatani">
    <article dir="rtl" className="post fa" id="secondBrain">
      <header>
        <div className="title">
          <h2 data-testid="heading">
            <Link to="/secondBrain/1">مغز دوم</Link>
          </h2>
          <div className="link-container">
            {sections.map((sec) => (
              <h4 key={sec}>
                <Link to={`${sec.link}`}>{sec.title}</Link>
              </h4>
            ))}
          </div>
        </div>
        <div className="lang">
          <Link to={`/secondBrainFa/${getId()}`} className="button active fa">فارسی</Link>
          <Link to={`/secondBrain/${getId()}`} className="button">En</Link>
        </div>
      </header>
      <Note data={getData()} key={getId()} />
    </article>
  </Main>
);

export default SecondBrainFa;
