// Import the profile image
import userImage from './assets/user0.jpg';

// Import all project images
import freewaystudyImage from './assets/freewaystudy.png';
import salarifyImage from './assets/salarify.png';
import askAiImage from './assets/ask-ai.png';
import amazonHomepageCloneImage from './assets/amazon_homepage_clone.png';
import ticTacToeImage from './assets/tic_tac_toe.png';
import rockPaperScissorsImage from './assets/rock_paper_scissors.png';
import darkModeButtonImage from './assets/dark_mode_button.png';
import spotifyImage from './assets/spotify.png';
import responsiveCalcImage from './assets/Calc.png';
import treeForMeImage from './assets/Tree.jpg';
import resumePDF from './assets/ABHISHEK-KUMAR-Resume1.pdf';

// New project images
import byteforgeImage from './assets/byteforge.png'; // site: byteforge.studio [web:2]
import dentalPerfectImage from './assets/dental-perfect.png'; // site: dental-perfect.com [web:12]
import skillswapImage from './assets/skillswap.png'; // repo/site references [web:10][web:13]

export const portfolioData = {
  personal: {
    name: "Abhishek Kumar",
    title: "Full Stack Web Developer",
    location: "Ghaziabad, India",
    description:
      "I can help you build a website from front-end to back-end. Look through some of my work and projects! If you like what you see and have a project that needs to be coded, don't hesitate to contact me.", // [web:2]
    about:
      "Who am I? A conscientious Web Developer from Ghaziabad, India. A BCA student and tech enthusiast looking for a challenge. If you like what you see and have a project that needs to be coded in an organized, conscientious, and dynamic way, do not hesitate to contact me.", // [web:2]
    resume: resumePDF,
    image: userImage,
    social: {
      linkedin: "https://www.linkedin.com/in/abhishekkumar3107/", // [web:2]
      github: "https://github.com/Abhishekk3107", // [web:2]
      instagram: "https://www.instagram.com/abhi31_07", // [web:2]
    },
    email: "ak3012498@gmail.com", // [web:2]
  },
  skills: {
    "Languages & Concepts": [
      "JavaScript",
      "HTML",
      "CSS",
      "C language",
      "C++",
      "Data Structure and Algorithms",
      "Python",
      "MySQL",
      "MongoDB",
    ], // [web:2]
    "Frameworks & Libraries": ["Bootstrap", "Tailwind CSS", "React"], // [web:2]
    "Tools & Technologies": ["GitHub", "VS Code", "MS Office", "Netlify"], // [web:2]
  },
  projects: [
    // New additions
    {
      title: "ByteForge",
      description:
        "A professional services site for a tech solutions studio delivering web, mobile, and AI-driven products.", // [web:2][web:11]
      image: byteforgeImage,
      technologies: ["React", "Tailwind CSS", "Vite"], // [web:2]
      liveUrl: "https://byteforge-service.vercel.app/", // [web:2]
    },
    {
      title: "Dental Perfect",
      description:
        "A service-focused website for dental services : showcasing categories of issues and their solution.", // [web:12]
      image: dentalPerfectImage,
      technologies: ["React", "Tailwind CSS"], // [web:12]
      liveUrl: "https://dental-perfect-gzb.vercel.app/", // [web:12]
    },
    {
      title: "SkillSwap",
      description:
        "A community-driven skill exchange platform with profiles, matching, and swipe-style discovery.", // [web:13]
      image: skillswapImage,
      technologies: ["React", "Firebase", "Vite"], // [web:10]
      liveUrl: "https://skillswap-skillplatform.vercel.app/", // [web:13]
    },
    {
      title: "Freewaystudy Project",
      description:
        "An online platform providing students with free access to a wide range of study materials and educational resources.", // [web:2]
      image: freewaystudyImage,
      technologies: ["HTML", "CSS", "JavaScript"], // [web:2]
      liveUrl: "https://www.freewaystudy.tech/", // [web:2]
      githubUrl: null, // [web:2]
    },
    {
      title: "Salarify Project",
      description:
        "A tool designed to help users calculate and understand salary breakdowns, including taxes and deductions.", // [web:2]
      image: salarifyImage,
      technologies: ["JavaScript", "React", "CSS"], // [web:2]
      liveUrl: "https://salarifyio.vercel.app/", // [web:2]
      githubUrl: "https://github.com/Abhishekk3107/Salarify", // [web:2]
    },
    {
      title: "Ask AI Chatbot",
      description:
        "A conversational chatbot powered by the Google Gemini API to answer user queries and engage in real-time conversations.", // [web:2]
      image: askAiImage,
      technologies: ["JavaScript", "API", "React"], // [web:2]
      liveUrl: "https://ask-ai-01.netlify.app/", // [web:2]
      githubUrl: "https://github.com/Abhishekk3107/ask-ai-public", // [web:2]
    },
    {
      title: "Amazon Homepage Clone",
      description:
        "This project is a clone of the Amazon homepage using HTML and CSS.", // [web:2]
      image: amazonHomepageCloneImage,
      technologies: ["HTML", "CSS"], // [web:2]
      liveUrl: "https://abhishekk3107.github.io/Amazon-Homepage-Clone/", // [web:2]
      githubUrl: "https://github.com/Abhishekk3107/Amazon-Homepage-Clone", // [web:2]
    },
    {
      title: "Tic Tac Toe",
      description:
        "A classic Tic Tac Toe game built with HTML, CSS, and JavaScript.", // [web:2]
      image: ticTacToeImage,
      technologies: ["HTML", "CSS", "JavaScript"], // [web:2]
      liveUrl:
        "https://abhishekk3107.github.io/Tic-Tac-Toe-by-HTML-CSS-and-JS/", // [web:2]
      githubUrl:
        "https://github.com/Abhishekk3107/Tic-Tac-Toe-by-HTML-CSS-and-JS", // [web:2]
    },
    {
      title: "Rock Paper Scissors",
      description:
        "Rock Paper Scissors game implemented using HTML, CSS, and JavaScript.", // [web:2]
      image: rockPaperScissorsImage,
      technologies: ["HTML", "CSS", "JavaScript"], // [web:2]
      liveUrl: "https://abhishekk3107.github.io/rock-papers-scissors/", // [web:2]
      githubUrl: "https://github.com/Abhishekk3107/rock-papers-scissors", // [web:2]
    },
    {
      title: "Dark Mode Button",
      description:
        "A simple dark mode toggle button using HTML, CSS, and JavaScript.", // [web:2]
      image: darkModeButtonImage,
      technologies: ["HTML", "CSS", "JavaScript"], // [web:2]
      liveUrl: "https://abhishekk3107.github.io/Dark-mode-button/", // [web:2]
      githubUrl: "https://github.com/Abhishekk3107/Dark-mode-button", // [web:2]
    },
    {
      title: "Spotify Clone",
      description:
        "A simple responsive clone of Spotify homepage created using HTML & CSS", // [web:2]
      image: spotifyImage,
      technologies: ["HTML", "CSS"], // [web:2]
      liveUrl: "https://abhishekk3107.github.io/Spotify-Clone/", // [web:2]
      githubUrl: "https://github.com/Abhishekk3107/Spotify-Clone", // [web:2]
    },
    {
      title: "Responsive Calculator",
      description:
        "A simple responsive calculator created using HTML, CSS and JS", // [web:2]
      image: responsiveCalcImage,
      technologies: ["HTML", "CSS", "JavaScript"], // [web:2]
      liveUrl:
        "https://abhishekk3107.github.io/Afame_Technologies_Calculator/", // [web:2]
      githubUrl:
        "https://github.com/Abhishekk3107/Afame_Technologies_Calculator", // [web:2]
    },
    {
      title: "Tree for Me Project",
      description:
        "An initiative where you can sponsor the plantation of trees - Tree 4 me", // [web:2]
      image: treeForMeImage,
      technologies: ["HTML", "CSS", "JavaScript"], // [web:2]
      liveUrl: "https://abhishekk3107.github.io/TREE_4_ME//", // [web:2]
      githubUrl: "https://github.com/Abhishekk3107/TREE_4_ME", // [web:2]
    },

  ],
};
