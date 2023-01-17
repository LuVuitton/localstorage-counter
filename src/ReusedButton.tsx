import React from 'react';
import s from './ReusedButton.module.css'

type PropsType = {
    title: string,
    callback: () => void
}
export const ReusedButton = (props: PropsType) => {

    const onCLickHandler = () => {
      props.callback()
    }


    return (
        <div className={s.wrapper}>

            <button
                onClick={onCLickHandler}>{props.title}
            </button>


        </div>
    );
}

