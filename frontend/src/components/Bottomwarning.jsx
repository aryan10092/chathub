import { Link } from "react-router-dom";

export function Bottomwarning({label,text,to}) {
    return(
<div className="py-2 text-sm text-gray-300 flex justify-center">
<div>{label} </div>
<Link className="pointer  pl-1 cursor-pointer text-white hover:underline " to={to}>
{text}</Link>
    </div>

    )
}