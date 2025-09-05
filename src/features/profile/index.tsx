
import { secrets } from "../../lib";
import BankAccount from "../bankAccount/BankAccount";
import PersonalInfo from "./personalInfo";
import { SettingsCard } from "./settings";


export function ProfileCard() {

    return (
        <div className="w-full flex flex-col justify-center"
        >
            <SettingsCard />
            {secrets.NODE_ENV === "development" && <PersonalInfo />}
            {secrets.NODE_ENV === "development" && <BankAccount />}
        </div>
    )
}
