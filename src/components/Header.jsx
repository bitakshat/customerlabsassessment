import { IoChevronBackSharp } from "react-icons/io5";

const Header = () => {
    return (
        <div className="w-full h-[60px] bg-cyan-500 flex items-center p-4 gap-[5px]">
            <IoChevronBackSharp size={20} color={"#fff"} /><h1 className="text-[#fff] text-[20px]">View Audience</h1>
        </div>
    )
}

export default Header