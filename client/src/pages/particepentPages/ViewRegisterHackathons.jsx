import { useEffect, useState } from "react";
import { UseContext } from "../../storage/auth";
import { NavLink, useParams } from "react-router-dom";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";

export const ViewRegisterHackathons = () => {

    const { tokenAuthorization } = UseContext();
    const [hdetails, setHdetails] = useState([]);
    const [filter, setFilter] = useState("all");

    const params= useParams();

    const GetUserRegisterHackathon = async (uToken) => {
        try {
            // console.log("User_Token",uToken);

            const response = await fetch(`http://localhost:8080/api/particepent/GetUserRegisterHackathon/${uToken}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Autorization: tokenAuthorization
                },
                body: JSON.stringify()
            });

            const data = await response.json();

            if (response.status === 200) {
                // console.log(data);
                getHackathonDetailById(data);
            }

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        GetUserRegisterHackathon(params.uToken);
    }, [hdetails]);


    const getHackathonDetailById = async (hTokens) => {
        try {
            const response = await fetch(`http://localhost:8080/api/particepent/getHackathonDetailById`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tokenAuthorization
                },
                body: JSON.stringify({ hTokens })
            });

            const responseData = await response.json();
            const hackathonDetails = responseData.hackathonDetails;
            if (response.status === 200) {
                // console.log(hackathonDetails);
                setHdetails(hackathonDetails);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const filterEvents = (events) => {
        if (!Array.isArray(events)) {
            return [];
        }
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        switch (filter) {
            case "past":
                return events.filter(event => new Date(event.endDate) < currentDate);
            case "inProgress":
                return events.filter(event =>
                    (new Date(event.startDate) <= currentDate && new Date(event.endDate) >= currentDate) ||
                    new Date(event.startDate).toDateString() === currentDate.toDateString() ||
                    new Date(event.endDate).toDateString() === currentDate.toDateString()
                );
            case "upcoming":
                return events.filter(event => new Date(event.startDate) > currentDate);
            default:
                return events;
        }
    };
    const filteredEvents = filterEvents(hdetails);


    return (
        <>
            <div className="viewEvent">
                <h1>View Registered Events</h1>

                <select
                    className="form-input"
                    name="theme"
                    onChange={(e) => setFilter(e.target.value)}
                    required
                >
                    {/* <div className="filter-buttons"> */}
                        <option value="">Select Filter</option>
                        <option value={"all"}>All Events</option>
                        <option value={"past"}>Past Events</option>
                        <option value={"inProgress"}>In Progress Events</option>
                        <option value={"upcoming"}>Upcoming Events</option>
                    {/* </div> */}  
                </select>


                <div>
                    <div className="table-responsive-xxl">
                        <table className="table">
                            <thead className="table-success">
                                <tr>
                                    <th scope="col">S.no</th>
                                    <th scope="col">Hackathon Name</th>
                                    <th scope="col">Company</th>
                                    <th scope="col">Start Date</th>
                                    <th scope="col">End Date</th>
                                    <th scope="col">Timing</th>
                                    <th scope="col">Location</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Theme</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {filteredEvents.map((hdetails, index) => (
                                    <tr className="table-light" key={index}>
                                        <td scope="row">{index + 1}</td>
                                        <td>{hdetails.eName}</td>
                                        <td>{hdetails.company}</td>
                                        <td>{hdetails.startDate}</td>
                                        <td>{hdetails.endDate}</td>
                                        <td>{hdetails.time}</td>
                                        <td>{hdetails.location}</td>
                                        <td>{hdetails.description}</td>
                                        <td>{hdetails.theme}</td>
                                        <td>
                                            <div className="actionBTN">
                                                <NavLink to={`/particepent/hackathon_Detailed_Screen/${hdetails.hToken}`}>
                                                    <button className="viewdetails" ><FaEye /> View Details</button>
                                                </NavLink>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};
