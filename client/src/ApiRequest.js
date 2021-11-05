import React, { Component } from 'react'
import axios                from 'axios';

export default class ApiRequest extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    const article = { login: 'traxes68@gmail.com', password: '1772001735' };
    axios.post('http://localhost:5000/api/register', article)
      .then(response => {
        this.setState({ data: response.data })
        const { data } = this.state
        data.map(part => { localStorage.setItem("jwt", part.jwt); localStorage.setItem("admin", part.admin) })
      })
  }

  render() {
    return (true)
  }
}