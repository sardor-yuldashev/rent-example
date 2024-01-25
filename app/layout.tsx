import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Nunito } from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar/Navbar';
import ClientOnly from './components/ClientOnly';
import Modal from './components/modals/Modal';
import RegisterModal from './components/modals/RegisterModal';
import ToasterProvider from './providers/ToastProvider';
import LoginModal from './components/modals/LoginModal';
import getCurrentUser from './action/getCurrentUser';
import RentModal from './components/modals/RentModal';
import SearchModal from './components/modals/SearchModal';

const nunito = Nunito({
    subsets: ["latin"],
});

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Rent',
    description: 'Rent home',
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const currentUser = await getCurrentUser();

    return (
        <html lang="en">
            <body className={inter.className}>
                <ClientOnly>
                    <ToasterProvider/>
                    <SearchModal/>
                    <RentModal/>
                    <LoginModal/>
                    <RegisterModal/>
                    <Navbar currentUser={currentUser} />
                </ClientOnly>
                <div className="pb-20 pt-28">
                    {children}
                </div>
            </body>
        </html>
    )
}