import { useState, useEffect } from 'react';
import Card from './Components/Card';
import './App.css';


function App() {

    const [card, setCard] = useState([]);
    const [card1, setCard1] = useState();
    const [card2, setCard2] = useState();
    const [pause, setPause] = useState()



    useEffect(() => {
        fetchData(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);



        async function fetchData(url) {
            const res1 = await fetch(url)
            const deck = await res1.json();
            const res = await fetch (`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=52`);
            const data = await res.json();
            console.log(data);
            setCard(data);


            setCard(prevCard => {
                return prevCard.cards.map(card => {
                    card.matched = false;
                    return card;
                })
            });
        }
        fetchData();
    }, []);


    const handleChoice = (card) => {
        card1 ? setCard2(card) : setCard1(card);
    }

    useEffect(() => {

        if(card1 && card2) {
            setPause(true);
            if(card1.value === card2.value) {
                setCard(prevCard => {

                    return prevCard.map(card => {
                        if(card.code === card1.code || card.code === card2.code){
                            return {...card, matched: true}

                        } else {
                            return card;

                        }
                    })
                })


                handleRestart();
            } else {

                setTimeout(() => handleRestart(), 2000);
            }
        }
    }, [card1, card2]);


    const handleRestart = () => {
        setCard1();
        setCard2();
        setPause(false);

    };


    return (
        <div className="App">

            <header className="header">
                <h1> </h1>
                <div>

                </div>
            </header>

            <div className="container">

                { }
                {card.length === 52 ?
                    (card.map(card => (

                        <Card
                            card={card}
                            key = {card.code}
                            handleChoice = {handleChoice}
                            TurnAroundCard={card === card1 || card === card2 || card.matched === true}
                            pause={pause}
                        ></Card>

                    ))):
                    (<p> </p> )

                }

            </div>
        </div>

    );

}

export default App;
