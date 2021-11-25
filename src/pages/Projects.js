import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

import Cell from '../components/Projects/Cell';
import data from '../data/projects';
import dataInProgress from '../data/inProgressProjects';

const Projects = () => (
  <Main title="Projects" description="Learn about Amir Ekbatani's projects.">
    <article className="post" id="projects">
      <header>
        <div className="title">
          <h2 data-testid="heading">
            <Link to="/projects">Projects</Link>
          </h2>
          <p>A selection of projects that I&apos;m not too ashamed of</p>
        </div>
      </header>
      {data.map((project) => (
        <Cell data={project} key={project.title} />
      ))}
      <header>
        <div className="title">
          <h2 data-testid="heading">
            <Link to="/projects">In Progress Projects</Link>
          </h2>
          <p>This is what I&apos;m doing right now</p>
        </div>
      </header>
      {dataInProgress.map((project) => (
        <Cell data={project} key={project.title} />
      ))}
    </article>
  </Main>
);

export default Projects;
