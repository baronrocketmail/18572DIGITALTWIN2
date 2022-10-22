import NavLinks from "../Components/NavLinks";

export default function Autopay(){
    return(
        <div>
            <NavLinks objArry={[{name: "<------", url: "/"}, {name: "autopay: inactive", url:"/"}]}/>
        </div>
    )
}