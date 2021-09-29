import React, { Component } from 'react'

export default class App extends Component {

  state = {
    boards: [
      { id: 1, title: 'Make', items: [{ id: 1, title: 'Go the Shop' }, { id: 2, title: 'Drink Coffee' }, { id: 3, title: 'Play Football' }]},
      { id: 2, title: 'Check', items: [{ id: 4, title: 'Go the Gym' }, { id: 5, title: 'Eating'}, { id: 6, title: 'Play Phone' }]},
      { id: 3, title: 'Done', items: [{ id: 7, title: 'Go the Runing' }, { id: 8, title: 'Drink Milk' }, { id: 9, title: 'Slep' }]},
    ],
    currentBoard: null,
    currentItem: null,
  } 

  dragOverHandler = (e) => {
    e.preventDefault()
    if (e.target.className === 'item') {
      e.target.style.boxShadow = '0 4px 3px gray'
    }
  }
  dragLeaveHandler = (e) => e.target.style.boxShadow = 'none'
  dragStartHandler = (e, board, item) => this.setState({currentBoard: board, currentItem: item})
  dragEndHandler= (e) => e.target.style.boxShadow = 'none'
  
  dropHandler = (e, board, item) => {
    e.preventDefault()
    const currentIndex = this.state.currentBoard.items.indexOf(this.state.currentItem)
    this.state.currentBoard.items.splice(currentIndex, 1)
    const dropIndex = board.items.indexOf(item)
    board.items.splice(dropIndex + 1, 0, this.state.currentItem)
    this.setState({boards: this.state.boards.map(b => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === this.state.currentBoard.id) {
        return this.state.currentBoard
      }
      return b
    })})
    e.target.style.boxShadow = 'none'
  }

  dropCardHandler = (e, board) => {
    board.items.push(this.state.currentItem)
    const currentIndex = this.state.currentBoard.items.indexOf(this.state.currentItem)
    this.state.currentBoard.items.splice(currentIndex, 1)
    this.setState({boards: this.state.boards.map(b => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === this.state.currentBoard.id) {
        return this.state.currentBoard
      }
      return b
    })})
    e.target.style.boxShadow = 'none'
  }

  render() {
    const { boards } = this.state
    return (
      <div className='app'>
        {boards.map(board => 
          <div 
            className="board" 
            key={board.id}
            onDragOver={(e) => this.dragOverHandler(e)}
            onDrop={(e) => this.dropCardHandler(e, board)}
            >
            <div className="board__title">{board.title}</div>
            {board.items.map(item => 
              <div 
                onDragOver={(e) => this.dragOverHandler(e)}
                onDragLeave={e => this.dragLeaveHandler(e)}
                onDragStart={(e) => this.dragStartHandler(e, board, item)}
                onDragEnd={(e) => this.dragEndHandler(e)}
                onDrop={(e) => this.dropHandler(e, board, item)}
                className="item" 
                key={item.id}
                draggable={true}
                >
                {item.title}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}
