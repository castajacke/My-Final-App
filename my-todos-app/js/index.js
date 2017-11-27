'use strict';

/* Todo App Made In ReactJS */

var Todo = React.createClass({
  displayName: 'Todo',

  addItem: function addItem() {
    if (this.state.inputValue.length === 0) return;
    this.setState({ items: [{ value: this.state.inputValue, done: false }].concat(this.state.items), inputValue: '' });
  },

  deleteItem: function deleteItem(index) {
    var updatedItems = this.state.items;
    updatedItems.splice(index, 1);
    this.setState({ items: updatedItems });
  },

  archiveItems: function archiveItems() {
    var updatedItems = this.state.items;
    updatedItems = updatedItems.filter(function (item) {
      return !item.done;
    });
    this.setState({ items: updatedItems });
  },

  inputOnChange: function inputOnChange(event) {
    this.setState({ inputValue: event.target.value });
  },

  toggleTodoState: function toggleTodoState(index) {
    var updatedItems = this.state.items;
    updatedItems[index].done = !updatedItems[index].done;
    this.setState({ items: updatedItems });
  },

  getInitialState: function getInitialState() {
    return {
      items: [{ value: 'Buy Milk', done: false }, { value: 'Feed the dog', done: false }],
      inputValue: ''
    };
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'todo-app' },
      React.createElement(
        'h1',
        null,
        'Todo Repeat'
      ),
      React.createElement(InputBar, { inputValue: this.state.inputValue, inputOnChange: this.inputOnChange, addItem: this.addItem }),
      React.createElement(ItemsList, { items: this.state.items, toggle: this.toggleTodoState, 'delete': this.deleteItem }),
      React.createElement(
        'button',
        { type: 'button', className: 'btn-archive', onClick: this.archiveItems },
        React.createElement('i', { className: 'fa fa-archive fa-lg' }),
        'Archive Done'
      )
    );
  }

});

var InputBar = React.createClass({
  displayName: 'InputBar',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'input-bar' },
      React.createElement('input', { type: 'text', placeholder: 'New item', value: this.props.inputValue, onChange: this.props.inputOnChange }),
      React.createElement(
        'button',
        { type: 'button', className: 'btn-add', onClick: this.props.addItem },
        React.createElement('span', { className: 'fa fa-pencil fa-lg' })
      )
    );
  }
});

var ItemsList = React.createClass({
  displayName: 'ItemsList',

  render: function render() {
    var items = this.props.items,
        i = -1;
    var toggle = this.props.toggle;
    var remove = this.props.delete;
    return React.createElement(
      'ul',
      null,
      items.map(function (item) {
        i++;
        return React.createElement(Item, { key: i, data: item, 'data-index': i, toggle: toggle, 'delete': remove });
      })
    );
  }
});

var Item = React.createClass({
  displayName: 'Item',

  render: function render() {
    var _this = this;

    return React.createElement(
      'li',
      { className: this.props.data.done ? 'item done' : 'item' },
      React.createElement('input', { type: 'checkbox', id: 'checkbox-' + this.props['data-index'], checked: this.props.data.done, onChange: function onChange() {
          return _this.props.toggle(_this.props['data-index']);
        } }),
      React.createElement(
        'label',
        { htmlFor: 'checkbox-' + this.props['data-index'] },
        React.createElement('i', { className: 'fa fa-check fa-lg' })
      ),
      React.createElement(
        'span',
        null,
        this.props.data.value
      ),
      React.createElement(
        'button',
        { type: 'button', onClick: function onClick() {
            return _this.props.delete(_this.props['data-index']);
          } },
        React.createElement('i', { className: 'fa fa-trash fa-lg' })
      )
    );
  }
});

ReactDOM.render(React.createElement(Todo, null), document.getElementById('app'));