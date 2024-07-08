import { useParams, NavLink } from "react-router-dom";
import { UseContext } from "../../storage/auth";
import { useEffect } from "react";
import { FaEye } from "react-icons/fa";

export const ViewParticepentList = () => {

    const { getAllEventsOfLoginUser, hackathon } = UseContext();
    const params = useParams();

    useEffect(() => {
        getAllEventsOfLoginUser(params.uToken);
    }, [getAllEventsOfLoginUser, params.uToken]);

    return (
        <>
            <div className="viewEvent">
                <h1>View list of participants</h1>

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
                                {hackathon.map((hackathon, index) => (
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
                                                <NavLink to={`/organizer/viewParticepentInEachHackathon/${hackathon.hToken}`}>
                                                    <button className="viewdetails" ><FaEye /> View Particepents</button>
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
    )
}