import { useEffect } from "react";

import { useMobile } from "../contexts/MobileContext";



export default function Footer() {

    const { mobile } = useMobile()

    useEffect(() => {
        window.addEventListener("scroll", (e) => {
            if (document.getElementById("footer") && document.documentElement && document.documentElement.scrollTop > 80) {
                document.getElementById("footer").className = "show";
            }
        });

    }, [mobile]);


    return (<>
        {!mobile && <footer id="footer" className="p-2">
            <div>
                This site has no commercial aims and is part of an academic
                development-project.
            </div>
            <div>
                Prices and articles are not intended to have a real correspondence
                with same articles in other "real websites"
            </div>
            <div>
                If you are interested in these articles we recommend you to visit{" "}
                <a href="https://www.siteking.co.uk">
                    https://www.siteking.co.uk/
                </a>
            </div>
        </footer>}
    </>)
}