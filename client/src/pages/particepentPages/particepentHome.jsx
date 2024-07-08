
import { useEffect } from "react"
import { OrganizerCarousel } from "../../components/organizer slider"
import { NavLink } from "react-router-dom"
import { UseContext } from "../../storage/auth";

export const Particepent_Home = () => {

    const { userAuth, User} = UseContext();

    useEffect(()=>{
        userAuth();
    },[])
    return (
        <>
            <OrganizerCarousel />
            <div className="OrganizerPanel">
                <h1>Welcome in Hackathon event management Application</h1>

                <h2>Hackathon Themes</h2>

                <div className="main">

                    <div className="card_content">
                        <NavLink to={`/particepent/view_registered_hackathons/${User.uToken}`}>
                            <button className="btn card_btn ">View Registered Hackathons</button>
                        </NavLink>
                    </div>

                    <ul className="cards">
                        {[
                            { theme: "Artificial_Intelligence", img: "/src/img/h9.avif" },
                            { theme: "Cybersecurity", img: "/src/img/h10.avif" },
                            { theme: "Financial_Technology_(FinTech)", img: "/src/img/h12.jpg" },
                            { theme: "Gaming_and_Entertainment", img: "/src/img/h13.jpg" },
                            { theme: "Education_and_Learning", img: "/src/img/h14.jpg" },
                            { theme: "Healthcare_and_Medicine", img: "/src/img/h15.jpg" }
                        ].map(({ theme, img }) => (
                            <li className="cards_item" key={theme}>
                                <div className="card">
                                    <div className="card_image"><img src={img} alt={theme} /></div>
                                    <div className="card_content">
                                        <NavLink to={`/particepent/hackathon_list/${encodeURIComponent(theme)}`}>
                                            <button className="btn card_btn">{theme}</button>
                                        </NavLink>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
        </>
    )
}
