<button
  onClick={handleAnalyze}
  disabled={!file || !csvType}
  className={`${
    !file || !csvType ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
  } text-white font-semibold py-2 px-4 rounded`}
>
  Analyze
</button>
