// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fs from 'fs';
import functionExtractor from 'function-extractor';
import { js_beautify } from 'js-beautify';
import renderHTML from 'react-render-html';
import prism from 'prism';

export default class Doc extends Component {

  constructor(props) {
    super(props);
    this.state = {
      functions: null,
      lines: null,
    }
  }

  componentDidMount() {
    if (this.props.file) {
      fs.readFile(this.props.file.path, 'utf8', (err, data) => {
        if (err) {
          console.log(err);
        }
        this.setState({
          fnIndex: 0,
          functions: functionExtractor.parse(data).map(fn => Object.assign({}, fn, {
            doc: {
              method: fn.name,
              params: fn.params.map(param => param.name),
              returns: '',
              description: ''
            }
          })),
          lines: data.toString().split('\n'),
        });
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.file && this.props.file) {
      fs.readFile(this.props.file.path, 'utf8', (err, data) => {
        if (err) {
          console.log(err);
        }
        this.setState({
          fnIndex: 0,
          functions: functionExtractor.parse(data).map(fn => Object.assign({}, fn, {
            doc: {
              method: fn.name,
              params: fn.params.map(param => param.name),
              returns: '',
              description: ''
            }
          })),
          lines: data.toString().split('\n'),
        });
      });
    }
  }

  prevFunction = () => {
    if(this.state.fnIndex > 0 ) {
      this.setState(state => ({
        fnIndex: state.fnIndex - 1,
      }));
    }
  }

  nextFunction = () => {
    if(this.state.fnIndex < this.state.functions.length - 1) {
      this.setState(state => ({
        fnIndex: state.fnIndex + 1,
      }));
    }
  }

  onMethodChange = e => {
    const functions = this.state.functions.slice();
    functions[this.state.fnIndex] = Object.assign({}, functions[this.state.fnIndex], {
      doc: Object.assign({}, functions[this.state.fnIndex].doc, { method: e.target.value }),
    });
    this.setState({
      functions,
    });
  }

  onDescriptionChange = e => {
    const functions = this.state.functions.slice();
    functions[this.state.fnIndex] = Object.assign({}, functions[this.state.fnIndex], {
      doc: Object.assign({}, functions[this.state.fnIndex].doc, { description: e.target.value }),
    });
    this.setState({
      functions,
    });
  }

  onParamChange = (e, i) => {
    const functions = this.state.functions.slice();
    const params = functions[this.state.fnIndex].doc.params;
    params[i] = e.target.value;
    functions[this.state.fnIndex] = Object.assign({}, functions[this.state.fnIndex], {
      doc: Object.assign({}, functions[this.state.fnIndex].doc, {
        params
      }),
    });
    this.setState({
      functions,
    });
  }

  onReturnsChange = e => {
    const functions = this.state.functions.slice();
    functions[this.state.fnIndex] = Object.assign({}, functions[this.state.fnIndex], {
      doc: Object.assign({}, functions[this.state.fnIndex].doc, { returns: e.target.value }),
    });
    this.setState({
      functions,
    });
  }

  docString(doc) {
    return '/**\n'
         + (doc.method && `* @method: ${doc.method}\n`)
         + (doc.description && (doc.description.split('\n').map(line => `* ${line}`).join('\n') + '\n'))
         + (doc.params && doc.params.length > 0 ? (doc.params.map(param => `* @param: ${param}`).join('\n') + '\n') : '')
         + (doc.returns && `* @return: ${doc.returns}\n`)
         + '*/';
  }

  finishDocumentation = () => {
    this.props.setFunctions(this.state.functions.map(fn => Object.assign({}, fn.doc, { loc: fn.loc.line })));
    this.props.setLines(this.state.lines);
    location.hash = '#/output';
  }

  render() {
    if(!this.state.functions) {
      return null;
    }
    const fn = this.state.functions[this.state.fnIndex];
    const minLine = fn.loc.line - 3 > 0 ? fn.loc.line - 3 : 0;
    const lines = this.state.lines.slice(minLine, fn.loc.line - 1);
    lines.push(this.docString(fn.doc))
    lines.push(this.state.lines.slice(fn.loc.line - 1, fn.loc.line + 2));
    return (
      <div className="container">
        <h3>Preview:</h3>
        <pre className="language-javascript">
          {renderHTML(Prism.highlight(js_beautify(lines.join('\n'), { indent_size: 2 }), Prism.languages.javascript))}
        </pre>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <label>Method</label>
          <input type="text" placeholder={fn.name} value={fn.doc.method} onChange={this.onMethodChange} />
          <label>Description</label>
          <textarea placeholder="Method's purpose..." value={fn.doc.description} onChange={this.onDescriptionChange} />
          {fn.params.length > 0 &&
            <label>Params</label>
          }
          {fn.params.map((param, i) => (
            <input key={i} type="text" placeholder="Param" value={fn.doc.params[i]} onChange={e => this.onParamChange(e, i)}  />
          ))}
          <label>Returns</label>
          <input type="text" placeholder="void" value={fn.doc.returns} onChange={this.onReturnsChange} />
        </div>
        <div style={{textAlign: 'center', marginTop: '10px'}}>
          <button className="btn" style={{ padding: "10px 5px", marginRight: '10px'}} onClick={this.prevFunction}>Previous</button>
          <button className="btn" style={{ padding: "10px 5px", marginRight: '10px'}} onClick={this.finishDocumentation}>Finish</button>
          <button className="btn" style={{ padding: "10px 5px", marginRight: '10px'}} onClick={this.nextFunction}>Next</button>
        </div>
      </div>
    );
  }
}
