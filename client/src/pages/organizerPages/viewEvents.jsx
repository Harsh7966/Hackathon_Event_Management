import { useState, useEffect } from "react";
import { UseContext } from "../../storage/auth";
import { NavLink, useParams } from "react-router-dom";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";

export const ViewEvents = () => {
    const params = useParams();
    const { getAllEventsOfLoginUser, hackathon, hackathonDelete, getParticipantByEachHackathon, participants } = UseContext();

    const [filter, setFilter] = useState("all");

    const handleFilter = (e) =>{
        setFilter(e.target.value);
    }

    useEffect(() => {
        getAllEventsOfLoginUser(params.uToken);
    }, [getAllEventsOfLoginUser, params.uToken, hackathon]);

    const filterEvents = (events) => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Ensure comparison at the start of the day
        switch (filter) {
            case "past":
                return events.filter(event => new Date(event.endDate) < currentDate);
            case "inProgress":
                return events.filter(event => {
                    const startDate = new Date(event.startDate);
                    const endDate = new Date(event.endDate);
                    startDate.setHours(0, 0, 0, 0);
                    endDate.setHours(0, 0, 0, 0);
                    return (startDate <= currentDate && endDate >= currentDate);
                });
            case "upcoming":
                return events.filter(event => {
                    const startDate = new Date(event.startDate);
                    startDate.setHours(0, 0, 0, 0);
                    return startDate > currentDate;
                });
            default:
                return events;
        }
    };

    const filteredEvents = filterEvents(hackathon);

    return (
        <>
            <div className="viewEvent">
                <h1>View Events</h1>

                <select 
                    className="form-input"
                    name="theme"
                    onChange={handleFilter}
                >
                    <option value={"all"}>All Events</option>
                    <option value={"past"}>Past Events</option>
                    <option value={"inProgress"}>In Progress Events</option>
                    <option value={"upcoming"}>Upcoming Events</option>
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
                                {filteredEvents.map((hackathon, index) => (
                                    <tr className="table-light" key={index}>
                                        <td scope="row">{index + 1}</td>
                                        <td>{hackathon.eName}</td>
                                        <td>{hackathon.company}</td>
                                        <td>{hackathon.startDate}</td>
                                        <td>{hackathon.endDate}</td>
                                        <td>{hackathon.time}</td>
                                        <td>{hackathon.location}</td>
                                        <td>{hackathon.description}</td>
                                        <td>{hackathon.theme}</td>
                                        <td>
                                            <div className="actionBTN">
                                                <NavLink to={`/organizer/viewEvents/hackathonEdit/${hackathon.hToken}`}>
                                                    <button className="edit"> <MdModeEdit /> Edit</button>
                                                </NavLink>
                                                <button className="delete" onClick={() => hackathonDelete(hackathon.hToken)}><MdDelete /> Delete</button>

                                                {/* <NavLink to={`/organizer/viewParticepentInEachHackathon/${hackathon.hToken}`}> */}
                                                <button type="button" className="ViewParticipantBtn" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => getParticipantByEachHackathon(hackathon.hToken)}>
                                                    <FaEye /> View Particepents
                                                </button>
                                                {/* </NavLink> */}


                                                {/* <!-- Modal --> */}
                                                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div className="modal-dialog modal-xl">className
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h1 className="modal-title fs-5" id="exampleModalLabel">View Participants</h1>
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body">

                                                                <div>
                                                                    <div className="table-responsive-xxl">
                                                                        <table className="table">
                                                                            <thead className="table-success">
                                                                                <tr>
                                                                                    <th scope="col">S.no</th>
                                                                                    <th scope="col">Participant Name</th>
                                                                                    <th scope="col">Email</th>
                                                                                    <th scope="col">Phone Number</th>
                                                                                    <th scope="col">Total Experience</th>
                                                                                    <th scope="col">Skills & Experties</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {participants.map((participants, index) => (
                                                                                    <tr className="table-light" key={index}>
                                                                                        <td scope="row">{index + 1}</td>
                                                                                        <td>{participants.rName}</td>
                                                                                        <td>{participants.rEmail}</td>
                                                                                        <td>{participants.rPhone}</td>
                                                                                        <td>{participants.rTotalexperience}</td>
                                                                                        <td>{participants.skill_expertise}</td>

                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>


                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                <button type="button" className="btn btn-primary">Save changes</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
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
