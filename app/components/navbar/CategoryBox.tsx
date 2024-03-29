'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
    label: string;
    icon: IconType;
    selected?: boolean;
}


const CategoryBox: React.FC<CategoryBoxProps> = ({
    icon: Icon,
    label,
    selected
}) => {

    const router = useRouter();
    const params = useSearchParams();
    const handleClick = useCallback(() => {
        let currentQuery = {};

        if(params){
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            category: label
        }

        if(params?.get('category') == 'label'){
            delete updatedQuery.category;
        }


        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {skipNull: true});

        router.push(url);

    }, [label, params, router]);

    return (
        <div
            onClick={handleClick}
            className={`
                flex
                flex-col
                items-center
                justify-center
                gap-2
                p-3
                border-b-2
                hover:text-slate-200
                transition,
                cursor-pointer
                ${selected ? 'border-b-slate-200' : 'border-transparent'}
                ${selected ? 'text-slate-200' : 'text-slate-400'}
            `}
        >
            <Icon className={`${selected ? 'text-slate-200' : 'text-slate-400'}`} size={24}/>
            <div className={`
                font-medium
                text-sm
                text-slate-400 
                ${selected ? 'text-slate-200' : 'text-slate-400'}
                `}
            >
                {label}
            </div>
        </div>
    );
};

export default CategoryBox;