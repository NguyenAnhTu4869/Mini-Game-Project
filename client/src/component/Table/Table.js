import React, { useState, useEffect, Fragment } from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Popup from "../Modal/Popup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux-store/user/user.slice";

/** Update times database */
const handleUpdateTimes = async (id, userTimes, times) => {
    let data = { userTimes: (userTimes + times) }
    await axios.put('http://localhost:8080/users/times/' + id, data, {
        headers: {
            accept: 'application/json',
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    })
        .then((res) => {
            console.log(res)
        })
        .catch((error) => {
            console.log(error)
        });
}

/** Update score database */
const handleUpdateScore = async (id, userScore, score) => {
    let data = { userScore: (userScore - score) }
    await axios.put('http://localhost:8080/users/score/' + id, data, {
        headers: {
            accept: 'application/json',
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    })
        .then((res) => {
            console.log(res)
        })
        .catch((error) => {
            console.log(error)
        });
}

/** Update gift database */
const handleUpdateGift = async (giftId, giftAmount) => {
    let data = giftAmount - 1
    await axios.put('http://localhost:8080/gifts/' + giftId, data, {
        headers: {
            accept: 'application/json',
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    })
        .then((res) => {
            console.log(res)
        })
        .catch((error) => {
            console.log(error)
        });
}

/** Send mail success */
const handleSendMail = async (userEmail, giftName) => {
    let data = {
        userEmail: userEmail,
        giftName: giftName
    }
    await axios.post('http://localhost:8080/mail', data, {
        headers: {
            accept: 'application/json',
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    })
        .then((res) => {
            console.log(res)
        })
        .catch((error) => {
            console.log(error)
        })

}

// Table header
function EnhancedTableHead(props) {
    return (
        <TableHead>
            <TableRow>
                <TableCell
                    key={"#"}
                    align={"center"}
                    width={"5%"}
                    sx={{
                        fontWeight: "700",
                        fontSize: "15px"
                    }}>
                    #
                </TableCell>
                {props.columns.map((column) => (
                    <TableCell
                        key={column.id}
                        align={column.align}
                        width={column.width}
                        sx={{
                            fontWeight: "700",
                            fontSize: "15px"
                        }}>
                        {column.label}
                    </TableCell>
                ))}
                {props.hasBtn ?
                    <TableCell
                        key={"button"}
                        align={"center"}
                        width={"20%"}
                        sx={{
                            fontWeight: "700",
                            fontSize: "15px"
                        }}>
                        Exchange
                    </TableCell> :
                    <Fragment></Fragment>
                }
            </TableRow>
        </TableHead>
    )
}

// Table
export const EnhancedTable = ({ columns, rows, ...props }) => {
    const [message, setMessage] = useState("");
    const [popupShow, setPopupShow] = useState(false);
    const [index, setIndex] = useState(0);
    const [giftId, setGiftId] = useState(0);
    const [giftAmount, setGiftAmount] = useState(0);
    const [giftPoint, setGiftPoint] = useState(0);
    const [giftName, setGiftName] = useState("");
    const isAccepted = useSelector((state) => state.user.isAccepted)
    const userTimes = useSelector((state) => state.user.userTimes);
    const userScore = useSelector((state) => state.user.userScore);
    const userId = useSelector((state) => state.user.userId);
    const userEmail = useSelector((state) => state.user.userEmail);
    const dispatch = useDispatch()

    // Select exchange gift
    useEffect(() => {
        if (isAccepted === true) {
            switch (index) {
                case 1:
                    handleUpdateScore(userId, userScore, 10);
                    handleUpdateTimes(userId, userTimes, 1);
                    dispatch(
                        userActions.updateUserScore({
                            userScore: userScore - 10,
                        })
                    );
                    dispatch(
                        userActions.updateUserTime({
                            userTimes: userTimes + 1,
                        })
                    );
                    break;

                case 2:
                    handleUpdateScore(userId, userScore, 100);
                    handleUpdateTimes(userId, userTimes, 11);
                    dispatch(
                        userActions.updateUserScore({
                            userScore: userScore - 100,
                        })
                    );
                    dispatch(
                        userActions.updateUserTime({
                            userTimes: userTimes + 11,
                        })
                    );
                    break;

                default:
                    handleUpdateScore(userId, userScore, giftPoint);
                    dispatch(
                        userActions.updateUserScore({
                            userScore: userScore - giftPoint,
                        })
                    );
                    handleUpdateGift(giftId, giftAmount)
                    handleSendMail(userEmail, giftName)
                    break;
            }
        }
    }, [isAccepted])

    // Update redux isAccepted
    useEffect(() => {
        dispatch(
            userActions.updateAcceptedExchange({ isAccepted: false })
        )
    }, [userScore])

    return (
        <TableContainer>
            <Table>
                <EnhancedTableHead columns={columns} hasBtn={props.hasBtn} />
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={row.id}>
                            <TableCell
                                key={"No " + (index + 1)}
                                sx={{
                                    fontWeight: "700",
                                    fontSize: "15px"
                                }}>{index + 1}</TableCell>
                            {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        sx={{
                                            fontSize: "15px"
                                        }}>
                                        {column.format &&
                                            typeof value === "number"
                                            ? column.format(value)
                                            : value}
                                    </TableCell>
                                );
                            })}
                            {props.hasBtn ?
                                <TableCell key={"Button " + (index + 1)} align={"center"}>
                                    <button
                                        disabled={(row.amount > 0 || row.amount === null) && userScore >= row.point ? false : true}
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            setIndex(index + 1);
                                            setPopupShow(true);
                                            setMessage("Do you accept exchange this");
                                            setGiftId(row.id);
                                            setGiftAmount(row.amount);
                                            setGiftPoint(row.point);
                                            setGiftName(row.name)
                                        }}>
                                        Exchange
                                    </button>
                                </TableCell> :
                                <Fragment></Fragment>
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {message !== "" &&
                <Popup
                    show={popupShow}
                    onHide={() => setPopupShow(false)}
                    message={message}
                />
            }
        </TableContainer>
    )
}