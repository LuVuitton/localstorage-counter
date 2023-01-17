import React, {useState} from 'react';
import {ReusedButton} from "./ReusedButton";
import {ReusedInput} from "./ReusedInput";
import s from './App.module.css'




function App() {
    const [startValue, setStartValue] = useState(0)
    const [maxValue, setMaxValue] = useState(0)
    const [mainScreen, setMainScreen] = useState(startValue)

    const changeMaxValue = (inputValue:string)=> setMaxValue(+inputValue)

    const changeStartValue = (inputValue:string)=> {
        if (+inputValue>=0) {
            setStartValue(+inputValue)
        }
    }

    const increment =() => {
        if (mainScreen<maxValue) {
            setMainScreen(mainScreen + 1)
        }
    }
    const reset =() => setMainScreen(startValue)
    const set = ()=> setMainScreen(startValue)

    return (
        <>
            {/*main screen*/}
            <div className={s.mainScreen}>{mainScreen}</div>

             <ReusedInput value={maxValue} title={'max value'} callback={changeMaxValue}/>{/*max value */}
             <ReusedInput  value={startValue} title={'start value'} callback={changeStartValue}/> {/*start value */}
            <div>
                <ReusedButton  title={'SET'} callback={set}/> {/*SET */}
                <ReusedButton  title={'INC'} callback={increment}/> {/*INC */}
                <ReusedButton  title={'RESET'} callback={reset}/> {/*RESET */}
            </div>

        </>
    );
}

export default App;
