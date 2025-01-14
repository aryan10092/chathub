export const Loadingspinner=()=>{
    return (
        <div className="inline-block w-5 h-5 border-2 border-r-transparent border-white rounded-full animate-spin"></div>
    )
}
export const Loadinglarge=()=>{
    return(
        <div className="flex space-x-2 justify-center items-center w=[200px] mx-auto mt-[300px]">
<div  className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.4s]"> </div>
<div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]">

</div>
<div className="h-8 w-8 bg-white rounded-full animate-bounce">

</div>
        </div>
    )
}
export const Loadingsamll=()=>{
    return(
        <div className="flex space-x-2 justify-center items-center w=[200px] mx-auto mt-[300px]">
<div  className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.4s]"> </div>
<div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]">

</div>
<div className="h-4 w-4 bg-white rounded-full animate-bounce">

</div>
        </div>
    )
}