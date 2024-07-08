import { useEffect } from "react"
import { useParams } from "react-router-dom";
import { UseContext } from "../../storage/auth";

export const ViewParticepentListInEachHackathon = () => {

    const params = useParams();
    const { getParticipantByEachHackathon, participants } = UseContext();

    useEffect(() => {
        getParticipantByEachHackathon(params.hToken);
    },[]);

    return (
        <>
        <div className="viewEvent">
            <h1>Participants List</h1>

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
        </>
    )
}