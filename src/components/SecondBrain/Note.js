import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

function Note({ data }) {
  const tags = Object.values(data.recall.tags);
  const questions = Object.values(data.recall.questions);
  const notes = Array.from(data.notes);
  const summery = Array.from(data.summery);

  return (
    <div className="note">
      <div className="title">
        <h3>{data.title}</h3>
      </div>
      <div className="subtitle">
        <p>{data.subTitle}</p>
      </div>
      <div className="body">
        <div className="recall">
          <h4>Recall</h4>
          <h5>tags :</h5>
          {tags.map((tag) => (
            <span key={tag}>{tag}, </span>
          ))}
          <br />
          <br />
          <h5>questions :</h5>
          {questions.map((question) => (
            <div key={question}>{question} </div>
          ))}
        </div>

        <div className="context">
          <h4>Note</h4>
          {notes.map((note) => (
            <div>
              <div>{note.title}</div>
              {Object.values(note.text).map((text) => (
                <div>
                  {note.isList ? (
                    <Link to={`${text.link}`} key={`${text.text}`}>
                      {text.text}
                    </Link>
                  ) : (
                    <div key={`${text.link}`}>{text.text}</div>
                  )}
                </div>
              ))}
              <br />
            </div>
          ))}
        </div>
      </div>

      <div className="summery">
        <h4>Summery</h4>
        {summery.map((note) => (
          <div>
            <div>{note.title}</div>
            {Object.values(note.text).map((text) => (
              <div>
                {note.isList ? (
                  <Link to={`${text.link}`} key={`${text.text}`}>
                    {text.text}
                  </Link>
                ) : (
                  <div key={`${text.link}`}>{text.text}</div>
                )}
              </div>
            ))}
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}

Note.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    format: PropTypes.oneOf(['ltr', 'rtl']),
    title: PropTypes.string,
    subTitle: PropTypes.string,
    link: PropTypes.string,
    date: PropTypes.string,
    recall: PropTypes.arrayOf({
      tags: PropTypes.arrayOf(PropTypes.string),
      questions: PropTypes.arrayOf(PropTypes.string),
    }),
    notes: PropTypes.arrayOf(
      PropTypes.shape({
        isList: PropTypes.bool,
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
