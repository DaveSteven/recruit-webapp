import React from 'react';

class App extends React.Component{
  componentWillMount() {
    console.log('组件马上加载')
  }
  componentDidMount() {
    console.log('组件加载完毕')
  }
  render() {
    console.log('组件正在加载')
    return (
      <h2>独立团</h2>
    )
  }
}

export default App;