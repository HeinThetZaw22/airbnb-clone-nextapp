import { AiFillEdit, AiFillSafetyCertificate, AiFillTikTok, AiOutlineAlipay, AiOutlineNotification } from "react-icons/ai";
import getCurrentUser from "../action/getCurrentUser"
import Container from "../components/Container";
import ProfileCard from '../components/ProfileCard'
import { GiPayMoney, GiTravelDress } from "react-icons/gi";
import Avator from "../components/Avator";
import EmptyState from "../components/EmptyState";

const page = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return (
            <EmptyState title="Unauthorized"
            subtitle="Please login" />
        )
    }
    return (
        
            <Container>
                <div className=" max-w-[2520px] flex flex-col sm:items-center">
                    <div className=" flex flex-row items-center gap-5">
                        <div className="md:hidden bg-neutral-400 rounded-full">
                        <Avator src={currentUser?.image} />
                        </div>
                    <div>
                    <div className=" text-2xl font-bold">Account</div>
                    <div className="flex flex-row gap-2 items-center font-light  mt-2">
                        <div className=" text-md font-semibold">{currentUser?.name},</div>
                        <div className="text-neutral-500 max-sm:hidden">{currentUser?.email}</div>
                        <div className=" underline text-md max-sm:hidden font-semibold cursor-pointer">. Go to profile</div>
                    </div>
                    </div>
                    </div>
                    <hr className="mt-5" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 mt-5 gap-4 lg:grid-cols-3">
                        <ProfileCard icon={AiFillEdit} title="Personal Info"
                        subtitle="Provide personal detail and how we can reach you" />
                         <ProfileCard icon={AiFillSafetyCertificate} title="Login & security"
                        subtitle="Update your password and secure your account" />
                         <ProfileCard icon={GiPayMoney} title="Payments & payouts"
                        subtitle="Review payments, payouts, coupons, and gift cards" />
                         <ProfileCard icon={AiOutlineAlipay} title="Taxes"
                        subtitle="Manage taxpayer information and tax documents" />
                          <ProfileCard icon={AiOutlineNotification} title="Notifications"
                        subtitle="Choose notification preferences and how you want to be contacted" />
                         <ProfileCard icon={GiTravelDress} title="Travel for work"
                        subtitle="Add a work email for bussiness trip benefits" />
                    </div>
                </div>
            </Container>
        
    )
}

export default page