import React from 'react';
import PropTypes from 'prop-types';

import Post from './Post';

const Posts = ({ data }) => (
  <div className="experience">
    <div className="link-to" id="experience" />
    <div className="title">
      <h3>Posts</h3>
    </div>
    {data.map((post) => (
      <Post data={post} key={post.company} />
    ))}
  </div>
);

Posts.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      company: PropTypes.string,
      position: PropTypes.string,
      link: PropTypes.string,
      daterange: PropTypes.string,
      points: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
};

Posts.defaultProps = {
  data: [],
};

export default Posts;
