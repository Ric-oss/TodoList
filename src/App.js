import React,{Component} from 'react';
import './App.css';






class App extends Component {
  constructor(props) {
    super(props);
    this.inputItem = React.createRef();
    this.state = {
      items: [],
      input: '',
      isEditing: false,
      progress:0
    }
  }

  componentDidMount(){
    let all = localStorage.getItem("items") !== null ? JSON.parse(localStorage.getItem("items")) : [];
    this.setState({items : all})
    
  }

  componentDidUpdate(){
    localStorage.setItem("items",JSON.stringify(this.state.items));
    // localStorage.setItem("progress",this.state.progress);
  }

  onEditing = () => {
    this.setState({isEditing : true},()=>{
      this.inputItem.current.focus();
    });
   }
  onChange = e => { 
    this.setState({input : e.target.value})
  }

  onSubmit = e => {
    e.preventDefault();
    if (this.state.input.length === 0 ) {
      alert("Pls enter something!");
      return 0;
    }
    const items = {id: new Date().getTime(), text : this.state.input, isCompleted:false};
    this.setState({items : this.state.items.concat(items), input:""},() => this.setProgress(this.state.items));
   }

  onClick = id => {
      console.log(id);
      let updated = this.state.items.map(item => {
        if(item.id === id){
          item.isCompleted = !item.isCompleted;
        }
        return item;
      })
      this.setState({items : updated}, () => this.setProgress(this.state.items));
   }


  onDelete = (id) => { 
    console.log(id);
    let filtered = this.state.items.filter(item => {
      return item.id !== id;
    })
    this.setState({items : filtered}, () => this.setProgress(this.state.items));
    // this.setProgress(this.state.items);
  }

  setProgress = items => {
    let checked = items.filter(item => {return item.isCompleted})
    let progress = checked.length/items.length
    this.setState({progress : Math.floor(progress * 100)})
  }

  render() {
    return (
      <div>
      <form id="todo-list" onSubmit={this.onSubmit} className="App">
        <div className="progress">
          <div className="progress-bar bg-dark" role="progressbar" style={{width: this.state.progress + "%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{this.state.progress + "%"}</div>
        </div> 
        <div style={{color : "white"}} id="add-todo" onClick={this.onEditing}><i className="fa fa-plus"></i> <h2> Add an Item</h2> </div>
        <div>
        {this.state.isEditing ? <span className="inputForListWrap" ><input ref={this.inputItem}  className={"inputForList"} onChange={this.onChange} value={this.state.input}/></span> : ""}
        </div>
        <div className="container">
        <ol>{ this.state.items.length > 0 ?
        this.state.items.map((item,i) => {
          return(
            <li className="todo-wrap" key={i}>
              <h4 className="index">{i+1}</h4>
              <span className="todo__main">
                <input type="checkbox" id={`checkme__${item.id}`} onChange={() => this.onClick(item.id)} checked={item.isCompleted} className="realcheckbox"/>
                <label htmlFor={`checkme__${item.id}`} className="checkbox"></label>
                <p className="todo" >{item.text}</p>
              </span>
            <span className="delete-item" title="remove" onClick={() => this.onDelete(item.id)}><i className="fa fa-times-circle"></i></span> 
          </li>)
      }) : <p></p>
        }</ol>
       </div>
      </form>
      </div>
    );
  }
}

export default App;
