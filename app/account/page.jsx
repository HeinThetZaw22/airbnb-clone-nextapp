import { AiFillContacts, AiFillEdit, AiFillSafetyCertificate, AiFillTikTok } from "react-icons/ai";
import getCurrentUser from "../action/getCurrentUser"
import ClientOnly from "../components/ClientOnly";
import Container from "../components/Container";
import ProfileCard from '../components/ProfileCard'

const page = async () => {
    const currentUser = await getCurrentUser();
    return (
        <ClientOnly>
            <Container>
                <div className="flex flex-col items-center justify-center">
                    <div className=" text-2xl font-bold">Account</div>
                    <div className="flex flex-row gap-2 items-center font-light  mt-2">
                        <div className=" text-md font-semibold">{currentUser?.name},</div>
                        <div className="text-neutral-500">{currentUser?.email}</div>
                        <div className=" underline text-md font-semibold cursor-pointer">. Go to profile</div>
                    </div>
                    <div className="grid grid-cols-2 mt-10 gap-4 md:grid-cols-3">
                        <ProfileCard icon={AiFillEdit} title="Personal Info"
                        subtitle="Provide personal detail and how we can reach you" />
                         <ProfileCard icon={AiFillSafetyCertificate} title="Personal Info"
                        subtitle="Provide personal detail and how we can reach you" />
                         <ProfileCard icon={AiFillContacts} title="Personal Info"
                        subtitle="Provide personal detail and how we can reach you" />
                         <ProfileCard icon={AiFillEdit} title="Personal Info"
                        subtitle="Provide personal detail and how we can reach you" />
                    </div>
                </div>
            </Container>
        </ClientOnly>
    )
}

export default page