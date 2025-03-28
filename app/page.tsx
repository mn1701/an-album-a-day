"use client"

export default function Home() {
  const handleClick = (option: string) => {
    console.log(`Selected option: ${option}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      
      <h1 className="text-4xl font-bold mb-8">
        Get Your <span className="border-b-4 border-[#ffa371]">Album</span> of the Day
      </h1>

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
          className="bg-black/10 dark:bg-white/10 backdrop-blur-sm rounded-full p-4 text-center hover:bg-black/20 dark:hover:bg-white/20 transition-all cursor-pointer"
        >
          <p className="text-black dark:text-white text-lg font-medium">{option}</p>
        </div>
        ))}
      </div>
    </main>
  );
}