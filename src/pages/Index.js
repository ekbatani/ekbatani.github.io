import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

const Index = () => (
  <Main>
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2 data-testid="heading">
            <Link to="/">About Me</Link>
          </h2>
          <p>
            My enjoyment is to research and learn new stuff. So choosing web
            developer as career is the best way to enjoying my life.
          </p>
        </div>
      </header>
      <p>
        {' '}
        Welcome to my website. Please feel free to read more{' '}
        <Link to="/about">about me</Link>, or you can check out my{' '}
        <Link to="/resume">resume</Link>, <Link to="/projects">projects</Link>,{' '}
        view <Link to="/stats">site statistics</Link>, or{' '}
        <Link to="/contact">contact</Link> me.
      </p>
      <p>
        {' '}
        Source available{' '}
        <a href="https://github.com/ekbatani/ekbatani.github.io">here</a>.
      </p>
      <p>
        Thank to{' '}
        <a href="https://github.com/mldangelo/personal-site">mldangelo</a> for
        building this template.
      </p>
    </article>
  </Main>
);

export default Index;
