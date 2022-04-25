import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Grid from "./Gird";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux-store/user/user.slice";

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
        },
        [duration]
    );

    return durationIntervalRef;
};

function MemoryGame() {
    const [newGame, setNewGame] = useState(false);
    const [list, setList] = useState([]);
    const [visibleItems, setVisibleItems] = useState([]);
    const [duration, setDuration] = useState(0);
    const [finishedItems, setFinishedItems] = useState([]);
    const [winner, setWinner] = useState(false);
    const userTimes = useSelector((state) => state.user.userTimes);
    const userScore = useSelector((state) => state.user.userScore);
    const dispatch = useDispatch();
    const [score, setScore] = useState(0);

    const setUserTime = () => {
        dispatch(
            userActions.updateUserTime({
                userTimes: userTimes - 1,
            })
        );
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
                    "https://api.unsplash.com/search/photos/?client_id=coqXaNZS1lcZNQ8yQQMViYOSW1Kg4JgLE5hNOnBcGl0&query=plant&per_page=2"
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
            console.log(durationRef.current)
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
                if (duration < 15) {
                    setScore(15)
                } else if (duration >= 15 && duration < 25) {
                    setScore(10)
                } else if (duration >= 25 && duration < 60) {
                    setScore(5)
                } else {
                    setScore(0)
                }
            }
        },
        [finishedItems]
    );

    return (
        <div className="container">
            <div className="text-center p-6 d-flex flex-column">
                <h1>Memory Game</h1>
                <button
                    disabled={userTimes === 0 ? true : false}
                    onClick={() => {
                        setNewGame(!newGame);
                        setVisibleItems([]);
                        setFinishedItems([]);
                        setWinner(false);
                        setUserTime();
                        setScore(0);
                        setDuration(0);
                        setInterval(durationIntervalRef.current);
                    }}
                    className="btn btn-warning my-4"
                >
                    New Game
                </button>
                <div>
                    You have {userTimes} times
                </div>
                {list.length === 0 ? (
                    <div>...Loading</div>
                ) : (
                    <div>
                        <Grid
                            list={list}
                            visibleItems={visibleItems}
                            setVisibleItems={setVisibleItems}
                            finishedItems={finishedItems}
                            checkItems={checkItems}
                        />
                        {winner && (
                            <div>
                                You Win !
                                <br />
                                Finished in {duration} seconds
                                <br />
                                The score of this game is {score}
                                <br />
                                The total of user score is {userScore}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MemoryGame;