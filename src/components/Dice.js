import React, { useEffect, useState } from "react";
import "./dice.css";

const Dice = ({ sides }) => {
  const [state, setState] = useState({
    dice1: "one",
    dice2: "two",
    rolling: false,
    totalScore: 3,
  });

  const [newState, setNewState] = useState({
    printDice1: "",
    printDice2: "",
    newScore: 3,
  });

  const [initialRender, setInitialRender] = useState(true);

  const { dice1, dice2, totalScore, rolling } = state;
  const { printDice1, printDice2, newScore } = newState;

  useEffect(() => {
    if (rolling && initialRender) setInitialRender(false);
  }, [rolling]);

  const rollDice = () => {
    let oldDice1 = sides[Math.floor(Math.random() * sides.length)];
    let oldDice2 = sides[Math.floor(Math.random() * sides.length)];

    const score1 = Object.values(oldDice1);
    const score2 = Object.values(oldDice2);

    let newDice1 = sides[Math.floor(Math.random() * sides.length)];
    let newDice2 = sides[Math.floor(Math.random() * sides.length)];

    const newScore1 = Object.values(newDice1);
    const newScore2 = Object.values(newDice2);

    setState({
      dice1: Object.keys(oldDice1),
      dice2: Object.keys(oldDice2),
      rolling: true,
      totalScore: score1[0] + score2[0],
    });

    setNewState({
      printDice1: Object.keys(newDice1),
      printDice2: Object.keys(newDice2),
      rolling: false,
      newScore: newScore1[0] + newScore2[0],
    });

    setTimeout(() => {
      setState((prevState) => ({ ...prevState, rolling: false }));
    }, 1000);
  };

  return (
    <div className="container">
      <div className="flex">
        {rolling || initialRender ? (
          <i className={`rollingDice fas fa-dice-${String(dice1)}`}></i>
        ) : (
          <i className={`rollingDice fas fa-dice-${String(printDice1)}`}></i>
        )}
        {rolling || initialRender ? (
          <i className={`rollingDice fas fa-dice-${String(dice2)}`}></i>
        ) : (
          <i className={`rollingDice fas fa-dice-${String(printDice2)}`}></i>
        )}
      </div>
      <button className="btn" onClick={rollDice} disabled={rolling}>
        {rolling ? "Rolling..." : "Dice Roll"}
      </button>
      <h2>
        Total Score: <span>{newScore}</span>
      </h2>
    </div>
  );
};

Dice.defaultProps = {
  sides: [
    { one: 1 },
    { two: 2 },
    { three: 3 },
    { four: 4 },
    { five: 5 },
    { six: 6 },
  ],
};

export default Dice;
