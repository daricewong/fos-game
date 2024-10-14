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
    "Technology", "Health", "Travel", "Food", "Education", "Finance", "Entertainment",
    "Sports", "Fashion", "Beauty", "Home Decor", "Gardening", "Pets", "Automotive",
    "Real Estate", "Business", "Marketing", "Environment", "Politics", "History",
    "Science", "Art", "Music", "Dance", "Theater", "Film", "Photography",
    "Literature", "Philosophy", "Psychology", "Sociology", "Anthropology", "Economics",
    "Biology", "Chemistry", "Physics", "Mathematics", "Computer Science", "Engineering",
    "Astronomy", "Geology", "Meteorology", "Oceanography", "Environmental Science",
    "Social Media", "Cybersecurity", "Data Science", "Machine Learning", "Artificial Intelligence",
    "Robotics", "Internet of Things", "Virtual Reality", "Augmented Reality", "Blockchain",
    "Cryptocurrency", "Fintech", "Healthtech", "Edtech", "Gaming", "Esports",
    "Virtual Events", "Remote Work", "Digital Marketing", "E-commerce", "Supply Chain",
    "Logistics", "Manufacturing", "Agriculture", "Energy", "Renewable Energy",
    "Sustainability", "Climate Change", "Conservation", "Wildlife", "Ecotourism",
    "Culinary Arts", "Food Technology", "Nutrition", "Wellness", "Fitness", "Mental Health",
    "Self Improvement", "Personal Development", "Spirituality", "Philanthropy", "Volunteerism",
    "Social Impact", "Non-profit", "NGO", "Community Development", "Urban Planning",
    "Architecture", "Design", "Innovation", "Creativity", "Entrepreneurship", "Startups"
  ];

  const prompts = [
    "Imagine a world where", "What if we could", "How about a service that", "Consider a scenario where"
  ];

  const contents = [
    "Uber", "Airbnb", "Netflix", "Spotify", "Amazon", "Google", "Facebook",
    "Delivery", "Streaming", "Subscription", "Marketplace", "Fitness", "Traveling",
    "Cooking", "Gaming", "Education", "Shopping", "Networking", "Wellness",
    "Social Media", "Cybersecurity", "Data Science", "Machine Learning", "Artificial Intelligence",
    "Robotics", "Internet of Things", "Virtual Reality", "Augmented Reality", "Blockchain",
    "Cryptocurrency", "Fintech", "Healthtech", "Edtech", "Gaming", "Esports",
    "Virtual Events", "Remote Work", "Digital Marketing", "E-commerce", "Supply Chain",
    "Logistics", "Manufacturing", "Agriculture", "Energy", "Renewable Energy",
    "Sustainability", "Climate Change", "Conservation", "Wildlife", "Ecotourism",
    "Culinary Arts", "Food Technology", "Nutrition", "Wellness", "Fitness", "Mental Health",
    "Self Improvement", "Personal Development", "Spirituality", "Philanthropy", "Volunteerism",
    "Social Impact", "Non-profit", "NGO", "Community Development", "Urban Planning",
    "Architecture", "Design", "Innovation", "Creativity", "Entrepreneurship", "Startups",
    "Cloud Computing", "5G Networks", "Quantum Computing", "Biotechnology", "Nanotechnology",
    "Space Exploration", "Electric Vehicles", "Autonomous Cars", "Smart Homes", "Smart Cities",
    "Virtual Assistants", "Chatbots", "Customer Service", "HR Management", "Financial Analysis",
    "Marketing Automation", "Sales Enablement", "Customer Experience", "User Experience", "User Interface",
    "Web Development", "Mobile Apps", "Game Development", "Artificial General Intelligence",
    "Neural Networks", "Deep Learning", "Natural Language Processing", "Computer Vision", "Robotics Engineering",
    "Materials Science", "Environmental Engineering", "Aerospace Engineering", "Biomedical Engineering",
    "Civil Engineering", "Electrical Engineering", "Mechanical Engineering", "Software Engineering",
    "Data Analytics", "Business Intelligence", "Predictive Analytics", "Prescriptive Analytics", "Descriptive Analytics",
    "Digital Transformation", "IT Consulting", "Cybersecurity Consulting", "Cloud Migration", "DevOps",
    "Agile Methodologies", "Scrum", "Kanban", "Lean", "Six Sigma", "Total Quality Management",
    "Project Management", "Product Management", "Service Management", "Supply Chain Management", "Risk Management",
    "Compliance", "Regulatory Affairs", "Audit", "Taxation", "Financial Planning", "Wealth Management",
    "Investment Banking", "Venture Capital", "Private Equity", "Hedge Funds", "Asset Management",
    "Real Estate Investing", "Property Management", "Construction Management", "Architecture", "Interior Design",
    "Landscape Architecture", "Urban Planning", "Transportation Planning", "Environmental Planning", "Regional Planning",
    "Economic Development", "Community Development", "Social Entrepreneurship", "Impact Investing", "Social Impact",
    "Non-profit Management", "NGO Management", "Volunteer Management", "Fundraising", "Grant Writing",
    "Event Planning", "Conference Management", "Meeting Planning", "Exhibition Management", "Trade Show Management",
    "Digital Marketing", "SEO", "PPC", "Social Media Marketing", "Content Marketing", "Email Marketing",
    "Influencer Marketing", "Affiliate Marketing", "Video Marketing", "Podcast Marketing", "Audio Marketing",
    "Print Marketing", "Outdoor Advertising", "Event Marketing", "Experiential Marketing", "Sponsorship Activation",
    "Public Relations", "Crisis Communications", "Reputation Management", "Media Relations", "Speechwriting",
    "Content Creation", "Copywriting", "Editing", "Proofreading", "Translation", "Interpretation",
    "Graphic Design", "Visual Design", "UI Design", "UX Design", "Web Design", "Mobile Design",
    "Product Design", "Industrial Design", "Interior Design", "Fashion Design", "Textile Design",
    "Architecture", "Landscape Architecture", "Urban Planning", "Interior Architecture", "Naval Architecture",
    "Aerospace Engineering", "Biomedical Engineering", "Chemical Engineering", "Civil Engineering", "Computer Engineering",
    "Electrical Engineering", "Environmental Engineering", "Industrial Engineering", "Materials Science", "Mechanical Engineering",
    "Nuclear Engineering", "Software Engineering", "Systems Engineering", "Telecommunications Engineering", "Textile Engineering",
    "Biotechnology", "Genetic Engineering", "Microbiology", "Molecular Biology", "Neuroscience", "Pharmacology",
    "Physiology", "Virology", "Zoology", "Ecology", "Environmental Science", "Geology", "Meteorology",
    "Oceanography", "Paleontology", "Astronomy", "Astrophysics", "Cosmology", "Planetary Science",
    "Anthropology", "Archaeology", "Criminology", "Economics", "Geography", "History",
    "Linguistics", "Philosophy", "Political Science", "Psychology", "Sociology", "Statistics",
    "Accounting", "Finance", "Human Resources", "Management", "Marketing", "Operations",
    "Supply Chain", "Information Systems", "International Business", "Organizational Behavior", "Strategy",
    "Tourism", "Hospitality", "Event Management", "Recreation", "Leisure", "Sports Management",
    "Food Service", "Culinary Arts", "Baking", "Pastry Arts", "Catering", "Food Safety",
    "Nutrition", "Dietetics", "Food Science", "Agriculture", "Horticulture", "Animal Science",
    "Veterinary Medicine", "Pharmacy", "Pharmacology", "Toxicology", "Medicine", "Surgery",
    "Nursing", "Dentistry", "Optometry", "Podiatry", "Veterinary Nursing", "Animal Health",
    "Environmental Health", "Public Health", "Health Education", "Health Promotion", "Healthcare Management",
    "Health Informatics", "Health IT", "Medical Imaging", "Medical Laboratory", "Medical Technology",
    "Occupational Therapy", "Physical Therapy", "Speech Therapy", "Rehabilitation", "Orthotics",
    "Prosthetics", "Audiology", "Speech Pathology", "Language Pathology", "Hearing Science",
    "Vision Science", "Optics", "Ophthalmology", "Orthoptics", "Visual Science", "Neuroscience",
    "Neurology", "Neurosurgery", "Psychiatry", "Psychology", "Counseling", "Social Work",
    "Education", "Teaching", "Learning", "Instructional Design", "Curriculum Development", "Educational Technology",
    "Special Education", "Early Childhood Education", "Elementary Education", "Secondary Education", "Higher Education",
    "Adult Education", "Continuing Education", "Distance Learning", "Online Learning", "Blended Learning",
    "Flipped Classroom", "Personalized Learning", "Competency-Based Education", "Project-Based Learning", "Experiential Learning",
    "Service Learning", "Community Engagement", "Volunteerism", "Civic Engagement", "Social Responsibility",
    "Sustainability", "Environmental Sustainability", "Social Sustainability", "Economic Sustainability", "Cultural Sustainability",
    "Art", "Design", "Music", "Dance", "Theater", "Film", "Photography",
    "Literature", "Philosophy", "Psychology", "Sociology", "Anthropology", "Economics",
    "Biology", "Chemistry", "Physics", "Mathematics", "Computer Science", "Engineering",
    "Astronomy", "Geology", "Meteorology", "Oceanography", "Environmental Science",
    "Social Media", "Cybersecurity", "Data Science", "Machine Learning", "Artificial Intelligence",
    "Robotics", "Internet of Things", "Virtual Reality", "Augmented Reality", "Blockchain",
    "Cryptocurrency", "Fintech", "Healthtech", "Edtech", "Gaming", "Esports",
    "Virtual Events", "Remote Work", "Digital Marketing", "E-commerce", "Supply Chain",
    "Logistics", "Manufacturing", "Agriculture", "Energy", "Renewable Energy",
    "Sustainability", "Climate Change", "Conservation", "Wildlife", "Ecotourism",
    "Culinary Arts", "Food Technology", "Nutrition", "Wellness", "Fitness", "Mental Health",
    "Self Improvement", "Personal Development", "Spirituality", "Philanthropy", "Volunteerism",
    "Social Impact", "Non-profit", "NGO", "Community Development", "Urban Planning",
    "Architecture", "Design", "Innovation", "Creativity", "Entrepreneurship", "Startups",
    "Cloud Computing", "5G Networks", "Quantum Computing", "Biotechnology", "Nanotechnology",
    "Space Exploration", "Electric Vehicles", "Autonomous Cars", "Smart Homes", "Smart Cities",
    "Virtual Assistants", "Chatbots", "Customer Service", "HR Management", "Financial Analysis",
    "Marketing Automation", "Sales Enablement", "Customer Experience", "User Experience", "User Interface",
    "Web Development", "Mobile Apps", "Game Development", "Artificial General Intelligence",
    "Neural Networks", "Deep Learning", "Natural Language Processing", "Computer Vision", "Robotics Engineering",
    "Materials Science", "Environmental Engineering", "Aerospace Engineering", "Biomedical Engineering",
    "Civil Engineering", "Electrical Engineering", "Mechanical Engineering", "Software Engineering",
    "Data Analytics", "Business Intelligence", "Predictive Analytics", "Prescriptive Analytics", "Descriptive Analytics",
    "Digital Transformation", "IT Consulting", "Cybersecurity Consulting", "Cloud Migration", "DevOps",
    "Agile Methodologies", "Scrum", "Kanban", "Lean", "Six Sigma", "Total Quality Management",
    "Project Management", "Product Management", "Service Management", "Supply Chain Management", "Risk Management",
    "Compliance", "Regulatory Affairs", "Audit", "Taxation", "Financial Planning", "Wealth Management",
    "Investment Banking", "Venture Capital", "Private Equity", "Hedge Funds", "Asset Management",
    "Real Estate Investing", "Property Management", "Construction Management", "Architecture", "Interior Design",
    "Landscape Architecture", "Urban Planning", "Transportation Planning", "Environmental Planning", "Regional Planning",
    "Economic Development", "Community Development", "Social Entrepreneurship", "Impact Investing", "Social Impact",
    "Non-profit Management", "NGO Management", "Volunteer Management", "Fundraising", "Grant Writing",
    "Event Planning", "Conference Management", "Meeting Planning", "Exhibition Management", "Trade Show Management",
    "Digital Marketing", "SEO", "PPC", "Social Media Marketing", "Content Marketing", "Email Marketing",
    "Influencer Marketing", "Affiliate Marketing", "Video Marketing", "Podcast Marketing", "Audio Marketing",
    "Print Marketing", "Outdoor Advertising", "Event Marketing", "Experiential Marketing", "Sponsorship Activation",
    "Public Relations", "Crisis Communications", "Reputation Management", "Media Relations", "Speechwriting",
    "Content Creation", "Copywriting", "Editing", "Proofreading", "Translation", "Interpretation",
    "Graphic Design", "Visual Design", "UI Design", "UX Design", "Web Design", "Mobile Design",
    "Product Design", "Industrial Design", "Interior Design", "Fashion Design", "Textile Design",
    "Architecture", "Landscape Architecture", "Urban Planning", "Interior Architecture", "Naval Architecture",
    "Aerospace Engineering", "Biomedical Engineering", "Chemical Engineering", "Civil Engineering", "Computer Engineering",
    "Electrical Engineering", "Environmental Engineering", "Industrial Engineering", "Materials Science", "Mechanical Engineering",
    "Nuclear Engineering", "Software Engineering", "Systems Engineering", "Telecommunications Engineering", "Textile Engineering",
    "Biotechnology", "Genetic Engineering", "Microbiology", "Molecular Biology", "Neuroscience", "Pharmacology",
    "Physiology", "Virology", "Zoology", "Ecology", "Environmental Science", "Geology", "Meteorology",
    "Oceanography", "Paleontology", "Astronomy", "Astrophysics", "Cosmology", "Planetary Science",
    "Anthropology", "Archaeology", "Criminology", "Economics", "Geography", "History",
    "Linguistics", "Philosophy", "Political Science", "Psychology", "Sociology", "Statistics",
    "Accounting", "Finance", "Human Resources", "Management", "Marketing", "Operations",
    "Supply Chain", "Information Systems", "International Business", "Organizational Behavior", "Strategy",
    "Tourism", "Hospitality", "Event Management", "Recreation", "Leisure", "Sports Management",
    "Food Service", "Culinary Arts", "Baking", "Pastry Arts", "Catering", "Food Safety",
    "Nutrition", "Dietetics", "Food Science", "Agriculture", "Horticulture", "Animal Science",
    "Veterinary Medicine", "Pharmacy", "Pharmacology", "Toxicology", "Medicine", "Surgery",
    "Nursing", "Dentistry", "Optometry", "Podiatry", "Veterinary Nursing", "Animal Health",
    "Environmental Health", "Public Health", "Health Education", "Health Promotion", "Healthcare Management",
    "Health Informatics", "Health IT", "Medical Imaging", "Medical Laboratory", "Medical Technology",
    "Occupational Therapy", "Physical Therapy", "Speech Therapy", "Rehabilitation", "Orthotics",
    "Prosthetics", "Audiology", "Speech Pathology", "Language Pathology", "Hearing Science",
    "Vision Science", "Optics", "Ophthalmology", "Orthoptics", "Visual Science", "Neuroscience",
    "Neurology", "Neurosurgery", "Psychiatry", "Psychology", "Counseling", "Social Work",
    "Education", "Teaching", "Learning", "Instructional Design", "Curriculum Development", "Educational Technology",
    "Special Education", "Early Childhood Education", "Elementary Education", "Secondary Education", "Higher Education",
    "Adult Education", "Continuing Education", "Distance Learning", "Online Learning", "Blended Learning",
    "Flipped Classroom", "Personalized Learning", "Competency-Based Education", "Project-Based Learning", "Experiential Learning",
    "Service Learning", "Community Engagement", "Volunteerism", "Civic Engagement", "Social Responsibility",
    "Sustainability", "Environmental Sustainability", "Social Sustainability", "Economic Sustainability", "Cultural Sustainability",
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
    setCurrentPlayerIndex(0); // Reset to the first player
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
              <div className="mb-2 flex items-center"> {/* Flex container for alignment */}
                <label className="w-1/3"> {/* Set a width for the label */}
                  Number of Players:
                </label>
                <select
                  value={numPlayers}
                  onChange={(e) => setNumPlayers(Number(e.target.value))}
                  className="ml-2 border rounded p-1 w-full" // Make dropdown full width
                >
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                </select>
              </div>
              {Array.from({ length: numPlayers }).map((_, index) => (
                <div key={index} className="mb-2 flex items-center"> {/* Added flex for alignment */}
                  <label className="w-1/3"> {/* Set a width for the label */}
                    Player {index + 1} Name:
                  </label>
                  <input
                    type="text"
                    id={`player-${index}`}
                    className="ml-2 border rounded p-1 w-full" // Make input full width
                    required
                  />
                </div>
              ))}
              <Button type="submit" className="w-full mt-4">Start Game</Button> {/* Full width button with margin-top */}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4"> {/* Responsive grid */}
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
          <CardFooter className="flex flex-col sm:flex-row justify-between"> {/* Responsive footer */}
            <Button onClick={drawCard} disabled={isHandComplete() || remainingCards.length === 0} className="mb-2 sm:mb-0 sm:w-auto w-full">
              Draw Card
            </Button>
            <Button onClick={resetGame} variant="outline" className="mb-2 sm:mb-0 sm:w-auto w-full">
              <Shuffle className="mr-2 h-4 w-4" />
              Reset Game
            </Button>
            <Button onClick={nextPlayer} variant="outline" className="mb-2 sm:mb-0 sm:w-auto w-full">
              Next Player
            </Button>
            <Button onClick={goBackToSetup} variant="outline" className="mb-2 sm:mb-0 sm:w-auto w-full">
              Go Back
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}