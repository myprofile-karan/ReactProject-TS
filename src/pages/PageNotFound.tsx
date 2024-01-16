import React from 'react';

const NotFound: React.FC = () => {

  const goBackToLastPage = () => {
    window.history.back();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Page Not Found</h1>
      <p style={styles.message}>
        Sorry, the page you are looking for might not exist. Go back to{' '}
        <button onClick={goBackToLastPage} style={styles.button}>
          go back to the last page
        </button>
        .
      </p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  title: {
    fontSize: '2em',
    color: '#d9534f',
  },
  message: {
    fontSize: '1.2em',
    color: '#777',
  },
  button: {
    color: '#5bc0de',
    textDecoration: 'underline',
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    padding: '0',
    font: 'inherit',
  },
} as const;

export default NotFound;
