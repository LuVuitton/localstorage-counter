import React, {useEffect, useState} from 'react';
import {ReusedButton} from "./ReusedButton";
import {ReusedInput} from "./ReusedInput";
import {MainScreen} from "./MainScreen";
import {v1} from 'uuid';
import s from './App.module.css'


type dataButtonType = {
    title: 'SET' | 'INC' | 'RESET' | 'Clear LS',
    disable: boolean
    id: string
}


export type screenModeType = 'incorrect value' | 'enter value and press set' | 'screen value'

function App() {


    const buttons: Array<dataButtonType> = [
        {
            title: 'SET',
            disable: true,
            id: v1(),
        },
        {
            title: 'INC',
            disable: true,
            id: v1(),
        },
        {
            title: 'RESET',
            disable: true,
            id: v1(),
        },
        {
            title: 'Clear LS',
            disable: false,
            id: v1(),
        },
    ]

    const [startValue, setStartValue] = useState(0)
    const [maxValue, setMaxValue] = useState(0)
    const [screenValue, setScreenValue] = useState(startValue)
    const [screenMode, setScreenMode] = useState<screenModeType>('enter value and press set')
    const [dataButton, setDataButton] = useState<Array<dataButtonType>>(buttons)

    useEffect(()=> {
        const startValueLS = localStorage.getItem('startValue')
        const maxValueLS = localStorage.getItem('maxValue')

        if(startValueLS && maxValueLS) {
            setStartValue(JSON.parse(startValueLS))
            setMaxValue(JSON.parse(maxValueLS))
            setScreenValue(JSON.parse(startValueLS))
            setScreenMode('screen value')
            setDataButton(dataButton.map(e => {
                return e.title === 'INC' ? {...e, disable: false} : e
            }))
        }

    }, [])


    const changeMaxValue = (inputValue: number) => {
        if (inputValue >= 0 && inputValue > startValue && startValue !== -1) {
            setMaxValue(inputValue)
            setScreenMode('enter value and press set')
            setDataButton(dataButton.map(e => e.title === 'SET' ? {...e, disable: false}
                : e.title === 'INC' ? {...e, disable: true} :
                    e.title === 'RESET' ? {...e, disable: true}
                        : e))
        } else if (inputValue === startValue) {
            setMaxValue(startValue)
            setScreenMode('incorrect value')
            setDataButton(dataButton.map(e => e.title === 'SET' ? {...e, disable: true} : e))

        }
    }
    const changeStartValue = (inputValue: number) => {
        if (inputValue >= 0 && inputValue < maxValue) {
            setStartValue(inputValue)
            setScreenMode('enter value and press set')//дизейблим кнопки
            setDataButton(dataButton.map(e => e.title === 'SET' ? {...e, disable: false}
                : e.title === 'INC' ? {...e, disable: true} :
                    e.title === 'RESET' ? {...e, disable: true}
                        : e))
        } else if (inputValue === maxValue) {
            setStartValue(maxValue)
            setScreenMode('incorrect value')
            setDataButton(dataButton.map(e => e.title === 'SET' ? {...e, disable: true} : e))
        } else if (inputValue < 0) {
            setStartValue(-1)
            setScreenMode('incorrect value')
            setDataButton(dataButton.map(e => e.title === 'SET' ? {...e, disable: true} : e))
        }
    }

    const increment = () => {
        if (screenValue === maxValue - 1) { //   что бы не позволял нажать когда равны
            setScreenValue(maxValue)
            setDataButton(dataButton.map(e => e.title === 'INC' ? {...e, disable: true} : e))
        } else if (screenValue < maxValue) {
            setScreenValue(screenValue + 1)
            setDataButton(dataButton.map(e => e.title === 'RESET' ? {...e, disable: false} : e))
        }
    }
    const reset = () => {
        setDataButton(dataButton.map(e => e.title === 'RESET' ? {...e, disable: true} :
            e.title === 'INC' ? {...e, disable: false} :e))
        setScreenValue(startValue)
    }
    const set = () => {
        setDataButton(dataButton.map(e => {
            return e.title === 'SET' ? {...e, disable: true} :
                e.title === 'INC' ? {...e, disable: false} : e
        }))
        setScreenMode('screen value')
        setScreenValue(startValue)
        localStorage.setItem('startValue',JSON.stringify(startValue))
        localStorage.setItem('maxValue',JSON.stringify(maxValue))
    }
    const clearLS = () => {
        localStorage.clear()
        setScreenValue(0)
        setStartValue(0)
        setMaxValue(0)
        setScreenMode('screen value')
    }






    return (
        <>

            <MainScreen screenValue={screenValue} screenMode={screenMode}/>
            <div className={s.inputsWrapper}>
                <ReusedInput value={maxValue} title={'max value'} callback={changeMaxValue}/>{/*max value */}
                <ReusedInput value={startValue} title={'start value'} callback={changeStartValue}/> {/*start value */}
            </div>

            <div className={s.buttonsWrapper}>
                {dataButton.map(e => (<ReusedButton
                    title={e.title}
                    callback={e.title === 'SET' ? set : e.title === 'INC' ? increment :e.title === 'RESET' ? reset : clearLS}
                    disable={e.disable}
                    key={e.id}
                />))}
            </div>

        </>
    );
}

export default App;
