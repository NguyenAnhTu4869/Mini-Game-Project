import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Grid from "./Gird";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux-store/user/user.slice";
import ModalView from "../../component/Modal/Modal";
import { useParams } from "react-router-dom";

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
        })
        .catch((error) => {
            console.log(error)
        });
}

/** Update score database */
const handleUpdateScore = async (id, userScore, score) => {
    let data = { userScore: (userScore + score) }
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

    // define level game
    let { level } = useParams();

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

    var url = "";
    switch (level) {
        case "1":
            url = "https://api.unsplash.com/search/photos/?client_id=coqXaNZS1lcZNQ8yQQMViYOSW1Kg4JgLE5hNOnBcGl0&query=plant&per_page=6"
            break;
        case "2":
            url = "https://api.unsplash.com/search/photos/?client_id=coqXaNZS1lcZNQ8yQQMViYOSW1Kg4JgLE5hNOnBcGl0&query=game&per_page=12"
            break;
        case "3":
            url = "https://api.unsplash.com/search/photos/?client_id=coqXaNZS1lcZNQ8yQQMViYOSW1Kg4JgLE5hNOnBcGl0&query=galaxy&per_page=18"
            break;
        default:
            break;
    }

    useEffect(
        () => {
            axios
                .get(url)
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
            handleUpdateScore(userId, userScore, score);
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
                switch (level) {
                    case "1":
                        if (currentDuration < 15) {
                            setScore(20)
                        } else if (currentDuration >= 15 && currentDuration < 25) {
                            setScore(15)
                        } else if (currentDuration >= 25 && currentDuration < 60) {
                            setScore(10)
                        } else {
                            setScore(0)
                        }
                        break;

                    case "2":
                        if (currentDuration < 35) {
                            setScore(25)
                        } else if (currentDuration >= 35 && currentDuration < 65) {
                            setScore(20)
                        } else if (currentDuration >= 65 && currentDuration < 105) {
                            setScore(15)
                        } else {
                            setScore(0)
                        }
                        break;

                    case "3":
                        if (currentDuration < 60) {
                            setScore(50)
                        } else if (currentDuration >= 60 && currentDuration < 90) {
                            setScore(40)
                        } else if (currentDuration >= 90 && currentDuration < 120) {
                            setScore(35)
                        } else {
                            setScore(0)
                        }
                        break;

                    default:
                        break;
                }
                setModalShow(true)
            }
        },
        [finishedItems]
    );

    return (
        <div className="container">
            <div className="text-center p-6 d-flex flex-column">
                <h1>Memory Game Level {level}</h1>
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