import "./Wishes.css";

import { useNavigate, useParams } from "react-router-dom";

import { motion } from "framer-motion";
import { usePalette } from "@roylee1997/react-palette";

import Progress from "../../components/Progress/Progress";
import MusicCard from "../../components/MusicCard/MusicCard";
import TMessagesData from "../../typings/MessagesData";

// albumArts
import firstAlbumArt from "../../assets/sampleData/first-album-art.webp";
import secondAlbumArt from "../../assets/sampleData/second-album-art.webp";

// musicFilePaths
import firstMusic from "../../assets/sampleData/music/night-city.mp3";
import secondMusic from "../../assets/sampleData/music/almost-nothing.mp3";

// framer transition and variants
const commonTransition = {
  ease: [0.43, 0.13, 0.23, 0.96],
  duration: 0.5,
};

const messageContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96],
      duration: 0.5,
    },
  },
};

const messages = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

/* Each message must have music details (can be fetched through an API) with Album Art to be must) and message itself in multiple p tags (if possible) */
// Sample Data
const sampleMessagesDataArray: TMessagesData[] = [
  {
    albumArt: firstAlbumArt,
    musicName: "Night City - R E L's Version",
    messageInParas: [
      "Dear Anis Sofia, On this special day marking your 21st birthday, I want to express just how much you mean to me and how grateful I am to have you in my life. Your presence has brought endless joy, warmth, and love into my world, making every day brighter simply because you're in it.",
      "Twenty-one years ago, the world was blessed with a soul as beautiful as yours. Your kindness, intelligence, and infectious smile have touched not only my heart but also the lives of everyone fortunate enough to know you. As you step into this significant milestone of adulthood, I'm filled with pride seeing the remarkable woman you've become.",
      "Anis Sofia, your strength and determination never cease to amaze me. The way you pursue your dreams with unwavering dedication, while maintaining such a caring and loving heart, is truly inspiring. Your ability to balance your ambitions with compassion makes you truly special, and I feel honored to witness your journey.",
      "Every moment we spend together becomes a treasured memory, from our heartfelt conversations to our uncontrollable fits of laughter. Your sense of humor and the way you see beauty in the simplest things make life so much more meaningful. The sparkle in your eyes when you talk about your passions lights up my whole world.",
    ],
    musicFilePath: firstMusic,
  },
  {
    albumArt: secondAlbumArt,
    musicName: 'Almost nothing - "Death Stranding" Ending Song',
    messageInParas: [
      "As you turn 21, I want you to know that you deserve all the happiness this world has to offer. Your gentle spirit and genuine nature make you one of the most exceptional people I've ever known. You have this incredible ability to make everyone around you feel valued and understood, and that's just one of the countless reasons why you're so loved.",
      "Looking ahead, I'm excited to see all the amazing things life has in store for you. Your future is as bright as your beautiful smile, and I know you'll continue to achieve great things while touching lives with your unique charm and grace. Your journey is just beginning, and I feel privileged to be part of it.",
      "On this special birthday, I wish you not just happiness and success, but also the strength to overcome any challenges that may come your way. May your 21st year be filled with wonderful adventures, precious moments, and countless reasons to smile. You deserve nothing but the best, my dear Anis Sofia.",
      "Thank you for being the incredible person you are – for your love, support, and the joy you bring to my life and others'. Happy 21st Birthday, my beloved Anis Sofia! May this day be as extraordinary as you are, and may the year ahead bring you all the love and happiness your heart desires.",
      "Warm regards,",
      "Itqan",
    ],
    musicFilePath: secondMusic,
  },
];

const Wishes = () => {
  const navigate = useNavigate();
  const { id = 0 } = useParams();

  if (Number(id) < 0 || sampleMessagesDataArray[Number(id)] == undefined) {
    return <p>Invalid Wish Message Id</p>;
  }

  const {
    data: colorData,
    loading: colorDataIsLoading,
    error,
  } = usePalette(sampleMessagesDataArray[Number(id)].albumArt);

  if (error) {
    return <h1>Invalid Wish Message Id</h1>;
  }

  return (
    <motion.main
      initial="initial"
      animate="animate"
      exit="exit"
      className="wishes-wrapper h-screen w-screen flex flex-col justify-between items-center"
    >
      <Progress
        primaryColor={colorData?.vibrant}
        secondaryColor={colorData?.darkVibrant}
        messageDataArrayLength={sampleMessagesDataArray.length}
      />
      <motion.div
        className="lg:w-11/12 rounded-t-2xl md:rounded-t-xl flex md:flex-row flex-col-reverse"
        style={{
          backgroundColor: colorDataIsLoading ? "#fff" : colorData?.vibrant,
        }}
        initial={{ y: "1000px" }}
        animate={{ y: "0px" }}
        exit={{ y: "1000px" }}
        transition={commonTransition}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={(_, info) => {
          if (info.offset.x > 50) {
            if (Number(id) > 0 && Number(id) < sampleMessagesDataArray.length) {
              navigate(`/wishes/${Number(id) - 1}`);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }
          } else if (info.offset.x < -50) {
            if (
              Number(id) >= 0 &&
              Number(id) < sampleMessagesDataArray.length - 1
            ) {
              navigate(`/wishes/${Number(id) + 1}`);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }
          } else {
            console.log(null);
          }
        }}
      >
        <motion.div
          className="md:w-1/2"
          initial="hidden"
          animate="show"
          variants={messageContainer}
        >
          {sampleMessagesDataArray[Number(id)].messageInParas.map(
            (eachPara, index) => {
              return (
                <motion.p
                  className="p-8 message text-3xl"
                  variants={messages}
                  key={index + 2045}
                >
                  {eachPara}
                </motion.p>
              );
            }
          )}
        </motion.div>
        <div className="md:w-1/2 h-1/2 md:h-auto flex justify-center items-center">
          <MusicCard
            albumArt={sampleMessagesDataArray[Number(id)].albumArt}
            primaryColor={colorData?.vibrant}
            musicName={sampleMessagesDataArray[Number(id)].musicName}
            musicFilePath={sampleMessagesDataArray[Number(id)].musicFilePath}
          />
        </div>
      </motion.div>
    </motion.main>
  );
};

export default Wishes;
