// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Doc from '../components/Doc';
import { setFunctions, setLines } from '../actions/doc';

const mapStateToProps = (state) => ({
  file: state.doc.file,
  functions: state.doc.functions,
  lines: state.doc.lines,
});

export default connect(mapStateToProps, { setFunctions, setLines })(Doc);
