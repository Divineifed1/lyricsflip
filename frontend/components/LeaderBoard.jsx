"use client";
import Image from "next/image";
import rankOne from "../public/leaderboard-img/rankOne.svg";
import rankTwo from "../public/leaderboard-img/rankTwo.svg";
import rankThree from "../public/leaderboard-img/rankThree.svg";
import avatar from "../public/leaderboard-img/avatar.svg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { Modal } from "./ui/modal";
import { GameSetupForm } from "./modal/GameSetupForm";
import { useState } from "react";
import { useGameStore } from "@/store/gameStore";

const leaderboardData = [
  { rank: 1, username: "theJohnKennedy", points: 1200, challenges: 120 },
  { rank: 2, username: "theJohnKennedy", points: 1200, challenges: 120 },
  { rank: 3, username: "theJohnKennedy", points: 1200, challenges: 120 },
  { rank: 4, username: "theJohnKennedy", points: 1200, challenges: 120 },
  { rank: 5, username: "theJohnKennedy", points: 1200, challenges: 120 },
  { rank: 6, username: "theJohnKennedy", points: 1200, challenges: 120 },
  { rank: 7, username: "theJohnKennedy", points: 1200, challenges: 120 },
  { rank: 8, username: "theJohnKennedy", points: 1200, challenges: 120 },
];

