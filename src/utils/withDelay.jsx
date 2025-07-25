// utils/withDelay.js
import React, { useState, useEffect } from 'react';
import Loading from "../components/Loading"

export default function withDelay(Component, delay = 3000) {
  return function DelayedComponent(props) {
    const [show, setShow] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setShow(true), delay);
      return () => clearTimeout(timer);
    }, []);

    if (!show) {
      return <Loading /> 
    }

    return <Component {...props} />;
  };
}
