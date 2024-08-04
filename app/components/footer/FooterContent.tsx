"use client";
import { TbWorld } from 'react-icons/tb';
import ClientOnly from '../ClientOnly';
import Container from '../Container';
import FooterList from './FooterList'
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare } from 'react-icons/fa';

const FooterContent = () => {
  return (
    <ClientOnly>
        <Container>
            <div className=' flex flex-col gap-4'>
            <div className=" items-center justify-center grid md:grid-cols-3 grid-cols-1 gap-5 pt-10 pb-5">
                <div className=' flex flex-col  gap-1'>
                    <h1 className=' text-lg font-bold mb-2'>Support</h1>
                    <FooterList label="Help Center" />
                    <FooterList label="AirCover" />
                    <FooterList label="Anti-discrimination" />
                    <FooterList label="Disability support" />
                </div>
                <hr className=' md:hidden' />
                <div className=' flex flex-col gap-1'>
                    <h1 className=' text-lg font-bold mb-2'>Hoisting</h1>
                    <FooterList label="Airbnb your home" />
                    <FooterList label="Hosting resources" />
                    <FooterList label="Community forum" />
                    <FooterList label="Join a free Hosting class" />
                </div>
                <hr className=' md:hidden' />
                <div className=' flex flex-col gap-1'>
                    <h1 className=' text-lg font-bold mb-2'>Airbnb</h1>
                    <FooterList label="Newsroom" />
                    <FooterList label="New features" />
                    <FooterList label="Careers" />
                    <FooterList label="Investors" />
                </div>
            </div>
            <hr />
            <div className=' flex flex-row max-md:flex-col items-center justify-between pt-3 pb-5'>
                <div className=' flex flex-row gap-8 items-center justify-center'>
                  <div className=' flex flex-row justify-center items-center gap-2'>
                     <TbWorld />
                     <p>English(US)</p>
                  </div>
                  <div>
                    <p>$ USD</p>
                  </div>
                  <div className=' flex flex-row gap-2'>
                     <FaFacebookSquare />
                     <FaTwitterSquare />
                     <FaInstagramSquare />
                  </div>
                </div>
                <div className='font-light  text-sm text-neutral-500 flex flex-row gap-2'>
                  <p>@ 2024 RentBurma, Inc.</p>
                  <p>Terms . Sitemap . Privacy</p>
                </div>
            </div>
            </div>
        </Container>
    </ClientOnly>
  )
}

export default FooterContent