export default function Leaderboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { initializeGame, selectedDifficulty, username, setQuestions } =
    useGameStore();

  const handleStartGame = async () => {
    if (!selectedDifficulty || !username) return;

    setIsLoading(true);
    setError(null);

    try {
      const geniusService = GeniusService.getInstance();
      const snippets = await geniusService.getRandomLyricSnippets("", 20);
      const filtered = snippets.filter(
        (s) => s.difficulty === selectedDifficulty
      );

      if (filtered.length === 0) {
        throw new Error("No questions available for selected difficulty");
      }

      const formatted = filtered.map((snippet) => {
        const correctOption = `${snippet.songTitle} - ${snippet.artist}`;
        const otherSongChoices = filtered
          .filter((s) => s.songTitle !== snippet.songTitle)
          .map((s) => `${s.songTitle} - ${s.artist}`);

        const additionalOptions = [];
        while (additionalOptions.length < 3 && otherSongChoices.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * otherSongChoices.length
          );
          const randomChoice = otherSongChoices.splice(randomIndex, 1)[0];
          additionalOptions.push(randomChoice);
        }

        const options = [correctOption, ...additionalOptions];
        const shuffledOptions = options.sort(() => 0.5 - Math.random());

        return {
          lyricsSnippet: snippet.lyricsSnippet,
          correctAnswer: correctOption,
          difficulty: snippet.difficulty,
          options: selectedDifficulty === "Beginner" ? shuffledOptions : [],
        };
      });

      console.log("Formatted Questions:", formatted);
      setQuestions(formatted);
      initializeGame();
    } catch (err) {
      console.error("Game initialization failed:", err);
      setError(err.message || "Failed to start game. Please try again.");
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="p-4 mx-auto max-w-7xl md:p-8">
      {/* Leaderboard header */}
      <div className="flex flex-col items-center justify-between md:flex-row md:mb-8">
        <div className="mb-4">
          <h1 className="mb-1 text-2xl font-semibold text-text-primary">
            Leaderboard
          </h1>
          <p className="text-xs font-normal text-gray-400 md:text-sm">
            Hey!!! No pressure, it's just a leaderboard really 🎶
          </p>
        </div>

        <div className="flex gap-4 mb-6 text-sm text-black">
          <button
            className="flex items-center justify-center px-8 py-2 bg-white border rounded-full md:flex-none md:px-3 md:py-1 hover:bg-gray-50"
            aria-label="Select leaderboard timeframe"
          >
            All time
            <IoMdArrowDropdown className="inline-block w-4 h-4 ml-2" />
          </button>
          <button
            className="flex items-center justify-center flex-1 px-8 py-0 bg-white border rounded-full md:flex-none md:px-3 md:py-1 hover:bg-gray-50"
            aria-label="Select global leaderboard"
          >
            Global
            <IoMdArrowDropdown className="inline-block w-4 h-4 ml-2" />
          </button>
        </div>
      </div>

      {/* Leader board table */}
      <div className="max-w-5xl p-4 mx-auto overflow-auto bg-white border shadow-sm md:p-8 rounded-2xl">
        {/* Desktop Headers - Hidden on Mobile */}
        <div className="hidden px-6 py-4 md:grid md:grid-cols-12 bg-gray-50">
          <div className="col-span-5 text-sm font-semibold text-gray-600">
            Username
          </div>
          <div className="col-span-3 text-sm font-semibold text-gray-600">
            Number of Plays
          </div>
          <div className="col-span-3 text-sm font-semibold text-right text-gray-600">
            Points
          </div>
        </div>

        {/* Leaderboard Entries */}
        <div className="divide-y">
          {leaderboardData.map((entry, index) => (
            <div
              key={entry.rank}
              className={`
                px-6 py-4
                ${
                  index == 0
                    ? "bg-primary-light transition-colors ease-out-in"
                    : ""
                }
              `}
              role="row"
            >
              <div className="flex items-center gap-4">
                {/* Rank Badge */}
                <div className="flex-shrink-0 w-8" role="cell">
                  {entry.rank <= 3 ? (
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold`}
                    >
                      {entry.rank === 1 && (
                        <Image
                          src={rankOne}
                          alt="Rank 1"
                          width={32}
                          height={32}
                          className="object-cover w-full h-full"
                        />
                      )}
                      {entry.rank === 2 && (
                        <Image
                          src={rankTwo}
                          alt="Rank 2"
                          width={32}
                          height={32}
                          className="object-cover w-full h-full"
                        />
                      )}
                      {entry.rank === 3 && (
                        <Image
                          src={rankThree}
                          alt="Rank 3"
                          width={32}
                          height={32}
                          className="object-cover w-full h-full"
                        />
                      )}
                    </div>
                  ) : (
                    <span className="pl-2 text-lg text-gray-500">
                      {entry.rank}
                    </span>
                  )}
                </div>

                {/* Avatar and Username */}
                <div
                  className="flex items-center gap-3 flex-[0.47]"
                  role="cell"
                >
                  <div className="w-8 h-8 overflow-hidden bg-gray-100 rounded-full">
                    <Image
                      src={avatar}
                      alt="User Avatar"
                      width={32}
                      height={32}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-black">
                      {entry.username}
                    </div>
                    <div className="text-xs md:hidden md:text-sm ">
                      <span className="font-semibold text-primary-main">
                        {entry.points} Points
                      </span>
                      <span className="w-full text-gray-500">
                        • {entry.challenges} Challenges
                      </span>
                    </div>
                  </div>
                </div>

                {/* Desktop Only: Challenges and Points */}
                <div className="hidden md:flex flex-[0.45] col-span-3 font-bold text-black">
                  {entry.challenges}
                </div>
                <div className="hidden col-span-3 md:block text-primary-main">
                  <span className="font-semibold ">
                    {entry.points.toLocaleString()}
                  </span>
                  <span className="ml-1 text-sm">pts</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 text-sm text-gray-600 border-t">
          <div className="hidden md:block">1-8 of 10 items</div>
          <div className="flex items-center gap-2 mx-auto md:mx-0">
            <button
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
              disabled
              aria-label="Previous page"
            >
              <FaChevronLeft className="w-5 h-5" />
            </button>
            <button
              className="px-2 py-1 bg-gray-100 rounded"
              aria-label="Page 1"
            >
              1
            </button>
            <button
              className="px-2 py-1 rounded hover:bg-gray-100"
              aria-label="Page 2"
            >
              2
            </button>
            <button
              className="px-2 py-1 rounded hover:bg-gray-100"
              aria-label="Page 3"
            >
              3
            </button>
            <button
              className="px-2 py-1 rounded hover:bg-gray-100"
              aria-label="Page 4"
            >
              4
            </button>
            <span>...</span>
            <button
              className="px-2 py-1 rounded hover:bg-gray-100"
              aria-label="Page 10"
            >
              10
            </button>
            <button
              className="p-1 rounded hover:bg-gray-100"
              aria-label="Next page"
            >
              <FaChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Guess the song"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <GameSetupForm onStart={handleStartGame} />
      </Modal>
    </div>
  );
}
