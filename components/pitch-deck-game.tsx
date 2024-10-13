'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Shuffle, Play, Pause, RotateCcw } from "lucide-react"

type CardType = 'Content' | 'Prompt' | 'Theme'; // Updated card types

interface GameCard {
  type: CardType
  content: string
}

const generateDeck = (): GameCard[] => {
  const themes = [
    "Technology", "Health", "Travel", "Food", "Education", "Finance", "Entertainment"
  ];

  const prompts = [
    "Imagine a world where", "What if we could", "How about a service that", "Consider a scenario where"
  ];

  const contents = [
    "Uber", "Airbnb", "Netflix", "Spotify", "Amazon", "Google", "Facebook",
    "Delivery", "Streaming", "Subscription", "Marketplace", "Fitness", "Traveling",
    "Cooking", "Gaming", "Education", "Shopping", "Networking", "Wellness"
  ];

  const deck: GameCard[] = [];

  // Generate theme cards
  themes.forEach(theme => {
    deck.push({ type: 'Theme', content: theme });
  });

  // Generate prompt cards
  prompts.forEach(prompt => {
    deck.push({ type: 'Prompt', content: prompt });
  });

  // Generate content cards
  contents.forEach(content => {
    deck.push({ type: 'Content', content: content });
  });

  // Shuffle the deck
  return deck.sort(() => Math.random() - 0.5);
}

const getCardColor = (type: CardType): string => {
  switch (type) {
    case 'Content':
      return 'bg-red-100 border-red-300'; // Red color for Content Card
    case 'Prompt':
      return 'bg-green-100 border-green-300'; // Green color for Prompt Card
    case 'Theme':
      return 'bg-purple-100 border-purple-300'; // Purple color for Theme Card
    default:
      return 'bg-gray-100 border-gray-300'; // Default color
  }
}

export function PitchDeckGameComponent() {
  const [hand, setHand] = useState<GameCard[]>([])
  const [remainingCards, setRemainingCards] = useState<GameCard[]>(generateDeck())
  const [timer, setTimer] = useState(60)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  // New state for player names, number of players, and current player index
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [numPlayers, setNumPlayers] = useState<number>(4); // Default to 4
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0); // Track current player

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timer]);

  const drawCard = () => {
    if (remainingCards.length > 0) {
      const availableTypes = getAvailableCardTypes()
      const availableCards = remainingCards.filter(card => availableTypes.includes(card.type))
      
      if (availableCards.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableCards.length)
        const drawnCard = availableCards[randomIndex]
        setHand([...hand, drawnCard])
        setRemainingCards(remainingCards.filter(card => card !== drawnCard))
      }
    }
  }

  const getAvailableCardTypes = (): CardType[] => {
    const contentCards = hand.filter(card => card.type === 'Content').length
    const promptCards = hand.filter(card => card.type === 'Prompt').length
    const themeCards = hand.filter(card => card.type === 'Theme').length

    const availableTypes: CardType[] = []
    if (contentCards < 3) availableTypes.push('Content')
    if (promptCards < 1) availableTypes.push('Prompt')
    if (themeCards < 1) availableTypes.push('Theme')

    return availableTypes
  }

  const resetGame = () => {
    setHand([])
    setRemainingCards(generateDeck())
    setTimer(60)
    setIsTimerRunning(false)
    // Loop to reset the game for each player
    for (let i = 0; i < numPlayers; i++) {
      setCurrentPlayerIndex(i);
    }
  }

  const renderPitch = () => {
    const contents = hand.filter(card => card.type === 'Content').map(card => card.content).join(', ');
    const prompt = hand.find(card => card.type === 'Prompt')?.content || '___';
    const theme = hand.find(card => card.type === 'Theme')?.content || '___';

    return `${prompt}, ${contents}, ${theme}`;
  }

  const isHandComplete = () => {
    const contentCards = hand.filter(card => card.type === 'Content').length
    const promptCards = hand.filter(card => card.type === 'Prompt').length
    const themeCards = hand.filter(card => card.type === 'Theme').length

    return contentCards === 3 && promptCards === 1 && themeCards === 1
  }

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning)
  }

  const resetTimer = () => {
    setTimer(60)
    setIsTimerRunning(false)
  }

  // Function to handle player name submission
  const handlePlayerNamesSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const names = Array.from({ length: numPlayers }, (_, i) => (document.getElementById(`player-${i}`) as HTMLInputElement).value);
    setPlayerNames(names);
    setIsGameStarted(true);
    console.log("Player Names:", names); // Debugging line
  }

  // Function to go back to player setup
  const goBackToSetup = () => {
    resetGame();
    setIsGameStarted(false);
    setPlayerNames([]);
    setNumPlayers(4); // Reset to default
  }

  // Function to go to the next player
  const nextPlayer = () => {
    // Increment the current player index
    setCurrentPlayerIndex((currentPlayerIndex) => (currentPlayerIndex + 1) % playerNames.length);

    // Reset the cards being drawn for the next player
    setHand([]);

    // Update the UI to reflect the next player's name
    const currentPlayerElement = document.querySelector('.current-player-name');
    if (currentPlayerElement) {
        currentPlayerElement.textContent = playerNames[currentPlayerIndex];
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {!isGameStarted ? (
        <Card className="mb-4 mx-auto">
          <CardHeader>
            <CardTitle>Fluff or Stuff Game</CardTitle>
            <CardDescription>Enter Player Names to Start the Game!</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePlayerNamesSubmit} className="mb-4">
              <label className="block mb-2">
                Number of Players:
                <select
                  value={numPlayers}
                  onChange={(e) => setNumPlayers(Number(e.target.value))}
                  className="ml-2 border rounded p-1"
                >
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                </select>
              </label>
              {Array.from({ length: numPlayers }).map((_, index) => (
                <div key={index} className="mb-2">
                  <label>
                    Player {index + 1} Name:
                    <input
                      type="text"
                      id={`player-${index}`}
                      className="ml-2 border rounded p-1"
                      required
                    />
                  </label>
                </div>
              ))}
              <Button type="submit">Start Game</Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Fluff or Stuff Game</CardTitle>
            <CardDescription>Draw cards to create your winning presentation!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h3 className="font-bold">Current Player: {playerNames[currentPlayerIndex]}</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {hand.map((card, index) => (
                <Card key={index} className={`${getCardColor(card.type)} border-2`}>
                  <CardHeader>
                    <CardTitle className="text-sm">{card.type}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{card.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <h3 className="font-bold mb-2">Your Pitch:</h3>
              <p>{renderPitch()}</p>
            </div>
            <div className="flex items-center justify-between bg-primary/10 p-4 rounded-lg">
              <div className="text-2xl font-bold">
                {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
              </div>
              <div>
                <Button onClick={toggleTimer} className="mr-2">
                  {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button onClick={resetTimer} variant="outline">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={drawCard} disabled={isHandComplete() || remainingCards.length === 0}>
              Draw Card
            </Button>
            <Button onClick={resetGame} variant="outline">
              <Shuffle className="mr-2 h-4 w-4" />
              Reset Game
            </Button>
            <Button onClick={nextPlayer} variant="outline">
              Next Player
            </Button>
            <Button onClick={goBackToSetup} variant="outline">
              Go Back
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
