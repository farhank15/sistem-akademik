import { useState } from "react";
import { FaStar } from "react-icons/fa";
import Card from "@components/atoms/Card";
import Button from "@components/atoms/Button";

const EvaluationPage = () => {
  const [answers, setAnswers] = useState({
    q1: 0,
    q2: 0,
    q3: 0,
    q4: 0,
    q5: 0,
    q6: "",
  });

  const handleStarClick = (question, stars) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: stars,
    }));
  };

  const handleTextareaChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Answers submitted:", answers);
    // Logic to submit answers to server or process them
    // Redirect or show confirmation message
  };

  const handleReset = () => {
    setAnswers({
      q1: 0,
      q2: 0,
      q3: 0,
      q4: 0,
      q5: 0,
      q6: "",
    });
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Question 1 */}
        <Card className="flex flex-col items-start justify-between p-4">
          <div>
            <h2 className="mb-2 text-xl font-semibold">Pertanyaan 1</h2>
            <p className="text-neutral-light">
              Apakah Anda puas dengan pengajaran dari Dosen A?
            </p>
          </div>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className="ml-1 text-yellow-400 cursor-pointer"
                size={24}
                onClick={() => handleStarClick("q1", index + 1)}
                color={index + 1 <= answers.q1 ? "#ffc107" : "#e4e5e9"}
              />
            ))}
          </div>
        </Card>

        {/* Question 2 */}
        <Card className="flex flex-col items-start justify-between p-4">
          <div>
            <h2 className="mb-2 text-xl font-semibold">Pertanyaan 2</h2>
            <p className="text-neutral-light">
              Bagaimana penilaian Anda terhadap pengetahuan Dosen B dalam materi
              kuliah?
            </p>
          </div>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className="ml-1 text-yellow-400 cursor-pointer"
                size={24}
                onClick={() => handleStarClick("q2", index + 1)}
                color={index + 1 <= answers.q2 ? "#ffc107" : "#e4e5e9"}
              />
            ))}
          </div>
        </Card>

        {/* Question 3 */}
        <Card className="flex flex-col items-start justify-between p-4">
          <div>
            <h2 className="mb-2 text-xl font-semibold">Pertanyaan 3</h2>
            <p className="text-neutral-light">
              Bagaimana pengalaman Anda dengan Dosen C dalam memberikan
              bimbingan?
            </p>
          </div>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className="ml-1 text-yellow-400 cursor-pointer"
                size={24}
                onClick={() => handleStarClick("q3", index + 1)}
                color={index + 1 <= answers.q3 ? "#ffc107" : "#e4e5e9"}
              />
            ))}
          </div>
        </Card>

        {/* Question 4 */}
        <Card className="flex flex-col items-start justify-between p-4">
          <div>
            <h2 className="mb-2 text-xl font-semibold">Pertanyaan 4</h2>
            <p className="text-neutral-light">
              Bagaimana pendapat Anda mengenai ketersediaan waktu dosen untuk
              konsultasi di luar jam perkuliahan?
            </p>
          </div>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className="ml-1 text-yellow-400 cursor-pointer"
                size={24}
                onClick={() => handleStarClick("q4", index + 1)}
                color={index + 1 <= answers.q4 ? "#ffc107" : "#e4e5e9"}
              />
            ))}
          </div>
        </Card>

        {/* Question 5 */}
        <Card className="flex flex-col items-start justify-between p-4">
          <div>
            <h2 className="mb-2 text-xl font-semibold">Pertanyaan 5</h2>
            <p className="text-neutral-light">
              Apakah Anda merasa materi yang diajarkan relevan dengan kebutuhan
              pasar atau industri saat ini?
            </p>
          </div>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className="ml-1 text-yellow-400 cursor-pointer"
                size={24}
                onClick={() => handleStarClick("q5", index + 1)}
                color={index + 1 <= answers.q5 ? "#ffc107" : "#e4e5e9"}
              />
            ))}
          </div>
        </Card>

        {/* Question 6 */}
        <Card className="flex flex-col items-start justify-between p-4">
          <div>
            <h2 className="mb-2 text-xl font-semibold">Pertanyaan 6</h2>
            <p className="text-neutral-light">
              Saran atau kritik Anda untuk penyempurnaan pengajaran oleh Dosen
              D.
            </p>
          </div>
          <textarea
            name="q6"
            value={answers.q6}
            onChange={handleTextareaChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded bg-neutral-light"
            rows="5"
            placeholder="Masukkan saran atau kritik Anda..."
          ></textarea>
        </Card>
      </div>

      {/* Submit and Reset Buttons */}
      <div className="flex justify-between mt-6 space-x-4">
        <Button
          onClick={handleReset}
          className="px-4 py-2 font-semibold text-white bg-gray-500 rounded hover:bg-gray-700"
          name="Reset"
        />
        <Button
          onClick={handleSubmit}
          className="px-4 py-2 font-semibold text-white rounded bg-success hover:bg-green-900"
          name="Submit"
        />
      </div>
    </div>
  );
};

export default EvaluationPage;
