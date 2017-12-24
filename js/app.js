import React, { Component } from 'react';
import { render } from 'react-dom';
import styles from '../css/style.css'
class App extends Component {
  render() {
    return (
      <div className={styles.grid}>
        <div className={styles.nav}>nav</div>
        <div className={styles.main}>main</div>
        <div className={styles.foot}>foot</div>
      </div>
    );
  }
}
render(
  <App />,
  document.getElementById('app')
);
