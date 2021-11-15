import React from 'react';
import PropTypes from 'prop-types';

const Post = ({ data }) => (
  <article className="jobs-container">
    <header>
      <h4>
        <a href={data.link}>{data.title}</a>
      </h4>
      <p className="daterange"> {data.date}</p>
    </header>
    <ul className="points list-without-bullets">
      {data.context.map((point) => (
        <li key={point}>{point}</li>
      ))}
    </ul>
  </article>
);

Post.propTypes = {
  data: PropTypes.shape({
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    context: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Post;
