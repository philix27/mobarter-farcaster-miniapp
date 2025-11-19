
import BankAccount from "../bankAccount/BankAccount";
import LinksSection from "./links";
import PersonalInfo from "./personalInfo";
import { SettingsCard } from "./settings";

export function ProfileCard() {

    return (
        <div className='w-full flex items-center justify-center'>
            <div className='md:w-[40%] w-full'>
                <SettingsCard />
                {/* {secrets.NODE_ENV === "development" && <PersonalInfo />} */}
                <PersonalInfo />
                <BankAccount />
                <LinksSection />


            </div>
        </div>
    )
}
