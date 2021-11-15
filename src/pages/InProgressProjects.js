import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

import Cell from '../components/Projects/Cell';
import data from '../data/inProgressProjects';

const InProgressProjects = () => (
  <Main
    title="In Progress Projects"
    description="Learn about Amir Ekbatani's in progress projects."
  >
    <article className="post" id="projects">
      <header>
        <div className="title">
          <h2 data-testid="heading">
            <Link to="/projects">In Progress Projects</Link>
          </h2>
          <p>This is what I&apos;m doing right now</p>
        </div>
      </header>
      {data.map((project) => (
        <Cell data={project} key={project.title} />
      ))}
    </article>
  </Main>
);

export default InProgressProjects;
