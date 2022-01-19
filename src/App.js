import Home from './components/pages/Home';
import Edit from './components/student/Edit';
import View from './components/student/View';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";


function App() {
    return (<>

        <Routes>
       
            <Route path="/" exact element={<Home/>}/>
            <Route path="/view/:id" exact element={<View/>}/>
            <Route path="/edit/:id" exact element={<Edit/>}/>
            
            </Routes>
     

    </>)
}

export default App
