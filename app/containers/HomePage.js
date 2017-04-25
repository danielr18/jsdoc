// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';
import { setFile } from '../actions/doc';

const mapStateToProps = (state) => ({
  file: state.doc.file,
});

export default connect(mapStateToProps, { setFile })(Home);
