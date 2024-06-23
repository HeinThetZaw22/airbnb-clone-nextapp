import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./provider/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import Provider from "./components/Provider";
import getCurrentUser from "./action/getCurrentUser";
import RentModal from "./components/modals/RentModal";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "airbnb",
  description: "My airbnb clone",
};

export default async function RootLayout({ children }) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={`${nunito.className}`}>
        <Provider>
          <ClientOnly>
            <ToasterProvider />
            <RegisterModal />
            <LoginModal />
            <RentModal />
            <Navbar currentUser={currentUser} />
          </ClientOnly>
          {children}
        </Provider>
      </body>
    </html>
  );
}
