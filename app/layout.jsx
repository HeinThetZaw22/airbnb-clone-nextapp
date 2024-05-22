import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import Modal from "./components/modals/Modal";
import RegisterModal from "./components/modals/RegisterModal";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "airbnb",
  description: "My airbnb clone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientOnly>
          <RegisterModal />
          {/* <Modal actionLabel={"Submit"} title={"Hello modal"} isOpen /> */}
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
