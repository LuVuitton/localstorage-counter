import React, {ChangeEvent} from 'react';
import s from './ReusedInput.module.css'

type PropsType ={
    value: number
    title:string,
    callback:(inputValue:number)=>void
}
export const ReusedInput = (props:PropsType) => {

    const onchangeHandler = (e:ChangeEvent<HTMLInputElement>)=> {
        props.callback(e.currentTarget.valueAsNumber)
    }


    return (
        <div className={s.reusInputWrapper}>
            { props.title}
                <input
                    className={s.reusInput}
                    value={props.value}
                    type='number'
                    onChange={onchangeHandler}></input>
        </div>
    );
}

