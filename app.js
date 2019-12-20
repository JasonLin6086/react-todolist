class App extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      todolists: props.todolists,
      fetchItems: 5,
      currentIdx: 0,
      currentEndIdx: 0,
      currentOutput: [],
    };
    this.onClick = this.onClick.bind(this);
    this.getMore = this.getMore.bind(this);
  }
  
  componentDidMount() {
    this.getMore(false);
  }

  getMore(clickCheckBox) {
    const {todolists, currentIdx, currentEndIdx, fetchItems, currentOutput} = this.state;
    const loadingCount = clickCheckBox ? currentEndIdx : fetchItems;
    for (let i=0; (i< loadingCount && currentIdx + i < todolists.length); i++) {
      const todolist = todolists[currentIdx + i];
     	currentOutput.push(
        <div key={currentIdx + i}>
          <div>
            <input 
              type="checkbox" 
              checked={todolist.completed}
              onClick={this.onClick.bind(this, todolist.id)}
              onChange={() => {}}
            />
      	    {todolist.details}
          </div>
        </div>);
       this.setState({
       	currentOutput: currentOutput,
        currentIdx: currentIdx + loadingCount,     
        currentEndIdx: currentOutput.length,
       });
     }
  }
  
  onClick(id) {
    const {todolists} = this.state;
    const found = todolists.findIndex((todolist) => {
      return todolist.id === id;
    });
    if (found !== -1) {
      todolists[found].completed = true;
    }
    this.setState(
      {todolists: todolists, currentIdx: 0, currentOutput: []}, 
      this.getMore.bind(this, true)
    );
  }
  
  render() {
    const {todolists, currentOutput} = this.state;
    const style = {
      color: 'white',
      width: '120px',
      marginTop: '20px',
      height: '30px',
      borderRadius: '2px',
      backgroundColor: 'blue'
    };
    const hasMore = todolists.length === currentOutput.length;
    return (
    	<div>
        {currentOutput.map((list) => list)}
        <span>
          <button style={style} onClick={this.getMore}>
            {!hasMore ? 'Show' : 'NO'} More
          </button>
        </span>
      </div>  
    );
  }
}

const todolists = [{
    id: 1,
    details: 'Do the laundry',
    completed: false,
}, {
    id: 2,
    details: 'Check out new TV shows',
    completed: false,
}, {
    id: 3,
    details: "Don't forget mom's birthday!",
    completed: false,           
}, {
    id: 4,
    details: 'Update my app',
    completed: false,
}, {
    id: 5,
    details: 'Buy new clothes',
    completed: false,
}, {
    id: 6,
    details: 'Order pizza',
    completed: false,
}];

ReactDOM.render(
  <App todolists={todolists} />,
  document.getElementById('container')
);
