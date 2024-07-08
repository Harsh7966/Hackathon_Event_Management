
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { UseContext } from "../../storage/auth";

export const HackathonDetailedScreen = () => {
    const { getHackathonById, hackathonbyid, isRegisterOrNot, isregister } = UseContext();
    const params = useParams();

    useEffect(() => {
        isRegisterOrNot(params.hToken);
    }, [params.hToken, isRegisterOrNot]);

    useEffect(() => {
        getHackathonById(params.hToken);
    }, [params.hToken, getHackathonById]);

    const {
        eName = '',
        company = '',
        startDate = '',
        endDate = '',
        time = '',
        location = '',
        description = '',
        theme = '',
        hToken = ''
    } = hackathonbyid || {};

    return (
        <div className="viewEvent">
            <div className="formContainer CreateHackathon">
                <form id="contact">
                    <h1>Hackathon Detailed Screen</h1>
                    <br />
                    <fieldset>
                        <input
                            placeholder="Event Name"
                            type="text"
                            name="eName"
                            value={eName || ''}
                            readOnly
                            required
                        />
                    </fieldset>
                    <fieldset>
                        <input
                            placeholder="Company Name"
                            type="text"
                            name="company"
                            value={company || ''}
                            readOnly
                            required
                        />
                    </fieldset>
                    <fieldset>
                        <span>Start Date: </span>
                        <input
                            placeholder="Start Date"
                            type="date"
                            name="startDate"
                            value={startDate || ''}
                            readOnly
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
                            value={endDate || ''}
                            readOnly
                            required
                        />
                    </fieldset>
                    <br />
                    <fieldset>
                        <input
                            placeholder="Timing"
                            type="text"
                            name="time"
                            value={time || ''}
                            readOnly
                            required
                        />
                    </fieldset>
                    <fieldset>
                        <input
                            placeholder="Location"
                            type="text"
                            name="location"
                            value={location || ''}
                            readOnly
                            required
                        />
                    </fieldset>
                    <fieldset>
                        <textarea
                            placeholder="Enter description about hackathon event"
                            type="text"
                            name="description"
                            value={description || ''}
                            readOnly
                            required
                        />
                    </fieldset>
                    <fieldset>
                        <textarea
                            placeholder="Enter theme about hackathon event"
                            type="text"
                            name="theme"
                            value={theme || ''}
                            readOnly
                            required
                        />
                    </fieldset>
                    <fieldset>
                        {isregister.status ? (
                            <button name="submit" type="button" id="contact-submit" data-submit="...Sending">
                                Already Register
                            </button>
                        ) : (
                            <NavLink to={`/particepent/hackathon_Registration_Form/${hToken}`}>
                                <button name="submit" type="button" id="contact-submit" data-submit="...Sending">
                                    Register
                                </button>
                            </NavLink>
                        )}
                    </fieldset>
                </form>
            </div>
        </div>
    );
};
