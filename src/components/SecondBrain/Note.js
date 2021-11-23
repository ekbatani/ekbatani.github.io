import React from 'react';
import { PropTypes } from 'prop-types';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

const Note = ({ data }) => (
  <div>
    <div>
      <h3>{data.title}</h3>
    </div>
    <div>
      <p>{data.subTitle}</p>
    </div>
    <div>
      <div className="3">
        <h4>Recall</h4>
      </div>
      <div className="9">
        <h4>Note</h4>
      </div>
    </div>
  </div>
);

Note.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    format: PropTypes.oneOf(['ltr', 'rtl']),
    title: PropTypes.string,
    subTitle: PropTypes.string,
    link: PropTypes.string,
    date: PropTypes.string,
    recall: PropTypes.shape({
      tags: PropTypes.arrayOf(PropTypes.string),
      questions: PropTypes.arrayOf(PropTypes.string),
    }),
    notes: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        title: PropTypes.string,
        text: PropTypes.arrayOf(
          PropTypes.shape({
            text: PropTypes.string,
            link: PropTypes.string,
          }),
        ),
      }),
    ),
    summery: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        title: PropTypes.string,
        text: PropTypes.arrayOf(PropTypes.string),
      }),
    ),
  }),
};

Note.defaultProps = {
  data: [],
};

export default Note;
