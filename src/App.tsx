import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const startValue = 5
    const maxValue = 10
    const [value, setValue] = useState(startValue)

    const clickOnInc = () => {
        if (value + 1 >= maxValue) {
            return alert('error')
        }
        setValue(value + 1)
    }
    const clickOnReset = () => {
        setValue(startValue)
    }

    return (
        <>
            start value = {startValue}
            value: {value}
            <button onClick={clickOnInc}>+</button>
            <button onClick={clickOnReset}>reset</button>
        </>
    );
}

export default App;
