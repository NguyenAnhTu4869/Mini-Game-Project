import React from "react";

function About() {
    return (
        <div className="container">
            <h1 className="text-center">About Us</h1>

            <div className="row mt-5 justify-content-between">
                <div className="col-6 mb-4">
                    <h3 className="mb-4 text-center">The Mini Game App is a product for my final university project.</h3>
                    <p className="text-justify">
                        The product is developed by me (Nguyen Anh Tu) and applied ReactJS and NodeJS.
                        The product is created for research and learning purposes only. It is not intended
                        for commercial or other purposes. For all inquiries and information, please contact
                        the information on the side.
                    </p>
                </div>
                <div className="col-6 mb-4">
                    <h3 className="mb-4 text-center">Contact information</h3>
                    <ul className="list-group">
                        <li className="list-group-item list-group-item-dark">
                            <span style={{ fontWeight: "700" }}>Author:</span> Nguyen Anh Tu
                        </li>
                        <li className="list-group-item list-group-item-dark">
                            <span style={{ fontWeight: "700" }}>Email:</span> nt0263u@gre.ac.uk
                        </li>
                        <li className="list-group-item list-group-item-dark">
                            <span style={{ fontWeight: "700" }}>Phone:</span> 0903128477
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default About;