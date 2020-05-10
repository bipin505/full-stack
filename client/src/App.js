import React from 'react';
import './App.css';
import { BrowserRouter as Router,Route} from "react-router-dom";
import { Chat } from './Components/Chat/Chat';
import { Join } from './Components/Join/Join';
export class App extends React.Component {
  render() {
    return (
      <div className="App">
       <Router>
         <Route path="/" exact render={(props) => <Join {...props}></Join>}></Route>
         <Route path="/chat"  render={(props) => <Chat {...props}></Chat>}></Route>
       </Router>
      </div>
    );
  }
}
// const  App = ()=> {
//   return (
//     <div className="App">
//      <Router>
//        <Route path="/" exact render={(props) => <Join {...props}></Join>}></Route>
//        <Route path="/chat"  render={(props) => <Chat {...props}></Chat>}></Route>
//      </Router>
//     </div>
//   );
// }

// export default App;
