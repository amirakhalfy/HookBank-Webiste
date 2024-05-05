import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import "./SmallEntrepriseForm.css";

const SmallEntrepriseForm = ({ user_id }) => {
    console.log(user_id)
    const [formData, setFormData] = useState({
        userId: user_id,
        entrepriseName: '',
        term: '',
        noEmp: '',
        newExist: '',
        retainedJob: '',
        revLineCr: '',
        lowDoc: '',
        grAppv: '',
        sbaAppv: '',
        naics0: false,
        naics62: false,
        "naics31-33": false
        
    });

    const [showPopup, setShowPopup] = useState(false);
    const popupRef = useRef(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const parsedValue = type === 'checkbox' ? checked : (name === 'term' || name === 'no_emp' || name === 'retained_job' || name === 'gr_appv' || name === 'sba_appv') ? parseInt(value) : value;
        setFormData(prevState => ({
            ...prevState,
            [name]: parsedValue
        }));
        console.log("naics0" + formData.naics0)
        console.log("naics62"  + formData.naics62)
        console.log("naics31-33" + formData['naics31-33'])
    };

    const handlePopupSubmit = (e) => {
        e.preventDefault();
        // Open the pop-up after form submission
        setShowPopup(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Parse formData values to correct types
        const parsedFormData = {
            userId: parseInt(formData.userId),
            entrepriseName: formData.entrepriseName,
            term: parseInt(formData.term),
            noEmp: parseInt(formData.noEmp),
            newExist: parseInt(formData.newExist),
            retainedJob: parseInt(formData.retainedJob),
            revLineCr: formData.revLineCr,
            lowDoc: formData.lowDoc,
            grAppv: parseInt(formData.grAppv),
            sbaAppv: parseInt(formData.sbaAppv),
            naics0: formData.naics0 ,
            naics62: formData.naics62 ,
            "naics31-33": formData["naics31-33"]
            
        };

        try {
            const responseget = await axios.get(`http://127.0.0.1:5000/small_enterprises_user/${user_id}`);
            if (responseget.data.enterprises.length > 0) {
                const enterprise_id = responseget.data.enterprises[0].id;
                const response = await axios.patch(
                    `http://127.0.0.1:5000/update_small_enterprise/${enterprise_id}`,
                    JSON.stringify(parsedFormData),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                console.log('Updated enterprise:', response.data);
            } else {
                const response = await axios.post('http://127.0.0.1:5000/create_small_enterprise', parsedFormData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log('Created enterprise:', response.data);
            }
        } catch (error) {
            console.error('There was a problem with your Axios request:', error);
        } 
    };

    useEffect(() => {
        // Add event listener to close pop-up when clicking outside
        const handleClickOutside = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                setShowPopup(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <form onSubmit={handlePopupSubmit}>
                {/* Form fields go here */}
                <button type="submit">Open Pop-up</button>
            </form>
            {showPopup && (
                <div className="popup" ref={popupRef}>
                    <div className="popup-content">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="entrepriseName">Entreprise Name</label>
                            <input
                                type="text"
                                id="entrepriseName"
                                name="entrepriseName"
                                value={formData.entrepriseName}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="term">Term</label>
                            <input
                                type="number"
                                id="term"
                                name="term"
                                value={formData.term}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="noEmp">Number of Employees</label>
                            <input
                                type="number"
                                id="noEmp"
                                name="noEmp"
                                value={formData.noEmp}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="newExist">New or Existing</label>
                            <select
                                id="newExist"
                                name="newExist"
                                value={formData.newExist}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select</option>
                                <option value="1">New</option>
                                <option value="0">Existing</option>
                            </select>

                            <label htmlFor="retainedJob">Retained Job</label>
                            <input
                                type="number"
                                id="retainedJob"
                                name="retainedJob"
                                value={formData.retainedJob}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="revLineCr">Rev Line Cr</label>
                            <input
                                type="text"
                                id="revLineCr"
                                name="revLineCr"
                                value={formData.revLineCr}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="lowDoc">Low Doc</label>
                            <input
                                type="text"
                                id="lowDoc"
                                name="lowDoc"
                                value={formData.lowDoc}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="grAppv">Gr Appv</label>
                            <input
                                type="number"
                                id="grAppv"
                                name="grAppv"
                                value={formData.grAppv}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="sbaAppv">Sba Appv</label>
                            <input
                                type="number"
                                id="sbaAppv"
                                name="sbaAppv"
                                value={formData.sbaAppv}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="naics0">Naics 0</label>
                            <input
                                type="checkbox"
                                id="naics0"
                                name="naics0"
                                checked={formData.naics0}
                                onChange={handleChange}
                            />

                            <label htmlFor="naics31-33">Naics 31-33</label>
                            <input
                                type="checkbox"
                                id="naics31-33"
                                name="naics31-33"
                                checked={formData["naics31-33"]}
                                onChange={handleChange}
                            />

                            <label htmlFor="naics62">Naics 62</label>
                            <input
                                type="checkbox"
                                id="naics62"
                                name="naics62"
                                checked={formData.naics62}
                                onChange={handleChange}
                            />
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SmallEntrepriseForm;
