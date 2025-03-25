"use client";

export default function Home() {
  const handleClick = (option: string) => {
    console.log(`Selected option: ${option}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Get Your Album of the Day</h1>
      <div className="space-y-4 w-full max-w-md">
        {[
          'By Genres/Era',
          'By Songs/Album',
          'By Mood',
          'By Your Listening History',
          'Surprise Me',
        ].map((option) => (
          <div
            key={option}
            onClick={() => handleClick(option)}
            className="bg-white/10 backdrop-blur-sm rounded-full p-4 text-center hover:bg-white/20 transition-all cursor-pointer"
          >
            <p className="text-white text-lg font-medium">{option}</p>
          </div>
        ))}
      </div>
    </main>
  );
}