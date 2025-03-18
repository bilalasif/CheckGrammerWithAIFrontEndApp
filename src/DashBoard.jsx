import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { errorToast } from "./utils/utils.js";
import { axiosApiCall } from "./utils/utils.js";

const exampleOutPut =
  '<p>I <span class="text-red-500">has</span> a pen and he <span class="text-red-500">go</span> to school <span class="text-red-500">yesturday</span>.</p>';

function DashBoard() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");
  const [output, setoutput] = useState(exampleOutPut);
  const [apiKey, setapiKey] = useState("");
  const [inProgress, setinProgress] = useState(false);

  const onSignoutclick = async () => {
    try {
      const resp = await axiosApiCall("/sign-out", "POST");
      if (resp.status == 200) {
        navigate("/sign-in");
      } else {
        errorToast("Unable to Sign out");
      }
    } catch (error) {}
  };
  const onGrammerCheckClick = async () => {
    if (userInput == "") {
      errorToast(
        "How do you expect me to test your grammer on an empty string? Enter input."
      );
      return;
    }
    if (apiKey == "") {
      errorToast("Plz input your OpenAI API Key to test the functionality.");
      return;
    }

    if (inProgress) {
      errorToast("Plz wait a checking process is already in progress.");
      return;
    }

    setinProgress(true);

    const prompt = generatePrompt();

    try {
      const resp = await axiosApiCall("/generate-with-openai", "post", {
        apiKey,
        prompt,
      });

      const { data } = resp;
      const { originalPromptResponse } = data;
      const start = originalPromptResponse.indexOf("<p>");
      const end = originalPromptResponse.indexOf("</p>");
      setoutput(originalPromptResponse.slice(start, end + 4));
    } catch (error) {
      switch (error.status) {
        case 500: {
          errorToast(
            "Issue with OpenAI system, It can be due to invalid key, insufficnet Quota etc."
          );
          break;
        }
        case 400: {
          console.log(error);
          errorToast(
            "Issue with OpenAI system, It can be due to invalid key, insufficnet Quota etc."
          );
          break;
        }

        default:
          errorToast("UnKnown error occured");
      }
    }
    setinProgress(false);
  };
  const generatePrompt = () => {
    let prompt = `     
              You are a grammar correction tool. 
              I will provide you with a text input from the user, and you will return the same text in an HTML format with grammatical mistakes and misspelled words highlighted.

              Here are the rules:
              1. Return the **original text** inside a \`<p>\` (paragraph element) tag.
              2. Do **not** correct the mistakes; instead, highlight them.
              3. For **incorrect or misspelled words**, wrap them inside a \`<span>\` with the class \`text-red-500\` (TailwindCSS class for red text).
              4. Keep all correctly spelled words unchanged.
              5. Do **not** add explanations, comments, or any extra text, Your response should only return the formatted HTML output's p tag.

              ### **Example Input:**
              "I has a pen and he go to school yesturday."
              ### **Expected Output:**
              <p>I <span class="text-red-500">has</span> a pen and he <span class="text-red-500">go</span> to school <span class="text-red-500">yesturday</span>.</p>

              Now, here is the actual user input text enclosed in triple backticks below
              \`\`\`
              ${userInput}
              \`\`\`
    `;
    return prompt;
  };
  return (
    <div>
      <div className="flex justify-between p-4">
        <div></div>
        <h2>Grammer / Spelling Checker App.</h2>
        <button
          className=" cursor-pointer flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={onSignoutclick}
        >
          sign out
        </button>
      </div>
      <div className="flex flex-col justify-center h-[90vh] gap-5 p-40">
        <div>
          <label
            for="apikey"
            className="block text-sm/6 font-medium text-gray-900"
          >
            ApiKey:
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="apikey"
              id="apikey"
              required
              className=" border-1 rounded-lg border-gray-600 block w-3/4  bg-white px-3 py-1.5 text-base text-gray-900 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2  sm:text-sm/6 focus:outline-gray-300"
              value={apiKey}
              onChange={(e) => {
                setapiKey(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="bg-[#efefef] h-[200px] rounded-lg">
          <div className="p-4" dangerouslySetInnerHTML={{ __html: output }} />
        </div>
        <textarea
          value={userInput}
          name="users-input"
          id=""
          className="h-[200px] border-1 rounded-lg border-gray-600 focus:outline-none resize-none p-5"
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
        ></textarea>
        <div className="flex justify-center">
          <button
            onClick={onGrammerCheckClick}
            disabled={inProgress}
            className=" cursor-pointer flex w-40 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Check Grammar
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default DashBoard;
