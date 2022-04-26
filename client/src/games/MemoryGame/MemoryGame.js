import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Grid from "./Gird";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux-store/user/user.slice";
import ModalView from "../../component/Modal/Modal";

/** Set duration */
const useInterval = (callback, delay, duration) => {
    const durationRef = useRef(duration);
    const durationIntervalRef = useRef();

    const handler = () => {
        callback(durationRef);
    };

    useEffect(
        () => {
            const durationInterval = setInterval(handler, delay);
            durationIntervalRef.current = durationInterval;
            return () => {
                clearInterval(durationInterval);
            };
        }, [duration]);

    return durationIntervalRef;
};

/** Update times database */
const handleUpdateTimes = async (id, times) => {
    let data = { userTimes: (times - 1) }
    await axios.put('http://localhost:8080/users/times/' + id, data, {
        headers: {
            accept: 'application/json',
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    })
        .then((res) => {
            console.log(res)
            // setPopupShow(true);
            // setMessage(res.data.message);
        })
        .catch((error) => {
            // setPopupShow(true);
            // setMessage(error);
        });
}


function MemoryGame() {
    const [newGame, setNewGame] = useState(false);
    const [list, setList] = useState([]);
    const [visibleItems, setVisibleItems] = useState([]);
    const [finishedItems, setFinishedItems] = useState([]);
    const [duration, setDuration] = useState(0);
    const [newDuration, setNewDuration] = useState(0);
    const currentDuration = duration - newDuration;
    const [winner, setWinner] = useState(false);
    const userTimes = useSelector((state) => state.user.userTimes);
    const userScore = useSelector((state) => state.user.userScore);
    const userId = useSelector((state) => state.user.userId);
    const dispatch = useDispatch();
    const [score, setScore] = useState(0);
    const [isShow, setIsShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    const setUserTime = () => {
        handleUpdateTimes(userId, userTimes);
        dispatch(
            userActions.updateUserTime({
                userTimes: userTimes - 1,
            })
        );
        setNewDuration(duration)
    }

    const checkItems = (firstIndex, secondIndex) => {
        if (
            firstIndex !== secondIndex &&
            list[firstIndex].url === list[secondIndex].url
        ) {
            setFinishedItems([...finishedItems, firstIndex, secondIndex]);
        } else {
            setTimeout(() => {
                setVisibleItems([]);
            }, 600);
        }
    };

    useEffect(
        () => {
            axios
                .get(
                    "https://api.unsplash.com/search/photos/?client_id=coqXaNZS1lcZNQ8yQQMViYOSW1Kg4JgLE5hNOnBcGl0&query=plant&per_page=6"
                )
                .then(res => {
                    const newList = res.data.results.map(item => {
                        return {
                            id: item.id,
                            url: item.urls.thumb,
                            description: item.alt_description
                        };
                    });
                    setList(
                        newList
                            .concat(
                                newList.map(item => {
                                    return {
                                        ...item,
                                        id: item.id + "1"
                                    };
                                })
                            )
                            .sort(() => {
                                return 0.5 - Math.random();
                            })
                    );
                });
        },
        [newGame]
    );

    const durationIntervalRef = useInterval(
        durationRef => {
            durationRef.current++;
            setDuration(durationRef.current);
        },
        1000,
        duration,
    );

    useEffect(
        () => {
            dispatch(
                userActions.updateUserScore({
                    userScore: userScore + score,
                })
            );
        },
        [score]
    );

    useEffect(
        () => {
            if (finishedItems.length > 0 && finishedItems.length === list.length) {
                setWinner(true);
                clearInterval(durationIntervalRef.current);
                if (currentDuration < 15) {
                    setScore(15)
                } else if (currentDuration >= 15 && currentDuration < 25) {
                    setScore(10)
                } else if (currentDuration >= 25 && currentDuration < 60) {
                    setScore(5)
                } else {
                    setScore(0)
                }
                setModalShow(true)
            }
        },
        [finishedItems]
    );

    return (
        <div className="container">
            <div className="text-center p-6 d-flex flex-column">
                <h1>Memory Game</h1>
                <button
                    className="btn btn-secondary my-4"
                    disabled={userTimes === 0 ? true : false}
                    onClick={() => {
                        setNewGame(!newGame);
                        setVisibleItems([]);
                        setFinishedItems([]);
                        setWinner(false);
                        setUserTime();
                        setDuration(duration + 1)
                        setInterval(durationIntervalRef.current);
                        setIsShow(true)
                    }}
                >
                    New Game
                </button>

                <div>
                    You have {userTimes} times
                </div>
                {list.length === 0 ? (
                    <div>...Loading</div>
                ) : (
                    <div style={{ display: isShow ? "block" : "none" }}>
                        Your time is {currentDuration} seconds
                        <br />
                        <Grid
                            list={list}
                            visibleItems={visibleItems}
                            setVisibleItems={setVisibleItems}
                            finishedItems={finishedItems}
                            checkItems={checkItems}
                        />
                    </div>
                )}
            </div>
            {winner &&
                <ModalView
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    currentDuration={currentDuration}
                    score={score}
                    userScore={userScore}
                />
            }
        </div>
    );
}

export default MemoryGame;