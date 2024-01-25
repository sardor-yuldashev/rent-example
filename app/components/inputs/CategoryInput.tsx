'use client';

import { IconType } from "react-icons";

interface CategoryInputProps {
    icon: IconType;
    label: string;
    selected?: boolean;
    onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
    icon: Icon,
    label,
    selected,
    onClick
}) => {
    return (
        <div
            onClick={() => onClick(label)}
            className={`
                rounded-xl
                border-2
                p-4
                flex
                flex-col
                gap-3
                hover:border-slate-200
                transition
                cursor-pointer
                ${selected ? 'border-slate-200 bg-slate-700' : 'border-slate-400'}
                border-black
            `}
        >
            <Icon className={`${selected ? 'text-slate-200' : 'text-slate-400'}`} size={30} />
            <div className={`
                font-semibold
                ${selected ? 'text-slate-200' : 'text-slate-400'}
                `}>
                {label}
            </div>
        </div>
    );
};

export default CategoryInput;