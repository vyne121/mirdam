import image1 from './images/IMG_3959.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Image} from "react-bootstrap";
import DynamicImage from "./components/DynamicImage";



function App() {
  return (
    <div className="App">
        <DynamicImage src={image1}/>
    </div>
  );
}

export default App;
