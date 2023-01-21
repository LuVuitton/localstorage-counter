import React, {useState} from 'react';
import {ReusedButton} from "./ReusedButton";
import {ReusedInput} from "./ReusedInput";
import {MainScreen} from "./MainScreen";


type dataButtonType = {
    title: string,
    disable: boolean
}

const buttons = [
    {title: 'SET', disable: true},
    {title: 'INC', disable: true},
    {title: 'RESET', disable: true},
]

export type screenModeType = 'incorrect value' | 'enter value and press set' | 'screen value'

function App() {


    const [startValue, setStartValue] = useState(0)
    const [maxValue, setMaxValue] = useState(0)
    const [screenValue, setScreenValue] = useState(startValue)
    const [screenMode, setScreenMode] = useState<screenModeType>('enter value and press set')
    const [dataButton, setDataButton] = useState<Array<dataButtonType>>(buttons)


    const changeMaxValue = (inputValue: number) => {
        setDataButton(dataButton.map(e => {
            return e.title === 'RESET' ? {...e, disable: true} :
                e.title === 'INC' ? {...e, disable: true} : e
        }))

        if (inputValue >= 0 && inputValue > startValue) {
            setMaxValue(inputValue)
            setScreenMode('enter value and press set')
            setDataButton(dataButton.map(e => e.title === 'SET' ? {...e, disable: false} : e))
        } else if (inputValue === startValue) {
            setMaxValue(startValue)
            setScreenMode('incorrect value')
            setDataButton(dataButton.map(e => e.title === 'SET' ? {...e, disable: true} : e))

        }
    }
    const changeStartValue = (inputValue: number) => {

        setDataButton(dataButton.map(e => {
            return e.title === 'RESET' ? {...e, disable: true} :
                e.title === 'INC' ? {...e, disable: true} : e
        }))

        if (inputValue >= 0 && inputValue < maxValue) {
            setStartValue(inputValue)
            setScreenMode('enter value and press set')//дизейблим кнопки
            setDataButton(dataButton.map(e => e.title === 'SET' ? {...e, disable: false} : e))
        } else if (inputValue === maxValue) {
            setStartValue(maxValue)
            setScreenMode('incorrect value')
            setDataButton(dataButton.map(e => e.title === 'SET' ? {...e, disable: true} : e))
        }
    }

    const increment = () => {
        if (screenValue < maxValue) {
            setScreenValue(screenValue + 1)
            setDataButton(dataButton.map(e => e.title === 'RESET' ? {...e, disable: false} : e))
        }
    }
    const reset = () => {
        setDataButton(dataButton.map(e => e.title === 'RESET' ? {...e, disable: true} : e))
        setScreenValue(startValue)
    }
    const set = () => {
        setDataButton(dataButton.map(e => {
            return e.title === 'SET' ? {...e, disable: true} :
                e.title === 'INC' ? {...e, disable: false} : e
        }))
        setScreenMode('screen value')
        setScreenValue(startValue)
    }


    return (
        <>

            <MainScreen screenValue={screenValue} screenMode={screenMode}/>

            <ReusedInput value={maxValue} title={'max value'} callback={changeMaxValue}/>{/*max value */}
            <ReusedInput value={startValue} title={'start value'} callback={changeStartValue}/> {/*start value */}
            <div>
                <ReusedButton
                    title={dataButton[0].title}
                    callback={set}
                    disable={dataButton[0].disable}/> {/*SET */}
                <ReusedButton
                    title={dataButton[1].title}
                    callback={increment}
                    disable={dataButton[1].disable}/> {/*INC */}
                <ReusedButton
                    title={dataButton[2].title}
                    callback={reset}
                    disable={dataButton[2].disable}/> {/*RESET */}
            </div>

        </>
    );
}

export default App;
