import React from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { PiPizza, PiGift } from "react-icons/pi";
import { MdOutlineModeEdit } from "react-icons/md";
import { BsSuitcase2 } from "react-icons/bs";

const TransactionCard = ({ details, handleDelete, handleEdit }) => {
    // Map category to a specific icon
    const getCategoryIcon = (category) => {
        switch (category.toLowerCase()) {
            case 'food':
                return <PiPizza />;
            case 'entertainment':
                return <PiGift />;
            case 'travel':
                return <BsSuitcase2 />;
            default:
                return <span>💵</span>;
        }
    };

    return (
        <div className="transaction-card">
            <div className="transaction-card-inner">
                <div className="transaction-card-icon">
                    {getCategoryIcon(details.category)}
                </div>
                <div className="transaction-card-info">
                    <h5>{details.title}</h5>
                    <p>{details.date}</p>
                </div>
            </div>

            <div className="transaction-card-inner">
                <p className="transaction-card-price">₹{details.price.toFixed(0)}</p>
                <div className="transaction-card-button-wrapper">
                    <button className="transaction-card-delete-button" onClick={() => handleDelete(details.id)}>
                        <IoMdCloseCircleOutline />
                    </button>
                    <button className="transaction-card-edit-button" onClick={() => handleEdit(details)}>
                        <MdOutlineModeEdit />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionCard;