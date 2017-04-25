// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fs from 'fs';
import functionExtractor from 'function-extractor';
import { js_beautify } from 'js-beautify';
import renderHTML from 'react-render-html';
import prism from 'prism';
import styles from './Output.css';
import moment from 'moment';
import generateHTMLDoc from '../utils/generateHTMLDoc';
import path from 'path';
import {shell} from 'electron';

export default class Doc extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      name: (props.file && props.file.name) ? props.file.name : '',
      description: '',
      author: '',
    }
  }

  buildFinalFile = () => {
    const lines = this.props.lines.slice();
    this.props.functions.forEach((fn, i) => {
      lines[fn.loc - 1] = this.docString(fn) + lines[fn.loc - 1];
      if (i == 0) {
        lines[0] = this.buildHeader() + lines[0];
      }
    });
    return lines.join('\n');
  }

  buildHeader = () => {
    const h = this.state;

    return '/**\n'
         + (h.name && `* ${h.name}\n`)
         + (h.description && (h.description.split('\n').map(line => `* ${line}`).join('\n') + '\n'))
         + (h.author && `* @author: ${h.author}\n`)
         + (h.date && `* @date: ${moment(h.date).format('YYYY/MM/DD')}\n`)
         + '*/\n\n';
  }

  docString(doc) {
    return '/**\n'
         + (doc.method && `* @method: ${doc.method}\n`)
         + (doc.description && (doc.description.split('\n').map(line => `* ${line}`).join('\n') + '\n'))
         + (doc.params && doc.params.length > 0 ? (doc.params.map(param => `* @param: ${param}`).join('\n') + '\n') : '')
         + (doc.returns && `* @return: ${doc.returns}\n`)
         + '*/';
  }

  onNameChange = e => {
      this.setState({
        name: e.target.value,
      });
  }

  onDescriptionChange = e => {
      this.setState({
        description: e.target.value,
      });
  }

  onAuthorChange = e => {
      this.setState({
        author: e.target.value,
      });
  }

  saveFile = () => {
      fs.writeFile(this.props.file.path, js_beautify(this.buildFinalFile(), { indent_size: 2 }), err => {
        if (err) {
          console.log(err);
        }

        const dirName = path.dirname(this.props.file.path);
        const htmlName = `${path.basename(this.props.file.path, '.js')}.doc.html`;
        fs.writeFile(path.join(dirName, htmlName), generateHTMLDoc(this.state, this.props.functions), err => {
          if (err) {
            console.log(err);
          }

          shell.openItem(this.props.file.path);
          shell.openItem(path.join(dirName, htmlName));

          alert("The files were saved!");
        });
      });
  }

  render() {
    if (!this.props.lines || !this.props.functions) {
      return null;
    }

    return (
      <div className="container">
        <h3>Preview:</h3>
        <div className={styles.codepreview}>
          <pre className="language-javascript" style={{height: '100%'}}>
            {renderHTML(Prism.highlight(js_beautify(this.buildFinalFile(), { indent_size: 2 }), Prism.languages.javascript))}
          </pre>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <label>Name</label>
            <input type="text" placeholder={this.state.name} value={this.state.name} onChange={this.onNameChange} />
            <label>Description</label>
            <textarea placeholder="File's purpose..." value={this.state.description} onChange={this.onDescriptionChange} />
            <label>Author</label>
            <input type="text" placeholder="Author" value={this.state.author} onChange={this.onAuthorChange} />
          </div>
          <div style={{textAlign: 'center'}}>
            <button className="btn" onClick={this.saveFile}>Save</button>
          </div>
        </div>,
      </div>
    );
  }
}
