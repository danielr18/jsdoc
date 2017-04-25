// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import fs from 'fs';
import Dropzone from 'react-dropzone';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
    }
  }

  handleDragFalse = () => false;

  handleDrop = files => {
    if (files.length > 0) {
      this.props.setFile({
        path: files[0].path,
        name: files[0].name,
      });
    }
    return false;
  }

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <p>Drag and Drop a JS file to begin...</p>
          <Dropzone
            accept=".js"
            onDrop={this.handleDrop}
            className={styles.dropzone}
            activeClassName={styles.activedrop}
            style={{marginBottom: '35px'}}
          >
          {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
            if (isDragActive) {
              return "This file is authorized";
            }
            if (isDragReject) {
              return "This file is not authorized";
            }

            return this.props.file
              ? `Selected \"${this.props.file.name}\"`
              : "Try dropping a file";
          }}
          </Dropzone>
          {this.props.file &&
            <Link className="btn" to="/doc">Begin documentation process</Link>
          }
        </div>
      </div>
    );
  }
}
