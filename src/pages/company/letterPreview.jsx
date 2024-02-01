import React, { useState, useEffect } from 'react';

const HostLetterTemplate = ({ 
    propertyManagementCompany,
    propertyCompanyAddress,
    appreciationDetails,
    additionalDetails }) => {

    return (
        <>       
        <div className="letter-container">
            <div className="letter-left">
                <h2> {propertyManagementCompany} </h2>
                <p> {propertyCompanyAddress} </p>
                <p> {additionalDetails} </p>
            </div>
            <div className="letter-right">
                <p>{`Dear Tenats,`}</p>

                <p>
                    I am writing to express my sincere appreciation for the outstanding service provided by {propertyManagementCompany}. As a tenant, I have experienced exceptional professionalism and dedication from your team, making my stay at {propertyCompanyAddress} truly enjoyable.
                </p>

                <p>
                    {appreciationDetails}
                </p>

                <p>
                    The attention to detail and prompt response to any concerns have truly set {propertyManagementCompany} apart. I feel fortunate to be a part of a community managed by such a dedicated and reliable property management company.
                </p>

                <p>
                    Thank you for your continuous efforts in maintaining a high standard of service. I look forward to a continued positive relationship with {propertyManagementCompany}.
                </p>

                <p>
                    Thank you for choosing our property for your stay. If there's anything you need during your time here, do not hesitate to contact us.
                </p>

                <p>Best regards,</p>
                <p>{propertyManagementCompany}</p>
            </div>
        </div>
        </>
    );
};

export default HostLetterTemplate;
