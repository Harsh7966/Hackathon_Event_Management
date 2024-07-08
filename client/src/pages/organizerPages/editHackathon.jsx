import { useEffect, useState } from "react";
import { UseContext } from "../../storage/auth";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

export const EditHackathon = () => {
    const params = useParams();
    const { tokenAuthorization, User, getHackathonById, hackathonbyid } = UseContext();
    const navigate = useNavigate();

    const [hackathon, setHackathon] = useState({
        eName: "",
        company: "",
        startDate: "",
        endDate: "",
        time: "",
        location: "",
        description: "",
        theme:"",
    });

    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const handleInput = (e) => {
        const { name, value } = e.target;

        setHackathon((prevHackathon) => ({
            ...prevHackathon,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/api/organizer/hackathonEdit/${params.hToken}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tokenAuthorization
                },
                body: JSON.stringify(hackathon),
            });

            const msg = await response.json();

            if (response.status === 200) {

                console.log(msg);
                Swal.fire({
                    title: msg.msg,
                    text: 'Do you want to continue',
                    icon: "success",
                    confirmButtonText: 'Cool'
                });
                navigate(`/organizer/viewEvents/${User.uToken}`);

            } 
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const fetchHackathonDetails = async () => {
            await getHackathonById(params.hToken);
            setIsInitialLoad(false);
        };

        if (isInitialLoad) {
            fetchHackathonDetails();
        }
    }, [params.hToken, getHackathonById, isInitialLoad]);

    useEffect(() => {
        if (hackathonbyid) {
            setHackathon({
                eName: hackathonbyid.eName || "",
                company: hackathonbyid.company || "",
                startDate: hackathonbyid.startDate || "",
                endDate: hackathonbyid.endDate || "",
                time: hackathonbyid.time || "",
                location: hackathonbyid.location || "",
                description: hackathonbyid.description || "",
                theme: hackathonbyid.theme || "",
            });
        }
    }, [hackathonbyid]);

    return (
        <div className="viewEvent">
            <div className="formContainer CreateHackathon">
                <form id="contact" onSubmit={handleSubmit}>
                    <h1>Edit Hackathon Details</h1>
                    <br />
                    <fieldset>
                        <input
                            placeholder="Event Name"
                            type="text"
                            name="eName"
                            onChange={handleInput}
                            value={hackathon.eName}
                            required
                        />
                    </fieldset>
                    <fieldset>
                        <input
                            placeholder="Company Name"
                            type="text"
                            name="company"
                            onChange={handleInput}
                            value={hackathon.company}
                            required
                        />
                    </fieldset>
                    <fieldset>
                        <span>Start Date: </span>
                        <input
                            placeholder="Start Date"
                            type="date"
                            name="startDate"
                            onChange={handleInput}
                            value={hackathon.startDate}
                            required
                        />
                    </fieldset>
                    <br />
                    <fieldset>
                        <span>End Date: </span>
                        <input
                            placeholder="End Date"
                            type="date"
                            name="endDate"
                            onChange={handleInput}
                            value={hackathon.endDate}
                            required
                        />
                    </fieldset>
                    <br />
                    <fieldset>
                        <input
                            placeholder="Timing"
                            type="text"
                            name="time"
                            onChange={handleInput}
                            value={hackathon.time}
                            required
                        />
                    </fieldset>
                    <fieldset>
                        <input
                            placeholder="Location"
                            type="text"
                            name="location"
                            onChange={handleInput}
                            value={hackathon.location}
                            required
                        />
                    </fieldset>
                    <fieldset>
                        <textarea
                            placeholder="Enter description about hackathon event"
                            type="text"
                            name="description"
                            onChange={handleInput}
                            value={hackathon.description}
                            required
                        />
                    </fieldset>
                    <div className="input-group">
                        <select
                            className="form-input"
                            name="theme"
                            value={hackathon.theme}
                            onChange={handleInput}
                            required
                        >
                            <option value={hackathon.theme} >{hackathon.theme}</option>
                            <option value="Artificial_Intelligence">Artificial Intelligence</option>
                            <option value="Cybersecurity">Cybersecurity</option>
                            <option value="Financial_Technology_(FinTech)">Financial Technology (FinTech)</option>
                            <option value="Education_and_Learning">Education and Learning</option>
                            <option value="Healthcare_and_Medicine">Healthcare and Medicine</option>
                            <option value="Gaming_and_Entertainment">Gaming and Entertainment</option>
                        </select>
                    </div>
                    <fieldset>
                        <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">
                            Submit
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};












