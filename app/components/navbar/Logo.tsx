'use client'

import { useRouter } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai";

const Logo = () => {
    const router = useRouter();
    return (
        <div 
            onClick={() => router.push('/')}
            className="hidden md:flex flex-row gap-2 cursor-pointer"
        >
            <div className="text-xl text-red-600 font-semibold">Rent</div>
            <AiOutlineHome
                color="red"
                size={24}
            />
        </div>
    )
}

export default Logo;