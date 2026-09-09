import os
from openai import OpenAI


client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


def get_ai_response(messages):
    response = client.responses.create(
        model="gpt-5.6-luna",
        instructions="""
        You are an AI Study Assistant.

        Your job is to help students learn programming,
        Python, JavaScript, MERN, Machine Learning,
        Data Science, and AI.

        Follow these rules:
        1. Explain difficult concepts in simple language.
        2. Give examples when useful.
        3. Explain step by step.
        4. If the student is confused, explain again simply.
        5. Do not unnecessarily make answers complicated.
        6. Encourage understanding instead of just giving
           the final answer.
        7. Use previous conversation context when answering.
        """,
        input=messages
    )

    return response.output_text