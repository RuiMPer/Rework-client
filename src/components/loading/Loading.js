import React from 'react';
import { Spinner } from 'reactstrap';
import './Loading.css';

const Loading = (props) => {
  return (
    <div className="loading">
      <Spinner type="grow" color="success" /> Loading...
    </div>
  );
}

export default Loading;