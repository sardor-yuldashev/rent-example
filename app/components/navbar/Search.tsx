'use client';

import useCountries from '@/app/hooks/useCountries';
import useSearchModal from '@/app/hooks/useSearchModal';
import { differenceInDays } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';

const Search = () => {
    const params = useSearchParams();
    const searchModal = useSearchModal();
    const { getByValue } = useCountries();

    const locationValue = params?.get('locationValue');
    const startDate = params?.get('startDate');
    const endDate = params?.get('endDate');
    const guestCount = params?.get('guestCount');

    const locationLabel = useMemo(() => {
        if(locationValue){
            return getByValue(locationValue as string)?.label;
        }

        return 'Anywhere';
    }, [getByValue, locationValue]);


    const durationLabel = useMemo(() => {
        if(startDate && endDate){
            const start = new Date(startDate as string);
            const end = new Date(endDate as string);
            let diff = differenceInDays(end, start);
            if(diff == 0){
                diff = 1;
            }
            return `${diff} Days`;
        }
        return 'Any Week';
    }, [startDate, endDate]);

    const guestLabel = useMemo(() => {
        if(guestCount){
            return `${guestCount} Guests`;
        }

        return 'Add Guests';
    }, [guestCount]);

    return (
        <div 
            onClick={searchModal.onOpen}
            className="
            border-[1px]
            w-full
            md:w-auto
            py-2
            rounded-full
            border-slate-600
            shadow-sm
            hover:shadow-md
            cursor-pointer
        ">
            <div className="
                flex
                flex-row
                items-center
                justify-between
            ">

                <div className="
                    text-sm
                    font-semibold
                    px-6
                    text-slate-200
                ">
                    {locationLabel}
                </div>

                <div className="
                    hidden
                    sm:block
                    text-sm
                    font-semibold
                    px-6
                    border-x-[1px]
                    border-slate-600
                    flex-1
                    text-center
                    text-slate-200
                ">
                    {durationLabel}
                </div>

                <div className="
                    text-sm
                    pl-6
                    pr-2
                    text-gray-600
                    flex
                    flex-row
                    items-center
                    gap-3
                ">
                    <div className="hidden sm:block text-slate-400">{guestLabel}</div>
                    <div className="
                        p-2
                        bg-rose-500
                        rounded-full
                        text-white
                    ">
                        <BiSearch size={18} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;