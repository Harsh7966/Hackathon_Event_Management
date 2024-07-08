import { NavLink } from "react-router-dom"
import { OrganizerCarousel } from "../../components/organizer slider"
import { UseContext } from "../../storage/auth"
import { useEffect } from "react";

export const Organizer_Home = () => {
    const { userAuth, User } = UseContext();

    useEffect(() => {
        userAuth();
    }, []);

    return (
        <>
            <OrganizerCarousel />

            <div className="OrganizerPanel">
                <h1>Hackathon Organizer Panel</h1>

                <div className="main">
                    <ul className="cards">
                        <li className="cards_item">
                            <div className="card">
                                <div className="card_image"><img src="/src/img/h6.avif" /></div>
                                <div className="card_content">
                                    {/* <h2 className="card_title">Card Grid Layout</h2>
                                    <p className="card_text">Demo of pixel perfect pure CSS simple responsive card grid layout</p> */}
                                    <NavLink to="/organizer/create_hackathon">
                                        <button className="btn card_btn">Create Hackathon</button>
                                    </NavLink>
                                </div>
                            </div>
                        </li>
                        <li className="cards_item">
                            <div className="card">
                                <div className="card_image"><img src="/src/img/h7.avif" /></div>
                                <div className="card_content">
                                    <NavLink to={`/organizer/viewEvents/${User.uToken}`}>
                                        <button className="btn card_btn">See All Events</button>
                                    </NavLink>
                                </div>
                            </div>
                        </li>
                        <li className="cards_item">
                            <div className="card">
                                <div className="card_image"><img src="/src/img/h8.jpg" /></div>
                                <div className="card_content">
                                    <NavLink to={`/organizer/view_participants_list/${User.uToken}`}>
                                        <button className="btn card_btn">View list of participants</button>
                                    </NavLink>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
        </>
    )
}