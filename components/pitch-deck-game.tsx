'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Shuffle, Play, Pause, RotateCcw } from "lucide-react"
import { motion } from 'framer-motion'

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

    // Reset the timer to 60 seconds
    setTimer(60);
    setIsTimerRunning(false);

    // Update the UI to reflect the next player's name
    const currentPlayerElement = document.querySelector('.current-player-name');
    if (currentPlayerElement) {
        currentPlayerElement.textContent = playerNames[currentPlayerIndex];
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      {!isGameStarted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-4 mx-auto shadow-lg max-w-md">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <CardTitle className="text-3xl font-bold">Fluff or Stuff Game</CardTitle>
              <CardDescription className="text-gray-100">Enter Player Names to Start the Game!</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handlePlayerNamesSubmit} className="space-y-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Players:</label>
                  <select
                    value={numPlayers}
                    onChange={(e) => setNumPlayers(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                  </select>
                </div>
                {Array.from({ length: numPlayers }).map((_, index) => (
                  <div key={index} className="mb-4">
                    <label htmlFor={`player-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Player {index + 1} Name:
                    </label>
                    <input
                      type="text"
                      id={`player-${index}`}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                ))}
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-4 rounded-md hover:from-blue-600 hover:to-purple-600 transition duration-300">
                  Start Game
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-4 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <CardTitle className="text-3xl font-bold">Fluff or Stuff Game</CardTitle>
              <CardDescription className="text-gray-100">Draw cards to create your winning presentation!</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="font-bold text-xl text-blue-700">Current Player: <span className="text-purple-600">{playerNames[currentPlayerIndex]}</span></h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {hand.map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className={`${getCardColor(card.type)} border-2 shadow-md hover:shadow-lg transition-shadow duration-300`}>
                      <CardHeader>
                        <CardTitle className="text-sm font-semibold">{card.type}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg">{card.content}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <div className="bg-white p-6 rounded-lg mb-6 shadow-inner">
                <h3 className="font-bold mb-2 text-xl text-blue-700">Your Pitch:</h3>
                <p className="text-lg italic text-gray-700">{renderPitch()}</p>
              </div>
              <div className="flex items-center justify-between bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-lg shadow-inner">
                <div className="text-3xl font-bold text-blue-700">
                  {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                </div>
                <div>
                  <Button onClick={toggleTimer} className="mr-2 bg-blue-500 hover:bg-blue-600">
                    {isTimerRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                  <Button onClick={resetTimer} variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
                    <RotateCcw className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between p-6 bg-gray-50">
              <Button onClick={drawCard} disabled={isHandComplete() || remainingCards.length === 0} className="mb-2 sm:mb-0 sm:w-auto w-full bg-purple-500 hover:bg-purple-600">
                Draw Card
              </Button>
              <Button onClick={resetGame} variant="outline" className="mb-2 sm:mb-0 sm:w-auto w-full border-purple-500 text-purple-500 hover:bg-purple-50">
                <Shuffle className="mr-2 h-4 w-4" />
                Reset Game
              </Button>
              <Button onClick={nextPlayer} variant="outline" className="mb-2 sm:mb-0 sm:w-auto w-full border-blue-500 text-blue-500 hover:bg-blue-50">
                Next Player
              </Button>
              <Button onClick={goBackToSetup} variant="outline" className="mb-2 sm:mb-0 sm:w-auto w-full border-gray-500 text-gray-500 hover:bg-gray-50">
                Go Back
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
