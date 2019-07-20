import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Footer from './Footer'
import './App.css';

const ROUTES = {
  taches: '#/',
  tachesCompletes: '#/Taches-completes',
  tachesIncompletes: '#/Taches-incompletes'
}

export default class App extends Component {

  state = { tasks: [{ id: 1, content: 'Nager', completed: false }, { id: 2, content: 'Massage', completed: false }, { id: 3, content: 'Courses', completed: true }], taskAdd: '', currentRoute: ROUTES.taches }

  componentDidMount() {
    window.location.hash = ROUTES.taches;
    window.onhashchange = () => {

      this.setState({ currentRoute: window.location.hash })
    }
  }
  toutesLesTaches() {
    return this.state.tasks
  }
  tachesCompletes() {
    return this.state.tasks.filter(elt => elt.completed === true)
  }
  tachesIncompletes() {
    return this.state.tasks.filter(elt => elt.completed === false)
  }
  renderRoute() {
    switch (this.state.currentRoute) {
      case ROUTES.taches: return <TaskList tasks={this.toutesLesTaches()} onDelete={this.handleDelete.bind(this)} changeColor={this.handleColor.bind(this)} title='Toutes les taches' />;
      case ROUTES.tachesCompletes: return <TaskList tasks={this.tachesCompletes()} onDelete={this.handleDelete.bind(this)} changeColor={this.handleColor.bind(this)} title='Taches Complétées' />;
      case ROUTES.tachesIncompletes: return <TaskList tasks={this.tachesIncompletes()} onDelete={this.handleDelete.bind(this)} changeColor={this.handleColor.bind(this)} title='Taches Incomplétes' />;
      default: return <NotFound />
    }
  }
  handleDelete(elt) {
    const clickedElt = elt.id
    const newState = this.state.tasks.filter(item => item.id !== clickedElt)

    this.setState({ tasks: newState })
  }

  handleChange(e) {
    this.setState({ taskAdd: e.target.value })
  }
  handleSubmit(e) {
    e.preventDefault()

    const newTask = {
      id: this.state.tasks.length + 1,
      content: this.state.taskAdd,
      completed: false
    }

    const allTasks = this.state.tasks.concat(newTask)

    this.setState({ tasks: allTasks, taskAdd: '' })

  }
  handleColor(elt) {
    const newStatus = elt.completed === true ? elt.completed = false : elt.completed = true
    this.setState({ completed: newStatus })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-light" style={{ backgroundColor: '#a7d2f2' }}>
          <span className="navbar-text h5">
            <ul className='list-group list-group-horizontal'>
              <li className='list-group-item'>
                <a href={ROUTES.taches} className='text-info'>Toutes les taches</a></li>
              <li className='list-group-item'>
                <a href={ROUTES.tachesCompletes} className='text-info' >Taches complétées</a>
              </li>
              <li className='list-group-item'>
                <a href={ROUTES.tachesIncompletes} className='text-info'>Taches incomplétes</a>
              </li>
            </ul>
          </span>
                </nav>
        <div className="container">
          {this.renderRoute()}
          <form className="form-row justify-content-center mt-2" onSubmit={this.handleSubmit.bind(this)}>
            <div className="col-auto">
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text"><i className="fas fa-list"></i></div>
                </div>
                <input type="text" className="form-control" value={this.state.taskAdd} onChange={this.handleChange.bind(this)} placeholder="Nouvelle Tache" required/>
              </div>
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-outline-info mb-2">Ajouter Tache</button>
            </div>
          </form>
                </div>
        <Footer />
      </div>
    );
  }

}

const TaskList = props => {
  const clickHandler = elt => {
    props.onDelete(elt)
  }
  const clickColorChange = elt => {
    props.changeColor(elt)
  }
  return (
    <ul className='list-group mt-3'>
      <h3 className='text-monospace font-italic text-primary my-3'>{props.title}</h3>
      {props.tasks.map((elt, i) => <Task key={i} elt={elt} handleClick={clickHandler.bind(this, elt)} clickColor={clickColorChange.bind(this, elt)} />)}
    </ul>
  )
}
const Task = props => (
  props.elt.completed ? <li className='list-group-item w-50 mx-auto list-group-item-secondary my-1 border-danger'><i className="far fa-calendar-check cb fa-pull-left" onClick={props.clickColor} data-toggle="tooltip" data-placement="left" title="Change status"></i><s>{props.elt.content}</s><i className="far fa-times-circle cc fa-pull-right" onClick={props.handleClick} data-toggle="tooltip" data-placement="right" title="Delete item"></i></li> :
    <li className='list-group-item w-50 mx-auto list-group-item-info my-1 border-success'><i className="far fa-calendar cr fa-pull-left" onClick={props.clickColor} data-toggle="tooltip" data-placement="left" title="Change status"></i>{props.elt.content}<i className="far fa-times-circle cc fa-pull-right" onClick={props.handleClick} data-toggle="tooltip" data-placement="right" title="Delete item"></i></li>
)

const NotFound = props => {
  return <h2>La page que vous demandez, n'existe pas Désolé !!!</h2>
}

