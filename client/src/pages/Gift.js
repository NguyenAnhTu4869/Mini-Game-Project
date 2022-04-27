import React, { useState, useEffect } from "react";
import { EnhancedTable } from "../component/Table/Table";
import { GiftHeader } from "../component/Table/TableHeader";
import axios from "axios";
import { useSelector } from "react-redux";

// Get list gift
const handleGetListGift = async (setDataTable) => {
    await axios.get('http://localhost:8080/gifts', {
        headers: {
            accept: 'application/json',
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    })
        .then((res) => {
            var tableData = res.data.data.map((content) => {
                return {
                    id: content.id,
                    name: content.name,
                    amount: content.amount,
                    point: content.point
                };
            });
            setDataTable(tableData)
        })
        .catch((error) => {
            console.log(error)
        });
}

function Gift() {
    const isAccepted = useSelector((state) => state.user.isAccepted)
    const [dataTable, setDataTable] = useState([]);
    const userName = useSelector((state) => state.user.userName);
    const userEmail = useSelector((state) => state.user.userEmail);
    const userTimes = useSelector((state) => state.user.userTimes);
    const userScore = useSelector((state) => state.user.userScore);

    // Load list gift
    useEffect(() => {
        if (isAccepted === false) {
            handleGetListGift(setDataTable);
        }
    }, [isAccepted])

    return (
        <div className="container">
            <h1 className="text-center">Exchange gift</h1>

            <div className="row mt-5">
                <div className="col col-lg-4 mb-4">
                    <h2 className="text-center">User detail</h2>
                    <br />
                    <h5>Username: <span>{userName}</span></h5>
                    <br />
                    <h5>Email: <span>{userEmail}</span></h5>
                    <br />
                    <h5>Your times: <span>{userTimes}</span></h5>
                    <br />
                    <h5>Your point: <span>{userScore}</span></h5>
                </div>
                <div className="col col-lg-8 mb-4">
                    <h2 className="text-center">List gift</h2>
                    <EnhancedTable
                        columns={GiftHeader}
                        rows={dataTable}
                        hasBtn={true}
                    />
                </div>
            </div>
        </div>
    )
}

export default Gift;