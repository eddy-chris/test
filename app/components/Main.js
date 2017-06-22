var React = require('react');
var Link = require('react-router').Link;

var Main = React.createClass({
  render: function () {
    return (
      <div className='main-container'>
        <nav className='navbar navbar-default'>
          <div className='container-fluid'>
            <div className='navbar-header'>
            </div>
            <ul className='nav navbar-nav'>
            </ul>
          </div>
        </nav>
        <main className='container'>
          <div className='col-md-8 col-md-offset-2'>
             {this.props.children}
            </div>
        </main>
      </div>
    )
  }
});

module.exports = Main;