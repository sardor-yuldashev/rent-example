'use client';

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";


interface CounterProps {
    title: string;
    subtitle: string;
    value: number;
    onChange: (value: number) => void;
};

const Counter: React.FC<CounterProps> = ({
    title,
    subtitle,
    value,
    onChange
}) => {

    const onAdd = useCallback(() => {
        onChange(value + 1);
    }, [onChange, value]);

    const onReduce = useCallback(() => {
        if(value == 1){
            return;
        }

        onChange(value - 1);
    }, [value, onChange]);

    return (
        <div
            className="flex flex-row items-center justify-between"
        >

            <div className="flex flex-col">
                <div className="font-medium text-slate-200">{title}</div>
                <div className="font-light text-slate-400">{subtitle}</div>
            </div>
            <div className="flex flex-row items-center gap-4">
                <div
                    onClick={onReduce}
                    className="
                        w-10
                        h-10
                        rounded-full
                        border-[1px]
                        border-slate-200
                        flex
                        items-center
                        justify-center
                        text-slate-200
                        cursor-pointer
                        hover:opacity-80
                        transition
                    "
                >
                    <AiOutlineMinus className="text-slate-200"/>
                </div>
                <div className="font-light text-xl text-slate-200">
                    {value}
                </div>
                <div 
                    onClick={onAdd}
                    className="
                        w-10
                        h-10
                        rounded-full
                        border-[1px]
                        border-slate-100
                        flex
                        items-center
                        justify-center
                        text-slate-100
                        cursor-pointer
                        hover:opacity-80
                        transition
                    "
                >
                    <AiOutlinePlus className="text-slate-200"/>
                </div>

            </div>

        </div>
    );
};

export default Counter;