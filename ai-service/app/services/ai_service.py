import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def get_ai_response(messages):
    """
    Existing chat messages ko Gemini ke liye
    simple text prompt mein convert karta hai.
    """

    try:
        prompt_parts = []

        for message in messages:
            role = message.get("role", "")
            content = message.get("content", "")

            prompt_parts.append(
                f"{role.upper()}: {content}"
            )

        prompt = "\n\n".join(prompt_parts)

        response = client.models.generate_content(
            model="gemini-3.1-flash-lite",
            contents=prompt
        )

        return response.text

    except Exception as error:
        print("Gemini API error:", error)

        return (
            "Sorry, I could not generate an AI "
            "response right now."
        )