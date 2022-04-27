import React, { useState, useEffect } from "react";
import { EnhancedTable } from "../component/Table/Table";
import { UserHeader } from "../component/Table/TableHeader";
import axios from "axios";

const handleGetListUser = async (setDataTable) => {
    await axios.get('http://localhost:8080/users/list', {
        headers: {
            accept: 'application/json',
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    })
        .then((res) => {
            var tableData = res.data.data.map((content) => {
                return {
                    username: content.username,
                    userscore: content.userscore,
                };
            });
            setDataTable(tableData)
        })
        .catch((error) => {
            console.log(error)
        });
}

function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [dataTable, setDataTable] = useState([]);

    // Load list user
    useEffect(() => {
        if (isLoading) {
            setIsLoading(false);
            handleGetListUser(setDataTable);
        }
    }, [isLoading])

    return (
        <div className="container">
            <h1 className="text-center">Welcome Mini Game App</h1>

            <div className="row justify-content-center mt-5">
                <div className="col col-lg-8 mb-4">
                    <h2 className="text-center">List top user score</h2>
                    <EnhancedTable
                        columns={UserHeader}
                        rows={dataTable}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home;