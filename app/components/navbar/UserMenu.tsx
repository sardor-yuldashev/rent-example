'use client';

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
    currentUser?: SafeUser | null
};

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {

    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const rentModal = useRentModal();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const onRent = useCallback(() => {
        if(!currentUser){
            return loginModal.onOpen();
        }

        rentModal.onOpen();
        // open rent modal
    }, [currentUser, loginModal, rentModal]);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={onRent}
                    className="
                        hidden
                        md:block
                        text-sm
                        text-slate-200
                        font-semibold
                        py-3
                        px-4
                        rounded-full
                        hover:bg-slate-600
                        transition
                        cursor-pointer
                    "
                >
                    Rent your home
                </div>

                <div
                    onClick={toggleOpen}
                    className="
                        p-4
                        md:py-1
                        md:px-2
                        border-[1px]
                        border-slate-600
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded-full
                        cursor-pointer
                        hover:shadow-md
                        transition
                    "
                >
                    <AiOutlineMenu className="text-slate-200"/>
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image}/>
                    </div>
                </div>

            </div>

            {isOpen && (

                <div className="
                        fixed
                        w-screen
                        h-screen
                        md:h-auto
                        md:absolute
                        md:rounded-xl
                        shadow-md
                        md:w-3/4
                        bg-slate-800
                        md:bg-white
                        overflow-hidden
                        top-20
                        right-0
                        md:top-12
                        text-xl
                        md:text-sm
                        text-slate-400
                        md:text-slate-900"
                >
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                                <MenuItem
                                    onClick={() => router.push('/trips')}
                                    label="My trips"
                                />
                                <MenuItem
                                    onClick={() => router.push('/favorites')}
                                    label="My favorites"
                                />
                                <MenuItem
                                    onClick={() => router.push('/reservations')}
                                    label="My reservation"
                                />
                                <MenuItem
                                    onClick={() => router.push('/properties')}
                                    label="My properties"
                                />
                                <MenuItem
                                    onClick={onRent}
                                    label="Rent my home"
                                />
                                <hr/>
                                <MenuItem
                                    onClick={() => signOut()}
                                    label="Logout"
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    onClick={loginModal.onOpen}
                                    label="Login"
                                />
                                <MenuItem
                                    onClick={registerModal.onOpen}
                                    label="Sign up"
                                />
                            </>
                        )}
                    </div>
                </div>

            )}
        </div>
    );
};

export default UserMenu;