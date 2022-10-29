import NavLinks from "../Components/NavLinks";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
export default function Autopay(){
    return(
        <div>
            <NavLinks objArry={[{name: "<------", url: "/"}, {name: "autopay: inactive", url:"/"}]}/>

            <div className={"grid"}>
                <a href="https://nextjs.org/docs" className={"card"}>
                    <p>510-707-0809</p>
                </a>

                <a href="https://nextjs.org/learn" className={"card"}>
                    <p>baronrocketmail@gmail.com</p>
                </a>

            </div>

        </div>
    )
}