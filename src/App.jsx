import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import './App.css';

function App() {
  const [text, setText] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [currentParagraph, setCurrentParagraph] = useState("");
  const [typedLetters, setTypedLetters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);  // State for button movement

  const paragraphs = [
    'sure i can give you a long paragraph with no punctuation so imagine you are walking through a dense forest the trees are towering above you with their leaves forming a thick canopy that filters the sunlight into speckled patterns on the ground the air is filled with the scent of damp earth and fresh greenery you can hear the distant chirping of birds hidden in the branches above and the occasional rustling of leaves as small creatures scurry through the undergrowth each step you take sinks slightly into the soft soil beneath your feet and as you move deeper into the woods the sounds of the outside world begin to fade away replaced only by the whisper of the wind through the trees and the rhythmic crunch of twigs snapping underfoot the path is barely visible winding its way through a tangle of ferns and moss covered rocks your heartbeat is steady and your breath is slow as you take in the beauty of the untouched wilderness ahead of you the forest seems endless stretching in every direction with no clear destination in sight but there is something peaceful about being surrounded by nothing but nature unbroken by the touch of human hands you continue walking allowing your thoughts to drift freely with no distractions no worries no urgency just the quiet companionship of the towering trees and the world that exists within their shadows',
    'the quick brown fox jumps over the lazy dog this sentence is often used as a pangram in the english language it contains every letter of the alphabet at least once and is commonly used for testing fonts keyboards and other text related applications the phrase has become a staple in typing tests and exercises as it provides a comprehensive representation of the letters used in the english language while also being relatively short and easy to remember the quick brown fox jumps over the lazy dog is not only a useful tool for typists but also a fun and quirky sentence that has captured the attention of many language enthusiasts',
    'in the beginning god created the heavens and the earth and the earth was without form and void and darkness was upon the face of the deep and the spirit of god moved upon the face of the waters and god said let there be light and there was light and god saw the light that it was good and god divided the light from the darkness and god called the light day and the darkness he called night and the evening and the morning were the first day',
    'the rain in spain stays mainly in the plain this phrase is often used to illustrate the importance of proper pronunciation and enunciation in speech it has become a popular tongue twister and is frequently referenced in literature and pop culture the phrase is particularly associated with the musical my fair lady where it is used as a vocal exercise for the character eliza doolittle as she learns to speak with an upper class accent the rain in spain has become a symbol of the challenges and triumphs of mastering language and communication',
    'a journey of a thousand miles begins with a single step this ancient proverb emphasizes the importance of taking that first step towards achieving a goal no matter how daunting the task may seem it serves as a reminder that every great achievement starts with a small action and that perseverance and determination are key to overcoming obstacles along the way whether it is in personal growth career aspirations or any other endeavor the journey may be long and challenging but with each step taken progress is made and success becomes attainable',
    'something else entirely different is the way that the world has changed in recent years with the advent of technology and the internet we have seen a shift in how we communicate interact and even think the digital age has brought about a new era of connectivity where information is at our fingertips and social interactions can happen instantaneously this has led to both positive and negative consequences as we navigate this new landscape it is important to find a balance between embracing the benefits of technology while also being mindful of its impact on our lives and relationships',
    'the sun sets in the west casting a warm golden glow across the horizon as the day comes to an end the sky transforms into a canvas of vibrant colors blending shades of orange pink and purple creating a breathtaking view that captivates all who witness it the gentle breeze carries the scent of blooming flowers and freshly cut grass as nature prepares for the night ahead the chirping of crickets begins to fill the air and the first stars start to twinkle in the darkening sky it is a moment of tranquility a reminder of the beauty that exists in the world around us and a chance to reflect on the day that has passed',
    'the art of storytelling has been a cherished tradition throughout human history it allows us to share experiences convey emotions and connect with one another on a deeper level whether through oral traditions written narratives or visual mediums stories have the power to inspire entertain and educate they can transport us to different worlds introduce us to new perspectives and challenge our beliefs the beauty of storytelling lies in its ability to transcend time and culture creating a shared understanding that unites us all',
    'the future of technology is an exciting and ever evolving landscape that holds endless possibilities from artificial intelligence and machine learning to virtual reality and blockchain the advancements we are witnessing today are shaping the way we live work and interact with one another as we continue to push the boundaries of innovation it is essential to consider the ethical implications and societal impact of these technologies ensuring that they are used for the greater good and benefit of all humanity',
    'the human brain is a complex and fascinating organ responsible for controlling every aspect of our lives from basic functions like breathing and heartbeat to higher cognitive processes such as reasoning and decision making it is the center of our thoughts emotions and memories allowing us to learn adapt and grow throughout our lives understanding the intricacies of the brain is crucial for advancing fields such as medicine psychology and neuroscience as we continue to unravel its mysteries we gain valuable insights into what makes us human',
    'the importance of mental health cannot be overstated it plays a vital role in our overall well being and quality of life mental health encompasses our emotional psychological and social well being affecting how we think feel and act it also influences how we handle stress relate to others and make choices prioritizing mental health is essential for leading a fulfilling life and fostering resilience in the face of challenges seeking help when needed and practicing self care are crucial steps towards maintaining good mental health',
    'the ocean is a vast and mysterious expanse that covers more than 70 percent of the earths surface it is home to an incredible diversity of life from the smallest plankton to the largest whales the ocean plays a crucial role in regulating the planets climate and weather patterns while also providing resources for food transportation and recreation exploring the depths of the ocean has captivated scientists and adventurers alike as we continue to learn more about this incredible ecosystem we gain a greater appreciation for its beauty and importance in our lives'
  ];

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      calculateWPM();
      setIsRunning(false);
      setHasStarted(false);
    }
  }, [isRunning, timeLeft]);

  const startTest = () => {
    setIsTestStarted(true);
    setIsRunning(true);
    setTimeLeft(30);
    setText("");
    setWpm(0);
    setCurrentIndex(0);
    setTypedLetters([]);
    setCurrentParagraph(paragraphs[Math.floor(Math.random() * paragraphs.length)]);
    setHasStarted(true);  // Set button moved down when test starts
  };

  const calculateWPM = () => {
    const correctWords = [];
    const typedWords = text.trim().split(/\s+/);
    const paragraphWords = currentParagraph.trim().split(/\s+/);

    for (let i = 0; i < typedWords.length; i++) {
      if (typedWords[i] === paragraphWords[i]) {
        correctWords.push(typedWords[i]);
      }
    }

    const wpmCalculated = (correctWords.length / 30) * 60;
    setWpm(wpmCalculated);
  };

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setText(inputText);

    const letter = inputText.slice(-1);
    const newTypedLetters = [...typedLetters, letter];

    setTypedLetters(newTypedLetters);
    setCurrentIndex(currentIndex + 1); // Move to next letter
  };

  const handleBackspace = () => {
    if (typedLetters.length === 0) return;

    // Remove the last letter from text (mimic the backspace in the textarea)
    const updatedText = text.slice(0, text.length - 1);
    setText(updatedText);

    // Remove the last typed letter from typedLetters and update the currentIndex
    const newTypedLetters = typedLetters.slice(0, typedLetters.length - 1);
    setTypedLetters(newTypedLetters);
    setCurrentIndex(currentIndex - 1); // Move one letter back in the paragraph
  };

  const getLetterColor = (index) => {
    const paragraphLetter = currentParagraph[index];
    const typedLetter = typedLetters[index];

    if (typedLetter === undefined) {
      return "text-gray-500"; // Untouched letter
    } else if (typedLetter === paragraphLetter) {
      return "text-white"; // Correct letter
    } else {
      return "text-red-500"; // Incorrect letter
    }
  };

  return (
    <div class="flex flex-col items-center justify-center gap-4 p-8 text-center fade-in text-wrap">
      <div className="absolute top-4 left-4 text-white font-bold text-lg opacity-50">
      </div>
      <motion.div layout transition={{ duration: 0.5, ease: "easeOut" }}>
        <h1 className="subpixel-antialiased animate-fade-in">Let's check your typing speed!</h1>
        <p className="subpixel-antialiased">Type as fast as you can and see your speed in words per minute (WPM).</p>
      </motion.div>

      <motion.div layout transition={{ duration: 0.5, ease: "easeOut" }}>
        <textarea
          class="w-[800px] h-[150px] p-2 rounded-lg text-base opacity-30 font-mono font-bold text-white outline-none resize-none box-border bg-black-500 shadow-xl shadow-red-500/50"
          placeholder="Start typing here..."
          value={text}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Backspace") {
              e.preventDefault();
              handleBackspace();
            }
          }}
          disabled={!isRunning}
        ></textarea>
      </motion.div>

      <motion.div layout transition={{ duration: 0.5, ease: "easeOut" }}> 
        <div class={`paragraph ${isTestStarted ? "" : "hidden"}`}>
          <p>
            {currentParagraph.split("").map((char, index) => (
              <span key={index} className={getLetterColor(index)}>
                {char}
              </span>
            ))}
          </p>
        </div>
      </motion.div>

      <div>
        {!isRunning && (
          <button
            className={`bg-red-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-green-500 border-1 rounded-xl w-25 h-10 font-sans animate-bounce mt-8`}
            onClick={startTest}
          >
            Start Test
          </button>
        )}
        {isRunning && <p className="text-2xl">Time Left: {timeLeft}s</p>}
      </div>

      {!isRunning && <p className={`result ${isTestStarted ? "" : "hidden"}`} class='text-5xl'>
        Your typing speed: <strong>{wpm} WPM</strong>
      </p>}
    </div>
  );
}

export default App;
