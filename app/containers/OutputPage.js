// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Output from '../components/Output';
import { setFile } from '../actions/doc';

const mapStateToProps = (state) => ({
  file: state.doc.file,
  functions: state.doc.functions,
  lines: state.doc.lines
});

export default connect(mapStateToProps, { setFile })(Output);
