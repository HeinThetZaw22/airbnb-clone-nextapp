import { Nunito } from "next/font/google";
import "./globals.css";
import "@uploadthing/react/styles.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./provider/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./action/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import SearchModal from './components/modals/SearchModal';
import FooterContent from './components/footer/FooterContent'
const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "airbnb",
  description: "My airbnb clone",
};

export default async function RootLayout({ 
  children
 }: { 
  children: React.ReactNode 
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={`${nunito.className}`}>
        <ClientOnly>
          <Navbar currentUser={currentUser} />
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <SearchModal />
        </ClientOnly>
        <div className="pt-32 pb-20">
          {children}
        </div>
        <div className=" bg-neutral-100">
          <FooterContent />
        </div>
      </body>
    </html>
  );
}

//deleted Provider if in case any error