// import React from 'react'

import { View, Input } from "@tarojs/components";
import { useState } from "react";

export default function Verification() {
    const [currentInput,setCurrentInput]=useState(0)
    const handleInput = (event) => {
        if (/^\d+$/.test(event.target.value)) {
            setCurrentInput(currentInput+1)
            console.log(event.target.value)
        }
    }
    return (
        <>
            <View className='verification'>
                <Input type='text' className='input-verification' onInput={handleInput} focus={currentInput===0}></Input>
                <Input type='text' className='input-verification' disabled={currentInput!==1} focus={currentInput===1} onInput={handleInput}></Input>
                <Input type='text' className='input-verification' disabled={currentInput!==2} focus={currentInput===2} onInput={handleInput}></Input>
                <Input type='text' className='input-verification' disabled={currentInput!==3} focus={currentInput===3} onInput={handleInput}></Input>
            </View>

        </>
    )
}

