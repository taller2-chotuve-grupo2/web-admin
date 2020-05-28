import React from 'react';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import Routes from './Routes'


document.body.style = 'background: black;';


export default function App() {
    // Declare a new state variable, which we'll call "count"
    //const [count, setCount] = useState(0);

    return (
        <Routes/>
    );
}
