import s from "./App.module.css";
import React from "react";
import {screenModeType} from "./App";


type MainScreenPropsType = {
    screenMode:screenModeType
    screenValue:number
}


export const MainScreen = (props: MainScreenPropsType) => {
        return (
            <div>
                <div className={s.mainScreen}>
                    {props.screenMode ==='screen value'? props.screenValue:props.screenMode}
                </div>
            </div>
        );
    };