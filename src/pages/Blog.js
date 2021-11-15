import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

import Posts from '../components/Blog/Posts';

import posts from '../data/blog/posts';

const Blog = () => (
  <Main title="Blog" description="Amir Ekbatani's Blog.">
    <article className="post" id="blog">
      <header>
        <div className="title">
          <h2 data-testid="heading">
            <Link to="blog">Blog</Link>
          </h2>
          <p>Writing is the most difficult, hobby :)</p>
        </div>
      </header>
      <Posts data={posts} />
    </article>
  </Main>
);

export default Blog;
